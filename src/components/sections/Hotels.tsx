import { useState, useEffect } from "react";
import { MapPin, IndianRupee, Building, Hotel } from "lucide-react";
import { Property } from "@/lib/supabase";
import { propertyService } from "@/services/propertyService";
import { formatPriceWithCommas } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Watermark from "./Watermark";

const DISPLAY_LIMIT = 12;

interface HotelsProps {
  allProperties?: Property[];
}

const Hotels = ({ allProperties }: HotelsProps) => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [imagesMap, setImagesMap] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const source = allProperties ?? await propertyService.getAllProperties();
        // Filter for hotels category
        const filtered = source.filter(p => 
          p.primary_category === 'hotels' || 
          (p.category_assignments && p.category_assignments.includes('hotels'))
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

  const displayed = showAll ? properties : properties.slice(0, DISPLAY_LIMIT);
  const hasMore = properties.length > DISPLAY_LIMIT;

  return (
    <section id="hotels" className="py-20 bg-sippy-beige">
      <div className="section-container">
        <div className="text-center mb-16">
          <h2 className="section-title">
            Hotels <span className="text-sippy-gold">&</span> Hospitality
          </h2>
          <p className="section-subtitle mx-auto">
            Premium hotel properties and hospitality investments with strong revenue potential.
          </p>
          <div className="gold-divider"></div>
        </div>

        {loading ? (
          <div className="text-center py-8">Loading...</div>
        ) : properties.length > 0 ? (
          <>
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
                  <div className="flex items-center mb-2 text-sippy-gold">
                    <Hotel className="h-4 w-4 mr-2" />
                    <span className="text-xs font-semibold uppercase">Hotel Property</span>
                  </div>
                  <h3 className="font-bold mb-1 line-clamp-1">{property.header || property.society_property_name || property.building}</h3>
                  <div className="flex items-center mb-3 text-sm">
                    <MapPin className="h-4 w-4 text-sippy-gold mr-1" />
                    <span className="text-sippy-charcoal/80">{property.location || property.sub_location || 'Location not specified'}</span>
                  </div>
                  
                  {(() => {
                    const opt = property.transaction_option;
                    const preLeased = opt === "Pre-Leased" || property.is_pre_leased === true || property.is_pre_leased === "Yes";
                    let label = "Price";
                    let amount = property.sale_price || property.price_range;
                    if (opt === "Rent") { label = "Rent / month"; amount = property.rent; }
                    else if (opt === "Operating Basis") { label = "Operating"; amount = property.operating_price; }
                    else if (opt === "Pre-Leased") { label = "Sale"; amount = property.pre_leased_sale_price || property.sale_price; }
                    const shown = formatPriceWithCommas(amount) || amount;
                    return (
                      <>
                        <div className="flex justify-between items-center mb-2">
                          <div className="flex items-center">
                            <IndianRupee className="h-4 w-4 text-sippy-gold mr-1" />
                            <span className="font-semibold">{shown ? ` ${shown}` : "Price on request"}</span>
                            {shown && <span className="ml-1 text-xs text-sippy-charcoal/60">({label})</span>}
                          </div>
                          <div className="flex gap-1">
                            {opt && opt !== "Pre-Leased" && (
                              <div className="text-sm bg-sippy-beige px-2 py-1 rounded">{opt}</div>
                            )}
                            {preLeased && (
                              <div className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">Pre-Leased</div>
                            )}
                          </div>
                        </div>
                        {(property.operator_brand || property.deposit || (opt === "Pre-Leased" && property.pre_leased_rent_price)) && (
                          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-sippy-charcoal/70 mb-3">
                            {property.operator_brand && <span>Operator: {property.operator_brand}</span>}
                            {property.deposit && <span>Deposit: {formatPriceWithCommas(property.deposit) || property.deposit}</span>}
                            {opt === "Pre-Leased" && property.pre_leased_rent_price && (
                              <span>Rent: {formatPriceWithCommas(property.pre_leased_rent_price) || property.pre_leased_rent_price}</span>
                            )}
                          </div>
                        )}
                      </>
                    );
                  })()}

                  <div className="flex flex-wrap gap-4 mb-4 text-sm">
                    {property.no_of_rooms && (
                      <div>
                        <span className="font-medium">Rooms:</span> {property.no_of_rooms}
                      </div>
                    )}
                    {property.floors && (
                      <div>
                        <span className="font-medium">Floors:</span> {property.floors}
                      </div>
                    )}
                    {property.built_up_area && (
                      <div>
                        <span className="font-medium">Area:</span> {property.built_up_area}
                      </div>
                    )}
                  </div>
                  
                  {property.monthly_revenue && (
                    <div className="mb-4">
                      <span className="text-sm font-medium">Monthly Revenue: </span>
                      <span className="text-sm text-sippy-gold font-semibold">{property.monthly_revenue}</span>
                    </div>
                  )}
                  
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
                <Button className="btn-primary" onClick={() => setShowAll(true)}>Browse all hotel properties</Button>
              ) : (
                <Button variant="outline" className="border-sippy-gold text-sippy-charcoal hover:bg-sippy-beige" onClick={() => setShowAll(false)}>Show less</Button>
              )}
            </div>
          )}
          </>
        ) : (
          <div className="text-center py-8">
            <p className="text-lg text-sippy-charcoal/60">No hotel properties available at the moment.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Hotels;
