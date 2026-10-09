import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm, Control } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import AdminLayout from "@/components/layout/AdminLayout";
import { propertyService, PropertyImage } from "@/services/propertyService";
import { Property } from "@/lib/supabase";
import ImageUpload from "@/components/ui/image-upload";
import { 
  ArrowLeft, 
  Save, 
  Loader2,
  Image as ImageIcon,
  Trash2,
  Upload,
  Info,
  AlertTriangle
} from "lucide-react";
import { CategorySelector } from "@/components/property/CategorySelector";
import { DynamicFormField } from "@/components/property/DynamicFormField";
import { MultiCategorySelector } from "@/components/property/MultiCategorySelector";
import { VideoLinksInput } from "@/components/property/VideoLinksInput";
import { UnitVariantsInput } from "@/components/property/UnitVariantsInput";
import { getCommonFieldsForCategory } from "@/config/commonFields";
import { getCategoryBySlug, PROPERTY_CATEGORIES } from "@/config/propertyCategories";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// Form validation schema - all fields optional (same as AddProperty)
const createPropertySchema = () => {
  const baseSchema: Record<string, z.ZodTypeAny> = {
    // Common fields
    header: z.string().optional(),
    description: z.string().optional(),
    location: z.string().optional(),
    sub_location: z.string().optional(),
    city: z.string().optional(),
    country: z.string().optional(),
    property_code: z.string().optional(),
    real_property_name: z.string().optional(),
    remarks: z.string().optional(),
    deal_highlight: z.string().optional(),
    field_remarks: z.record(z.string()).optional(),
    lead_numbers: z.string().optional(),
    
    // Category assignment
    primary_category: z.string().optional(),
    category_assignments: z.array(z.string()).optional(),
    video_links: z.array(z.string()).optional(),
    
    // Legacy fields (for backward compatibility)
    building: z.string().optional(),
    builder: z.string().optional(),
    possession_date: z.string().optional(),
    towers: z.number().optional(),
    acres: z.number().optional(),
    units: z.number().optional(),
    bhk: z.string().optional(),
    flat_size: z.string().optional(),
    price_range: z.string().optional(),
    rera_number: z.string().optional(),
    contact_number: z.string().optional(),
    property_type: z.string().optional(),
    usage_type: z.string().optional(),
    additional_info: z.string().optional(),
    // New Project: optional unit variants (multiple sizes/prices per type)
    unit_variants: z.array(z.object({
      type: z.string(),
      area: z.string(),
      price: z.string(),
      label: z.string().optional(),
    })).optional(),
  };

  // Add all category-specific fields as optional
  PROPERTY_CATEGORIES.forEach(category => {
    category.fields.forEach(field => {
      if (!baseSchema[field.key]) {
        switch (field.type) {
          case 'number':
            baseSchema[field.key] = z.number().optional();
            break;
          case 'checkbox':
            baseSchema[field.key] = z.boolean().optional();
            break;
          case 'multiselect':
          case 'array':
            baseSchema[field.key] = z.array(z.string()).optional();
            break;
          default:
            baseSchema[field.key] = z.string().optional();
        }
      }
      
      // Add unit fields if they exist
      if (field.unit && field.unitOptions) {
        baseSchema[field.unit] = z.string().optional();
      }
    });
  });

  return z.object(baseSchema);
};

type PropertyFormData = z.infer<ReturnType<typeof createPropertySchema>>;

const sanitizePayload = <T extends Record<string, unknown>>(payload: T): Partial<T> =>
  Object.fromEntries(
    Object.entries(payload).filter(([, value]) => {
      if (value === undefined) return false;
      if (typeof value === "number" && Number.isNaN(value)) return false;
      return true;
    })
  ) as Partial<T>;

