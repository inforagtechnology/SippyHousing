// import { useEffect, useState } from "react";
// import { supabase } from "@/lib/supabase";

// const WebsiteSettings = () => {
//     const [loading, setLoading] = useState(false);

//     const [settings, setSettings] = useState({
//         company_name: "",
//         company_email: "",
//         company_phone: "",
//         company_address: "",
//         facebook_url: "",
//         instagram_url: "",
//         linkedin_url: "",
//         youtube_url: "",
//         footer_copyright: "",
//         logo_url: "",
//         favicon_url: "",
//     });

//     useEffect(() => {
//         fetchSettings();
//     }, []);

//     const fetchSettings = async () => {
//         const { data, error } = await supabase
//             .from("website_settings")
//             .select("*")
//             .eq("id", 1)
//             .single();

//         if (!error && data) {
//             setSettings(data);
//         }
//     };
//     const handleChange = (
//         e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//     ) => {
//         setSettings({
//             ...settings,
//             [e.target.name]: e.target.value,
//         });
//     };
//     const handleChange = (
//         e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//     ) => {
//         setSettings({
//             ...settings,
//             [e.target.name]: e.target.value,
//         });
//     };
//     const handleSubmit = async (
//         e: React.FormEvent
//     ) => {
//         e.preventDefault();

//         setLoading(true);

//         const { error } = await supabase
//             .from("website_settings")
//             .update(settings)
//             .eq("id", 1);

//         if (error) {
//             alert(error.message);
//         } else {
//             alert("Settings Updated");
//         }

//         setLoading(false);
//     };
//     return (
//         <div className="max-w-5xl mx-auto p-6">

//             <h1 className="text-3xl font-bold mb-6">
//                 Website Settings
//             </h1>

//             <form
//                 onSubmit={handleSubmit}
//                 className="space-y-6"
//             >
//             <div className="grid md:grid-cols-2 gap-4">

//                 <input
//                     name="company_name"
//                     value={settings.company_name}
//                     onChange={handleChange}
//                     placeholder="Company Name"
//                     className="border p-3 rounded-lg"
//                 />

//                 <input
//                     name="company_email"
//                     value={settings.company_email}
//                     onChange={handleChange}
//                     placeholder="Company Email"
//                     className="border p-3 rounded-lg"
//                 />

//                 <input
//                     name="company_phone"
//                     value={settings.company_phone}
//                     onChange={handleChange}
//                     placeholder="Phone Number"
//                     className="border p-3 rounded-lg"
//                 />

//             </div>


//             <textarea
//                 name="company_address"
//                 value={settings.company_address}
//                 onChange={handleChange}
//                 placeholder="Company Address"
//                 className="border p-3 rounded-lg w-full"
//             />

//             <div className="grid md:grid-cols-2 gap-4">

//                 <input
//                     name="facebook_url"
//                     value={settings.facebook_url}
//                     onChange={handleChange}
//                     placeholder="Facebook URL"
//                     className="border p-3 rounded-lg"
//                 />

//                 <input
//                     name="instagram_url"
//                     value={settings.instagram_url}
//                     onChange={handleChange}
//                     placeholder="Instagram URL"
//                     className="border p-3 rounded-lg"
//                 />

//                 <input
//                     name="linkedin_url"
//                     value={settings.linkedin_url}
//                     onChange={handleChange}
//                     placeholder="LinkedIn URL"
//                     className="border p-3 rounded-lg"
//                 />

//                 <input
//                     name="youtube_url"
//                     value={settings.youtube_url}
//                     onChange={handleChange}
//                     placeholder="YouTube URL"
//                     className="border p-3 rounded-lg"
//                 />

//             </div>
//             <button
//                 type="submit"
//                 disabled={loading}
//                 className="bg-blue-600 text-white px-6 py-3 rounded-lg"
//             >
//                 {loading ? "Saving..." : "Save Settings"}
//             </button>

//         </form>
//     </div >
//   );
// };

// export default WebsiteSettings;

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import AdminLayout from "@/components/layout/AdminLayout";
import { Plus, Trash2,   ArrowLeft, } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface QuickLink {
  label: string;
  url: string;
}

interface Settings {
  company_name: string;
  company_email: string;
  company_phone: string;
  company_address: string;
  facebook_url: string;
  instagram_url: string;
  linkedin_url: string;
  youtube_url: string;
   twitter_url:string, 
  footer_copyright: string;
  logo_url: string;
  favicon_url: string;
  quick_links: QuickLink[];
}

const EMPTY_SETTINGS: Settings = {
  company_name: "",
  company_email: "",
  company_phone: "",
  company_address: "",
  facebook_url: "",
  instagram_url: "",
  linkedin_url: "",
  youtube_url: "",
  twitter_url:"", 
  footer_copyright: "",
  logo_url: "",
  favicon_url: "",
  quick_links: [],
};

