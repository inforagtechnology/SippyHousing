// import { useState, useEffect } from "react";
// import { MapPin, IndianRupee, Building } from "lucide-react";
// import { Property } from "@/lib/supabase";
// import { propertyService } from "@/services/propertyService";
// import { formatPriceWithCommas } from "@/lib/utils";
// import { useNavigate } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import Watermark from "./Watermark";

// const DISPLAY_LIMIT = 12;

// interface CommercialProps {
//   allProperties?: Property[];
// }

// const Commercial = ({ allProperties }: CommercialProps) => {
//   const [properties, setProperties] = useState<Property[]>([]);
//   const [imagesMap, setImagesMap] = useState<Record<string, string>>({});
//   const [loading, setLoading] = useState(true);
//   const [showAll, setShowAll] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const load = async () => {
//       setLoading(true);
//       try {
//         const source = allProperties ?? await propertyService.getAllProperties();
//         // Filter for commercial properties
//         const filtered = source.filter(p => 
//           p.usage_type === 'Commercial' || 
//           p.usage_type_category === 'Commercial' ||
//           p.commercial_type !== undefined
//         );
//         setProperties(filtered);
//       } finally {
//         setLoading(false);
//       }
//     };
//     load();
//   }, [allProperties]);

//   useEffect(() => {
//     if (properties.length === 0) return;
//     const fetchImages = async () => {
//       const map: Record<string, string> = {};
//       await Promise.all(
//         properties.map(async (p) => {
//           try {
//             const images = await propertyService.getPropertyImages(p.id);
//             map[p.id] = images.length > 0 ? images[0].image_url : "/placeholder.svg";
//           } catch {
//             map[p.id] = "/placeholder.svg";
//           }
//         })
//       );
//       setImagesMap(map);
//     };
//     const t = setTimeout(fetchImages, 0);
//     return () => clearTimeout(t);
//   }, [properties.length]);

//   const handleViewDetails = (property: Property) => {
//     navigate(`/property/${property.id}`);
//   };

//   const displayed = showAll ? properties : properties.slice(0, DISPLAY_LIMIT);
//   const hasMore = properties.length > DISPLAY_LIMIT;

//   return (
//     <section id="commercial" className="py-20 bg-sippy-beige">
//       <div className="section-container">
//         <div className="text-center mb-16">
//           <h2 className="section-title">
//             Commercial <span className="text-sippy-gold">Properties</span>
//           </h2>
//           <p className="section-subtitle mx-auto">
//             Premium commercial spaces including offices, retail, malls, and warehouses for business growth.
//           </p>
//           <div className="gold-divider"></div>
//         </div>

//         {loading ? (
//           <div className="text-center py-8">Loading...</div>
//         ) : properties.length > 0 ? (
//           <>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {displayed.map((property) => (
//               <div 
//                 key={property.id} 
//                 className="property-card bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow flex flex-col cursor-pointer"
//                 onClick={() => handleViewDetails(property)}
//               >
//                 <div className="h-48 w-full overflow-hidden bg-gray-100">
//                   <Watermark link={imagesMap[property.id] || "/placeholder.svg"} />
//                 </div>
//                 <div className="p-4 flex-grow flex flex-col">
//                   <h3 className="font-bold mb-1 line-clamp-1">{property.header || property.building}</h3>
//                   <div className="flex items-center mb-3 text-sm">
//                     <MapPin className="h-4 w-4 text-sippy-gold mr-1" />
//                     <span className="text-sippy-charcoal/80">{property.location || property.sub_location || 'Location not specified'}</span>
//                   </div>
                  
