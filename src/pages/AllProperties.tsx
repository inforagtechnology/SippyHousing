import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import AdminLayout from "@/components/layout/AdminLayout";
import { propertyService, PropertyImage } from "@/services/propertyService";
import { Property } from "@/lib/supabase";
import { formatPriceWithCommas } from "@/lib/utils";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { 
  ArrowLeft, 
  Building2, 
  Home, 
  MapPin, 
  Bed, 
  Bath, 
  Square, 
  IndianRupee,
  Loader2,
  Eye,
  Edit,
  Trash2,
  Key,
  Calendar,
  Phone,
  Hash,
  Plus,
  AlertTriangle,
  Video,
  User
} from "lucide-react";
import { getPropertyConfigurationLabel } from "@/lib/propertyHelpers";
import { getPropertyPriceStr } from "@/lib/utils";

const AllProperties = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [properties, setProperties] = useState<Property[]>([]);
  const [propertyImages, setPropertyImages] = useState<Record<string, PropertyImage[]>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const imagesRequestRef = useRef(0);

  useEffect(() => {
    fetchProperties();
    return () => {
      imagesRequestRef.current = -1;
    };
  }, []);

  const fetchProperties = async () => {
    const requestId = Date.now();
    imagesRequestRef.current = requestId;
    try {
      setLoading(true);
      setError(null);
      setPropertyImages({});
      const data = await propertyService.getAllProperties();
      setProperties(data);
      // Render list immediately; images continue loading in background.
      setLoading(false);

      data.forEach((property) => {
        propertyService
          .getPropertyImages(property.id)
          .then((images) => {
            if (imagesRequestRef.current !== requestId) return;
            setPropertyImages((prev) => ({ ...prev, [property.id]: images }));
          })
          .catch((fetchError) => {
            console.error(`Failed to fetch images for property ${property.id}:`, fetchError);
            if (imagesRequestRef.current !== requestId) return;
            setPropertyImages((prev) => ({ ...prev, [property.id]: [] }));
          });
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch properties';
      setError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      // Keep this as a safety net for error paths.
      setLoading(false);
    }
  };

  const getPropertyIcon = (propertyType?: string) => {
    switch (propertyType?.toLowerCase()) {
      case 'new':
        return <Building2 className="h-5 w-5" />;
      case 'rental':
        return <Key className="h-5 w-5" />;
      case 'resale':
        return <Home className="h-5 w-5" />;
      default:
        return <Building2 className="h-5 w-5" />;
    }
  };

  const getPropertyTypeBadge = (propertyType?: string) => {
    switch (propertyType?.toLowerCase()) {
      case 'new':
        return <Badge className="bg-blue-100 text-blue-800">New</Badge>;
      case 'rental':
        return <Badge className="bg-purple-100 text-purple-800">Rental</Badge>;
      case 'resale':
        return <Badge className="bg-green-100 text-green-800">Resale</Badge>;
      default:
        return <Badge variant="outline">{propertyType}</Badge>;
    }
  };

  const getUsageTypeBadge = (usageType?: string) => {
    switch (usageType?.toLowerCase()) {
      case 'residential':
        return <Badge className="bg-orange-100 text-orange-800">Residential</Badge>;
      case 'commercial':
        return <Badge className="bg-indigo-100 text-indigo-800">Commercial</Badge>;
      default:
        return <Badge variant="outline">{usageType}</Badge>;
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Not specified';
    return new Date(dateString).toLocaleDateString('en-IN');
  };

  const handleDeleteProperty = async (propertyId: string, propertyName: string) => {
    try {
      await propertyService.deleteProperty(propertyId);
      
      toast({
        title: "Success",
        description: `${propertyName} has been deleted successfully!`,
      });
      
      // Refresh the properties list
      fetchProperties();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to delete property';
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <AdminLayout title="All Properties">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="flex items-center space-x-2">
            <Loader2 className="h-6 w-6 animate-spin" />
            <span>Loading properties...</span>
          </div>
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout title="All Properties">
        <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
          <p className="text-red-600">{error}</p>
          <Button onClick={fetchProperties}>Retry</Button>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="All Properties">
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
              <h2 className="text-2xl font-bold text-gray-900">All Properties</h2>
              <p className="text-gray-600">Manage and view all your property listings</p>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" onClick={() => navigate("/admin/add-property")}>
                <Plus className="h-4 w-4 mr-2" />
                Add Property
              </Button>
              <Button onClick={fetchProperties}>
                <Eye className="h-4 w-4 mr-2" />
                Refresh
              </Button>
            </div>
          </div>
      </div>

       {/* Summary */}
       {properties.length > 0 && (
        <Card className="mt-8 mb-8">
          <CardContent className="pt-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-600">Total Properties</p>
                <p className="text-2xl font-bold">{properties.length}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Last Updated</p>
                <p className="text-sm font-medium">
                  {new Date().toLocaleDateString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {properties.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Building2 className="h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Properties Found</h3>
            <p className="text-gray-600 text-center mb-4">
              You haven't added any properties yet. Start by adding your first property.
            </p>
            <Button onClick={() => navigate("/admin")}>
              Add New Property
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <Card key={property.id} className="hover:shadow-lg transition-shadow">
              {/* Property Image */}
              {propertyImages[property.id] && propertyImages[property.id].length > 0 && (
                <div className="relative h-48 overflow-hidden rounded-t-lg">
                  <img
                    src={propertyImages[property.id][0].image_url}
                    alt={property.building}
                    className="w-full h-full object-cover"
                  />
                  {propertyImages[property.id].length > 1 && (
                    <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                      +{propertyImages[property.id].length - 1} more
                    </div>
                  )}
                </div>
              )}
              
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2">
                    {getPropertyIcon(property.property_type)}
                    <CardTitle className="text-lg">{property.building}</CardTitle>
                  </div>
                  <div className="flex flex-col gap-1">
                    {getPropertyTypeBadge(property.property_type)}
                    {getUsageTypeBadge(property.usage_type)}
                  </div>
                </div>
                <CardDescription className="flex items-center space-x-1">
                  <MapPin className="h-4 w-4" />
                  <span>{property.location || 'Location not specified'}</span>
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Property Details – shows what was actually entered for this category; empty fields are hidden */}
                {(() => {
                  const has = (v: unknown) => v !== undefined && v !== null && String(v).trim() !== '' && String(v).trim().toUpperCase() !== 'N/A';
                  const first = (...vals: unknown[]) => vals.find(has) as string | number | undefined;
                  const p = property as Property & Record<string, unknown>;
                  const isRent = p.property_type === 'Rental' || p.transaction_option === 'Rent' ||
                                 (!has(p.price) && !has(p.price_range) && !has(p.sale_price) && has(p.rent));
                  const priceRaw = first(p.price_range, getPropertyPriceStr(p));
                  const priceText = has(priceRaw) ? (formatPriceWithCommas(String(priceRaw)) || String(priceRaw)) : '';
                  const size = first(p.flat_size, p.area, p.plot_size, p.built_up_area, p.constructed_area, p.property_size, p.size);
                  const possession = has(p.possession_date) ? formatDate(String(p.possession_date)) : first(p.possession);
                  const developer = first(p.builder, p.society_property_name, p.real_property_name);
                  const config = getPropertyConfigurationLabel(p) || (has(p.commercial_type) ? String(p.commercial_type) : '') ||
                                 (has(p.no_of_rooms) ? `${p.no_of_rooms} rooms` : '');
                  const listing = first(p.transaction_option, p.transaction_type_international, p.property_type);
                  const phone = first(p.contact_number, p.lead_numbers);
                  const videoCount = Array.isArray(p.video_links) ? p.video_links.length : 0;

                  const rows: { icon: JSX.Element; text: string; bold?: boolean }[] = [];
                  if (developer) rows.push({ icon: <Building2 className="h-4 w-4 text-gray-500" />, text: String(developer) });
                  if (config) rows.push({ icon: <Home className="h-4 w-4 text-gray-500" />, text: config });
                  if (size) rows.push({ icon: <Square className="h-4 w-4 text-gray-500" />, text: String(size) });
                  rows.push({
                    icon: <IndianRupee className="h-4 w-4 text-gray-500" />,
                    text: priceText ? `₹ ${priceText}${isRent ? ' / month' : ''}` : 'Price on request',
                    bold: true,
                  });
                  if (listing) rows.push({ icon: <Key className="h-4 w-4 text-gray-500" />, text: String(listing) });
                  if (possession) rows.push({ icon: <Calendar className="h-4 w-4 text-gray-500" />, text: String(possession) });
                  if (has(p.sales_person_name)) rows.push({ icon: <User className="h-4 w-4 text-gray-500" />, text: String(p.sales_person_name) });
                  if (phone) rows.push({ icon: <Phone className="h-4 w-4 text-gray-500" />, text: String(phone) });
                  if (videoCount > 0) rows.push({ icon: <Video className="h-4 w-4 text-green-600" />, text: `${videoCount} video${videoCount > 1 ? 's' : ''} added` });

                  return (
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      {rows.map((r, i) => (
                        <div key={i} className="flex items-center space-x-2 min-w-0">
                          {r.icon}
                          <span className={`truncate ${r.bold ? 'font-semibold' : ''}`}>{r.text}</span>
                        </div>
                      ))}
                    </div>
                  );
                })()}

                {/* Additional Info */}
                {property.additional_info && (
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {property.additional_info}
                  </p>
                )}

                {/* Action Buttons */}
                <div className="flex space-x-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1" onClick={() => navigate(`/admin/edit-property/${property.id}`)}>
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => navigate(`/admin/edit-property/${property.id}`)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle className="flex items-center">
                          <AlertTriangle className="h-5 w-5 mr-2 text-red-500" />
                          Delete Property
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete "{property.building}"? This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDeleteProperty(property.id, property.building)}
                          className="bg-red-600 hover:bg-red-700"
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

     
    </AdminLayout>
  );
};

export default AllProperties; 
