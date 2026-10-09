// import { useLocation, useNavigate, useParams } from "react-router-dom";
// import { ArrowLeft, MapPin, Home, IndianRupee, Building, Calendar, Phone, Calendar as CalendarIcon, MessageCircle, Heart, HeartOff, Video, Play } from "lucide-react";
// import Navbar from "@/components/layout/Navbar";
// import Footer from "@/components/layout/Footer";
// import { useEffect, useState } from "react";
// import Watermark from "@/components/sections/Watermark";
// import { useCart } from "@/contexts/CartContext";
// import { handleHashNavigation } from "@/lib/navigation";
// import { Property } from "@/lib/supabase";
// import { propertyService, PropertyImage } from "@/services/propertyService";
// import { getPropertyPriceStr, formatPriceWithCommas, getPriceInWords } from "@/lib/utils";
// import { getCategoryBySlug } from "@/config/propertyCategories";
// import { getContactNumberByProperty, getWhatsAppHref } from "@/lib/contactRouting";


// const PropertyDetails = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { id: paramId } = useParams();
//   const stateProperty: Property | undefined = location.state?.property;
//   const [fullProperty, setFullProperty] = useState<Property | null>(null);
//   const [propertyImages, setPropertyImages] = useState<PropertyImage[]>([]);
//   const property: Property | undefined = fullProperty ?? stateProperty;
//   const { addToCart, removeFromCart, isInCart } = useCart();

//   // First image URL for hero/display (from property_images table; landing page uses this)
//   const propertyImageUrl = propertyImages.length > 0 ? propertyImages[0].image_url : (property as { image?: string })?.image ?? "/placeholder.svg";

//   useEffect(() => {
//     window.scrollTo(0, 0);
//     handleHashNavigation();
//   }, []);

//   // Fetch full property by id when we have id (from URL or state) so we get unit_variants etc.
//   useEffect(() => {
//     const id = paramId ?? stateProperty?.id;
//     if (id) {
//       propertyService.getPropertyById(id).then((p) => setFullProperty(p ?? null));
//     } else if (stateProperty) {
//       setFullProperty(stateProperty as Property);
//     }
//   }, [paramId, stateProperty?.id]);

//   // Fetch property images from property_images table (same source as landing page cards)
//   useEffect(() => {
//     const id = property?.id;
//     if (!id) {
//       setPropertyImages([]);
//       return;
//     }
//     propertyService.getPropertyImages(id).then((images) => setPropertyImages(images));
//   }, [property?.id]);


//   const handleRequestCall = () => {
//     const phone = property.contact_number || getContactNumberByProperty(property);
//     window.open(`tel:${phone}`, '_self');
//   };

//   const handleWhatsApp = () => {
//     const phone = (property.contact_number || getContactNumberByProperty(property)).replace(/\D/g, '');
//     const message = `Hi! I'm interested in the property "${property.header ?? (property as { title?: string }).title ?? ''}" at ${property.location}. Could you please provide more details?`;
//     window.open(getWhatsAppHref(phone, message), '_blank');
//   };

//   const handleToggleFavorite = () => {
//     if (!property) return;
    
//     if (isInCart(property.id)) {
//       removeFromCart(property.id);
//     } else {
//       addToCart({
//         id: property.id,
//         title: property.header ?? (property as { title?: string }).title ?? 'Property',
//         location: property.location,
//         price: property.price || 'Price on request',
//         type: (property as { type?: string }).type || property.primary_category || 'Property',
//         image: propertyImageUrl,
//         source: 'property'
//       });
//     }
//   };

//   if (paramId && !property) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <p>Loading property...</p>
//       </div>
//     );
//   }

//   if (!property) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <p>Property not found</p>
//       </div>
//     );
//   }

//   const displayTitle = property.header ?? (property as { title?: string }).title ?? '';
//   const resolvedContactNumber = property.contact_number || getContactNumberByProperty(property);

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Navbar />
//       <main className="container mx-auto px-4 py-8 mt-20">
//         <button
//           onClick={() => navigate(-1)}
//           className="flex items-center text-sippy-gold hover:text-sippy-charcoal mb-6"
//         >
//           <ArrowLeft className="h-4 w-4 mr-2" />
//           Back to Properties
//         </button>
//         {/* {propertyImageUrl && propertyImageUrl !== "/placeholder.svg" && <Watermark link={propertyImageUrl} />} */}

//         <div className="bg-white rounded-lg shadow-lg overflow-hidden">
//           {/* Hero Image - fixed size so it doesn't scale too large */}
//           {/* <div className="w-full h-[400px] min-h-[400px] max-h-[400px] overflow-hidden bg-gray-100">
//             <img
//               src={propertyImageUrl}
//               alt={displayTitle || "Property"}
//               className="w-full h-full object-cover object-center"
//             />
//           </div> */}

//           {/* Property Info */}
//           <div className="p-8">
//             <div className="flex justify-between items-start mb-6">
//               <div>
//                 <h1 className="text-3xl font-bold text-sippy-charcoal mb-2">
//                   {displayTitle}
//                 </h1>
//                 <div className="flex items-center text-gray-600">
//                   <MapPin className="h-5 w-5 mr-2" />
//                   <span>{property.location || property.sub_location || "—"}</span>
//                 </div>
//               </div>
//               <div className="flex items-center gap-3">
//                 <button
//                   onClick={handleToggleFavorite}
//                   className={`p-3 rounded-full transition-colors ${
//                     isInCart(property.id)
//                       ? 'bg-red-500 text-white hover:bg-red-600'
//                       : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
//                   }`}
//                 >
//                   {isInCart(property.id) ? (
//                     <Heart className="h-6 w-6 fill-current" />
//                   ) : (
//                     <HeartOff className="h-6 w-6" />
//                   )}
//                 </button>
//                 {(property.primary_category || property.usage_type || property.usage_type_category || (property as { type?: string }).type) && (
//                   <div className="bg-sippy-gold text-white px-4 py-2 rounded-full">
//                     {(property as { type?: string }).type === "premium"
//                       ? "Premium"
//                       : (property as { type?: string }).type === "budget"
//                         ? "Budget"
//                         : property.usage_type || property.usage_type_category || getCategoryBySlug(property.primary_category || "")?.name || property.primary_category || "Property"}
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Key Details */}
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//               <div className="bg-gray-50 p-4 rounded-lg">
//                 <div className="flex items-center mb-2">
//                   <IndianRupee className="h-5 w-5 text-sippy-gold mr-2" />
//                   <span className="font-semibold">Price</span>
//                 </div>
//                 {(() => {
//                   const priceStr = getPropertyPriceStr(property) || property.price || '';
//                   const inWords = getPriceInWords(priceStr);
//                   const figures = formatPriceWithCommas(priceStr);
//                   if (!inWords) {
//                     return <p className="text-lg font-medium">{priceStr || 'Price on request'}</p>;
//                   }
//                   return (
//                     <>
//                       <p className="text-lg font-medium">₹ {figures}</p>
//                       <p className="text-sm text-gray-600 mt-1">({inWords})</p>
//                     </>
//                   );
//                 })()}
//               </div>

//               {(property.size || property.area || property.flat_size || property.plot_size || property.built_up_area || property.constructed_area) && (
//                 <div className="bg-gray-50 p-4 rounded-lg">
//                   <div className="flex items-center mb-2">
//                     <Home className="h-5 w-5 text-sippy-gold mr-2" />
//                     <span className="font-semibold">Size</span>
//                   </div>
//                   <p className="text-lg">
//                     {property.size || property.area || property.flat_size || property.plot_size || property.built_up_area || property.constructed_area || "—"}
//                   </p>
//                 </div>
//               )}

//               {(property.bhk_options?.length || property.bhk || property.configuration_international) && (
//                 <div className="bg-gray-50 p-4 rounded-lg">
//                   <div className="flex items-center mb-2">
//                     <Building className="h-5 w-5 text-sippy-gold mr-2" />
//                     <span className="font-semibold">BHK / Configuration</span>
//                   </div>
//                   <p className="text-lg">
//                     {property.bhk_options?.join(", ") || property.bhk || property.configuration_international || "—"}
//                   </p>
//                 </div>
//               )}

//               {(property.possession || property.possession_date) && (
//                 <div className="bg-gray-50 p-4 rounded-lg">
//                   <div className="flex items-center mb-2">
//                     <Calendar className="h-5 w-5 text-sippy-gold mr-2" />
//                     <span className="font-semibold">Possession</span>
//                   </div>
//                   <p className="text-lg">{property.possession || property.possession_date}</p>
//                 </div>
//               )}
//             </div>

//             {/* Additional Details - all fields mapped to DB (Property interface) */}
//             <div className="border-t pt-8">
//               <h2 className="text-2xl font-bold text-sippy-charcoal mb-4">Property Details</h2>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <h3 className="font-semibold mb-2">Project Details</h3>
//                   <ul className="space-y-2">
//                     {(property.builder != null && property.builder !== "") && (
//                       <li><span className="font-medium">Builder:</span> {property.builder}</li>
//                     )}
//                     {(property.units != null || property.towers != null || property.acres != null) && (
//                       <>
//                         {property.units != null && <li><span className="font-medium">Total Units:</span> {property.units}</li>}
//                         {property.towers != null && <li><span className="font-medium">Number of Towers:</span> {property.towers}</li>}
//                         {property.acres != null && <li><span className="font-medium">Land Area:</span> {property.acres} acres</li>}
//                       </>
//                     )}
//                     {property.storey && <li><span className="font-medium">Storey:</span> {property.storey}</li>}
//                     {property.society_property_name && <li><span className="font-medium">Society / Property:</span> {property.society_property_name}</li>}
//                     {!(property.builder || property.units != null || property.towers != null || property.acres != null || property.storey || property.society_property_name) && (
//                       <li className="text-gray-500">—</li>
//                     )}
//                   </ul>
//                 </div>
//                 <div>
//                   <h3 className="font-semibold mb-2">Unit Details</h3>
//                   <ul className="space-y-2">
//                     {property.units != null && <li><span className="font-medium">Available Units:</span> {property.units}</li>}
//                     {(property.bhk_options?.length || property.bhk) && (
//                       <li><span className="font-medium">BHK Types:</span> {property.bhk_options?.join(", ") || property.bhk}</li>
//                     )}
//                     {(property.size || property.area || property.flat_size) && (
//                       <li><span className="font-medium">Size Range:</span> {property.size || property.area || property.flat_size}</li>
//                     )}
//                     {property.usage_type_category && <li><span className="font-medium">Usage:</span> {property.usage_type_category}</li>}
//                     {!(property.units != null || property.bhk_options?.length || property.bhk || property.size || property.area || property.flat_size || property.usage_type_category) && (
//                       <li className="text-gray-500">—</li>
//                     )}
//                   </ul>
//                 </div>
//               </div>
//             </div>