//                   <div className="flex justify-between items-center mb-4">
//                     <div className="flex items-center">
//                       <IndianRupee className="h-4 w-4 text-sippy-gold mr-1" />
//                       <span className="font-semibold">
//                       {(formatPriceWithCommas(property.price || property.price_range) || property.price || property.price_range)
//                         ? ` ${formatPriceWithCommas(property.price || property.price_range) || property.price || property.price_range}`
//                         : "Price on request"}
//                     </span>
//                     </div>
//                     <div className="text-sm bg-sippy-beige px-2 py-1 rounded">
//                       {property.commercial_type || property.property_type || 'Commercial'}
//                     </div>
//                   </div>
                  
//                   {property.description && (
//                     <p className="text-sm text-sippy-charcoal/70 mb-4 line-clamp-2">{property.description}</p>
//                   )}
                  
//                   <button 
//                     className="btn-outline mt-auto"
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       handleViewDetails(property);
//                     }}
//                   >
//                     View Details
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//           {hasMore && (
//             <div className="mt-10 text-center">
//               {!showAll ? (
//                 <Button
//                   variant="outline"
//                   className="border-sippy-gold text-sippy-charcoal hover:bg-sippy-beige"
//                   onClick={() => setShowAll(true)}
//                 >
//                   Browse all commercial properties
//                 </Button>
//               ) : (
//                 <Button
//                   variant="outline"
//                   className="border-sippy-gold text-sippy-charcoal hover:bg-sippy-beige"
//                   onClick={() => setShowAll(false)}
//                 >
//                   Show less
//                 </Button>
//               )}
//             </div>
//           )}
//           </>
//         ) : (
//           <div className="text-center py-8">
//             <p className="text-lg text-sippy-charcoal/60">No commercial properties available at the moment.</p>
//           </div>
//         )}
//       </div>
//     </section>
//   );
// };

// export default Commercial;



// import { useState, useEffect } from "react";
// import { MapPin, IndianRupee, Building } from "lucide-react";
// import { Property } from "@/lib/supabase";
// import { propertyService } from "@/services/propertyService";
// import { formatPriceWithCommas } from "@/lib/utils";
// import { useNavigate } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import Watermark from "./Watermark";

// const DISPLAY_LIMIT = 12;

// interface CommercialProps {
//   allProperties?: Property[];
// }

// const Commercial = ({ allProperties }: CommercialProps) => {
//   const [properties, setProperties] = useState<Property[]>([]);
//   const [imagesMap, setImagesMap] = useState<Record<string, string>>({});
//   const [loading, setLoading] = useState(true);
//   const [showAll, setShowAll] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const load = async () => {
//       setLoading(true);
//       try {
//         const source = allProperties ?? await propertyService.getAllProperties();
//         // STRICT: only show properties explicitly tagged as commercial.
//         // This prevents a property from appearing in Resale/Rental or Plot/Land sections simultaneously.
//         const filtered = source.filter(p => {
//           // Must be explicitly assigned to commercial
//           if (p.primary_category === 'commercial') return true;
//           // Legacy fallback: no primary_category set, has commercial signals,
//           // AND not claimed by another section
//           if (!p.primary_category) {
//             const isCommercial =
//               p.usage_type === 'Commercial' ||
//               p.usage_type_category === 'Commercial' ||
//               !!p.commercial_type;
//             const isLand =
//               p.property_type === 'Plot' ||
//               p.property_type === 'Land' ||
//               p.usage_type === 'Plot' ||
//               p.usage_type === 'Land';
//             // Don't let land/plot properties bleed into commercial
//             if (isLand) return false;
//             return isCommercial;
//           }
//           return false;
//         });
//         setProperties(filtered);
//       } finally {
//         setLoading(false);
//       }
//     };
//     load();
//   }, [allProperties]);

//   useEffect(() => {
//     if (properties.length === 0) return;
//     const fetchImages = async () => {
//       const map: Record<string, string> = {};
//       await Promise.all(
//         properties.map(async (p) => {
//           try {
//             const images = await propertyService.getPropertyImages(p.id);
//             map[p.id] = images.length > 0 ? images[0].image_url : "/placeholder.svg";
//           } catch {
//             map[p.id] = "/placeholder.svg";
//           }
//         })
//       );
//       setImagesMap(map);
//     };
//     const t = setTimeout(fetchImages, 0);
//     return () => clearTimeout(t);
//   }, [properties.length]);

