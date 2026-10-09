// import React, { useState, useEffect } from 'react';
// import { supabase } from "@/lib/supabase";
// import Navbar from "@/components/layout/Navbar";
// import Footer from "@/components/layout/Footer";
// import FloatingContact from "@/components/common/FloatingContact";
// import ScrollToTop from "@/components/common/ScrollToTop";
// import { handleHashNavigation } from "@/lib/navigation";
// import ExhibitionCarousel from "@/components/ui/exhibition-carousel";

// const AboutUs = () => {
//   const [showAllPartners, setShowAllPartners] = useState(false);
//   const [showAllAwards, setShowAllAwards] = useState(false);
//   //++ Team members data - using actual team member images from your public/Team folder
//   const [teamMembers, setTeamMembers] = useState([]);
//   const [awards, setAwards] = useState([]);
//   const [partners, setPartners] = useState([]);
//   useEffect(() => {
//     // Handle hash navigation on page load
//     handleHashNavigation();
//     // Fetch team members from Supabase
//     fetchTeamMembers();
//     fetchAwards();
//     fetchPartners();
//   }, []);

//   // Function to fetch team members from Supabase
//   const fetchTeamMembers = async () => {
//     const { data, error } = await supabase
//       .from("team_members")
//       .select("*");

//     if (error) {
//       console.log(error);
//     } else {
//       setTeamMembers(data);
//     }
//   };
//   // Function to fetch awards from Supabase

//   const fetchAwards = async () => {
//     const { data, error } = await supabase
//       .from("awards")
//       .select("*")
//       .order("id", { ascending: false });

//     if (error) {
//       console.log(error);
//     } else {
//       setAwards(data);
//     }
//   };
//   // Function to fetch partners from Supabase
//   const fetchPartners = async () => {
//     const { data, error } = await supabase
//       .from("partners")
//       .select("*")
//       .order("id", { ascending: false });

//     if (error) {
//       console.log(error);
//     } else {
//       setPartners(data);
//     }
//   };

//   // const teamMembers = [

//   //   {
//   //     name: "Prakash Tarachandani",
//   //     designation: "Senior Sales Manager",
//   //     image: "/Team/Prakash.avif",
//   //     description: "Expert in luxury real estate sales with a proven track record of successful project closures."
//   //   },
//   //   {
//   //     name: "Sona Narang",
//   //     designation: "Sales Manager",
//   //     image: "/Team/placeholder.jpg",
//   //     description: "Specialized in residential property sales with deep market knowledge and client relationship expertise."
//   //   },
//   //   {
//   //     name: "Mehernosh Bharthania",
//   //     designation: "Sales Manager",
//   //     image: "/Team/placeholder.jpg",
//   //     description: "Focused on commercial real estate transactions with extensive experience in corporate client management."
//   //   },
//   //   {
//   //     name: "Arvind Kasurde",
//   //     designation: "Sales Manager",
//   //     image: "/Team/Arvind.avif",
//   //     description: "Expert in plot and land sales with strong local market connections and negotiation skills."
//   //   },
//   //   {
//   //     name: "Shrutika Kubal",
//   //     designation: "Office Coordinator",
//   //     image: "/Team/Shrutika_edited.avif",
//   //     description: "Ensures smooth operations and client satisfaction through efficient coordination and administrative excellence."
//   //   },
//   //   {
//   //     name: "Shruti Tawde",
//   //     designation: "Marketing Executive",
//   //     image: "/Team/WhatsApp Image 2024-07-31 at 1_17_edited.avif",
//   //     description: "Drives digital presence and brand visibility through innovative marketing strategies and content creation."
//   //   },
//   //   {
//   //     name: "Aditya",
//   //     designation: "Office Administrator",
//   //     image: "/Team/placeholder.jpg",
//   //     description: "Manages day-to-day operations with precision and ensures seamless workflow across all departments."
//   //   },
//   //   {
//   //     name: "Ronak",
//   //     designation: "Business Development Manager",
//   //     image: "/Team/placeholder.jpg",
//   //     description: "Leads strategic partnerships and business expansion initiatives with focus on growth and innovation."
//   //   }
//   // ];




//   //




