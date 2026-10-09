
// import { Phone, Mail, MapPin } from "lucide-react";
// import { Link } from "react-router-dom";
 import { scrollToSection } from "@/lib/navigation";

// import {
//   GENERAL_CONTACT_NUMBER,
//   SPECIAL_CONTACT_NUMBER,
//   formatIndianPhone,
//   getPhoneHref,
// } from "@/lib/contactRouting";
// const { data } = await getWebsiteSettings();
// const Footer = () => {
//   return (
//     <footer className="bg-sippy-charcoal text-white pt-16 pb-8">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//           {/* Column 1 - About */}
//           <div>
//             <h3 className="text-2xl font-playfair font-bold mb-6">
//               Sippy <span className="text-sippy-gold">Housing</span>
//             </h3>
//             <p className="text-gray-300 mb-6">
//               Elevating real estate experiences with distinguished properties and prestigious investment opportunities across Mumbai and beyond.
//             </p>
//             <div className="flex space-x-4">
//               <a href="https://www.facebook.com/SippyHousing" className="text-white hover:text-sippy-gold">
//                 <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
//                   <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
//                 </svg>
//               </a>
//               <a href="https://www.instagram.com/sippy_housing" className="text-white hover:text-sippy-gold">
//                 <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
//                   <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
//                 </svg>
//               </a>
//               {/* <a href="#" className="text-white hover:text-sippy-gold">
//                 <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
//                   <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
//                 </svg>
//               </a> */}
//               <a
//   href="https://x.com/SIPPYHOUSING"
//   target="_blank"
//   rel="noopener noreferrer"
//   className="text-white hover:text-sippy-gold transition-colors"
// >
//   <svg
//     className="h-5 w-5"
//     fill="currentColor"
//     viewBox="0 0 24 24"
//     aria-hidden="true"
//   >
//     <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.847h-7.406l-5.8-7.584-6.64 7.584H.474l8.6-9.83L0 1.153h7.594l5.243 6.932 6.064-6.932zm-1.292 19.49h2.04L6.486 3.24H4.298L17.609 20.643z" />
//   </svg>
// </a>
//               <a
//   href="https://www.linkedin.com/company/sippy-housing-estates-&-properties"
//   target="_blank"
//   rel="noopener noreferrer"
//   className="text-white hover:text-sippy-gold transition-colors"
// >
//   <svg
//     className="h-5 w-5"
//     fill="currentColor"
//     viewBox="0 0 24 24"
//     aria-hidden="true"
//   >
//     <path d="M20.447 20.452H16.89v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.345V9h3.414v1.561h.049c.476-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.063 2.063 0 110-4.126 2.063 2.063 0 010 4.126zM7.119 20.452H3.556V9h3.563v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
//   </svg>
// </a>
//               <a
//   href="https://www.youtube.com/@SIPPYHOUSINGMumbai"
//   target="_blank"
//   rel="noopener noreferrer"
//   className="text-white hover:text-sippy-gold transition-colors"
// >
//   <svg
//     className="h-6 w-6"
//     fill="currentColor"
//     viewBox="0 0 24 24"
//     aria-hidden="true"
//   >
//     <path d="M23.498 6.186a2.997 2.997 0 00-2.11-2.12C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.388.566a2.997 2.997 0 00-2.11 2.12A31.12 31.12 0 000 12a31.12 31.12 0 00.502 5.814 2.997 2.997 0 002.11 2.12C4.495 20.5 12 20.5 12 20.5s7.505 0 9.388-.566a2.997 2.997 0 002.11-2.12A31.12 31.12 0 0024 12a31.12 31.12 0 00-.502-5.814zM9.75 15.568V8.432L15.818 12 9.75 15.568z" />
//   </svg>
// </a>
//             </div>
//           </div>