//             {/* Contact Information */}
//             <div className="border-t pt-8 mt-8">
//               <h2 className="text-2xl font-bold text-sippy-charcoal mb-4">Contact Information</h2>
//               <div className="bg-gray-50 p-6 rounded-lg">
//                 <div className="flex items-center mb-4">
//                   <Phone className="h-6 w-6 text-sippy-gold mr-3" />
//                   <div>
//                     <h3 className="font-semibold text-lg">Sales Team</h3>
//                     <p className="text-gray-600">Get in touch with our sales team</p>
//                   </div>
//                 </div>
//                 <div className="flex items-center">
//                   <span className="font-medium text-xl text-sippy-charcoal">{resolvedContactNumber}</span>
//                 </div>
//               </div>
//             </div>

//             {/* CTA Section */}
//             <div className="border-t pt-8 mt-8">
//               <h2 className="text-2xl font-bold text-sippy-charcoal mb-6">Interested in this Property?</h2>
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                 {/* Schedule a Visit */}
//                 <button 
//                   onClick={handleWhatsApp}
//                   className="bg-sippy-gold hover:bg-sippy-gold/90 text-white px-6 py-4 rounded-lg flex items-center justify-center space-x-3 transition-colors duration-300 shadow-lg hover:shadow-xl"
//                 >
//                   <CalendarIcon className="h-5 w-5" />
//                   <span className="font-semibold">Schedule a Visit</span>
//                 </button>

//                 {/* Request a Call */}
//                 <button 
//                   onClick={handleRequestCall}
//                   className="bg-sippy-charcoal hover:bg-sippy-charcoal/90 text-white px-6 py-4 rounded-lg flex items-center justify-center space-x-3 transition-colors duration-300 shadow-lg hover:shadow-xl"
//                 >
//                   <Phone className="h-5 w-5" />
//                   <span className="font-semibold">Request a Call</span>
//                 </button>

//                 {/* WhatsApp Now */}
//                 <button 
//                   onClick={handleWhatsApp}
//                   className="bg-green-600 hover:bg-green-700 text-white px-6 py-4 rounded-lg flex items-center justify-center space-x-3 transition-colors duration-300 shadow-lg hover:shadow-xl"
//                 >
//                   <MessageCircle className="h-5 w-5" />
//                   <span className="font-semibold">WhatsApp Now</span>
//                 </button>
//               </div>
//             </div>

//             {/* Video Links */}
//             {property.video_links && property.video_links.length > 0 && (
//               <div className="border-t pt-8 mt-8">
//                 <h2 className="text-2xl font-bold text-sippy-charcoal mb-4 flex items-center">
//                   <Video className="h-6 w-6 mr-2 text-sippy-gold" />
//                   Video Links
//                 </h2>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   {property.video_links.map((videoUrl: string, index: number) => (
//                     <a
//                       key={index}
//                       href={videoUrl}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="relative group bg-gray-900 rounded-lg overflow-hidden hover:opacity-90 transition-opacity"
//                     >
//                       <div className="aspect-video flex items-center justify-center">
//                         <Play className="h-16 w-16 text-white opacity-80 group-hover:opacity-100 transition-opacity" />
//                       </div>
//                       <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 p-3">
//                         <p className="text-white text-sm truncate">{videoUrl}</p>
//                       </div>
//                     </a>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* Photo Gallery - from property_images table */}
//             {propertyImages.length > 0 && (
//               <div className="border-t pt-8 mt-8">
//                 <h2 className="text-2xl font-bold text-sippy-charcoal mb-4">Photo Gallery</h2>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
//                   {propertyImages.map((img) => (
//                     <div key={img.id} className="aspect-square overflow-hidden rounded-lg">
//                       <Watermark link={img.image_url} />
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* Category-Specific Details */}
//             {property.primary_category && (
//               <div className="border-t pt-8 mt-8">
//                 <h2 className="text-2xl font-bold text-sippy-charcoal mb-4">Additional Details</h2>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   {/* Luxury Category Fields */}
//                   {property.primary_category === 'luxury' && (
//                     <>
//                       {property.view && (
//                         <div>
//                           <span className="font-medium">View:</span> {property.view}
//                         </div>
//                       )}
//                       {property.size && (
//                         <div>
//                           <span className="font-medium">Size:</span> {property.size}
//                         </div>
//                       )}
//                       {property.configuration_type && (
//                         <div>
//                           <span className="font-medium">Configuration:</span> {property.configuration_type}
//                         </div>
//                       )}
//                       {/* {property.is_plot_or_villa !== undefined && (
//                         <div>
//                           <span className="font-medium">Type:</span> {property.is_plot_or_villa ? 'Plot' : 'Villa'}
//                         </div>
//                       )} */}
//                     </>
//                   )}

//                   {/* New Project Category Fields */}
//                   {property.primary_category === 'new-project' && (
//                     <>
//                       {property.bhk_options && property.bhk_options.length > 0 && (
//                         <div>
//                           <span className="font-medium">Available BHK:</span> {property.bhk_options.join(', ')}
//                         </div>
//                       )}
//                       {property.storey && (
//                         <div>
//                           <span className="font-medium">Storey:</span> {property.storey}
//                         </div>
//                       )}
//                       {property.area && (
//                         <div>
//                           <span className="font-medium">Total Area:</span> {property.area}
//                         </div>
//                       )}
//                       {property.possession && (
//                         <div>
//                           <span className="font-medium">Possession:</span> {property.possession}
//                         </div>
//                       )}
//                       {property.rera_number && (
//                         <div>
//                           <span className="font-medium">RERA Number:</span> {property.rera_number}
//                         </div>
//                       )}
//                       {/* Unit-wise pricing: variants table or single area/price per type */}
//                       {property.unit_variants && property.unit_variants.length > 0 ? (
//                         <div className="col-span-full mt-4">
//                           <span className="font-medium block mb-2">Unit-wise pricing</span>
//                           <div className="overflow-x-auto border rounded-md">
//                             <table className="w-full text-sm">
//                               <thead>
//                                 <tr className="bg-muted">
//                                   <th className="text-left p-2">Type</th>
//                                   <th className="text-left p-2">Variant</th>
//                                   <th className="text-left p-2">Area</th>
//                                   <th className="text-left p-2">Price</th>
//                                 </tr>
//                               </thead>
//                               <tbody>
//                                 {property.unit_variants.map((v, i) => (
//                                   <tr key={i} className="border-t">
//                                     <td className="p-2">{v.type}</td>
//                                     <td className="p-2">{v.label || '—'}</td>
//                                     <td className="p-2">{v.area || '—'}</td>
//                                     <td className="p-2">{v.price ? `₹ ${formatPriceWithCommas(v.price) || v.price}` : '—'}</td>
//                                   </tr>
//                                 ))}
//                               </tbody>
//                             </table>
//                           </div>
//                         </div>
//                       ) : (
//                         <>
//                           {[
//                             { label: '1BHK', area: property.bhk_1_area, price: property.price_1bhk },
//                             { label: '2BHK', area: property.bhk_2_area, price: property.price_2bhk },
//                             { label: '3BHK', area: property.bhk_3_area, price: property.price_3bhk },
//                             { label: '4BHK', area: property.bhk_4_area, price: property.price_4bhk },
//                             { label: '5BHK', area: property.bhk_5_area, price: property.price_5bhk },
//                             { label: 'Penthouse', area: property.penthouse_area, price: property.price_penthouse },
//                           ].filter((row) => row.area || row.price).map((row) => (
//                             <div key={row.label}>
//                               <span className="font-medium">{row.label}:</span>{' '}
//                               {row.area && <span>Area {row.area}</span>}
//                               {row.area && row.price && ' · '}
//                               {row.price && <span>Price ₹ {formatPriceWithCommas(row.price) || row.price}</span>}
//                             </div>
//                           ))}
//                         </>
//                       )}
//                       {property.duplex_area && (
//                         <div>
//                           <span className="font-medium">Duplex Area:</span> {property.duplex_area}
//                         </div>
//                       )}
//                     </>
//                   )}

//                   {/* Resale & Rental Category Fields */}
//                   {property.primary_category === 'resale-rental' && (
//                     <>
//                       {property.property_type && (
//                         <div>
//                           <span className="font-medium">Listing Type:</span> {property.property_type}
//                         </div>
//                       )}
//                       {property.furnishing_status && (
//                         <div>
//                           <span className="font-medium">Furnishing:</span> {property.furnishing_status}
//                         </div>
//                       )}
//                       {property.floor_number && (
//                         <div>
//                           <span className="font-medium">Floor:</span> {property.floor_number}
//                         </div>
//                       )}
//                       {property.parking && (
//                         <div>
//                           <span className="font-medium">Parking:</span> {property.parking}
//                         </div>
//                       )}
//                       {property.bathrooms != null && (
//                         <div>
//                           <span className="font-medium">Bathrooms:</span> {property.bathrooms}
//                         </div>
//                       )}
//                       {property.age_of_property && (
//                         <div>
//                           <span className="font-medium">Age of Property:</span> {property.age_of_property}
//                         </div>
//                       )}
//                       {property.deposit && (
//                         <div>
//                           <span className="font-medium">Security Deposit:</span> {property.deposit}
//                         </div>
//                       )}
//                       {property.tenure && (
//                         <div>
//                           <span className="font-medium">Lease Duration:</span> {property.tenure} {property.tenure_unit || ''}
//                         </div>
//                       )}
//                       {property.maintenance && (
//                         <div>
//                           <span className="font-medium">Maintenance:</span> {property.maintenance}
//                         </div>
//                       )}
//                       {property.rera_number && (
//                         <div>
//                           <span className="font-medium">RERA Number:</span> {property.rera_number}
//                         </div>
//                       )}
//                     </>
//                   )}

//                   {/* Plots & Lands Category Fields */}
//                   {property.primary_category === 'plots-lands' && (
//                     <>
//                       {property.plot_size && (
//                         <div>
//                           <span className="font-medium">Plot Size:</span> {property.plot_size} {property.plot_size_unit || ''}
//                         </div>
//                       )}
//                       {property.road_width && (
//                         <div>
//                           <span className="font-medium">Road Width:</span> {property.road_width} {property.road_width_unit || ''}
//                         </div>
//                       )}
//                       {property.availability_status && (
//                         <div>
//                           <span className="font-medium">Status:</span> {property.availability_status}
//                         </div>
//                       )}
//                     </>
//                   )}

