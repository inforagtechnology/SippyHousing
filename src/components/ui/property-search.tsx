import React, { useState, useEffect } from 'react';
import { Search, MapPin, Bed, Bath, Square, Heart, HeartOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import { getPropertyConfigurationLabel } from "@/lib/propertyHelpers";
import { propertyService } from '@/services/propertyService';
import { Property as DbProperty } from '@/lib/supabase';
import { useCart } from '@/contexts/CartContext';
import { formatPriceWithCommas } from '@/lib/utils';
import { getContactNumberByType } from '@/lib/contactRouting';

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

interface PropertySearchProps {
  onSearchResults: (results: SearchProperty[]) => void;
}

const PropertySearch: React.FC<PropertySearchProps> = ({ onSearchResults }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchProperty[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();
  const { addToCart, removeFromCart, isInCart } = useCart();

  // Convert database property to search property format (supports new columns and categories)
  const convertDbPropertyToSearchProperty = (dbProperty: DbProperty): SearchProperty => {
    // Title: header (new) or building (legacy)
    const title = dbProperty.header || dbProperty.building || dbProperty.society_property_name || 'Property';

    // BHK / bedrooms: from bhk_options, bhk (legacy), or configuration_international
    const bhkStr = Array.isArray(dbProperty.bhk_options) && dbProperty.bhk_options.length
      ? dbProperty.bhk_options[0]
      : dbProperty.bhk || (dbProperty as DbProperty & { configuration_international?: string }).configuration_international || '';
    const bedroomMatch = String(bhkStr).match(/(\d+)/);
    const bedrooms = bedroomMatch ? parseInt(bedroomMatch[1], 10) : 0;
    const configuration = getPropertyConfigurationLabel(dbProperty);
    const bathrooms = dbProperty.bathrooms ?? (bedrooms > 0 ? bedrooms + 1 : 2);

    // Area: area, flat_size, plot_size, constructed_area, property_size, built_up_area
    const area =
      dbProperty.area ||
      dbProperty.flat_size ||
      dbProperty.plot_size ||
      dbProperty.constructed_area ||
      (dbProperty as DbProperty & { property_size?: string }).property_size ||
      (dbProperty as DbProperty & { built_up_area?: string }).built_up_area ||
      'N/A';

    // Price: price, price_range, sale_price, price_international
    const price =
      dbProperty.price ||
      dbProperty.price_range ||
      dbProperty.sale_price ||
      (dbProperty as DbProperty & { price_international?: string }).price_international ||
      'Price on request';
  const priceShown = /^\s*(n\/a|na|-|0)?\s*$/i.test(String(price)) ? 'Price on request' : price;

    // Type: primary_category (human-readable), property_type, usage_type_category, etc.
    const categoryLabels: Record<string, string> = {
      luxury: 'Luxury',
      'new-project': 'New Project',
      'resale-rental': 'Resale & Rental',
      'plots-lands': 'Plots & Lands',
      'redevelopment-jv': 'Redevelopment & JV',
      hotels: 'Hotels',
      'independent-buildings': 'Independent Buildings',
      international: 'International',
    };
    const type =
      (dbProperty.primary_category && categoryLabels[dbProperty.primary_category]) ||
      dbProperty.primary_category ||
      dbProperty.property_type ||
      dbProperty.usage_type ||
      (dbProperty as DbProperty & { usage_type_category?: string }).usage_type_category ||
      (dbProperty as DbProperty & { property_type_international?: string }).property_type_international ||
      'Property';

    // Fallback image set for when no property_images
    const propertyImages = [
      '/property/25-WEST1.WEBP',
      '/property/ASHAR1.JPG',
      '/property/AVISA1.WEBP',
      '/property/EVERSHINE1.WEBP',
      '/property/LOTUS1.WEBP',
      '/property/RUSTOMJEE1.JPG',
      '/property/SATGURUS1.PNG',
    ];
    const imageIndex = Math.abs(title.split('').reduce((a, b) => a + b.charCodeAt(0), 0)) % propertyImages.length;
    const image = propertyImages[imageIndex] || '/placeholder.svg';

    const description =
      dbProperty.description ||
      dbProperty.additional_info ||
      (bedrooms > 0 ? `${bedrooms} BHK` : '') +
        (dbProperty.location ? ` property in ${dbProperty.location}` : '') ||
      '';

    const features = [
      dbProperty.towers ? `${dbProperty.towers} Tower${dbProperty.towers > 1 ? 's' : ''}` : null,
      dbProperty.acres ? `${dbProperty.acres} Acre${dbProperty.acres > 1 ? 's' : ''}` : null,
      dbProperty.units ? `${dbProperty.units} Units` : null,
      dbProperty.rera_number ? 'RERA Certified' : null,
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

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      onSearchResults([]);
      return;
    }

    setIsSearching(true);
    
    try {
      // Search database properties
      const dbProperties = await propertyService.searchProperties(query);
      const results = dbProperties.map(convertDbPropertyToSearchProperty);
      
      setSearchResults(results);
      onSearchResults(results);
    } catch (error) {
      console.error('Error searching database properties:', error);
      setSearchResults([]);
      onSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    handleSearch(value);
  };

  const handleViewDetails = (property: SearchProperty) => {
    // Database results use id like "db-<uuid>"; navigate to /property/:id so PropertyDetails loads from API
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
        source: 'search'
      });
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Search Bar */}
      <div className="relative mb-8">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Search anything – name, location, 3bhk, rental, bha*..."
            value={searchQuery}
            onChange={handleInputChange}
            className="w-full pl-12 pr-4 py-4 text-lg border-2 border-white/20 bg-white/10 backdrop-blur-sm text-white placeholder:text-white/70 focus:bg-white/20 focus:border-sippy-gold focus:text-white focus:placeholder:text-white/70 rounded-lg"
          />
        </div>
      </div>

      {/* Search Results */}
      {searchQuery && (
        <div className="bg-white/95 backdrop-blur-sm rounded-lg p-6 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-sippy-charcoal">
              Search Results
            </h3>
            <span className="text-sm text-gray-600">
              {isSearching ? 'Searching...' : `${searchResults.length} properties found`}
            </span>
          </div>

          {isSearching ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sippy-gold mx-auto"></div>
              <p className="text-gray-600 mt-2">Searching properties...</p>
            </div>
          ) : searchResults.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {searchResults.map((property) => (
                <div key={property.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow border border-gray-100">
                  <div className="relative h-48">
                    <img 
                      src={property.image} 
                      alt={property.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/placeholder.svg';
                      }}
                    />
                    <div className="absolute top-3 left-3">
                      <span className="bg-sippy-gold text-white px-3 py-1 rounded-full text-xs font-medium">
                        {property.type}
                      </span>
                    </div>
                    <button
                      onClick={() => handleToggleFavorite(property)}
                      className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
                    >
                      {isInCart(property.id) ? (
                        <Heart className="h-5 w-5 text-red-500 fill-red-500" />
                      ) : (
                        <Heart className="h-5 w-5 text-gray-600" />
                      )}
                    </button>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold mb-1 text-sippy-charcoal">{property.title}</h3>
                    <div className="flex items-center mb-3 text-sm">
                      <MapPin className="h-4 w-4 text-sippy-gold mr-1" />
                      <span className="text-sippy-charcoal/80">{property.location}</span>
                    </div>
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex items-center">
                        <span className="font-semibold text-sippy-charcoal">
                        {(formatPriceWithCommas(property.price) || property.price)
                          ? `₹ ${formatPriceWithCommas(property.price) || property.price}`
                          : "Price on request"}
                      </span>
                      </div>
                    </div>
                    <div className="flex items-center text-sm mb-3">
                      <Square className="h-4 w-4 text-sippy-gold mr-1" />
                      <span className="text-sippy-charcoal/80">{property.area}</span>
                    </div>
                    <div className="flex items-center mb-3">
                      <Bed className="h-4 w-4 text-sippy-gold mr-1" />
                      <span className="text-sm text-sippy-charcoal/80">{property.configuration || "—"}</span>
                    </div>
                    <div className="flex gap-2">
                      <button 
                        className="btn-outline flex-1 flex items-center justify-center"
                        onClick={() => handleViewDetails(property)}
                      >
                        View Details
                      </button>
                      <button
                        onClick={() => handleToggleFavorite(property)}
                        className={`px-4 py-2 rounded-lg flex items-center justify-center transition-colors ${
                          isInCart(property.id)
                            ? 'bg-red-500 text-white hover:bg-red-600'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {isInCart(property.id) ? (
                          <Heart className="h-4 w-4 fill-current" />
                        ) : (
                          <HeartOff className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-600">No properties found matching your search.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PropertySearch;
