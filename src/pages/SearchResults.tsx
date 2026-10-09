// import { useState, useEffect } from 'react';
// import { useSearchParams } from 'react-router-dom';
//import { propertyService } from '../services/propertyService';
// import { Property } from '../lib/supabase';
// import { formatPriceWithCommas } from '../lib/utils';
// import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
// import { Badge } from '../components/ui/badge';
// import { Button } from '../components/ui/button';
// import { Search, MapPin, Building, Calendar } from 'lucide-react';
// import { Link } from 'react-router-dom';
// import { useNavigate } from "react-router-dom";
// import { ArrowLeft } from "lucide-react";

// const SearchResults = () => {
//   const [searchParams] = useSearchParams();
//   const [properties, setProperties] = useState<Property[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//     const navigate = useNavigate();
//   const query = searchParams.get('q') || '';

//   useEffect(() => {
//     const fetchSearchResults = async () => {
//       if (!query.trim()) {
//         setProperties([]);
//         setLoading(false);
//         return;
//       }
      
//       try {
//         setLoading(true);
//         setError(null);
//         const results = await propertyService.searchProperties(query);
//         console.log("Search Results:", results);
//         setProperties(results);
//       } catch (err) {
//         setError('Failed to fetch search results');
//         console.error('Search error:', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchSearchResults();
//   }, [query]);
  

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50 py-8">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center">
//             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sippy-gold mx-auto"></div>
//             <p className="mt-4 text-gray-600">Searching properties...</p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 py-8">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Search Header */}
//         <div className="mb-8">
//           <div className="flex items-center gap-3 mb-4">
//             <Search className="h-6 w-6 text-sippy-gold" />
//             <h1 className="text-3xl font-bold text-sippy-charcoal">
//               Search Results
//             </h1>
//           </div>
//           <div className="sticky top-0 bg-white z-10 p-3 border-b md:hidden">
//   <div className="sticky top-0 z-10 p-3 ms:hidden">
//   <button
//     onClick={() => navigate(-1)}
//     className="inline-flex items-center gap-2 bg-white border border-gray-300 rounded-lg px-4 py-2 shadow-sm"
//   >
//     <ArrowLeft size={18} />
//     Back
//   </button>
// </div>
// </div>
          
//           {query && (
//             <div className="flex items-center gap-2 text-sippy-gold">
//               <span>Showing results for:</span>
//               <Badge variant="outline" className="text-sippy-gold border-sippy-gold">
//                 "{query}"
//               </Badge>
//             </div>
//           )}
//         </div>

//         {/* Results Count */}
//         <div className="mb-6">
//           <p className="text-gray-600">
//             {properties.length === 0 
//               ? 'No properties found' 
//               : `Found ${properties.length} propert${properties.length === 1 ? 'y' : 'ies'}`
//             }
//           </p>
//         </div>

//         {/* Error Message */}
//         {error && (
//           <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
//             <p className="text-red-600">{error}</p>
//           </div>
//         )}

//         {/* No Results */}
//         {!loading && !error && properties.length === 0 && query && (
//           <div className="text-center py-12">
//             <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
//             <h3 className="text-xl font-semibold text-gray-600 mb-2">
//               No properties found
//             </h3>
//             <p className="text-gray-500 mb-6">
//               Try searching with different keywords or browse all properties
//             </p>
//             <Link to="/all-properties">
//               <Button variant="outline" className="border-sippy-gold text-sippy-gold hover:bg-sippy-gold hover:text-white">
//                 View All Properties
//               </Button>
//             </Link>
//           </div>
//         )}

//         {/* Properties Grid */}
//         {properties.length > 0 && (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {properties.map((property) => (
              
//               <Card key={property.id} className="hover:shadow-lg transition-shadow duration-300">
//                 <CardHeader className="pb-3">
//                   <div className="flex justify-between items-start">
//                     <CardTitle className="text-lg font-semibold text-sippy-charcoal line-clamp-2">
//                       {property.building}
//                     </CardTitle>
//                     <Badge 
//                       variant={property.property_type === 'New' ? 'default' : 'secondary'}
//                       className="ml-2 flex-shrink-0"
//                     >
//                       {property.property_type}
//                     </Badge>
//                   </div>
//                 </CardHeader>
                