//           {/* Column 2 - Quick Links */}
//           <div>
//             <h4 className="text-lg font-bold mb-6 font-playfair">Quick Links</h4>
//             <ul className="space-y-3">
//               <li><a href="#joint-venture" onClick={(e) => { e.preventDefault(); scrollToSection("#joint-venture"); }} className="text-gray-300 hover:text-sippy-gold transition-colors cursor-pointer">Joint Venture</a></li>
//               <li><a href="#luxury-homes" onClick={(e) => { e.preventDefault(); scrollToSection("#luxury-homes"); }} className="text-gray-300 hover:text-sippy-gold transition-colors cursor-pointer">Luxury Homes</a></li>
//               <li><a href="#apartments" onClick={(e) => { e.preventDefault(); scrollToSection("#apartments"); }} className="text-gray-300 hover:text-sippy-gold transition-colors cursor-pointer">Apartments & Flats</a></li>
//               <li><a href="#investor-section" onClick={(e) => { e.preventDefault(); scrollToSection("#investor-section"); }} className="text-gray-300 hover:text-sippy-gold transition-colors cursor-pointer">Investor Section</a></li>
//               <li><a href="#resale-rent" onClick={(e) => { e.preventDefault(); scrollToSection("#resale-rent"); }} className="text-gray-300 hover:text-sippy-gold transition-colors cursor-pointer">Resale & Rent</a></li>
//               <li><a href="#invest-dubai" onClick={(e) => { e.preventDefault(); scrollToSection("#invest-dubai"); }} className="text-gray-300 hover:text-sippy-gold transition-colors cursor-pointer">Invest in Dubai</a></li>
//               <li><Link to="/about" className="text-gray-300 hover:text-sippy-gold transition-colors">About Us</Link></li>
//               <li><a href="/admin" className="text-gray-300 hover:text-sippy-gold transition-colors">Admin</a></li>
//             </ul>
//           </div>

//           {/* Column 3 - Contact */}
//           <div>
//             <h4 className="text-lg font-bold mb-6 font-playfair">Contact Us</h4>
//             <ul className="space-y-4">
//               <li className="flex items-start">
//                 <MapPin className="h-5 w-5 text-sippy-gold mr-3 mt-1 flex-shrink-0" />
//                 <span className="text-gray-300">B-401, Dheeraj Sneh, 30th Road, Pali Naka, Bandra West Mumbai, 400050. India</span>
//               </li>
//               <li className="flex items-center">
//                 <Phone className="h-5 w-5 text-sippy-gold mr-3 flex-shrink-0" />
//                 <div className="text-gray-300">
//                   <a href={getPhoneHref(GENERAL_CONTACT_NUMBER)} className="hover:text-sippy-gold">{formatIndianPhone(GENERAL_CONTACT_NUMBER)}</a>
//                   <span className="mx-1">|</span>
//                   <a href={getPhoneHref(SPECIAL_CONTACT_NUMBER)} className="hover:text-sippy-gold">{formatIndianPhone(SPECIAL_CONTACT_NUMBER)}</a>
//                 </div>
//               </li>
//               <li className="flex items-center">
//                 <Mail className="h-5 w-5 text-sippy-gold mr-3 flex-shrink-0" />
//                 <a href="mailto:info@sippyhousing.com" className="text-gray-300 hover:text-sippy-gold">info@sippyhousing.com</a>
//               </li>
//             </ul>
//           </div>

//           {/* Column 4 - Newsletter */}
//           {/* <div>
//             <h4 className="text-lg font-bold mb-6 font-playfair">Subscribe to Our Newsletter</h4>
//             <p className="text-gray-300 mb-4">Stay updated with our latest properties and investment opportunities.</p>
//             <form className="space-y-3">
//               <div>
//                 <input
//                   type="email"
//                   placeholder="Your email address"
//                   className="w-full px-4 py-2 rounded bg-sippy-charcoal border border-gray-700 text-white focus:outline-none focus:border-sippy-gold"
//                 />
//               </div>
//               <button type="submit" className="btn-primary w-full">Subscribe</button>
//             </form>
//           </div> */}
//         </div>

//         {/* Trust Badges */}
//         <div className="mt-16 mb-8 border-t border-gray-700 pt-8">
//           <h4 className="text-lg font-bold mb-6 text-center font-playfair">Trusted By</h4>
//           <div className="flex flex-wrap justify-center gap-8">
//             <div className="bg-white/10 rounded-lg px-6 py-3 flex items-center">
//               <span className="text-white font-medium">CREDAI</span>
//             </div>
//             <div className="bg-white/10 rounded-lg px-6 py-3 flex items-center">
//               <span className="text-white font-medium">RERA Certified</span>
//             </div>
//             <div className="bg-white/10 rounded-lg px-6 py-3 flex items-center">
//               <span className="text-white font-medium">ISO 9001:2015</span>
//             </div>
//             <div className="bg-white/10 rounded-lg px-6 py-3 flex items-center">
//               <span className="text-white font-medium">IGBC Member</span>
//             </div>
//           </div>
//         </div>