//                   {/* Redevelopment & JV Category Fields */}
//                   {property.primary_category === 'redevelopment-jv' && (
//                     <>
//                       {property.society_property_name && (
//                         <div>
//                           <span className="font-medium">Society / Property Name:</span> {property.society_property_name}
//                         </div>
//                       )}
//                       {property.plot_size && (
//                         <div>
//                           <span className="font-medium">Plot Size:</span> {property.plot_size}
//                         </div>
//                       )}
//                       {property.number_of_wings != null && (
//                         <div>
//                           <span className="font-medium">Number of Wings:</span> {property.number_of_wings}
//                         </div>
//                       )}
//                       {property.number_of_members != null && (
//                         <div>
//                           <span className="font-medium">Number of Members:</span> {property.number_of_members}
//                         </div>
//                       )}
//                       {property.total_permissible_fsi && (
//                         <div>
//                           <span className="font-medium">Total Permissible FSI:</span> {property.total_permissible_fsi}
//                         </div>
//                       )}
//                       {property.fsi_consumed && (
//                         <div>
//                           <span className="font-medium">FSI Consumed:</span> {property.fsi_consumed}
//                         </div>
//                       )}
//                       {property.balance_fsi && (
//                         <div>
//                           <span className="font-medium">Balance FSI:</span> {property.balance_fsi}
//                         </div>
//                       )}
//                       {property.corpus_amount && (
//                         <div>
//                           <span className="font-medium">Corpus Amount:</span> {property.corpus_amount} {property.corpus_amount_type ? `(${property.corpus_amount_type})` : ''}
//                         </div>
//                       )}
//                       {property.rent && (
//                         <div>
//                           <span className="font-medium">Rent:</span> {property.rent}
//                         </div>
//                       )}
//                       {property.stage && (
//                         <div>
//                           <span className="font-medium">Stage:</span> {property.stage}
//                         </div>
//                       )}
//                       {property.existing_structure_details && (
//                         <div className="md:col-span-2">
//                           <span className="font-medium block mb-2">Existing Structure Details:</span>
//                           <p className="text-gray-600">{property.existing_structure_details}</p>
//                         </div>
//                       )}
//                       {property.commercial_terms && (
//                         <div className="md:col-span-2">
//                           <span className="font-medium block mb-2">Commercial Terms:</span>
//                           <p className="text-gray-600 whitespace-pre-wrap">{property.commercial_terms}</p>
//                         </div>
//                       )}
//                     </>
//                   )}

//                   {/* Independent Buildings Category Fields */}
//                   {property.primary_category === 'independent-buildings' && (
//                     <>
//                       {property.transaction_option && (
//                         <div>
//                           <span className="font-medium">Transaction Option:</span> {property.transaction_option}
//                         </div>
//                       )}
//                       {property.transaction_option === 'Pre-Leased' && (
//                         <>
//                           {property.pre_leased_sale_price && (
//                             <div>
//                               <span className="font-medium">Sale Price (Pre-Leased):</span>{' '}
//                               {property.pre_leased_sale_price.startsWith('₹') ? property.pre_leased_sale_price : `₹ ${formatPriceWithCommas(property.pre_leased_sale_price) || property.pre_leased_sale_price}`}
//                             </div>
//                           )}
//                           {property.pre_leased_rent_price && (
//                             <div>
//                               <span className="font-medium">Rent Price (Pre-Leased):</span>{' '}
//                               {property.pre_leased_rent_price.startsWith('₹') ? property.pre_leased_rent_price : `₹ ${formatPriceWithCommas(property.pre_leased_rent_price) || property.pre_leased_rent_price}`}
//                             </div>
//                           )}
//                         </>
//                       )}
//                       {property.transaction_option && property.transaction_option !== 'Pre-Leased' && property.price && (
//                         <div>
//                           <span className="font-medium">Price / Rent:</span>{' '}
//                           {property.price.startsWith('₹') ? property.price : `₹ ${formatPriceWithCommas(property.price) || property.price}`}
//                         </div>
//                       )}
//                       {property.deposit && (
//                         <div>
//                           <span className="font-medium">Deposit:</span> {property.deposit}
//                         </div>
//                       )}
//                       {property.tenure && (
//                         <div>
//                           <span className="font-medium">Tenure:</span> {property.tenure} {property.tenure_unit || ''}
//                         </div>
//                       )}
//                       {property.escalation && (
//                         <div>
//                           <span className="font-medium">Escalation:</span> {property.escalation}
//                         </div>
//                       )}
//                     </>
//                   )}

//                   {/* Description */}
//                   {property.description && (
//                     <div className="md:col-span-2">
//                       <span className="font-medium block mb-2">Description:</span>
//                       <p className="text-gray-600">{property.description}</p>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             )}
//           </div>

//         </div>
//       </main>
//       <Footer />
//     </div>
//   );
// };

// export default PropertyDetails;





// import { useLocation, useNavigate, useParams } from "react-router-dom";
// import { ArrowLeft, MapPin, Home, IndianRupee, Building, Calendar, Phone, Calendar as CalendarIcon, MessageCircle, Heart, HeartOff, Video, Play } from "lucide-react";
// import Navbar from "@/components/layout/Navbar";
// import Footer from "@/components/layout/Footer";
// import { useEffect, useState } from "react";
// import Watermark from "@/components/sections/Watermark";
// import { useCart } from "@/contexts/CartContext";
// import { handleHashNavigation } from "@/lib/navigation";
// import { Property } from "@/lib/supabase";
// import { propertyService, PropertyImage } from "@/services/propertyService";
// import { getPropertyPriceStr, formatPriceWithCommas, getPriceInWords } from "@/lib/utils";
// import { getCategoryBySlug } from "@/config/propertyCategories";
// import { getContactNumberByProperty, getWhatsAppHref } from "@/lib/contactRouting";
// import { supabase } from "@/lib/supabase";

// /* ═══════════════════════════════════════════════════════════
//    LEAD CAPTURE FORM — shown once per session on page load
// ═══════════════════════════════════════════════════════════ */
// const SESSION_KEY = "sippy_lead_captured";

// interface LeadFormProps {
//   propertyTitle: string;
//   propertyCategory: string;
//   onClose: () => void;    // dismiss without submitting
//   onDone: () => void;     // after successful save
// }

// const LeadForm = ({ propertyTitle, propertyCategory, onClose, onDone }: LeadFormProps) => {
//   const [step, setStep] = useState<"form" | "saving" | "done">("form");
//   const [err,  setErr]  = useState("");
//   const [form, setForm] = useState({
//     name: "", phone: "", email: "", city: "",
//     propertyType: propertyCategory || "",
//   });

//   const handle = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
//     setForm(p => ({ ...p, [e.target.name]: e.target.value }));

//   const submit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!form.name.trim())  { setErr("Please enter your name.");         return; }
//     if (!form.phone.trim()) { setErr("Please enter your phone number."); return; }
//     setErr("");
//     setStep("saving");

//     try {
//       await supabase.from("visitor_leads").insert([{
//         name:     form.name.trim(),
//         phone:    form.phone.trim(),
//         email:    form.email.trim()  || null,
//         city:     form.city.trim()   || null,
//         interest: `${form.propertyType ? form.propertyType + " – " : ""}${propertyTitle}`,
//       }]);
//     } catch (e) {
//       console.error("Lead save error:", e);
//     }

//     sessionStorage.setItem(SESSION_KEY, "1");
//     setStep("done");
//   };

//   const inp: React.CSSProperties = {
//     width: "100%", padding: "11px 14px", borderRadius: 10,
//     border: "1.5px solid #e5e7eb", fontSize: 14, outline: "none",
//     fontFamily: "inherit", color: "#111827", background: "#fafafa",
//     boxSizing: "border-box", transition: "border-color .2s, box-shadow .2s",
//   };
//   const lbl: React.CSSProperties = {
//     fontSize: 12, fontWeight: 700, color: "#374151",
//     display: "block", marginBottom: 5,
//   };

//   return (
//     <div
//       style={{
//         position: "fixed", inset: 0, zIndex: 9999,
//         background: "rgba(0,0,0,0.65)", backdropFilter: "blur(6px)",
//         display: "flex", alignItems: "center", justifyContent: "center", padding: 16,
//       }}
//     >
//       <style>{`
//         @keyframes popIn { from{transform:scale(.88) translateY(20px);opacity:0} to{transform:scale(1) translateY(0);opacity:1} }
//         @keyframes fadeUp { from{transform:translateY(14px);opacity:0} to{transform:translateY(0);opacity:1} }
//         @keyframes spin   { to{transform:rotate(360deg)} }
//         .lead-inp:focus { border-color:#C9A84C !important; box-shadow:0 0 0 3px rgba(201,168,76,.15) !important; }
//       `}</style>

//       <div style={{
//         background: "#fff", borderRadius: 22, width: "100%", maxWidth: 480,
//         boxShadow: "0 28px 80px rgba(0,0,0,.3)", overflow: "hidden",
//         position: "relative", animation: "popIn .28s cubic-bezier(.34,1.56,.64,1)",
//       }}>
//         {/* Gold top bar */}
//         <div style={{ height: 5, background: "linear-gradient(90deg,#C9A84C,#f0d980,#C9A84C)" }} />

//         {/* Skip / close — always visible */}
//         <button
//           onClick={onClose}
//           style={{
//             position: "absolute", top: 14, right: 16,
//             background: "none", border: "none", fontSize: 13,
//             cursor: "pointer", color: "#9ca3af", fontFamily: "inherit",
//             fontWeight: 600, lineHeight: 1, zIndex: 2,
//           }}
//         >
//           Skip ✕
//         </button>

//         {/* ── DONE ── */}
//         {step === "done" ? (
//           <div style={{ padding: "52px 32px 48px", textAlign: "center", animation: "fadeUp .3s ease" }}>
//             <div style={{
//               width: 72, height: 72, borderRadius: "50%",
//               background: "linear-gradient(135deg,#C9A84C,#e8c96d)",
//               display: "flex", alignItems: "center", justifyContent: "center",
//               fontSize: 32, margin: "0 auto 20px",
//               boxShadow: "0 8px 24px rgba(201,168,76,.35)",
//             }}>✓</div>
//             <h3 style={{ fontSize: 22, fontWeight: 800, color: "#111827", margin: "0 0 10px" }}>
//               You're Registered!
//             </h3>
//             <p style={{ fontSize: 15, color: "#6b7280", margin: "0 0 6px" }}>
//               Thank you,{" "}
//               <strong style={{ color: "#C9A84C" }}>{form.name.split(" ")[0]}</strong>!
//             </p>
//             <p style={{ fontSize: 13, color: "#9ca3af", margin: "0 0 28px" }}>
//               Our team will contact you shortly on{" "}
//               <strong style={{ color: "#374151" }}>{form.phone}</strong>.
//             </p>
//             <button
//               onClick={onDone}
//               style={{
//                 background: "linear-gradient(135deg,#C9A84C,#e8c96d)",
//                 color: "#7a5c1e", border: "none", borderRadius: 12,
//                 padding: "13px 36px", fontSize: 15, fontWeight: 800,
//                 cursor: "pointer", fontFamily: "inherit",
//                 boxShadow: "0 4px 16px rgba(201,168,76,.4)",
//               }}
//             >
//               View Property Details →
//             </button>
//           </div>
//         ) : (
//           /* ── FORM ── */
//           <div style={{ padding: "28px 32px 32px" }}>
//             {/* Header */}
//             <div style={{ marginBottom: 20 }}>
//               <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
//                 <div style={{
//                   width: 42, height: 42, borderRadius: 12, flexShrink: 0,
//                   background: "linear-gradient(135deg,#C9A84C,#e8c96d)",
//                   display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22,
//                 }}>🏠</div>
//                 <div>
//                   <h2 style={{ fontSize: 18, fontWeight: 800, color: "#111827", margin: 0 }}>
//                     Get Property Details
//                   </h2>
//                   <p style={{ fontSize: 12, color: "#9ca3af", margin: 0 }}>
//                     Register free · Our team will call you
//                   </p>
//                 </div>
//               </div>