//                 <CardContent className="space-y-3">
//                   {/* Location */}
//                   <div className="flex items-center gap-2 text-gray-600">
//                     <MapPin className="h-4 w-4 text-sippy-gold" />
//                     <span className="text-sm">{property.location}</span>
//                   </div>

//                   {/* Builder */}
//                   <div className="flex items-center gap-2 text-gray-600">
//                     <Building className="h-4 w-4 text-sippy-gold" />
//                     <span className="text-sm">{property.builder}</span>
//                   </div>

//                   {/* Property Details */}
//                   <div className="grid grid-cols-2 gap-2 text-sm">
//                     <div>
//                       <span className="text-gray-500">BHK:</span>
//                       <span className="ml-1 font-medium">{property.bhk}</span>
//                     </div>
//                     <div>
//                       <span className="text-gray-500">Size:</span>
//                       <span className="ml-1 font-medium">{property.flat_size}</span>
//                     </div>
//                     <div>
//                       <span className="text-gray-500">Price:</span>
//                       <span className="ml-1 font-medium">
//                       {(formatPriceWithCommas(property.price_range) || property.price_range)
//                         ? `₹ ${formatPriceWithCommas(property.price_range) || property.price_range}`
//                         : "Price on request"}
//                     </span>
//                     </div>
//                     <div>
//                       <span className="text-gray-500">Type:</span>
//                       <span className="ml-1 font-medium">{property.usage_type}</span>
//                     </div>
//                   </div>

//                   {/* Possession Date */}
//                   {property.possession_date && (
//                     <div className="flex items-center gap-2 text-gray-600">
//                       <Calendar className="h-4 w-4 text-sippy-gold" />
//                       <span className="text-sm">
//                         Possession: {new Date(property.possession_date).toLocaleDateString()}
//                       </span>
//                     </div>
//                   )}

//                   {/* View Details Button */}
//                   <Link to={`/property/${property.id}`} className="block mt-4">
//                     <Button className="w-full bg-sippy-gold hover:bg-sippy-gold/90 text-white">
//                       View Details
//                     </Button>
//                   </Link>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default SearchResults; 


// import { useState, useEffect } from 'react';
// import { useSearchParams, Link, useNavigate } from 'react-router-dom';
// import { getPropertyConfigurationLabel } from "@/lib/propertyHelpers";
//import { propertyService } from '../services/propertyService';
// import { Property } from '../lib/supabase';
// import { formatPriceWithCommas } from '../lib/utils';
// import { Card, CardContent } from '../components/ui/card';
// import { Badge } from '../components/ui/badge';
// import { Button } from '../components/ui/button';
// import { Search, MapPin, Building2, Calendar, ArrowLeft, Home, BedDouble, Maximize2, IndianRupee, Tag } from 'lucide-react';

// // ─── Safe field accessor ────────────────────────────────────────
// // Supabase columns may differ from TS type names.
// // This helper tries the typed key first, then common snake_case
// // variants, so cards render regardless of exact column names.
// const get = (obj: Record<string, unknown>, ...keys: string[]): string => {
//   for (const k of keys) {
//     const v = obj?.[k];
//     if (v !== undefined && v !== null && v !== '') return String(v);
//   }
//   return '';
// };

// // ─── Skeleton card ──────────────────────────────────────────────
// const SkeletonCard = () => (
//   <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 animate-pulse">
//     <div className="h-48 bg-gray-200" />
//     <div className="p-5 space-y-3">
//       <div className="h-5 bg-gray-200 rounded w-3/4" />
//       <div className="h-4 bg-gray-100 rounded w-1/2" />
//       <div className="h-4 bg-gray-100 rounded w-2/3" />
//       <div className="grid grid-cols-2 gap-2 pt-1">
//         {[...Array(4)].map((_, i) => (
//           <div key={i} className="h-4 bg-gray-100 rounded" />
//         ))}
//       </div>
//       <div className="h-10 bg-gray-200 rounded-lg mt-2" />
//     </div>
//   </div>
// );

