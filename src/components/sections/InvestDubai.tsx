// import { MapPin, IndianRupee, Globe2, Star, ArrowRight, Shield } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import { Badge } from "@/components/ui/badge";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Button } from "@/components/ui/button";
// import { useEffect, useState } from "react";
// import { Property } from "@/lib/supabase";
// import { propertyService } from "@/services/propertyService";
// import { formatPriceWithCommas } from "@/lib/utils";
// import Watermark from "./Watermark";

// const DISPLAY_LIMIT = 12;

// interface InvestDubaiProps {
//   allProperties?: Property[];
// }

// const isInternational = (p: Property) => {
//   const loc = (p.location || '').toLowerCase();
//   return loc.includes('dubai') || loc.includes('uae') || loc.includes('international');
// };

// const InvestDubai = ({ allProperties }: InvestDubaiProps) => {
//   const navigate = useNavigate();
//   const [properties, setProperties] = useState<Property[]>([]);
//   const [imagesMap, setImagesMap] = useState<Record<string, string>>({});
//   const [loading, setLoading] = useState(true);
//   const [showAll, setShowAll] = useState(false);

//   const handleViewDetails = (id: string) => () => navigate(`/property/${id}`);

//   useEffect(() => {
//     const load = async () => {
//       setLoading(true);
//       try {
//         const source = allProperties ?? await propertyService.getAllProperties();
//         setProperties(source.filter(isInternational));
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