//   const handleViewDetails = (property: Property) => {
//     navigate(`/property/${property.id}`);
//   };

//   const displayed = showAll ? properties : properties.slice(0, DISPLAY_LIMIT);
//   const hasMore = properties.length > DISPLAY_LIMIT;

//   return (
//     <section id="commercial" className="py-20 bg-sippy-beige">
//       <div className="section-container">
//         <div className="text-center mb-16">
//           <h2 className="section-title">
//             Commercial <span className="text-sippy-gold">Properties</span>
//           </h2>
//           <p className="section-subtitle mx-auto">
//             Premium commercial spaces including offices, retail, malls, and warehouses for business growth.
//           </p>
//           <div className="gold-divider"></div>
//         </div>

//         {loading ? (
//           <div className="text-center py-8">Loading...</div>
//         ) : properties.length > 0 ? (
//           <>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {displayed.map((property) => (
//               <div 
//                 key={property.id} 
//                 className="property-card bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow flex flex-col cursor-pointer"
//                 onClick={() => handleViewDetails(property)}
//               >
//                 <div className="h-48 w-full overflow-hidden bg-gray-100">
//                   <Watermark link={imagesMap[property.id] || "/placeholder.svg"} />
//                 </div>
//                 <div className="p-4 flex-grow flex flex-col">
//                   <h3 className="font-bold mb-1 line-clamp-1">{property.header || property.building}</h3>
//                   <div className="flex items-center mb-3 text-sm">
//                     <MapPin className="h-4 w-4 text-sippy-gold mr-1" />
//                     <span className="text-sippy-charcoal/80">{property.location || property.sub_location || 'Location not specified'}</span>
//                   </div>
                  
//                   <div className="flex justify-between items-center mb-4">
//                     <div className="flex items-center">
//                       <IndianRupee className="h-4 w-4 text-sippy-gold mr-1" />
//                       <span className="font-semibold">
//                       {(formatPriceWithCommas(property.price || property.price_range) || property.price || property.price_range)
//                         ? ` ${formatPriceWithCommas(property.price || property.price_range) || property.price || property.price_range}`
//                         : "Price on request"}
//                     </span>
//                     </div>
//                     <div className="text-sm bg-sippy-beige px-2 py-1 rounded">
//                       {property.commercial_type || property.property_type || 'Commercial'}
//                     </div>
//                   </div>
                  
//                   {property.description && (
//                     <p className="text-sm text-sippy-charcoal/70 mb-4 line-clamp-2">{property.description}</p>
//                   )}
                  
//                   <button 
//                     className="btn-outline mt-auto"
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       handleViewDetails(property);
//                     }}
//                   >
//                     View Details
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//           {hasMore && (
//             <div className="mt-10 text-center">
//               {!showAll ? (
//                 <Button
//                   variant="outline"
//                   className="border-sippy-gold text-sippy-charcoal hover:bg-sippy-beige"
//                   onClick={() => setShowAll(true)}
//                 >
//                   Browse all commercial properties
//                 </Button>
//               ) : (
//                 <Button
//                   variant="outline"
//                   className="border-sippy-gold text-sippy-charcoal hover:bg-sippy-beige"
//                   onClick={() => setShowAll(false)}
//                 >
//                   Show less
//                 </Button>
//               )}
//             </div>
//           )}
//           </>
//         ) : (
//           <div className="text-center py-8">
//             <p className="text-lg text-sippy-charcoal/60">No commercial properties available at the moment.</p>
//           </div>
//         )}
//       </div>
//     </section>
//   );
// };

// export default Commercial;

import { useState, useEffect } from "react";
import { MapPin, IndianRupee, Building } from "lucide-react";
import { Property } from "@/lib/supabase";
import { propertyService } from "@/services/propertyService";
import { formatPriceWithCommas } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Watermark from "./Watermark";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { isRentalListing } from "@/lib/propertyHelpers";

