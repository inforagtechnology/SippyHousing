import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const AboutUs = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
            About Us
          </h2>
          <div className="prose prose-lg mx-auto text-center">
            <p className="text-gray-700 leading-relaxed">
              Sippy Housing Discover real estate solutions that spell profitability and convenience, when you choose to partner with Sippy Housing. Established in 1992, by Sanjay Sippy, Sippy Housing is the one stop solution for all your real estate needs. Be it outright, lease or sole selling. Be it residential and commercial properties or plots and land. Be it redevelopment of societies or pre launch deals, you can rely on Sippy Housing to deliver a comprehensive, viable and profitable solution.
            </p>
            <p className="text-gray-700 leading-relaxed mt-4">
              Our real estate solutions go beyond just addressing your current need. This is evident through our Art Homes, a concept that bridges the gap between imagination and premium lifestyles. Created from natural stones, exotic woods and fitted with state-of-the-art.
            </p>
            <div className="mt-8">
              <Link to="/about">
                <Button className="btn-primary text-base px-8 py-3">
                  Learn More About Us <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs; 