//               {/* Property badge */}
//               <div style={{
//                 background: "#fef9e7", border: "1px solid #fde68a",
//                 borderRadius: 10, padding: "9px 13px",
//                 fontSize: 13, color: "#92400e", fontWeight: 600,
//                 display: "flex", alignItems: "center", gap: 6,
//               }}>
//                 <span>📍</span>
//                 <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
//                   {propertyTitle}
//                 </span>
//               </div>
//             </div>

//             <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 13 }}>
//               {/* Name */}
//               <div>
//                 <label style={lbl}>Full Name <span style={{ color: "#ef4444" }}>*</span></label>
//                 <input name="name" value={form.name} onChange={handle}
//                   placeholder="e.g. Rahul Sharma"
//                   className="lead-inp" style={inp} />
//               </div>

//               {/* Phone */}
//               <div>
//                 <label style={lbl}>Phone Number <span style={{ color: "#ef4444" }}>*</span></label>
//                 <input name="phone" value={form.phone} onChange={handle}
//                   placeholder="e.g. 9876543210" type="tel"
//                   className="lead-inp" style={inp} />
//               </div>

//               {/* Email + City */}
//               <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
//                 <div>
//                   <label style={lbl}>
//                     Email{" "}
//                     <span style={{ fontSize: 10, color: "#9ca3af", fontWeight: 400 }}>(optional)</span>
//                   </label>
//                   <input name="email" value={form.email} onChange={handle}
//                     placeholder="you@email.com" type="email"
//                     className="lead-inp" style={inp} />
//                 </div>
//                 <div>
//                   <label style={lbl}>
//                     City{" "}
//                     <span style={{ fontSize: 10, color: "#9ca3af", fontWeight: 400 }}>(optional)</span>
//                   </label>
//                   <input name="city" value={form.city} onChange={handle}
//                     placeholder="e.g. Mumbai"
//                     className="lead-inp" style={inp} />
//                 </div>
//               </div>

//               {/* Property Type */}
//               <div>
//                 <label style={lbl}>Property Type</label>
//                 <select name="propertyType" value={form.propertyType} onChange={handle}
//                   className="lead-inp" style={{ ...inp, cursor: "pointer" }}>
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

//               {/* Error */}
//               {err && (
//                 <p style={{
//                   fontSize: 13, color: "#b91c1c", background: "#fef2f2",
//                   border: "1px solid #fca5a5", borderRadius: 8,
//                   padding: "8px 12px", margin: 0,
//                 }}>{err}</p>
//               )}

//               {/* Submit */}
//               <button
//                 type="submit"
//                 disabled={step === "saving"}
//                 style={{
//                   marginTop: 4, height: 52,
//                   background: step === "saving" ? "#e5e7eb" : "linear-gradient(135deg,#C9A84C,#e8c96d)",
//                   color: step === "saving" ? "#9ca3af" : "#7a5c1e",
//                   border: "none", borderRadius: 12,
//                   fontSize: 15, fontWeight: 800,
//                   cursor: step === "saving" ? "not-allowed" : "pointer",
//                   fontFamily: "inherit",
//                   boxShadow: step === "saving" ? "none" : "0 4px 16px rgba(201,168,76,.4)",
//                   display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
//                   width: "100%", transition: "all .2s",
//                 }}
//               >
//                 {step === "saving" ? (
//                   <>
//                     <span style={{
//                       width: 16, height: 16,
//                       border: "2px solid #d1d5db", borderTopColor: "#9ca3af",
//                       borderRadius: "50%", display: "inline-block",
//                       animation: "spin .6s linear infinite",
//                     }} />
//                     Registering…
//                   </>
//                 ) : "Get Property Details"}
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

// /* ═══════════════════════════════════════════════════════════
//    PROPERTY DETAILS PAGE
// ═══════════════════════════════════════════════════════════ */
// const PropertyDetails = () => {
//   const location = useLocation();
//   const navigate  = useNavigate();
//   const { id: paramId } = useParams();

//   const stateProperty: Property | undefined = location.state?.property;
//   const [fullProperty,    setFullProperty]    = useState<Property | null>(null);
//   const [propertyImages,  setPropertyImages]  = useState<PropertyImage[]>([]);
//   const [showLeadForm,    setShowLeadForm]     = useState(false);   // ← lead form visibility

//   const property: Property | undefined = fullProperty ?? stateProperty;
//   const { addToCart, removeFromCart, isInCart } = useCart();

//   const propertyImageUrl =
//     propertyImages.length > 0
//       ? propertyImages[0].image_url
//       : (property as { image?: string })?.image ?? "/placeholder.svg";

//   /* ── on mount: scroll top + show lead form if not already captured ── */
//   useEffect(() => {
//     window.scrollTo(0, 0);
//     handleHashNavigation();
//     if (!sessionStorage.getItem(SESSION_KEY)) {
//       // slight delay so the page renders before the popup appears
//       const t = setTimeout(() => setShowLeadForm(true), 600);
//       return () => clearTimeout(t);
//     }
//   }, []);

//   useEffect(() => {
//     const id = paramId ?? stateProperty?.id;
//     if (id) {
//       propertyService.getPropertyById(id).then(p => setFullProperty(p ?? null));
//     } else if (stateProperty) {
//       setFullProperty(stateProperty as Property);
//     }
//   }, [paramId, stateProperty?.id]);

//   useEffect(() => {
//     const id = property?.id;
//     if (!id) { setPropertyImages([]); return; }
//     propertyService.getPropertyImages(id).then(images => setPropertyImages(images));
//   }, [property?.id]);

//   const handleRequestCall = () => {
//     const phone = property.contact_number || getContactNumberByProperty(property);
//     window.open(`tel:${phone}`, "_self");
//   };

//   const handleWhatsApp = () => {
//     const phone = (property.contact_number || getContactNumberByProperty(property)).replace(/\D/g, "");
//     const message = `Hi! I'm interested in the property "${property.header ?? (property as { title?: string }).title ?? ""}" at ${property.location}. Could you please provide more details?`;
//     window.open(getWhatsAppHref(phone, message), "_blank");
//   };

//   const handleToggleFavorite = () => {
//     if (!property) return;
//     if (isInCart(property.id)) {
//       removeFromCart(property.id);
//     } else {
//       addToCart({
//         id: property.id,
//         title: property.header ?? (property as { title?: string }).title ?? "Property",
//         location: property.location,
//         price: property.price || "Price on request",
//         type: (property as { type?: string }).type || property.primary_category || "Property",
//         image: propertyImageUrl,
//         source: "property",
//       });
//     }
//   };

//   if (paramId && !property) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <p>Loading property...</p>
//       </div>
//     );
//   }
//   if (!property) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <p>Property not found</p>
//       </div>
//     );
//   }

//   const displayTitle        = property.header ?? (property as { title?: string }).title ?? "";
//   const resolvedContactNumber = property.contact_number || getContactNumberByProperty(property);

//   /* friendly category label for the lead form */
//   const categoryLabel =
//     getCategoryBySlug(property.primary_category || "")?.name ||
//     property.primary_category ||
//     "Property";

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Navbar />

//       {/* ── Lead capture form (shown once per session) ── */}
//       {showLeadForm && (
//         <LeadForm
//           propertyTitle={displayTitle || "this property"}
//           propertyCategory={categoryLabel}
//           onClose={() => {
//             sessionStorage.setItem(SESSION_KEY, "1"); // skip on close too
//             setShowLeadForm(false);
//           }}
//           onDone={() => setShowLeadForm(false)}
//         />
//       )}

//       <main className="container mx-auto px-4 py-8 mt-20">
//         <button
//           onClick={() => navigate(-1)}
//           className="flex items-center text-sippy-gold hover:text-sippy-charcoal mb-6"
//         >
//           <ArrowLeft className="h-4 w-4 mr-2" />
//           Back to Properties
//         </button>

//         <div className="bg-white rounded-lg shadow-lg overflow-hidden">
//           {/* Property Info */}
//           <div className="p-8">
//             <div className="flex justify-between items-start mb-6">
//               <div>
//                 <h1 className="text-3xl font-bold text-sippy-charcoal mb-2">{displayTitle}</h1>
//                 <div className="flex items-center text-gray-600">
//                   <MapPin className="h-5 w-5 mr-2" />
//                   <span>{property.location || property.sub_location || "—"}</span>
//                 </div>
//               </div>
//               <div className="flex items-center gap-3">
//                 <button
//                   onClick={handleToggleFavorite}
//                   className={`p-3 rounded-full transition-colors ${
//                     isInCart(property.id)
//                       ? "bg-red-500 text-white hover:bg-red-600"
//                       : "bg-gray-100 text-gray-600 hover:bg-gray-200"
//                   }`}
//                 >
//                   {isInCart(property.id) ? (
//                     <Heart className="h-6 w-6 fill-current" />
//                   ) : (
//                     <HeartOff className="h-6 w-6" />
//                   )}
//                 </button>
//                 {(property.primary_category || property.usage_type || property.usage_type_category || (property as { type?: string }).type) && (
//                   <div className="bg-sippy-gold text-white px-4 py-2 rounded-full">
//                     {(property as { type?: string }).type === "premium"
//                       ? "Premium"
//                       : (property as { type?: string }).type === "budget"
//                       ? "Budget"
//                       : property.usage_type ||
//                         property.usage_type_category ||
//                         getCategoryBySlug(property.primary_category || "")?.name ||
//                         property.primary_category ||
//                         "Property"}
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Key Details */}
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//               <div className="bg-gray-50 p-4 rounded-lg">
//                 <div className="flex items-center mb-2">
//                   <IndianRupee className="h-5 w-5 text-sippy-gold mr-2" />
//                   <span className="font-semibold">Price</span>
//                 </div>
//                 {(() => {
//                   const priceStr = getPropertyPriceStr(property) || property.price || "";
//                   const inWords  = getPriceInWords(priceStr);
//                   const figures  = formatPriceWithCommas(priceStr);
//                   if (!inWords) return <p className="text-lg font-medium">{priceStr || "Price on request"}</p>;
//                   return (
//                     <>
//                       <p className="text-lg font-medium">₹ {figures}</p>
//                       <p className="text-sm text-gray-600 mt-1">({inWords})</p>
//                     </>
//                   );
//                 })()}
//               </div>