// Helper function to migrate old property data to new format
const migratePropertyData = (property: Property): Partial<PropertyFormData> => {
  const formData: Partial<PropertyFormData> = {
    // Map common fields
    header: property.header || property.building || '',
    description: property.description || property.additional_info || '',
    location: property.location || '',
    sub_location: property.sub_location || '',
    city: property.city || '',
    country: property.country || '',
    
    // Category assignment
    primary_category: property.primary_category || '',
    category_assignments: property.category_assignments || [],
    video_links: property.video_links || [],
    
    // Legacy fields (preserve for backward compatibility)
    building: property.building || '',
    builder: property.builder || '',
    possession_date: property.possession_date || '',
    towers: property.towers,
    acres: property.acres,
    units: property.units,
    bhk: property.bhk || '',
    flat_size: property.flat_size || '',
    price_range: property.price_range || '',
    rera_number: property.rera_number || '',
    contact_number: property.contact_number || '',
    property_type: property.property_type || '',
    usage_type: property.usage_type || '',
    additional_info: property.additional_info || '',
    unit_variants: property.unit_variants ?? [],
    property_code: property.property_code || '',
    real_property_name: property.real_property_name || '',
    remarks: property.remarks || '',
    deal_highlight: property.deal_highlight || 'None',
    field_remarks: property.field_remarks || {},
    lead_numbers: property.lead_numbers || '',
  };

  // Map all category-specific fields
  PROPERTY_CATEGORIES.forEach(category => {
    category.fields.forEach(field => {
      const key = field.key as keyof Property;
      if (property[key] !== undefined && property[key] !== null) {
        (formData as any)[field.key] = property[key];
      }
      
      // Handle unit fields
      if (field.unit) {
        const unitKey = field.unit as keyof Property;
        if (property[unitKey] !== undefined && property[unitKey] !== null) {
          (formData as any)[field.unit] = property[unitKey];
        }
      }
    });
  });

  return formData;
};

