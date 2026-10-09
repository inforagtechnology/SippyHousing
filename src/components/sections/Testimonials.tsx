// import { useState, useEffect } from "react";
// import { supabase } from "@/lib/supabase";

// /* ─── Types — matches TestimonialsAdmin.tsx exactly ─── */
// interface Testimonial {
//   id: number;
//   name: string;
//   designation: string;
//   review: string;
//   rating: number;
//   image?: string | null;
//   created_at?: string;
// }

// const TestimonialsSection = () => {
//   const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
//   const [loading, setLoading]           = useState(true);
//   const [showAll, setShowAll]           = useState(false);

//   useEffect(() => {
//     const fetchTestimonials = async () => {
//       const { data, error } = await supabase
//         .from("testimonials")
//         .select("*")
//         .order("created_at", { ascending: false });

//       if (!error && data) setTestimonials(data as Testimonial[]);
//       setLoading(false);
//     };
//     fetchTestimonials();
//   }, []);

//   // Don't render the section at all if there's nothing to show
//   if (!loading && testimonials.length === 0) return null;

//   const initialToShow = 6;
//   const visible = showAll ? testimonials : testimonials.slice(0, initialToShow);

//   // ── Rating summary stats ──
//   const totalReviews = testimonials.length;
//   const avgRating =
//     totalReviews > 0
//       ? (testimonials.reduce((sum, t) => sum + t.rating, 0) / totalReviews).toFixed(1)
//       : "0.0";

//   return (
//     <section className="py-8 bg-white" id="testimonials">
//       <div className="section-container">
//         <div className="text-center mb-10">
//           <h2 className="section-title">
//             Client <span className="text-sippy-gold">Testimonials</span>
//           </h2>
//           <p className="text-lg md:text-xl mb-6 text-sippy-charcoal/80 max-w-3xl mx-auto">
//             Real feedback from families and investors who trusted us with their property journey
//           </p>
//           <div className="gold-divider"></div>
//         </div>

//         {/* ── Rating summary row ── */}
//         {!loading && totalReviews > 0 && (
//           <div className="flex items-center justify-center gap-8 mb-12 flex-wrap">
//             <div className="text-center">
//               <div className="flex items-center justify-center gap-2">
//                 <span className="font-playfair text-4xl font-bold text-sippy-charcoal">
//                   {avgRating}
//                 </span>
//                 <span className="text-sippy-gold text-2xl">★</span>
//               </div>
//               <p className="text-sm text-sippy-charcoal/55 mt-1">Average Rating</p>
//             </div>

//             <div className="h-12 w-px bg-sippy-gold/20"></div>

//             <div className="text-center">
//               <span className="font-playfair text-4xl font-bold text-sippy-charcoal">
//                 {totalReviews}+
//               </span>
//               <p className="text-sm text-sippy-charcoal/55 mt-1">
//                 {totalReviews === 1 ? "Client Review" : "Client Reviews"}
//               </p>
//             </div>

//             <div className="h-12 w-px bg-sippy-gold/20"></div>

//             <div className="text-center">
//               <span className="font-playfair text-4xl font-bold text-sippy-charcoal">100%</span>
//               <p className="text-sm text-sippy-charcoal/55 mt-1">Recommend Us</p>
//             </div>
//           </div>
//         )}

//         {loading ? (
//           <div className="text-center py-12 text-sippy-charcoal/40">Loading testimonials…</div>
//         ) : (
//           <>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {visible.map((t) => (
//                 <TestimonialCard key={t.id} t={t} />
//               ))}
//             </div>

//             {testimonials.length > initialToShow && (
//               <div className="text-center mt-10">
//                 <button onClick={() => setShowAll(!showAll)} className="btn-outline">
//                   {showAll ? "View less" : "View all"}
//                 </button>
//               </div>
//             )}
//           </>
//         )}
//       </div>
//     </section>
//   );
// };

// /* ─── Single testimonial card ─── */
// const TestimonialCard = ({ t }: { t: Testimonial }) => {
//   const initials = t.name
//     .split(" ")
//     .map((n) => n[0])
//     .join("")
//     .slice(0, 2)
//     .toUpperCase();