// // ─── Property card ──────────────────────────────────────────────
// const PropertyCard = ({ property }: { property: Property }) => {
//   const p = property as unknown as Record<string, unknown>;

//   // Try every plausible column name for each field
//   const building    = get(p, 'building', 'building_name', 'name', 'title', 'project_name');
//   const location    = get(p, 'location', 'locality', 'area', 'address', 'city');
//   const builder     = get(p, 'builder', 'builder_name', 'developer', 'developer_name');
//   const bhk         = get(p, 'bhk', 'bhk_type', 'bedroom', 'bedrooms', 'configuration');
//   const flatSize    = get(p, 'flat_size', 'size', 'carpet_area', 'super_area', 'area_sqft');
//   const priceRaw    = get(p, 'price_range', 'price', 'budget', 'cost', 'starting_price');
//   const usageType   = get(p, 'usage_type', 'type', 'property_category', 'category');
//   const propType    = get(p, 'property_type', 'status', 'listing_type', 'new_resale');
//   const possession  = get(p, 'possession_date', 'possession', 'handover_date', 'completion_date');
//   const image       = get(p, 'image', 'image_url', 'thumbnail', 'cover_image', 'photo');

//   const priceDisplay = priceRaw
//     ? `₹ ${formatPriceWithCommas(priceRaw) || priceRaw}`
//     : 'Price on request';

//   const isNew = propType?.toLowerCase() === 'new';

//   return (
//     <Link to={`/property/${property.id}`} className="block group">
//       <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1 h-full flex flex-col">

//         {/* Image / Placeholder */}
//         <div className="relative h-48 bg-gradient-to-br from-amber-50 to-stone-100 overflow-hidden flex-shrink-0">
//           {image ? (
//             <img
//               src={image}
//               alt={building || 'Property'}
//               className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
//               onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
//             />
//           ) : (
//             <div className="w-full h-full flex flex-col items-center justify-center gap-2 opacity-40">
//               <Home className="h-12 w-12 text-amber-400" strokeWidth={1} />
//               <span className="text-xs text-stone-500">No image</span>
//             </div>
//           )}

//           {/* Badge */}
//           {propType && (
//             <div className="absolute top-3 left-3">
//               <span className={`px-2.5 py-1 rounded-full text-xs font-semibold shadow-sm ${
//                 isNew
//                   ? 'bg-sippy-gold text-white'
//                   : 'bg-white text-stone-700 border border-stone-200'
//               }`}>
//                 {propType}
//               </span>
//             </div>
//           )}

//           {/* BHK pill */}
//           {bhk && (
//             <div className="absolute top-3 right-3">
//               <span className="bg-white/90 backdrop-blur-sm text-stone-800 text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm">
//                 {bhk} BHK
//               </span>
//             </div>
//           )}
//         </div>

//         {/* Body */}
//         <div className="p-5 flex flex-col flex-1">

//           {/* Title */}
//           <h3 className="font-bold text-sippy-charcoal text-base leading-snug line-clamp-2 mb-3 min-h-[2.5rem]">
//             {building || <span className="text-gray-300 italic">Unnamed property</span>}
//           </h3>

//           {/* Location + Builder */}
//           <div className="space-y-1.5 mb-4">
//             {location && (
//               <div className="flex items-center gap-2 text-gray-500 text-sm">
//                 <MapPin className="h-3.5 w-3.5 text-sippy-gold flex-shrink-0" />
//                 <span className="truncate">{location}</span>
//               </div>
//             )}
//             {builder && (
//               <div className="flex items-center gap-2 text-gray-500 text-sm">
//                 <Building2 className="h-3.5 w-3.5 text-sippy-gold flex-shrink-0" />
//                 <span className="truncate">{builder}</span>
//               </div>
//             )}
//           </div>

//           {/* Specs grid */}
//           <div className="grid grid-cols-2 gap-x-4 gap-y-2.5 mb-4 py-3 border-t border-b border-gray-100">
//             <SpecItem icon={<BedDouble className="h-3.5 w-3.5" />} label="BHK"   value={bhk} />
//             <SpecItem icon={<Maximize2 className="h-3.5 w-3.5" />} label="Size"  value={flatSize} />
//             <SpecItem icon={<IndianRupee className="h-3.5 w-3.5" />} label="Price" value={priceDisplay} highlight />
//             <SpecItem icon={<Tag className="h-3.5 w-3.5" />} label="Type"  value={usageType} />
//           </div>

