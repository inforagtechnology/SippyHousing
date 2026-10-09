// import { useState } from "react";
// import { supabase } from "@/lib/supabase";

// interface LeadCapturePopupProps {
//   interest: string;          // e.g. "Luxury Homes" or "Property: Sea View Apartment"
//   onSuccess: () => void;     // called after successful submit → proceed to content
//   onClose: () => void;       // called when user dismisses
// }

// const WHATSAPP_NUMBER = "919926595561"; // your number with country code, no +

// const LeadCapturePopup = ({ interest, onSuccess, onClose }: LeadCapturePopupProps) => {
//   const [step, setStep]       = useState<"form" | "submitting" | "done">("form");
//   const [error, setError]     = useState("");
//   const [form, setForm]       = useState({
//     name: "", phone: "", email: "", city: "",
//   });

//   const handle = (e: React.ChangeEvent<HTMLInputElement>) =>
//     setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!form.name.trim())  { setError("Please enter your name.");         return; }
//     if (!form.phone.trim()) { setError("Please enter your phone number."); return; }
//     setError("");
//     setStep("submitting");

//     const { error: dbErr } = await supabase.from("visitor_leads").insert([{
//       name:     form.name.trim(),
//       phone:    form.phone.trim(),
//       email:    form.email.trim() || null,
//       city:     form.city.trim()  || null,
//       interest,
//     }]);

//     if (dbErr) console.error("Lead save error:", dbErr); // non-blocking

//     setStep("done");

//     // Build WhatsApp message
//     const msg = encodeURIComponent(
//       `Hi Sippy Housing! I'm interested in: ${interest}\n\nName: ${form.name}\nPhone: ${form.phone}${form.city ? `\nCity: ${form.city}` : ""}`
//     );

//     // Open WhatsApp after short delay so user sees the "done" state
//     setTimeout(() => {
//       window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, "_blank");
//       onSuccess();
//     }, 1200);
//   };

//   /* ─── styles ─── */
//   const overlay: React.CSSProperties = {
//     position: "fixed", inset: 0, zIndex: 9999,
//     background: "rgba(0,0,0,0.55)", backdropFilter: "blur(4px)",
//     display: "flex", alignItems: "center", justifyContent: "center", padding: 16,
//   };
//   const card: React.CSSProperties = {
//     background: "#fff", borderRadius: 20, width: "100%", maxWidth: 460,
//     boxShadow: "0 24px 64px rgba(0,0,0,0.22)",
//     overflow: "hidden", position: "relative",
//     animation: "popIn .25s cubic-bezier(.34,1.56,.64,1)",
//   };
//   const goldBar: React.CSSProperties = {
//     height: 5, background: "linear-gradient(90deg,#C9A84C,#e8c96d,#C9A84C)",
//   };
//   const inputStyle: React.CSSProperties = {
//     width: "100%", padding: "11px 14px", borderRadius: 10,
//     border: "1.5px solid #e5e7eb", fontSize: 14, outline: "none",
//     fontFamily: "inherit", color: "#111827", background: "#fafafa",
//     boxSizing: "border-box",
//   };
//   const labelStyle: React.CSSProperties = {
//     fontSize: 12, fontWeight: 700, color: "#374151",
//     display: "block", marginBottom: 5,
//   };

//   return (
//     <div style={overlay} onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
//       <style>{`
//         @keyframes popIn {
//           from { transform: scale(.88) translateY(20px); opacity: 0; }
//           to   { transform: scale(1)   translateY(0);    opacity: 1; }
//         }
//         .lead-input:focus { border-color: #C9A84C !important; box-shadow: 0 0 0 3px rgba(201,168,76,.15); }
//       `}</style>

//       <div style={card}>
//         <div style={goldBar} />

//         {/* close btn */}
//         <button
//           onClick={onClose}
//           style={{
//             position: "absolute", top: 14, right: 16,
//             background: "none", border: "none", fontSize: 20,
//             cursor: "pointer", color: "#9ca3af", lineHeight: 1,
//           }}
//         >✕</button>

