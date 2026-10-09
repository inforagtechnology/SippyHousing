import { useState, useEffect } from "react";
import { MapPin, IndianRupee, Building2, Users } from "lucide-react";
import { Property } from "@/lib/supabase";
import { propertyService } from "@/services/propertyService";
import { formatPriceWithCommas, getPropertyPriceStr } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import Watermark from "./Watermark";
import { Button } from "@/components/ui/button";

const DISPLAY_LIMIT = 12;

interface RedevelopmentJVProps {
  allProperties?: Property[];
}

const RedevelopmentJV = ({ allProperties }: RedevelopmentJVProps) => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const [imagesMap, setImagesMap] = useState<Record<string, string>>({});
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const source = allProperties ?? await propertyService.getAllProperties();
        const filtered = source.filter(
          (p) =>
            p.primary_category === "redevelopment-jv" ||
            (p.category_assignments && p.category_assignments.includes("redevelopment-jv"))
        );
        setProperties(filtered);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [allProperties]);

  // Fetch images last (after properties are shown) – deferred
  useEffect(() => {
    if (properties.length === 0) return;
    const loadImages = async () => {
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
    const t = setTimeout(loadImages, 0);
    return () => clearTimeout(t);
  }, [properties.length]);

  const handleViewDetails = (property: Property) => {
    navigate(`/property/${property.id}`);
  };

  const priceStr = (p: Property) =>
    getPropertyPriceStr(p) || p.corpus_amount
      ? ` ${formatPriceWithCommas(p.corpus_amount || getPropertyPriceStr(p)) || p.corpus_amount || getPropertyPriceStr(p)}` //₹
      : "Price on request";

  const displayed = showAll ? properties : properties.slice(0, DISPLAY_LIMIT);
  const hasMore = properties.length > DISPLAY_LIMIT;

  return (
    <section id="redevelopment-jv" className="py-20 bg-sippy-beige">
      <div className="section-container">
        <div className="text-center mb-16">
          <h2 className="section-title">
            Redevelopment <span className="text-sippy-gold">&</span> Joint Venture
          </h2>
          <p className="section-subtitle mx-auto">
            Society redevelopment and joint venture opportunities. Partner with us to transform your property.
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
                <div className="relative h-48 bg-gray-100">
                  <Watermark link={imagesMap[property.id] || "/placeholder.svg"} />
                </div>
                <div className="p-4 flex-grow flex flex-col">
                  <h3 className="font-bold mb-1 line-clamp-1">
                    {property.society_property_name || property.header || property.building}
                  </h3>
                  <div className="flex items-center mb-3 text-sm">
                    <MapPin className="h-4 w-4 text-sippy-gold mr-1 shrink-0" />
                    <span className="text-sippy-charcoal/80 line-clamp-1">
                      {property.location || property.sub_location || "Location not specified"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center">
                      <IndianRupee className="h-4 w-4 text-sippy-gold mr-1" />
                      <span className="font-semibold text-sm">{priceStr(property)}</span>
                    </div>
                    {property.stage && (
                      <span className="text-xs bg-sippy-gold/20 text-sippy-charcoal px-2 py-1 rounded">
                        {property.stage}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4 text-sm text-sippy-charcoal/70">
                    {property.number_of_members != null && (
                      <span className="flex items-center">
                        <Users className="h-4 w-4 text-sippy-gold mr-1" />
                        {property.number_of_members} members
                      </span>
                    )}
                    {property.plot_size && (
                      <span className="flex items-center">
                        <Building2 className="h-4 w-4 text-sippy-gold mr-1" />
                        {property.plot_size}
                      </span>
                    )}
                  </div>
                  {property.description && (
                    <p className="text-sm text-sippy-charcoal/70 mb-4 line-clamp-2">{property.description}</p>
                  )}
                  {property.commercial_terms && (
                    <p className="text-sm text-sippy-charcoal/70 mb-4 line-clamp-2">
                      <span className="font-medium">Commercial terms:</span> {property.commercial_terms}
                    </p>
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
                <Button className="btn-primary" onClick={() => setShowAll(true)}>Browse all redevelopment & joint venture</Button>
              ) : (
                <Button variant="outline" className="border-sippy-gold text-sippy-charcoal hover:bg-sippy-beige" onClick={() => setShowAll(false)}>Show less</Button>
              )}
            </div>
          )}
          </>
        ) : (
          <div className="text-center py-8">
            <p className="text-lg text-sippy-charcoal/60">
              No redevelopment or joint venture listings at the moment.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default RedevelopmentJV;
