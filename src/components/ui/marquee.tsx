import React from 'react';

interface MarqueeProps {
  items: Array<{
    id: string;
    image: string;
    title?: string;
    description?: string;
    year?: string;
  }>;
  speed?: number; // pixels per second
  direction?: 'left' | 'right';
  className?: string;
}

const Marquee: React.FC<MarqueeProps> = ({
  items,
  speed = 30,
  direction = 'left',
  className = ''
}) => {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div 
        className="flex animate-marquee"
        style={{
          animationDirection: direction === 'left' ? 'normal' : 'reverse'
        }}
      >
        {/* Duplicate items for seamless loop */}
        {[...items, ...items, ...items].map((item, index) => (
          <div key={`${item.id}-${index}`} className="flex-shrink-0 mx-6">
            <div className="w-72 h-52 bg-white rounded-lg shadow-lg overflow-hidden group hover:shadow-xl transition-shadow duration-300">
              <div className="relative h-full">
                <img 
                  src={item.image} 
                  alt="Award"
                  className="w-full h-full object-contain bg-gray-50 p-2 group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/placeholder.svg';
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
