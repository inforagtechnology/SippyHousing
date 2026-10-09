import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingContact from "@/components/common/FloatingContact";
import Hero from "@/components/sections/Hero";
import JointVenture from "@/components/sections/JointVenture";
import LuxuryHomes from "@/components/sections/LuxuryHomes";
import Apartments from "@/components/sections/Apartments";
import InvestorSection from "@/components/sections/InvestorSection";
import ResaleRent from "@/components/sections/ResaleRent";
import InvestDubai from "@/components/sections/InvestDubai";
import Contact from "@/components/sections/Contact";
import AboutUs from "@/components/sections/AboutUs";
import ComingSoon from "@/components/sections/ComingSoon";
import International from "@/components/sections/International";
import IndependentBuildings from "@/components/sections/IndependentBuildings";
import Commercial from "@/components/sections/Commercial";
import PlotsLands from "@/components/sections/PlotsLands";
import RedevelopmentJV from "@/components/sections/RedevelopmentJV";
import Hotels from "@/components/sections/Hotels";
import NewProjects from "@/components/sections/NewProjects";
import DealBanner from "@/components/sections/DealBanner";

import { useEffect, useState } from "react";
import { propertyService } from "@/services/propertyService";
import { Property } from "@/lib/supabase";
import { handleHashNavigation } from "@/lib/navigation";

const Index = () => {
  const [allProperties, setAllProperties] = useState<Property[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const load = async () => {
      const data = await propertyService.getAllProperties();
      setAllProperties(data);
      setLoaded(true);
    };
    load();
    
    // Handle hash navigation on page load
    handleHashNavigation();
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-20 lg:pt-24">
        <Hero />
        <DealBanner allProperties={allProperties} />
        <JointVenture />
        <NewProjects allProperties={allProperties} />
        <LuxuryHomes allProperties={allProperties} />
        <Apartments allProperties={allProperties} />
        <ResaleRent allProperties={allProperties} />
        <IndependentBuildings allProperties={allProperties} />
        <Commercial allProperties={allProperties} />
        <PlotsLands allProperties={allProperties} />
        <RedevelopmentJV allProperties={allProperties} />
        <Hotels allProperties={allProperties} />
        <InvestorSection />
        <International allProperties={allProperties} />
         <InvestDubai allProperties={allProperties} />
        <AboutUs />

        {/* <InvestDubai allProperties={allProperties} /> */}
        {/* <ComingSoon /> */}
        <Contact />
      </main>
      <FloatingContact />
      <Footer />
    </div>
  );
};

export default Index;



// import Navbar from "@/components/layout/Navbar";
// import Footer from "@/components/layout/Footer";
// import FloatingContact from "@/components/common/FloatingContact";
// import Hero from "@/components/sections/Hero";
// import JointVenture from "@/components/sections/JointVenture";
// import LuxuryHomes from "@/components/sections/LuxuryHomes";
// import Apartments from "@/components/sections/Apartments";
// import InvestorSection from "@/components/sections/InvestorSection";
// import ResaleRent from "@/components/sections/ResaleRent";
// import InvestDubai from "@/components/sections/InvestDubai";
// import Contact from "@/components/sections/Contact";
// import AboutUs from "@/components/sections/AboutUs";
// import International from "@/components/sections/International";
// import IndependentBuildings from "@/components/sections/IndependentBuildings";
// import Commercial from "@/components/sections/Commercial";
// import PlotsLands from "@/components/sections/PlotsLands";
// import RedevelopmentJV from "@/components/sections/RedevelopmentJV";
// import Hotels from "@/components/sections/Hotels";
// import LeadCapturePopup from "@/components/common/LeadCapturePopup";
// import { useLeadCapture } from "@/hooks/useLeadCapture";
// import { useEffect, useState } from "react";
// import { propertyService } from "@/services/propertyService";
// import { Property } from "@/lib/supabase";
// import { handleHashNavigation } from "@/lib/navigation";

// const Index = () => {
//   const [allProperties, setAllProperties] = useState<Property[]>([]);
//   const [loaded, setLoaded] = useState(false);

//   const { showPopup, interestLabel, triggerPopup, handleSuccess, handleClose } = useLeadCapture();

//   useEffect(() => {
//     const load = async () => {
//       const data = await propertyService.getAllProperties();
//       setAllProperties(data);
//       setLoaded(true);
//     };
//     load();
//     handleHashNavigation();
//   }, []);

//   return (
//     <div className="min-h-screen">
//       <Navbar />

//       <main className="pt-20 lg:pt-24">
//         <Hero />
//         <JointVenture />
//         <LuxuryHomes          allProperties={allProperties} triggerPopup={triggerPopup} />
//         <Apartments           allProperties={allProperties} triggerPopup={triggerPopup} />
//         <ResaleRent           allProperties={allProperties} triggerPopup={triggerPopup} />
//         <IndependentBuildings allProperties={allProperties} triggerPopup={triggerPopup} />
//         <Commercial           allProperties={allProperties} triggerPopup={triggerPopup} />
//         <PlotsLands           allProperties={allProperties} triggerPopup={triggerPopup} />
//         <RedevelopmentJV      allProperties={allProperties} triggerPopup={triggerPopup} />
//         <Hotels               allProperties={allProperties} triggerPopup={triggerPopup} />
//         <InvestorSection />
//         <International        allProperties={allProperties} triggerPopup={triggerPopup} />
//         <InvestDubai          allProperties={allProperties} triggerPopup={triggerPopup} />
//         <AboutUs />
//         <Contact />
//       </main>

//       <FloatingContact />
//       <Footer />

//       {/* Single popup instance for the whole page */}
//       {showPopup && (
//         <LeadCapturePopup
//           interest={interestLabel}
//           onSuccess={handleSuccess}
//           onClose={handleClose}
//         />
//       )}
//     </div>
//   );
// };

// export default Index;