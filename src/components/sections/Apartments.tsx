import { formatConfigurationList, formatConfiguration, getPropertyConfigurationLabel } from "@/lib/propertyHelpers";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building, MapPin, ArrowRight, Home, IndianRupee, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Watermark from './Watermark';
import { propertyService } from '@/services/propertyService';
import { Property } from '@/lib/supabase';
import { formatPriceWithCommas, getNewProjectFromPrice } from "@/lib/utils";

type Apartment = {
  id: string;
  title: string;
  builder: string;
  location: string;
  possessionDate: string;
  towers: number | string;
  acres: number | string;
  totalFlats: number | string;
  bedroomTypes: string;
  size: string;
  price: string;
  type: 'premium' | 'budget';
  city: 'mumbai' | 'nearby';
  image: string;
  units: number | string;
  bhk: (string | number | undefined)[];
  photo: string[];
};

// Helper function to map database Property to component Apartment
const mapPropertyToApartment = (property: Property): Apartment => {
  // Determine type based on price range or property type
  const isPremium = property.price_range && (
    property.price_range.includes('Cr') || 
    property.price_range.includes('L') ||
    property.property_type === 'New' ||
    property.usage_type === 'Residential'
  );
  
  // Determine city based on location
  // location can be empty/null for some properties – never call string methods on it directly
  const locationText = (property.location || property.sub_location || '').toLowerCase();
  const isMumbai = locationText.includes('mumbai') ||
                   locationText.includes('bandra') ||
                   locationText.includes('khar') ||
                   locationText.includes('santacruz');

  const fromPrice = getNewProjectFromPrice(property);
  return {
    id: property.id,
    title: property.header || property.building || '',
    builder: property.builder || '',
    location: property.location || property.sub_location || '',
    possessionDate: property.possession || property.possession_date || '',
    towers: property.towers || '',
    acres: property.acres || '',
    totalFlats: property.units || '',
    bedroomTypes: getPropertyConfigurationLabel(property),
    size: property.area || property.flat_size || '',
    price: fromPrice || property.price_range || property.price || '',
    type: isPremium ? 'premium' : 'budget',
    city: isMumbai ? 'mumbai' : 'nearby',
    image: '/placeholder.svg', // Default placeholder image
    units: property.units || '',
    bhk: property.bhk_options || (property.bhk ? property.bhk.split(',').map(b => b.trim()) : []),
    photo: ['/placeholder.svg'] // Default placeholder
  };
};

const DISPLAY_LIMIT = 12;

interface ApartmentsProps {
  allProperties?: Property[];
}