//               {(property.size || property.area || property.flat_size || property.plot_size || property.built_up_area || property.constructed_area) && (
//                 <div className="bg-gray-50 p-4 rounded-lg">
//                   <div className="flex items-center mb-2">
//                     <Home className="h-5 w-5 text-sippy-gold mr-2" />
//                     <span className="font-semibold">Size</span>
//                   </div>
//                   <p className="text-lg">
//                     {property.size || property.area || property.flat_size || property.plot_size || property.built_up_area || property.constructed_area || "—"}
//                   </p>
//                 </div>
//               )}

//               {(property.bhk_options?.length || property.bhk || property.configuration_international) && (
//                 <div className="bg-gray-50 p-4 rounded-lg">
//                   <div className="flex items-center mb-2">
//                     <Building className="h-5 w-5 text-sippy-gold mr-2" />
//                     <span className="font-semibold">BHK / Configuration</span>
//                   </div>
//                   <p className="text-lg">
//                     {property.bhk_options?.join(", ") || property.bhk || property.configuration_international || "—"}
//                   </p>
//                 </div>
//               )}

//               {(property.possession || property.possession_date) && (
//                 <div className="bg-gray-50 p-4 rounded-lg">
//                   <div className="flex items-center mb-2">
//                     <Calendar className="h-5 w-5 text-sippy-gold mr-2" />
//                     <span className="font-semibold">Possession</span>
//                   </div>
//                   <p className="text-lg">{property.possession || property.possession_date}</p>
//                 </div>
//               )}
//             </div>

//             {/* Additional Details */}
//             <div className="border-t pt-8">
//               <h2 className="text-2xl font-bold text-sippy-charcoal mb-4">Property Details</h2>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <h3 className="font-semibold mb-2">Project Details</h3>
//                   <ul className="space-y-2">
//                     {(property.builder != null && property.builder !== "") && (
//                       <li><span className="font-medium">Builder:</span> {property.builder}</li>
//                     )}
//                     {property.units != null && <li><span className="font-medium">Total Units:</span> {property.units}</li>}
//                     {property.towers != null && <li><span className="font-medium">Number of Towers:</span> {property.towers}</li>}
//                     {property.acres != null && <li><span className="font-medium">Land Area:</span> {property.acres} acres</li>}
//                     {property.storey && <li><span className="font-medium">Storey:</span> {property.storey}</li>}
//                     {property.society_property_name && <li><span className="font-medium">Society / Property:</span> {property.society_property_name}</li>}
//                     {!(property.builder || property.units != null || property.towers != null || property.acres != null || property.storey || property.society_property_name) && (
//                       <li className="text-gray-500">—</li>
//                     )}
//                   </ul>
//                 </div>
//                 <div>
//                   <h3 className="font-semibold mb-2">Unit Details</h3>
//                   <ul className="space-y-2">
//                     {property.units != null && <li><span className="font-medium">Available Units:</span> {property.units}</li>}
//                     {(property.bhk_options?.length || property.bhk) && (
//                       <li><span className="font-medium">BHK Types:</span> {property.bhk_options?.join(", ") || property.bhk}</li>
//                     )}
//                     {(property.size || property.area || property.flat_size) && (
//                       <li><span className="font-medium">Size Range:</span> {property.size || property.area || property.flat_size}</li>
//                     )}
//                     {property.usage_type_category && <li><span className="font-medium">Usage:</span> {property.usage_type_category}</li>}
//                     {!(property.units != null || property.bhk_options?.length || property.bhk || property.size || property.area || property.flat_size || property.usage_type_category) && (
//                       <li className="text-gray-500">—</li>
//                     )}
//                   </ul>
//                 </div>
//               </div>
//             </div>

//             {/* Contact Information */}
//             <div className="border-t pt-8 mt-8">
//               <h2 className="text-2xl font-bold text-sippy-charcoal mb-4">Contact Information</h2>
//               <div className="bg-gray-50 p-6 rounded-lg">
//                 <div className="flex items-center mb-4">
//                   <Phone className="h-6 w-6 text-sippy-gold mr-3" />
//                   <div>
//                     <h3 className="font-semibold text-lg">Sales Team</h3>
//                     <p className="text-gray-600">Get in touch with our sales team</p>
//                   </div>
//                 </div>
//                 <div className="flex items-center">
//                   <span className="font-medium text-xl text-sippy-charcoal">{resolvedContactNumber}</span>
//                 </div>
//               </div>
//             </div>

//             {/* CTA Section */}
//             <div className="border-t pt-8 mt-8">
//               <h2 className="text-2xl font-bold text-sippy-charcoal mb-6">Interested in this Property?</h2>
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                 <button
//                   onClick={handleWhatsApp}
//                   className="bg-sippy-gold hover:bg-sippy-gold/90 text-white px-6 py-4 rounded-lg flex items-center justify-center space-x-3 transition-colors duration-300 shadow-lg hover:shadow-xl"
//                 >
//                   <CalendarIcon className="h-5 w-5" />
//                   <span className="font-semibold">Schedule a Visit</span>
//                 </button>
//                 <button
//                   onClick={handleRequestCall}
//                   className="bg-sippy-charcoal hover:bg-sippy-charcoal/90 text-white px-6 py-4 rounded-lg flex items-center justify-center space-x-3 transition-colors duration-300 shadow-lg hover:shadow-xl"
//                 >
//                   <Phone className="h-5 w-5" />
//                   <span className="font-semibold">Request a Call</span>
//                 </button>
//                 <button
//                   onClick={handleWhatsApp}
//                   className="bg-green-600 hover:bg-green-700 text-white px-6 py-4 rounded-lg flex items-center justify-center space-x-3 transition-colors duration-300 shadow-lg hover:shadow-xl"
//                 >
//                   <MessageCircle className="h-5 w-5" />
//                   <span className="font-semibold">WhatsApp Now</span>
//                 </button>
//               </div>
//             </div>

//             {/* Video Links */}
//             {property.video_links && property.video_links.length > 0 && (
//               <div className="border-t pt-8 mt-8">
//                 <h2 className="text-2xl font-bold text-sippy-charcoal mb-4 flex items-center">
//                   <Video className="h-6 w-6 mr-2 text-sippy-gold" />
//                   Video Links
//                 </h2>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   {property.video_links.map((videoUrl: string, index: number) => (
//                     <a
//                       key={index}
//                       href={videoUrl}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="relative group bg-gray-900 rounded-lg overflow-hidden hover:opacity-90 transition-opacity"
//                     >
//                       <div className="aspect-video flex items-center justify-center">
//                         <Play className="h-16 w-16 text-white opacity-80 group-hover:opacity-100 transition-opacity" />
//                       </div>
//                       <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 p-3">
//                         <p className="text-white text-sm truncate">{videoUrl}</p>
//                       </div>
//                     </a>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* Photo Gallery */}
//             {propertyImages.length > 0 && (
//               <div className="border-t pt-8 mt-8">
//                 <h2 className="text-2xl font-bold text-sippy-charcoal mb-4">Photo Gallery</h2>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
//                   {propertyImages.map((img) => (
//                     <div key={img.id} className="aspect-square overflow-hidden rounded-lg">
//                       <Watermark link={img.image_url} />
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* Category-Specific Details */}
//             {property.primary_category && (
//               <div className="border-t pt-8 mt-8">
//                 <h2 className="text-2xl font-bold text-sippy-charcoal mb-4">Additional Details</h2>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   {property.primary_category === "luxury" && (
//                     <>
//                       {property.view && <div><span className="font-medium">View:</span> {property.view}</div>}
//                       {property.size && <div><span className="font-medium">Size:</span> {property.size}</div>}
//                       {property.configuration_type && <div><span className="font-medium">Configuration:</span> {property.configuration_type}</div>}
//                     </>
//                   )}

//                   {property.primary_category === "new-project" && (
//                     <>
//                       {property.bhk_options && property.bhk_options.length > 0 && (
//                         <div><span className="font-medium">Available BHK:</span> {property.bhk_options.join(", ")}</div>
//                       )}
//                       {property.storey    && <div><span className="font-medium">Storey:</span> {property.storey}</div>}
//                       {property.area      && <div><span className="font-medium">Total Area:</span> {property.area}</div>}
//                       {property.possession && <div><span className="font-medium">Possession:</span> {property.possession}</div>}
//                       {property.rera_number && <div><span className="font-medium">RERA Number:</span> {property.rera_number}</div>}
//                       {property.unit_variants && property.unit_variants.length > 0 ? (
//                         <div className="col-span-full mt-4">
//                           <span className="font-medium block mb-2">Unit-wise pricing</span>
//                           <div className="overflow-x-auto border rounded-md">
//                             <table className="w-full text-sm">
//                               <thead>
//                                 <tr className="bg-muted">
//                                   <th className="text-left p-2">Type</th>
//                                   <th className="text-left p-2">Variant</th>
//                                   <th className="text-left p-2">Area</th>
//                                   <th className="text-left p-2">Price</th>
//                                 </tr>
//                               </thead>
//                               <tbody>
//                                 {property.unit_variants.map((v, i) => (
//                                   <tr key={i} className="border-t">
//                                     <td className="p-2">{v.type}</td>
//                                     <td className="p-2">{v.label || "—"}</td>
//                                     <td className="p-2">{v.area  || "—"}</td>
//                                     <td className="p-2">{v.price ? `₹ ${formatPriceWithCommas(v.price) || v.price}` : "—"}</td>
//                                   </tr>
//                                 ))}
//                               </tbody>
//                             </table>
//                           </div>
//                         </div>
//                       ) : (
//                         <>
//                           {[
//                             { label: "1BHK",      area: property.bhk_1_area,      price: property.price_1bhk },
//                             { label: "2BHK",      area: property.bhk_2_area,      price: property.price_2bhk },
//                             { label: "3BHK",      area: property.bhk_3_area,      price: property.price_3bhk },
//                             { label: "4BHK",      area: property.bhk_4_area,      price: property.price_4bhk },
//                             { label: "5BHK",      area: property.bhk_5_area,      price: property.price_5bhk },
//                             { label: "Penthouse", area: property.penthouse_area,  price: property.price_penthouse },
//                           ].filter(r => r.area || r.price).map(row => (
//                             <div key={row.label}>
//                               <span className="font-medium">{row.label}:</span>{" "}
//                               {row.area  && <span>Area {row.area}</span>}
//                               {row.area && row.price && " · "}
//                               {row.price && <span>Price ₹ {formatPriceWithCommas(row.price) || row.price}</span>}
//                             </div>
//                           ))}
//                         </>
//                       )}
//                       {property.duplex_area && <div><span className="font-medium">Duplex Area:</span> {property.duplex_area}</div>}
//                     </>
//                   )}