//         {/* Copyright */}
//         <div className="mt-8 border-t border-gray-700 pt-8 text-center">
//           <p className="text-gray-400">© {new Date().getFullYear()} Sippy Housing. All rights reserved.</p>
//         </div>
//         {/* <img src="/logot.png" alt="Joint Venture" width={500} height={500} className="w-full object-cover rounded-lg" /> */}
//       </div>
//     </footer>
//   );
// };

// export default Footer;


import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Linkedin, Youtube, Phone, Mail, MapPin, TwitterIcon } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface QuickLink {
  label: string;
  url: string;
}

interface Settings {
  company_name: string;
  company_email: string;
  company_phone: string;
  company_address: string;
  facebook_url: string;
  instagram_url: string;
  linkedin_url: string;
  youtube_url: string;
  twitter_url: string;
  footer_copyright: string;
  logo_url: string;
  quick_links: QuickLink[];
}

const DEFAULTS: Settings = {
  company_name: "Sippy Housing",
  company_email: "info@sippyhousing.com",
  company_phone: "",
  company_address: "",
  facebook_url: "",
  instagram_url: "",
  linkedin_url: "",
  youtube_url: "",
  twitter_url: "",
  footer_copyright: "",
  logo_url: "",
  quick_links: [],
};

/**
 * Footer driven by the website_settings table, so admins can update
 * quick links, contact info, and social links from /admin/settings
 * without touching code.
 *
 * If you already have a Footer.tsx, you can either replace it with
 * this one, or copy the `fetchSettings` effect + the quick-links /
 * contact blocks into your existing layout.
 */