//           {/* Possession */}
//           {possession && (
//             <div className="flex items-center gap-2 text-gray-500 text-xs mb-4">
//               <Calendar className="h-3.5 w-3.5 text-sippy-gold flex-shrink-0" />
//               <span>
//                 Possession: {(() => {
//                   const d = new Date(possession);
//                   return isNaN(d.getTime()) ? possession : d.toLocaleDateString('en-IN', { month: 'short', year: 'numeric' });
//                 })()}
//               </span>
//             </div>
//           )}

//           {/* CTA */}
//           <div className="mt-auto">
//             <Button className="w-full bg-sippy-gold hover:bg-sippy-gold/90 text-white rounded-xl h-10 text-sm font-semibold shadow-sm hover:shadow-md transition-all">
//               View Details
//             </Button>
//           </div>
//         </div>
//       </div>
//     </Link>
//   );
// };

// // ─── Spec item ──────────────────────────────────────────────────
// const SpecItem = ({
//   icon, label, value, highlight = false,
// }: {
//   icon: React.ReactNode;
//   label: string;
//   value: string;
//   highlight?: boolean;
// }) => (
//   <div className="flex items-start gap-1.5 min-w-0">
//     <span className="text-sippy-gold mt-0.5 flex-shrink-0">{icon}</span>
//     <div className="min-w-0">
//       <span className="text-gray-400 text-xs block">{label}</span>
//       <span className={`text-xs font-semibold truncate block ${highlight ? 'text-sippy-gold' : 'text-gray-800'}`}>
//         {value || '—'}
//       </span>
//     </div>
//   </div>
// );

// // ─── Main component ─────────────────────────────────────────────
// const SearchResults = () => {
//   const [searchParams] = useSearchParams();
//   const [properties, setProperties] = useState<Property[]>([]);
//   const [loading, setLoading]       = useState(true);
//   const [error, setError]           = useState<string | null>(null);
//   const navigate = useNavigate();

//   const query = searchParams.get('q') || '';

//   useEffect(() => {
//     const fetchResults = async () => {
//       if (!query.trim()) {
//         setProperties([]);
//         setLoading(false);
//         return;
//       }
//       try {
//         setLoading(true);
//         setError(null);
//         const results = await propertyService.searchProperties(query);

//         // ── Debug: log first result to see actual column names ──
//         if (results?.length > 0) {
//           console.log('🔍 First property keys:', Object.keys(results[0]));
//           console.log('🔍 First property data:', results[0]);
//         }

//         setProperties(results);
//       } catch (err) {
//         setError('Failed to fetch search results. Please try again.');
//         console.error('Search error:', err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchResults();
//   }, [query]);

//   return (
//     <div className="min-h-screen bg-gray-50">

//       {/* ── Top bar ── */}
//       <div className="bg-white border-b border-gray-200 sticky top-0 z-20 shadow-sm">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center gap-4 h-16">
//             <button
//               onClick={() => navigate(-1)}
//               className="flex items-center gap-2 text-gray-600 hover:text-sippy-gold transition-colors text-sm font-medium"
//             >
//               <ArrowLeft className="h-4 w-4" />
//               Back
//             </button>
//             <div className="w-px h-5 bg-gray-200" />
//             <div className="flex items-center gap-2 text-gray-800">
//               <Search className="h-4 w-4 text-sippy-gold" />
//               <span className="font-semibold text-sm">Search Results</span>
//               {query && (
//                 <>
//                   <span className="text-gray-400 text-sm">for</span>
//                   <span className="bg-amber-50 border border-amber-200 text-amber-700 text-xs font-semibold px-2.5 py-0.5 rounded-full">
//                     "{query}"
//                   </span>
//                 </>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

