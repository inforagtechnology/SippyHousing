import { MapPin, IndianRupee, Globe2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Property } from "@/lib/supabase";
import { propertyService } from "@/services/propertyService";
import { formatPriceWithCommas } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Watermark from "./Watermark";

const DISPLAY_LIMIT = 12;

interface InternationalProps {
  allProperties?: Property[];
}

const International = ({ allProperties }: InternationalProps) => {
  const navigate = useNavigate();
  const [properties, setProperties] = useState<Property[]>([]);
  const [imagesMap, setImagesMap] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);
  // Country comes first: visitors pick a country, then see its listings
  const [country, setCountry] = useState<string>("all");

  const handleViewDetails = (property: Property) => {
    navigate(`/property/${property.id}`);
  };

  const countries = Array.from(
    new Set(properties.map(p => (p.country || "").trim()).filter(Boolean))
  ).sort((a, b) => a.localeCompare(b));
  const byCountry = country === "all" ? properties : properties.filter(p => (p.country || "").trim() === country);
  // Keep listings grouped by country when viewing "All"
  const sorted = country === "all"
    ? [...byCountry].sort((a, b) => (a.country || "~").localeCompare(b.country || "~"))
    : byCountry;
  const displayed = showAll ? sorted : sorted.slice(0, DISPLAY_LIMIT);
  const hasMore = sorted.length > DISPLAY_LIMIT;

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        // Use category-based filtering
        const intlProps = allProperties 
          ? allProperties.filter(p => 
              p.primary_category === 'international' || 
              (p.category_assignments && p.category_assignments.includes('international'))
            )
          : await propertyService.getPropertiesByCategory('international');
        
        setProperties(intlProps);
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

  return (
    <section id="international" className="py-20 bg-white">
      <div className="section-container">
        <div className="text-center mb-16">
          <h2 className="section-title">
            International <span className="text-sippy-gold">Properties</span>
          </h2>
          <p className="section-subtitle mx-auto">
            Curated international listings with strong yields and premium locations.
          </p>
          <div className="gold-divider"></div>
        </div>

        {loading ? (
          <div className="text-center py-8">Loading...</div>
        ) : (
          <>
          {countries.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {["all", ...countries].map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => { setCountry(c); setShowAll(false); }}
                  className={`px-4 py-1.5 rounded-full text-sm border transition-colors ${
                    country === c
                      ? "bg-sippy-gold text-white border-sippy-gold"
                      : "bg-white text-sippy-charcoal border-gray-200 hover:border-sippy-gold"
                  }`}
                >
                  {c === "all" ? "All Countries" : c}
                </button>
              ))}
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayed.map((p) => (
              <div
                key={p.id}
                role="button"
                tabIndex={0}
                onClick={() => handleViewDetails(p)}
                onKeyDown={(e) => e.key === "Enter" && handleViewDetails(p)}
                className="property-card bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow flex flex-col cursor-pointer"
              >
                <div className="h-48 w-full overflow-hidden bg-gray-100">
                  <Watermark link={imagesMap[p.id] || "/placeholder.svg"} />
                </div>
                <div className="p-4 flex-grow flex flex-col">
                  <div className="flex items-center mb-2 text-sippy-gold">
                    <Globe2 className="h-4 w-4 mr-2" />
                    <span className="text-xs font-semibold uppercase">{p.country ? `${p.country} · International` : "International"}</span>
                  </div>
                  <h3 className="font-bold mb-1 line-clamp-1">{p.header || p.building}</h3>
                  <div className="flex items-center mb-3 text-sm">
                    <MapPin className="h-4 w-4 text-sippy-gold mr-1" />
                    <span className="text-sippy-charcoal/80">{[p.location || p.sub_location, p.country].filter(Boolean).join(", ") || 'Location not specified'}</span>
                  </div>
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center">
                      <IndianRupee className="h-4 w-4 text-sippy-gold mr-1" />
                      <span className="font-semibold">
                      {(formatPriceWithCommas(p.price_international || p.price_range) || p.price_international || p.price_range)
                        ? ` ${formatPriceWithCommas(p.price_international || p.price_range) || p.price_international || p.price_range}`
                        : "Price on request"}
                    </span>
                      {p.currency && <span className="ml-1 text-xs text-gray-500">({p.currency})</span>}
                    </div>
                    <div className="text-sm bg-sippy-beige px-2 py-1 rounded">
                      {p.property_type_international || p.property_type || 'Property'}
                    </div>
                  </div>
                  <button
                    type="button"
                    className="btn-outline w-full mt-auto"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleViewDetails(p);
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
                <Button className="btn-primary" onClick={() => setShowAll(true)}>Browse all international properties</Button>
              ) : (
                <Button variant="outline" className="border-sippy-gold text-sippy-charcoal hover:bg-sippy-beige" onClick={() => setShowAll(false)}>Show less</Button>
              )}
            </div>
          )}
          </>
        )}
        {(!loading && properties.length === 0) && (
          <div className="text-center py-8">No international listings right now.</div>
        )}
      </div>
    </section>
  );
};

export default International;