//   return (
//     <div className="property-card group bg-white border-2 border-sippy-gold/20 hover:border-sippy-gold rounded-lg p-6 transition-all duration-300 flex flex-col h-full relative">
//       {/* Quote mark */}
//       <span className="absolute top-4 right-5 text-5xl text-sippy-gold/15 font-playfair leading-none select-none">
//         &rdquo;
//       </span>

//       {/* Stars */}
//       <div className="text-sippy-gold text-base mb-3">
//         {"★".repeat(t.rating)}
//         <span className="text-gray-300">{"★".repeat(5 - t.rating)}</span>
//       </div>

//       {/* Review text */}
//       <p className="text-sippy-charcoal/75 text-sm leading-relaxed italic flex-grow mb-5">
//         &ldquo;{t.review}&rdquo;
//       </p>

//       {/* Author */}
//       <div className="flex items-center gap-3 pt-4 border-t border-sippy-gold/15">
//         <div className="w-11 h-11 rounded-full bg-sippy-gold/10 border border-sippy-gold/30 flex items-center justify-center flex-shrink-0 overflow-hidden">
//           {t.image ? (
//             <img
//               src={t.image}
//               alt={t.name}
//               className="w-full h-full object-cover"
//               onError={(e) => {
//                 (e.target as HTMLImageElement).style.display = "none";
//               }}
//             />
//           ) : (
//             <span className="text-sippy-gold font-semibold text-sm">{initials}</span>
//           )}
//         </div>
//         <div>
//           <p className="font-bold text-sippy-charcoal text-sm font-playfair">{t.name}</p>
//           {t.designation && (
//             <p className="text-xs text-sippy-charcoal/55">{t.designation}</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TestimonialsSection;


import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

interface Testimonial {
  id: number;
  name: string;
  designation: string;
  review: string;
  rating: number;
  image?: string;
  created_at?: string;
}

/**
 * Public-facing testimonials/reviews section.
 * Drop this into your About Us page, e.g.:
 *
 *   import Testimonials from "@/components/sections/Testimonials";
 *   ...
 *   <AboutUs />
 *   <Testimonials />
 *
 * Only reads rows where is_published = true (enforced both by the
 * Supabase RLS policy and the query below, as a defense-in-depth check).
 */
const Testimonials = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      const { data, error } = await supabase
        .from("testimonials")
        .select("*")
        .eq("is_published", true)
        .order("created_at", { ascending: false });

      if (!error && data) setTestimonials(data);
      setLoading(false);
    };
    fetchTestimonials();
  }, []);

  // Don't render the section at all if there's nothing to show —
  // avoids an empty-looking block on the page.
  if (!loading && testimonials.length === 0) return null;

  return (
    <section id="testimonials" className="py-20 bg-sippy-beige">
      <div className="section-container">
        <div className="text-center mb-16">
          <h2 className="section-title">
            What Our <span className="text-sippy-gold">Clients Say</span>
          </h2>
          <p className="section-subtitle mx-auto">
            Real experiences from clients who found their property with Sippy Housing.
          </p>
          <div className="gold-divider"></div>
        </div>

        {loading ? (
          <div className="text-center py-10 text-sippy-charcoal/40 text-sm">Loading reviews…</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div
                key={t.id}
                className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 flex flex-col"
              >
                {/* Stars */}
                <div className="text-sippy-gold text-lg mb-4">
                  {"★".repeat(t.rating)}
                  {"☆".repeat(5 - t.rating)}
                </div>

                {/* Review */}
                <p className="text-sippy-charcoal/80 leading-relaxed italic mb-6 flex-1">
                  &ldquo;{t.review}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                  <div className="w-11 h-11 rounded-full bg-sippy-gold/10 flex items-center justify-center flex-shrink-0 overflow-hidden border border-sippy-gold/20">
                    {t.image ? (
                      <img
                        src={t.image}
                        alt={t.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = "none";
                        }}
                      />
                    ) : (
                      <span className="text-sippy-gold font-semibold text-sm">
                        {t.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .slice(0, 2)
                          .toUpperCase()}
                      </span>
                    )}
                  </div>
                  <div>
                    <p className="font-semibold text-sippy-charcoal text-sm font-playfair">
                      {t.name}
                    </p>
                    {t.designation && (
                      <p className="text-xs text-sippy-charcoal/50">{t.designation}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Testimonials;