//         {/* ── Result count ── */}
//         {!loading && !error && (
//           <div className="mb-6 flex items-center justify-between">
//             <p className="text-gray-600 text-sm">
//               {properties.length === 0
//                 ? 'No properties found'
//                 : (
//                   <>
//                     <span className="font-bold text-sippy-charcoal text-base">{properties.length}</span>
//                     {` propert${properties.length === 1 ? 'y' : 'ies'} found`}
//                   </>
//                 )}
//             </p>
//           </div>
//         )}

//         {/* ── Error ── */}
//         {error && (
//           <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3">
//             <span className="text-red-500 text-xl">⚠️</span>
//             <p className="text-red-600 text-sm">{error}</p>
//           </div>
//         )}

//         {/* ── Loading skeletons ── */}
//         {loading && (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
//           </div>
//         )}

//         {/* ── Empty state ── */}
//         {!loading && !error && properties.length === 0 && query && (
//           <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
//             <div className="w-20 h-20 rounded-full bg-amber-50 flex items-center justify-center mx-auto mb-4">
//               <Search className="h-9 w-9 text-sippy-gold opacity-60" />
//             </div>
//             <h3 className="text-xl font-bold text-gray-700 mb-2">No properties found</h3>
//             <p className="text-gray-500 text-sm mb-6 max-w-xs mx-auto">
//               We couldn't find anything for <strong>"{query}"</strong>. Try different keywords or browse all listings.
//             </p>
//             <Link to="/all-properties">
//               <Button className="border border-sippy-gold text-sippy-gold bg-transparent hover:bg-sippy-gold hover:text-white transition-colors rounded-xl">
//                 Browse All Properties
//               </Button>
//             </Link>
//           </div>
//         )}

//         {/* ── Results grid ── */}
//         {!loading && properties.length > 0 && (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {properties.map((property) => (
//               <PropertyCard key={property.id} property={property} />
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default SearchResults;



import { useState, useEffect } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { propertyService } from '../services/propertyService';
import { Property as DbProperty } from '../lib/supabase';
import { formatPriceWithCommas } from '../lib/utils';
import { useCart } from '@/contexts/CartContext';
import { getContactNumberByType } from '@/lib/contactRouting';
import {
  Search, MapPin, Building2, Calendar, ArrowLeft,
  Home, BedDouble, Maximize2, Tag, Heart, ChevronRight,
} from 'lucide-react';
import { Button } from '../components/ui/button';

/* ─────────────────────────────────────────────────────────────────
   SAME converter used in PropertySearch — keeps behaviour identical
───────────────────────────────────────────────────────────────── */
interface SearchProperty {
  id: string;
  title: string;
  location: string;
  price: string;
  bedrooms: number;
  /** Full configuration list, e.g. "1 BHK, 2 BHK, Jodi" */
  configuration: string;
  bathrooms: number;
  area: string;
  image: string;
  type: string;
  description?: string;
  features?: string[];
  source: 'sample' | 'database';
}

const FALLBACK_IMAGES = [
  '/property/25-WEST1.WEBP',
  '/property/ASHAR1.JPG',
  '/property/AVISA1.WEBP',
  '/property/EVERSHINE1.WEBP',
  '/property/LOTUS1.WEBP',
  '/property/RUSTOMJEE1.JPG',
  '/property/SATGURUS1.PNG',
];

const CATEGORY_LABELS: Record<string, string> = {
  luxury: 'Luxury',
  'new-project': 'New Project',
  'resale-rental': 'Resale & Rental',
  'plots-lands': 'Plots & Lands',
  'redevelopment-jv': 'Redevelopment & JV',
  hotels: 'Hotels',
  'independent-buildings': 'Independent Buildings',
  international: 'International',
};

