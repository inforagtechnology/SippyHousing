// import { useState } from "react";
// import AdminLayout from "@/components/layout/AdminLayout";
// import { supabase } from "@/lib/supabase";

// const TeamManagement = () => {

//   const [formData, setFormData] = useState({
//     name: "",
//     designation: "",
//     description: "",
//   });
//   const [imageFile, setImageFile] = useState(null);
//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//   const {
//     data: { user },
//   } = await supabase.auth.getUser();

//   console.log("Current User:", user);

//     try {
//       let imageUrl = "";

//       if (imageFile) {
//         const fileName = `${Date.now()}-${imageFile.name}`;

//         const { error: uploadError } = await supabase.storage
//           .from("team-members")
//           .upload(fileName, imageFile);

//         // if (uploadError) {
//         //   console.log(uploadError);
//         //   alert("Image upload failed");
//         //   return;
//         // }
//         if (uploadError) {
//   console.log("UPLOAD ERROR:", uploadError);
//   alert(uploadError.message);
//   return;
// }

//         const { data } = supabase.storage
//           .from("team-members")
//           .getPublicUrl(fileName);

//         imageUrl = data.publicUrl;
//       }

//       const { error } = await supabase
//         .from("team_members")
//         .insert([
//           {
//             name: formData.name,
//             designation: formData.designation,
//             description: formData.description,
//             image: imageUrl,
//           },
//         ]);

//       if (error) {
//         console.log(error);
//         alert("Error adding member");
//         return;
//       }

//       alert("Team member added successfully");

//       setFormData({
//         name: "",
//         designation: "",
//         description: "",
//       });

//       setImageFile(null);

//     } catch (err) {
//       console.log(err);
//       alert("Something went wrong");
//     }
//   };
//   return (
//     <AdminLayout title="Team Management">

//       <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow">

//         <h2 className="text-2xl font-bold mb-6">
//           Add Team Member
//         </h2>

//         <form onSubmit={handleSubmit} className="space-y-4">
         
//           <input
//             type="text"
//             name="name"
//             placeholder="Name"
//             value={formData.name}
//             onChange={handleChange}
//             className="w-full border p-3 rounded"
//           />

//           <input
//             type="text"
//             name="designation"
//             placeholder="Designation"
//             value={formData.designation}
//             onChange={handleChange}
//             className="w-full border p-3 rounded"
//           />

//           {/* <input
//             type="text"
//             name="image"
//             placeholder="/Team/image.avif"
//             value={formData.image}
//             onChange={handleChange}
//             className="w-full border p-3 rounded"
//           /> */}
//           <input
//             type="file"
//             accept="image/*"
//             onChange={(e) => setImageFile(e.target.files[0])}
//             className="w-full border p-3 rounded"
//           />
           
//           <textarea
//             name="description"
//             placeholder="Description"
//             value={formData.description}
//             onChange={handleChange}
//             className="w-full border p-3 rounded h-32"
//           />

//           <button
//             type="submit"
//             className="bg-blue-600 text-black px-6 py-3 rounded"
//           >
//             Add Member
//           </button>

//         </form>

//       </div>

//     </AdminLayout>
//   );
// };

// export default TeamManagement;


// import { useState, useEffect } from "react";
// import AdminLayout from "@/components/layout/AdminLayout";
// import { supabase } from "@/lib/supabase";

// const TeamManagement = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     designation: "",
//     description: "",
//   });

//   const [imageFile, setImageFile] = useState(null);
//   const [members, setMembers] = useState([]);
//   const [editingMember, setEditingMember] = useState(null);

//   const fetchMembers = async () => {
//     const { data, error } = await supabase
//       .from("team_members")
//       .select("*")
//       .order("id", { ascending: false });

//     if (!error) {
//       setMembers(data);
//     }
//   };

