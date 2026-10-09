import { useState, useEffect } from "react";
import { MapPin, IndianRupee, Building } from "lucide-react";
import { Property } from "@/lib/supabase";
import { propertyService } from "@/services/propertyService";
import { formatPriceWithCommas } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Watermark from "./Watermark";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const DISPLAY_LIMIT = 12;

interface IndependentBuildingsProps {
  allProperties?: Property[];
}

const IndependentBuildings = ({ allProperties }: IndependentBuildingsProps) => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [imagesMap, setImagesMap] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);
  // Residential / Commercial split for independent buildings
  const [usageFilter, setUsageFilter] = useState<"all" | "Residential" | "Commercial">("all");
  const navigate = useNavigate();

  const usageOf = (p: Property): string =>
    p.usage_type_category || (p.usage_type === "Residential" || p.usage_type === "Commercial" ? p.usage_type : "") || "";

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const source = allProperties ?? await propertyService.getAllProperties();
        // Filter for independent buildings category
        const filtered = source.filter(p => 
          p.primary_category === 'independent-buildings' || 
          (p.category_assignments && p.category_assignments.includes('independent-buildings'))
        );
        setProperties(filtered);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [allProperties]);

  useEffect(() => {
    if (properties.length === 0) return;
    const fetchImages = async () => {
      const map: Record<string, string> = {};
      await Promise.all(
        properties.map(async (p) => {
          try {
            const images = await propertyService.getPropertyImages(p.id);
            map[p.id] = images.length > 0 ? images[0].image_url : "/placeholder.svg";
          } catch {
            map[p.id] = "/placeholder.svg";
          }
        })
      );
      setImagesMap(map);
    };
    const t = setTimeout(fetchImages, 0);
    return () => clearTimeout(t);
  }, [properties.length]);

  const handleViewDetails = (property: Property) => {
    navigate(`/property/${property.id}`);
  };

  const visible = usageFilter === "all" ? properties : properties.filter(p => usageOf(p) === usageFilter);
  const displayed = showAll ? visible : visible.slice(0, DISPLAY_LIMIT);
  const hasMore = visible.length > DISPLAY_LIMIT;

  return (
    <section id="independent-buildings" className="py-20 bg-white">
      <div className="section-container">
        <div className="text-center mb-16">
          <h2 className="section-title">
            Independent <span className="text-sippy-gold">Buildings</span>
          </h2>
          <p className="section-subtitle mx-auto">
            Discover standalone commercial and residential buildings with exceptional investment potential.
          </p>
          <div className="gold-divider"></div>
        </div>

        {loading ? (
          <div className="text-center py-8">Loading...</div>
        ) : properties.length > 0 ? (
          <>
          <Tabs value={usageFilter} onValueChange={(v) => { setUsageFilter(v as typeof usageFilter); setShowAll(false); }} className="mb-8">
            <TabsList className="grid grid-cols-3 w-[320px] mx-auto">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="Residential">Residential</TabsTrigger>
              <TabsTrigger value="Commercial">Commercial</TabsTrigger>
            </TabsList>
          </Tabs>
          {visible.length === 0 && (
            <div className="text-center py-8 text-sippy-charcoal/60">No {usageFilter.toLowerCase()} independent buildings available right now.</div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayed.map((property) => (
              <div 
                key={property.id} 
                className="property-card bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow flex flex-col cursor-pointer"
                onClick={() => handleViewDetails(property)}
              >
                <div className="h-48 w-full overflow-hidden bg-gray-100">
                  <Watermark link={imagesMap[property.id] || "/placeholder.svg"} />
                </div>
                <div className="p-4 flex-grow flex flex-col">
                  <h3 className="font-bold mb-1 line-clamp-1">{property.header || property.building}</h3>
                  <div className="flex items-center mb-3 text-sm">
                    <MapPin className="h-4 w-4 text-sippy-gold mr-1" />
                    <span className="text-sippy-charcoal/80">{property.location || property.sub_location || 'Location not specified'}</span>
                  </div>
                  
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center">
                      <IndianRupee className="h-4 w-4 text-sippy-gold mr-1" />
                      <span className="font-semibold">
                      {(formatPriceWithCommas(property.price || property.price_range) || property.price || property.price_range)
                        ? ` ${formatPriceWithCommas(property.price || property.price_range) || property.price || property.price_range}`
                        : "Price on request"}
                    </span>
                    </div>
                    <div className="text-sm bg-sippy-beige px-2 py-1 rounded">
                      {usageOf(property) || 'Property'}{property.usage_type_category === 'Commercial' && property.commercial_type ? ` · ${property.commercial_type}` : ''}
                    </div>
                  </div>
                  
                  {property.description && (
                    <p className="text-sm text-sippy-charcoal/70 mb-4 line-clamp-2">{property.description}</p>
                  )}
                  
                  <button 
                    className="btn-outline mt-auto"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleViewDetails(property);
                    }}
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
          {hasMore && (
            <div className="mt-10 text-center">
              {!showAll ? (
                <Button className="btn-primary" onClick={() => setShowAll(true)}>Browse all independent buildings</Button>
              ) : (
                <Button variant="outline" className="border-sippy-gold text-sippy-charcoal hover:bg-sippy-beige" onClick={() => setShowAll(false)}>Show less</Button>
              )}
            </div>
          )}
          </>
        ) : (
          <div className="text-center py-8">
            <p className="text-lg text-sippy-charcoal/60">No independent buildings available at the moment.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default IndependentBuildings;
