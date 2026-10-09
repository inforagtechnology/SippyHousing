// import { MapPin, IndianRupee, Home } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { useNavigate } from "react-router-dom";
// import { Property } from "@/lib/supabase";
// import { propertyService } from "@/services/propertyService";
// import { formatPriceWithCommas, getPropertyPriceStr } from "@/lib/utils";
// import { useEffect, useState } from "react";
// import Watermark from "./Watermark";

// const DISPLAY_LIMIT = 12;

// interface ResaleRentProps {
//   allProperties?: Property[];
// }

// const ResaleRent = ({ allProperties }: ResaleRentProps) => {
//   const navigate = useNavigate();
//   const [properties, setProperties] = useState<Property[]>([]);
//   const [imagesMap, setImagesMap] = useState<Record<string, string>>({});
//   const [loading, setLoading] = useState(true);
//   const [showAll, setShowAll] = useState(false);

//   useEffect(() => {
//     const load = async () => {
//       setLoading(true);
//       try {
//         // Include: primary_category === 'resale-rental' OR (legacy) property_type Resale/Rental, excluding new-project
//         const source = allProperties ?? await propertyService.getAllProperties();
//         console.log(
//   source.map((p) => ({
//     title: p.header || p.building,
//     primary_category: p.primary_category,
//     category_assignments: p.category_assignments,
//     property_type: p.property_type,
//   }))
// );
//         const filtered = source.filter(p => {
//           if (p.primary_category === 'resale-rental') return true;
//           if (p.primary_category === 'new-project' || (p.category_assignments && p.category_assignments.includes('new-project'))) return false;
//           return p.property_type !== 'New';
//         });
//         setProperties(filtered);
//       } finally {
//         setLoading(false);
//       }
//     };
//     load();
//   }, [allProperties]);

//   // Fetch images last (after properties are shown) – deferred
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

//   return (
//     <section id="resale-rent" className="py-20 bg-sippy-beige">
//       <div className="section-container">
//         <div className="text-center mb-16">
//           <h2 className="section-title">
//             Resale <span className="text-sippy-gold">&</span> Rental Properties
//           </h2>
//           <p className="section-subtitle mx-auto">
//             Discover premium resale properties and luxury rental options in Mumbai's most coveted locations.
//           </p>
//           <div className="gold-divider"></div>
//         </div>

//         {/* DB-driven; simple quick filter placeholder */}
//         {/* <div className="bg-white p-6 rounded-lg shadow-sm mb-12">
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
//             <div>
//               <label className="block text-sm font-medium mb-1">Quick filter</label>
//               <Select>
//                 <SelectTrigger>
//                   <SelectValue placeholder="Choose" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="all">All</SelectItem>
//                   <SelectItem value="Resale">Resale</SelectItem>
//                   <SelectItem value="Rental">Rental</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//             <div className="md:col-span-3" />
//           </div>
//         </div> */}

//         <Tabs defaultValue="all" className="w-full">
//           <TabsList className="grid grid-cols-3 mb-8 w-[300px] mx-auto">
//             <TabsTrigger value="all">All</TabsTrigger>
//             <TabsTrigger value="resale">Resale</TabsTrigger>
//             <TabsTrigger value="rent">Rental</TabsTrigger>
//           </TabsList>

