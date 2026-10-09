import { formatConfigurationList, formatConfiguration, getPropertyConfigurationLabel } from "@/lib/propertyHelpers";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, IndianRupee, Home, BadgeCheck, Building2 } from "lucide-react";
import { Property } from "@/lib/supabase";
import { getPropertyPriceStr, formatPriceWithCommas } from "@/lib/utils";
import { propertyService } from "@/services/propertyService";
import { Button } from "@/components/ui/button";
import Watermark from "./Watermark";
import LeadCapturePopup from "@/components/common/LeadCapturePopup";
import { getFunnelSetting } from "@/services/funnelService";

const DISPLAY_LIMIT = 12;
const SESSION_KEY   = "sippy_lead_captured";

interface NewProjectsProps {
  allProperties?: Property[];
}

const NewProjects = ({ allProperties }: NewProjectsProps) => {
  const navigate = useNavigate();
  const [properties,  setProperties]  = useState<Property[]>([]);
  const [imagesMap,   setImagesMap]   = useState<Record<string, string>>({});
  const [loading,     setLoading]     = useState(true);
  const [showAll,     setShowAll]     = useState(false);
  const [popupProperty, setPopupProperty] = useState<Property | null>(null);

  const displayed = showAll ? properties : properties.slice(0, DISPLAY_LIMIT);
  const hasMore   = properties.length > DISPLAY_LIMIT;

  /* View Details click — checks funnel setting then shows popup or navigates */
  const handleViewDetails = async (e: React.MouseEvent, property: Property) => {
    e.stopPropagation();

    if (sessionStorage.getItem(SESSION_KEY)) {
      navigate(`/property/${property.id}`);
      return;
    }

    const funnelEnabled = await getFunnelSetting();
    if (funnelEnabled) {
      setPopupProperty(property);
    } else {
      navigate(`/property/${property.id}`);
    }
  };

  const handlePopupSuccess = () => {
    const prop = popupProperty;
    setPopupProperty(null);
    if (prop) navigate(`/property/${prop.id}`);
  };

  const handlePopupClose = () => {
    setPopupProperty(null);
  };

  /* Fetch new-project properties */
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        const result = allProperties
          ? allProperties.filter(p =>
              p.primary_category === "new-project" ||
              (p.category_assignments && p.category_assignments.includes("new-project"))
            )
          : await propertyService.getPropertiesByCategory("new-project");
        setProperties(result);
      } catch (error) {
        console.error("Error fetching new projects:", error);
        setProperties([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, [allProperties]);

  /* Fetch images after properties load */
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

  if (loading) return null;
  if (properties.length === 0) return null;

  return (
    <section id="new-projects" className="py-20 bg-sippy-light">
      <div className="section-container">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="section-title">
            New <span className="text-sippy-gold">Projects</span>
          </h2>
          <p className="section-subtitle mx-auto">
            Explore the latest residential and commercial projects launching across Mumbai's
            most sought-after locations.
          </p>
          <div className="gold-divider" />
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {displayed.map((property) => (
            <div
              key={property.id}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow border border-gray-100"
            >
              {/* Image */}
              <div className="h-64 w-full overflow-hidden bg-gray-100">
                <Watermark link={imagesMap[property.id] || "/placeholder.svg"} />
              </div>

              <div className="p-6">
                {/* New project badge */}
                <div className="mb-3">
                  <span className="inline-flex items-center gap-1 bg-sippy-gold/10 text-sippy-gold
                    text-xs font-bold px-3 py-1 rounded-full border border-sippy-gold/30">
                    <Building2 className="h-3 w-3" />
                    New Project
                  </span>
                </div>

                <h3 className="text-xl font-bold mb-2 font-playfair">
                  {property.header || property.building}
                </h3>

                <div className="flex items-center mb-3">
                  <MapPin className="h-4 w-4 text-sippy-gold mr-1 flex-shrink-0" />
                  <span className="text-sippy-charcoal/80 text-sm">
                    {property.location || property.sub_location || "Location not specified"}
                  </span>
                </div>

                <div className="flex items-center mb-4">
                  <IndianRupee className="h-5 w-5 text-sippy-gold mr-1" />
                  <span className="text-xl font-semibold">
                    {(formatPriceWithCommas(getPropertyPriceStr(property)) || getPropertyPriceStr(property))
                      ? `${formatPriceWithCommas(getPropertyPriceStr(property)) || getPropertyPriceStr(property)}`
                      : "Price on request"}
                  </span>
                </div>

                {/* Property details chips */}
                <div className="flex flex-wrap gap-3 mb-6">
                  {getPropertyConfigurationLabel(property) && (
                    <div className="flex items-center bg-gray-50 px-3 py-1 rounded-full text-sm">
                      <Home className="h-3.5 w-3.5 text-sippy-gold mr-1.5" />
                      <span>{getPropertyConfigurationLabel(property)}</span>
                    </div>
                  )}
                  {(property.size || property.area || property.flat_size) && (
                    <div className="flex items-center bg-gray-50 px-3 py-1 rounded-full text-sm">
                      <Home className="h-3.5 w-3.5 text-sippy-gold mr-1.5" />
                      <span>{property.size || property.area || property.flat_size}</span>
                    </div>
                  )}
                  {property.possession && (
                    <div className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
                      Possession: {property.possession}
                    </div>
                  )}
                  {property.rera_number && (
                    <div className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">
                      RERA ✓
                    </div>
                  )}
                  {property.configuration_type && (
                    <div className="bg-gray-50 px-3 py-1 rounded-full text-sm">
                      {property.configuration_type}
                    </div>
                  )}
                </div>

                {/* Builder name if available */}
                {property.builder && (
                  <p className="text-xs text-sippy-charcoal/50 mb-4">
                    By <span className="font-semibold text-sippy-charcoal/70">{property.builder}</span>
                  </p>
                )}

                {/* View Details → triggers lead popup */}
                <button
                  type="button"
                  className="btn-outline w-full flex items-center justify-center"
                  onClick={(e) => handleViewDetails(e, property)}
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Show all / Show less */}
        {hasMore && (
          <div className="mt-10 text-center">
            {!showAll ? (
              <Button className="btn-primary" onClick={() => setShowAll(true)}>
                Browse all new projects
              </Button>
            ) : (
              <Button
                variant="outline"
                className="border-sippy-gold text-sippy-charcoal hover:bg-sippy-beige"
                onClick={() => setShowAll(false)}
              >
                Show less
              </Button>
            )}
          </div>
        )}

        {/* RERA badge */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center border border-sippy-gold px-6 py-3 rounded-full">
            <BadgeCheck className="h-5 w-5 text-sippy-gold mr-2" />
            <span className="text-sippy-charcoal font-medium">All projects are RERA certified</span>
          </div>
        </div>
      </div>

      {/* Lead capture popup */}
      {popupProperty && (
        <LeadCapturePopup
          interest={`New Projects – ${popupProperty.header || popupProperty.building || popupProperty.location || "New Project"}`}
          onSuccess={handlePopupSuccess}
          onClose={handlePopupClose}
        />
      )}
    </section>
  );
};

export default NewProjects;
