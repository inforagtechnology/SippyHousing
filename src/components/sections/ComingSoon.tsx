import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const ComingSoon = () => {
  return (
    <section id="coming-soon" className="py-20 bg-sippy-beige">
      <div className="section-container">
        <div className="text-center mb-16">
          <h2 className="section-title">
            Coming <span className="text-sippy-gold">Soon</span>
          </h2>
          <p className="section-subtitle mx-auto">
            We're working hard to bring you this exciting new section. Stay tuned for updates!
          </p>
          <div className="gold-divider"></div>
        </div>
        
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
            <div className="text-6xl mb-6">🚧</div>
            <h3 className="text-2xl font-bold mb-4 font-playfair">Under Development</h3>
            <p className="text-sippy-charcoal/80 mb-6">
              This section is currently being developed and will be available soon. 
              We're committed to providing you with the best real estate experience.
            </p>
            <Button 
              className="btn-primary"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Top
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComingSoon; 