//           {['all', 'resale', 'rent'].map((tab) => {
//             const filtered = properties.filter(p => (tab === 'all') || (tab === 'resale' && p.property_type === 'Resale') || (tab === 'rent' && p.property_type === 'Rental'));
//             const displayed = showAll ? filtered : filtered.slice(0, DISPLAY_LIMIT);
//             const hasMore = filtered.length > DISPLAY_LIMIT;
//             return (
//               <TabsContent key={tab} value={tab} className="mt-4">
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                   {displayed.map(property => (
//                     <div
//                       key={property.id}
//                       className="property-card relative flex flex-col bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow cursor-pointer"
//                       onClick={() => handleViewDetails(property)}
//                     >
//                       <div className="h-48 w-full overflow-hidden bg-gray-100">
//                         <Watermark link={imagesMap[property.id] || "/placeholder.svg"} />
//                       </div>
//                       <div className="p-4 flex-grow flex flex-col">
//                         <h3 className="font-bold mb-1 line-clamp-1">{property.header || property.building || "Property"}</h3>
//                         <div className="flex items-center mb-3 text-sm">
//                           <MapPin className="h-4 w-4 text-sippy-gold mr-1 shrink-0" />
//                           <span className="text-sippy-charcoal/80 line-clamp-1">
//                             {property.location || property.sub_location || "Location not specified"}
//                           </span>
//                         </div>

//                         <div className="flex justify-between items-center mb-4">
//                           <div className="flex items-center min-w-0">
//                             <IndianRupee className="h-4 w-4 text-sippy-gold mr-1 shrink-0" />
//                             <span className="font-semibold truncate">
//                               {(() => {
//                                 const priceStr = getPropertyPriceStr(property);
//                                 // if (!priceStr || !priceStr.trim()) return "Price on request";
//                                 if (!priceStr || !String(priceStr).trim()) {
//                                   return "Price on request";
//                                 }
//                                 const formatted = formatPriceWithCommas(priceStr);
//                                 return formatted ? ` ${formatted}` : priceStr; //₹
//                               })()}
//                             </span>
//                           </div>
//                           {property.property_type && (
//                             <div className="text-sm bg-sippy-beige px-2 py-1 rounded shrink-0">
//                               {property.property_type}
//                             </div>
//                           )}
//                         </div>

//                         <div className="flex justify-between items-center text-sm mb-4 gap-2">
//                           <div className="flex items-center min-w-0">
//                             <Home className="h-4 w-4 text-sippy-gold mr-1 shrink-0" />
//                             {/* <span className="truncate">{property.area || property.flat_size || "—"}</span> */}
//                             <span className="truncate">
//                               {property.plot_size ||
//                                 property.area ||
//                                 property.flat_size ||
//                                 property.size ||
//                                 "—"}
//                             </span>
//                           </div>
//                           <div className="shrink-0">
//                             {property.bhk_options?.length ? property.bhk_options.join(", ") : property.bhk || "—"}
//                           </div>
//                         </div>

//                         <button
//                           className="btn-outline mt-auto"
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             handleViewDetails(property);
//                           }}
//                         >
//                           View Details
//                         </button>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//                 {hasMore && (
//                   <div className="mt-10 text-center">
//                     {!showAll ? (
//                       <Button variant="outline" className="border-sippy-gold text-sippy-charcoal hover:bg-sippy-beige" onClick={() => setShowAll(true)}>
//                         Browse all resale & rental properties
//                       </Button>
//                     ) : (
//                       <Button variant="outline" className="border-sippy-gold text-sippy-charcoal hover:bg-sippy-beige" onClick={() => setShowAll(false)}>
//                         Show less
//                       </Button>
//                     )}
//                   </div>
//                 )}
//                 {filtered.length === 0 && (
//                   <div className="text-center py-8">
//                     <p>No properties found.</p>
//                   </div>
//                 )}
//               </TabsContent>
//             );
//           })}
//         </Tabs>
//       </div>
//     </section>
//   );
// };
import { MapPin, IndianRupee, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import { Property } from "@/lib/supabase";
import { propertyService } from "@/services/propertyService";
import { formatPriceWithCommas, getPropertyPriceStr } from "@/lib/utils";
import { useEffect, useState } from "react";
import Watermark from "./Watermark";
import { isRentalListing } from "@/lib/propertyHelpers";
import { getPropertyConfigurationLabel } from "@/lib/propertyHelpers";

const DISPLAY_LIMIT = 12;

interface ResaleRentProps {
  allProperties?: Property[];
}

const ResaleRent = ({ allProperties }: ResaleRentProps) => {
  const navigate = useNavigate();
  const [properties, setProperties] = useState<Property[]>([]);
  const [imagesMap, setImagesMap] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  // "Show all" is tracked per tab so Outright and Rental never share state
  const [showAllByTab, setShowAllByTab] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        // Include: primary_category === 'resale-rental' OR (legacy) property_type Resale/Rental, excluding new-project
        const source = allProperties ?? await propertyService.getAllProperties();
        // STRICT: only show properties explicitly tagged as resale-rental.
        // This prevents a property from appearing in Commercial, Plot/Land, or New Projects sections simultaneously.
        const filtered = source.filter(p => {
          // Must be explicitly assigned to resale-rental
          if (p.primary_category === 'resale-rental') return true;
          // Legacy fallback: no primary_category set, property_type is Resale or Rental,
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
            const isNew = p.property_type === 'New';
            if (isCommercial || isLand || isNew) return false;
            return p.property_type === 'Resale' || p.property_type === 'Rental';
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

  // Fetch images last (after properties are shown) – deferred
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

  return (
    <section id="resale-rent" className="py-20 bg-sippy-beige">
      <div className="section-container">
        <div className="text-center mb-16">
          <h2 className="section-title">
            Resale <span className="text-sippy-gold">&</span> Rental Properties
          </h2>
          <p className="section-subtitle mx-auto">
            Discover premium resale properties and luxury rental options in Mumbai's most coveted locations.
          </p>
          <div className="gold-divider"></div>
        </div>

        {/* DB-driven; simple quick filter placeholder */}
        {/* <div className="bg-white p-6 rounded-lg shadow-sm mb-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            <div>
              <label className="block text-sm font-medium mb-1">Quick filter</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Choose" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="Resale">Resale</SelectItem>
                  <SelectItem value="Rental">Rental</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="md:col-span-3" />
          </div>
        </div> */}

        {/* Outright and Rental are shown separately: clicking Rental shows ONLY rental listings */}
        <Tabs defaultValue="outright" className="w-full">
          <TabsList className="grid grid-cols-2 mb-8 w-[280px] mx-auto">
            <TabsTrigger value="outright">Outright</TabsTrigger>
            <TabsTrigger value="rent">Rental</TabsTrigger>
          </TabsList>

          {['outright', 'rent'].map((tab) => {
            const isRentTab = tab === 'rent';
            const filtered = properties.filter(p => isRentTab ? isRentalListing(p) : !isRentalListing(p));
            const showAll = !!showAllByTab[tab];
            const displayed = showAll ? filtered : filtered.slice(0, DISPLAY_LIMIT);
            const hasMore = filtered.length > DISPLAY_LIMIT;
            return (
              <TabsContent key={tab} value={tab} className="mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {displayed.map(property => {
                    const priceStr = getPropertyPriceStr(property);
                    const formatted = priceStr && String(priceStr).trim() ? (formatPriceWithCommas(priceStr) || priceStr) : "";
                    const config = getPropertyConfigurationLabel(property);
                    return (
                    <div
                      key={property.id}
                      className="property-card relative flex flex-col bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow cursor-pointer"
                      onClick={() => handleViewDetails(property)}
                    >
                      <div className="h-48 w-full overflow-hidden bg-gray-100">
                        <Watermark link={imagesMap[property.id] || "/placeholder.svg"} />
                      </div>
                      <div className="p-4 flex-grow flex flex-col">
                        <h3 className="font-bold mb-1 line-clamp-1">{property.header || property.building || "Property"}</h3>
                        <div className="flex items-center mb-3 text-sm">
                          <MapPin className="h-4 w-4 text-sippy-gold mr-1 shrink-0" />
                          <span className="text-sippy-charcoal/80 line-clamp-1">
                            {property.location || property.sub_location || "Location not specified"}
                          </span>
                        </div>

                        <div className="flex justify-between items-center mb-2">
                          <div className="flex items-center min-w-0">
                            <IndianRupee className="h-4 w-4 text-sippy-gold mr-1 shrink-0" />
                            <span className="font-semibold truncate">
                              {formatted ? ` ${formatted}` : "Price on request"}
                              {isRentTab && formatted ? <span className="text-xs font-normal text-sippy-charcoal/60"> / month</span> : null}
                            </span>
                          </div>
                          <div className={`text-sm px-2 py-1 rounded shrink-0 ${isRentTab ? "bg-blue-50 text-blue-700" : "bg-sippy-beige"}`}>
                            {isRentTab ? "Rental" : "Outright"}
                          </div>
                        </div>

                        {/* Rental listings surface deposit & furnishing; outright listings do not */}
                        {isRentTab && (property.deposit || property.furnishing_status) && (
                          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-sippy-charcoal/70 mb-2">
                            {property.deposit && <span>Deposit: {formatPriceWithCommas(property.deposit) || property.deposit}</span>}
                            {property.furnishing_status && <span>{property.furnishing_status}</span>}
                          </div>
                        )}

                        <div className="flex justify-between items-center text-sm mb-4 gap-2">
                          <div className="flex items-center min-w-0">
                            <Home className="h-4 w-4 text-sippy-gold mr-1 shrink-0" />
                            <span className="truncate">
                              {property.plot_size ||
                                property.area ||
                                property.flat_size ||
                                property.size ||
                                "—"}
                            </span>
                          </div>
                          {config && <div className="shrink-0">{config}</div>}
                        </div>

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
                    );
                  })}
                </div>
                {hasMore && (
                  <div className="mt-10 text-center">
                    {!showAll ? (
                      <Button variant="outline" className="border-sippy-gold text-sippy-charcoal hover:bg-sippy-beige" onClick={() => setShowAllByTab(s => ({ ...s, [tab]: true }))}>
                        Browse all {isRentTab ? "rental" : "outright"} properties
                      </Button>
                    ) : (
                      <Button variant="outline" className="border-sippy-gold text-sippy-charcoal hover:bg-sippy-beige" onClick={() => setShowAllByTab(s => ({ ...s, [tab]: false }))}>
                        Show less
                      </Button>
                    )}
                  </div>
                )}
                {filtered.length === 0 && (
                  <div className="text-center py-8">
                    <p>No {isRentTab ? "rental" : "outright"} properties found.</p>
                  </div>
                )}
              </TabsContent>
            );
          })}
        </Tabs>
      </div>
    </section>
  );
};

export default ResaleRent;

// export default ResaleRent;
