import React from 'react';

interface MemberGridProps {
  members: Array<{
    id: string;
    image: string;
    name: string;
    description?: string;
  }>;
  title: string;
  subtitle?: string;
}

const MemberGrid: React.FC<MemberGridProps> = ({
  members,
  title,
  subtitle
}) => {
  return (
    <section className="py-16 bg-white">
      <div className="section-container">
        <div className="text-center mb-16">
          <h2 className="section-title">{title}</h2>
          {subtitle && (
            <p className="section-subtitle">{subtitle}</p>
          )}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {members.map((member) => (
            <div key={member.id} className="group">
              <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 p-6 border border-gray-100 hover:border-sippy-gold/30">
                <div className="flex items-center justify-center h-24 mb-4">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="text-center">
                  <h3 className="text-sm font-medium text-sippy-charcoal mb-1">
                    {member.name}
                  </h3>
                  {member.description && (
                    <p className="text-xs text-sippy-charcoal/60">
                      {member.description}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MemberGrid;