const Apartments = ({ allProperties }: ApartmentsProps) => {
  const [activeTab, setActiveTab] = useState("all");
  const [apartments, setApartments] = useState<Apartment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        setError(null);
        // Use category-based filtering for new projects
        const source = allProperties 
          ? allProperties.filter(property => 
              property.primary_category === 'new-project' || 
              (property.category_assignments && property.category_assignments.includes('new-project'))
            )
          : await propertyService.getPropertiesByCategory('new-project');
        
        // Map properties to apartment format
        const mappedApartments = source.map(mapPropertyToApartment);
        
        setApartments(mappedApartments);
      } catch (err) {
        console.error('Error fetching properties:', err);
        setError('Failed to load properties. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [allProperties]);

  // Fetch images last (after properties are shown) – deferred so UI paints first
  useEffect(() => {
    if (apartments.length === 0) return;

    const fetchPropertyImages = async () => {
      try {
        const apartmentsWithImages = await Promise.all(
          apartments.map(async (apartment) => {
            try {
              const images = await propertyService.getPropertyImages(apartment.id);
              return {
                ...apartment,
                image: images.length > 0 ? images[0].image_url : "/placeholder.svg",
                photo: images.length > 0 ? images.map((img) => img.image_url) : ["/placeholder.svg"],
              };
            } catch (err) {
              console.error(`Error fetching images for property ${apartment.id}:`, err);
              return apartment;
            }
          })
        );

        const sortedApartments = apartmentsWithImages.sort((a, b) => {
          const aHasImage = a.image !== "/placeholder.svg";
          const bHasImage = b.image !== "/placeholder.svg";
          if (aHasImage === bHasImage) return 0;
          if (aHasImage && !bHasImage) return -1;
          return 1;
        });

        setApartments(sortedApartments);
      } catch (err) {
        console.error("Error fetching property images:", err);
      }
    };

    // Defer image fetch so property list paints first (call image API at last)
    const t = setTimeout(fetchPropertyImages, 0);
    return () => clearTimeout(t);
  }, [apartments.length]);

  const filteredApartments = apartments.filter(apartment => {
    if (activeTab === "all") return true;
    if (activeTab === "premium") return apartment.type === "premium";
    if (activeTab === "budget") return apartment.type === "budget";
    if (activeTab === "mumbai") return apartment.city === "mumbai";
    if (activeTab === "nearby") return apartment.city === "nearby";
    return true;
  });
  const displayedApartments = showAll ? filteredApartments : filteredApartments.slice(0, DISPLAY_LIMIT);
  const hasMore = filteredApartments.length > DISPLAY_LIMIT;

  const handleViewDetails = (apartment: Apartment) => {
    navigate(`/property/${apartment.id}`);
  };

  if (loading) {
    return (
      <section id="apartments" className="py-10 bg-sippy-beige">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="section-title">
              Apartments <span className="text-sippy-gold">&</span> Flats
            </h2>
            <p className="section-subtitle mx-auto">
              From premium residences to budget-friendly homes, discover your ideal living space across Mumbai and nearby metros.
            </p>
            <div className="gold-divider"></div>
          </div>
          
          <div className="flex justify-center items-center py-10">
            <Loader2 className="h-8 w-8 animate-spin text-sippy-gold" />
            <span className="ml-2 text-lg">Loading properties...</span>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="apartments" className="py-10 bg-sippy-beige">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="section-title">
              Apartments <span className="text-sippy-gold">&</span> Flats
            </h2>
            <p className="section-subtitle mx-auto">
              From premium residences to budget-friendly homes, discover your ideal living space across Mumbai and nearby metros.
            </p>
            <div className="gold-divider"></div>
          </div>
          
          <div className="text-center py-10">
            <p className="text-lg text-red-600 mb-4">{error}</p>
            <Button onClick={() => window.location.reload()}>
              Try Again
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="apartments" className="py-10 bg-sippy-beige">
      <div className="section-container">
        <div className="text-center mb-16">
          <h2 className="section-title">
            Apartments <span className="text-sippy-gold">&</span> Flats
          </h2>
          <p className="section-subtitle mx-auto">
            From premium residences to budget-friendly homes, discover your ideal living space across Mumbai and nearby metros.
          </p>
          <div className="gold-divider"></div>
        </div>

        <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-2 md:grid-cols-5 mb-8">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="premium">Premium</TabsTrigger>
            <TabsTrigger value="budget">Budget</TabsTrigger>
            {/* <TabsTrigger value="mumbai">Mumbai</TabsTrigger> */}
            {/* <TabsTrigger value="nearby">Nearby Metros</TabsTrigger> */}
          </TabsList>

          <TabsContent value={activeTab} className="mt-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {displayedApartments.map(apartment => (
                <div key={apartment.id} className="property-card">
                  <div className="relative h-48">
                    <Watermark link={apartment.image} />
                    <div className="absolute top-0 left-0 w-full p-2 z-10">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${apartment.type === 'premium' ? 'bg-sippy-gold text-white' : 'bg-white text-sippy-charcoal'}`}>
                        {apartment.type === 'premium' ? 'Premium' : 'Budget'}
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold mb-1">{apartment.title}</h3>
                    <div className="flex items-center mb-3 text-sm">
                      <MapPin className="h-4 w-4 text-sippy-gold mr-1" />
                      <span className="text-sippy-charcoal/80">{apartment.location}</span>
                    </div>
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex items-center">
                        <IndianRupee className="h-4 w-4 text-sippy-gold mr-1" />
                        <span className="font-semibold">
                          {apartment.price && apartment.price.startsWith('From ') ? apartment.price : ` ${formatPriceWithCommas(apartment.price) || apartment.price || 'Price on request'}`}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center text-sm mb-3">
                      <Home className="h-4 w-4 text-sippy-gold mr-1" />
                      <span>{apartment.size}</span>
                    </div>
                    {apartment.bedroomTypes && (
                      <div className="flex items-center mb-3">
                        <Home className="h-4 w-4 text-sippy-gold mr-1" />
                        <span className="text-sm">{apartment.bedroomTypes}</span>
                      </div>
                    )}
                    <button
                      onClick={() => handleViewDetails(apartment)}
                      className="text-sippy-gold hover:text-sippy-charcoal transition-colors text-sm flex items-center"
                    >
                      View Details <ArrowRight className="ml-1 h-3 w-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {hasMore && (
              <div className="mt-10 text-center">
                {!showAll ? (
                  <Button className="btn-primary" onClick={() => setShowAll(true)}>
                    Browse all apartments & flats properties
                  </Button>
                ) : (
                  <Button variant="outline" className="border-sippy-gold text-sippy-charcoal hover:bg-sippy-beige" onClick={() => setShowAll(false)}>
                    Show less
                  </Button>
                )}
              </div>
            )}
            {filteredApartments.length === 0 && (
              <div className="text-center py-8">
                <p className="text-lg mb-4">No apartments found matching your criteria.</p>
                <Button onClick={() => setActiveTab("all")}>View All Apartments</Button>
              </div>
            )}
          </TabsContent>
        </Tabs>

        
      </div>
    </section>
  );
};

export default Apartments;