//   useEffect(() => {
//     fetchMembers();
//   }, []);

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleDelete = async (id) => {
//     const confirmDelete = window.confirm(
//       "Are you sure you want to delete this member?"
//     );

//     if (!confirmDelete) return;

//     const { error } = await supabase
//       .from("team_members")
//       .delete()
//       .eq("id", id);

//     if (error) {
//       console.log(error);
//       alert("Delete failed");
//       return;
//     }

//     alert("Member deleted successfully");
//     fetchMembers();
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//      const {
//   data: { user },
// } = await supabase.auth.getUser();

// console.log("Current User:", user);
//     try {
//       let imageUrl = "";

//       if (imageFile) {
//         const fileName = `${Date.now()}-${imageFile.name}`;

//         const { error: uploadError } = await supabase.storage
//           .from("team-members")
//           .upload(fileName, imageFile);

//         if (uploadError) {
//           console.log("upload error:",uploadError);
//           alert(uploadError.message);
//           return;
//         }

//         const { data } = supabase.storage
//           .from("TEAM-MEMBERS")
//           .getPublicUrl(fileName);

//         imageUrl = data.publicUrl;
//       }

//       let error;

//       if (editingMember) {
//         const result = await supabase
//           .from("team_members")
//           .update({
//             name: formData.name,
//             designation: formData.designation,
//             description: formData.description,
//             ...(imageUrl && { image: imageUrl }),
//           })
//           .eq("id", editingMember.id);

//         error = result.error;
//       } else {
//         const result = await supabase
//           .from("team_members")
//           .insert([
//             {
//               name: formData.name,
//               designation: formData.designation,
//               description: formData.description,
//               image: imageUrl,
//             },
//           ]);

//         error = result.error;
//       }

//       if (error) {
//         console.log(error);
//         alert("Operation failed");
//         return;
//       }

//       alert(
//         editingMember
//           ? "Team member updated successfully"
//           : "Team member added successfully"
//       );

//       setFormData({
//         name: "",
//         designation: "",
//         description: "",
//       });

//       setImageFile(null);
//       setEditingMember(null);

//       fetchMembers();
//     } catch (err) {
//       console.log(err);
//       alert("Something went wrong");
//     }
//   };

//   return (
//     <AdminLayout title="Team Management">
//       <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow">
//         <h2 className="text-2xl font-bold mb-6">
//           {editingMember ? "Edit Team Member" : "Add Team Member"}
//         </h2>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <input
//             type="text"
//             name="name"
//             placeholder="Name"
//             value={formData.name}
//             onChange={handleChange}
//             className="w-full border p-3 rounded"
//             required
//           />

//           <input
//             type="text"
//             name="designation"
//             placeholder="Designation"
//             value={formData.designation}
//             onChange={handleChange}
//             className="w-full border p-3 rounded"
//             required
//           />

//           <input
//             type="file"
//             accept="image/*"
//             onChange={(e) => setImageFile(e.target.files[0])}
//             className="w-full border p-3 rounded"
//           />

//           <textarea
//             name="description"
//             placeholder="Description"
//             value={formData.description}
//             onChange={handleChange}
//             className="w-full border p-3 rounded h-32"
//           />

//           <button
//             type="submit"
//             className="bg-blue-600 text-white px-6 py-3 rounded"
//           >
//             {editingMember ? "Update Member" : "Add Member"}
//           </button>
//         </form>

//         <div className="mt-10">
//           <h2 className="text-xl font-bold mb-4">
//             Team Members
//           </h2>

//           {members.length === 0 ? (
//             <p>No team members found.</p>
//           ) : (
//             members.map((member) => (
//               <div
//                 key={member.id}
//                 className="border rounded p-4 mb-4 flex justify-between items-center"
//               >
//                 <div className="flex items-center gap-4">
//                   <img
//                     src={member.image}
//                     alt={member.name}
//                     className="w-16 h-16 object-cover rounded"
//                   />

//                   <div>
//                     <h3 className="font-bold">{member.name}</h3>
//                     <p>{member.designation}</p>
//                   </div>
//                 </div>

//                 <div className="flex gap-2">
//                   <button
//                     className="bg-yellow-500 text-white px-3 py-1 rounded"
//                     onClick={() => {
//                       setEditingMember(member);

//                       setFormData({
//                         name: member.name,
//                         designation: member.designation,
//                         description: member.description,
//                       });
//                     }}
//                   >
//                     Edit
//                   </button>

//                   <button
//                     className="bg-red-500 text-white px-3 py-1 rounded"
//                     onClick={() => handleDelete(member.id)}
//                   >
//                     Delete
//                   </button>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>
//       </div>
//     </AdminLayout>
//   );
// };

// export default TeamManagement;



import { useState, useEffect } from "react";
import AdminLayout from "@/components/layout/AdminLayout";
import { supabase } from "@/lib/supabase";
import { useNavigate } from "react-router-dom";
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
/* ─────────────────────────────────────────────
   CONSTANTS
───────────────────────────────────────────── */
 
const TABS = [
  { id: "team",    label: "Team Management", icon: "👥", color: "#6366f1" },
  { id: "award",   label: "Awards",          icon: "🏆", color: "#f59e0b" },
  { id: "partner", label: "Partners",        icon: "🤝", color: "#10b981" },
];

const BUCKET = "team-members"; // must match exactly what you created in Supabase Storage

const DB_TABLE = {
  team:    "team_members",
  award:   "awards",
  partner: "partners",
};

const EMPTY = {
  team:    { name: "", designation: "", description: "" },
  award:   { title: "", organization: "", year: "", description: "" },
  partner: { name: "", website: "", description: "" },
};

/* ─────────────────────────────────────────────
   IMAGE UPLOAD  — uses authenticated session
   The RLS error happens because the upload
   request reaches Supabase without a valid
   JWT.  We verify the session FIRST and attach
   it; Supabase SDK v2 does this automatically
   if the user is signed-in, but we make it
   explicit here so the error surfaces clearly.
───────────────────────────────────────────── */
const uploadImage = async (file, folder = "general") => {
  /* 1. Confirm the user is authenticated */
  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();

  if (sessionError || !session) {
    throw new Error(
      "You must be logged in to upload images. Please sign in and try again."
    );
  }

  /* 2. Validate file */
  if (!file.type.startsWith("image/")) {
    throw new Error("Please select a valid image file (PNG, JPG, WEBP).");
  }
  if (file.size > 5 * 1024 * 1024) {
    throw new Error("Image must be under 5 MB.");
  }

  /* 3. Build a unique path */
  const ext      = file.name.split(".").pop().toLowerCase();
  const fileName = `${folder}/${Date.now()}-${Math.random()
    .toString(36)
    .slice(2)}.${ext}`;

  /* 4. Upload — SDK automatically attaches the JWT from the active session */
  const { error: uploadError } = await supabase.storage
    .from(BUCKET)
    .upload(fileName, file, {
      cacheControl: "3600",
      upsert: false,
      // contentType is inferred from the File object automatically
    });

  if (uploadError) {
    /* Surface the real Supabase message */
    if (uploadError.message.toLowerCase().includes("row-level security") ||
        uploadError.message.toLowerCase().includes("policy")) {
      throw new Error(
        "Storage permission denied. Run the SQL fix in Supabase → SQL Editor (see console for details)."
      );
    }
    throw new Error(uploadError.message);
  }

  /* 5. Get public URL — bucket name MUST match exactly (case-sensitive) */
  const { data } = supabase.storage.from(BUCKET).getPublicUrl(fileName);
  return data.publicUrl;
};

/* ─────────────────────────────────────────────
   SHARED INPUT COMPONENTS
───────────────────────────────────────────── */
const Field = ({ label, required, hint, children }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
    <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display:"flex", alignItems:"center", gap:4 }}>
      {label}
      {required && <span style={{ color: "#ef4444" }}>*</span>}
      {hint && <span style={{ fontSize:11, color:"#9ca3af", fontWeight:400, marginLeft:4 }}>{hint}</span>}
    </label>
    {children}
  </div>
);