const WebsiteSettings = () => {
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);
  const [settings, setSettings] = useState<Settings>(EMPTY_SETTINGS);
 const navigate = useNavigate();
  const showToast = (msg: string, type: "success" | "error" = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    setFetching(true);
    const { data, error } = await supabase
      .from("website_settings")
      .select("*")
      .eq("id", 1)
      .single();

    if (!error && data) {
      setSettings({
        ...EMPTY_SETTINGS,
        ...data,
        // quick_links comes back from Postgres as JSON; guard against null/non-array
        quick_links: Array.isArray(data.quick_links) ? data.quick_links : [],
      });
    } else if (error) {
      showToast("Failed to load settings: " + error.message, "error");
    }
    setFetching(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSettings((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  /* ── Quick links helpers ── */
  const updateQuickLink = (index: number, field: keyof QuickLink, value: string) => {
    setSettings((prev) => {
      const next = [...prev.quick_links];
      next[index] = { ...next[index], [field]: value };
      return { ...prev, quick_links: next };
    });
  };

  const addQuickLink = () => {
    setSettings((prev) => ({
      ...prev,
      quick_links: [...prev.quick_links, { label: "", url: "" }],
    }));
  };

  const removeQuickLink = (index: number) => {
    setSettings((prev) => ({
      ...prev,
      quick_links: prev.quick_links.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Drop empty quick links before saving so the footer doesn't render blanks.
    const cleanedLinks = settings.quick_links.filter(
      (l) => l.label.trim() && l.url.trim()
    );

    const { error } = await supabase
      .from("website_settings")
      .update({ ...settings, quick_links: cleanedLinks })
      .eq("id", 1);

    if (error) {
      showToast("Save failed: " + error.message, "error");
    } else {
      showToast("Settings updated.");
      setSettings((prev) => ({ ...prev, quick_links: cleanedLinks }));
    }
    setLoading(false);
  };

  return (
    <AdminLayout title="Website Settings">
       <Button 
          variant="outline" 
          onClick={() => navigate("/admin")}
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>
      {toast && (
        <div
          className={`fixed top-6 right-6 z-50 px-5 py-3 rounded-lg shadow-lg text-white text-sm font-medium transition-all ${
            toast.type === "success" ? "bg-green-600" : "bg-red-600"
          }`}
        >
          {toast.type === "success" ? "✓ " : "✕ "}
          {toast.msg}
        </div>
      )}

      <div className="max-w-5xl">
        <p className="text-gray-600 mb-6">
          Update the contact details, social links, and footer quick links shown across the site.
        </p>

        {fetching ? (
          <div className="text-center py-16 text-gray-400 text-sm">Loading…</div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8">

            {/* ── Company info ── */}
            <section className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">Company Info</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  name="company_name"
                  value={settings.company_name}
                  onChange={handleChange}
                  placeholder="Company Name"
                  className="border p-3 rounded-lg"
                />
                <input
                  name="company_email"
                  value={settings.company_email}
                  onChange={handleChange}
                  placeholder="Company Email"
                  className="border p-3 rounded-lg"
                />
                <input
                  name="company_phone"
                  value={settings.company_phone}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  className="border p-3 rounded-lg"
                />
                <input
                  name="footer_copyright"
                  value={settings.footer_copyright}
                  onChange={handleChange}
                  placeholder="Footer copyright text (e.g. © 2026 Sippy Housing)"
                  className="border p-3 rounded-lg"
                />
              </div>
              <textarea
                name="company_address"
                value={settings.company_address}
                onChange={handleChange}
                placeholder="Company Address"
                rows={3}
                className="border p-3 rounded-lg w-full mt-4"
              />
            </section>

            {/* ── Social links ── */}
            <section className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">Social Links</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  name="facebook_url"
                  value={settings.facebook_url}
                  onChange={handleChange}
                  placeholder="Facebook URL"
                  className="border p-3 rounded-lg"
                />
                <input
                  name="instagram_url"
                  value={settings.instagram_url}
                  onChange={handleChange}
                  placeholder="Instagram URL"
                  className="border p-3 rounded-lg"
                />
                <input
                  name="linkedin_url"
                  value={settings.linkedin_url}
                  onChange={handleChange}
                  placeholder="LinkedIn URL"
                  className="border p-3 rounded-lg"
                />
                <input
                  name="youtube_url"
                  value={settings.youtube_url}
                  onChange={handleChange}
                  placeholder="YouTube URL"
                  className="border p-3 rounded-lg"
                />
                 <input
                  name="twitter_url"
                  value={settings.twitter_url}
                  onChange={handleChange}
                  placeholder="Twitter URL"
                  className="border p-3 rounded-lg"
                />
              </div>
            </section>

            {/* ── Branding ── */}
            <section className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">Branding</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  name="logo_url"
                  value={settings.logo_url}
                  onChange={handleChange}
                  placeholder="Logo URL"
                  className="border p-3 rounded-lg"
                />
                <input
                  name="favicon_url"
                  value={settings.favicon_url}
                  onChange={handleChange}
                  placeholder="Favicon URL"
                  className="border p-3 rounded-lg"
                />
              </div>
            </section>

            {/* ── Quick links ── */}
            <section className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Footer Quick Links</h2>
                <button
                  type="button"
                  onClick={addQuickLink}
                  className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  <Plus className="h-4 w-4" /> Add link
                </button>
              </div>

              {settings.quick_links.length === 0 ? (
                <p className="text-sm text-gray-400">
                  No quick links yet. Click "Add link" to create one (e.g. About Us → /about).
                </p>
              ) : (
                <div className="space-y-3">
                  {settings.quick_links.map((link, i) => (
                    <div key={i} className="flex gap-3 items-center">
                      <input
                        value={link.label}
                        onChange={(e) => updateQuickLink(i, "label", e.target.value)}
                        placeholder="Label (e.g. About Us)"
                        className="border p-2.5 rounded-lg flex-1"
                      />
                      <input
                        value={link.url}
                        onChange={(e) => updateQuickLink(i, "url", e.target.value)}
                        placeholder="URL (e.g. /about or /#contact)"
                        className="border p-2.5 rounded-lg flex-1"
                      />
                      <button
                        type="button"
                        onClick={() => removeQuickLink(i)}
                        className="text-red-500 hover:text-red-600 p-2"
                        aria-label="Remove link"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </section>

            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Saving..." : "Save Settings"}
            </button>
          </form>
        )}
      </div>
    </AdminLayout>
  );
};

export default WebsiteSettings;