const Footer = () => {
  const [settings, setSettings] = useState<Settings>(DEFAULTS);

  useEffect(() => {
    const fetchSettings = async () => {
      const { data, error } = await supabase
        .from("website_settings")
        .select("*")
        .eq("id", 1)
        .single();

      if (!error && data) {
        setSettings({
          ...DEFAULTS,
          ...data,
          quick_links: Array.isArray(data.quick_links) ? data.quick_links : [],
        });
      }
    };
    fetchSettings();
  }, []);

  const year = new Date().getFullYear();
  const copyright =
    settings.footer_copyright?.trim() || `© ${year} ${settings.company_name}. All rights reserved.`;

  const socials = [
    { url: settings.facebook_url, Icon: Facebook, label: "Facebook" },
    { url: settings.instagram_url, Icon: Instagram, label: "Instagram" },
    { url: settings.linkedin_url, Icon: Linkedin, label: "LinkedIn" },
    { url: settings.youtube_url, Icon: Youtube, label: "YouTube" },
    { url: settings.twitter_url, Icon: TwitterIcon, label: "Twitter" },
  ].filter((s) => s.url?.trim());

  return (
    <footer className="bg-sippy-charcoal text-white pt-2 pb-2 ">
      <div className="section-container px-4 py-4 ">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">

          {/* Brand */}
          <div>
            {/* {settings.logo_url ? (
              <img src={settings.logo_url} alt={settings.company_name} className="h-10 mb-4 text-2xl" />
            ) : (
              <h3 className="text-xl font-bold font-playfair mb-4 text-2xl">
                {settings.company_name}
              </h3>
            )} */}
            <h3 className="text-2xl font-playfair font-bold mb-6">
              Sippy <span className="text-sippy-gold">Housing</span>
            </h3>
            <p className="text-white/80 text-base leading-relaxed">
              Elevating real estate experiences with distinguished properties and prestigious investment opportunities across Mumbai and beyond.
            </p>

            {socials.length > 0 && (
              <div className="flex gap-3 mt-5">
                {socials.map(({ url, Icon, label }) => (
                  <a
                    key={label}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-9 h-9 rounded-full bg-white/10 hover:bg-sippy-gold/80 flex items-center justify-center transition-colors"
                  >
                    <Icon className="h-4 w-4 texthite-w" />
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Quick links — admin-editable via /admin/settings */}
          <div>
            <h4 className="font-semibold mb-4 font-playfair text-xl">Quick Links</h4>
             <div>
            
            <ul className="space-y-3">
             <li><a href="#joint-venture" onClick={(e) => { e.preventDefault(); scrollToSection("#joint-venture"); }} className="text-gray-300 hover:text-sippy-gold transition-colors cursor-pointer">Joint Venture</a></li>
             <li><a href="#luxury-homes" onClick={(e) => { e.preventDefault(); scrollToSection("#luxury-homes"); }} className="text-gray-300 hover:text-sippy-gold transition-colors cursor-pointer">Luxury Homes</a></li>
               <li><a href="#apartments" onClick={(e) => { e.preventDefault(); scrollToSection("#apartments"); }} className="text-gray-300 hover:text-sippy-gold transition-colors cursor-pointer">Apartments & Flats</a></li>
              <li><a href="#international" onClick={(e) => { e.preventDefault(); scrollToSection("#international"); }} className="text-gray-300 hover:text-sippy-gold transition-colors cursor-pointer">International</a></li>
              <li><a href="#investor-section" onClick={(e) => { e.preventDefault(); scrollToSection("#investor-section"); }} className="text-gray-300 hover:text-sippy-gold transition-colors cursor-pointer">Investment</a></li>
               <li><a href="#resale-rent" onClick={(e) => { e.preventDefault(); scrollToSection("#resale-rent"); }} className="text-gray-300 hover:text-sippy-gold transition-colors cursor-pointer">Resale & Rent</a></li>
              <li><a href="#invest-dubai" onClick={(e) => { e.preventDefault(); scrollToSection("#invest-dubai"); }} className="text-gray-300 hover:text-sippy-gold transition-colors cursor-pointer">Invest in Dubai</a></li>
             <li><Link to="/about" className="text-gray-300 hover:text-sippy-gold transition-colors">About Us</Link></li>
              <li><a href="/admin" className="text-gray-300 hover:text-sippy-gold transition-colors">Admin</a></li>
            </ul>
           </div>

            {settings.quick_links.length > 0 ? (
              <ul className="space-y-2 text-base">
                {settings.quick_links.map((link, i) => (
                  <li key={i}>
                    {link.url.startsWith("http") ? (
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/70 hover:text-sippy-gold transition-colors"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        to={link.url}
                        className="text-white/70 hover:text-sippy-gold transition-colors"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-white/40 text-base ">No links added yet.</p>
            )}
          </div>

          {/* Contact — admin-editable via /admin/settings */}
          <div>
            <h4 className="font-semibold mb-4 font-playfair  text-xl">Contact Us</h4>
            <ul className="space-y-3 text-base text-white/70">
              {settings.company_phone && (
                <li className="flex items-start gap-2">
                  <Phone className="h-4 w-4 text-sippy-gold mt-0.5 flex-shrink-0" />
                  <a href={`tel:+91${settings.company_phone}`} className="hover:text-sippy-gold transition-colors">
                    +91 {settings.company_phone}
                  </a>
                </li>
              )}
              {settings.company_email && (
                <li className="flex items-start gap-2">
                  <Mail className="h-4 w-4 text-sippy-gold mt-0.5 flex-shrink-0" />
                  <a href={`mailto:${settings.company_email}`} className="hover:text-sippy-gold transition-colors">
                    {settings.company_email}
                  </a>
                </li>
              )}
              {settings.company_address && (
                <li className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-sippy-gold mt-0.5 flex-shrink-0" />
                  <span>{settings.company_address}</span>
                </li>
              )}
            </ul>
          </div>

          {/* Newsletter / extra slot — kept simple, optional to use */}
          <div>
            <h4 className="font-semibold mb-4 font-playfair  text-xl">Office Hours</h4>
            <p className="text-white/70 text-lg">Monday – Saturday: 10am – 7pm</p>
            <p className="text-white/70 text-base mt-1">Sunday: By appointment only</p>
          </div>
        </div>
        {/* Trust Badges */}
        <div className="mt-16 mb-8 border-t border-gray-700 pt-8">
          <h4 className="text-lg font-bold mb-6 text-center font-playfair">Trusted By</h4>
          <div className="flex flex-wrap justify-center gap-8">
            <div className="bg-white/10 rounded-lg px-6 py-3 flex items-center">
              <span className="text-white font-medium">CREDAI</span>
            </div>
            <div className="bg-white/10 rounded-lg px-6 py-3 flex items-center">
              <span className="text-white font-medium">RERA Certified</span>
            </div>
            <div className="bg-white/10 rounded-lg px-6 py-3 flex items-center">
              <span className="text-white font-medium">ISO 9001:2015</span>
            </div>
            <div className="bg-white/10 rounded-lg px-6 py-3 flex items-center">
              <span className="text-white font-medium">IGBC Member</span>
            </div>
          </div>
        </div>
        <div className="mt-2 border-t border-gray-700 pt-2  text-center">
          {/* <p className="text-gray-400">© {new Date().getFullYear()} Sippy Housing. All rights reserved.</p> */}

          <p className="text-gray-400">
  © {new Date().getFullYear()} Sippy Housing. All rights reserved. |
  Developed by{" "}
  <span className="font-medium">
    Inforag Technology
  </span>
</p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