//         {step === "done" ? (
//           /* ── Success state ── */
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
//           /* ── Form state ── */
//           <div style={{ padding: "28px 32px 32px" }}>
//             {/* Header */}
//             <div style={{ marginBottom: 22 }}>
//               <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
//                 <div style={{
//                   width: 38, height: 38, borderRadius: 10,
//                   background: "linear-gradient(135deg,#C9A84C,#e8c96d)",
//                   display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18,
//                 }}>🏠</div>
//                 <h2 style={{ fontSize: 18, fontWeight: 800, color: "#111827", margin: 0 }}>
//                   Get Exclusive Access
//                 </h2>
//               </div>
//               <p style={{ fontSize: 13, color: "#6b7280", margin: 0, paddingLeft: 48 }}>
//                 Share your details to view&nbsp;
//                 <strong style={{ color: "#C9A84C" }}>{interest}</strong>
//                 &nbsp;and our team will reach out personally.
//               </p>
//             </div>

//             <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
//               {/* Name */}
//               <div>
//                 <label style={labelStyle}>Full Name <span style={{ color: "#ef4444" }}>*</span></label>
//                 <input
//                   name="name" value={form.name} onChange={handle}
//                   placeholder="e.g. Rahul Sharma"
//                   className="lead-input" style={inputStyle}
//                 />
//               </div>

//               {/* Phone */}
//               <div>
//                 <label style={labelStyle}>Phone Number <span style={{ color: "#ef4444" }}>*</span></label>
//                 <input
//                   name="phone" value={form.phone} onChange={handle}
//                   placeholder="e.g. 9876543210" type="tel"
//                   className="lead-input" style={inputStyle}
//                 />
//               </div>

//               {/* Email + City side by side */}
//               <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
//                 <div>
//                   <label style={labelStyle}>Email</label>
//                   <input
//                     name="email" value={form.email} onChange={handle}
//                     placeholder="you@email.com" type="email"
//                     className="lead-input" style={inputStyle}
//                   />
//                 </div>
//                 <div>
//                   <label style={labelStyle}>City</label>
//                   <input
//                     name="city" value={form.city} onChange={handle}
//                     placeholder="e.g. Mumbai"
//                     className="lead-input" style={inputStyle}
//                   />
//                 </div>
//               </div>

//               {error && (
//                 <p style={{
//                   fontSize: 13, color: "#b91c1c", background: "#fef2f2",
//                   border: "1px solid #fca5a5", borderRadius: 8,
//                   padding: "8px 12px", margin: 0,
//                 }}>{error}</p>
//               )}

//               <button
//                 type="submit"
//                 disabled={step === "submitting"}
//                 style={{
//                   marginTop: 4, height: 48,
//                   background: step === "submitting"
//                     ? "#d1d5db"
//                     : "linear-gradient(135deg,#C9A84C,#e8c96d)",
//                   color: step === "submitting" ? "#9ca3af" : "#7a5c1e",
//                   border: "none", borderRadius: 12,
//                   fontSize: 15, fontWeight: 800,
//                   cursor: step === "submitting" ? "not-allowed" : "pointer",
//                   fontFamily: "inherit",
//                   boxShadow: step === "submitting" ? "none" : "0 4px 16px rgba(201,168,76,.4)",
//                   display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
//                   transition: "all .2s",
//                 }}
//               >
//                 {step === "submitting" ? (
//                   <>
//                     <span style={{
//                       width: 16, height: 16,
//                       border: "2px solid #d1d5db", borderTopColor: "#9ca3af",
//                       borderRadius: "50%", display: "inline-block",
//                       animation: "spin .6s linear infinite",
//                     }} />
//                     Saving…
//                   </>
//                 ) : (
//                   <>💬 Continue on WhatsApp</>
//                 )}
//               </button>

//               <p style={{ fontSize: 11, color: "#9ca3af", textAlign: "center", margin: 0 }}>
//                 🔒 Your details are private and never shared with third parties.
//               </p>
//             </form>
//           </div>
//         )}
//       </div>
//       <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
//     </div>
//   );
// };

// export default LeadCapturePopup;

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { GENERAL_CONTACT_NUMBER, getWhatsAppHref, formatIndianPhone } from "@/lib/contactRouting";

interface LeadCapturePopupProps {
  interest: string;
  onSuccess: () => void;
  onClose: () => void;
  /** Numbers that should receive this lead (defaults to the general number) */
  leadNumbers?: string[];
}

