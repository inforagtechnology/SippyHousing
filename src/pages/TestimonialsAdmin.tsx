// import React, { useState, useEffect } from 'react';
// import { supabase } from "@/lib/supabase";

// /* ─── Types ─── */
// interface Testimonial {
//   id?: number;
//   name: string;
//   designation: string;
//   review: string;
//   rating: number;
//   image?: string;
//   created_at?: string;
// }

// const EMPTY_FORM: Testimonial = {
//   name: '',
//   designation: '',
//   review: '',
//   rating: 5,
//   image: '',
// };

// /* ─── Star picker sub-component ─── */
// const StarPicker = ({
//   value,
//   onChange,
// }: {
//   value: number;
//   onChange: (v: number) => void;
// }) => (
//   <div className="flex gap-1">
//     {[1, 2, 3, 4, 5].map((star) => (
//       <button
//         key={star}
//         type="button"
//         onClick={() => onChange(star)}
//         className="text-2xl focus:outline-none transition-transform hover:scale-110"
//         aria-label={`${star} star${star > 1 ? 's' : ''}`}
//       >
//         <span className={star <= value ? 'text-sippy-gold' : 'text-gray-300'}>★</span>
//       </button>
//     ))}
//   </div>
// );

// /* ─── Main component ─── */
// const TestimonialsAdmin: React.FC = () => {
//   const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
//   const [form, setForm]                 = useState<Testimonial>(EMPTY_FORM);
//   const [editingId, setEditingId]       = useState<number | null>(null);
//   const [loading, setLoading]           = useState(false);
//   const [fetching, setFetching]         = useState(true);
//   const [toast, setToast]               = useState<{ msg: string; type: 'success' | 'error' } | null>(null);
//   const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);
//   const [searchQuery, setSearchQuery]   = useState('');

//   /* ── Toast helper ── */
//   const showToast = (msg: string, type: 'success' | 'error' = 'success') => {
//     setToast({ msg, type });
//     setTimeout(() => setToast(null), 3000);
//   };

//   /* ── Fetch all ── */
//   useEffect(() => {
//     fetchTestimonials();
//   }, []);

//   const fetchTestimonials = async () => {
//     setFetching(true);
//     const { data, error } = await supabase
//       .from('testimonials')
//       .select('*')
//       .order('created_at', { ascending: false });
//     if (!error && data) setTestimonials(data);
//     else showToast('Failed to load testimonials', 'error');
//     setFetching(false);
//   };

//   /* ── Form helpers ── */
//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const resetForm = () => {
//     setForm(EMPTY_FORM);
//     setEditingId(null);
//   };