const baseInput = {
  width:"100%", padding:"10px 14px", borderRadius:10,
  border:"1.5px solid #e5e7eb", fontSize:14, outline:"none",
  fontFamily:"inherit", color:"#111827", background:"#fff",
  transition:"border-color .2s, box-shadow .2s",
};
const focusedBorder = { borderColor:"#6366f1", boxShadow:"0 0 0 3px rgba(99,102,241,.12)" };

const Input = (props) => {
  const [f, setF] = useState(false);
  return <input {...props} style={{...baseInput,...(f?focusedBorder:{}),...(props.style||{})}}
    onFocus={()=>setF(true)} onBlur={()=>setF(false)} />;
};
const Textarea = (props) => {
  const [f, setF] = useState(false);
  return <textarea {...props} style={{...baseInput,minHeight:90,resize:"vertical",paddingTop:10,
    ...(f?focusedBorder:{}),...(props.style||{})}} onFocus={()=>setF(true)} onBlur={()=>setF(false)} />;
};

/* ─────────────────────────────────────────────
   FILE UPLOAD ZONE
───────────────────────────────────────────── */

const FileZone = ({ file, onChange, existingUrl, label }) => {
  const [drag, setDrag] = useState(false);
  const preview = file ? URL.createObjectURL(file) : existingUrl;

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
      onDragLeave={() => setDrag(false)}
      onDrop={(e) => {
        e.preventDefault(); setDrag(false);
        const f = e.dataTransfer.files[0];
        if (f?.type.startsWith("image/")) onChange(f);
      }}
      onClick={() => document.getElementById(`fz-${label}`).click()}
      style={{
        border:`2px dashed ${drag?"#6366f1":"#d1d5db"}`,
        borderRadius:12, padding:"20px 16px", background: drag?"#eef2ff":"#fafafa",
        cursor:"pointer", textAlign:"center", transition:"all .2s",
      }}
    >
      <input
        id={`fz-${label}`} type="file" accept="image/*"
        style={{ display:"none" }}
        onChange={(e) => { if(e.target.files[0]) onChange(e.target.files[0]); }}
      />
      {preview ? (
        <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:8 }}>
          <img src={preview} alt="preview"
            style={{ width:72, height:72, objectFit:"cover", borderRadius:10, border:"2px solid #e5e7eb" }} />
          <span style={{ fontSize:12, color:"#6b7280" }}>
            {file ? file.name : "Current image"} · Click to change
          </span>
        </div>
      ) : (
        <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:6 }}>
          <span style={{ fontSize:28 }}>📁</span>
          <span style={{ fontSize:13, fontWeight:600, color:"#374151" }}>{label}</span>
          <span style={{ fontSize:12, color:"#9ca3af" }}>Drag & drop or click to browse</span>
          <span style={{ fontSize:11, color:"#d1d5db" }}>PNG, JPG, WEBP — max 5 MB</span>
        </div>
      )}
    </div>
  );
};

