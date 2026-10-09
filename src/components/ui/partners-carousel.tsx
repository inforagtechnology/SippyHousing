import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const PartnersCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const partnerImages = [
    {
      id: 'partner-1',
      src: '/Partners/Adani.png',
      alt: 'Adani'
    },
    {
      id: 'partner-2',
      src: '/Partners/Agami.jpg',
      alt: 'Agami'
    },
    {
      id: 'partner-3',
      src: '/Partners/Ajmera.png',
      alt: 'Ajmera'
    },
    {
      id: 'partner-4',
      src: '/Partners/AP Realty.png',
      alt: 'AP Realty'
    },
    {
      id: 'partner-5',
      src: '/Partners/Arkade.jpeg',
      alt: 'Arkade'
    },
    {
      id: 'partner-6',
      src: '/Partners/AURUM REAL ESTATE.png',
      alt: 'AURUM REAL ESTATE'
    },
    {
      id: 'partner-7',
      src: '/Partners/AVIGHNA.jpeg',
      alt: 'AVIGHNA'
    },
    {
      id: 'partner-8',
      src: '/Partners/CHANDAK GROUP.jpg',
      alt: 'CHANDAK GROUP'
    },
    {
      id: 'partner-9',
      src: '/Partners/DLH.png',
      alt: 'DLH'
    },
    {
      id: 'partner-10',
      src: '/Partners/Ekta World.png',
      alt: 'Ekta World'
    },
    {
      id: 'partner-11',
      src: '/Partners/Elements Realty.jpg',
      alt: 'Elements Realty'
    },
    {
      id: 'partner-12',
      src: '/Partners/FOUR SEASON RESIDENCES.jpg',
      alt: 'FOUR SEASON RESIDENCES'
    },
    {
      id: 'partner-13',
      src: '/Partners/Godrej.jpg',
      alt: 'Godrej'
    },
    {
      id: 'partner-14',
      src: '/Partners/Guru kripa.png',
      alt: 'Guru kripa'
    },
    {
      id: 'partner-15',
      src: '/Partners/Gurukrupa realcon.jpg',
      alt: 'Gurukrupa realcon'
    },
    {
      id: 'partner-16',
      src: '/Partners/Hiranandani.png',
      alt: 'Hiranandani'
    },
    {
      id: 'partner-17',
      src: '/Partners/HoABL.png',
      alt: 'HoABL'
    },
    {
      id: 'partner-18',
      src: '/Partners/HUBTOWN.jpg',
      alt: 'HUBTOWN'
    },
    {
      id: 'partner-19',
      src: '/Partners/Inspira.jpg',
      alt: 'Inspira'
    },
    {
      id: 'partner-20',
      src: '/Partners/JP Infra.png',
      alt: 'JP Infra'
    },
    // {
    //   id: 'partner-21',
    //   src: '/Partners/K Raheja Corp.jpg',
    //   alt: 'K Raheja Corp'
    // },
    // {
    //   id: 'partner-22',
    //   src: '/Partners/K_RAHEJA_.avif',
    //   alt: 'K_RAHEJA'
    // },
    {
      id: 'partner-23',
      src: '/Partners/KABRA GROUP.png',
      alt: 'KABRA GROUP'
    },
    {
      id: 'partner-24',
      src: '/Partners/Kalpataru.jpeg',
      alt: 'Kalpataru'
    },
    {
      id: 'partner-25',
      src: '/Partners/Kothari.jpg',
      alt: 'Kothari'
    },
    {
      id: 'partner-26',
      src: '/Partners/L&T Realty.jfif',
      alt: 'L&T Realty'
    },
    {
      id: 'partner-27',
      src: '/Partners/Lodha.png',
      alt: 'Lodha'
    },
    {
      id: 'partner-28',
      src: '/Partners/Lokhandwala.png',
      alt: 'Lokhandwala'
    },
    {
      id: 'partner-29',
      src: '/Partners/Mahindra-Lifespaces.jpg',
      alt: 'Mahindra-Lifespaces'
    },
    {
      id: 'partner-30',
      src: '/Partners/MICL.png',
      alt: 'MICL'
    },
    {
      id: 'partner-31',
      src: '/Partners/Nagpal.jpg',
      alt: 'Nagpal'
    },
    {
      id: 'partner-32',
      src: '/Partners/Oberoi.png',
      alt: 'Oberoi'
    },
    {
      id: 'partner-33',
      src: '/Partners/Omkar.png',
      alt: 'Omkar'
    },
    {
      id: 'partner-34',
      src: '/Partners/PCPL.jpg',
      alt: 'PCPL'
    },
    {
      id: 'partner-35',
      src: '/Partners/Piramal-realty-logo.png',
      alt: 'Piramal-realty-logo'
    },
    {
      id: 'partner-36',
      src: '/Partners/Platinum Corp.jpg',
      alt: 'Platinum Corp'
    },
    {
      id: 'partner-37',
      src: '/Partners/Prestige_Group.png',
      alt: 'Prestige_Group'
    },
    {
      id: 'partner-38',
      src: '/Partners/Provenance Land.jpg',
      alt: 'Provenance Land'
    },
    {
      id: 'partner-39',
      src: '/Partners/PUPURAVANKARA GROUP.png',
      alt: 'PUPURAVANKARA GROUP'
    },
    {
      id: 'partner-40',
      src: '/Partners/RAYMOND.jpg',
      alt: 'RAYMOND'
    },
    {
      id: 'partner-41',
      src: '/Partners/RUNWAL.png',
      alt: 'RUNWAL'
    },
    {
      id: 'partner-42',
      src: '/Partners/Ruparel Realty.jpg',
      alt: 'Ruparel Realty'
    },
    {
      id: 'partner-43',
      src: '/Partners/Rustomjee.png',
      alt: 'Rustomjee'
    },
    {
      id: 'partner-44',
      src: '/Partners/S Raheja.png',
      alt: 'S Raheja'
    },
    {
      id: 'partner-45',
      src: '/Partners/Sadguru.jpg',
      alt: 'Sadguru'
    },
    {
      id: 'partner-46',
      src: '/Partners/Shapoorji Pallonji.jpg',
      alt: 'Shapoorji Pallonji'
    },
    {
      id: 'partner-47',
      src: '/Partners/SUNTECK.png',
      alt: 'SUNTECK'
    },
    {
      id: 'partner-48',
      src: '/Partners/Supreme.jpg',
      alt: 'Supreme'
    },
    {
      id: 'partner-49',
      src: '/Partners/Tribeca.png',
      alt: 'Tribeca'
    },
    {
      id: 'partner-50',
      src: '/Partners/Wadhwa group.jpeg',
      alt: 'Wadhwa group'
    }
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === partnerImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 2000); // Change image every 2 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying, partnerImages.length]);

  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? partnerImages.length - 1 : currentIndex - 1);
    setIsAutoPlaying(false);
  };

  const goToNext = () => {
    setCurrentIndex(currentIndex === partnerImages.length - 1 ? 0 : currentIndex + 1);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  return (
    <div className="relative max-w-6xl mx-auto">
      <div 
        className="relative overflow-hidden rounded-lg shadow-2xl"
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
      >
        {/* Main Image Display */}
        <div className="relative h-[600px]">
          <img 
            src={partnerImages[currentIndex].src} 
            alt={partnerImages[currentIndex].alt}
            className="w-full h-full object-cover transition-opacity duration-500"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/placeholder.svg';
            }}
          />
          
          {/* Overlay with image name */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
          <div className="absolute bottom-4 left-4 right-4">
            <h3 className="text-white text-xl font-bold mb-2">
              {partnerImages[currentIndex].src.split('/').pop()?.split('.')[0] || partnerImages[currentIndex].alt}
            </h3>
          </div>
          
          {/* Navigation Arrows */}
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-sippy-charcoal rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-110 z-10"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-sippy-charcoal rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-110 z-10"
            aria-label="Next image"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Image Counter */}
          <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
            {currentIndex + 1} / {partnerImages.length}
          </div>
        </div>
      </div>

      {/* Thumbnail Navigation */}
      <div className="mt-6 flex justify-center space-x-2 overflow-x-auto pb-2">
        {partnerImages.map((image, index) => (
          <button
            key={image.id}
            onClick={() => goToSlide(index)}
            className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
              index === currentIndex 
                ? 'border-sippy-gold scale-110' 
                : 'border-gray-300 hover:border-sippy-gold/50'
            }`}
          >
            <img 
              src={image.src} 
              alt={image.alt}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = '/placeholder.svg';
              }}
            />
          </button>
        ))}
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center mt-4 space-x-2">
        {partnerImages.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'bg-sippy-gold scale-125' 
                : 'bg-gray-300 hover:bg-gray-400'
            }`}
            aria-label={`Go to image ${index + 1}`}
          />
        ))}
      </div>

      {/* Auto-play indicator */}
      <div className="text-center mt-4">
        <span className="text-sm text-sippy-charcoal/70">
          {isAutoPlaying ? 'Auto-playing' : 'Paused'} • Click any image to pause
        </span>
      </div>
    </div>
  );
};

export default PartnersCarousel;
