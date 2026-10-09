import React from 'react';

interface PartnersMarqueeProps {
  items: Array<{
    id: string;
    image: string;
    title?: string;
  }>;
  direction?: 'left' | 'right';
  className?: string;
}

const PartnersMarquee: React.FC<PartnersMarqueeProps> = ({
  items,
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
        {[...items, ...items].map((item, index) => (
          <div key={`${item.id}-${index}`} className="flex-shrink-0 mx-4">
            <div className="w-40 h-24 bg-white rounded-lg shadow-md overflow-hidden group hover:shadow-lg transition-shadow duration-300 flex items-center justify-center">
              <img 
                src={item.image} 
                alt={item.title || 'Partner Logo'}
                className="max-w-full max-h-full object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/placeholder.svg';
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PartnersMarquee;