const LeadCapturePopup = ({ interest, onSuccess, onClose, leadNumbers }: LeadCapturePopupProps) => {
  const [step, setStep]   = useState<"form" | "saving" | "done">("form");
  const [error, setError] = useState("");
  const [form, setForm]   = useState({
    name: "", phone: "", email: "", city: "",
  });

  const handle = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim())  { setError("Please enter your name.");         return; }
    if (!form.phone.trim()) { setError("Please enter your phone number."); return; }
    setError("");
    setStep("saving");

    // ── Save to Supabase ──
    // The lead is stored once and tagged with every number that should receive it.
    const routed = (leadNumbers && leadNumbers.length ? leadNumbers : [GENERAL_CONTACT_NUMBER]).join(", ");
    const basePayload = {
      name:     form.name.trim(),
      phone:    form.phone.trim(),
      email:    form.email.trim() || null,
      city:     form.city.trim()  || null,
      interest,
    };
    let { error: dbErr } = await supabase.from("visitor_leads").insert([{ ...basePayload, routed_numbers: routed }]);
    // If the new column has not been added yet, fall back to the original payload
    if (dbErr && /routed_numbers/i.test(dbErr.message || "")) {
      ({ error: dbErr } = await supabase.from("visitor_leads").insert([basePayload]));
    }

    //if (dbErr) console.error("Lead save error:", dbErr);
    if (dbErr) {
  console.error("Lead save error:", JSON.stringify(dbErr));
  return; // stop here so you can see the error
}

    // Mark session so popup doesn't show again
    sessionStorage.setItem("sippy_lead_captured", "1");
    setStep("done");
  };

  const overlay: React.CSSProperties = {
    position: "fixed", inset: 0, zIndex: 9999,
    background: "rgba(0,0,0,0.55)", backdropFilter: "blur(4px)",
    display: "flex", alignItems: "center", justifyContent: "center", padding: 16,
  };
  const card: React.CSSProperties = {
    background: "#fff", borderRadius: 20, width: "100%", maxWidth: 460,
    boxShadow: "0 24px 64px rgba(0,0,0,0.22)",
    overflow: "hidden", position: "relative",
    animation: "popIn .25s cubic-bezier(.34,1.56,.64,1)",
  };
  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "11px 14px", borderRadius: 10,
    border: "1.5px solid #e5e7eb", fontSize: 14, outline: "none",
    fontFamily: "inherit", color: "#111827", background: "#fafafa",
    boxSizing: "border-box",
  };
  const labelStyle: React.CSSProperties = {
    fontSize: 12, fontWeight: 700, color: "#374151",
    display: "block", marginBottom: 5,
  };

  return (
    <div style={overlay} onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <style>{`
        @keyframes popIn {
          from { transform: scale(.88) translateY(20px); opacity: 0; }
          to   { transform: scale(1) translateY(0); opacity: 1; }
        }
        @keyframes fadeUp {
          from { transform: translateY(14px); opacity: 0; }
          to   { transform: translateY(0); opacity: 1; }
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        .lead-input:focus {
          border-color: #C9A84C !important;
          box-shadow: 0 0 0 3px rgba(201,168,76,.15) !important;
        }
      `}</style>

      <div style={card}>
        {/* Gold bar */}
        <div style={{ height: 5, background: "linear-gradient(90deg,#C9A84C,#e8c96d,#C9A84C)" }} />

        {/* Close */}
        <button onClick={onClose} style={{
          position: "absolute", top: 14, right: 16,
          background: "none", border: "none", fontSize: 20,
          cursor: "pointer", color: "#9ca3af", lineHeight: 1,
        }}>✕</button>

        {/* ── DONE STATE ── */}
        {step === "done" ? (
          <div style={{ padding: "52px 32px 48px", textAlign: "center", animation: "fadeUp .3s ease" }}>
            <div style={{
              width: 72, height: 72, borderRadius: "50%",
              background: "linear-gradient(135deg,#C9A84C,#e8c96d)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 32, margin: "0 auto 20px",
              boxShadow: "0 8px 24px rgba(201,168,76,.35)",
            }}>✓</div>
            <h3 style={{ fontSize: 22, fontWeight: 800, color: "#111827", margin: "0 0 10px" }}>
              Registration Successful!
            </h3>
            <p style={{ fontSize: 15, color: "#6b7280", margin: "0 0 6px" }}>
              Thank you,{" "}
              <strong style={{ color: "#C9A84C" }}>{form.name.split(" ")[0]}</strong>!
            </p>
            <p style={{ fontSize: 13, color: "#9ca3af", margin: "0 0 28px" }}>
              Our team will contact you shortly on{" "}
              <strong style={{ color: "#374151" }}>{form.phone}</strong>.
            </p>
            {/* Lead goes to every configured number – visitor can also ping any of them directly */}
            {(leadNumbers && leadNumbers.length > 1) && (
              <div style={{ display: "flex", flexDirection: "column", gap: 8, margin: "0 0 24px" }}>
                {leadNumbers.map((n) => (
                  <a
                    key={n}
                    href={getWhatsAppHref(`91${n}`, `Hi Sippy Housing! I'm interested in: ${interest}\n\nName: ${form.name}\nPhone: ${form.phone}`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontSize: 13, fontWeight: 700, color: "#15803d", textDecoration: "none",
                      border: "1.5px solid #bbf7d0", borderRadius: 10, padding: "9px 12px", background: "#f0fdf4",
                    }}
                  >
                    WhatsApp {formatIndianPhone(n)}
                  </a>
                ))}
              </div>
            )}
            <button
              onClick={onSuccess}
              style={{
                background: "linear-gradient(135deg,#C9A84C,#e8c96d)",
                color: "#7a5c1e", border: "none", borderRadius: 12,
                padding: "13px 36px", fontSize: 15, fontWeight: 800,
                cursor: "pointer", fontFamily: "inherit",
                boxShadow: "0 4px 16px rgba(201,168,76,.4)",
              }}
            >
              View Property Details →
            </button>
          </div>
        ) : (
          /* ── FORM STATE ── */
          <div style={{ padding: "28px 32px 32px" }}>
            <div style={{ marginBottom: 22 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                <div style={{
                  width: 38, height: 38, borderRadius: 10,
                  background: "linear-gradient(135deg,#C9A84C,#e8c96d)",
                  display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18,
                }}>🏠</div>
                <h2 style={{ fontSize: 18, fontWeight: 800, color: "#111827", margin: 0 }}>
                  Get Property Details
                </h2>
              </div>
              <p style={{ fontSize: 13, color: "#6b7280", margin: 0, paddingLeft: 48 }}>
                Share your details to view&nbsp;
                <strong style={{ color: "#C9A84C" }}>{interest}</strong>
                &nbsp;— our team will reach out personally.
              </p>
            </div>

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div>
                <label style={labelStyle}>Full Name <span style={{ color: "#ef4444" }}>*</span></label>
                <input name="name" value={form.name} onChange={handle}
                  placeholder="e.g. Rahul Sharma"
                  className="lead-input" style={inputStyle} />
              </div>

              <div>
                <label style={labelStyle}>Phone Number <span style={{ color: "#ef4444" }}>*</span></label>
                <input name="phone" value={form.phone} onChange={handle}
                  placeholder="e.g. 9876543210" type="tel"
                  className="lead-input" style={inputStyle} />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div>
                  <label style={labelStyle}>
                    Email <span style={{ fontSize: 10, color: "#9ca3af", fontWeight: 400 }}>(optional)</span>
                  </label>
                  <input name="email" value={form.email} onChange={handle}
                    placeholder="you@email.com" type="email"
                    className="lead-input" style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>
                    City <span style={{ fontSize: 10, color: "#9ca3af", fontWeight: 400 }}>(optional)</span>
                  </label>
                  <input name="city" value={form.city} onChange={handle}
                    placeholder="e.g. Mumbai"
                    className="lead-input" style={inputStyle} />
                </div>
              </div>

              {error && (
                <p style={{
                  fontSize: 13, color: "#b91c1c", background: "#fef2f2",
                  border: "1px solid #fca5a5", borderRadius: 8,
                  padding: "8px 12px", margin: 0,
                }}>{error}</p>
              )}

              <button
                type="submit"
                disabled={step === "saving"}
                style={{
                  marginTop: 4, height: 50,
                  background: step === "saving" ? "#e5e7eb" : "linear-gradient(135deg,#C9A84C,#e8c96d)",
                  color: step === "saving" ? "#9ca3af" : "#7a5c1e",
                  border: "none", borderRadius: 12,
                  fontSize: 15, fontWeight: 800,
                  cursor: step === "saving" ? "not-allowed" : "pointer",
                  fontFamily: "inherit",
                  boxShadow: step === "saving" ? "none" : "0 4px 16px rgba(201,168,76,.4)",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                  width: "100%", transition: "all .2s",
                }}
              >
                {step === "saving" ? (
                  <>
                    <span style={{
                      width: 16, height: 16,
                      border: "2px solid #d1d5db", borderTopColor: "#9ca3af",
                      borderRadius: "50%", display: "inline-block",
                      animation: "spin .6s linear infinite",
                    }} />
                    Registering…
                  </>
                ) : "Get Property Details"}
              </button>

              <p style={{ fontSize: 11, color: "#9ca3af", textAlign: "center", margin: 0 }}>
                🔒 Your details are private and never shared with third parties.
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeadCapturePopup;