//   // Awards data - using actual award images from your public/Awards folder
//   // const awards = [
//   //   {
//   //     id: 'statue-1',
//   //     image: '/Awards/statue/(1).pdf.jpg',
//   //     title: 'Industry Excellence Award',
//   //     description: 'Outstanding contribution to real estate development',
//   //     year: '2023'
//   //   },
//   //   {
//   //     id: 'statue-2',
//   //     image: '/Awards/statue/(2).pdf.jpg',
//   //     title: 'Customer Satisfaction Award',
//   //     description: 'Highest customer satisfaction ratings',
//   //     year: '2023'
//   //   },
//   //   {
//   //     id: 'statue-3',
//   //     image: '/Awards/statue/(3).pdf.jpg',
//   //     title: 'Innovation in Real Estate',
//   //     description: 'Innovative approach to property development',
//   //     year: '2022'
//   //   },
//   //   {
//   //     id: 'statue-4',
//   //     image: '/Awards/statue/(4).pdf.jpg',
//   //     title: 'Best Residential Project',
//   //     description: 'Excellence in residential property development',
//   //     year: '2022'
//   //   },
//   //   {
//   //     id: 'statue-5',
//   //     image: '/Awards/statue/(5).pdf.jpg',
//   //     title: 'Commercial Excellence',
//   //     description: 'Outstanding commercial real estate development',
//   //     year: '2022'
//   //   },
//   //   {
//   //     id: 'statue-6',
//   //     image: '/Awards/statue/(6).pdf.jpg',
//   //     title: 'Sustainable Development',
//   //     description: 'Commitment to sustainable real estate practices',
//   //     year: '2021'
//   //   },
//   //   {
//   //     id: 'statue-7',
//   //     image: '/Awards/statue/(7).pdf.jpg',
//   //     title: 'Market Leadership',
//   //     description: 'Leading position in the real estate market',
//   //     year: '2021'
//   //   },
//   //   {
//   //     id: 'statue-8',
//   //     image: '/Awards/statue/(8).pdf.jpg',
//   //     title: 'Quality Excellence',
//   //     description: 'Superior quality in construction and development',
//   //     year: '2021'
//   //   },
//   //   {
//   //     id: 'statue-9',
//   //     image: '/Awards/statue/(9).pdf.jpg',
//   //     title: 'Community Impact',
//   //     description: 'Positive impact on local communities',
//   //     year: '2020'
//   //   },
//   //   {
//   //     id: 'statue-10',
//   //     image: '/Awards/statue/(10).pdf.jpg',
//   //     title: 'Business Growth',
//   //     description: 'Exceptional business growth and expansion',
//   //     year: '2020'
//   //   },
//   //   {
//   //     id: 'statue-11',
//   //     image: '/Awards/statue/(11).pdf.jpg',
//   //     title: 'Architectural Excellence',
//   //     description: 'Outstanding architectural design and planning',
//   //     year: '2020'
//   //   },
//   //   {
//   //     id: 'statue-12',
//   //     image: '/Awards/statue/(12).pdf.jpg',
//   //     title: 'Sales Performance',
//   //     description: 'Excellence in sales and customer acquisition',
//   //     year: '2019'
//   //   },
//   //   {
//   //     id: 'statue-13',
//   //     image: '/Awards/statue/(13).pdf.jpg',
//   //     title: 'Project Delivery',
//   //     description: 'Timely and quality project delivery',
//   //     year: '2019'
//   //   },
//   //   {
//   //     id: 'statue-14',
//   //     image: '/Awards/statue/(14).pdf.jpg',
//   //     title: 'Industry Recognition',
//   //     description: 'Recognition from industry peers and experts',
//   //     year: '2019'
//   //   }
//   // ];

//   // Awards PDFs - render as tiles linking to the PDF files
//   const awardPdfs = [
//     { id: 'pdf-13', file: '/Awards/Adobe Scan 03 Oct 2025 (13).pdf', title: 'Award PDF 13' },
//     { id: 'pdf-15', file: '/Awards/Adobe Scan 03 Oct 2025 (15).pdf', title: 'Award PDF 15' },
//     { id: 'pdf-16', file: '/Awards/Adobe Scan 03 Oct 2025 (16).pdf', title: 'Award PDF 16' },
//     { id: 'pdf-17', file: '/Awards/Adobe Scan 03 Oct 2025 (17).pdf', title: 'Award PDF 17' },
//     { id: 'pdf-18', file: '/Awards/Adobe Scan 03 Oct 2025 (18).pdf', title: 'Award PDF 18' },
//     { id: 'pdf-19', file: '/Awards/Adobe Scan 03 Oct 2025 (19).pdf', title: 'Award PDF 19' },
//     { id: 'pdf-20', file: '/Awards/Adobe Scan 03 Oct 2025 (20).pdf', title: 'Award PDF 20' },
//     { id: 'pdf-21', file: '/Awards/Adobe Scan 03 Oct 2025 (21).pdf', title: 'Award PDF 21' },
//     { id: 'pdf-22', file: '/Awards/Adobe Scan 03 Oct 2025 (22).pdf', title: 'Award PDF 22' },
//     { id: 'pdf-23', file: '/Awards/Adobe Scan 03 Oct 2025 (23).pdf', title: 'Award PDF 23' },
//     { id: 'pdf-24', file: '/Awards/Adobe Scan 03 Oct 2025 (24).pdf', title: 'Award PDF 24' },
//     { id: 'pdf-25', file: '/Awards/Adobe Scan 03 Oct 2025 (25).pdf', title: 'Award PDF 25' },
//     { id: 'pdf-26', file: '/Awards/Adobe Scan 03 Oct 2025 (26).pdf', title: 'Award PDF 26' },
//     { id: 'pdf-27', file: '/Awards/Adobe Scan 03 Oct 2025 (27).pdf', title: 'Award PDF 27' },
//     { id: 'pdf-28', file: '/Awards/Adobe Scan 03 Oct 2025 (28).pdf', title: 'Award PDF 28' },
//     { id: 'pdf-29', file: '/Awards/Adobe Scan 03 Oct 2025 (29).pdf', title: 'Award PDF 29' },
//     { id: 'pdf-30', file: '/Awards/Adobe Scan 03 Oct 2025 (30).pdf', title: 'Award PDF 30' },
//     { id: 'pdf-main', file: '/Awards/Adobe Scan 03 Oct 2025.pdf', title: 'Award PDF' },
//     { id: 'pdf-sethia', file: '/Awards/Sethia Infrastructure Award.pdf', title: 'Sethia Infrastructure Award' },
//   ];

//   const allAwards = [...awards, ...awardPdfs];

//   // Member organizations data
//   // const memberOrganizations = [
//   //   {
//   //     id: 'nar-india',
//   //     image: '/member_of/national-association-of-realtors-india-nar-india-logo-png_seeklogo-412945.png',
//   //     name: 'NAR India',
//   //     description: 'National Association of Realtors India'
//   //   },
//   //   {
//   //     id: 'trek',
//   //     image: '/member_of/Trek.png',
//   //     name: 'TREK',
//   //     description: 'Real Estate Knowledge Platform'
//   //   },
//   //   {
//   //     id: 'logo',
//   //     image: '/member_of/logo.png',
//   //     name: 'Industry Partner',
//   //     description: 'Real Estate Industry Association'
//   //   }
//   // ];