const EditProperty = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [property, setProperty] = useState<Property | null>(null);
  const [propertyImages, setPropertyImages] = useState<PropertyImage[]>([]);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [isUploadingImages, setIsUploadingImages] = useState(false);
  const [primaryCategory, setPrimaryCategory] = useState<string>("");
  const [showCategoryChangeWarning, setShowCategoryChangeWarning] = useState(false);

  const propertySchema = createPropertySchema();

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    watch,
  } = useForm<PropertyFormData>({
    resolver: zodResolver(propertySchema),
    defaultValues: {
      category_assignments: [],
      video_links: [],
      unit_variants: [],
    },
  });

  useEffect(() => {
    if (id) {
      fetchProperty();
    }
  }, [id]);

  const fetchProperty = async () => {
    try {
      setIsLoading(true);
      if (!id) return;

      const data = await propertyService.getPropertyById(id);
      setProperty(data);

      if (data) {
        // Migrate old data to new format
        const migratedData = migratePropertyData(data);
        
        // Set primary category
        const category = data.primary_category || '';
        setPrimaryCategory(category);
        
        // Set all form values
        Object.keys(migratedData).forEach((key) => {
          const value = (migratedData as any)[key];
          if (value !== undefined && value !== null) {
            setValue(key as keyof PropertyFormData, value);
          }
        });

        // Ensure category_assignments includes primary category
        const assignments = data.category_assignments || [];
        if (category && !assignments.includes(category)) {
          setValue('category_assignments', [category, ...assignments]);
        } else {
          setValue('category_assignments', assignments.length > 0 ? assignments : [category]);
        }

        // Fetch property images
        try {
          const images = await propertyService.getPropertyImages(data.id);
          setPropertyImages(images);
        } catch (imageError) {
          console.error('Failed to fetch property images:', imageError);
        }
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch property';
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
      navigate("/admin/properties");
    } finally {
      setIsLoading(false);
    }
  };

  const [pendingCategory, setPendingCategory] = useState<string>("");

  const handleCategorySelect = (slug: string) => {
    if (primaryCategory && primaryCategory !== slug) {
      setPendingCategory(slug);
      setShowCategoryChangeWarning(true);
    } else {
      setPrimaryCategory(slug);
      setValue('primary_category', slug);
      // Use the CURRENT form value (not the stale saved record) when syncing assignments
      const currentAssignments = (watch('category_assignments') || []) as string[];
      if (!currentAssignments.includes(slug)) {
        setValue('category_assignments', [slug, ...currentAssignments]);
      }
      setShowCategoryChangeWarning(false);
    }
  };

  const confirmCategoryChange = () => {
    if (pendingCategory) {
      const previousPrimary = primaryCategory;
      setPrimaryCategory(pendingCategory);
      setValue('primary_category', pendingCategory);
      // Drop the old primary and add the new one (fixes the auto-ticked boxes glitch)
      const currentAssignments = ((watch('category_assignments') || []) as string[])
        .filter((s) => s !== previousPrimary);
      setValue(
        'category_assignments',
        currentAssignments.includes(pendingCategory)
          ? currentAssignments
          : [pendingCategory, ...currentAssignments]
      );
      setShowCategoryChangeWarning(false);
      setPendingCategory("");
      toast({
        title: "Category Changed",
        description: "Category has been updated. Please review the form fields.",
      });
    }
  };

  const cancelCategoryChange = () => {
    setShowCategoryChangeWarning(false);
    setPendingCategory("");
  };

  const onSubmit = async (data: PropertyFormData) => {
    if (!id) return;

    try {
      setIsSubmitting(true);
      
      // Prepare property data - include all fields
      const unitVariants = (data.unit_variants ?? []).filter(
        (v: { type?: string; price?: string }) => !!(v.type?.trim() || v.price?.trim())
      );
      const propertyData: Partial<Omit<Property, 'id' | 'created_at'>> = {
        ...sanitizePayload(data),
        primary_category: primaryCategory || data.primary_category || property?.primary_category || '',
        category_assignments: data.category_assignments || [primaryCategory || property?.primary_category || ''],
        video_links: data.video_links || [],
        unit_variants: unitVariants.length ? unitVariants : undefined,
      };

      await propertyService.updateProperty(id, propertyData);

      toast({
        title: "Success",
        description: "Property updated successfully!",
      });

      navigate("/admin/properties");
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to update property';
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImagesSelected = (files: File[]) => {
    setSelectedImages(files);
  };

  const handleRemoveImage = (index: number) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleUploadImages = async () => {
    if (!id || selectedImages.length === 0) return;

    try {
      setIsUploadingImages(true);
      await propertyService.uploadMultipleImages(selectedImages, id);
      
      // Refresh property images
      const images = await propertyService.getPropertyImages(id);
      setPropertyImages(images);
      
      setSelectedImages([]);
      toast({
        title: "Success",
        description: `${selectedImages.length} images uploaded successfully!`,
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to upload images';
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsUploadingImages(false);
    }
  };

  const handleDeleteImage = async (imageId: string) => {
    try {
      await propertyService.deleteImage(imageId);
      
      // Refresh property images
      if (id) {
        const images = await propertyService.getPropertyImages(id);
        setPropertyImages(images);
      }
      
      toast({
        title: "Success",
        description: "Image deleted successfully!",
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to delete image';
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <AdminLayout title="Edit Property">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="flex items-center space-x-2">
            <Loader2 className="h-6 w-6 animate-spin" />
            <span>Loading property...</span>
          </div>
        </div>
      </AdminLayout>
    );
  }

  if (!property) {
    return (
      <AdminLayout title="Edit Property">
        <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
          <p className="text-red-600">Property not found</p>
          <Button onClick={() => navigate("/admin/properties")}>
            Back to Properties
          </Button>
        </div>
      </AdminLayout>
    );
  }

  const selectedCategoryConfig = primaryCategory ? getCategoryBySlug(primaryCategory) : null;

  return (
    <AdminLayout title="Edit Property">
      <div className="mb-6">
        <Button 
          variant="outline" 
          onClick={() => navigate("/admin/properties")}
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Properties
        </Button>
        
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Edit Property</h2>
          <p className="text-gray-600">Update property details</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            {property.header || property.building || 'Property'}
          </CardTitle>
          <CardDescription>
            Update the property information below
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Category Selection */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center">
                <Info className="h-4 w-4 mr-2" />
                Category
              </h3>
              <CategorySelector
                selectedCategory={primaryCategory}
                onCategorySelect={handleCategorySelect}
              />
              
              {showCategoryChangeWarning && pendingCategory && (
                <Alert variant="destructive">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>Category Change Warning</AlertTitle>
                  <AlertDescription>
                    Changing the category from <strong>{getCategoryBySlug(primaryCategory)?.name}</strong> to <strong>{getCategoryBySlug(pendingCategory)?.name}</strong> may affect the form fields. Category-specific data may need to be reviewed.
                    <div className="mt-2 flex gap-2">
                      <Button
                        type="button"
                        size="sm"
                        variant="destructive"
                        onClick={confirmCategoryChange}
                      >
                        Confirm Change
                      </Button>
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        onClick={cancelCategoryChange}
                      >
                        Cancel
                      </Button>
                    </div>
                  </AlertDescription>
                </Alert>
              )}
            </div>

            {/* Property Form (only show if category selected) */}
            {primaryCategory && selectedCategoryConfig && (
              <>
                {/* Common Fields */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center">
                    <Info className="h-4 w-4 mr-2" />
                    Common Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {getCommonFieldsForCategory(primaryCategory).map((field) => (
                      <DynamicFormField
                        key={field.key}
                        field={field}
                        control={control}
                      />
                    ))}
                  </div>
                </div>

                {/* Category-Specific Fields */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center">
                    <Info className="h-4 w-4 mr-2" />
                    {selectedCategoryConfig.name} Specific Details
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedCategoryConfig.fields.map((field) => (
                      <DynamicFormField
                        key={field.key}
                        field={field}
                        control={control}
                      />
                    ))}
                  </div>
                  {primaryCategory === "new-project" && (
                    <div className="mt-4">
                      <UnitVariantsInput control={control} />
                    </div>
                  )}
                </div>

                {/* Video Links */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center">
                    <Info className="h-4 w-4 mr-2" />
                    Video Links
                  </h3>
                  <VideoLinksInput control={control} />
                </div>

                {/* Multi-Category Assignment */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center">
                    <Info className="h-4 w-4 mr-2" />
                    Additional Category Visibility
                  </h3>
                  <MultiCategorySelector
                    control={control}
                    primaryCategory={primaryCategory}
                  />
                </div>

                {/* Submit Button */}
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Updating Property...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Update Property
                    </>
                  )}
                </Button>
              </>
            )}

            {!primaryCategory && (
              <div className="text-center py-8 text-muted-foreground">
                <p>Please select a category above to continue</p>
              </div>
            )}
          </form>
        </CardContent>
      </Card>

      {/* Image Management Section */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="flex items-center">
            <ImageIcon className="h-5 w-5 mr-2" />
            Property Images
          </CardTitle>
          <CardDescription>
            Manage property images. Upload new images or delete existing ones.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Upload New Images */}
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">Upload New Images</h4>
            <ImageUpload
              onImagesSelected={handleImagesSelected}
              selectedImages={selectedImages}
              onRemoveImage={handleRemoveImage}
              isUploading={isUploadingImages}
              maxImages={10}
            />
            {selectedImages.length > 0 && (
              <Button 
                onClick={handleUploadImages}
                disabled={isUploadingImages}
                className="w-full"
              >
                {isUploadingImages ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Uploading Images...
                  </>
                ) : (
                  <>
                    <Upload className="h-4 w-4 mr-2" />
                    Upload {selectedImages.length} Images
                  </>
                )}
              </Button>
            )}
          </div>

          {/* Existing Images */}
          {propertyImages.length > 0 && (
            <div className="space-y-4">
              <h4 className="font-medium text-gray-900">Existing Images ({propertyImages.length})</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {propertyImages.map((image) => (
                  <div key={image.id} className="relative group">
                    <Card className="overflow-hidden">
                      <CardContent className="p-0">
                        <img
                          src={image.image_url}
                          alt="Property"
                          className="w-full h-32 object-cover"
                        />
                      </CardContent>
                    </Card>
                    
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => handleDeleteImage(image.id)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </AdminLayout>
  );
};

export default EditProperty;