//   return (
//     <section id="invest-dubai" className="py-20 bg-white">
//       <div className="section-container">
//         <div className="text-center mb-16">
//           <h2 className="section-title">
//             Invest in <span className="text-sippy-gold">Dubai</span>
//           </h2>
//           <p className="section-subtitle mx-auto">
//             Expand your real estate portfolio internationally with premium Dubai properties offering strong rental yields and capital appreciation.
//           </p>
//           <div className="gold-divider"></div>
//         </div>
//         <Tabs defaultValue="properties" className="w-full">
//           <TabsList className="grid w-full grid-cols-3 mb-8">
//             <TabsTrigger value="properties">Properties</TabsTrigger>
//             <TabsTrigger value="process">Investment Process</TabsTrigger>
//             <TabsTrigger value="legal">Legal Guidance</TabsTrigger>
//           </TabsList>
//           <TabsContent value="properties" className="mt-4">
//             {loading ? (
//               <div className="text-center py-8">Loading...</div>
//             ) : (
//               <>
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
//                 {(showAll ? properties : properties.slice(0, DISPLAY_LIMIT)).map(p => (
//                   <div key={p.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow border border-gray-100 h-full flex flex-col">
//                     <div className="h-48 w-full overflow-hidden bg-gray-100">
//                       <Watermark link={imagesMap[p.id] || "/placeholder.svg"} />
//                     </div>
//                     <div className="p-3 flex items-center">
//                       <Badge className="bg-sippy-gold text-white border-none"><Globe2 className="inline h-4 w-4 mr-1" />Dubai</Badge>
//                     </div>
//                     <div className="p-6 flex-grow flex flex-col">
//                       <h3 className="text-xl font-bold mb-2 font-playfair">{p.building}</h3>
//                       <div className="flex items-center mb-4">
//                         <MapPin className="h-4 w-4 text-sippy-gold mr-1" />
//                         <span className="text-sippy-charcoal/80">{p.location}</span>
//                       </div>
//                       <div className="space-y-3 mb-6">
//                         <div className="flex justify-between">
//                           <span className="text-sm text-sippy-charcoal/60">Price:</span>
//                           <span className="font-semibold">
//                           {(formatPriceWithCommas(p.price_range) || p.price_range)
//                             ? ` ${formatPriceWithCommas(p.price_range) || p.price_range}`
//                             : "Price on request"}
//                         </span>
//                         </div>
//                         <div className="flex justify-between">
//                           <span className="text-sm text-sippy-charcoal/60">Type:</span>
//                           <span>{p.property_type}</span>
//                         </div>
//                       </div>
//                       <Button
//                         variant="outline"
//                         size="sm"
//                         className="mt-auto border-sippy-gold text-sippy-charcoal hover:bg-sippy-beige w-full"
//                         onClick={handleViewDetails(p.id)}
//                       >
//                         View Details <ArrowRight className="ml-2 h-4 w-4" />
//                       </Button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//               {properties.length > DISPLAY_LIMIT && (
//                 <div className="mt-10 text-center">
//                   {!showAll ? (
//                     <Button className="btn-primary" onClick={() => setShowAll(true)}>Browse all Dubai properties</Button>
//                   ) : (
//                     <Button variant="outline" className="border-sippy-gold text-sippy-charcoal hover:bg-sippy-beige" onClick={() => setShowAll(false)}>Show less</Button>
//                   )}
//                 </div>
//               )}
//               </>
//             )}
//             {(!loading && properties.length === 0) && (
//               <div className="text-center py-8">No Dubai listings found.</div>
//             )}
//           </TabsContent>
//           {/* Keep/merge original Process and Legal Guidance content */}
//           <TabsContent value="process" className="mt-4">
//             <div className="bg-sippy-beige p-8 rounded-lg mb-8">
//               <h3 className="text-2xl font-bold mb-8 font-playfair text-center">Dubai Investment Process for Indian Investors</h3>
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//                 <div className="bg-white p-6 rounded-lg text-center">
//                   <div className="h-12 w-12 bg-sippy-gold text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">1</div>
//                   <h4 className="font-bold mb-2">Property Selection</h4>
//                   <p className="text-sm text-sippy-charcoal/80">Browse our curated portfolio of Dubai properties and select the one that meets your investment criteria.</p>
//                 </div>
//                 <div className="bg-white p-6 rounded-lg text-center">
//                   <div className="h-12 w-12 bg-sippy-gold text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">2</div>
//                   <h4 className="font-bold mb-2">Documentation</h4>
//                   <p className="text-sm text-sippy-charcoal/80">Our team assists with all required paperwork, including passport copies, PAN card, and financial documentation.</p>
//                 </div>
//                 <div className="bg-white p-6 rounded-lg text-center">
//                   <div className="h-12 w-12 bg-sippy-gold text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">3</div>
//                   <h4 className="font-bold mb-2">Payment & Transfer</h4>
//                   <p className="text-sm text-sippy-charcoal/80">Secure payment processing through LRS scheme and seamless fund transfer to Dubai.</p>
//                 </div>
//                 <div className="bg-white p-6 rounded-lg text-center">
//                   <div className="h-12 w-12 bg-sippy-gold text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">4</div>
//                   <h4 className="font-bold mb-2">Ownership & Management</h4>
//                   <p className="text-sm text-sippy-charcoal/80">Complete property registration and optional property management services for rental income.</p>
//                 </div>
//               </div>
//             </div>
//             <div className="text-center">
//               <p className="mb-6 max-w-3xl mx-auto">Our experienced Dubai investment specialists provide end-to-end assistance, from property selection to acquisition and management.</p>
//               <button className="btn-outline flex items-center mx-auto" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
//                 Contact Us for Dubai Investment Guide <ArrowRight className="ml-2 h-4 w-4" />
//               </button>
//             </div>
//           </TabsContent>
//           <TabsContent value="legal" className="mt-4">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
//               <div>
//                 <h3 className="text-2xl font-bold mb-6 font-playfair">Legal Guidance for Indian Investors</h3>
//                 <div className="space-y-6">
//                   <div>
//                     <div className="flex items-center mb-2">
//                       <Shield className="h-5 w-5 text-sippy-gold mr-2" />
//                       <h4 className="font-bold">Foreign Ownership Laws</h4>
//                     </div>
//                     <p className="text-sippy-charcoal/80">Dubai permits 100% foreign ownership of properties in designated freehold areas. We guide you through the legal framework to ensure compliant investments.</p>
//                   </div>
//                   <div>
//                     <div className="flex items-center mb-2">
//                       <Shield className="h-5 w-5 text-sippy-gold mr-2" />
//                       <h4 className="font-bold">RBI Regulations</h4>
//                     </div>
//                     <p className="text-sippy-charcoal/80">Navigate Reserve Bank of India regulations for overseas property purchases with our expert guidance on Liberalized Remittance Scheme (LRS).</p>
//                   </div>
//                   <div>
//                     <div className="flex items-center mb-2">
//                       <Shield className="h-5 w-5 text-sippy-gold mr-2" />
//                       <h4 className="font-bold">Tax Implications</h4>
//                     </div>
//                     <p className="text-sippy-charcoal/80">Understand the tax implications in both India and Dubai, including rental income taxation, capital gains, and wealth tax considerations.</p>
//                   </div>
//                   <div>
//                     <div className="flex items-center mb-2">
//                       <Shield className="h-5 w-5 text-sippy-gold mr-2" />
//                       <h4 className="font-bold">Estate Planning</h4>
//                     </div>
//                     <p className="text-sippy-charcoal/80">Advice on will registration and succession planning for your Dubai property assets to ensure smooth inheritance.</p>
//                   </div>
//                 </div>
//                 <button className="btn-primary mt-8" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>Contact Us for Legal Consultation</button>
//               </div>
//               <div>
//                 <div className="bg-sippy-beige p-8 rounded-lg">
//                   <h4 className="text-xl font-bold mb-6 font-playfair">Dubai Investment Benefits</h4>
//                   <div className="space-y-4">
//                     <div className="flex items-center">
//                       <Star className="h-5 w-5 text-sippy-gold mr-3 flex-shrink-0" />
//                       <p><span className="font-semibold">No Property Tax</span> - Dubai doesn't impose annual property taxes</p>
//                     </div>
//                     <div className="flex items-center">
//                       <Star className="h-5 w-5 text-sippy-gold mr-3 flex-shrink-0" />
//                       <p><span className="font-semibold">Zero Income Tax</span> - No tax on rental income or capital gains</p>
//                     </div>
//                     <div className="flex items-center">
//                       <Star className="h-5 w-5 text-sippy-gold mr-3 flex-shrink-0" />
//                       <p><span className="font-semibold">High ROI</span> - Average rental yields of 5-7% annually</p>
//                     </div>
//                     <div className="flex items-center">
//                       <Star className="h-5 w-5 text-sippy-gold mr-3 flex-shrink-0" />
//                       <p><span className="font-semibold">Residence Visa</span> - Property investment can qualify for residence visa</p>
//                     </div>
//                     <div className="flex items-center">
//                       <Star className="h-5 w-5 text-sippy-gold mr-3 flex-shrink-0" />
//                       <p><span className="font-semibold">Strong Regulations</span> - RERA Dubai ensures investor protection</p>
//                     </div>
//                     <div className="flex items-center">
//                       <Star className="h-5 w-5 text-sippy-gold mr-3 flex-shrink-0" />
//                       <p><span className="font-semibold">Flight Connectivity</span> - Excellent air connectivity with India</p>
//                     </div>
//                   </div>
//                   <div className="mt-8 p-4 bg-white rounded-lg border border-sippy-gold">
//                     <p className="text-sm text-center font-medium">
//                       "Dubai's real estate market has delivered an average appreciation of 8-12% annually over the past decade."
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </TabsContent>
//         </Tabs>
//       </div>
//     </section>
//   );
// };

