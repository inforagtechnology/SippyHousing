import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface AwardsCarouselProps {
  awards: Array<{
    id: string;
    image: string;
    title: string;
    description?: string;
    year?: string;
  }>;
  title: string;
  subtitle?: string;
  showDots?: boolean;
  autoPlay?: boolean;
  autoPlayInterval?: number;
}

const AwardsCarousel: React.FC<AwardsCarouselProps> = ({
  awards,
  title,
  subtitle,
  showDots = true,
  autoPlay = true,
  autoPlayInterval = 4000
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (autoPlay && !isHovered) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => 
          prevIndex === awards.length - 1 ? 0 : prevIndex + 1
        );
      }, autoPlayInterval);
      return () => clearInterval(interval);
    }
  }, [autoPlay, autoPlayInterval, isHovered, awards.length]);

  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? awards.length - 1 : currentIndex - 1);
  };

  const goToNext = () => {
    setCurrentIndex(currentIndex === awards.length - 1 ? 0 : currentIndex + 1);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  if (awards.length === 0) return null;

  return (
    <section className="py-16 bg-sippy-light">
      <div className="section-container">
        <div className="text-center mb-12">
          <h2 className="section-title">{title}</h2>
          {subtitle && (
            <p className="section-subtitle">{subtitle}</p>
          )}
        </div>

        <div 
          className="relative max-w-6xl mx-auto"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Main Carousel Container */}
          <div className="relative overflow-hidden rounded-lg">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {awards.map((award, index) => (
                <div key={award.id} className="w-full flex-shrink-0">
                  <div className="bg-white rounded-lg shadow-lg overflow-hidden mx-4">
                    <div className="relative">
                      <img 
                        src={award.image} 
                        alt={award.title}
                        className="w-full h-80 object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <div className="absolute bottom-4 left-4 right-4 text-white">
                        <h3 className="text-2xl font-bold mb-2 font-playfair">
                          {award.title}
                        </h3>
                        {award.year && (
                          <p className="text-sippy-gold font-medium mb-2">
                            {award.year}
                          </p>
                        )}
                        {award.description && (
                          <p className="text-sm opacity-90">
                            {award.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-sippy-charcoal rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-110 z-10"
            aria-label="Previous award"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-sippy-charcoal rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-110 z-10"
            aria-label="Next award"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Dots Indicator */}
          {showDots && awards.length > 1 && (
            <div className="flex justify-center mt-8 space-x-2">
              {awards.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex 
                      ? 'bg-sippy-gold scale-125' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to award ${index + 1}`}
                />
              ))}
            </div>
          )}

          {/* Counter */}
          <div className="text-center mt-4">
            <span className="text-sm text-sippy-charcoal/70">
              {currentIndex + 1} of {awards.length}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AwardsCarousel;