//   const startEdit = (t: Testimonial) => {
//     setForm({
//       name:        t.name,
//       designation: t.designation,
//       review:      t.review,
//       rating:      t.rating,
//       image:       t.image ?? '',
//     });
//     setEditingId(t.id!);
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   /* ── Save (create or update) ── */
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!form.name.trim() || !form.review.trim()) {
//       showToast('Name and review are required.', 'error');
//       return;
//     }

//     setLoading(true);
//     const payload = {
//       name:        form.name.trim(),
//       designation: form.designation.trim(),
//       review:      form.review.trim(),
//       rating:      form.rating,
//       image:       form.image?.trim() || null,
//     };

//     let error;
//     if (editingId !== null) {
//       ({ error } = await supabase.from('testimonials').update(payload).eq('id', editingId));
//     } else {
//       ({ error } = await supabase.from('testimonials').insert([payload]));
//     }

//     if (error) {
//       showToast('Save failed: ' + error.message, 'error');
//     } else {
//       showToast(editingId !== null ? 'Testimonial updated.' : 'Testimonial added.');
//       resetForm();
//       await fetchTestimonials();
//     }
//     setLoading(false);
//   };

//   /* ── Delete ── */
//   const handleDelete = async (id: number) => {
//     const { error } = await supabase.from('testimonials').delete().eq('id', id);
//     if (error) showToast('Delete failed: ' + error.message, 'error');
//     else {
//       showToast('Testimonial deleted.');
//       setDeleteConfirmId(null);
//       await fetchTestimonials();
//     }
//   };

//   /* ── Filtered list ── */
//   const filtered = testimonials.filter(
//     (t) =>
//       t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       t.designation.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       t.review.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   /* ── Render ── */
//   return (
//     <div className="min-h-screen bg-sippy-beige font-sans">

//       {/* ── Toast ── */}
//       {toast && (
//         <div
//           className={`fixed top-6 right-6 z-50 px-5 py-3 rounded-lg shadow-lg text-white text-sm font-medium transition-all ${
//             toast.type === 'success' ? 'bg-green-600' : 'bg-red-600'
//           }`}
//         >
//           {toast.type === 'success' ? '✓ ' : '✕ '}{toast.msg}
//         </div>
//       )}

//       <div className="max-w-5xl mx-auto px-4 py-10">

//         {/* ── Header ── */}
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-sippy-charcoal font-playfair">
//             Testimonials <span className="text-sippy-gold">Manager</span>
//           </h1>
//           <p className="text-sippy-charcoal/60 mt-1">
//             Add, edit, or remove client reviews shown on the About Us page.
//           </p>
//           <div className="gold-divider mt-3" />
//         </div>

//         {/* ── Add / Edit Form ── */}
//         <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-10">
//           <h2 className="text-lg font-semibold text-sippy-charcoal mb-5 font-playfair">
//             {editingId !== null ? '✎ Edit testimonial' : '+ Add new testimonial'}
//           </h2>

//           <form onSubmit={handleSubmit} className="space-y-5">

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//               {/* Name */}
//               <div>
//                 <label className="block text-sm font-medium text-sippy-charcoal mb-1">
//                   Client name <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   name="name"
//                   value={form.name}
//                   onChange={handleChange}
//                   placeholder="e.g. Rohit Patel"
//                   className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-sippy-charcoal focus:outline-none focus:border-sippy-gold focus:ring-1 focus:ring-sippy-gold/30 transition"
//                   required
//                 />
//               </div>

//               {/* Designation */}
//               <div>
//                 <label className="block text-sm font-medium text-sippy-charcoal mb-1">
//                   Designation / Location
//                 </label>
//                 <input
//                   name="designation"
//                   value={form.designation}
//                   onChange={handleChange}
//                   placeholder="e.g. Homebuyer, Worli"
//                   className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-sippy-charcoal focus:outline-none focus:border-sippy-gold focus:ring-1 focus:ring-sippy-gold/30 transition"
//                 />
//               </div>
//             </div>

//             {/* Review */}
//             <div>
//               <label className="block text-sm font-medium text-sippy-charcoal mb-1">
//                 Review <span className="text-red-500">*</span>
//               </label>
//               <textarea
//                 name="review"
//                 value={form.review}
//                 onChange={handleChange}
//                 rows={4}
//                 placeholder="What did the client say about Sippy Housing?"
//                 className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-sippy-charcoal focus:outline-none focus:border-sippy-gold focus:ring-1 focus:ring-sippy-gold/30 transition resize-none"
//                 required
//               />
//               <p className="text-xs text-sippy-charcoal/40 mt-1">{form.review.length} characters</p>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//               {/* Rating */}
//               <div>
//                 <label className="block text-sm font-medium text-sippy-charcoal mb-2">
//                   Rating
//                 </label>
//                 <StarPicker
//                   value={form.rating}
//                   onChange={(v) => setForm((prev) => ({ ...prev, rating: v }))}
//                 />
//                 <p className="text-xs text-sippy-charcoal/40 mt-1">{form.rating} / 5 stars</p>
//               </div>

//               {/* Photo URL */}
//               <div>
//                 <label className="block text-sm font-medium text-sippy-charcoal mb-1">
//                   Photo URL <span className="text-sippy-charcoal/40 font-normal">(optional)</span>
//                 </label>
//                 <input
//                   name="image"
//                   value={form.image ?? ''}
//                   onChange={handleChange}
//                   placeholder="https://..."
//                   className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-sippy-charcoal focus:outline-none focus:border-sippy-gold focus:ring-1 focus:ring-sippy-gold/30 transition"
//                 />
//                 <p className="text-xs text-sippy-charcoal/40 mt-1">
//                   Leave blank to show initials avatar
//                 </p>
//               </div>
//             </div>

//             {/* Preview of avatar */}
//             {form.name && (
//               <div className="flex items-center gap-3 p-3 bg-sippy-light rounded-lg border border-sippy-gold/20">
//                 <div className="w-10 h-10 rounded-full bg-sippy-gold/10 flex items-center justify-center flex-shrink-0 overflow-hidden border border-sippy-gold/20">
//                   {form.image ? (
//                     <img src={form.image} alt="preview" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display='none'; }} />
//                   ) : (
//                     <span className="text-sippy-gold font-medium text-sm">
//                       {form.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()}
//                     </span>
//                   )}
//                 </div>
//                 <div>
//                   <p className="text-sm font-semibold text-sippy-charcoal font-playfair">{form.name || '—'}</p>
//                   <p className="text-xs text-sippy-charcoal/50">{form.designation || 'No designation'}</p>
//                 </div>
//                 <div className="ml-auto text-sippy-gold text-sm">
//                   {'★'.repeat(form.rating)}{'☆'.repeat(5 - form.rating)}
//                 </div>
//               </div>
//             )}

//             {/* Actions */}
//             <div className="flex gap-3 pt-1">
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="btn-primary disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2"
//               >
//                 {loading
//                   ? 'Saving…'
//                   : editingId !== null
//                   ? 'Update testimonial'
//                   : 'Add testimonial'}
//               </button>
//               {editingId !== null && (
//                 <button
//                   type="button"
//                   onClick={resetForm}
//                   className="btn-outline"
//                 >
//                   Cancel
//                 </button>
//               )}
//             </div>
//           </form>
//         </div>

//         {/* ── Existing Testimonials ── */}
//         <div>
//           <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
//             <h2 className="text-lg font-semibold text-sippy-charcoal font-playfair">
//               All testimonials
//               <span className="ml-2 text-sm font-normal text-sippy-charcoal/50">
//                 ({testimonials.length})
//               </span>
//             </h2>

//             {/* Search */}
//             <input
//               type="search"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               placeholder="Search by name, review…"
//               className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-sippy-charcoal focus:outline-none focus:border-sippy-gold focus:ring-1 focus:ring-sippy-gold/30 transition w-full sm:w-64"
//             />
//           </div>

//           {fetching ? (
//             <div className="text-center py-16 text-sippy-charcoal/40 text-sm">Loading…</div>
//           ) : filtered.length === 0 ? (
//             <div className="text-center py-16 text-sippy-charcoal/40 text-sm">
//               {searchQuery ? 'No results match your search.' : 'No testimonials yet. Add your first one above.'}
//             </div>
//           ) : (
//             <div className="space-y-4">
//               {filtered.map((t) => (
//                 <div
//                   key={t.id}
//                   className={`bg-white rounded-xl border shadow-sm p-5 transition-all ${
//                     editingId === t.id
//                       ? 'border-sippy-gold ring-1 ring-sippy-gold/20'
//                       : 'border-gray-200 hover:border-sippy-gold/30'
//                   }`}
//                 >
//                   <div className="flex items-start justify-between gap-4">
//                     <div className="flex items-center gap-3 min-w-0">
//                       {/* Avatar */}
//                       <div className="w-10 h-10 rounded-full bg-sippy-gold/10 flex items-center justify-center flex-shrink-0 overflow-hidden border border-sippy-gold/20">
//                         {t.image ? (
//                           <img src={t.image} alt={t.name} className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display='none'; }} />
//                         ) : (
//                           <span className="text-sippy-gold font-medium text-sm">
//                             {t.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()}
//                           </span>
//                         )}
//                       </div>
//                       <div className="min-w-0">
//                         <div className="flex items-center gap-2 flex-wrap">
//                           <p className="font-semibold text-sippy-charcoal text-sm font-playfair">{t.name}</p>
//                           <span className="text-sippy-gold text-xs">
//                             {'★'.repeat(t.rating)}{'☆'.repeat(5 - t.rating)}
//                           </span>
//                         </div>
//                         {t.designation && (
//                           <p className="text-xs text-sippy-charcoal/50">{t.designation}</p>
//                         )}
//                       </div>
//                     </div>

//                     {/* Row actions */}
//                     <div className="flex items-center gap-2 flex-shrink-0">
//                       <button
//                         onClick={() => startEdit(t)}
//                         className="text-xs px-3 py-1.5 rounded-md border border-sippy-gold/40 text-sippy-gold hover:bg-sippy-gold/10 transition font-medium"
//                       >
//                         Edit
//                       </button>
//                       {deleteConfirmId === t.id ? (
//                         <div className="flex items-center gap-1">
//                           <button
//                             onClick={() => handleDelete(t.id!)}
//                             className="text-xs px-3 py-1.5 rounded-md bg-red-600 text-white hover:bg-red-700 transition font-medium"
//                           >
//                             Confirm
//                           </button>
//                           <button
//                             onClick={() => setDeleteConfirmId(null)}
//                             className="text-xs px-3 py-1.5 rounded-md border border-gray-200 text-sippy-charcoal/60 hover:bg-gray-50 transition"
//                           >
//                             Cancel
//                           </button>
//                         </div>
//                       ) : (
//                         <button
//                           onClick={() => setDeleteConfirmId(t.id!)}
//                           className="text-xs px-3 py-1.5 rounded-md border border-red-200 text-red-500 hover:bg-red-50 transition font-medium"
//                         >
//                           Delete
//                         </button>
//                       )}
//                     </div>
//                   </div>

//                   {/* Review text */}
//                   <p className="text-sm text-sippy-charcoal/70 mt-3 leading-relaxed italic border-l-2 border-sippy-gold/30 pl-3">
//                     &ldquo;{t.review}&rdquo;
//                   </p>

//                   {/* Timestamp */}
//                   {t.created_at && (
//                     <p className="text-xs text-sippy-charcoal/30 mt-3">
//                       Added {new Date(t.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
//                     </p>
//                   )}
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//       </div>
//     </div>
//   );
// };

// export default TestimonialsAdmin;


import React, { useState, useEffect } from 'react';
import { supabase } from "@/lib/supabase";
import { useNavigate } from "react-router-dom";
import AdminLayout from "@/components/layout/AdminLayout";
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
/* ─── Types ─── */
interface Testimonial {
  id?: number;
  name: string;
  designation: string;
  review: string;
  rating: number;
  image?: string;
  is_published?: boolean;
  created_at?: string;
}

const EMPTY_FORM: Testimonial = {
  name: '',
  designation: '',
  review: '',
  rating: 5,
  image: '',
  is_published: true,
};

/* ─── Star picker sub-component ─── */
const StarPicker = ({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) => (
  <div className="flex gap-1">
    {[1, 2, 3, 4, 5].map((star) => (
      <button
        key={star}
        type="button"
        onClick={() => onChange(star)}
        className="text-2xl focus:outline-none transition-transform hover:scale-110"
        aria-label={`${star} star${star > 1 ? 's' : ''}`}
      >
        <span className={star <= value ? 'text-sippy-gold' : 'text-gray-300'}>★</span>
      </button>
    ))}
  </div>
);

/* ─── Main component ─── */
const TestimonialsAdmin: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [form, setForm]                 = useState<Testimonial>(EMPTY_FORM);
  const [editingId, setEditingId]       = useState<number | null>(null);
  const [loading, setLoading]           = useState(false);
  const [fetching, setFetching]         = useState(true);
  const [toast, setToast]               = useState<{ msg: string; type: 'success' | 'error' } | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery]   = useState('');
 const navigate = useNavigate();
  /* ── Toast helper ── */
  const showToast = (msg: string, type: 'success' | 'error' = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  /* ── Fetch all ── */
  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    setFetching(true);
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .order('created_at', { ascending: false });
    if (!error && data) setTestimonials(data);
    else showToast('Failed to load testimonials', 'error');
    setFetching(false);
  };

  /* ── Form helpers ── */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setForm(EMPTY_FORM);
    setEditingId(null);
  };

  const startEdit = (t: Testimonial) => {
    setForm({
      name:         t.name,
      designation:  t.designation,
      review:       t.review,
      rating:       t.rating,
      image:        t.image ?? '',
      is_published: t.is_published ?? true,
    });
    setEditingId(t.id!);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  /* ── Save (create or update) ── */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.review.trim()) {
      showToast('Name and review are required.', 'error');
      return;
    }

    setLoading(true);
    const payload = {
      name:         form.name.trim(),
      designation:  form.designation.trim(),
      review:       form.review.trim(),
      rating:       form.rating,
      image:        form.image?.trim() || null,
      is_published: form.is_published ?? true,
    };

    let error;
    if (editingId !== null) {
      ({ error } = await supabase.from('testimonials').update(payload).eq('id', editingId));
    } else {
      ({ error } = await supabase.from('testimonials').insert([payload]));
    }

    if (error) {
      showToast('Save failed: ' + error.message, 'error');
    } else {
      showToast(editingId !== null ? 'Testimonial updated.' : 'Testimonial added.');
      resetForm();
      await fetchTestimonials();
    }
    setLoading(false);
  };

  /* ── Delete ── */
  const handleDelete = async (id: number) => {
    const { error } = await supabase.from('testimonials').delete().eq('id', id);
    if (error) showToast('Delete failed: ' + error.message, 'error');
    else {
      showToast('Testimonial deleted.');
      setDeleteConfirmId(null);
      await fetchTestimonials();
    }
  };

  /* ── Quick publish toggle (no need to open the edit form for this) ── */
  const togglePublished = async (t: Testimonial) => {
    const { error } = await supabase
      .from('testimonials')
      .update({ is_published: !t.is_published })
      .eq('id', t.id);
    if (error) showToast('Update failed: ' + error.message, 'error');
    else {
      showToast(t.is_published ? 'Testimonial hidden from site.' : 'Testimonial published.');
      await fetchTestimonials();
    }
  };

  /* ── Filtered list ── */
  const filtered = testimonials.filter(
    (t) =>
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.designation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.review.toLowerCase().includes(searchQuery.toLowerCase())
  );

  /* ── Render ── */
  return (
    <AdminLayout title="Testimonials Manager">
         <Button 
          variant="outline" 
          onClick={() => navigate("/admin")}
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>
      {/* ── Toast ── */}
      {toast && (
        <div
          className={`fixed top-6 right-6 z-50 px-5 py-3 rounded-lg shadow-lg text-white text-sm font-medium transition-all ${
            toast.type === 'success' ? 'bg-green-600' : 'bg-red-600'
          }`}
        >
          {toast.type === 'success' ? '✓ ' : '✕ '}{toast.msg}
        </div>
      )}

      <div className="max-w-5xl">
   
        <p className="text-gray-600 mb-6">
          Add, edit, or remove client reviews shown on the About Us page. Unpublished reviews stay
          here for editing but won't appear on the public site.
        </p>

        {/* ── Add / Edit Form ── */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-10">
          <h2 className="text-lg font-semibold text-sippy-charcoal mb-5 font-playfair">
            {editingId !== null ? '✎ Edit testimonial' : '+ Add new testimonial'}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-sippy-charcoal mb-1">
                  Client name <span className="text-red-500">*</span>
                </label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="e.g. Rohit Patel"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-sippy-charcoal focus:outline-none focus:border-sippy-gold focus:ring-1 focus:ring-sippy-gold/30 transition"
                  required
                />
              </div>

              {/* Designation */}
              <div>
                <label className="block text-sm font-medium text-sippy-charcoal mb-1">
                  Designation / Location
                </label>
                <input
                  name="designation"
                  value={form.designation}
                  onChange={handleChange}
                  placeholder="e.g. Homebuyer, Worli"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-sippy-charcoal focus:outline-none focus:border-sippy-gold focus:ring-1 focus:ring-sippy-gold/30 transition"
                />
              </div>
            </div>

            {/* Review */}
            <div>
              <label className="block text-sm font-medium text-sippy-charcoal mb-1">
                Review <span className="text-red-500">*</span>
              </label>
              <textarea
                name="review"
                value={form.review}
                onChange={handleChange}
                rows={4}
                placeholder="What did the client say about Sippy Housing?"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-sippy-charcoal focus:outline-none focus:border-sippy-gold focus:ring-1 focus:ring-sippy-gold/30 transition resize-none"
                required
              />
              <p className="text-xs text-sippy-charcoal/40 mt-1">{form.review.length} characters</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Rating */}
              <div>
                <label className="block text-sm font-medium text-sippy-charcoal mb-2">
                  Rating
                </label>
                <StarPicker
                  value={form.rating}
                  onChange={(v) => setForm((prev) => ({ ...prev, rating: v }))}
                />
                <p className="text-xs text-sippy-charcoal/40 mt-1">{form.rating} / 5 stars</p>
              </div>

              {/* Photo URL */}
              <div>
                <label className="block text-sm font-medium text-sippy-charcoal mb-1">
                  Photo URL <span className="text-sippy-charcoal/40 font-normal">(optional)</span>
                </label>
                <input
                  name="image"
                  value={form.image ?? ''}
                  onChange={handleChange}
                  placeholder="https://..."
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-sippy-charcoal focus:outline-none focus:border-sippy-gold focus:ring-1 focus:ring-sippy-gold/30 transition"
                />
                <p className="text-xs text-sippy-charcoal/40 mt-1">
                  Leave blank to show initials avatar
                </p>
              </div>
            </div>

            {/* Published toggle */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                role="switch"
                aria-checked={form.is_published}
                onClick={() => setForm((prev) => ({ ...prev, is_published: !prev.is_published }))}
                className={`relative w-11 h-6 rounded-full transition-colors ${
                  form.is_published ? 'bg-sippy-gold' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                    form.is_published ? 'translate-x-5' : ''
                  }`}
                />
              </button>
              <span className="text-sm text-sippy-charcoal">
                {form.is_published ? 'Published — visible on About Us page' : 'Hidden from public site'}
              </span>
            </div>

            {/* Preview of avatar */}
            {form.name && (
              <div className="flex items-center gap-3 p-3 bg-sippy-light rounded-lg border border-sippy-gold/20">
                <div className="w-10 h-10 rounded-full bg-sippy-gold/10 flex items-center justify-center flex-shrink-0 overflow-hidden border border-sippy-gold/20">
                  {form.image ? (
                    <img src={form.image} alt="preview" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display='none'; }} />
                  ) : (
                    <span className="text-sippy-gold font-medium text-sm">
                      {form.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()}
                    </span>
                  )}
                </div>
                <div>
                  <p className="text-sm font-semibold text-sippy-charcoal font-playfair">{form.name || '—'}</p>
                  <p className="text-xs text-sippy-charcoal/50">{form.designation || 'No designation'}</p>
                </div>
                <div className="ml-auto text-sippy-gold text-sm">
                  {'★'.repeat(form.rating)}{'☆'.repeat(5 - form.rating)}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-3 pt-1">
              <button
                type="submit"
                disabled={loading}
                className="btn-primary disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {loading
                  ? 'Saving…'
                  : editingId !== null
                  ? 'Update testimonial'
                  : 'Add testimonial'}
              </button>
              {editingId !== null && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="btn-outline"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* ── Existing Testimonials ── */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
            <h2 className="text-lg font-semibold text-sippy-charcoal font-playfair">
              All testimonials
              <span className="ml-2 text-sm font-normal text-sippy-charcoal/50">
                ({testimonials.length})
              </span>
            </h2>

            {/* Search */}
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, review…"
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-sippy-charcoal focus:outline-none focus:border-sippy-gold focus:ring-1 focus:ring-sippy-gold/30 transition w-full sm:w-64"
            />
          </div>

          {fetching ? (
            <div className="text-center py-16 text-sippy-charcoal/40 text-sm">Loading…</div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-16 text-sippy-charcoal/40 text-sm">
              {searchQuery ? 'No results match your search.' : 'No testimonials yet. Add your first one above.'}
            </div>
          ) : (
            <div className="space-y-4">
              {filtered.map((t) => (
                <div
                  key={t.id}
                  className={`bg-white rounded-xl border shadow-sm p-5 transition-all ${
                    editingId === t.id
                      ? 'border-sippy-gold ring-1 ring-sippy-gold/20'
                      : 'border-gray-200 hover:border-sippy-gold/30'
                  } ${t.is_published === false ? 'opacity-60' : ''}`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3 min-w-0">
                      {/* Avatar */}
                      <div className="w-10 h-10 rounded-full bg-sippy-gold/10 flex items-center justify-center flex-shrink-0 overflow-hidden border border-sippy-gold/20">
                        {t.image ? (
                          <img src={t.image} alt={t.name} className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display='none'; }} />
                        ) : (
                          <span className="text-sippy-gold font-medium text-sm">
                            {t.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()}
                          </span>
                        )}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="font-semibold text-sippy-charcoal text-sm font-playfair">{t.name}</p>
                          <span className="text-sippy-gold text-xs">
                            {'★'.repeat(t.rating)}{'☆'.repeat(5 - t.rating)}
                          </span>
                          {t.is_published === false && (
                            <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">Hidden</span>
                          )}
                        </div>
                        {t.designation && (
                          <p className="text-xs text-sippy-charcoal/50">{t.designation}</p>
                        )}
                      </div>
                    </div>

                    {/* Row actions */}
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <button
                        onClick={() => togglePublished(t)}
                        className="text-xs px-3 py-1.5 rounded-md border border-gray-200 text-sippy-charcoal/70 hover:bg-gray-50 transition font-medium"
                      >
                        {t.is_published === false ? 'Publish' : 'Hide'}
                      </button>
                      <button
                        onClick={() => startEdit(t)}
                        className="text-xs px-3 py-1.5 rounded-md border border-sippy-gold/40 text-sippy-gold hover:bg-sippy-gold/10 transition font-medium"
                      >
                        Edit
                      </button>
                      {deleteConfirmId === t.id ? (
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleDelete(t.id!)}
                            className="text-xs px-3 py-1.5 rounded-md bg-red-600 text-white hover:bg-red-700 transition font-medium"
                          >
                            Confirm
                          </button>
                          <button
                            onClick={() => setDeleteConfirmId(null)}
                            className="text-xs px-3 py-1.5 rounded-md border border-gray-200 text-sippy-charcoal/60 hover:bg-gray-50 transition"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setDeleteConfirmId(t.id!)}
                          className="text-xs px-3 py-1.5 rounded-md border border-red-200 text-red-500 hover:bg-red-50 transition font-medium"
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Review text */}
                  <p className="text-sm text-sippy-charcoal/70 mt-3 leading-relaxed italic border-l-2 border-sippy-gold/30 pl-3">
                    &ldquo;{t.review}&rdquo;
                  </p>

                  {/* Timestamp */}
                  {t.created_at && (
                    <p className="text-xs text-sippy-charcoal/30 mt-3">
                      Added {new Date(t.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </AdminLayout>
  );
};

export default TestimonialsAdmin;