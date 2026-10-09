// import { useState } from "react";
// import { supabase } from "@/lib/supabase";

// export default function LeadPopup({
//   projectId,
//   onSuccess,
//   onClose
// }) {
//   const [formData, setFormData] = useState({
//      name: "",
//   email: "",
//   phone: "",
//   property_type: ""
// });


//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const { error } = await supabase
//       .from("leads")
//       .insert([
//         {
//           ...formData,
//           project_id: projectId
//         }
//       ]);

//     if (error) {
//       alert(error.message);
//       return;
//     }

//     onSuccess();
//   };

  

//   return (
//     <div className="popup">
//       <form onSubmit={handleSubmit}>
//         <input
//           placeholder="Name"
//           onChange={(e) =>
//             setFormData({
//               ...formData,
//               name: e.target.value
//             })
//           }
//         />

//         <input
//           placeholder="Email"
//           onChange={(e) =>
//             setFormData({
//               ...formData,
//               email: e.target.value
//             })
//           }
//         />

//         <input
//           placeholder="Phone"
//           onChange={(e) =>
//             setFormData({
//               ...formData,
//               phone: e.target.value
//             })
//           }
//         />

//         <select
//   value={formData.property_type}
//   onChange={(e) =>
//     setFormData({
//       ...formData,
//       property_type: e.target.value
//     })
//   }
//   required
// >
//   <option value="">Select Property Type</option>
//   <option value="Luxury">Luxury</option>
//   <option value="Hotel">Hotel</option>
//   <option value="Residential">Residential</option>
//   <option value="Commercial">Commercial</option>
//   <option value="Villa">Villa</option>
//   <option value="Apartment">Apartment</option>
//   <option value="Office">Office</option>
//   <option value="Retail">Retail</option>
// </select>

//         <button type="submit">
//           Submit
//         </button>

//         <button
//           type="button"
//           onClick={onClose}
//         >
//           Close
//         </button>
//       </form>
//     </div>
//   );
// }
import { getFunnelSetting, updateFunnelSetting } from "@/services/funnelService";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "@/components/layout/AdminLayout";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft, 
  Plus, 
  Upload, 
  FileText, 
  Loader2,
  Image as ImageIcon,
  Info
} from "lucide-react";

interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  city: string | null;
  interest: string | null;
  created_at: string;
}

const VisitorLeads = () => {
  const navigate = useNavigate();
  const [leads,   setLeads]   = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [search,  setSearch]  = useState("");
  const [copied,  setCopied]  = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);
const [funnelEnabled, setFunnelEnabled] = useState(true);
const [savingFunnel, setSavingFunnel] = useState(false);
  useEffect(() => { fetchLeads(); }, []);

  const fetchLeads = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("visitor_leads")
      .select("*")
      .order("created_at", { ascending: false });

