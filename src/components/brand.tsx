import React from "react";
import "./brand.css";

const Trustbrand = () => {
  const brands = [
    { id: 1, logo: "/lodha.png", alt: "Lodha" },
    { id: 2, logo: "/godrej.png", alt: "Godrej" },
    { id: 3, logo: "/DLF_logo.svg.png", alt: "DLF" },
    { id: 4, logo: "/piramal1.png", alt: "Piramal" },
    { id: 5, logo: "/OBEROIRLTY.NS_BIG-3d4470e3.png", alt: "Oberoi Realty" },
    { id: 6, logo: "/runwal1.png", alt: "Runwal" },
    { id: 7, logo: "/Shapoorji-Pallonji-Group-Code-Estate.png", alt: "Shapoorji Pallonji" },
    { id: 8, logo: "/Rustomjee-Constructions.webp", alt: "Rustomjee" },
    { id: 9, logo: "/Mahindra-Lifespaces-Developers-Code-Estate.png", alt: "Mahindra Lifespaces" },
    { id: 10, logo: "/brick.png", alt: "Brick" },
    { id: 11, logo: "/raheja.jpg", alt: "Raheja" },
    { id: 12, logo: "/PRESTIGE.NS_BIG-52e09255.png", alt: "Prestige" },
  ];

  return (
    <div className="trustbrand-container">
      <h2 className="trustbrand-title">Trusted Brand Partners</h2>
     
      <div className="brand-slider">
        <div className="slider-track">
          {brands.map((brand) => (
            <div key={brand.id} className="brand-item">
              <img src={brand.logo} alt={brand.alt} className="brand-logo" />
            </div>
          ))}
          {/* Repeat the same brands to create a continuous loop */}
          {brands.map((brand) => (
            <div key={`${brand.id}-duplicate`} className="brand-item">
              <img src={brand.logo} alt={brand.alt} className="brand-logo" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Trustbrand;