//   // // Partners data
//   // const partnerImages = [
//   //   {
//   //     id: 'partner-1',
//   //     image: '/Partners/Adani.png',
//   //     title: 'Adani'
//   //   },
//   //   {
//   //     id: 'partner-2',
//   //     image: '/Partners/Agami.jpg',
//   //     title: 'Agami'
//   //   },
//   //   {
//   //     id: 'partner-3',
//   //     image: '/Partners/Ajmera.png',
//   //     title: 'Ajmera'
//   //   },
//   //   {
//   //     id: 'partner-4',
//   //     image: '/Partners/AP Realty.png',
//   //     title: 'AP Realty'
//   //   },
//   //   {
//   //     id: 'partner-5',
//   //     image: '/Partners/Arkade.jpeg',
//   //     title: 'Arkade'
//   //   },
//   //   {
//   //     id: 'partner-6',
//   //     image: '/Partners/AURUM REAL ESTATE.png',
//   //     title: 'AURUM REAL ESTATE'
//   //   },
//   //   {
//   //     id: 'partner-7',
//   //     image: '/Partners/AVIGHNA.jpeg',
//   //     title: 'AVIGHNA'
//   //   },
//   //   {
//   //     id: 'partner-8',
//   //     image: '/Partners/CHANDAK GROUP.jpg',
//   //     title: 'CHANDAK GROUP'
//   //   },
//   //   {
//   //     id: 'partner-9',
//   //     image: '/Partners/DLH.png',
//   //     title: 'DLH'
//   //   },
//   //   {
//   //     id: 'partner-10',
//   //     image: '/Partners/Ekta World.png',
//   //     title: 'Ekta World'
//   //   },
//   //   {
//   //     id: 'partner-11',
//   //     image: '/Partners/Elements Realty.jpg',
//   //     title: 'Elements Realty'
//   //   },
//   //   {
//   //     id: 'partner-12',
//   //     image: '/Partners/FOUR SEASON RESIDENCES.jpg',
//   //     title: 'FOUR SEASON RESIDENCES'
//   //   },
//   //   {
//   //     id: 'partner-13',
//   //     image: '/Partners/Godrej.jpg',
//   //     title: 'Godrej'
//   //   },
//   //   {
//   //     id: 'partner-14',
//   //     image: '/Partners/Guru kripa.png',
//   //     title: 'Guru kripa'
//   //   },
//   //   {
//   //     id: 'partner-15',
//   //     image: '/Partners/Gurukrupa realcon.jpg',
//   //     title: 'Gurukrupa realcon'
//   //   },
//   //   {
//   //     id: 'partner-16',
//   //     image: '/Partners/Hiranandani.png',
//   //     title: 'Hiranandani'
//   //   },
//   //   {
//   //     id: 'partner-17',
//   //     image: '/Partners/HoABL.png',
//   //     title: 'HoABL'
//   //   },
//   //   {
//   //     id: 'partner-18',
//   //     image: '/Partners/HUBTOWN.jpg',
//   //     title: 'HUBTOWN'
//   //   },
//   //   {
//   //     id: 'partner-19',
//   //     image: '/Partners/Inspira.jpg',
//   //     title: 'Inspira'
//   //   },
//   //   {
//   //     id: 'partner-20',
//   //     image: '/Partners/JP Infra.png',
//   //     title: 'JP Infra'
//   //   },

