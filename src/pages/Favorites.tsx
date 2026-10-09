import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Heart, HeartOff, MessageCircle, Trash2, ArrowLeft } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useCart } from '@/contexts/CartContext';
import { cartService } from '@/services/cartService';
import { formatPriceWithCommas } from '@/lib/utils';
import { getContactNumberByType } from '@/lib/contactRouting';

const Favorites = () => {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, clearCart } = useCart();

  const handleViewDetails = (item: any) => {
    // Create a property object that matches the expected format for PropertyDetails
    const property = {
      id: item.id,
      title: item.title,
      location: item.location,
      price: item.price,
      type: item.type,
      image: item.image,
      // Add realistic property details
      size: '1200 - 1800 sq ft',
      bedroomTypes: '2, 3, 4 BHK',
      possessionDate: '2025',
      builder: 'Sippy Housing',
      totalFlats: '150',
      towers: '2',
      acres: '5.2',
      units: 'Available',
      contact_number: getContactNumberByType(item.type),
      photo: [item.image] // Add image to photo array
    };
    
    navigate('/property-details', { state: { property } });
  };

  const handleWhatsAppEnquiry = () => {
    const whatsappUrl = cartService.generateWhatsAppMessage();
    if (whatsappUrl) {
      window.open(whatsappUrl, '_blank');
    }
  };

  const handleRemoveItem = (itemId: string) => {
    removeFromCart(itemId);
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to remove all favorites?')) {
      clearCart();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-8 mt-20">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-sippy-gold hover:text-sippy-charcoal"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </button>
          <h1 className="text-3xl font-bold text-sippy-charcoal">My Favorites</h1>
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center py-16">
            <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-600 mb-2">No Favorites Yet</h2>
            <p className="text-gray-500 mb-6">Start exploring properties and add them to your favorites!</p>
            <button
              onClick={() => navigate('/')}
              className="bg-sippy-gold text-white px-6 py-3 rounded-lg hover:bg-sippy-gold/90 transition-colors"
            >
              Browse Properties
            </button>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-600">
                {cartItems.length} propert{cartItems.length === 1 ? 'y' : 'ies'} in your favorites
              </p>
              <div className="flex gap-3">
                <button
                  onClick={handleWhatsAppEnquiry}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700 transition-colors"
                >
                  <MessageCircle className="h-4 w-4" />
                  Send WhatsApp Enquiry
                </button>
                <button
                  onClick={handleClearAll}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-red-600 transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                  Clear All
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cartItems.map((item) => (
                <div key={item.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow border border-gray-100">
                  <div className="relative h-48">
                    <img 
                      src={item.image || '/placeholder.svg'} 
                      alt={item.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/placeholder.svg';
                      }}
                    />
                    <div className="absolute top-3 left-3">
                      <span className="bg-sippy-gold text-white px-3 py-1 rounded-full text-xs font-medium">
                        {item.type}
                      </span>
                    </div>
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
                    >
                      <Heart className="h-5 w-5 text-red-500 fill-red-500" />
                    </button>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold mb-1 text-sippy-charcoal">{item.title}</h3>
                    <div className="flex items-center mb-3 text-sm">
                      <MapPin className="h-4 w-4 text-sippy-gold mr-1" />
                      <span className="text-sippy-charcoal/80">{item.location}</span>
                    </div>
                    <div className="flex justify-between items-center mb-3">
                      <span className="font-semibold text-sippy-charcoal">
                      {(formatPriceWithCommas(item.price) || item.price)
                        ? `₹ ${formatPriceWithCommas(item.price) || item.price}`
                        : "Price on request"}
                    </span>
                    </div>
                    <div className="flex gap-2">
                      <button 
                        className="btn-outline flex-1"
                        onClick={() => handleViewDetails(item)}
                      >
                        View Details
                      </button>
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <button
                onClick={handleWhatsAppEnquiry}
                className="bg-green-600 text-white px-8 py-4 rounded-lg flex items-center gap-3 mx-auto hover:bg-green-700 transition-colors shadow-lg"
              >
                <MessageCircle className="h-5 w-5" />
                <span className="font-semibold">Send WhatsApp Enquiry for All Properties</span>
              </button>
              <p className="text-sm text-gray-500 mt-2">
                This will send all your favorite properties to our team via WhatsApp
              </p>
            </div>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Favorites;
