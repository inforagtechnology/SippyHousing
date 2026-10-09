
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import PropertySearch from "@/components/ui/property-search";

const Hero = () => {
  const handleSearchResults = (results: any[]) => {
    // Handle search results if needed
    console.log('Search results:', results);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{ zIndex: 1 }}>
      {/* Background video with overlay */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/homee.MP4" type="video/mp4" />
          <source src="/sippy.webm" type="video/webm" />
          {/* Fallback image if video doesn't load */}
          <div 
            className="w-full h-full bg-cover bg-center"
            style={{ 
              backgroundImage: "url('https://images.unsplash.com/photo-1460574283810-2aab119d8511?auto=format&fit=crop&q=80')",
              backgroundPosition: "center 40%"
            }}
          ></div>
        </video>
        <div className="absolute inset-0 bg-sippy-charcoal/50 z-10"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-20 text-center px-4 sm:px-6 lg:px-8 max-w-6xl w-full animate-fade-in">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white font-playfair leading-tight mb-6">
          Your key to <span className="text-sippy-gold">Happiness</span>
        </h1>
        <p className="text-xl sm:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
        Mumbai’s premier real estate partner for luxury residences, redevelopment and joint ventures, premium plots and large land parcels, independent buildings, hotels, high-value investments, and exclusive properties.
        </p>
        {/* Property Search */}
        <PropertySearch onSearchResults={handleSearchResults} />
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6">
          <Button 
            className="btn-primary text-base px-8 py-6" 
            onClick={() => document.getElementById('luxury-homes')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Explore Luxury Homes <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Link to="/about">
            <Button className="btn-outline bg-transparent text-white border-white hover:bg-white hover:text-sippy-charcoal text-base px-8 py-6">
              About Us
            </Button>
          </Link>
          <Button 
            className="btn-outline bg-transparent text-white border-white hover:bg-white hover:text-sippy-charcoal text-base px-8 py-6"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Contact Us
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