/* ─────────────────────────────────────────────
   PER-TAB FORM FIELDS
───────────────────────────────────────────── */
const TeamForm = ({ fd, onChange, file, setFile, editing }) => (
  <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
    <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
      <Field label="Full Name" required>
        <Input name="name" placeholder="e.g. Alex Johnson" value={fd.name} onChange={onChange} required />
      </Field>
      <Field label="Designation" required>
        <Input name="designation" placeholder="e.g. Lead Developer" value={fd.designation} onChange={onChange} required />
      </Field>
    </div>
    <Field label="Profile Photo" hint={editing ? "(leave empty to keep current)" : ""}>
      <FileZone file={file} onChange={setFile} existingUrl={editing?.image} label="Upload Photo" />
    </Field>
    <Field label="Description">
      <Textarea name="description" placeholder="Brief bio…" value={fd.description} onChange={onChange} />
    </Field>
  </div>
);

const AwardForm = ({ fd, onChange, file, setFile, editing }) => (
  <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
    <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
      <Field label="Award Title" required>
        <Input name="title" placeholder="e.g. Best Startup 2024" value={fd.title} onChange={onChange} required />
      </Field>
      <Field label="Organization" required>
        <Input name="organization" placeholder="e.g. TechCrunch" value={fd.organization} onChange={onChange} required />
      </Field>
    </div>
    <Field label="Year" required>
      <Input name="year" type="number" placeholder="2024" value={fd.year} onChange={onChange} required style={{ maxWidth:180 }} />
    </Field>
    <Field label="Award Image / Certificate" hint={editing ? "(optional)" : ""}>
      <FileZone file={file} onChange={setFile} existingUrl={editing?.image} label="Upload Award Image" />
    </Field>
    <Field label="Description">
      <Textarea name="description" placeholder="What was this award for?" value={fd.description} onChange={onChange} />
    </Field>
  </div>
);

const PartnerForm = ({ fd, onChange, file, setFile, editing }) => (
  <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
    <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
      <Field label="Company Name" required>
        <Input name="name" placeholder="e.g. Google for Startups" value={fd.name} onChange={onChange} required />
      </Field>
      <Field label="Website URL">
        <Input name="website" type="url" placeholder="https://example.com" value={fd.website} onChange={onChange} />
      </Field>
    </div>
    <Field label="Partner Logo" hint={editing ? "(optional)" : ""}>
      <FileZone file={file} onChange={setFile} existingUrl={editing?.image} label="Upload Logo" />
    </Field>
    <Field label="Description">
      <Textarea name="description" placeholder="Partnership details…" value={fd.description} onChange={onChange} />
    </Field>
  </div>
);