//   //   // {
//   //   //   id: 'partner-22',
//   //   //   image: '/Partners/K_RAHEJA_.avif',
//   //   //   title: 'K_RAHEJA'
//   //   // },
//   //   {
//   //     id: 'partner-23',
//   //     image: '/Partners/KABRA GROUP.png',
//   //     title: 'KABRA GROUP'
//   //   },
//   //   {
//   //     id: 'partner-24',
//   //     image: '/Partners/Kalpataru.jpeg',
//   //     title: 'Kalpataru'
//   //   },
//   //   {
//   //     id: 'partner-25',
//   //     image: '/Partners/Kothari.jpg',
//   //     title: 'Kothari'
//   //   },
//   //   {
//   //     id: 'partner-26',
//   //     image: '/Partners/L&T Realty.jfif',
//   //     title: 'L&T Realty'
//   //   },
//   //   {
//   //     id: 'partner-27',
//   //     image: '/Partners/Lodha.png',
//   //     title: 'Lodha'
//   //   },
//   //   {
//   //     id: 'partner-28',
//   //     image: '/Partners/Lokhandwala.png',
//   //     title: 'Lokhandwala'
//   //   },
//   //   {
//   //     id: 'partner-29',
//   //     image: '/Partners/Mahindra-Lifespaces.jpg',
//   //     title: 'Mahindra-Lifespaces'
//   //   },
//   //   {
//   //     id: 'partner-30',
//   //     image: '/Partners/MICL.png',
//   //     title: 'MICL'
//   //   },
//   //   {
//   //     id: 'partner-31',
//   //     image: '/Partners/Nagpal.jpg',
//   //     title: 'Nagpal'
//   //   },
//   //   {
//   //     id: 'partner-32',
//   //     image: '/Partners/Oberoi.png',
//   //     title: 'Oberoi'
//   //   },
//   //   {
//   //     id: 'partner-33',
//   //     image: '/Partners/Omkar.png',
//   //     title: 'Omkar'
//   //   },
//   //   {
//   //     id: 'partner-34',
//   //     image: '/Partners/PCPL.jpg',
//   //     title: 'PCPL'
//   //   },
//   //   {
//   //     id: 'partner-35',
//   //     image: '/Partners/Piramal-realty-logo.png',
//   //     title: 'Piramal-realty-logo'
//   //   },
//   //   {
//   //     id: 'partner-36',
//   //     image: '/Partners/Platinum Corp.jpg',
//   //     title: 'Platinum Corp'
//   //   },
//   //   {
//   //     id: 'partner-37',
//   //     image: '/Partners/Prestige_Group.png',
//   //     title: 'Prestige_Group'
//   //   },
//   //   {
//   //     id: 'partner-38',
//   //     image: '/Partners/Provenance Land.jpg',
//   //     title: 'Provenance Land'
//   //   },
//   //   {
//   //     id: 'partner-39',
//   //     image: '/Partners/PUPURAVANKARA GROUP.png',
//   //     title: 'PUPURAVANKARA GROUP'
//   //   },
//   //   {
//   //     id: 'partner-40',
//   //     image: '/Partners/RAYMOND.jpg',
//   //     title: 'RAYMOND'
//   //   },
//   //   {
//   //     id: 'partner-41',
//   //     image: '/Partners/RUNWAL.png',
//   //     title: 'RUNWAL'
//   //   },
//   //   {
//   //     id: 'partner-42',
//   //     image: '/Partners/Ruparel Realty.jpg',
//   //     title: 'Ruparel Realty'
//   //   },
//   //   {
//   //     id: 'partner-43',
//   //     image: '/Partners/Rustomjee.png',
//   //     title: 'Rustomjee'
//   //   },
//   //   {
//   //     id: 'partner-44',
//   //     image: '/Partners/S Raheja.png',
//   //     title: 'S Raheja'
//   //   },
//   //   {
//   //     id: 'partner-45',
//   //     image: '/Partners/Sadguru.png',
//   //     title: 'Sadguru'
//   //   },
//   //   {
//   //     id: 'partner-46',
//   //     image: '/Partners/Shapoorji Pallonji.jpg',
//   //     title: 'Shapoorji Pallonji'
//   //   },
//   //   {
//   //     id: 'partner-47',
//   //     image: '/Partners/SUNTECK.png',
//   //     title: 'SUNTECK'
//   //   },
//   //   {
//   //     id: 'partner-48',
//   //     image: '/Partners/Supreme.jpg',
//   //     title: 'Supreme'
//   //   },
//   //   {
//   //     id: 'partner-49',
//   //     image: '/Partners/Tribeca.png',
//   //     title: 'Tribeca'
//   //   },
//   //   {
//   //     id: 'partner-50',
//   //     image: '/Partners/Wadhwa group.jpeg',
//   //     title: 'Wadhwa group'
//   //   }
//   // ];

//   return (
//     <div className="min-h-screen bg-sippy-beige">
//       <Navbar />

//       {/* Hero Section */}
//       <section className="pt-24 pb-8 bg-gradient-to-b from-sippy-light to-white">
//         <div className="section-container">
//           <div className="text-center max-w-4xl mx-auto">
//             <h1 className="text-4xl md:text-6xl font-bold text-sippy-charcoal mb-6 font-playfair">
//               About <span className="text-sippy-gold">Sippy Housing</span>
//             </h1>
//             <div className="gold-divider"></div>
//             <p className="text-lg md:text-xl text-sippy-charcoal/80 leading-relaxed mb-6 max-w-4xl mx-auto">
//               Founded in 1992 by Sanjay Sippy, Sippy Housing is a trusted name in luxury real estate advisory in Mumbai.
//               We specialize in Luxury and Uber-Luxury homes, focusing on some of the city's most sought-after locations
//               including South Mumbai, Worli, Bandra, Khar, Santacruz, and Juhu.
//             </p>
//             <p className="text-lg md:text-xl text-sippy-charcoal/80 leading-relaxed mb-6 max-w-4xl mx-auto">
//               We deal in premium residences, high-end commercial spaces, prime land parcels, plots, and redevelopment
//               opportunities, offering end-to-end support from property discovery to deal closure ensuring a smooth and
//               transparent experience for our clients.
//             </p>
//             <p className="text-lg md:text-xl text-sippy-charcoal/80 leading-relaxed mb-8 max-w-4xl mx-auto">
//               At Sippy Housing, we believe real estate is not just about transactions, but about building trust, value,
//               and long-term satisfaction. We work to bring happiness by offering holistic, practical, and well-informed
//               real estate solutions that truly work for our clients.
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* Team Members Section */}
//       <section className="pt-8 pb-8 bg-white">
//         <div className="section-container">
//           <div className="text-center mb-16">
//             <h2 className="section-title">Our <span className="text-sippy-gold">Team</span></h2>
//             <p className="text-lg md:text-xl mb-12 text-sippy-charcoal/80 max-w-3xl mx-auto">
//               Meet the dedicated professionals who make Sippy Housing a trusted name in real estate
//             </p>
//           </div>
//           <div className="property-card group text-center border-2 border-sippy-gold/30 hover:border-sippy-gold transition-all duration-300 mb-6">
//             <div className="relative overflow-hidden">
//               <img
//                 src="/Team/Sanjay.avif"
//                 alt="Sanjay Sippy"
//                 className="w-full h-64 object-contain bg-gray-100 group-hover:scale-105 transition-transform duration-300"
//                 onError={(e) => {
//                   const target = e.target as HTMLImageElement;
//                   target.src = '/Team/placeholder.jpg';
//                 }}
//               />
//               <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//             </div>
//             <div className="p-6">
//               <h3 className="text-xl font-bold text-sippy-charcoal mb-2 font-playfair">
//                 Sanjay Sippy
//               </h3>
//               <p className="text-sippy-gold font-medium mb-3">
//                 Promoter and Founder
//               </p>
//               <p className="text-sippy-charcoal/70 text-sm leading-relaxed">
//                 Visionary leader with over 30 years of experience in real estate development and strategic planning.
//               </p>
//             </div>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
//             {teamMembers.map((member, index) => (
//               <div key={index} className="property-card group text-center border-2 border-sippy-gold/30 hover:border-sippy-gold transition-all duration-300">
//                 <div className="relative overflow-hidden">
//                   <img
//                     src={member.image}
//                     alt={member.name}
//                     className="w-full h-64 object-contain bg-gray-100 group-hover:scale-105 transition-transform duration-300"
//                     onError={(e) => {
//                       const target = e.target as HTMLImageElement;
//                       target.src = '/Team/placeholder.jpg';
//                     }}
//                   />
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//                 </div>
//                 <div className="p-6">
//                   <h3 className="text-xl font-bold text-sippy-charcoal mb-2 font-playfair">
//                     {member.name}
//                   </h3>
//                   <p className="text-sippy-gold font-medium mb-3">
//                     {member.designation}
//                     {member.company && (
//                       <span className="block text-sm text-sippy-charcoal/70 mt-1">
//                         {member.company}
//                       </span>
//                     )}
//                   </p>
//                   <p className="text-sippy-charcoal/70 text-sm leading-relaxed">
//                     {member.description}
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Our Partners Section - Compact Grid with View All */}
//       <section className="py-8 bg-sippy-light">
//         <div className="section-container">
//           <div className="text-center mb-8">
//             <h2 className="section-title">Our <span className="text-sippy-gold">Partners</span></h2>
//             <p className="text-lg md:text-xl mb-8 text-sippy-charcoal/80 max-w-3xl mx-auto">
//               Building strong relationships with industry leaders, community organizations, and strategic partners
//             </p>
//           </div>