//                   {property.primary_category === "resale-rental" && (
//                     <>
//                       {property.property_type      && <div><span className="font-medium">Listing Type:</span> {property.property_type}</div>}
//                       {property.furnishing_status  && <div><span className="font-medium">Furnishing:</span> {property.furnishing_status}</div>}
//                       {property.floor_number       && <div><span className="font-medium">Floor:</span> {property.floor_number}</div>}
//                       {property.parking            && <div><span className="font-medium">Parking:</span> {property.parking}</div>}
//                       {property.bathrooms != null  && <div><span className="font-medium">Bathrooms:</span> {property.bathrooms}</div>}
//                       {property.age_of_property    && <div><span className="font-medium">Age of Property:</span> {property.age_of_property}</div>}
//                       {property.deposit            && <div><span className="font-medium">Security Deposit:</span> {property.deposit}</div>}
//                       {property.tenure             && <div><span className="font-medium">Lease Duration:</span> {property.tenure} {property.tenure_unit || ""}</div>}
//                       {property.maintenance        && <div><span className="font-medium">Maintenance:</span> {property.maintenance}</div>}
//                       {property.rera_number        && <div><span className="font-medium">RERA Number:</span> {property.rera_number}</div>}
//                     </>
//                   )}

//                   {property.primary_category === "plots-lands" && (
//                     <>
//                       {property.plot_size            && <div><span className="font-medium">Plot Size:</span> {property.plot_size} {property.plot_size_unit || ""}</div>}
//                       {property.road_width           && <div><span className="font-medium">Road Width:</span> {property.road_width} {property.road_width_unit || ""}</div>}
//                       {property.availability_status  && <div><span className="font-medium">Status:</span> {property.availability_status}</div>}
//                     </>
//                   )}

//                   {property.primary_category === "redevelopment-jv" && (
//                     <>
//                       {property.society_property_name    && <div><span className="font-medium">Society / Property Name:</span> {property.society_property_name}</div>}
//                       {property.plot_size                && <div><span className="font-medium">Plot Size:</span> {property.plot_size}</div>}
//                       {property.number_of_wings != null  && <div><span className="font-medium">Number of Wings:</span> {property.number_of_wings}</div>}
//                       {property.number_of_members != null && <div><span className="font-medium">Number of Members:</span> {property.number_of_members}</div>}
//                       {property.total_permissible_fsi    && <div><span className="font-medium">Total Permissible FSI:</span> {property.total_permissible_fsi}</div>}
//                       {property.fsi_consumed             && <div><span className="font-medium">FSI Consumed:</span> {property.fsi_consumed}</div>}
//                       {property.balance_fsi              && <div><span className="font-medium">Balance FSI:</span> {property.balance_fsi}</div>}
//                       {property.corpus_amount            && <div><span className="font-medium">Corpus Amount:</span> {property.corpus_amount} {property.corpus_amount_type ? `(${property.corpus_amount_type})` : ""}</div>}
//                       {property.rent                     && <div><span className="font-medium">Rent:</span> {property.rent}</div>}
//                       {property.stage                    && <div><span className="font-medium">Stage:</span> {property.stage}</div>}
//                       {property.existing_structure_details && (
//                         <div className="md:col-span-2">
//                           <span className="font-medium block mb-2">Existing Structure Details:</span>
//                           <p className="text-gray-600">{property.existing_structure_details}</p>
//                         </div>
//                       )}
//                       {property.commercial_terms && (
//                         <div className="md:col-span-2">
//                           <span className="font-medium block mb-2">Commercial Terms:</span>
//                           <p className="text-gray-600 whitespace-pre-wrap">{property.commercial_terms}</p>
//                         </div>
//                       )}
//                     </>
//                   )}

//                   {property.primary_category === "independent-buildings" && (
//                     <>
//                       {property.transaction_option && <div><span className="font-medium">Transaction Option:</span> {property.transaction_option}</div>}
//                       {property.transaction_option === "Pre-Leased" && (
//                         <>
//                           {property.pre_leased_sale_price && (
//                             <div><span className="font-medium">Sale Price (Pre-Leased):</span>{" "}
//                               {property.pre_leased_sale_price.startsWith("₹") ? property.pre_leased_sale_price : `₹ ${formatPriceWithCommas(property.pre_leased_sale_price) || property.pre_leased_sale_price}`}
//                             </div>
//                           )}
//                           {property.pre_leased_rent_price && (
//                             <div><span className="font-medium">Rent Price (Pre-Leased):</span>{" "}
//                               {property.pre_leased_rent_price.startsWith("₹") ? property.pre_leased_rent_price : `₹ ${formatPriceWithCommas(property.pre_leased_rent_price) || property.pre_leased_rent_price}`}
//                             </div>
//                           )}
//                         </>
//                       )}
//                       {property.transaction_option && property.transaction_option !== "Pre-Leased" && property.price && (
//                         <div><span className="font-medium">Price / Rent:</span>{" "}
//                           {property.price.startsWith("₹") ? property.price : `₹ ${formatPriceWithCommas(property.price) || property.price}`}
//                         </div>
//                       )}
//                       {property.deposit    && <div><span className="font-medium">Deposit:</span> {property.deposit}</div>}
//                       {property.tenure     && <div><span className="font-medium">Tenure:</span> {property.tenure} {property.tenure_unit || ""}</div>}
//                       {property.escalation && <div><span className="font-medium">Escalation:</span> {property.escalation}</div>}
//                     </>
//                   )}

//                   {property.description && (
//                     <div className="md:col-span-2">
//                       <span className="font-medium block mb-2">Description:</span>
//                       <p className="text-gray-600">{property.description}</p>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </main>
//       <Footer />
//     </div>
//   );
// };

// export default PropertyDetails;


import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, MapPin, Home, IndianRupee, Building, Calendar, Phone, Calendar as CalendarIcon, MessageCircle, Heart, HeartOff, Video, Play } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useEffect, useState } from "react";
import Watermark from "@/components/sections/Watermark";
import { useCart } from "@/contexts/CartContext";
import { handleHashNavigation } from "@/lib/navigation";
import { Property } from "@/lib/supabase";
import { propertyService, PropertyImage } from "@/services/propertyService";
import { getPropertyPriceStr, formatPriceWithCommas, getPriceInWords } from "@/lib/utils";
import { getCategoryBySlug } from "@/config/propertyCategories";
import { getContactNumberByProperty, getWhatsAppHref, getLeadNumbersByProperty, formatIndianPhone, getPhoneHref } from "@/lib/contactRouting";
import { VideoGridItems } from "@/components/property/VideoGridItems";
import { getPropertyConfigurationLabel, formatConfigurationList } from "@/lib/propertyHelpers";
import LeadCapturePopup from "@/components/common/LeadCapturePopup";

const SESSION_KEY = "sippy_lead_captured";