console.log("Leads Data:", data);
console.log("Leads Error:", error);
    if (!error && data) setLeads(data);
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this lead? This cannot be undone.")) return;
    setDeleting(id);
    const { error } = await supabase.from("visitor_leads").delete().eq("id", id);
    if (!error) {
      setLeads(prev => prev.filter(l => l.id !== id));
    } else {
      alert("Delete failed: " + error.message);
    }
    setDeleting(null);
  };

  const copyPhone = (phone: string, id: string) => {
    navigator.clipboard.writeText(phone);
    setCopied(id);
    setTimeout(() => setCopied(null), 1500);
  };

  const exportCSV = () => {
    const rows = [
      ["Name", "Phone", "Email", "City", "Interested In", "Date"],
      ...leads.map(l => [
        l.name, l.phone, l.email || "", l.city || "",
        l.interest || "", new Date(l.created_at).toLocaleString("en-IN"),
      ]),
    ];
    const csv  = rows.map(r => r.map(v => `"${v}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement("a");
    a.href = url; a.download = `sippy-leads-${Date.now()}.csv`; a.click();
    URL.revokeObjectURL(url);
  };

  const filtered = leads.filter(l => {
    const q = search.toLowerCase();
    return (
      l.name.toLowerCase().includes(q)           ||
      l.phone.includes(q)                        ||
      (l.email    || "").toLowerCase().includes(q) ||
      (l.city     || "").toLowerCase().includes(q) ||
      (l.interest || "").toLowerCase().includes(q)
    );
  });
  const loadFunnelSetting = async () => {
  const enabled = await getFunnelSetting();
  setFunnelEnabled(enabled);
};
useEffect(() => {
  fetchLeads();
  loadFunnelSetting();
}, []);

const handleToggleFunnel = async () => {
  setSavingFunnel(true);

  const success = await updateFunnelSetting(!funnelEnabled);

  if (success) {
    setFunnelEnabled(!funnelEnabled);
  }

  setSavingFunnel(false);
};

  return (
    <AdminLayout title="Visitor Leads">
         <Button 
          variant="outline" 
          onClick={() => navigate("/admin")}
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>

        <div
  style={{
    background: "#fff",
    border: "1px solid #e5e7eb",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  }}
>
  <div>
    <h3
      style={{
        margin: 0,
        fontSize: 16,
        fontWeight: 700,
      }}
    >
      Lead Funnel
    </h3>

    <p
      style={{
        margin: "4px 0 0",
        fontSize: 13,
        color: "#6b7280",
      }}
    >
      Enable or disable lead capture popup on property pages.
    </p>
  </div>

  <Button
    onClick={handleToggleFunnel}
    disabled={savingFunnel}
    variant={funnelEnabled ? "destructive" : "default"}
  >
    {savingFunnel
      ? "Saving..."
      : funnelEnabled
      ? "Disable Funnel"
      : "Enable Funnel"}
  </Button>
</div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>

      <div style={{ maxWidth: 960, margin: "0 auto", paddingBottom: 60 }}>

        {/* ── Header ── */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between",
          flexWrap: "wrap", gap: 12, marginBottom: 24 }}>
          <div>
            <h2 style={{ fontSize: 20, fontWeight: 800, color: "#111827", margin: 0 }}>
              Visitor Leads
              <span style={{
                marginLeft: 10, background: "#fef9c3", color: "#854d0e",
                fontSize: 12, fontWeight: 700, padding: "3px 10px", borderRadius: 100,
              }}>{leads.length} total</span>
            </h2>
            <p style={{ fontSize: 13, color: "#6b7280", margin: "4px 0 0" }}>
              People who registered interest in your properties
            </p>
          </div>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {/* Search */}
            <div style={{ position: "relative" }}>
              <span style={{ position: "absolute", left: 11, top: "50%",
                transform: "translateY(-50%)", fontSize: 13 }}>🔍</span>
              <input
                placeholder="Search name, phone, city…"
                value={search} onChange={e => setSearch(e.target.value)}
                style={{
                  paddingLeft: 32, paddingRight: 14, height: 38,
                  border: "1.5px solid #e5e7eb", borderRadius: 9,
                  fontSize: 13, outline: "none", width: 220,
                  fontFamily: "inherit", color: "#374151",
                }}
              />
            </div>
            <button onClick={exportCSV} style={{
              display: "flex", alignItems: "center", gap: 6,
              background: "#f0fdf4", border: "1.5px solid #86efac",
              color: "#15803d", padding: "0 16px", height: 38,
              borderRadius: 9, fontSize: 13, fontWeight: 700,
              cursor: "pointer", fontFamily: "inherit",
            }}>⬇ Export CSV</button>
            <button onClick={fetchLeads} style={{
              background: "#f9fafb", border: "1.5px solid #e5e7eb",
              color: "#374151", padding: "0 14px", height: 38,
              borderRadius: 9, fontSize: 13, fontWeight: 600,
              cursor: "pointer", fontFamily: "inherit",
            }}>↺ Refresh</button>
          </div>
        </div>

        {/* ── Stats ── */}
        {leads.length > 0 && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginBottom: 24 }}>
            {[
              { label: "Total Leads", value: leads.length, icon: "", bg: "#eff6ff", color: "#1d4ed8" },
              { label: "With Email",  value: leads.filter(l => l.email).length, icon: "", bg: "#f0fdf4", color: "#15803d" },
              { label: "Today",
                value: leads.filter(l => new Date(l.created_at).toDateString() === new Date().toDateString()).length,
                icon: "", bg: "#fef9c3", color: "#854d0e" },
            ].map(s => (
              <div key={s.label} style={{
                background: s.bg, borderRadius: 14, padding: "16px 18px",
                display: "flex", alignItems: "center", gap: 12,
              }}>
                <span style={{ fontSize: 26 }}>{s.icon}</span>
                <div>
                  <div style={{ fontSize: 22, fontWeight: 800, color: s.color }}>{s.value}</div>
                  <div style={{ fontSize: 12, color: "#6b7280", fontWeight: 600 }}>{s.label}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── Lead cards ── */}
        {loading ? (
          <div style={{ textAlign: "center", padding: "60px 0", color: "#9ca3af" }}>
            <div style={{
              width: 36, height: 36, margin: "0 auto 12px",
              border: "3px solid #e5e7eb", borderTopColor: "#C9A84C",
              borderRadius: "50%", animation: "spin .7s linear infinite",
            }} />
            Loading leads…
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 0", color: "#9ca3af" }}>
            <div style={{ fontSize: 40, marginBottom: 10 }}>📭</div>
            <p style={{ fontWeight: 700, color: "#374151", margin: "0 0 4px" }}>
              {search ? "No leads match your search" : "No leads yet"}
            </p>
            <p style={{ fontSize: 13, margin: 0 }}>
              {search ? "Try a different term" : "Leads appear here when visitors register interest"}
            </p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {filtered.map(lead => (
              <div key={lead.id} style={{
                display: "flex", alignItems: "center", gap: 14,
                padding: "16px 20px", background: "#fff",
                border: "1px solid #f3f4f6", borderRadius: 14,
                boxShadow: "0 2px 8px rgba(0,0,0,.05)",
                transition: "box-shadow .2s",
                opacity: deleting === lead.id ? 0.5 : 1,
              }}
                onMouseEnter={e => (e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,.09)")}
                onMouseLeave={e => (e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,.05)")}
              >
                {/* Avatar */}
                <div style={{
                  width: 46, height: 46, borderRadius: "50%", flexShrink: 0,
                  background: "linear-gradient(135deg,#C9A84C,#e8c96d)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 18, fontWeight: 800, color: "#7a5c1e",
                }}>
                  {lead.name.charAt(0).toUpperCase()}
                </div>

                {/* Info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                    <span style={{ fontWeight: 800, fontSize: 15, color: "#111827" }}>{lead.name}</span>
                    {lead.city && (
                      <span style={{
                        background: "#f3f4f6", color: "#6b7280",
                        fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 100,
                      }}> {lead.city}</span>
                    )}
                    {lead.interest && (
                      <span style={{
                        background: "#fef9c3", color: "#854d0e",
                        fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 100,
                        maxWidth: 240, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                      }}> {lead.interest}</span>
                    )}
                  </div>
                  <div style={{ display: "flex", gap: 16, marginTop: 4, flexWrap: "wrap" }}>
                    <span style={{ fontSize: 13, color: "#374151" }}>📞 {lead.phone}</span>
                    {lead.email && <span style={{ fontSize: 13, color: "#374151" }}>✉️ {lead.email}</span>}
                  </div>
                  <div style={{ fontSize: 11, color: "#9ca3af", marginTop: 3 }}>
                    {new Date(lead.created_at).toLocaleString("en-IN", {
                      day: "numeric", month: "short", year: "numeric",
                      hour: "2-digit", minute: "2-digit",
                    })}
                  </div>
                </div>

                {/* Actions */}
                <div style={{ display: "flex", gap: 8, flexShrink: 0, flexWrap: "wrap" }}>
                  <button onClick={() => copyPhone(lead.phone, lead.id)} style={{
                    padding: "7px 13px", borderRadius: 8,
                    border: "1.5px solid #e5e7eb", background: "#f9fafb",
                    color: "#374151", fontSize: 12, fontWeight: 600,
                    cursor: "pointer", fontFamily: "inherit",
                  }}>
                    {copied === lead.id ? "✓ Copied" : "📋 Copy"}
                  </button>

                  {/* Delete */}
                  <button
                    onClick={() => handleDelete(lead.id)}
                    disabled={deleting === lead.id}
                    style={{
                      padding: "7px 13px", borderRadius: 8,
                      border: "1.5px solid #fca5a5", background: "#fef2f2",
                      color: "#b91c1c", fontSize: 12, fontWeight: 700,
                      cursor: deleting === lead.id ? "not-allowed" : "pointer",
                      fontFamily: "inherit",
                    }}
                  >
                    {deleting === lead.id ? "…" : "🗑 Delete"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default VisitorLeads;