//           {(() => {
//             // const initialPartnersToShow = 15;
//             // const visiblePartners = showAllPartners ? partnerImages : partnerImages.slice(0, initialPartnersToShow);
//             const visiblePartners = showAllPartners
//               ? partners
//               : partners.slice(0, 15);

//             return (
//               <div>
//                 <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-5 gap-6 md:gap-8">
//                   {visiblePartners.map((partner) => (
//                     <div key={partner.id} className="bg-white rounded-md border border-gray-100 hover:border-sippy-gold/40 shadow-sm hover:shadow-md transition p-3 flex items-center justify-center">
//                       <img
//                         src={partner.image}
//                         alt={partner.title || 'Partner Logo'}
//                         className="w-full h-20 md:h-24 object-contain"
//                         onError={(e) => {
//                           const target = e.target as HTMLImageElement;
//                           target.src = '/placeholder.svg';
//                         }}
//                       />
//                     </div>
//                   ))}
//                 </div>

//                 {partnerImages.length > initialPartnersToShow && (
//                   <div className="text-center mt-8">
//                     <button
//                       onClick={() => setShowAllPartners(!showAllPartners)}
//                       className="btn-outline"
//                     >
//                       {showAllPartners ? 'View less' : 'View all'}
//                     </button>
//                   </div>
//                 )}
//               </div>
//             );
//           })()}
//         </div>
//       </section>

//       {/* Awards and Recognition Section - Compact Grid with View All */}
//       <section className="py-8 bg-sippy-light">
//         <div className="section-container">
//           <div className="text-center mb-8">
//             <h2 className="section-title">Awards & <span className="text-sippy-gold">Recognition</span></h2>
//             <p className="text-lg md:text-xl mb-8 text-sippy-charcoal/80 max-w-3xl mx-auto">
//               Our commitment to excellence has been recognized by industry leaders and clients
//             </p>
//           </div>

//           {(() => {
//             // const initialAwardsToShow = 10;
//             // const visibleAwards = showAllAwards ? allAwards : allAwards.slice(0, initialAwardsToShow);
//             const visibleAwards = showAllAwards
//   ? awards
//   : awards.slice(0, 10);

//             return (
//               <div>
//                 <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-5 gap-6 md:gap-8">
//                   {visibleAwards.map((award) => {
//                     const isPdf = (award as any).file?.toLowerCase().endsWith('.pdf');
//                     return (
//                       <div key={award.id} className="bg-white rounded-md border border-gray-100 hover:border-sippy-gold/40 shadow-sm hover:shadow-md transition p-3">
//                         {isPdf ? (
//                           <div className="w-full h-40 md:h-48 flex items-center justify-center overflow-hidden">
//                             <object
//                               data={(award as any).file + '#toolbar=0&navpanes=0&scrollbar=0'}
//                               type="application/pdf"
//                               className="w-full h-full pointer-events-none"
//                               aria-label={(award as any).title || 'Award PDF'}
//                             >
//                               <img
//                                 src={'/placeholder.svg'}
//                                 alt={(award as any).title || 'Award PDF'}
//                                 className="max-w-full max-h-full object-contain"
//                               />
//                             </object>
//                           </div>
//                         ) : (
//                           <div className="w-full h-40 md:h-48 flex items-center justify-center overflow-hidden">
//                             <img
//                               src={(award as any).image}
//                               alt={award.title || 'Award'}
//                               className="max-w-full max-h-full object-contain"
//                               onError={(e) => {
//                                 const target = e.target as HTMLImageElement;
//                                 target.src = '/placeholder.svg';
//                               }}
//                             />
//                           </div>
//                         )}
//                       </div>
//                     );
//                   })}
//                 </div>

//                 {allAwards.length > initialAwardsToShow && (
//                   <div className="text-center mt-8">
//                     <button
//                       onClick={() => setShowAllAwards(!showAllAwards)}
//                       className="btn-outline"
//                     >
//                       {showAllAwards ? 'View less' : 'View all'}
//                     </button>
//                   </div>
//                 )}
//               </div>
//             );
//           })()}
//         </div>
//       </section>

