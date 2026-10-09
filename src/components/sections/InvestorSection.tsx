
import { IndianRupee, Building, ArrowRight, Star } from "lucide-react";

interface InvestmentOpportunity {
  id: number;
  title: string;
  location: string;
  price: string;
  roi: string;
  type: string;
  size: string;
  image: string;
  highlights: string[];
}

const investmentOpportunities: InvestmentOpportunity[] = [
  {
    id: 1,
    title: "Pre-Leased Office Complex",
    location: "BKC, Mumbai",
    price: "₹85 Cr",
    roi: "7.5% p.a.",
    type: "Commercial",
    size: "28,000 sq.ft.",
    image: "https://images.unsplash.com/photo-1460574283810-2aab119d8511?auto=format&fit=crop&q=80",
    highlights: ["Fortune 500 tenant", "10-year lease agreement", "Prime location", "Modern amenities"]
  },
  {
    id: 2,
    title: "Commercial Land Parcel",
    location: "Thane, Maharashtra",
    price: "₹45 Cr",
    roi: "12% projected",
    type: "Land",
    size: "2.5 Acres",
    image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&q=80",
    highlights: ["Development potential", "Near upcoming metro", "Clear title", "Ready for construction"]
  },
  {
    id: 3,
    title: "Retail Space in Mall",
    location: "Lower Parel, Mumbai",
    price: "₹32 Cr",
    roi: "8.2% p.a.",
    type: "Retail",
    size: "12,500 sq.ft.",
    image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&q=80",
    highlights: ["Anchor tenant in place", "High footfall location", "Long-term lease", "Premium mall"]
  }
];

const InvestorSection = () => {
  return (
    <section id="investor-section" className="py-20 bg-white">
      <div className="section-container">
        <div className="text-center mb-16">
          <h2 className="section-title">
            Investor <span className="text-sippy-gold">Opportunities</span>
          </h2>
          <p className="section-subtitle mx-auto">
            High-yield investment opportunities in pre-leased commercial properties and premium land parcels with strong ROI potential.
          </p>
          <div className="gold-divider"></div>
        </div>
        
        {/* <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {investmentOpportunities.map(opportunity => (
            <div key={opportunity.id} className="bg-white rounded-lg overflow-hidden shadow-md border border-gray-100 h-full flex flex-col">
              <div 
                className="h-48 bg-cover bg-center"
                style={{ backgroundImage: `url(${opportunity.image})` }}
              >
                <div className="p-3">
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-white">
                    {opportunity.type}
                  </span>
                </div>
              </div>
              <div className="p-6 flex-grow flex flex-col">
                <h3 className="text-xl font-bold mb-2 font-playfair">{opportunity.title}</h3>
                <p className="text-sippy-charcoal/80 mb-2">{opportunity.location}</p>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <p className="text-sm text-sippy-charcoal/60">Investment</p>
                    <div className="flex items-center">
                      <IndianRupee className="h-4 w-4 text-sippy-gold mr-1" />
                      <span className="font-semibold">{opportunity.price}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-sippy-charcoal/60">ROI</p>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-sippy-gold mr-1" />
                      <span className="font-semibold text-sippy-gold">{opportunity.roi}</span>
                    </div>
                  </div>
                </div>
                
                <div className="mb-4">
                  <p className="text-sm text-sippy-charcoal/60 mb-2">Size</p>
                  <div className="flex items-center">
                    <Building className="h-4 w-4 text-sippy-gold mr-1" />
                    <span>{opportunity.size}</span>
                  </div>
                </div>
                
                <div className="mb-6">
                  <p className="text-sm text-sippy-charcoal/60 mb-2">Highlights</p>
                  <ul className="space-y-1">
                    {opportunity.highlights.map((highlight, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="bg-sippy-beige text-sippy-gold rounded-full p-1 mr-2 text-xs">•</span>
                        <span className="text-sm">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <button className="btn-outline mt-auto w-full">
                  Request Investor Package
                </button>
              </div>
            </div>
          ))}
        </div> */}
        
        <div className="bg-sippy-beige p-8 md:p-12 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-6 font-playfair">Investor Benefits</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="mr-4 bg-sippy-gold rounded-full h-8 w-8 flex items-center justify-center text-white font-bold">1</div>
                  <div>
                    <h4 className="font-bold mb-1">Pre-Leased Properties</h4>
                    <p className="text-sippy-charcoal/80">Immediate rental income from day one with blue-chip tenants</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="mr-4 bg-sippy-gold rounded-full h-8 w-8 flex items-center justify-center text-white font-bold">2</div>
                  <div>
                    <h4 className="font-bold mb-1">High-ROI Land Parcels</h4>
                    <p className="text-sippy-charcoal/80">Strategic locations with exceptional appreciation potential</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="mr-4 bg-sippy-gold rounded-full h-8 w-8 flex items-center justify-center text-white font-bold">3</div>
                  <div>
                    <h4 className="font-bold mb-1">Portfolio Diversification</h4>
                    <p className="text-sippy-charcoal/80">Add stable real estate assets to balance your investment portfolio</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="mr-4 bg-sippy-gold rounded-full h-8 w-8 flex items-center justify-center text-white font-bold">4</div>
                  <div>
                    <h4 className="font-bold mb-1">End-to-End Management</h4>
                    <p className="text-sippy-charcoal/80">Professional property management services for hassle-free ownership</p>
                  </div>
                </li>
              </ul>
              <button className="btn-primary mt-8 flex items-center" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
                Schedule Investment Consultation <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </div>
            <div>
              <div 
                className="h-full min-h-[300px] rounded-lg bg-cover bg-center"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1493397212122-2b85dda8106b?auto=format&fit=crop&q=80')" }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InvestorSection;
