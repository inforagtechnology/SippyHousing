import React from 'react';

interface MemberMarqueeProps {
  members: Array<{
    id: string;
    image: string;
    name?: string;
    description?: string;
  }>;
  speed?: number;
  direction?: 'left' | 'right';
  className?: string;
}

const MemberMarquee: React.FC<MemberMarqueeProps> = ({
  members,
  speed = 40,
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
        {[...members, ...members, ...members].map((member, index) => (
          <div key={`${member.id}-${index}`} className="flex-shrink-0 mx-8">
            <div className="w-48 h-32 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 p-6 border border-gray-100 hover:border-sippy-gold/30 group">
              <div className="flex items-center justify-center h-full">
                <img 
                  src={member.image} 
                  alt={member.name || 'Member Organization'}
                  className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/placeholder.svg';
                  }}
                />
              </div>
              {member.name && (
                <div className="text-center mt-2">
                  <p className="text-xs text-sippy-charcoal font-medium">
                    {member.name}
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MemberMarquee;