const DISPLAY_LIMIT = 12;

interface CommercialProps {
  allProperties?: Property[];
}

const Commercial = ({ allProperties }: CommercialProps) => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [imagesMap, setImagesMap] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const [listing, setListing] = useState<"all" | "resale" | "rent">("all");
  const navigate = useNavigate();
  // Legacy rows with a rent but no price are treated as rentals
  const isRent = (p: Property) => isRentalListing(p) || (!p.property_type && !!p.rent && !p.price);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const source = allProperties ?? await propertyService.getAllProperties();
        // STRICT: only show properties explicitly tagged as commercial.
        // This prevents a property from appearing in Resale/Rental or Plot/Land sections simultaneously.
        const filtered = source.filter(p => {
          // Must be explicitly assigned to commercial
          if (p.primary_category === 'commercial') return true;
          // Legacy fallback: no primary_category set, has commercial signals,
          // AND not claimed by another section
          if (!p.primary_category) {
            const isCommercial =
              p.usage_type === 'Commercial' ||
              p.usage_type_category === 'Commercial' ||
              !!p.commercial_type;
            const isLand =
              p.property_type === 'Plot' ||
              p.property_type === 'Land' ||
              p.usage_type === 'Plot' ||
              p.usage_type === 'Land';
            // Don't let land/plot properties bleed into commercial
            if (isLand) return false;
            return isCommercial;
          }
          return false;
        });
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

  const visible = properties.filter(p => listing === "all" || (listing === "rent" ? isRent(p) : !isRent(p)));
  const displayed = showAll ? visible : visible.slice(0, DISPLAY_LIMIT);
  const hasMore = visible.length > DISPLAY_LIMIT;

  return (
    <section id="commercial" className="py-20 bg-sippy-beige">
      <div className="section-container">
        <div className="text-center mb-16">
          <h2 className="section-title">
            Commercial <span className="text-sippy-gold">Properties</span>
          </h2>
          <p className="section-subtitle mx-auto">
            Premium commercial spaces including offices, retail, malls, and warehouses for business growth.
          </p>
          <div className="gold-divider"></div>
        </div>

        {loading ? (
          <div className="text-center py-8">Loading...</div>
        ) : properties.length > 0 ? (
          <>
          <Tabs value={listing} onValueChange={(v) => { setListing(v as typeof listing); setShowAll(false); }} className="mb-8">
            <TabsList className="grid grid-cols-3 w-[300px] mx-auto">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="resale">Resale</TabsTrigger>
              <TabsTrigger value="rent">Rental</TabsTrigger>
            </TabsList>
          </Tabs>
          {visible.length === 0 && <div className="text-center py-8 text-sippy-charcoal/60">No listings in this category right now.</div>}
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
                      {(() => {
                        const raw = isRent(property) ? (property.rent || property.price) : (property.price || property.price_range);
                        const shown = formatPriceWithCommas(raw) || raw;
                        return (
                          <span className="font-semibold">
                            {shown ? ` ${shown}` : "Price on request"}
                            {shown && isRent(property) ? <span className="text-xs font-normal text-sippy-charcoal/60"> / month</span> : null}
                          </span>
                        );
                      })()}
                    </div>
                    <div className="text-sm bg-sippy-beige px-2 py-1 rounded">
                      {[property.commercial_type, isRent(property) ? 'Rental' : 'Resale'].filter(Boolean).join(' · ')}
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
                <Button
                  variant="outline"
                  className="border-sippy-gold text-sippy-charcoal hover:bg-sippy-beige"
                  onClick={() => setShowAll(true)}
                >
                  Browse all commercial properties
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
          </>
        ) : (
          <div className="text-center py-8">
            <p className="text-lg text-sippy-charcoal/60">No commercial properties available at the moment.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Commercial;