const convertDbPropertyToSearchProperty = (dbProperty: DbProperty): SearchProperty => {
  // Title
  const title =
    dbProperty.header ||
    dbProperty.building ||
    dbProperty.society_property_name ||
    'Property';

  // BHK / bedrooms
  const bhkStr =
    Array.isArray(dbProperty.bhk_options) && dbProperty.bhk_options.length
      ? dbProperty.bhk_options[0]
      : dbProperty.bhk ||
        (dbProperty as DbProperty & { configuration_international?: string }).configuration_international ||
        '';
  const bedroomMatch = String(bhkStr).match(/(\d+)/);
  const bedrooms = bedroomMatch ? parseInt(bedroomMatch[1], 10) : 0;
  const configuration = getPropertyConfigurationLabel(dbProperty);
  const bathrooms = dbProperty.bathrooms ?? (bedrooms > 0 ? bedrooms + 1 : 2);

  // Area
  const area =
    dbProperty.area ||
    dbProperty.flat_size ||
    dbProperty.plot_size ||
    dbProperty.constructed_area ||
    (dbProperty as DbProperty & { property_size?: string }).property_size ||
    (dbProperty as DbProperty & { built_up_area?: string }).built_up_area ||
    'N/A';

  // Price
  const price =
    dbProperty.price ||
    dbProperty.price_range ||
    dbProperty.sale_price ||
    (dbProperty as DbProperty & { price_international?: string }).price_international ||
    'Price on request';
  const priceShown = /^\s*(n\/a|na|-|0)?\s*$/i.test(String(price)) ? 'Price on request' : price;

  // Type
  const type =
    (dbProperty.primary_category && CATEGORY_LABELS[dbProperty.primary_category]) ||
    dbProperty.primary_category ||
    dbProperty.property_type ||
    dbProperty.usage_type ||
    (dbProperty as DbProperty & { usage_type_category?: string }).usage_type_category ||
    (dbProperty as DbProperty & { property_type_international?: string }).property_type_international ||
    'Property';

  // Image — same deterministic fallback as PropertySearch
  const imageIndex =
    Math.abs(title.split('').reduce((a: number, b: string) => a + b.charCodeAt(0), 0)) %
    FALLBACK_IMAGES.length;
  const image = FALLBACK_IMAGES[imageIndex] || '/placeholder.svg';

  // Description
  const description =
    dbProperty.description ||
    dbProperty.additional_info ||
    (bedrooms > 0 ? `${bedrooms} BHK` : '') +
      (dbProperty.location ? ` property in ${dbProperty.location}` : '');

  // Features
  const features = [
    dbProperty.towers ? `${dbProperty.towers} Tower${dbProperty.towers > 1 ? 's' : ''}` : null,
    dbProperty.acres  ? `${dbProperty.acres} Acre${dbProperty.acres > 1 ? 's' : ''}`   : null,
    dbProperty.units  ? `${dbProperty.units} Units`                                      : null,
    dbProperty.rera_number ? 'RERA Certified'                                            : null,
    'Parking',
    'Security',
  ].filter(Boolean) as string[];

  return {
    id: `db-${dbProperty.id}`,
    title,
    location: dbProperty.location || dbProperty.sub_location || dbProperty.city || '',
    price: priceShown,
    bedrooms,
    configuration,
    bathrooms,
    area,
    image,
    type,
    description,
    features,
    source: 'database',
  };
};

/* ─────────────────────────────────────────────────────────────────
   SKELETON
───────────────────────────────────────────────────────────────── */
const SkeletonCard = () => (
  <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 animate-pulse">
    <div className="h-52 bg-gray-200" />
    <div className="p-5 space-y-3">
      <div className="h-5 bg-gray-200 rounded w-3/4" />
      <div className="h-4 bg-gray-100 rounded w-1/2" />
      <div className="h-4 bg-gray-100 rounded w-2/3" />
      <div className="grid grid-cols-2 gap-2 pt-1">
        {[...Array(4)].map((_, i) => <div key={i} className="h-4 bg-gray-100 rounded" />)}
      </div>
      <div className="h-10 bg-gray-200 rounded-xl mt-2" />
    </div>
  </div>
);