const PropertyDetails = () => {
  const location = useLocation();
  const navigate  = useNavigate();
  const { id: paramId } = useParams();

  const stateProperty: Property | undefined = location.state?.property;
  const [fullProperty,   setFullProperty]   = useState<Property | null>(null);
  const [propertyImages, setPropertyImages] = useState<PropertyImage[]>([]);
  const [showLead,       setShowLead]       = useState(false);  // ← popup flag

  const property: Property | undefined = fullProperty ?? stateProperty;
  const { addToCart, removeFromCart, isInCart } = useCart();

  const propertyImageUrl =
    propertyImages.length > 0
      ? propertyImages[0].image_url
      : (property as { image?: string })?.image ?? "/placeholder.svg";

  useEffect(() => {
    window.scrollTo(0, 0);
    handleHashNavigation();
  }, []);

  useEffect(() => {
    const id = paramId ?? stateProperty?.id;
    if (id) {
      propertyService.getPropertyById(id).then(p => setFullProperty(p ?? null));
    } else if (stateProperty) {
      setFullProperty(stateProperty as Property);
    }
  }, [paramId, stateProperty?.id]);

  useEffect(() => {
    const id = property?.id;
    if (!id) { setPropertyImages([]); return; }
    propertyService.getPropertyImages(id).then(images => setPropertyImages(images));
  }, [property?.id]);

  /* ── open popup only if not already captured this session ── */
  const openLeadPopup = () => {
    if (sessionStorage.getItem(SESSION_KEY)) return; // already registered
    setShowLead(true);
  };

  const handleRequestCall = () => {
    const phone = property.contact_number || getContactNumberByProperty(property);
    window.open(`tel:${phone}`, "_self");
  };

  const handleWhatsApp = () => {
    const phone = (property.contact_number || getContactNumberByProperty(property)).replace(/\D/g, "");
    const message = `Hi! I'm interested in the property "${property.header ?? (property as { title?: string }).title ?? ""}" at ${property.location}. Could you please provide more details?`;
    window.open(getWhatsAppHref(phone, message), "_blank");
  };

  const handleToggleFavorite = () => {
    if (!property) return;
    if (isInCart(property.id)) {
      removeFromCart(property.id);
    } else {
      addToCart({
        id: property.id,
        title: property.header ?? (property as { title?: string }).title ?? "Property",
        location: property.location,
        price: property.price || "Price on request",
        type: (property as { type?: string }).type || property.primary_category || "Property",
        image: propertyImageUrl,
        source: "property",
      });
    }
  };

  if (paramId && !property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading property...</p>
      </div>
    );
  }
  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Property not found</p>
      </div>
    );
  }

  const displayTitle          = property.header ?? (property as { title?: string }).title ?? "";
  const resolvedContactNumber = property.contact_number || getContactNumberByProperty(property);
  const leadNumbers           = getLeadNumbersByProperty(property);
  const configurationLabel    = getPropertyConfigurationLabel(property);
  const fieldRemarkEntries    = Object.entries(property.field_remarks || {}).filter(([, v]) => !!String(v || "").trim());
  const fieldLabel = (key: string) => {
    const cat = getCategoryBySlug(property.primary_category || "");
    return cat?.fields.find(f => f.key === key)?.name || key.replace(/_/g, " ");
  };
  const categoryLabel         =
    getCategoryBySlug(property.primary_category || "")?.name ||
    property.primary_category || "Property";

  /* interest string passed to popup */
  const interestLabel = `${categoryLabel} – ${displayTitle || property.location || "Property"}`;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* ── Lead capture popup ── */}
      {showLead && (
        <LeadCapturePopup
          interest={interestLabel}
          leadNumbers={leadNumbers}
          onSuccess={() => setShowLead(false)}   // close and show property
          onClose={() => {
            sessionStorage.setItem(SESSION_KEY, "1"); // skip for rest of session
            setShowLead(false);
          }}
        />
      )}

      <main className="container mx-auto px-4 py-8 mt-20">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-sippy-gold hover:text-sippy-charcoal mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Properties
        </button>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-8">
            {/* Title row */}
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-3xl font-bold text-sippy-charcoal mb-2">{displayTitle}</h1>
                <div className="flex items-center text-gray-600">
                  <MapPin className="h-5 w-5 mr-2" />
                  <span>{property.location || property.sub_location || "—"}</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={handleToggleFavorite}
                  className={`p-3 rounded-full transition-colors ${
                    isInCart(property.id)
                      ? "bg-red-500 text-white hover:bg-red-600"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {isInCart(property.id)
                    ? <Heart className="h-6 w-6 fill-current" />
                    : <HeartOff className="h-6 w-6" />}
                </button>
                {(property.primary_category || property.usage_type || property.usage_type_category || (property as { type?: string }).type) && (
                  <div className="bg-sippy-gold text-white px-4 py-2 rounded-full">
                    {(property as { type?: string }).type === "premium" ? "Premium"
                      : (property as { type?: string }).type === "budget" ? "Budget"
                      : property.usage_type || property.usage_type_category
                        || getCategoryBySlug(property.primary_category || "")?.name
                        || property.primary_category || "Property"}
                  </div>
                )}
              </div>
            </div>

            {/* Key Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <IndianRupee className="h-5 w-5 text-sippy-gold mr-2" />
                  <span className="font-semibold">Price</span>
                </div>
                {(() => {
                  const priceStr = getPropertyPriceStr(property) || property.price || "";
                  const inWords  = getPriceInWords(priceStr);
                  const figures  = formatPriceWithCommas(priceStr);
                  if (!inWords) return <p className="text-lg font-medium">{priceStr || "Price on request"}</p>;
                  return (
                    <>
                      <p className="text-lg font-medium">₹ {figures}</p>
                      <p className="text-sm text-gray-600 mt-1">({inWords})</p>
                    </>
                  );
                })()}
              </div>

              {(property.size || property.area || property.flat_size || property.plot_size || property.built_up_area || property.constructed_area) && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <Home className="h-5 w-5 text-sippy-gold mr-2" />
                    <span className="font-semibold">Size</span>
                  </div>
                  <p className="text-lg">
                    {property.size || property.area || property.flat_size || property.plot_size || property.built_up_area || property.constructed_area || "—"}
                  </p>
                </div>
              )}

              {configurationLabel && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <Building className="h-5 w-5 text-sippy-gold mr-2" />
                    <span className="font-semibold">BHK / Configuration</span>
                  </div>
                  <p className="text-lg">
                    {configurationLabel}
                  </p>
                </div>
              )}

              {(property.possession || property.possession_date) && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <Calendar className="h-5 w-5 text-sippy-gold mr-2" />
                    <span className="font-semibold">Possession</span>
                  </div>
                  <p className="text-lg">{property.possession || property.possession_date}</p>
                </div>
              )}
            </div>

            {/* Property Details */}
            <div className="border-t pt-8">
              <h2 className="text-2xl font-bold text-sippy-charcoal mb-4">Property Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-2">Project Details</h3>
                  <ul className="space-y-2">
                    {property.builder && <li><span className="font-medium">Builder:</span> {property.builder}</li>}
                    {property.units != null && <li><span className="font-medium">Total Units:</span> {property.units}</li>}
                    {property.towers != null && <li><span className="font-medium">Number of Towers:</span> {property.towers}</li>}
                    {property.acres != null && <li><span className="font-medium">Land Area:</span> {property.acres} acres</li>}
                    {property.storey && <li><span className="font-medium">Storey:</span> {property.storey}</li>}
                    {property.society_property_name && <li><span className="font-medium">Society / Property:</span> {property.society_property_name}</li>}
                    {!(property.builder || property.units != null || property.towers != null || property.acres != null || property.storey || property.society_property_name) && (
                      <li className="text-gray-500">—</li>
                    )}
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Unit Details</h3>
                  <ul className="space-y-2">
                    {property.units != null && <li><span className="font-medium">Available Units:</span> {property.units}</li>}
                    {formatConfigurationList(property.bhk_options?.length ? property.bhk_options : property.bhk) && (
                      <li><span className="font-medium">Configurations:</span> {formatConfigurationList(property.bhk_options?.length ? property.bhk_options : property.bhk)}</li>
                    )}
                    {(property.size || property.area || property.flat_size) && (
                      <li><span className="font-medium">Size Range:</span> {property.size || property.area || property.flat_size}</li>
                    )}
                    {property.usage_type_category && <li><span className="font-medium">Usage:</span> {property.usage_type_category}</li>}
                    {!(property.units != null || configurationLabel || property.size || property.area || property.flat_size || property.usage_type_category) && (
                      <li className="text-gray-500">—</li>
                    )}
                  </ul>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="border-t pt-8 mt-8">
              <h2 className="text-2xl font-bold text-sippy-charcoal mb-4">Contact Information</h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  <Phone className="h-6 w-6 text-sippy-gold mr-3" />
                  <div>
                    <h3 className="font-semibold text-lg">Sales Team</h3>
                    <p className="text-gray-600">Get in touch with our sales team</p>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  {(leadNumbers.length ? leadNumbers : [resolvedContactNumber]).map((n) => (
                    <div key={n} className="flex flex-wrap items-center gap-3">
                      <a href={getPhoneHref(n)} className="font-medium text-xl text-sippy-charcoal hover:text-sippy-gold">
                        {formatIndianPhone(n)}
                      </a>
                      <a
                        href={getWhatsAppHref(`91${n}`, `Hi! I'm interested in the property "${displayTitle}" at ${property.location || ""}. Could you please provide more details?`)}
                        target="_blank" rel="noopener noreferrer"
                        className="text-sm text-green-700 hover:underline inline-flex items-center gap-1"
                      >
                        <MessageCircle className="h-4 w-4" /> WhatsApp
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ── CTA Section ── */}
            <div className="border-t pt-8 mt-8">
              <h2 className="text-2xl font-bold text-sippy-charcoal mb-6">Interested in this Property?</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                {/* Schedule a Visit → triggers lead popup */}
                <button
                  onClick={openLeadPopup}
                  className="bg-sippy-gold hover:bg-sippy-gold/90 text-white px-6 py-4 rounded-lg flex items-center justify-center space-x-3 transition-colors duration-300 shadow-lg hover:shadow-xl"
                >
                  <CalendarIcon className="h-5 w-5" />
                  <span className="font-semibold">Schedule a Visit</span>
                </button>

                {/* Request a Call → triggers lead popup */}
                <button
                  onClick={openLeadPopup}
                  className="bg-sippy-charcoal hover:bg-sippy-charcoal/90 text-white px-6 py-4 rounded-lg flex items-center justify-center space-x-3 transition-colors duration-300 shadow-lg hover:shadow-xl"
                >
                  <Phone className="h-5 w-5" />
                  <span className="font-semibold">Request a Call</span>
                </button>

                {/* WhatsApp → still opens WhatsApp directly */}
                <button
                  onClick={handleWhatsApp}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-4 rounded-lg flex items-center justify-center space-x-3 transition-colors duration-300 shadow-lg hover:shadow-xl"
                >
                  <MessageCircle className="h-5 w-5" />
                  <span className="font-semibold">WhatsApp Now</span>
                </button>
              </div>
            </div>

            {/* Photo Gallery – videos sit in the same grid; click a video to play it in a popup */}
            {(propertyImages.length > 0 || (property.video_links?.length ?? 0) > 0) && (
              <div className="border-t pt-8 mt-8">
                <h2 className="text-2xl font-bold text-sippy-charcoal mb-4">
                  {(property.video_links?.length ?? 0) > 0 ? "Photos & Videos" : "Photo Gallery"}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {propertyImages.map(img => (
                    <div key={img.id} className="aspect-square overflow-hidden rounded-lg">
                      <Watermark link={img.image_url} />
                    </div>
                  ))}
                  <VideoGridItems links={property.video_links || []} />
                </div>
              </div>
            )}

            {/* Category-Specific Details */}
            {property.primary_category && (
              <div className="border-t pt-8 mt-8">
                <h2 className="text-2xl font-bold text-sippy-charcoal mb-4">Additional Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {property.primary_category === "luxury" && (
                    <>
                      {property.view              && <div><span className="font-medium">View:</span> {property.view}</div>}
                      {property.size              && <div><span className="font-medium">Size:</span> {property.size}</div>}
                      {property.configuration_type && <div><span className="font-medium">Configuration:</span> {property.configuration_type}</div>}
                    </>
                  )}
                  {property.primary_category === "new-project" && (
                    <>
                      {formatConfigurationList(property.bhk_options) && <div><span className="font-medium">Available Configurations:</span> {formatConfigurationList(property.bhk_options)}</div>}
                      {property.storey     && <div><span className="font-medium">Storey:</span> {property.storey}</div>}
                      {property.area       && <div><span className="font-medium">Total Area:</span> {property.area}</div>}
                      {property.possession && <div><span className="font-medium">Possession:</span> {property.possession}</div>}
                      {property.rera_number && <div><span className="font-medium">RERA Number:</span> {property.rera_number}</div>}
                      {property.unit_variants?.length > 0 ? (
                        <div className="col-span-full mt-4">
                          <span className="font-medium block mb-2">Unit-wise pricing</span>
                          <div className="overflow-x-auto border rounded-md">
                            <table className="w-full text-sm">
                              <thead><tr className="bg-muted">
                                <th className="text-left p-2">Type</th>
                                <th className="text-left p-2">Variant</th>
                                <th className="text-left p-2">Area</th>
                                <th className="text-left p-2">Price</th>
                              </tr></thead>
                              <tbody>
                                {property.unit_variants.map((v, i) => (
                                  <tr key={i} className="border-t">
                                    <td className="p-2">{v.type}</td>
                                    <td className="p-2">{v.label || "—"}</td>
                                    <td className="p-2">{v.area  || "—"}</td>
                                    <td className="p-2">{v.price ? `₹ ${formatPriceWithCommas(v.price) || v.price}` : "—"}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      ) : (
                        [
                          { label: "1BHK",      area: property.bhk_1_area,     price: property.price_1bhk },
                          { label: "2BHK",      area: property.bhk_2_area,     price: property.price_2bhk },
                          { label: "3BHK",      area: property.bhk_3_area,     price: property.price_3bhk },
                          { label: "4BHK",      area: property.bhk_4_area,     price: property.price_4bhk },
                          { label: "5BHK",      area: property.bhk_5_area,     price: property.price_5bhk },
                          { label: "Penthouse", area: property.penthouse_area, price: property.price_penthouse },
                        ].filter(r => r.area || r.price).map(row => (
                          <div key={row.label}>
                            <span className="font-medium">{row.label}:</span>{" "}
                            {row.area && <span>Area {row.area}</span>}
                            {row.area && row.price && " · "}
                            {row.price && <span>Price ₹ {formatPriceWithCommas(row.price) || row.price}</span>}
                          </div>
                        ))
                      )}
                      {property.duplex_area && <div><span className="font-medium">Duplex Area:</span> {property.duplex_area}</div>}
                    </>
                  )}
                  {property.primary_category === "resale-rental" && (
                    <>
                      {property.property_type     && <div><span className="font-medium">Listing Type:</span> {property.property_type}</div>}
                      {property.furnishing_status && <div><span className="font-medium">Furnishing:</span> {property.furnishing_status}</div>}
                      {property.floor_number      && <div><span className="font-medium">Floor:</span> {property.floor_number}</div>}
                      {property.parking           && <div><span className="font-medium">Parking:</span> {property.parking}</div>}
                      {property.bathrooms != null && <div><span className="font-medium">Bathrooms:</span> {property.bathrooms}</div>}
                      {property.age_of_property   && <div><span className="font-medium">Age of Property:</span> {property.age_of_property}</div>}
                      {property.property_type === "Rental" && property.price && <div><span className="font-medium">Monthly Rent:</span> ₹ {formatPriceWithCommas(property.price) || property.price}</div>}
                      {property.property_type === "Resale" && property.price && <div><span className="font-medium">Outright Price:</span> ₹ {formatPriceWithCommas(property.price) || property.price}</div>}
                      {property.deposit           && <div><span className="font-medium">Security Deposit:</span> {property.deposit}</div>}
                      {property.tenure            && <div><span className="font-medium">Lease Duration:</span> {property.tenure} {property.tenure_unit || ""}</div>}
                      {property.maintenance       && <div><span className="font-medium">Maintenance:</span> {property.maintenance}</div>}
                      {property.rera_number       && <div><span className="font-medium">RERA Number:</span> {property.rera_number}</div>}
                    </>
                  )}
                  {property.primary_category === "plots-lands" && (
                    <>
                      {property.plot_size           && <div><span className="font-medium">Plot Size:</span> {property.plot_size} {property.plot_size_unit || ""}</div>}
                      {property.road_width          && <div><span className="font-medium">Road Width:</span> {property.road_width} {property.road_width_unit || ""}</div>}
                      {property.availability_status && <div><span className="font-medium">Status:</span> {property.availability_status}</div>}
                      {property.sale_price          && <div><span className="font-medium">Sale Price:</span> ₹ {formatPriceWithCommas(property.sale_price) || property.sale_price}</div>}
                      {property.is_jv && property.jv_terms_1 && (
                        <div className="md:col-span-2">
                          <span className="font-medium block mb-1">JV Terms – 1:</span>
                          <p className="text-gray-600 whitespace-pre-wrap">{property.jv_terms_1}</p>
                        </div>
                      )}
                      {property.is_jv && property.jv_terms_2 && (
                        <div className="md:col-span-2">
                          <span className="font-medium block mb-1">JV Terms – 2:</span>
                          <p className="text-gray-600 whitespace-pre-wrap">{property.jv_terms_2}</p>
                        </div>
                      )}
                    </>
                  )}
                  {property.primary_category === "hotels" && (
                    <>
                      {property.transaction_option && <div><span className="font-medium">Transaction:</span> {property.transaction_option}</div>}
                      {property.no_of_rooms != null && <div><span className="font-medium">Rooms:</span> {property.no_of_rooms}</div>}
                      {property.floors != null      && <div><span className="font-medium">Floors:</span> {property.floors}</div>}
                      {property.built_up_area       && <div><span className="font-medium">Built-up Area:</span> {property.built_up_area}</div>}
                      {property.plot_size           && <div><span className="font-medium">Plot Size:</span> {property.plot_size}</div>}
                      {property.transaction_option === "Sale" && property.sale_price && <div><span className="font-medium">Sale Price:</span> ₹ {formatPriceWithCommas(property.sale_price) || property.sale_price}</div>}
                      {property.transaction_option === "Rent" && property.rent && <div><span className="font-medium">Monthly Rent:</span> ₹ {formatPriceWithCommas(property.rent) || property.rent}</div>}
                      {property.deposit             && <div><span className="font-medium">Deposit:</span> {property.deposit}</div>}
                      {property.tenure              && <div><span className="font-medium">Tenure:</span> {property.tenure} {property.tenure_unit || ""}</div>}
                      {property.operator_brand      && <div><span className="font-medium">Operator / Brand:</span> {property.operator_brand}</div>}
                      {property.operating_price     && <div><span className="font-medium">Operating Price / Fee:</span> {property.operating_price}</div>}
                      {property.transaction_option === "Pre-Leased" && property.pre_leased_sale_price && <div><span className="font-medium">Sale Price (Pre-Leased):</span> ₹ {formatPriceWithCommas(property.pre_leased_sale_price) || property.pre_leased_sale_price}</div>}
                      {property.transaction_option === "Pre-Leased" && property.pre_leased_rent_price && <div><span className="font-medium">Rent (Pre-Leased):</span> ₹ {formatPriceWithCommas(property.pre_leased_rent_price) || property.pre_leased_rent_price}</div>}
                      {property.monthly_revenue     && <div><span className="font-medium">Monthly Revenue:</span> {property.monthly_revenue}</div>}
                      {property.ebitda_yield        && <div><span className="font-medium">EBITDA / Yield:</span> {property.ebitda_yield}</div>}
                      {property.operating_terms && (
                        <div className="md:col-span-2">
                          <span className="font-medium block mb-1">Operating Terms:</span>
                          <p className="text-gray-600 whitespace-pre-wrap">{property.operating_terms}</p>
                        </div>
                      )}
                    </>
                  )}
                  {property.primary_category === "international" && (
                    <>
                      {property.country                         && <div><span className="font-medium">Country:</span> {property.country}</div>}
                      {property.currency                        && <div><span className="font-medium">Currency:</span> {property.currency}</div>}
                      {property.transaction_type_international  && <div><span className="font-medium">Transaction:</span> {property.transaction_type_international}</div>}
                      {property.property_type_international     && <div><span className="font-medium">Type:</span> {property.property_type_international}</div>}
                      {property.configuration_international    && <div><span className="font-medium">Configuration:</span> {formatConfigurationList(property.configuration_international) || property.configuration_international}</div>}
                    </>
                  )}
                  {property.primary_category === "redevelopment-jv" && (
                    <>
                      {property.society_property_name     && <div><span className="font-medium">Society / Property Name:</span> {property.society_property_name}</div>}
                      {property.plot_size                 && <div><span className="font-medium">Plot Size:</span> {property.plot_size}</div>}
                      {property.number_of_wings != null   && <div><span className="font-medium">Number of Wings:</span> {property.number_of_wings}</div>}
                      {property.number_of_members != null && <div><span className="font-medium">Number of Members:</span> {property.number_of_members}</div>}
                      {property.total_permissible_fsi     && <div><span className="font-medium">Total Permissible FSI:</span> {property.total_permissible_fsi}</div>}
                      {property.fsi_consumed              && <div><span className="font-medium">FSI Consumed:</span> {property.fsi_consumed}</div>}
                      {property.balance_fsi               && <div><span className="font-medium">Balance FSI:</span> {property.balance_fsi}</div>}
                      {property.corpus_amount             && <div><span className="font-medium">Corpus Amount:</span> {property.corpus_amount} {property.corpus_amount_type ? `(${property.corpus_amount_type})` : ""}</div>}
                      {property.rent                      && <div><span className="font-medium">Rent:</span> {property.rent}</div>}
                      {property.stage                     && <div><span className="font-medium">Stage:</span> {property.stage}</div>}
                      {property.existing_structure_details && (
                        <div className="md:col-span-2">
                          <span className="font-medium block mb-2">Existing Structure Details:</span>
                          <p className="text-gray-600">{property.existing_structure_details}</p>
                        </div>
                      )}
                      {property.commercial_terms && (
                        <div className="md:col-span-2">
                          <span className="font-medium block mb-2">Commercial Terms:</span>
                          <p className="text-gray-600 whitespace-pre-wrap">{property.commercial_terms}</p>
                        </div>
                      )}
                    </>
                  )}
                  {property.primary_category === "independent-buildings" && (
                    <>
                      {property.transaction_option && <div><span className="font-medium">Transaction Option:</span> {property.transaction_option}</div>}
                      {property.transaction_option === "Pre-Leased" && (
                        <>
                          {property.pre_leased_sale_price && <div><span className="font-medium">Sale Price (Pre-Leased):</span> {property.pre_leased_sale_price.startsWith("₹") ? property.pre_leased_sale_price : `₹ ${formatPriceWithCommas(property.pre_leased_sale_price) || property.pre_leased_sale_price}`}</div>}
                          {property.pre_leased_rent_price && <div><span className="font-medium">Rent Price (Pre-Leased):</span> {property.pre_leased_rent_price.startsWith("₹") ? property.pre_leased_rent_price : `₹ ${formatPriceWithCommas(property.pre_leased_rent_price) || property.pre_leased_rent_price}`}</div>}
                        </>
                      )}
                      {property.transaction_option && property.transaction_option !== "Pre-Leased" && property.price && (
                        <div><span className="font-medium">Price / Rent:</span> {property.price.startsWith("₹") ? property.price : `₹ ${formatPriceWithCommas(property.price) || property.price}`}</div>
                      )}
                      {property.deposit    && <div><span className="font-medium">Deposit:</span> {property.deposit}</div>}
                      {property.tenure     && <div><span className="font-medium">Tenure:</span> {property.tenure} {property.tenure_unit || ""}</div>}
                      {property.escalation && <div><span className="font-medium">Escalation:</span> {property.escalation}</div>}
                    </>
                  )}
                  {property.description && (
                    <div className="md:col-span-2">
                      <span className="font-medium block mb-2">Description:</span>
                      <p className="text-gray-600">{property.description}</p>
                    </div>
                  )}
                  {property.remarks && (
                    <div className="md:col-span-2">
                      <span className="font-medium block mb-2">Remarks:</span>
                      <p className="text-gray-600 whitespace-pre-wrap">{property.remarks}</p>
                    </div>
                  )}
                  {fieldRemarkEntries.length > 0 && (
                    <div className="md:col-span-2">
                      <span className="font-medium block mb-2">Additional Notes:</span>
                      <ul className="list-disc pl-5 text-gray-600 space-y-1">
                        {fieldRemarkEntries.map(([k, v]) => (
                          <li key={k}><span className="font-medium">{fieldLabel(k)}:</span> {v}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PropertyDetails;