/* ─────────────────────────────────────────────
   LIST ITEM CARD
───────────────────────────────────────────── */
const ItemCard = ({ item, tab, onEdit, onDelete }) => {
  const title   = item.name || item.title || "—";
  const sub     = item.designation || item.organization || item.website || "";
  return (
    <div style={{
      display:"flex", alignItems:"center", gap:14, padding:"14px 18px",
      background:"#fff", border:"1px solid #f3f4f6", borderRadius:12,
      boxShadow:"0 1px 4px rgba(0,0,0,.05)", transition:"box-shadow .2s",
    }}
      onMouseEnter={(e)=>e.currentTarget.style.boxShadow="0 4px 16px rgba(0,0,0,.09)"}
      onMouseLeave={(e)=>e.currentTarget.style.boxShadow="0 1px 4px rgba(0,0,0,.05)"}
    >
      {item.image ? (
        <img src={item.image} alt={title}
          style={{ width:52, height:52, objectFit:"cover", borderRadius: tab==="partner"?8:"50%",
            flexShrink:0, border:"2px solid #e5e7eb" }}
          onError={(e)=>{ e.target.style.display="none"; }}
        />
      ) : (
        <div style={{
          width:52, height:52, borderRadius: tab==="partner"?8:"50%",
          background:"linear-gradient(135deg,#6366f1,#8b5cf6)",
          display:"flex", alignItems:"center", justifyContent:"center",
          fontSize:20, color:"#fff", flexShrink:0, fontWeight:800,
        }}>
          {title.charAt(0).toUpperCase()}
        </div>
      )}
      <div style={{ flex:1, minWidth:0 }}>
        <div style={{ fontWeight:700, fontSize:14, color:"#111827",
          whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{title}</div>
        {sub && <div style={{ fontSize:12, color:"#6b7280", marginTop:2 }}>{sub}</div>}
        {tab==="award" && item.year && (
          <span style={{ display:"inline-block", marginTop:4, background:"#fef9c3",
            color:"#854d0e", fontSize:11, fontWeight:700, padding:"2px 8px", borderRadius:100 }}>
            {item.year}
          </span>
        )}
      </div>
      <div style={{ display:"flex", gap:8, flexShrink:0 }}>
        <button onClick={()=>onEdit(item)} style={{
          padding:"7px 14px", borderRadius:8, border:"1.5px solid #fbbf24",
          background:"#fffbeb", color:"#92400e", fontSize:13, fontWeight:600,
          cursor:"pointer", fontFamily:"inherit",
        }}>✏️ Edit</button>
        <button onClick={()=>onDelete(item.id)} style={{
          padding:"7px 14px", borderRadius:8, border:"1.5px solid #fca5a5",
          background:"#fef2f2", color:"#b91c1c", fontSize:13, fontWeight:600,
          cursor:"pointer", fontFamily:"inherit",
        }}>🗑️ Delete</button>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   SQL FIX MODAL
   Shown automatically when RLS error is detected
───────────────────────────────────────────── */
const SQL_FIX = `-- ① Enable RLS on each table (if not already)
ALTER TABLE team_members  ENABLE ROW LEVEL SECURITY;
ALTER TABLE awards        ENABLE ROW LEVEL SECURITY;
ALTER TABLE partners      ENABLE ROW LEVEL SECURITY;

-- ② Allow authenticated users full access to all three tables
CREATE POLICY "auth_all_team"    ON team_members  FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "auth_all_awards"  ON awards        FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "auth_all_partners"ON partners      FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- ③ Storage bucket: allow authenticated users to upload/read
INSERT INTO storage.buckets (id, name, public)
  VALUES ('team-members', 'team-members', true)
  ON CONFLICT (id) DO UPDATE SET public = true;

CREATE POLICY "auth_upload_team_members"
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'team-members');

CREATE POLICY "auth_read_team_members"
  ON storage.objects FOR SELECT TO authenticated
  USING (bucket_id = 'team-members');

CREATE POLICY "auth_delete_team_members"
  ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'team-members');

-- ④ Allow public read on the storage bucket (for displaying images)
CREATE POLICY "public_read_team_members"
  ON storage.objects FOR SELECT TO anon
  USING (bucket_id = 'team-members');`;

const SqlFixModal = ({ onClose }) => {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(SQL_FIX);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div style={{
      position:"fixed", inset:0, background:"rgba(0,0,0,.55)",
      display:"flex", alignItems:"center", justifyContent:"center",
      zIndex:9999, padding:16, backdropFilter:"blur(4px)",
    }}>
      <div style={{
        background:"#fff", borderRadius:20, width:"100%", maxWidth:680,
        maxHeight:"90vh", display:"flex", flexDirection:"column",
        boxShadow:"0 20px 60px rgba(0,0,0,.2)",
      }}>
        {/* Header */}
        <div style={{ padding:"20px 24px", borderBottom:"1px solid #f3f4f6",
          display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:12 }}>
          <div>
            <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:4 }}>
              <span style={{ fontSize:20 }}>🔐</span>
              <h3 style={{ fontSize:17, fontWeight:800, color:"#111827", margin:0 }}>
                Row-Level Security Policy Fix
              </h3>
            </div>
            <p style={{ fontSize:13, color:"#6b7280", margin:0 }}>
              Your Supabase tables/storage have RLS enabled but no policies allowing writes.
              Run the SQL below in <strong>Supabase → SQL Editor → New Query</strong>.
            </p>
          </div>
          <button onClick={onClose} style={{
            background:"none", border:"none", fontSize:20, cursor:"pointer",
            color:"#9ca3af", flexShrink:0, lineHeight:1,
          }}>✕</button>
        </div>

        {/* Steps */}
        <div style={{ padding:"16px 24px 0", display:"flex", flexDirection:"column", gap:8 }}>
          {[
            { n:"1", text:"Go to your Supabase project dashboard" },
            { n:"2", text:'Click "SQL Editor" in the left sidebar' },
            { n:"3", text:'Click "+ New query"' },
            { n:"4", text:"Paste the SQL below and click Run (▶)" },
          ].map(s=>(
            <div key={s.n} style={{ display:"flex", gap:10, alignItems:"flex-start" }}>
              <div style={{
                width:22, height:22, borderRadius:"50%", background:"#6366f1",
                color:"#fff", display:"flex", alignItems:"center", justifyContent:"center",
                fontSize:11, fontWeight:800, flexShrink:0,
              }}>{s.n}</div>
              <span style={{ fontSize:13, color:"#374151", paddingTop:2 }}>{s.text}</span>
            </div>
          ))}
        </div>

        {/* SQL block */}
        <div style={{ flex:1, overflowY:"auto", padding:"16px 24px" }}>
          <div style={{ position:"relative" }}>
            <pre style={{
              background:"#0f172a", color:"#e2e8f0", padding:"20px",
              borderRadius:12, fontSize:12, lineHeight:1.7, overflowX:"auto",
              margin:0, fontFamily:"'JetBrains Mono','Fira Code',monospace",
            }}>
              {SQL_FIX}
            </pre>
            <button onClick={copy} style={{
              position:"absolute", top:10, right:10,
              background: copied ? "#22c55e" : "rgba(255,255,255,.1)",
              border:"1px solid rgba(255,255,255,.15)",
              color:"#fff", padding:"5px 12px", borderRadius:7,
              fontSize:12, fontWeight:600, cursor:"pointer", fontFamily:"inherit",
              transition:"background .2s",
            }}>
              {copied ? "✓ Copied!" : "Copy SQL"}
            </button>
          </div>
        </div>

        {/* Footer */}
        <div style={{ padding:"14px 24px", borderTop:"1px solid #f3f4f6",
          display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:10 }}>
          <span style={{ fontSize:12, color:"#9ca3af" }}>
            After running the SQL, come back and try uploading again.
          </span>
          <button onClick={onClose} style={{
            background:"#6366f1", color:"#fff", border:"none",
            padding:"9px 22px", borderRadius:9, fontSize:13, fontWeight:700,
            cursor:"pointer", fontFamily:"inherit",
          }}>Got it — Close</button>
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */
const TeamManagement = () => {
  const [activeTab,    setActiveTab]    = useState("team");
  const [formData,     setFormData]     = useState(EMPTY.team);
  const [imageFile,    setImageFile]    = useState(null);
  const [editingItem,  setEditingItem]  = useState(null);
  const [items,        setItems]        = useState([]);
  const [loading,      setLoading]      = useState(false);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [toast,        setToast]        = useState(null);
  const [search,       setSearch]       = useState("");
  const [showSqlFix,   setShowSqlFix]   = useState(false);
  const navigate = useNavigate();
  const tab = TABS.find(t => t.id === activeTab);

  /* ── toast helper ────────────────────────── */
  const showToast = (msg, type="success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 4000);
  };

  /* ── reset form ──────────────────────────── */
  const resetForm = () => {
    setFormData(EMPTY[activeTab]);
    setImageFile(null);
    setEditingItem(null);
  };

  /* ── switch tab ──────────────────────────── */
  const switchTab = (id) => {
    setActiveTab(id);
    setFormData(EMPTY[id]);
    setImageFile(null);
    setEditingItem(null);
    setSearch("");
  };

  /* ── fetch items ─────────────────────────── */
  const fetchItems = async () => {
    setFetchLoading(true);
    const { data, error } = await supabase
      .from(DB_TABLE[activeTab])
      .select("*")
      .order("id", { ascending: false });
    if (!error) setItems(data || []);
    else showToast("Failed to load: " + error.message, "error");
    setFetchLoading(false);
  };

  useEffect(() => { fetchItems(); }, [activeTab]);

  /* ── form change ─────────────────────────── */
  const handleChange = (e) =>
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  /* ── start edit ──────────────────────────── */
  const startEdit = (item) => {
    setEditingItem(item);
    const filled = {};
    Object.keys(EMPTY[activeTab]).forEach(k => { filled[k] = item[k] ?? ""; });
    setFormData(filled);
    setImageFile(null);
    window.scrollTo({ top:0, behavior:"smooth" });
  };

  /* ── delete ──────────────────────────────── */
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this item? This cannot be undone.")) return;
    const { error } = await supabase.from(DB_TABLE[activeTab]).delete().eq("id", id);
    if (error) { showToast("Delete failed: " + error.message, "error"); return; }
    showToast("Deleted ✓");
    fetchItems();
  };

  /* ── submit ──────────────────────────────── */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = editingItem?.image ?? "";

      if (imageFile) {
        try {
          imageUrl = await uploadImage(imageFile, activeTab);
        } catch (uploadErr) {
          console.error("Upload error:", uploadErr);

          // Detect RLS policy error and show the SQL fix modal
          const msg = uploadErr.message || "";
          if (
            msg.toLowerCase().includes("row-level security") ||
            msg.toLowerCase().includes("policy") ||
            msg.toLowerCase().includes("permission") ||
            msg.toLowerCase().includes("unauthorized") ||
            msg.toLowerCase().includes("not allowed")
          ) {
            setShowSqlFix(true);
            showToast("Storage permission denied — see the SQL fix guide", "error");
          } else {
            showToast("Upload failed: " + msg, "error");
          }
          setLoading(false);
          return;
        }
      }

      const payload = { ...formData, ...(imageUrl ? { image: imageUrl } : {}) };

      let dbError;
      if (editingItem) {
        ({ error: dbError } = await supabase
          .from(DB_TABLE[activeTab])
          .update(payload)
          .eq("id", editingItem.id));
      } else {
        ({ error: dbError } = await supabase
          .from(DB_TABLE[activeTab])
          .insert([payload]));
      }

      if (dbError) {
        console.error("DB error:", dbError);
        const msg = dbError.message || "";
        if (msg.toLowerCase().includes("row-level security") || msg.toLowerCase().includes("policy")) {
          setShowSqlFix(true);
          showToast("Database permission denied — see the SQL fix guide", "error");
        } else {
          showToast("Save failed: " + msg, "error");
        }
        return;
      }

      showToast(editingItem ? "Updated successfully ✓" : "Added successfully ✓");
      resetForm();
      fetchItems();

    } catch (err) {
      console.error("Unexpected error:", err);
      showToast("Unexpected error: " + err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  /* ── filtered list ───────────────────────── */
  const filtered = items.filter(it => {
    const q = search.toLowerCase();
    return (
      (it.name||it.title||"").toLowerCase().includes(q) ||
      (it.designation||it.organization||it.website||"").toLowerCase().includes(q)
    );
  });

  /* ─────────────────────────────────────────
     RENDER
  ───────────────────────────────────────── */
  return (
    <AdminLayout title="Content Management">
  <Button 
          variant="outline" 
          onClick={() => navigate("/admin")}
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>
      {/* ── SQL Fix Modal ── */}
      {showSqlFix && <SqlFixModal onClose={() => setShowSqlFix(false)} />}

      {/* ── Toast ── */}
      {toast && (
        <div style={{
          position:"fixed", top:20, right:20, zIndex:9998,
          background: toast.type==="error" ? "#fef2f2" : "#f0fdf4",
          border:`1px solid ${toast.type==="error"?"#fca5a5":"#86efac"}`,
          color: toast.type==="error" ? "#b91c1c" : "#15803d",
          padding:"12px 18px", borderRadius:12,
          boxShadow:"0 8px 24px rgba(0,0,0,.12)",
          fontSize:14, fontWeight:600,
          display:"flex", alignItems:"center", gap:10, maxWidth:360,
          animation:"fadeInRight .3s ease",
        }}>
          <span style={{ fontSize:18 }}>{toast.type==="error"?"❌":"✅"}</span>
          <span style={{ flex:1 }}>{toast.msg}</span>
          {toast.type==="error" && (
            <button
              onClick={() => setShowSqlFix(true)}
              style={{
                background:"#ef4444", color:"#fff", border:"none",
                padding:"4px 10px", borderRadius:6, fontSize:11,
                fontWeight:700, cursor:"pointer", fontFamily:"inherit", whiteSpace:"nowrap",
              }}
            >View Fix</button>
          )}
        </div>
      )}

      <style>{`
        @keyframes fadeInRight { from{transform:translateX(40px);opacity:0} to{transform:translateX(0);opacity:1} }
        @keyframes spin        { to{transform:rotate(360deg)} }
        *{box-sizing:border-box}
      `}</style>

      <div style={{ maxWidth:900, margin:"0 auto", paddingBottom:60 }}>

        {/* ════ TAB SWITCHER ════ */}
        <div style={{
          display:"flex", gap:10, marginBottom:28,
          background:"#f9fafb", padding:8, borderRadius:16,
          border:"1px solid #e5e7eb",
        }}>
          {TABS.map(t => (
            <button key={t.id} onClick={() => switchTab(t.id)} style={{
              flex:1, display:"flex", alignItems:"center", justifyContent:"center",
              gap:8, padding:"12px 16px", borderRadius:12, border:"none",
              cursor:"pointer", fontFamily:"inherit", fontWeight:700, fontSize:14,
              transition:"all .2s",
              background: activeTab===t.id ? t.color : "transparent",
              color:      activeTab===t.id ? "#fff"  : "#6b7280",
              boxShadow:  activeTab===t.id ? `0 4px 14px ${t.color}55` : "none",
              transform:  activeTab===t.id ? "translateY(-1px)" : "none",
            }}>
              <span style={{ fontSize:18 }}>{t.icon}</span>
              {t.label}
            </button>
          ))}
        </div>

        {/* ════ FORM CARD ════ */}
        <div style={{
          background:"#fff", borderRadius:20,
          boxShadow:"0 4px 24px rgba(0,0,0,.07)",
          border:"1px solid #f3f4f6", overflow:"hidden", marginBottom:24,
        }}>
          {/* Card header */}
          <div style={{
            padding:"18px 28px",
            background:`linear-gradient(135deg,${tab.color}18,${tab.color}06)`,
            borderBottom:"1px solid #f3f4f6",
            display:"flex", alignItems:"center", justifyContent:"space-between",
          }}>
            <div style={{ display:"flex", alignItems:"center", gap:12 }}>
              <div style={{
                width:42, height:42, borderRadius:12, background:tab.color,
                display:"flex", alignItems:"center", justifyContent:"center", fontSize:20,
              }}>{tab.icon}</div>
              <div>
                <h2 style={{ fontSize:17, fontWeight:800, color:"#111827", margin:0 }}>
                  {editingItem
                    ? `Edit ${activeTab==="team"?"Team Member":activeTab==="award"?"Award":"Partner"}`
                    : `Add ${activeTab==="team"?"Team Member":activeTab==="award"?"Award":"Partner"}`}
                </h2>
                <p style={{ fontSize:12, color:"#9ca3af", margin:0 }}>
                  {editingItem ? "Update the details below" : "Fill in the form and click Add"}
                </p>
              </div>
            </div>
            <div style={{ display:"flex", gap:10, alignItems:"center" }}>
              {/* SQL fix button always visible */}
              {/* <button onClick={() => setShowSqlFix(true)} style={{
                display:"flex", alignItems:"center", gap:6,
                background:"#fef2f2", border:"1.5px solid #fca5a5",
                color:"#b91c1c", padding:"7px 14px", borderRadius:8,
                fontSize:12, fontWeight:700, cursor:"pointer", fontFamily:"inherit",
              }}>
                🔐 RLS Fix
              </button> */}
              {editingItem && (
                <button onClick={resetForm} style={{
                  background:"none", border:"1.5px solid #e5e7eb",
                  borderRadius:8, padding:"7px 14px", cursor:"pointer",
                  fontSize:13, color:"#6b7280", fontFamily:"inherit",
                }}>✕ Cancel</button>
              )}
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} style={{ padding:"28px" }}>
            {activeTab==="team" && (
              <TeamForm fd={formData} onChange={handleChange}
                file={imageFile} setFile={setImageFile} editing={editingItem} />
            )}
            {activeTab==="award" && (
              <AwardForm fd={formData} onChange={handleChange}
                file={imageFile} setFile={setImageFile} editing={editingItem} />
            )}
            {activeTab==="partner" && (
              <PartnerForm fd={formData} onChange={handleChange}
                file={imageFile} setFile={setImageFile} editing={editingItem} />
            )}

            <button type="submit" disabled={loading} style={{
              marginTop:22, width:"100%", height:50,
              background: loading ? "#9ca3af" : tab.color,
              color:"#fff", border:"none", borderRadius:12,
              fontSize:15, fontWeight:700,
              cursor: loading ? "not-allowed" : "pointer",
              display:"flex", alignItems:"center", justifyContent:"center", gap:10,
              fontFamily:"inherit", transition:"all .2s",
              boxShadow: loading ? "none" : `0 4px 16px ${tab.color}44`,
            }}>
              {loading ? (
                <>
                  <span style={{
                    width:18, height:18, border:"2px solid rgba(255,255,255,.4)",
                    borderTopColor:"#fff", borderRadius:"50%",
                    animation:"spin .6s linear infinite", display:"inline-block",
                  }} />
                  {editingItem ? "Updating…" : "Adding…"}
                </>
              ) : (
                `${editingItem?"✓ Update":"+ Add"} ${activeTab==="team"?"Member":activeTab==="award"?"Award":"Partner"}`
              )}
            </button>
          </form>
        </div>

        {/* ════ LIST CARD ════ */}
        <div style={{
          background:"#fff", borderRadius:20,
          boxShadow:"0 4px 24px rgba(0,0,0,.07)",
          border:"1px solid #f3f4f6", overflow:"hidden",
        }}>
          {/* List header */}
          <div style={{
            padding:"16px 24px", borderBottom:"1px solid #f3f4f6",
            display:"flex", alignItems:"center", justifyContent:"space-between",
            flexWrap:"wrap", gap:10,
          }}>
            <div style={{ display:"flex", alignItems:"center", gap:10 }}>
              <span style={{ fontSize:18 }}>{tab.icon}</span>
              <h3 style={{ fontSize:15, fontWeight:800, color:"#111827", margin:0 }}>
                {tab.label}
                <span style={{
                  marginLeft:8, background:`${tab.color}18`, color:tab.color,
                  fontSize:11, fontWeight:700, padding:"2px 8px", borderRadius:100,
                }}>{items.length}</span>
              </h3>
            </div>
            <div style={{ position:"relative" }}>
              <span style={{ position:"absolute", left:11, top:"50%", transform:"translateY(-50%)", fontSize:13 }}>🔍</span>
              <input
                placeholder="Search…" value={search}
                onChange={e => setSearch(e.target.value)}
                style={{
                  paddingLeft:32, paddingRight:14, height:36,
                  border:"1.5px solid #e5e7eb", borderRadius:9,
                  fontSize:13, outline:"none", width:200, fontFamily:"inherit", color:"#374151",
                }}
              />
            </div>
          </div>

          {/* List items */}
          <div style={{ padding:"16px 20px", display:"flex", flexDirection:"column", gap:10, minHeight:80 }}>
            {fetchLoading ? (
              <div style={{ textAlign:"center", padding:"40px 0", color:"#9ca3af" }}>
                <div style={{
                  width:32, height:32, margin:"0 auto 8px",
                  border:"3px solid #e5e7eb", borderTopColor:tab.color,
                  borderRadius:"50%", animation:"spin .7s linear infinite",
                }} />
                Loading…
              </div>
            ) : filtered.length === 0 ? (
              <div style={{ textAlign:"center", padding:"44px 0", color:"#9ca3af" }}>
                <div style={{ fontSize:36, marginBottom:8 }}>{tab.icon}</div>
                <p style={{ fontWeight:700, color:"#374151", margin:"0 0 4px" }}>
                  {search ? "No results found" : `No ${tab.label.toLowerCase()} yet`}
                </p>
                <p style={{ fontSize:13, margin:0 }}>
                  {search ? "Try a different search term" : "Use the form above to add one"}
                </p>
              </div>
            ) : (
              filtered.map(item => (
                <ItemCard key={item.id} item={item} tab={activeTab}
                  onEdit={startEdit} onDelete={handleDelete} />
              ))
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default TeamManagement;