/* ─────────────────────────────────────────────────────────────────
   PROPERTY CARD
───────────────────────────────────────────────────────────────── */
const PropertyCard = ({
  property,
  onViewDetails,
  onToggleFavorite,
  isFavorite,
}: {
  property: SearchProperty;
  onViewDetails: (p: SearchProperty) => void;
  onToggleFavorite: (p: SearchProperty) => void;
  isFavorite: boolean;
}) => {
  const priceDisplay =
    formatPriceWithCommas(property.price) || property.price
      ? `₹ ${formatPriceWithCommas(property.price) || property.price}`
      : 'Price on request';

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col h-full group">

      {/* Image */}
      <div className="relative h-52 bg-gradient-to-br from-amber-50 to-stone-100 overflow-hidden flex-shrink-0">
        <img
          src={property.image}
          alt={property.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => { (e.target as HTMLImageElement).src = '/placeholder.svg'; }}
        />

        {/* Type badge */}
        <div className="absolute top-3 left-3">
          <span className="bg-sippy-gold text-white px-3 py-1 rounded-full text-xs font-semibold shadow-sm">
            {property.type}
          </span>
        </div>

        {/* Favourite */}
        <button
          onClick={(e) => { e.stopPropagation(); onToggleFavorite(property); }}
          className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors shadow-sm"
          aria-label={isFavorite ? 'Remove from favourites' : 'Add to favourites'}
        >
          <Heart
            className={`h-4 w-4 transition-colors ${isFavorite ? 'text-red-500 fill-red-500' : 'text-gray-500'}`}
          />
        </button>

        {/* BHK pill */}
        {property.configuration && (
          <div className="absolute bottom-3 left-3">
            <span className="bg-black/50 backdrop-blur-sm text-white text-xs font-semibold px-2.5 py-1 rounded-full">
              {property.configuration}
            </span>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col flex-1">

        {/* Title */}
        <h3 className="font-bold text-sippy-charcoal text-base leading-snug line-clamp-2 mb-3 min-h-[2.5rem]">
          {property.title}
        </h3>

        {/* Location */}
        {property.location && (
          <div className="flex items-center gap-2 text-gray-500 text-sm mb-1.5">
            <MapPin className="h-3.5 w-3.5 text-sippy-gold flex-shrink-0" />
            <span className="truncate">{property.location}</span>
          </div>
        )}

        {/* Price */}
        <div className="text-sippy-gold font-bold text-base mb-4">{priceDisplay}</div>

        {/* Specs */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 py-3 border-t border-b border-gray-100 mb-4">
          <SpecItem icon={<BedDouble className="h-3.5 w-3.5" />} label="BHK"  value={property.configuration || '—'} />
          <SpecItem icon={<Maximize2 className="h-3.5 w-3.5" />} label="Area" value={property.area} />
          <SpecItem icon={<Tag className="h-3.5 w-3.5" />}      label="Type" value={property.type} />
          {property.features?.includes('RERA Certified') && (
            <SpecItem icon={<Building2 className="h-3.5 w-3.5" />} label="RERA" value="Certified" />
          )}
        </div>

        {/* Features pills */}
        {property.features && property.features.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {property.features.slice(0, 4).map((f) => (
              <span key={f} className="bg-amber-50 text-amber-800 border border-amber-100 text-xs px-2 py-0.5 rounded-full">
                {f}
              </span>
            ))}
          </div>
        )}

        {/* Actions */}
        <div className="mt-auto flex gap-2">
          <button
            onClick={() => onViewDetails(property)}
            className="flex-1 flex items-center justify-center gap-1.5 h-10 bg-sippy-gold hover:bg-sippy-gold/90 text-white text-sm font-semibold rounded-xl transition-all shadow-sm hover:shadow-md"
          >
            View Details
            <ChevronRight className="h-4 w-4" />
          </button>
          <button
            onClick={() => onToggleFavorite(property)}
            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors flex-shrink-0 ${
              isFavorite ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
            }`}
            aria-label={isFavorite ? 'Remove from favourites' : 'Save'}
          >
            <Heart className={`h-4 w-4 ${isFavorite ? 'fill-current' : ''}`} />
          </button>
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────────
   SPEC ITEM
───────────────────────────────────────────────────────────────── */
const SpecItem = ({
  icon, label, value,
}: {
  icon: React.ReactNode; label: string; value: string;
}) => (
  <div className="flex items-start gap-1.5 min-w-0">
    <span className="text-sippy-gold mt-0.5 flex-shrink-0">{icon}</span>
    <div className="min-w-0">
      <span className="text-gray-400 text-xs block">{label}</span>
      <span className="text-xs font-semibold truncate block text-gray-800">{value || '—'}</span>
    </div>
  </div>
);

/* ─────────────────────────────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────────────────────────────── */
const SearchResults = () => {
  const [searchParams]    = useSearchParams();
  const [properties, setProperties] = useState<SearchProperty[]>([]);
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState<string | null>(null);
  const navigate = useNavigate();
  const { addToCart, removeFromCart, isInCart } = useCart();

  const query = searchParams.get('q') || '';

  /* ── Fetch ── */
  useEffect(() => {
    const fetchResults = async () => {
      if (!query.trim()) {
        setProperties([]);
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        setError(null);
        const dbResults = await propertyService.searchProperties(query);
        setProperties(dbResults.map(convertDbPropertyToSearchProperty));
      } catch (err) {
        setError('Failed to fetch search results. Please try again.');
        console.error('Search error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchResults();
  }, [query]);

  /* ── View details — same logic as PropertySearch ── */
  const handleViewDetails = (property: SearchProperty) => {
    const id = property.id.startsWith('db-') ? property.id.replace(/^db-/, '') : null;
    if (id) {
      navigate(`/property/${id}`);
    } else {
      const completeProperty = {
        ...property,
        size: property.area,
        bedroomTypes: property.configuration || '',
        possessionDate: '2025',
        builder: 'Sippy Housing',
        totalFlats: '150',
        towers: '2',
        acres: '5.2',
        units: 'Available',
        contact_number: getContactNumberByType(property.type),
        photo: [property.image],
      };
      navigate('/property-details', { state: { property: completeProperty } });
    }
  };

  /* ── Toggle favourite — same logic as PropertySearch ── */
  const handleToggleFavorite = (property: SearchProperty) => {
    if (isInCart(property.id)) {
      removeFromCart(property.id);
    } else {
      addToCart({
        id: property.id,
        title: property.title,
        location: property.location,
        price: property.price,
        type: property.type,
        image: property.image,
        source: 'search',
      });
    }
  };

  /* ─────────────────────── render ─────────────────────────── */
  return (
    <div className="min-h-screen bg-gray-50">

      {/* ── Sticky top bar ── */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-20 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 h-16">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-gray-600 hover:text-sippy-gold transition-colors text-sm font-medium"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </button>
            <div className="w-px h-5 bg-gray-200" />
            <div className="flex items-center gap-2 flex-wrap">
              <Search className="h-4 w-4 text-sippy-gold" />
              <span className="font-semibold text-sm text-gray-800">Search Results</span>
              {query && (
                <>
                  <span className="text-gray-400 text-sm">for</span>
                  <span className="bg-amber-50 border border-amber-200 text-amber-700 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                    "{query}"
                  </span>
                </>
              )}
            </div>
            {!loading && (
              <span className="ml-auto text-sm text-gray-500">
                {properties.length > 0
                  ? `${properties.length} propert${properties.length === 1 ? 'y' : 'ies'} found`
                  : 'No results'}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* ── Error ── */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3">
            <span className="text-red-500 text-xl">⚠️</span>
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        {/* ── Skeletons ── */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
          </div>
        )}

        {/* ── Empty state ── */}
        {!loading && !error && properties.length === 0 && query && (
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
            <div className="w-20 h-20 rounded-full bg-amber-50 flex items-center justify-center mx-auto mb-4">
              <Search className="h-9 w-9 text-sippy-gold opacity-60" />
            </div>
            <h3 className="text-xl font-bold text-gray-700 mb-2">No properties found</h3>
            <p className="text-gray-500 text-sm mb-6 max-w-xs mx-auto">
              We couldn't find anything for <strong>"{query}"</strong>. Try different keywords or browse all listings.
            </p>
            <Link to="/all-properties">
              <Button className="border border-sippy-gold text-sippy-gold bg-transparent hover:bg-sippy-gold hover:text-white transition-colors rounded-xl">
                Browse All Properties
              </Button>
            </Link>
          </div>
        )}

        {/* ── Results grid ── */}
        {!loading && properties.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                onViewDetails={handleViewDetails}
                onToggleFavorite={handleToggleFavorite}
                isFavorite={isInCart(property.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
