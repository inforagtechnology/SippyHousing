import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, Control } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import AdminLayout from "@/components/layout/AdminLayout";
import { propertyService } from "@/services/propertyService";
import { Property } from "@/lib/supabase";
import ImageUpload from "@/components/ui/image-upload";
import { 
  ArrowLeft, 
  Plus, 
  Upload, 
  FileText, 
  Loader2,
  Image as ImageIcon,
  Info
} from "lucide-react";
import { CategorySelector } from "@/components/property/CategorySelector";
import { DynamicFormField } from "@/components/property/DynamicFormField";
import { MultiCategorySelector } from "@/components/property/MultiCategorySelector";
import { VideoLinksInput } from "@/components/property/VideoLinksInput";
import { UnitVariantsInput } from "@/components/property/UnitVariantsInput";
import { getCommonFieldsForCategory } from "@/config/commonFields";
import { getCategoryBySlug, PROPERTY_CATEGORIES } from "@/config/propertyCategories";

// Form validation schema - all fields optional
const createPropertySchema = () => {
  const baseSchema: Record<string, z.ZodTypeAny> = {
    // Common fields
    header: z.string().optional(),
    description: z.string().optional(),
    location: z.string().optional(),
    sub_location: z.string().optional(),
    city: z.string().optional(),
    country: z.string().optional(),
    real_property_name: z.string().optional(),
    remarks: z.string().optional(),
    deal_highlight: z.string().optional(),
    field_remarks: z.record(z.string()).optional(),
    lead_numbers: z.string().optional(),
    
       // Admin only fields
    property_code: z.string().optional(),
    internal_building_name: z.string().optional(),

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

const AddProperty = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [uploadedPropertyId, setUploadedPropertyId] = useState<string | null>(null);
  const [primaryCategory, setPrimaryCategory] = useState<string>("");

  const propertySchema = createPropertySchema();

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    watch,
  } = useForm<PropertyFormData>({
    resolver: zodResolver(propertySchema),
    defaultValues: {
      category_assignments: [],
      video_links: [],
      unit_variants: [],
    },
  });

  const handleCategorySelect = (slug: string) => {
    const previousPrimary = primaryCategory;
    setPrimaryCategory(slug);
    setValue('primary_category', slug);
    // Replace the OLD primary with the NEW one. Previously the old primary
    // (e.g. New Project / Resale & Rental) stayed ticked in "Additional Category
    // Visibility" after switching category – that was the auto-click glitch.
    const currentAssignments = (watch('category_assignments') || []) as string[];
    const cleaned = currentAssignments.filter(
      (s) => s !== previousPrimary || s === slug
    );
    setValue(
      'category_assignments',
      cleaned.includes(slug) ? cleaned : [slug, ...cleaned]
    );
  };

  const onSubmit = async (data: PropertyFormData) => {
    if (!primaryCategory) {
      toast({
        title: "Error",
        description: "Please select a category first",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsSubmitting(true);
      
      // Prepare property data - include all fields
      const unitVariants = (data.unit_variants ?? []).filter(
        (v: { type?: string; price?: string }) => !!(v.type?.trim() || v.price?.trim())
      );
      const propertyData: Partial<Omit<Property, 'id' | 'created_at'>> = {
        ...sanitizePayload(data),
        primary_category: primaryCategory,
        category_assignments: data.category_assignments || [primaryCategory],
        video_links: data.video_links || [],
        unit_variants: unitVariants.length ? unitVariants : undefined,
      };

      // Add the property
      const newProperty = await propertyService.addProperty(propertyData as Omit<Property, 'id' | 'created_at'>);
      setUploadedPropertyId(newProperty.id);

      // Upload images if any are selected
      if (selectedImages.length > 0) {
        try {
          await propertyService.uploadMultipleImages(selectedImages, newProperty.id);
          toast({
            title: "Success",
            description: `Property added successfully with ${selectedImages.length} images!`,
          });
        } catch (imageError) {
          toast({
            title: "Warning",
            description: "Property added but image upload failed. You can add images later.",
            variant: "destructive",
          });
        }
      } else {
        toast({
          title: "Success",
          description: "Property added successfully!",
        });
      }

      reset();
      setSelectedImages([]);
      setUploadedPropertyId(null);
      setPrimaryCategory("");
      navigate("/admin/properties");
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to add property';
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCsvUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.type !== 'text/csv' && !file.name.endsWith('.csv')) {
      toast({
        title: "Invalid file type",
        description: "Please upload a CSV file",
        variant: "destructive",
      });
      return;
    }

    setCsvFile(file);
  };

  const handleImagesSelected = (files: File[]) => {
    setSelectedImages(files);
  };

  const handleRemoveImage = (index: number) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
  };

  const processCsvUpload = async () => {
    if (!csvFile) return;

    try {
      setIsUploading(true);
      const text = await csvFile.text();
      const lines = text.split('\n');
      const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
      
      const properties = [];
      
      for (let i = 1; i < lines.length; i++) {
        if (!lines[i].trim()) continue;
        
        const values = lines[i].split(',').map(v => v.trim());
        const property: Partial<Omit<Property, 'id' | 'created_at'>> = {};
        
        headers.forEach((header, index) => {
          const value = values[index];
          switch (header) {
            case 'building':
            case 'builder':
            case 'location':
            case 'bhk':
            case 'flat_size':
            case 'price_range':
            case 'rera_number':
            case 'contact_number':
            case 'property_type':
            case 'usage_type':
            case 'additional_info':
              property[header] = value;
              break;
            case 'possession_date':
              property[header] = value;
              break;
            case 'towers':
            case 'acres':
            case 'units':
              property[header] = parseInt(value) || 0;
              break;
          }
        });
        
        if (property.building && property.builder && property.location && property.property_type && property.usage_type) {
          properties.push(property as Omit<Property, 'id' | 'created_at'>);
        }
      }

      if (properties.length === 0) {
        throw new Error('No valid properties found in CSV');
      }

      await propertyService.bulkInsertProperties(properties);

      toast({
        title: "Success",
        description: `${properties.length} properties uploaded successfully!`,
      });

      setCsvFile(null);
      navigate("/admin/properties");
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to upload CSV';
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const selectedCategoryConfig = primaryCategory ? getCategoryBySlug(primaryCategory) : null;

  return (
    <AdminLayout title="Add New Property">
      <div className="mb-6">
        <Button 
          variant="outline" 
          onClick={() => navigate("/admin")}
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>
        
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Add New Property</h2>
            <p className="text-gray-600">Add a new property to your listings</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
        {/* Manual Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Plus className="h-5 w-5 mr-2" />
              Add Property Manually
            </CardTitle>
            <CardDescription>
              Fill in the details for a single property
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Step 1: Category Selection */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center">
                  <Info className="h-4 w-4 mr-2" />
                  Step 1: Select Category
                </h3>
                <CategorySelector
                  selectedCategory={primaryCategory}
                  onCategorySelect={handleCategorySelect}
                />
              </div>

              {/* Step 2: Property Form (only show if category selected) */}
              {primaryCategory && selectedCategoryConfig && (
                <>
                  {/* Common Fields */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold flex items-center">
                      <Info className="h-4 w-4 mr-2" />
                      Step 2: Common Information
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
                      Step 3: {selectedCategoryConfig.name} Specific Details
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
                      Step 4: Video Links
                    </h3>
                    <VideoLinksInput control={control} />
                  </div>

                  {/* Image Upload */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold flex items-center">
                      <ImageIcon className="h-4 w-4 mr-2" />
                      Step 5: Property Images
                    </h3>
                    <ImageUpload
                      onImagesSelected={handleImagesSelected}
                      selectedImages={selectedImages}
                      onRemoveImage={handleRemoveImage}
                      isUploading={isSubmitting}
                      maxImages={10}
                    />
                  </div>

                  {/* Multi-Category Assignment */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold flex items-center">
                      <Info className="h-4 w-4 mr-2" />
                      Step 6: Additional Category Visibility
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
                        Adding Property...
                      </>
                    ) : (
                      <>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Property
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

        {/* CSV Upload */}
        {/* <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Upload className="h-5 w-5 mr-2" />
              Upload via CSV
            </CardTitle>
            <CardDescription>
              Upload multiple properties using a CSV file
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="csv-file">Select CSV File</Label>
                <Input
                  id="csv-file"
                  type="file"
                  accept=".csv"
                  onChange={handleCsvUpload}
                  className="mt-2"
                />
              </div>

              {csvFile && (
                <div className="flex items-center space-x-2 p-3 bg-blue-50 rounded-lg">
                  <FileText className="h-4 w-4 text-blue-600" />
                  <span className="text-sm text-blue-800">{csvFile.name}</span>
                </div>
              )}

              <Button 
                onClick={processCsvUpload} 
                disabled={!csvFile || isUploading}
                className="w-full"
              >
                {isUploading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="h-4 w-4 mr-2" />
                    Upload CSV
                  </>
                )}
              </Button>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold">CSV Template</h4>
              <p className="text-sm text-gray-600">
                Your CSV should have the following columns (first row as headers):
              </p>
              <div className="bg-gray-50 p-3 rounded-lg">
                <code className="text-xs">
                  building,builder,location,possession_date,towers,acres,units,bhk,flat_size,price_range,rera_number,contact_number,property_type,usage_type,additional_info
                </code>
              </div>
              <p className="text-xs text-gray-500">
                Note: possession_date should be in YYYY-MM-DD format
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold">Sample CSV Data</h4>
              <div className="bg-gray-50 p-3 rounded-lg">
                <code className="text-xs">
                  Luxury Heights,ABC Developers,Mumbai Maharashtra,2024-12-31,4,2.5,200,2BHK,1200 sq ft,₹85L - ₹1.2Cr,MahaRERA/A51234,+91-9876543210,New,Residential,Premium amenities
                </code>
              </div>
            </div>
          </CardContent>
        </Card> */}
      </div>
    </AdminLayout>
  );
};

export default AddProperty;