//       {/* Proud Member Section - Fixed Grid */}
//       <section className="py-8 bg-white">
//         <div className="section-container">
//           <div className="text-center mb-16">
//             <h2 className="section-title">Proud <span className="text-sippy-gold">Members</span></h2>
//             <p className="text-lg md:text-xl mb-12 text-sippy-charcoal/80 max-w-3xl mx-auto">
//               We are proud to be associated with leading industry organizations and associations
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
//             {memberOrganizations.map((member) => (
//               <div key={member.id} className="group">
//                 <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 p-8 border border-gray-100 hover:border-sippy-gold/30 text-center">
//                   <div className="flex items-center justify-center h-24 mb-4">
//                     <img
//                       src={member.image}
//                       alt={member.name || 'Member Organization'}
//                       className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
//                       onError={(e) => {
//                         const target = e.target as HTMLImageElement;
//                         target.src = '/placeholder.svg';
//                       }}
//                     />
//                   </div>
//                   <div>
//                     <h3 className="text-lg font-medium text-sippy-charcoal mb-2 text-center">
//                       {member.name}
//                     </h3>
//                     {member.description && (
//                       <p className="text-sm text-sippy-charcoal/70 text-center">
//                         {member.description}
//                       </p>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Exhibition Photos Section - Auto Slideshow */}
//       <section className="py-8 bg-sippy-light">
//         <div className="section-container">
//           <div className="text-center mb-16">
//             <h2 className="section-title">Exhibition <span className="text-sippy-gold">Gallery</span></h2>
//             <p className="text-lg md:text-xl mb-12 text-sippy-charcoal/80 max-w-3xl mx-auto">
//               Showcasing our presence at industry exhibitions and events
//             </p>
//           </div>

//           <ExhibitionCarousel />
//         </div>
//       </section>



//       {/* Call to Action Section */}
//       <section className="py-8 bg-sippy-charcoal text-white">
//         <div className="section-container text-center">
//           <h2 className="text-3xl md:text-4xl font-bold mb-6 font-playfair">
//             Ready to Find Your Dream Property?
//           </h2>
//           <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
//             Let our experienced team guide you through your real estate journey with personalized service and expert advice.
//           </p>
//           <div className="flex flex-col sm:flex-row gap-4 justify-center">
//             <a href="#contact" className="btn-primary" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
//               Contact Us Today
//             </a>
//             <a href="/" className="btn-outline text-white border-white hover:bg-white hover:text-sippy-charcoal">
//               View Properties
//             </a>
//           </div>
//         </div>
//       </section>

//       <FloatingContact />
//       <ScrollToTop />
//       <Footer />
//     </div>
//   );
// };

// export default AboutUs;


import React, { useState, useEffect } from 'react';
import { supabase } from "@/lib/supabase";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingContact from "@/components/common/FloatingContact";
import ScrollToTop from "@/components/common/ScrollToTop";
import { handleHashNavigation } from "@/lib/navigation";
import ExhibitionCarousel from "@/components/ui/exhibition-carousel";
import TestimonialsSection from "@/components/sections/Testimonials";


/* ─── static member organisations (not managed via admin) ─── */
const memberOrganizations = [
  {
    id: 'nar-india', 
    image: '/member_of/national-association-of-realtors-india-nar-india-logo-png_seeklogo-412945.png',
    name: 'NAR India',
    description: 'National Association of Realtors India',
  },
  {
    id: 'trek',
    image: '/member_of/Trek.png',
    name: 'TREK',
    description: 'Real Estate Knowledge Platform',
  },
  {
    id: 'logo',
    image: '/member_of/logo.png',
    name: 'Industry Partner',
    description: 'Real Estate Industry Association',
  },
];


/* ─── how many items to show before "View all" ─── */
const INITIAL_PARTNERS = 15;
const INITIAL_AWARDS   = 10;

