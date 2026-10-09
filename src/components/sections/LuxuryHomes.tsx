import { formatConfigurationList, formatConfiguration, getPropertyConfigurationLabel } from "@/lib/propertyHelpers";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, IndianRupee, Home, BadgeCheck } from "lucide-react";
import { Property } from "@/lib/supabase";
import { getPropertyPriceStr, formatPriceWithCommas } from "@/lib/utils";
import { propertyService } from "@/services/propertyService";
import { Button } from "@/components/ui/button";
import Watermark from "./Watermark";
import LeadCapturePopup from "@/components/common/LeadCapturePopup";

import { getFunnelSetting } from "@/services/funnelService";
const DISPLAY_LIMIT  = 12;
const SESSION_KEY    = "sippy_lead_captured";

interface LuxuryHomesProps {
  allProperties?: Property[];
}

const LuxuryHomes = ({ allProperties }: LuxuryHomesProps) => {
  const navigate = useNavigate();
  const [premiumProperties, setPremiumProperties] = useState<Property[]>([]);
  const [imagesMap, setImagesMap]                 = useState<Record<string, string>>({});
  const [loading, setLoading]                     = useState(true);
  const [showAll, setShowAll]                     = useState(false);

  // which property's popup is open  (null = closed)
  const [popupProperty, setPopupProperty] = useState<Property | null>(null);

  const displayed = showAll ? premiumProperties : premiumProperties.slice(0, DISPLAY_LIMIT);
  const hasMore   = premiumProperties.length > DISPLAY_LIMIT;

  /* clicking "View Details" on a card */
  // const handleViewDetails = (e: React.MouseEvent, property: Property) => {
  //   e.stopPropagation();
  //   // already registered this session → go straight to detail page
  //   if (sessionStorage.getItem(SESSION_KEY)) {
  //     navigate(`/property/${property.id}`);
  //     return;
  //   }
  //   // show the lead capture popup first
  //   setPopupProperty(property);
  // };
const handleViewDetails = async (
  e: React.MouseEvent,
  property: Property
) => {
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


  /* after user submits the form successfully */
  const handlePopupSuccess = () => {
    const prop = popupProperty;
    setPopupProperty(null);
    if (prop) navigate(`/property/${prop.id}`);
  };

  /* user dismissed the popup without submitting */
  const handlePopupClose = () => {
    setPopupProperty(null);
  };

  useEffect(() => {
    const fetchLuxuryProperties = async () => {
      try {
        setLoading(true);
        const luxuryProps = allProperties
          ? allProperties.filter(p =>
              p.primary_category === "luxury" ||
              (p.category_assignments && p.category_assignments.includes("luxury"))
            )
          : await propertyService.getPropertiesByCategory("luxury");
        setPremiumProperties(luxuryProps);
      } catch (error) {
        console.error("Error fetching luxury properties:", error);
        setPremiumProperties([]);
      } finally {
        setLoading(false);
      }
    };
    fetchLuxuryProperties();
  }, [allProperties]);

  useEffect(() => {
    if (premiumProperties.length === 0) return;
    const fetchImages = async () => {
      const map: Record<string, string> = {};
      await Promise.all(
        premiumProperties.map(async (p) => {
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
  }, [premiumProperties.length]);
  

  return (
    <section id="luxury-homes" className="py-20 bg-white">
      <div className="section-container">
        <div className="text-center mb-16">
          <h2 className="section-title">
            Ultra <span className="text-sippy-gold">Luxury</span> Homes
          </h2>
          <p className="section-subtitle mx-auto">
            Discover our collection of the most prestigious properties in Mumbai,
            representing the pinnacle of luxury living.
          </p>
          <div className="gold-divider" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {displayed.map((property) => (
            <div
              key={property.id}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow border border-gray-100"
            >
              {/* Image — NOT clickable for popup, just display */}
              <div className="h-64 w-full overflow-hidden bg-gray-100">
                <Watermark link={imagesMap[property.id] || "/placeholder.svg"} />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 font-playfair">
                  {property.header || property.building}
                </h3>
                <div className="flex items-center mb-4">
                  <MapPin className="h-4 w-4 text-sippy-gold mr-1" />
                  <span className="text-sippy-charcoal/80">
                    {property.location || property.sub_location || "Location not specified"}
                  </span>
                </div>
                <div className="flex items-center mb-6">
                  <IndianRupee className="h-5 w-5 text-sippy-gold mr-1" />
                  <span className="text-xl font-semibold">
                    {(formatPriceWithCommas(getPropertyPriceStr(property)) || getPropertyPriceStr(property))
                      ? ` ${formatPriceWithCommas(getPropertyPriceStr(property)) || getPropertyPriceStr(property)}`
                      : "Price on request"}
                  </span>
                </div>
                <div className="flex flex-wrap gap-4 mb-6">
                  {property.size && (
                    <div className="flex items-center">
                      <Home className="h-4 w-4 text-sippy-gold mr-2" />
                      <span>{property.size}</span>
                    </div>
                  )}
                  {property.flat_size && (
                    <div className="flex items-center">
                      <Home className="h-4 w-4 text-sippy-gold mr-2" />
                      <span>{property.flat_size}</span>
                    </div>
                  )}
                  {property.configuration_type && (
                    <div><span className="font-medium">{property.configuration_type}</span></div>
                  )}
                  {getPropertyConfigurationLabel(property) && (
                    <div><span className="font-medium">{getPropertyConfigurationLabel(property)}</span></div>
                  )}
                </div>

                {/* ── View Details triggers the lead popup ── */}
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

        {hasMore && (
          <div className="mt-10 text-center">
            {!showAll ? (
              <Button className="btn-primary" onClick={() => setShowAll(true)}>
                Browse all luxury homes
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

        <div className="mt-16 text-center">
          <div className="inline-flex items-center border border-sippy-gold px-6 py-3 rounded-full">
            <BadgeCheck className="h-5 w-5 text-sippy-gold mr-2" />
            <span className="text-sippy-charcoal font-medium">
              All properties are RERA certified
            </span>
          </div>
        </div>
      </div>

      {/* Lead capture popup — shown only when View Details is clicked */}
      {popupProperty && (
        <LeadCapturePopup
          interest={`Luxury Homes – ${popupProperty.header || popupProperty.building || popupProperty.location || "Property"}`}
          onSuccess={handlePopupSuccess}
          onClose={handlePopupClose}
        />
      )}
    </section>
  );
};

export default LuxuryHomes;


// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { MapPin, IndianRupee, Home, BadgeCheck } from "lucide-react";
// import { Property } from "@/lib/supabase";
// import { getPropertyPriceStr, formatPriceWithCommas } from "@/lib/utils";
// import { propertyService } from "@/services/propertyService";
// import { Button } from "@/components/ui/button";
// import Watermark from "./Watermark";

// const DISPLAY_LIMIT = 12;

// interface LuxuryHomesProps {
//   allProperties?: Property[];
// }

// const LuxuryHomes = ({ allProperties }: LuxuryHomesProps) => {
//   const navigate = useNavigate();
//   const [premiumProperties, setPremiumProperties] = useState<Property[]>([]);
//   const [imagesMap, setImagesMap] = useState<Record<string, string>>({});
//   const [loading, setLoading] = useState(true);
//   const [showAll, setShowAll] = useState(false);

//   const handleViewDetails = (property: Property) => {
//     navigate(`/property/${property.id}`);
//   };

//   const displayed = showAll ? premiumProperties : premiumProperties.slice(0, DISPLAY_LIMIT);
//   const hasMore = premiumProperties.length > DISPLAY_LIMIT;

//   useEffect(() => {
//     const fetchLuxuryProperties = async () => {
//       try {
//         setLoading(true);
//         // Use category-based filtering
//         const luxuryProps = allProperties 
//           ? allProperties.filter(p => 
//               p.primary_category === 'luxury' || 
//               (p.category_assignments && p.category_assignments.includes('luxury'))
//             )
//           : await propertyService.getPropertiesByCategory('luxury');
        
//         setPremiumProperties(luxuryProps);
//       } catch (error) {
//         console.error('Error fetching luxury properties:', error);
//         setPremiumProperties([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchLuxuryProperties();
//   }, [allProperties]);

//   // Fetch images last (after properties are shown) – deferred, lazy
//   useEffect(() => {
//     if (premiumProperties.length === 0) return;
//     const fetchImages = async () => {
//       const map: Record<string, string> = {};
//       await Promise.all(
//         premiumProperties.map(async (p) => {
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
//   }, [premiumProperties.length]);

//   return (
//     <section id="luxury-homes" className="py-20 bg-white">
//       <div className="section-container">
//         <div className="text-center mb-16">
//           <h2 className="section-title">
//             Ultra <span className="text-sippy-gold">Luxury</span> Homes
//           </h2>
//           <p className="section-subtitle mx-auto">
//             Discover our collection of the most prestigious properties in Mumbai, representing the pinnacle of luxury living.
//           </p>
//           <div className="gold-divider"></div>
//         </div>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//           {displayed.map((property) => (
//             <div
//               key={property.id}
//               role="button"
//               tabIndex={0}
//               onClick={() => handleViewDetails(property)}
//               onKeyDown={(e) => e.key === "Enter" && handleViewDetails(property)}
//               className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer border border-gray-100"
//             >
//               <div className="h-64 w-full overflow-hidden bg-gray-100">
//                 <Watermark link={imagesMap[property.id] || "/placeholder.svg"} />
//               </div>
//               <div className="p-6">
//                 <h3 className="text-xl font-bold mb-2 font-playfair">{property.header || property.building}</h3>
//                 <div className="flex items-center mb-4">
//                   <MapPin className="h-4 w-4 text-sippy-gold mr-1" />
//                   <span className="text-sippy-charcoal/80">{property.location || property.sub_location || 'Location not specified'}</span>
//                 </div>
//                 <div className="flex items-center mb-6">
//                   <IndianRupee className="h-5 w-5 text-sippy-gold mr-1" />
//                   <span className="text-xl font-semibold">
//                   {(formatPriceWithCommas(getPropertyPriceStr(property)) || getPropertyPriceStr(property))
//                     ? ` ${formatPriceWithCommas(getPropertyPriceStr(property)) || getPropertyPriceStr(property)}` //₹
//                     : "Price on request"}
//                 </span>
//                 </div>
//                 <div className="flex flex-wrap gap-4 mb-6">
//                   {property.size && (
//                     <div className="flex items-center">
//                       <Home className="h-4 w-4 text-sippy-gold mr-2" />
//                       <span>{property.size}</span>
//                     </div>
//                   )}
//                   {property.flat_size && (
//                     <div className="flex items-center">
//                       <Home className="h-4 w-4 text-sippy-gold mr-2" />
//                       <span>{property.flat_size}</span>
//                     </div>
//                   )}
//                   {property.configuration_type && (
//                     <div>
//                       <span className="font-medium">{property.configuration_type}</span>
//                     </div>
//                   )}
//                   {property.bhk && (
//                     <div>
//                       <span className="font-medium">{property.bhk}</span> BHK
//                     </div>
//                   )}
//                 </div>
//                 <button
//                   type="button"
//                   className="btn-outline w-full flex items-center justify-center"
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     handleViewDetails(property);
//                   }}
//                 >
//                   View Details
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//         {hasMore && (
//           <div className="mt-10 text-center">
//             {!showAll ? (
//               <Button className="btn-primary" onClick={() => setShowAll(true)}>
//                 Browse all luxury homes
//               </Button>
//             ) : (
//               <Button variant="outline" className="border-sippy-gold text-sippy-charcoal hover:bg-sippy-beige" onClick={() => setShowAll(false)}>
//                 Show less
//               </Button>
//             )}
//           </div>
//         )}
//         <div className="mt-16 text-center">
//           <div className="inline-flex items-center border border-sippy-gold px-6 py-3 rounded-full">
//             <BadgeCheck className="h-5 w-5 text-sippy-gold mr-2" />
//             <span className="text-sippy-charcoal font-medium">All properties are RERA certified</span>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default LuxuryHomes;














// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { MapPin, IndianRupee, Home, BadgeCheck, X } from "lucide-react";
// import { Property } from "@/lib/supabase";
// import { getPropertyPriceStr, formatPriceWithCommas } from "@/lib/utils";
// import { propertyService } from "@/services/propertyService";
// import { Button } from "@/components/ui/button";
// import Watermark from "./Watermark";
// import { supabase } from "@/lib/supabase";

// const DISPLAY_LIMIT = 12;
// const WHATSAPP_NUMBER = "917777030607";
// const SESSION_KEY = "sippy_lead_captured";

// /* ─────────────────────────────────────────
//    LEAD POPUP — self-contained, no extra files
// ───────────────────────────────────────────*/
// interface LeadPopupProps {
//   propertyTitle: string;
//   propertyType?: string;
//   onClose: () => void;
//   onSuccess: () => void;
// }

// const LeadPopup = ({ propertyTitle, propertyType, onClose, onSuccess }: LeadPopupProps) => {
//   const [step, setStep] = useState<"form" | "saving" | "done">("form");
//   const [err, setErr]   = useState("");
//   const [form, setForm] = useState({ name: "", email: "", phone: "", propertyType: propertyType || "" });

//   const handle = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
//     setForm(p => ({ ...p, [e.target.name]: e.target.value }));

//   const submit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!form.name.trim())  { setErr("Please enter your name.");         return; }
//     if (!form.phone.trim()) { setErr("Please enter your phone number."); return; }
//     setErr("");
//     setStep("saving");

//     // Save to Supabase (non-blocking on error)
//     try {
//       await supabase.from("visitor_leads").insert([{
//         name:     form.name.trim(),
//         phone:    form.phone.trim(),
//         email:    form.email.trim() || null,
//         city:     null,
//         interest: `${form.propertyType ? form.propertyType + " – " : ""}${propertyTitle}`,
//       }]);
//     } catch (e) { console.error(e); }

//     setStep("done");

//     const msg = encodeURIComponent(
//       `Hi Sippy Housing!\n\nI'm interested in: ${propertyTitle}` +
//       `${form.propertyType ? `\nProperty Type: ${form.propertyType}` : ""}` +
//       `\n\nName: ${form.name}\nPhone: ${form.phone}` +
//       `${form.email ? `\nEmail: ${form.email}` : ""}`
//     );

//     setTimeout(() => {
//       sessionStorage.setItem(SESSION_KEY, "1");
//       window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, "_blank");
//       onSuccess();
//     }, 1000);
//   };

//   return (
//     <div
//       style={{
//         position: "fixed", inset: 0, zIndex: 9999,
//         background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)",
//         display: "flex", alignItems: "center", justifyContent: "center", padding: 16,
//       }}
//       onClick={e => { if (e.target === e.currentTarget) onClose(); }}
//     >
//       <style>{`
//         @keyframes popIn { from{transform:scale(.88) translateY(16px);opacity:0} to{transform:scale(1) translateY(0);opacity:1} }
//         @keyframes spin   { to{transform:rotate(360deg)} }
//         .lead-inp { width:100%;padding:11px 14px;border-radius:10px;border:1.5px solid #e5e7eb;
//           font-size:14px;outline:none;font-family:inherit;color:#111827;background:#fafafa;box-sizing:border-box; }
//         .lead-inp:focus { border-color:#C9A84C;box-shadow:0 0 0 3px rgba(201,168,76,.15); }
//       `}</style>

//       <div style={{
//         background: "#fff", borderRadius: 20, width: "100%", maxWidth: 460,
//         boxShadow: "0 24px 64px rgba(0,0,0,.25)", overflow: "hidden", position: "relative",
//         animation: "popIn .25s cubic-bezier(.34,1.56,.64,1)",
//       }}>
//         {/* Gold top bar */}
//         <div style={{ height: 5, background: "linear-gradient(90deg,#C9A84C,#e8c96d,#C9A84C)" }} />

//         {/* Close */}
//         <button onClick={onClose} style={{
//           position: "absolute", top: 14, right: 16,
//           background: "none", border: "none", fontSize: 20,
//           cursor: "pointer", color: "#9ca3af", lineHeight: 1, zIndex: 1,
//         }}>✕</button>

//         {step === "done" ? (
//           /* ── Success ── */
//           <div style={{ padding: "44px 32px", textAlign: "center" }}>
//             <div style={{
//               width: 64, height: 64, borderRadius: "50%",
//               background: "linear-gradient(135deg,#C9A84C,#e8c96d)",
//               display: "flex", alignItems: "center", justifyContent: "center",
//               fontSize: 28, margin: "0 auto 16px",
//             }}>✓</div>
//             <h3 style={{ fontSize: 20, fontWeight: 800, color: "#111827", margin: "0 0 8px" }}>
//               Thank you, {form.name.split(" ")[0]}!
//             </h3>
//             <p style={{ fontSize: 14, color: "#6b7280", margin: 0 }}>
//               Opening WhatsApp to connect you with our team…
//             </p>
//           </div>
//         ) : (
//           /* ── Form ── */
//           <div style={{ padding: "28px 32px 32px" }}>
//             {/* Header */}
//             <div style={{ marginBottom: 20 }}>
//               <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
//                 <div style={{
//                   width: 38, height: 38, borderRadius: 10, flexShrink: 0,
//                   background: "linear-gradient(135deg,#C9A84C,#e8c96d)",
//                   display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18,
//                 }}>🏠</div>
//                 <h2 style={{ fontSize: 18, fontWeight: 800, color: "#111827", margin: 0, lineHeight: 1.3 }}>
//                   Get Details on WhatsApp
//                 </h2>
//               </div>
//               <p style={{ fontSize: 13, color: "#6b7280", margin: "0 0 0 48px" }}>
//                 Enquiring about&nbsp;
//                 <strong style={{ color: "#C9A84C" }}>{propertyTitle}</strong>
//               </p>
//             </div>

//             <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
//               {/* Name */}
//               <div>
//                 <label style={{ fontSize: 12, fontWeight: 700, color: "#374151", display: "block", marginBottom: 5 }}>
//                   Full Name <span style={{ color: "#ef4444" }}>*</span>
//                 </label>
//                 <input name="name" value={form.name} onChange={handle}
//                   placeholder="e.g. Rahul Sharma" className="lead-inp" />
//               </div>

//               {/* Phone */}
//               <div>
//                 <label style={{ fontSize: 12, fontWeight: 700, color: "#374151", display: "block", marginBottom: 5 }}>
//                   Phone Number <span style={{ color: "#ef4444" }}>*</span>
//                 </label>
//                 <input name="phone" value={form.phone} onChange={handle}
//                   placeholder="e.g. 9876543210" type="tel" className="lead-inp" />
//               </div>

//               {/* Email */}
//               <div>
//                 <label style={{ fontSize: 12, fontWeight: 700, color: "#374151", display: "block", marginBottom: 5 }}>
//                   Email <span style={{ fontSize: 11, color: "#9ca3af", fontWeight: 400 }}>(optional)</span>
//                 </label>
//                 <input name="email" value={form.email} onChange={handle}
//                   placeholder="you@email.com" type="email" className="lead-inp" />
//               </div>

//               {/* Property Type */}
//               <div>
//                 <label style={{ fontSize: 12, fontWeight: 700, color: "#374151", display: "block", marginBottom: 5 }}>
//                   Property Type
//                 </label>
//                 <select name="propertyType" value={form.propertyType} onChange={handle}
//                   className="lead-inp" style={{ cursor: "pointer" }}>
//                   <option value="">Select type…</option>
//                   <option value="Luxury Homes">Luxury Homes</option>
//                   <option value="New Projects">New Projects</option>
//                   <option value="Resale / Rental">Resale / Rental</option>
//                   <option value="Plots & Lands">Plots &amp; Lands</option>
//                   <option value="Commercial">Commercial</option>
//                   <option value="Independent Buildings">Independent Buildings</option>
//                   <option value="Redevelopment / JV">Redevelopment / JV</option>
//                   <option value="Hotels">Hotels</option>
//                   <option value="International">International</option>
//                 </select>
//               </div>

//               {err && (
//                 <p style={{
//                   fontSize: 13, color: "#b91c1c", background: "#fef2f2",
//                   border: "1px solid #fca5a5", borderRadius: 8,
//                   padding: "8px 12px", margin: 0,
//                 }}>{err}</p>
//               )}

//               <button type="submit" disabled={step === "saving"} style={{
//                 marginTop: 4, height: 50,
//                 background: step === "saving" ? "#d1d5db" : "linear-gradient(135deg,#C9A84C,#e8c96d)",
//                 color: step === "saving" ? "#9ca3af" : "#7a5c1e",
//                 border: "none", borderRadius: 12, fontSize: 15, fontWeight: 800,
//                 cursor: step === "saving" ? "not-allowed" : "pointer",
//                 fontFamily: "inherit",
//                 boxShadow: step === "saving" ? "none" : "0 4px 16px rgba(201,168,76,.4)",
//                 display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
//                 transition: "all .2s", width: "100%",
//               }}>
//                 {step === "saving" ? (
//                   <>
//                     <span style={{
//                       width: 16, height: 16,
//                       border: "2px solid #d1d5db", borderTopColor: "#9ca3af",
//                       borderRadius: "50%", display: "inline-block",
//                       animation: "spin .6s linear infinite",
//                     }} />
//                     Saving…
//                   </>
//                 ) : "💬 Send on WhatsApp"}
//               </button>

//               <p style={{ fontSize: 11, color: "#9ca3af", textAlign: "center", margin: 0 }}>
//                 🔒 Your details are private and never shared with third parties.
//               </p>
//             </form>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// /* ─────────────────────────────────────────
//    LUXURY HOMES SECTION
// ───────────────────────────────────────────*/
// interface LuxuryHomesProps {
//   allProperties?: Property[];
// }

// const LuxuryHomes = ({ allProperties }: LuxuryHomesProps) => {
//   const navigate = useNavigate();
//   const [premiumProperties, setPremiumProperties] = useState<Property[]>([]);
//   const [imagesMap, setImagesMap]                 = useState<Record<string, string>>({});
//   const [loading, setLoading]                     = useState(true);
//   const [showAll, setShowAll]                     = useState(false);

//   // Lead popup state
//   const [popupProperty, setPopupProperty] = useState<Property | null>(null);

//   const displayed = showAll ? premiumProperties : premiumProperties.slice(0, DISPLAY_LIMIT);
//   const hasMore   = premiumProperties.length > DISPLAY_LIMIT;

//   /* open popup; if already captured this session go straight to detail */
//   const openPopup = (e: React.MouseEvent, property: Property) => {
//     e.stopPropagation();
//     if (sessionStorage.getItem(SESSION_KEY)) {
//       navigate(`/property/${property.id}`);
//       return;
//     }
//     setPopupProperty(property);
//   };

//   const handlePopupSuccess = () => {
//     const prop = popupProperty;
//     setPopupProperty(null);
//     if (prop) navigate(`/property/${prop.id}`);
//   };

//   useEffect(() => {
//     const fetchLuxuryProperties = async () => {
//       try {
//         setLoading(true);
//         const luxuryProps = allProperties
//           ? allProperties.filter(p =>
//               p.primary_category === "luxury" ||
//               (p.category_assignments && p.category_assignments.includes("luxury"))
//             )
//           : await propertyService.getPropertiesByCategory("luxury");
//         setPremiumProperties(luxuryProps);
//       } catch (error) {
//         console.error("Error fetching luxury properties:", error);
//         setPremiumProperties([]);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchLuxuryProperties();
//   }, [allProperties]);

//   useEffect(() => {
//     if (premiumProperties.length === 0) return;
//     const fetchImages = async () => {
//       const map: Record<string, string> = {};
//       await Promise.all(
//         premiumProperties.map(async (p) => {
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
//   }, [premiumProperties.length]);

//   return (
//     <section id="luxury-homes" className="py-20 bg-white">
//       <div className="section-container">
//         <div className="text-center mb-16">
//           <h2 className="section-title">
//             Ultra <span className="text-sippy-gold">Luxury</span> Homes
//           </h2>
//           <p className="section-subtitle mx-auto">
//             Discover our collection of the most prestigious properties in Mumbai, representing the pinnacle of luxury living.
//           </p>
//           <div className="gold-divider" />
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//           {displayed.map((property) => (
//             <div
//               key={property.id}
//               className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer border border-gray-100"
//               onClick={(e) => openPopup(e, property)}
//             >
//               {/* Image — clicking also opens popup */}
//               <div
//                 className="h-64 w-full overflow-hidden bg-gray-100 relative group"
//                 onClick={(e) => openPopup(e, property)}
//               >
//                 <Watermark link={imagesMap[property.id] || "/placeholder.svg"} />
//                 {/* Hover overlay on image */}
//                 <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
//                   <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300
//                     bg-white/90 text-sippy-charcoal font-bold text-sm px-4 py-2 rounded-full shadow">
//                     Enquire Now
//                   </span>
//                 </div>
//               </div>

//               <div className="p-6">
//                 <h3 className="text-xl font-bold mb-2 font-playfair">
//                   {property.header || property.building}
//                 </h3>
//                 <div className="flex items-center mb-4">
//                   <MapPin className="h-4 w-4 text-sippy-gold mr-1" />
//                   <span className="text-sippy-charcoal/80">
//                     {property.location || property.sub_location || "Location not specified"}
//                   </span>
//                 </div>
//                 <div className="flex items-center mb-6">
//                   <IndianRupee className="h-5 w-5 text-sippy-gold mr-1" />
//                   <span className="text-xl font-semibold">
//                     {(formatPriceWithCommas(getPropertyPriceStr(property)) || getPropertyPriceStr(property))
//                       ? `₹ ${formatPriceWithCommas(getPropertyPriceStr(property)) || getPropertyPriceStr(property)}`
//                       : "Price on request"}
//                   </span>
//                 </div>
//                 <div className="flex flex-wrap gap-4 mb-6">
//                   {property.size && (
//                     <div className="flex items-center">
//                       <Home className="h-4 w-4 text-sippy-gold mr-2" />
//                       <span>{property.size}</span>
//                     </div>
//                   )}
//                   {property.flat_size && (
//                     <div className="flex items-center">
//                       <Home className="h-4 w-4 text-sippy-gold mr-2" />
//                       <span>{property.flat_size}</span>
//                     </div>
//                   )}
//                   {property.configuration_type && (
//                     <div><span className="font-medium">{property.configuration_type}</span></div>
//                   )}
//                   {property.bhk && (
//                     <div><span className="font-medium">{property.bhk}</span> BHK</div>
//                   )}
//                 </div>

//                 <button
//                   type="button"
//                   className="btn-outline w-full flex items-center justify-center"
//                   onClick={(e) => openPopup(e, property)}
//                 >
//                   View Details
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>

//         {hasMore && (
//           <div className="mt-10 text-center">
//             {!showAll ? (
//               <Button className="btn-primary" onClick={() => setShowAll(true)}>
//                 Browse all luxury homes
//               </Button>
//             ) : (
//               <Button
//                 variant="outline"
//                 className="border-sippy-gold text-sippy-charcoal hover:bg-sippy-beige"
//                 onClick={() => setShowAll(false)}
//               >
//                 Show less
//               </Button>
//             )}
//           </div>
//         )}

//         <div className="mt-16 text-center">
//           <div className="inline-flex items-center border border-sippy-gold px-6 py-3 rounded-full">
//             <BadgeCheck className="h-5 w-5 text-sippy-gold mr-2" />
//             <span className="text-sippy-charcoal font-medium">All properties are RERA certified</span>
//           </div>
//         </div>
//       </div>

//       {/* Lead popup */}
//       {popupProperty && (
//         <LeadPopup
//           propertyTitle={popupProperty.header || popupProperty.building || "Luxury Property"}
//           propertyType="Luxury Homes"
//           onClose={() => setPopupProperty(null)}
//           onSuccess={handlePopupSuccess}
//         />
//       )}
//     </section>
//   );
// };

// export default LuxuryHomes;