// export default InvestDubai;

import { getPropertyConfigurationLabel } from "@/lib/propertyHelpers";
import { MapPin, IndianRupee, Globe2, Star, ArrowRight, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Property } from "@/lib/supabase";
import { propertyService } from "@/services/propertyService";
import { formatPriceWithCommas, getPropertyPriceStr } from "@/lib/utils";
import Watermark from "./Watermark";
import LeadCapturePopup from "@/components/common/LeadCapturePopup";
import { getFunnelSetting } from "@/services/funnelService";

const DISPLAY_LIMIT = 12;
const SESSION_KEY   = "sippy_lead_captured";

interface InvestDubaiProps {
  allProperties?: Property[];
}

/* match by category OR location keywords */
const isInternational = (p: Property) => {
  const cat = (p.primary_category || "").toLowerCase();
  const assignments: string[] = p.category_assignments || [];
  const loc = (p.location || "").toLowerCase();
  const subLoc = (p.sub_location || "").toLowerCase();

  return (
    cat === "international" ||
    assignments.includes("international") ||
    loc.includes("dubai")        ||
    loc.includes("uae")          ||
    loc.includes("international")||
    subLoc.includes("dubai")     ||
    subLoc.includes("uae")
  );
};

const InvestDubai = ({ allProperties }: InvestDubaiProps) => {
  const navigate = useNavigate();
  const [properties,    setProperties]    = useState<Property[]>([]);
  const [imagesMap,     setImagesMap]     = useState<Record<string, string>>({});
  const [loading,       setLoading]       = useState(true);
  const [showAll,       setShowAll]       = useState(false);
  const [popupProperty, setPopupProperty] = useState<Property | null>(null);

  const displayed = showAll ? properties : properties.slice(0, DISPLAY_LIMIT);

  /* View Details — funnel-aware */
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

  /* Fetch properties */
  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const source = allProperties ?? await propertyService.getAllProperties();
        const filtered = source.filter(isInternational);
        setProperties(filtered);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [allProperties]);

  /* Fetch images */
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

  /* price display helper */
  const getPriceDisplay = (p: Property) => {
    const raw =
      getPropertyPriceStr(p) ||
      p.price_range          ||
      p.price                ||
      "";
    if (!raw) return "Price on request";
    const formatted = formatPriceWithCommas(raw);
    return formatted ? `${formatted}` : raw;
  };

  return (
    <section id="invest-dubai" className="py-20 bg-white">
      <div className="section-container">
        <div className="text-center mb-16">
          <h2 className="section-title">
            Invest in <span className="text-sippy-gold">Dubai</span>
          </h2>
          <p className="section-subtitle mx-auto">
            Expand your real estate portfolio internationally with premium Dubai properties
            offering strong rental yields and capital appreciation.
          </p>
          <div className="gold-divider" />
        </div>

        <Tabs defaultValue="properties" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="properties">Properties</TabsTrigger>
            <TabsTrigger value="process">Investment Process</TabsTrigger>
            <TabsTrigger value="legal">Legal Guidance</TabsTrigger>
          </TabsList>

          {/* ── Properties tab ── */}
          <TabsContent value="properties" className="mt-4">
            {loading ? (
              <div className="text-center py-8 text-gray-400">Loading properties…</div>
            ) : properties.length === 0 ? (
              <div className="text-center py-12">
                <Globe2 className="h-12 w-12 text-sippy-gold/40 mx-auto mb-4" />
                <p className="text-gray-500 font-medium">No international listings found.</p>
                <p className="text-gray-400 text-sm mt-1">
                  Add properties with category <strong>International</strong> or location containing "Dubai" in the admin panel.
                </p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                  {displayed.map(p => (
                    <div
                      key={p.id}
                      className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow border border-gray-100 h-full flex flex-col"
                    >
                      <div className="h-48 w-full overflow-hidden bg-gray-100">
                        <Watermark link={imagesMap[p.id] || "/placeholder.svg"} />
                      </div>

                      <div className="p-3 flex items-center">
                        <Badge className="bg-sippy-gold text-white border-none">
                          <Globe2 className="inline h-4 w-4 mr-1" />
                          {(p.location || "").toLowerCase().includes("dubai") ? "Dubai" : "International"}
                        </Badge>
                      </div>

                      <div className="p-6 flex-grow flex flex-col">
                        <h3 className="text-xl font-bold mb-2 font-playfair">
                          {p.header || p.building}
                        </h3>
                        <div className="flex items-center mb-4">
                          <MapPin className="h-4 w-4 text-sippy-gold mr-1" />
                          <span className="text-sippy-charcoal/80">{p.location}</span>
                        </div>
                        <div className="space-y-3 mb-6">
                          <div className="flex justify-between">
                            <span className="text-sm text-sippy-charcoal/60">Price:</span>
                            <span className="font-semibold">{getPriceDisplay(p)}</span>
                          </div>
                          {p.property_type && (
                            <div className="flex justify-between">
                              <span className="text-sm text-sippy-charcoal/60">Type:</span>
                              <span>{p.property_type}</span>
                            </div>
                          )}
                          {getPropertyConfigurationLabel(p) && (
                            <div className="flex justify-between">
                              <span className="text-sm text-sippy-charcoal/60">Configuration:</span>
                              <span>{getPropertyConfigurationLabel(p)}</span>
                            </div>
                          )}
                        </div>

                        <Button
                          variant="outline"
                          size="sm"
                          className="mt-auto border-sippy-gold text-sippy-charcoal hover:bg-sippy-beige w-full"
                          onClick={(e) => handleViewDetails(e, p)}
                        >
                          View Details <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                {properties.length > DISPLAY_LIMIT && (
                  <div className="mt-10 text-center">
                    {!showAll ? (
                      <Button className="btn-primary" onClick={() => setShowAll(true)}>
                        Browse all Dubai properties
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
            )}
          </TabsContent>

          {/* ── Investment Process tab ── */}
          <TabsContent value="process" className="mt-4">
            <div className="bg-sippy-beige p-8 rounded-lg mb-8">
              <h3 className="text-2xl font-bold mb-8 font-playfair text-center">
                Dubai Investment Process for Indian Investors
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  { n: 1, title: "Property Selection", desc: "Browse our curated portfolio of Dubai properties and select the one that meets your investment criteria." },
                  { n: 2, title: "Documentation",      desc: "Our team assists with all required paperwork, including passport copies, PAN card, and financial documentation." },
                  { n: 3, title: "Payment & Transfer", desc: "Secure payment processing through LRS scheme and seamless fund transfer to Dubai." },
                  { n: 4, title: "Ownership & Management", desc: "Complete property registration and optional property management services for rental income." },
                ].map(s => (
                  <div key={s.n} className="bg-white p-6 rounded-lg text-center">
                    <div className="h-12 w-12 bg-sippy-gold text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">{s.n}</div>
                    <h4 className="font-bold mb-2">{s.title}</h4>
                    <p className="text-sm text-sippy-charcoal/80">{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="text-center">
              <p className="mb-6 max-w-3xl mx-auto">
                Our experienced Dubai investment specialists provide end-to-end assistance, from property selection to acquisition and management.
              </p>
              <button
                className="btn-outline flex items-center mx-auto"
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              >
                Contact Us for Dubai Investment Guide <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </div>
          </TabsContent>

          {/* ── Legal Guidance tab ── */}
          <TabsContent value="legal" className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-6 font-playfair">Legal Guidance for Indian Investors</h3>
                <div className="space-y-6">
                  {[
                    { title: "Foreign Ownership Laws", desc: "Dubai permits 100% foreign ownership of properties in designated freehold areas. We guide you through the legal framework to ensure compliant investments." },
                    { title: "RBI Regulations",        desc: "Navigate Reserve Bank of India regulations for overseas property purchases with our expert guidance on Liberalized Remittance Scheme (LRS)." },
                    { title: "Tax Implications",       desc: "Understand the tax implications in both India and Dubai, including rental income taxation, capital gains, and wealth tax considerations." },
                    { title: "Estate Planning",        desc: "Advice on will registration and succession planning for your Dubai property assets to ensure smooth inheritance." },
                  ].map(item => (
                    <div key={item.title}>
                      <div className="flex items-center mb-2">
                        <Shield className="h-5 w-5 text-sippy-gold mr-2" />
                        <h4 className="font-bold">{item.title}</h4>
                      </div>
                      <p className="text-sippy-charcoal/80">{item.desc}</p>
                    </div>
                  ))}
                </div>
                <button
                  className="btn-primary mt-8"
                  onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                >
                  Contact Us for Legal Consultation
                </button>
              </div>

              <div>
                <div className="bg-sippy-beige p-8 rounded-lg">
                  <h4 className="text-xl font-bold mb-6 font-playfair">Dubai Investment Benefits</h4>
                  <div className="space-y-4">
                    {[
                      { title: "No Property Tax",    desc: "Dubai doesn't impose annual property taxes" },
                      { title: "Zero Income Tax",    desc: "No tax on rental income or capital gains" },
                      { title: "High ROI",           desc: "Average rental yields of 5-7% annually" },
                      { title: "Residence Visa",     desc: "Property investment can qualify for residence visa" },
                      { title: "Strong Regulations", desc: "RERA Dubai ensures investor protection" },
                      { title: "Flight Connectivity",desc: "Excellent air connectivity with India" },
                    ].map(b => (
                      <div key={b.title} className="flex items-center">
                        <Star className="h-5 w-5 text-sippy-gold mr-3 flex-shrink-0" />
                        <p><span className="font-semibold">{b.title}</span> — {b.desc}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-8 p-4 bg-white rounded-lg border border-sippy-gold">
                    <p className="text-sm text-center font-medium">
                      "Dubai's real estate market has delivered an average appreciation of 8–12% annually over the past decade."
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Lead capture popup */}
      {popupProperty && (
        <LeadCapturePopup
          interest={`International – ${popupProperty.header || popupProperty.building || popupProperty.location || "Property"}`}
          onSuccess={handlePopupSuccess}
          onClose={() => setPopupProperty(null)}
        />
      )}
    </section>
  );
};

export default InvestDubai;