const AboutUs = () => {
  const [showAllPartners, setShowAllPartners] = useState(false);
  const [showAllAwards,   setShowAllAwards]   = useState(false);

  const [teamMembers, setTeamMembers] = useState<any[]>([]);
  const [awards,      setAwards]      = useState<any[]>([]);
  const [partners,    setPartners]    = useState<any[]>([]);
const [testimonials, setTestimonials] = useState([]);
const [reviewForm, setReviewForm] = useState({
  name: "",
  rating: "",
  review: "",
});
  useEffect(() => {
    handleHashNavigation();
    fetchTeamMembers();
    fetchAwards();
    fetchPartners();
    fetchTestimonials();
  }, []);

  const fetchTeamMembers = async () => {
    const { data, error } = await supabase.from('team_members').select('*');
    if (!error && data) setTeamMembers(data);
    else console.error('team_members fetch error:', error);
  };

  const fetchAwards = async () => {
    const { data, error } = await supabase
      .from('awards')
      .select('*')
      .order('id', { ascending: true });
    if (!error && data) setAwards(data);
    else console.error('awards fetch error:', error);
  };

  const fetchPartners = async () => {
    const { data, error } = await supabase
      .from('partners')
      .select('*')
      .order('id', { ascending: true });
    if (!error && data) setPartners(data);
    else console.error('partners fetch error:', error);
  };
  const fetchTestimonials = async () => {
  const { data, error } = await supabase
    .from("testimonials")
    .select("*")
    .order("id", { ascending: false });

  if (!error && data) {
    setTestimonials(data);
  } else {
    console.error(error);
  }
};
const handleReviewSubmit = async (e) => {
  e.preventDefault();

  const { error } = await supabase
    .from("testimonials")
    .insert([reviewForm]);

  if (!error) {
    alert("Thank you for your review!");
    setReviewForm({
      name: "",
      rating: "",
      review: "",
    });

    fetchTestimonials();
  }
};

  /* ── derived lists ── */
  const visiblePartners = showAllPartners ? partners : partners.slice(0, INITIAL_PARTNERS);
  const visibleAwards   = showAllAwards   ? awards   : awards.slice(0, INITIAL_AWARDS);

  return (
    <div className="min-h-screen bg-sippy-beige">
      <Navbar />

      {/* ── Hero ── */}
      <section className="pt-24 pb-8 bg-gradient-to-b from-sippy-light to-white">
        <div className="section-container">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-sippy-charcoal mb-6 font-playfair">
              About <span className="text-sippy-gold">Sippy Housing</span>
            </h1>
            <div className="gold-divider" />
            <p className="text-lg md:text-xl text-sippy-charcoal/80 leading-relaxed mb-6 max-w-4xl mx-auto">
              Founded in 1992 by Sanjay Sippy, Sippy Housing is a trusted name in luxury real estate advisory in Mumbai.
              We specialize in Luxury and Uber-Luxury homes, focusing on some of the city's most sought-after locations
              including South Mumbai, Worli, Bandra, Khar, Santacruz, and Juhu.
            </p>
            <p className="text-lg md:text-xl text-sippy-charcoal/80 leading-relaxed mb-6 max-w-4xl mx-auto">
              We deal in premium residences, high-end commercial spaces, prime land parcels, plots, and redevelopment
              opportunities, offering end-to-end support from property discovery to deal closure ensuring a smooth and
              transparent experience for our clients.
            </p>
            <p className="text-lg md:text-xl text-sippy-charcoal/80 leading-relaxed mb-8 max-w-4xl mx-auto">
              At Sippy Housing, we believe real estate is not just about transactions, but about building trust, value,
              and long-term satisfaction. We work to bring happiness by offering holistic, practical, and well-informed
              real estate solutions that truly work for our clients.
            </p>
          </div>
        </div>
      </section>

      {/* ── Team ── */}
      <section className="pt-8 pb-8 bg-white">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="section-title">Our <span className="text-sippy-gold">Team</span></h2>
            <p className="text-lg md:text-xl mb-12 text-sippy-charcoal/80 max-w-3xl mx-auto">
              Meet the dedicated professionals who make Sippy Housing a trusted name in real estate
            </p>
          </div>

          {/* Founder card — always pinned at top */}
          <div className="property-card group text-center border-2 border-sippy-gold/30 hover:border-sippy-gold transition-all duration-300 mb-6">
            <div className="relative overflow-hidden">
              <img
                src="/Team/Sanjay.avif"
                alt="Sanjay Sippy"
                className="w-full h-64 object-contain bg-gray-100 group-hover:scale-105 transition-transform duration-300"
                onError={(e) => { (e.target as HTMLImageElement).src = '/Team/placeholder.jpg'; }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-sippy-charcoal mb-2 font-playfair">Sanjay Sippy</h3>
              <p className="text-sippy-gold font-medium mb-3">Promoter and Founder</p>
              <p className="text-sippy-charcoal/70 text-sm leading-relaxed">
                Visionary leader with over 30 years of experience in real estate development and strategic planning.
              </p>
            </div>
          </div>

          {/* Dynamic team members from Supabase */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {teamMembers.map((member, index) => (
              <div key={member.id ?? index} className="property-card group text-center border-2 border-sippy-gold/30 hover:border-sippy-gold transition-all duration-300">
                <div className="relative overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-64 object-contain bg-gray-100 group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => { (e.target as HTMLImageElement).src = '/Team/placeholder.jpg'; }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-sippy-charcoal mb-2 font-playfair">{member.name}</h3>
                  <p className="text-sippy-gold font-medium mb-3">
                    {member.designation}
                    {member.company && (
                      <span className="block text-sm text-sippy-charcoal/70 mt-1">{member.company}</span>
                    )}
                  </p>
                  <p className="text-sippy-charcoal/70 text-sm leading-relaxed">{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Partners ── */}
      <section className="py-8 bg-sippy-light">
        <div className="section-container">
          <div className="text-center mb-8">
            <h2 className="section-title">Our <span className="text-sippy-gold">Partners</span></h2>
            <p className="text-lg md:text-xl mb-8 text-sippy-charcoal/80 max-w-3xl mx-auto">
              Building strong relationships with industry leaders, community organisations, and strategic partners
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-5 gap-6 md:gap-8">
            {visiblePartners.map((partner) => (
              <div
                key={partner.id}
                className="bg-white rounded-md border border-gray-100 hover:border-sippy-gold/40 shadow-sm hover:shadow-md transition p-3 flex items-center justify-center"
              >
                <img
                  src={partner.image}
                  alt={partner.name || partner.title || 'Partner Logo'}
                  className="w-full h-20 md:h-24 object-contain"
                  onError={(e) => { (e.target as HTMLImageElement).src = '/placeholder.svg'; }}
                />
              </div>
            ))}
          </div>

          {/* Show "View all / View less" only when there are more than the initial count */}
          {partners.length > INITIAL_PARTNERS && (
            <div className="text-center mt-8">
              <button onClick={() => setShowAllPartners(!showAllPartners)} className="btn-outline">
                {showAllPartners ? 'View less' : `View all (${partners.length})`}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ── Awards ── */}
      <section className="py-8 bg-sippy-light">
        <div className="section-container">
          <div className="text-center mb-8">
            <h2 className="section-title">Awards &amp; <span className="text-sippy-gold">Recognition</span></h2>
            <p className="text-lg md:text-xl mb-8 text-sippy-charcoal/80 max-w-3xl mx-auto">
              Our commitment to excellence has been recognised by industry leaders and clients
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-5 gap-6 md:gap-8">
            {visibleAwards.map((award) => (
              <div
                key={award.id}
                className="bg-white rounded-md border border-gray-100 hover:border-sippy-gold/40 shadow-sm hover:shadow-md transition p-3"
              >
                <div className="w-full h-40 md:h-48 flex items-center justify-center overflow-hidden">
                  <img
                    src={award.image}
                    alt={award.title || 'Award'}
                    className="max-w-full max-h-full object-contain"
                    onError={(e) => { (e.target as HTMLImageElement).src = '/placeholder.svg'; }}
                  />
                </div>
                {/* {award.title && (
                  <p className="text-center text-xs text-sippy-charcoal/70 mt-2 font-medium line-clamp-2">
                    {award.title}
                  </p>
                )}
                {award.year && (
                  <p className="text-center text-xs text-sippy-gold font-bold mt-1">{award.year}</p>
                )} */}
              </div>
            ))}
          </div>

          {/* Show "View all / View less" only when there are more than the initial count */}
          {awards.length > INITIAL_AWARDS && (
            <div className="text-center mt-8">
              <button onClick={() => setShowAllAwards(!showAllAwards)} className="btn-outline">
                {showAllAwards ? 'View less' : `View all (${awards.length})`}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ── Proud Members ── */}
      <section className="py-8 bg-white">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="section-title">Proud <span className="text-sippy-gold">Members</span></h2>
            <p className="text-lg md:text-xl mb-12 text-sippy-charcoal/80 max-w-3xl mx-auto">
              We are proud to be associated with leading industry organisations and associations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {memberOrganizations.map((member) => (
              <div key={member.id} className="group">
                <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 p-8 border border-gray-100 hover:border-sippy-gold/30 text-center">
                  <div className="flex items-center justify-center h-24 mb-4">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => { (e.target as HTMLImageElement).src = '/placeholder.svg'; }}
                    />
                  </div>
                  <h3 className="text-lg font-medium text-sippy-charcoal mb-2 text-center">{member.name}</h3>
                  {member.description && (
                    <p className="text-sm text-sippy-charcoal/70 text-center">{member.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Exhibition Gallery ── */}
      <section className="py-8 bg-sippy-light">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="section-title">Exhibition <span className="text-sippy-gold">Gallery</span></h2>
            <p className="text-lg md:text-xl mb-12 text-sippy-charcoal/80 max-w-3xl mx-auto">
              Showcasing our presence at industry exhibitions and events
            </p>
          </div>
          <ExhibitionCarousel />
        </div>
      </section>

    {/* Team Members Section */}
  
     <section>
   {/* ✅ ADD HERE */}
      <TestimonialsSection />

     </section>
   


     
        ...



























      {/* Testimonials */}
{/* <section className="py-12 bg-white">
  <div className="section-container">

    <div className="text-center mb-12">
      <h2 className="section-title">
        Client <span className="text-sippy-gold">Reviews</span>
      </h2>

      <p className="text-lg text-sippy-charcoal/80">
        What our valued clients say about us
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {testimonials.map((item) => (
        <div
          key={item.id}
          className="bg-sippy-light rounded-lg p-6 shadow-sm border border-sippy-gold/20"
        >
          <div className="text-sippy-gold text-xl mb-3">
            {"⭐".repeat(item.rating)}
          </div>

          <p className="text-sippy-charcoal/80 italic mb-4">
            "{item.review}"
          </p>

          <h4 className="font-semibold text-sippy-charcoal">
            {item.name}
          </h4>
        </div>
      ))}
    </div>

  </div>
</section> */}
{/* Review Form */}
<section className="py-12 bg-sippy-light">
  <div className="section-container">

    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-sm border border-sippy-gold/20">

      <div className="text-center mb-8">
        <h2 className="section-title">
          Share Your <span className="text-sippy-gold">Experience</span>
        </h2>
      </div>

      <form
        onSubmit={handleReviewSubmit}
        className="space-y-5"
      >

        <input
          type="text"
          placeholder="Your Name"
          value={reviewForm.name}
          onChange={(e) =>
            setReviewForm({
              ...reviewForm,
              name: e.target.value,
            })
          }
          className="w-full border rounded-md px-4 py-3"
          required
        />

        <select
          value={reviewForm.rating}
          onChange={(e) =>
            setReviewForm({
              ...reviewForm,
              rating: e.target.value,
            })
          }
          className="w-full border rounded-md px-4 py-3"
          required
        >
          <option value="">
            Select Rating
          </option>
          <option value="5">
            ⭐⭐⭐⭐⭐
          </option>
          <option value="4">
            ⭐⭐⭐⭐
          </option>
          <option value="3">
            ⭐⭐⭐
          </option>
          <option value="2">
            ⭐⭐
          </option>
          <option value="1">
            ⭐
          </option>
        </select>

        <textarea
          rows={5}
          placeholder="Write your review..."
          value={reviewForm.review}
          onChange={(e) =>
            setReviewForm({
              ...reviewForm,
              review: e.target.value,
            })
          }
          className="w-full border rounded-md px-4 py-3"
          required
        />

        <button
          type="submit"
          className="btn-primary w-full"
        >
          Submit Review
        </button>

      </form>

    </div>

  </div>
</section>

      {/* ── CTA ── */}
      <section className="py-8 bg-sippy-charcoal text-white">
        <div className="section-container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 font-playfair">
            Ready to Find Your Dream Property?
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
            Let our experienced team guide you through your real estate journey with personalised service and expert advice.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#contact"
              className="btn-primary"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Contact Us Today
            </a>
            <a href="/" className="btn-outline text-white border-white hover:bg-white hover:text-sippy-charcoal">
              View Properties
            </a>
          </div>
        </div>
      </section>

      <FloatingContact />
      <ScrollToTop />
      <Footer />
    </div>
  );
};

export default AboutUs;
