
import { Badge } from "@/components/ui/badge";
import { Handshake, BadgeCheck, Building } from "lucide-react";
import { scrollToSection } from "@/lib/navigation";

const JointVenture = () => {
  return (
    <section id="joint-venture" className="py-20 bg-sippy-white">
      <div className="section-container">
        <div className="text-center mb-16">
          <h2 className="section-title">
            Development
          </h2>
          <p className="section-subtitle mx-auto">
            Partner with Sippy Housing to transform your property into something extraordinary. We collaborate with landowners to create exceptional developments.
          </p>
          <div className="gold-divider"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
  <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100 text-center">
    <div className="inline-flex items-center justify-center bg-sippy-beige p-4 rounded-full mb-6">
      <BadgeCheck className="h-8 w-8 text-sippy-gold" />
    </div>
    <h3 className="text-xl font-bold mb-4 font-playfair">Selling Entire Land</h3>
    <p className="text-sippy-charcoal/80">
      We assist landowners in selling their entire land parcels, ensuring maximum market value through a streamlined, transparent process.
    </p>
  </div>
  
  <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100 text-center">
    <div className="inline-flex items-center justify-center bg-sippy-beige p-4 rounded-full mb-6">
      <Handshake className="h-8 w-8 text-sippy-gold" />
    </div>
    <h3 className="text-xl font-bold mb-4 font-playfair">Joint Venture</h3>
    <p className="text-sippy-charcoal/80">
      We collaborate with landowners through joint ventures, combining resources and expertise to deliver profitable, value-driven real estate projects.
    </p>
  </div>
  
  <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100 text-center">
    <div className="inline-flex items-center justify-center bg-sippy-beige p-4 rounded-full mb-6">
      <Building className="h-8 w-8 text-sippy-gold" />
    </div>
    <h3 className="text-xl font-bold mb-4 font-playfair">Redevelopment</h3>
    <p className="text-sippy-charcoal/80">
      We specialize in redeveloping old properties into premium, high-value buildings—enhancing living standards while unlocking real estate potential.
    </p>
  </div>
</div>
        
        <div className="bg-sippy-beige p-8 md:p-12 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-6 font-playfair">Why Partner with Sippy Housing?</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <Badge className="mt-1 mr-3 bg-sippy-gold text-white">01</Badge>
                  <div>
                    <h4 className="font-bold mb-1">40+ Years of Experience</h4>
                    <p className="text-sippy-charcoal/80">Decades of expertise in Mumbai's real estate market</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <Badge className="mt-1 mr-3 bg-sippy-gold text-white">02</Badge>
                  <div>
                    <h4 className="font-bold mb-1">Transparent Process</h4>
                    <p className="text-sippy-charcoal/80">Clear agreements and open communication at every stage</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <Badge className="mt-1 mr-3 bg-sippy-gold text-white">03</Badge>
                  <div>
                    <h4 className="font-bold mb-1">Premium Construction</h4>
                    <p className="text-sippy-charcoal/80">World-class materials and superior construction techniques</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <Badge className="mt-1 mr-3 bg-sippy-gold text-white">04</Badge>
                  <div>
                    <h4 className="font-bold mb-1">Higher Returns</h4>
                    <p className="text-sippy-charcoal/80">Maximize your property's potential value</p>
                  </div>
                </li>
              </ul>
              <button 
                className="btn-primary mt-8"
                onClick={() => scrollToSection("#contact")}
              >
                Contact Us for Consultation
              </button>
            </div>
            <div className="h-full">
              <img src="/logot.png" alt="Joint Venture" width={500} height={500} className="w-full object-cover rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JointVenture;
