import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ExhibitionCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const exhibitionImages = [
    {
      id: 'exhibition-1',
      src: '/Exhibition/_MG_3015.JPG',
      alt: 'Exhibition Event'
    },
    {
      id: 'exhibition-2',
      src: '/Exhibition/1 (27).JPG',
      alt: 'Exhibition Event'
    },
    {
      id: 'exhibition-3',
      src: '/Exhibition/100_0864.JPG',
      alt: 'Exhibition Event'
    },
    {
      id: 'exhibition-4',
      src: '/Exhibition/Accomodation Awards 30th March 2007.jpg',
      alt: 'Accommodation Awards 2007'
    },
    {
      id: 'exhibition-5',
      src: '/Exhibition/DSC_0170.JPG',
      alt: 'Exhibition Event'
    },
    {
      id: 'exhibition-6',
      src: '/Exhibition/DSC_0981 (1).JPG',
      alt: 'Exhibition Event'
    },
    {
      id: 'exhibition-7',
      src: '/Exhibition/DSC_0981.JPG',
      alt: 'Exhibition Event'
    },
    {
      id: 'exhibition-8',
      src: '/Exhibition/DSC_1000 (1).JPG',
      alt: 'Exhibition Event'
    },
    {
      id: 'exhibition-9',
      src: '/Exhibition/DSC_1000.JPG',
      alt: 'Exhibition Event'
    },
    {
      id: 'exhibition-10',
      src: '/Exhibition/DSC_1017 (1).JPG',
      alt: 'Exhibition Event'
    },
    {
      id: 'exhibition-11',
      src: '/Exhibition/DSC_1017.JPG',
      alt: 'Exhibition Event'
    },
    {
      id: 'exhibition-12',
      src: '/Exhibition/IMG_0057.JPG',
      alt: 'Exhibition Event'
    },
    {
      id: 'exhibition-13',
      src: '/Exhibition/IMG_1272.JPG',
      alt: 'Exhibition Event'
    },
    {
      id: 'exhibition-14',
      src: '/Exhibition/IMG_3020.JPG',
      alt: 'Exhibition Event'
    },
    {
      id: 'exhibition-15',
      src: '/Exhibition/IMG_3044.JPG',
      alt: 'Exhibition Event'
    },
    {
      id: 'exhibition-16',
      src: '/Exhibition/JRLE SIPPY.JPG',
      alt: 'JRLE Sippy Event'
    },
    {
      id: 'exhibition-17',
      src: '/Exhibition/P3210016.JPG',
      alt: 'Exhibition Event'
    },
    {
      id: 'exhibition-18',
      src: '/Exhibition/Picture 107.jpg',
      alt: 'Exhibition Event'
    },
    {
      id: 'exhibition-19',
      src: '/Exhibition/Scan_Pic0001.jpg',
      alt: 'Exhibition Event'
    },
    {
      id: 'exhibition-20',
      src: '/Exhibition/Sindhi Mela 2018 (167).JPG',
      alt: 'Sindhi Mela 2018'
    },
    {
      id: 'exhibition-21',
      src: '/Exhibition/Sindhi Mela 2018 (6).JPG',
      alt: 'Sindhi Mela 2018'
    }
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === exhibitionImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 1500); // Change image every 1.5 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying, exhibitionImages.length]);

  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? exhibitionImages.length - 1 : currentIndex - 1);
    setIsAutoPlaying(false);
  };

  const goToNext = () => {
    setCurrentIndex(currentIndex === exhibitionImages.length - 1 ? 0 : currentIndex + 1);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  return (
    <div className="relative max-w-4xl mx-auto">
      <div 
        className="relative overflow-hidden rounded-lg shadow-2xl"
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
      >
        {/* Main Image Display */}
        <div className="relative h-[500px]">
          <img 
            src={exhibitionImages[currentIndex].src} 
            alt={exhibitionImages[currentIndex].alt}
            className="w-full h-full object-cover transition-opacity duration-500"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/placeholder.svg';
            }}
          />
          
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
            {currentIndex + 1} / {exhibitionImages.length}
          </div>
        </div>
      </div>

      {/* Thumbnail Navigation */}
      <div className="mt-6 flex justify-center space-x-2 overflow-x-auto pb-2">
        {exhibitionImages.map((image, index) => (
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
        {exhibitionImages.map((_, index) => (
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

export default ExhibitionCarousel;
