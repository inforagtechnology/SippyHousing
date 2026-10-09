import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, Home, IndianRupee, Building, Car, Bed, Bath, Calendar, Phone, Mail } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Watermark from "@/components/sections/Watermark";
import { formatPriceWithCommas } from "@/lib/utils";

interface Property {
  id: number;
  title: string;
  location: string;
  price: string;
  type: 'rent' | 'resale';
  propertyType: string;
  size: string;
  bedrooms: number;
  image: string;
  featured: boolean;
  bathrooms?: number;
  carPark?: string;
  fixtures?: string;
  folder?: string;
}

// Function to get all images from a property folder
const getPropertyImages = (folder: string): string[] => {
  // This is a simplified approach - in a real app, you'd fetch this from an API
  // For now, we'll use a mapping of known image patterns
  const imagePatterns: { [key: string]: string[] } = {
    'FORTUNE HEIGHTS': [
      'PHOTO-2025-06-20-14-55-26.jpg',
      'PHOTO-2025-06-20-14-55-26(1).jpg',
      'PHOTO-2025-06-20-14-55-26(2).jpg',
      'PHOTO-2025-06-20-14-55-26(3).jpg',
      'PHOTO-2025-06-20-14-55-26(4).jpg',
      'PHOTO-2025-06-20-14-55-26(5).jpg',
      'PHOTO-2025-06-20-14-55-26(6).jpg',
      'PHOTO-2025-06-20-14-55-26(7).jpg',
      'PHOTO-2025-06-20-14-55-26(8).jpg',
      'PHOTO-2025-06-20-14-55-26(9).jpg',
      'PHOTO-2025-06-20-14-55-26(10).jpg',
      'PHOTO-2025-06-20-14-55-26(11).jpg',
      'PHOTO-2025-06-20-14-55-26(12).jpg',
      'PHOTO-2025-06-20-14-55-26(13).jpg',
      'PHOTO-2025-06-20-14-55-26(14).jpg',
      'PHOTO-2025-06-20-14-55-26(15).jpg',
      'PHOTO-2025-06-20-14-55-26(16).jpg',
      'PHOTO-2025-06-20-14-55-26(17).jpg',
      'PHOTO-2025-06-20-14-55-26(18).jpg',
      'PHOTO-2025-06-20-14-55-26(19).jpg',
      'PHOTO-2025-06-20-14-55-26(20).jpg',
      'PHOTO-2025-06-20-14-55-26(21).jpg',
      'PHOTO-2025-06-20-14-55-26(22).jpg',
    ],
    'SKYLARK': [
      'aaa.jpg',
      'PHOTO-2025-06-20-15-00-50(1).jpg',
      'PHOTO-2025-06-20-15-00-50(2).jpg',
      'PHOTO-2025-06-20-15-00-50(3).jpg',
      'PHOTO-2025-06-20-15-00-50(4).jpg',
      'PHOTO-2025-06-20-15-00-50(5).jpg',
      'PHOTO-2025-06-20-15-00-50(6).jpg',
      'PHOTO-2025-06-20-15-00-50(7).jpg',
      'PHOTO-2025-06-20-15-00-50(8).jpg',
      'PHOTO-2025-06-20-15-00-50(9).jpg',
      'PHOTO-2025-06-20-15-00-50(10).jpg',
      'PHOTO-2025-06-20-15-00-50(11).jpg',
      'PHOTO-2025-06-20-15-00-50(12).jpg',
    ],
    'BENSTON 2BHK': [
      'PHOTO-2025-06-20-14-55-26.jpg',
      'PHOTO-2025-06-20-14-55-26(1).jpg',
      'PHOTO-2025-06-20-14-55-26(2).jpg',
      'PHOTO-2025-06-20-14-55-26(3).jpg',
      'PHOTO-2025-06-20-14-55-26(4).jpg',
      'PHOTO-2025-06-20-14-55-26(5).jpg',
      'PHOTO-2025-06-20-14-55-26(6).jpg',
      'PHOTO-2025-06-20-14-55-26(7).jpg',
      'PHOTO-2025-06-20-14-55-26(8).jpg',
      'PHOTO-2025-06-20-14-55-26(9).jpg',
      'PHOTO-2025-06-20-14-55-26(10).jpg',
      'PHOTO-2025-06-20-14-55-26(11).jpg',
      'PHOTO-2025-06-20-14-55-26(12).jpg',
      'PHOTO-2025-06-20-14-55-26(13).jpg',
      'PHOTO-2025-06-20-14-55-26(14).jpg',
      'PHOTO-2025-06-20-14-55-26(15).jpg',
      'PHOTO-2025-06-20-14-55-26(16).jpg',
      'PHOTO-2025-06-20-14-55-26(17).jpg',
      'PHOTO-2025-06-20-14-55-26(18).jpg',
      'PHOTO-2025-06-20-14-55-26(19).jpg',
      'PHOTO-2025-06-20-14-55-26(20).jpg',
      'PHOTO-2025-06-20-14-55-26(21).jpg',
      'PHOTO-2025-06-20-14-55-26(22).jpg',
    ],
    'BENSTON 4BHK': [
      'PHOTO-2025-06-20-14-50-10.jpg',
      'PHOTO-2025-06-20-14-50-11(1).jpg',
      'PHOTO-2025-06-20-14-50-11.jpg',
      'PHOTO-2025-06-20-14-50-12(1).jpg',
      'PHOTO-2025-06-20-14-50-12(2).jpg',
      'PHOTO-2025-06-20-14-50-12(3).jpg',
      'PHOTO-2025-06-20-14-50-12(4).jpg',
      'PHOTO-2025-06-20-14-50-12(5).jpg',
      'PHOTO-2025-06-20-14-55-13(1).jpg',
      'PHOTO-2025-06-20-14-55-13(2).jpg',
      'PHOTO-2025-06-20-14-55-13(3).jpg',
      'PHOTO-2025-06-20-14-55-13(4).jpg',
      'PHOTO-2025-06-20-14-55-13(5).jpg',
    ],
    'PARVATI SADAN': [
      'PHOTO-2025-06-20-14-55-26.jpg',
      'PHOTO-2025-06-20-14-55-26(1).jpg',
      'PHOTO-2025-06-20-14-55-26(2).jpg',
      'PHOTO-2025-06-20-14-55-26(3).jpg',
      'PHOTO-2025-06-20-14-55-26(4).jpg',
      'PHOTO-2025-06-20-14-55-26(5).jpg',
      'PHOTO-2025-06-20-14-55-26(6).jpg',
      'PHOTO-2025-06-20-14-55-26(7).jpg',
      'PHOTO-2025-06-20-14-55-26(8).jpg',
      'PHOTO-2025-06-20-14-55-26(9).jpg',
      'PHOTO-2025-06-20-14-55-26(10).jpg',
      'PHOTO-2025-06-20-14-55-26(11).jpg',
      'PHOTO-2025-06-20-14-55-26(12).jpg',
      'PHOTO-2025-06-20-14-55-26(13).jpg',
      'PHOTO-2025-06-20-14-55-26(14).jpg',
      'PHOTO-2025-06-20-14-55-26(15).jpg',
      'PHOTO-2025-06-20-14-55-26(16).jpg',
      'PHOTO-2025-06-20-14-55-26(17).jpg',
      'PHOTO-2025-06-20-14-55-26(18).jpg',
      'PHOTO-2025-06-20-14-55-26(19).jpg',
      'PHOTO-2025-06-20-14-55-26(20).jpg',
      'PHOTO-2025-06-20-14-55-26(21).jpg',
      'PHOTO-2025-06-20-14-55-26(22).jpg',
    ],
    'BONNYCASA': [
      'PHOTO-2025-06-20-14-55-26.jpg',
      'PHOTO-2025-06-20-14-55-26(1).jpg',
      'PHOTO-2025-06-20-14-55-26(2).jpg',
      'PHOTO-2025-06-20-14-55-26(3).jpg',
      'PHOTO-2025-06-20-14-55-26(4).jpg',
      'PHOTO-2025-06-20-14-55-26(5).jpg',
      'PHOTO-2025-06-20-14-55-26(6).jpg',
      'PHOTO-2025-06-20-14-55-26(7).jpg',
      'PHOTO-2025-06-20-14-55-26(8).jpg',
      'PHOTO-2025-06-20-14-55-26(9).jpg',
      'PHOTO-2025-06-20-14-55-26(10).jpg',
      'PHOTO-2025-06-20-14-55-26(11).jpg',
      'PHOTO-2025-06-20-14-55-26(12).jpg',
      'PHOTO-2025-06-20-14-55-26(13).jpg',
      'PHOTO-2025-06-20-14-55-26(14).jpg',
      'PHOTO-2025-06-20-14-55-26(15).jpg',
      'PHOTO-2025-06-20-14-55-26(16).jpg',
      'PHOTO-2025-06-20-14-55-26(17).jpg',
      'PHOTO-2025-06-20-14-55-26(18).jpg',
      'PHOTO-2025-06-20-14-55-26(19).jpg',
      'PHOTO-2025-06-20-14-55-26(20).jpg',
      'PHOTO-2025-06-20-14-55-26(21).jpg',
      'PHOTO-2025-06-20-14-55-26(22).jpg',
    ],
    'K52 KOLTE PATIL': [
      'PHOTO-2025-06-20-14-55-26.jpg',
      'PHOTO-2025-06-20-14-55-26(1).jpg',
      'PHOTO-2025-06-20-14-55-26(2).jpg',
      'PHOTO-2025-06-20-14-55-26(3).jpg',
      'PHOTO-2025-06-20-14-55-26(4).jpg',
      'PHOTO-2025-06-20-14-55-26(5).jpg',
      'PHOTO-2025-06-20-14-55-26(6).jpg',
      'PHOTO-2025-06-20-14-55-26(7).jpg',
      'PHOTO-2025-06-20-14-55-26(8).jpg',
      'PHOTO-2025-06-20-14-55-26(9).jpg',
      'PHOTO-2025-06-20-14-55-26(10).jpg',
      'PHOTO-2025-06-20-14-55-26(11).jpg',
      'PHOTO-2025-06-20-14-55-26(12).jpg',
      'PHOTO-2025-06-20-14-55-26(13).jpg',
      'PHOTO-2025-06-20-14-55-26(14).jpg',
      'PHOTO-2025-06-20-14-55-26(15).jpg',
      'PHOTO-2025-06-20-14-55-26(16).jpg',
      'PHOTO-2025-06-20-14-55-26(17).jpg',
      'PHOTO-2025-06-20-14-55-26(18).jpg',
      'PHOTO-2025-06-20-14-55-26(19).jpg',
      'PHOTO-2025-06-20-14-55-26(20).jpg',
      'PHOTO-2025-06-20-14-55-26(21).jpg',
      'PHOTO-2025-06-20-14-55-26(22).jpg',
    ],
    'RUSTOMJEE PARAMOUNT': [
      'PHOTO-2025-06-20-14-55-26.jpg',
      'PHOTO-2025-06-20-14-55-26(1).jpg',
      'PHOTO-2025-06-20-14-55-26(2).jpg',
      'PHOTO-2025-06-20-14-55-26(3).jpg',
      'PHOTO-2025-06-20-14-55-26(4).jpg',
      'PHOTO-2025-06-20-14-55-26(5).jpg',
      'PHOTO-2025-06-20-14-55-26(6).jpg',
      'PHOTO-2025-06-20-14-55-26(7).jpg',
      'PHOTO-2025-06-20-14-55-26(8).jpg',
      'PHOTO-2025-06-20-14-55-26(9).jpg',
      'PHOTO-2025-06-20-14-55-26(10).jpg',
      'PHOTO-2025-06-20-14-55-26(11).jpg',
      'PHOTO-2025-06-20-14-55-26(12).jpg',
      'PHOTO-2025-06-20-14-55-26(13).jpg',
      'PHOTO-2025-06-20-14-55-26(14).jpg',
      'PHOTO-2025-06-20-14-55-26(15).jpg',
      'PHOTO-2025-06-20-14-55-26(16).jpg',
      'PHOTO-2025-06-20-14-55-26(17).jpg',
      'PHOTO-2025-06-20-14-55-26(18).jpg',
      'PHOTO-2025-06-20-14-55-26(19).jpg',
      'PHOTO-2025-06-20-14-55-26(20).jpg',
      'PHOTO-2025-06-20-14-55-26(21).jpg',
      'PHOTO-2025-06-20-14-55-26(22).jpg',
    ],
    'H&M TOWER': [
      'PHOTO-2025-06-20-14-55-26.jpg',
      'PHOTO-2025-06-20-14-55-26(1).jpg',
      'PHOTO-2025-06-20-14-55-26(2).jpg',
      'PHOTO-2025-06-20-14-55-26(3).jpg',
      'PHOTO-2025-06-20-14-55-26(4).jpg',
      'PHOTO-2025-06-20-14-55-26(5).jpg',
      'PHOTO-2025-06-20-14-55-26(6).jpg',
      'PHOTO-2025-06-20-14-55-26(7).jpg',
      'PHOTO-2025-06-20-14-55-26(8).jpg',
      'PHOTO-2025-06-20-14-55-26(9).jpg',
      'PHOTO-2025-06-20-14-55-26(10).jpg',
      'PHOTO-2025-06-20-14-55-26(11).jpg',
      'PHOTO-2025-06-20-14-55-26(12).jpg',
      'PHOTO-2025-06-20-14-55-26(13).jpg',
      'PHOTO-2025-06-20-14-55-26(14).jpg',
      'PHOTO-2025-06-20-14-55-26(15).jpg',
      'PHOTO-2025-06-20-14-55-26(16).jpg',
      'PHOTO-2025-06-20-14-55-26(17).jpg',
      'PHOTO-2025-06-20-14-55-26(18).jpg',
      'PHOTO-2025-06-20-14-55-26(19).jpg',
      'PHOTO-2025-06-20-14-55-26(20).jpg',
      'PHOTO-2025-06-20-14-55-26(21).jpg',
      'PHOTO-2025-06-20-14-55-26(22).jpg',
    ],
    'SONY APT GARDEN': [
      'PHOTO-2025-06-20-14-55-26.jpg',
      'PHOTO-2025-06-20-14-55-26(1).jpg',
      'PHOTO-2025-06-20-14-55-26(2).jpg',
      'PHOTO-2025-06-20-14-55-26(3).jpg',
      'PHOTO-2025-06-20-14-55-26(4).jpg',
      'PHOTO-2025-06-20-14-55-26(5).jpg',
      'PHOTO-2025-06-20-14-55-26(6).jpg',
      'PHOTO-2025-06-20-14-55-26(7).jpg',
      'PHOTO-2025-06-20-14-55-26(8).jpg',
      'PHOTO-2025-06-20-14-55-26(9).jpg',
      'PHOTO-2025-06-20-14-55-26(10).jpg',
      'PHOTO-2025-06-20-14-55-26(11).jpg',
      'PHOTO-2025-06-20-14-55-26(12).jpg',
      'PHOTO-2025-06-20-14-55-26(13).jpg',
      'PHOTO-2025-06-20-14-55-26(14).jpg',
      'PHOTO-2025-06-20-14-55-26(15).jpg',
      'PHOTO-2025-06-20-14-55-26(16).jpg',
      'PHOTO-2025-06-20-14-55-26(17).jpg',
      'PHOTO-2025-06-20-14-55-26(18).jpg',
      'PHOTO-2025-06-20-14-55-26(19).jpg',
      'PHOTO-2025-06-20-14-55-26(20).jpg',
      'PHOTO-2025-06-20-14-55-26(21).jpg',
      'PHOTO-2025-06-20-14-55-26(22).jpg',
    ],
    'SONY APT PENTHOUSE': [
      'PHOTO-2025-06-20-14-55-26.jpg',
      'PHOTO-2025-06-20-14-55-26(1).jpg',
      'PHOTO-2025-06-20-14-55-26(2).jpg',
      'PHOTO-2025-06-20-14-55-26(3).jpg',
      'PHOTO-2025-06-20-14-55-26(4).jpg',
      'PHOTO-2025-06-20-14-55-26(5).jpg',
      'PHOTO-2025-06-20-14-55-26(6).jpg',
      'PHOTO-2025-06-20-14-55-26(7).jpg',
      'PHOTO-2025-06-20-14-55-26(8).jpg',
      'PHOTO-2025-06-20-14-55-26(9).jpg',
      'PHOTO-2025-06-20-14-55-26(10).jpg',
      'PHOTO-2025-06-20-14-55-26(11).jpg',
      'PHOTO-2025-06-20-14-55-26(12).jpg',
      'PHOTO-2025-06-20-14-55-26(13).jpg',
      'PHOTO-2025-06-20-14-55-26(14).jpg',
      'PHOTO-2025-06-20-14-55-26(15).jpg',
      'PHOTO-2025-06-20-14-55-26(16).jpg',
      'PHOTO-2025-06-20-14-55-26(17).jpg',
      'PHOTO-2025-06-20-14-55-26(18).jpg',
      'PHOTO-2025-06-20-14-55-26(19).jpg',
      'PHOTO-2025-06-20-14-55-26(20).jpg',
      'PHOTO-2025-06-20-14-55-26(21).jpg',
      'PHOTO-2025-06-20-14-55-26(22).jpg',
    ],
    'DEV SHAKTI_': [
      'PHOTO-2025-06-20-14-55-26.jpg',
      'PHOTO-2025-06-20-14-55-26(1).jpg',
      'PHOTO-2025-06-20-14-55-26(2).jpg',
      'PHOTO-2025-06-20-14-55-26(3).jpg',
      'PHOTO-2025-06-20-14-55-26(4).jpg',
      'PHOTO-2025-06-20-14-55-26(5).jpg',
      'PHOTO-2025-06-20-14-55-26(6).jpg',
      'PHOTO-2025-06-20-14-55-26(7).jpg',
      'PHOTO-2025-06-20-14-55-26(8).jpg',
      'PHOTO-2025-06-20-14-55-26(9).jpg',
      'PHOTO-2025-06-20-14-55-26(10).jpg',
      'PHOTO-2025-06-20-14-55-26(11).jpg',
      'PHOTO-2025-06-20-14-55-26(12).jpg',
      'PHOTO-2025-06-20-14-55-26(13).jpg',
      'PHOTO-2025-06-20-14-55-26(14).jpg',
      'PHOTO-2025-06-20-14-55-26(15).jpg',
      'PHOTO-2025-06-20-14-55-26(16).jpg',
      'PHOTO-2025-06-20-14-55-26(17).jpg',
      'PHOTO-2025-06-20-14-55-26(18).jpg',
      'PHOTO-2025-06-20-14-55-26(19).jpg',
      'PHOTO-2025-06-20-14-55-26(20).jpg',
      'PHOTO-2025-06-20-14-55-26(21).jpg',
      'PHOTO-2025-06-20-14-55-26(22).jpg',
    ],
    'GARDEN HOME ': [
      'PHOTO-2025-06-20-14-55-26.jpg',
      'PHOTO-2025-06-20-14-55-26(1).jpg',
      'PHOTO-2025-06-20-14-55-26(2).jpg',
      'PHOTO-2025-06-20-14-55-26(3).jpg',
      'PHOTO-2025-06-20-14-55-26(4).jpg',
      'PHOTO-2025-06-20-14-55-26(5).jpg',
      'PHOTO-2025-06-20-14-55-26(6).jpg',
      'PHOTO-2025-06-20-14-55-26(7).jpg',
      'PHOTO-2025-06-20-14-55-26(8).jpg',
      'PHOTO-2025-06-20-14-55-26(9).jpg',
      'PHOTO-2025-06-20-14-55-26(10).jpg',
      'PHOTO-2025-06-20-14-55-26(11).jpg',
      'PHOTO-2025-06-20-14-55-26(12).jpg',
      'PHOTO-2025-06-20-14-55-26(13).jpg',
      'PHOTO-2025-06-20-14-55-26(14).jpg',
      'PHOTO-2025-06-20-14-55-26(15).jpg',
      'PHOTO-2025-06-20-14-55-26(16).jpg',
      'PHOTO-2025-06-20-14-55-26(17).jpg',
      'PHOTO-2025-06-20-14-55-26(18).jpg',
      'PHOTO-2025-06-20-14-55-26(19).jpg',
      'PHOTO-2025-06-20-14-55-26(20).jpg',
      'PHOTO-2025-06-20-14-55-26(21).jpg',
      'PHOTO-2025-06-20-14-55-26(22).jpg',
    ],
  };

  return imagePatterns[folder] || [];
};

const ResaleRentDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const property: Property = location.state?.property;
  const [propertyImages, setPropertyImages] = useState<string[]>([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    if (property?.folder) {
      const images = getPropertyImages(property.folder);
      setPropertyImages(images);
    }
  }, [property]);

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Property not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-8 mt-20">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-sippy-gold hover:text-sippy-charcoal mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Properties
        </button>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Hero Image */}
          <div 
            // className="h-[400px] bg-cover bg-center relative"
            // style={{ backgroundImage: `url(/resale_p/${property.folder}/${property.image})` }}
          >
            {property.featured && (
              <div className="absolute top-4 right-4 bg-sippy-gold text-white px-4 py-2 rounded-full text-sm font-medium">
                Featured Property
              </div>
            )}
            <div className="absolute bottom-4 left-4 bg-white/90 px-4 py-2 rounded-lg">
              <span className="text-lg font-semibold text-sippy-charcoal">
                {property.type === 'rent' ? 'For Rent' : 'For Sale'}
              </span>
            </div>
          </div>

          {/* Property Info */}
          <div className="p-8">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-3xl font-bold text-sippy-charcoal mb-2">
                  {property.title}
                </h1>
                <div className="flex items-center text-gray-600">
                  <MapPin className="h-5 w-5 mr-2" />
                  <span>{property.location}</span>
                </div>
              </div>
              <div className="bg-sippy-gold text-white px-4 py-2 rounded-full">
                {property.propertyType}
              </div>
            </div>

            {/* Key Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <IndianRupee className="h-5 w-5 text-sippy-gold mr-2" />
                  <span className="font-semibold">Price</span>
                </div>
                <p className="text-lg font-bold">
                  {(formatPriceWithCommas(property.price) || property.price)
                    ? `₹ ${formatPriceWithCommas(property.price) || property.price}`
                    : "Price on request"}
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <Home className="h-5 w-5 text-sippy-gold mr-2" />
                  <span className="font-semibold">Size</span>
                </div>
                <p className="text-lg">{property.size}</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <Bed className="h-5 w-5 text-sippy-gold mr-2" />
                  <span className="font-semibold">Bedrooms</span>
                </div>
                <p className="text-lg">{property.bedrooms} {property.bedrooms === 1 ? 'Bedroom' : 'Bedrooms'}</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <Bath className="h-5 w-5 text-sippy-gold mr-2" />
                  <span className="font-semibold">Bathrooms</span>
                </div>
                <p className="text-lg">{property.bathrooms || 'N/A'}</p>
              </div>
            </div>

            {/* Additional Details */}
            <div className="border-t pt-8">
              <h2 className="text-2xl font-bold text-sippy-charcoal mb-4">Property Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-2">Property Information</h3>
                  <ul className="space-y-2">
                    <li><span className="font-medium">Property Type:</span> {property.propertyType}</li>
                    <li><span className="font-medium">Listing Type:</span> {property.type === 'rent' ? 'Rental' : 'Resale'}</li>
                    <li><span className="font-medium">Size:</span> {property.size}</li>
                    <li><span className="font-medium">Bedrooms:</span> {property.bedrooms}</li>
                    {property.bathrooms && (
                      <li><span className="font-medium">Bathrooms:</span> {property.bathrooms}</li>
                    )}
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Additional Features</h3>
                  <ul className="space-y-2">
                    {property.carPark && (
                      <li className="flex items-center">
                        <Car className="h-4 w-4 text-sippy-gold mr-2" />
                        <span className="font-medium">Car Parking:</span> {property.carPark}
                      </li>
                    )}
                    {property.fixtures && (
                      <li><span className="font-medium">Fixtures:</span> {property.fixtures}</li>
                    )}
                    <li><span className="font-medium">Location:</span> {property.location}</li>
                    {property.featured && (
                      <li><span className="font-medium text-sippy-gold">Featured Property</span></li>
                    )}
                  </ul>
                </div>
              </div>
            </div>

            {/* Contact Section */}
            <div className="border-t pt-8 mt-8">
              <h2 className="text-2xl font-bold text-sippy-charcoal mb-4">Interested in this property?</h2>
              <div className="bg-sippy-beige p-6 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-3">Contact Information</h3>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 text-sippy-gold mr-2" />
                        <span>+91 7777030607</span>
                      </div>
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 text-sippy-gold mr-2" />
                        <span>info@sippyestate.com</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col space-y-3">
                    <Button className="bg-sippy-gold hover:bg-opacity-90 text-white">
                      <Phone className="h-4 w-4 mr-2" />
                      Call Now
                    </Button>
                    <Button variant="outline" className="border-sippy-gold text-sippy-gold hover:bg-sippy-gold hover:text-white">
                      <Mail className="h-4 w-4 mr-2" />
                      Send Email
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Dynamic Photo Gallery */}
            {propertyImages.length > 0 && (
              <div className="border-t pt-8 mt-8">
                <h2 className="text-2xl font-bold text-sippy-charcoal mb-4">Photo Gallery</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                  {propertyImages.map((image, index) => (
                    <div key={index} className="aspect-square overflow-hidden rounded-lg">
                      <Watermark link={`/resale_p/${property.folder}/${image}`} />
                    </div>
                  ))}
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

export default ResaleRentDetails; 
