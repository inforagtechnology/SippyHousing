// import { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { Menu, ChevronDown, X, Search, Heart } from "lucide-react";
// import Watermark from "../sections/Watermark";
// import { useCart } from "@/contexts/CartContext";
// import { scrollToSection } from "@/lib/navigation";


// interface NavItem {
//   label: string;
//   href: string;
//   subItems?: { label: string; href: string }[];
// }

// const navItems: NavItem[] = [
//   {
//     label: "Properties",
//     href: "#",
//     subItems: [
//       { label: "Residential", href: "#apartments" },
//       { label: "Commercial", href: "#commercial" },
//       { label: "Plots and Lands", href: "#plots-lands" },
//       { label: "Independent Building", href: "#independent-buildings" },
//       { label: "Hotels", href: "#hotels" }
//     ]
//   },
//   {
//     label: "Collections",
//     href: "#",
//     subItems: [
//       { label: "Luxury", href: "#luxury-homes" }, // Highlight this
//       { label: "New Projects", href: "#apartments" },
//       { label: "International", href: "#international" },
//       { label: "Resale & Rental", href: "#resale-rent" }
//     ]
//   },
//   {
//     label: "Services",
//     href: "#",
//     subItems: [
//       { label: "Redevelopment & Joint Ventures", href: "#redevelopment-jv" },
//       { label: "Investment", href: "#investor-section" }
//     ]
//   },
//   {
//     label: "About Us",
//     href: "/about"
//   }
// ];

// const Navbar = () => {
//   const navigate = useNavigate();
//   const [isOpen, setIsOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);
//   const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
//   const [searchQuery, setSearchQuery] = useState("");
//   const { cartCount } = useCart();

//   useEffect(() => {
//     const handleScroll = () => {
//       if (window.scrollY > 10) {
//         setScrolled(true);
//       } else {
//         setScrolled(false);
//       }
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const toggleDropdown = (label: string) => {
//     if (activeDropdown === label) {
//       setActiveDropdown(null);
//     } else {
//       setActiveDropdown(label);
//     }
//   };

//   const handleSearch = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (searchQuery.trim()) {
//       // Navigate to search results page with query parameter
//       navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
//       // Close mobile menu if open
//       setIsOpen(false);
//     }
//   };

//   return (
//     <nav
//       className={`w-full fixed top-0 left-0 right-0 z-[9999] transition-all duration-300 bg-rgb(64 62 67 / 0.5); overflow-visible`}
//       style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 9999, overflow: 'visible' }}
//     >
//       <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 overflow-visible relative" style={{ zIndex: 9999, position: 'relative', overflow: 'visible' }}>
//         <div className="flex items-center justify-between">
//           {/* Left: Logo */}
//           <div className="flex-shrink-0">
//             <Link to="/" className="flex items-center">
//               <img src="/logot.png" alt="Sippy Housing Logo" className="h-16 w-32 object-contain lg:h-20 lg:w-full" />
//             </Link>
//           </div>

//           {/* Center: Desktop Navigation */}
//           <div className="hidden lg:flex lg:items-center lg:space-x-6 flex-1 justify-center relative" style={{ zIndex: 10000, position: 'relative' }}>
//             {navItems.map((item) => (
//               <div key={item.label} className="relative group" style={{ zIndex: item.subItems ? 10001 : 'auto', position: 'relative' }}>
//                 {item.href.startsWith('/') ? (
//                   <Link
//                     to={item.href}
//                     className="text-sippy-charcoal hover:text-sippy-gold text-sm font-medium flex items-center py-2"
//                     onClick={() => setActiveDropdown(null)}
//                   >
//                     {item.label}
//                     {item.subItems && (
//                       <ChevronDown className="ml-1 h-4 w-4" />
//                     )}
//                   </Link>
//                 ) : item.subItems ? (
//                   <a
//                     href="#"
//                     className="text-sippy-charcoal hover:text-sippy-gold text-sm font-medium flex items-center py-2 cursor-pointer"
//                     onMouseEnter={() => setActiveDropdown(item.label)}
//                     onMouseLeave={() => setActiveDropdown(null)}
//                     onClick={(e) => {
//                       e.preventDefault();
//                     }}
//                   >
//                     {item.label}
//                     <ChevronDown className="ml-1 h-4 w-4" />
//                   </a>
//                 ) : (
//                   <a
//                     href={item.href}
//                     className="text-sippy-charcoal hover:text-sippy-gold text-sm font-medium flex items-center py-2"
//                     onClick={(e) => {
//                       e.preventDefault();
//                       setActiveDropdown(null);
//                       scrollToSection(item.href);
//                     }}
//                   >
//                     {item.label}
//                   </a>
//                 )}

//                 {/* Dropdown for desktop */}
//                 {item.subItems && activeDropdown === item.label && (
//                   <div
//                     className="absolute left-0 mt-0 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 animate-fade-in"
//                     style={{
//                       position: 'absolute',
//                       zIndex: 99999,
//                       top: '100%',
//                       isolation: 'isolate'
//                     }}
//                     onMouseEnter={() => setActiveDropdown(item.label)}
//                     onMouseLeave={() => setActiveDropdown(null)}
//                   >
//                     <div className="py-1" role="menu" aria-orientation="vertical">
//                       {item.subItems.map((subItem) => (
//                         <a
//                           key={subItem.label}
//                           href={subItem.href}
//                           className={`block px-4 py-2 text-sm text-sippy-charcoal hover:bg-sippy-beige hover:text-sippy-gold ${item.label === 'Collections' && subItem.label === 'Luxury'
//                               ? 'font-bold text-sippy-gold bg-sippy-beige/30'
//                               : ''
//                             }`}
//                           role="menuitem"
//                           onClick={(e) => {
//                             e.preventDefault();
//                             scrollToSection(subItem.href);
//                           }}
//                         >
//                           {subItem.label}
//                         </a>
//                       ))}
//                     </div>
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>

//           {/* Right Aligned Utilities */}
//           <div className="hidden lg:flex lg:items-center lg:space-x-4">
//             {/* Favorites Icon */}
//             <Link
//               to="/favorites"
//               className="relative text-sippy-charcoal hover:text-sippy-gold flex items-center justify-center p-2 rounded-lg hover:bg-gray-100 transition-colors"
//               title="Favorites"
//             >
//               <Heart className="h-5 w-5" />
//               {cartCount > 0 && (
//                 <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
//                   {cartCount}
//                 </span>
//               )}
//             </Link>
//             {/* Contact/Enquire Button */}
//             <a
//               href="#contact"
//               className="btn-primary text-sm px-4 py-2"
//               onClick={(e) => {
//                 e.preventDefault();
//                 scrollToSection("#contact");
//               }}
//             >
//               Contact / Enquire
//             </a>
//           </div>

//           {/* Mobile menu button */}
//           <div className="flex lg:hidden">
//             <button
//               onClick={() => setIsOpen(!isOpen)}
//               type="button"
//               className="inline-flex items-center justify-center p-2 rounded-md text-sippy-charcoal hover:text-sippy-gold"
//               aria-controls="mobile-menu"
//               aria-expanded="false"
//             >
//               <span className="sr-only">Open main menu</span>
//               {isOpen ? (
//                 <X className="block h-6 w-6" aria-hidden="true" />
//               ) : (
//                 <Menu className="block h-6 w-6" aria-hidden="true" />
//               )}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Mobile menu */}
//       {isOpen && (
//         <div className="lg:hidden bg-white" id="mobile-menu">
//           {/* Search Bar - Mobile */}
//           <div className="px-4 py-3 border-b border-gray-200">
//             <form onSubmit={handleSearch} className="relative">
//               <div className="relative flex">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
//                 <input
//                   type="text"
//                   placeholder="Search properties..."
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   className="w-full pl-10 pr-20 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-sippy-gold focus:border-transparent text-sm"
//                 />
//                 <button
//                   type="submit"
//                   className="px-4 py-2 bg-sippy-gold text-white rounded-r-lg hover:bg-sippy-gold/90 transition-colors text-sm font-medium"
//                 >
//                   Search
//                 </button>
//               </div>
//             </form>
//           </div>

//           <div className="px-2 pt-2 pb-3 space-y-1" style={{ color: 'white' }}>
//             {navItems.map((item) => (
//               <div key={item.label}>
//                 <div className="flex items-center justify-between">
//                   {item.href.startsWith('/') ? (
//                     <Link
//                       to={item.href}
//                       className="block px-3 py-2 text-base font-medium text-white hover:text-sippy-gold"
//                       onClick={() => setIsOpen(false)}
//                       style={{ color: 'black' }}
//                     >
//                       {item.label}
//                     </Link>
//                   ) : item.subItems ? (
//                     <a
//                       href="#"
//                       className="block px-3 py-2 text-base font-medium text-white hover:text-sippy-gold cursor-pointer"
//                       onClick={(e) => {
//                         e.preventDefault();
//                         toggleDropdown(item.label);
//                       }}
//                       style={{ color: 'black' }}
//                     >
//                       {item.label}
//                     </a>
//                   ) : (
//                     <a
//                       href={item.href}
//                       className="block px-3 py-2 text-base font-medium text-white hover:text-sippy-gold"
//                       onClick={(e) => {
//                         e.preventDefault();
//                         setIsOpen(false);
//                         scrollToSection(item.href);
//                       }}
//                       style={{ color: 'black' }}
//                     >
//                       {item.label}
//                     </a>
//                   )}
//                   {item.subItems && (
//                     <button
//                       onClick={() => toggleDropdown(item.label)}
//                       className="px-2 py-1"
//                     >
//                       <ChevronDown className={`h-4 w-4 transition-transform ${activeDropdown === item.label ? 'rotate-180' : ''}`} />
//                     </button>
//                   )}
//                 </div>

//                 {/* Dropdown for mobile */}
//                 {item.subItems && activeDropdown === item.label && (
//                   <div className="ml-4 space-y-1 border-l-2 border-sippy-gold pl-4">
//                     {item.subItems.map((subItem) => (
//                       <a
//                         key={subItem.label}
//                         href={subItem.href}
//                         className={`block px-3 py-2 text-sm font-medium text-sippy-charcoal hover:text-sippy-gold ${item.label === 'Collections' && subItem.label === 'Luxury'
//                             ? 'font-bold text-sippy-gold'
//                             : ''
//                           }`}
//                         onClick={(e) => {
//                           e.preventDefault();
//                           setIsOpen(false);
//                           scrollToSection(subItem.href);
//                         }}
//                         style={{ color: 'black' }}
//                       >
//                         {subItem.label}
//                       </a>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             ))}
//             {/* Mobile Utilities */}
//             <div className="border-t border-gray-200 mt-4 pt-4 space-y-2">
//               <Link
//                 to="/favorites"
//                 className="flex items-center px-3 py-2 text-base font-medium text-black hover:text-sippy-gold"
//                 onClick={() => setIsOpen(false)}
//               >
//                 <Heart className="h-5 w-5 mr-2" />
//                 Favorites
//                 {cartCount > 0 && (
//                   <span className="ml-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
//                     {cartCount}
//                   </span>
//                 )}
//               </Link>
//               <a
//                 href="#contact"
//                 className="block w-full text-center mt-2 btn-primary"
//                 onClick={(e) => {
//                   e.preventDefault();
//                   setIsOpen(false);
//                   scrollToSection("#contact");
//                 }}
//               >
//                 Contact / Enquire
//               </a>
//             </div>
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;


import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, ChevronDown, X, Search, Heart } from "lucide-react";
import Watermark from "../sections/Watermark";
import { useCart } from "@/contexts/CartContext";
import { scrollToSection } from "@/lib/navigation";


interface NavItem {
  label: string;
  href: string;
  subItems?: { label: string; href: string }[];
}

// Menu structure (as agreed): Luxury | Development | Residential | Commercial | Independent
const navItems: NavItem[] = [
  {
    label: "Luxury",
    href: "#luxury-homes"
  },
  {
    label: "Development",
    href: "#",
    subItems: [
      { label: "Plots / Lands", href: "#plots-lands" },
      { label: "Redevelopment", href: "#redevelopment-jv" },
      { label: "Joint Venture (JV)", href: "#redevelopment-jv" }
    ]
  },
  {
    label: "Residential",
    href: "#",
    subItems: [
      { label: "New Projects", href: "#new-projects" },
      { label: "Resale & Rental", href: "#resale-rent" }
    ]
  },
  {
    label: "Commercial",
    href: "#",
    subItems: [
      { label: "Resale / Rental", href: "#commercial" },
      { label: "Hotels", href: "#hotels" }
    ]
  },
  {
    label: "Independent",
    href: "#independent-buildings"
  },
  {
    label: "International",
    href: "#international",
   
  },
  {
    label: "About Us",
    href: "/about"
  }
];

const Navbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Fullscreen search overlay
  const [searchOpen, setSearchOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const { cartCount } = useCart();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Focus input & lock body scroll when overlay opens
  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 50);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [searchOpen]);

  // Close on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSearchOpen(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const toggleDropdown = (label: string) => {
    setActiveDropdown(prev => (prev === label ? null : label));
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsOpen(false);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <>
      {/* ── Fullscreen Search Overlay ──────────────────────────────────── */}
      {searchOpen && (
        <div
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center"
          style={{ background: "rgba(20, 18, 18, 0.96)", backdropFilter: "blur(10px)" }}
        >
          {/* Close */}
          <button
            onClick={() => setSearchOpen(false)}
            className="absolute top-6 right-6 text-white/60 hover:text-sippy-gold transition-colors"
            aria-label="Close search"
          >
            <X className="h-8 w-8" />
          </button>

          <p className="text-white/40 text-xs tracking-[0.25em] uppercase mb-8 font-medium">
            Search Properties
          </p>

          {/* Input */}
          <form
            onSubmit={handleSearch}
            className="w-full max-w-2xl px-6 flex flex-col items-center gap-6"
          >
            <div className="relative w-full">
              <Search className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-5 text-sippy-gold pointer-events-none" />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search anything – location, project, 3bhk, jv, hotel, bha*…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-4 py-4 bg-transparent border-b-2 border-white/20 focus:border-sippy-gold outline-none text-white text-2xl placeholder:text-white/25 transition-colors"
                style={{ caretColor: "#C9A84C" }}
              />
            </div>
            <button
              type="submit"
              className="px-12 py-3 bg-sippy-gold text-white font-semibold rounded hover:bg-sippy-gold/80 transition-colors text-sm tracking-widest uppercase"
            >
              Search
            </button>
          </form>

          {/* Quick hint chips */}
          <div className="mt-10 flex flex-wrap gap-3 justify-center px-6 max-w-2xl">
            {["Mumbai", "Bandra", "Powai", "Worli", "Andheri", "Luxury Flats"].map((hint) => (
              <button
                key={hint}
                type="button"
                onClick={() => {
                  navigate(`/search?q=${encodeURIComponent(hint)}`);
                  setSearchOpen(false);
                  setSearchQuery("");
                }}
                className="px-4 py-1.5 rounded-full border border-white/15 text-white/50 hover:border-sippy-gold hover:text-sippy-gold text-sm transition-colors"
              >
                {hint}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── Navbar ─────────────────────────────────────────────────────── */}
      <nav
        className="w-full fixed top-0 left-0 right-0 z-[9999] transition-all duration-300 overflow-visible"
        style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 9999, overflow: 'visible' }}
      >
        <div
          className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 overflow-visible relative"
          style={{ zIndex: 9999, position: 'relative', overflow: 'visible' }}
        >
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link to="/" className="flex items-center">
                <img
                  src="/logot.png"
                  alt="Sippy Housing Logo"
                  className="h-16 w-32 object-contain lg:h-20 lg:w-full"
                />
              </Link>
            </div>

            {/* Desktop Nav */}
            <div
              className="hidden lg:flex lg:items-center lg:space-x-6 flex-1 justify-center relative"
              style={{ zIndex: 10000, position: 'relative' }}
            >
              {navItems.map((item) => (
                <div
                  key={item.label}
                  className="relative group"
                  style={{ zIndex: item.subItems ? 10001 : 'auto', position: 'relative' }}
                >
                  {item.href.startsWith('/') ? (
                    <Link
                      to={item.href}
                      className="text-sippy-charcoal hover:text-sippy-gold text-sm font-medium flex items-center py-2"
                      onClick={() => setActiveDropdown(null)}
                    >
                      {item.label}
                      {item.subItems && <ChevronDown className="ml-1 h-4 w-4" />}
                    </Link>
                  ) : item.subItems ? (
                    <a
                      href="#"
                      className="text-sippy-charcoal hover:text-sippy-gold text-sm font-medium flex items-center py-2 cursor-pointer"
                      onMouseEnter={() => setActiveDropdown(item.label)}
                      onMouseLeave={() => setActiveDropdown(null)}
                      onClick={(e) => e.preventDefault()}
                    >
                      {item.label}
                      <ChevronDown className="ml-1 h-4 w-4" />
                    </a>
                  ) : (
                    <a
                      href={item.href}
                      className="text-sippy-charcoal hover:text-sippy-gold text-sm font-medium flex items-center py-2"
                      onClick={(e) => {
                        e.preventDefault();
                        setActiveDropdown(null);
                        scrollToSection(item.href);
                      }}
                    >
                      {item.label}
                    </a>
                  )}

                  {/* Desktop dropdown */}
                  {item.subItems && activeDropdown === item.label && (
                    <div
                      className="absolute left-0 mt-0 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 animate-fade-in"
                      style={{ position: 'absolute', zIndex: 99999, top: '100%', isolation: 'isolate' }}
                      onMouseEnter={() => setActiveDropdown(item.label)}
                      onMouseLeave={() => setActiveDropdown(null)}
                    >
                      <div className="py-1" role="menu" aria-orientation="vertical">
                        {item.subItems.map((subItem) => (
                          <a
                            key={subItem.label}
                            href={subItem.href}
                            className={`block px-4 py-2 text-sm text-sippy-charcoal hover:bg-sippy-beige hover:text-sippy-gold ${
                              item.label === 'Collections' && subItem.label === 'Luxury'
                                ? 'font-bold text-sippy-gold bg-sippy-beige/30'
                                : ''
                            }`}
                            role="menuitem"
                            onClick={(e) => {
                              e.preventDefault();
                              scrollToSection(subItem.href);
                            }}
                          >
                            {subItem.label}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Desktop right utilities */}
            <div className="hidden lg:flex lg:items-center lg:space-x-4">
              {/* Search icon → opens fullscreen overlay */}
              <button
                onClick={() => setSearchOpen(true)}
                className="text-sippy-charcoal hover:text-sippy-gold flex items-center justify-center p-2 rounded-lg hover:bg-gray-100 transition-colors"
                title="Search"
                aria-label="Open search"
              >
                <Search className="h-5 w-5" />
              </button>

              {/* Favorites */}
              <Link
                to="/favorites"
                className="relative text-sippy-charcoal hover:text-sippy-gold flex items-center justify-center p-2 rounded-lg hover:bg-gray-100 transition-colors"
                title="Favorites"
              >
                <Heart className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* Contact */}
              <a
                href="#contact"
                className="btn-primary text-sm px-4 py-2"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("#contact");
                }}
              >
                Contact / Enquire
              </a>
            </div>

            {/* Mobile right: search + hamburger */}
            <div className="flex lg:hidden items-center gap-1">
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 text-sippy-charcoal hover:text-sippy-gold transition-colors"
                aria-label="Open search"
              >
                <Search className="h-5 w-5" />
              </button>
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-md text-sippy-charcoal hover:text-sippy-gold"
                aria-controls="mobile-menu"
                aria-expanded={isOpen}
              >
                <span className="sr-only">Open main menu</span>
                {isOpen ? (
                  <X className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="block h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="lg:hidden bg-white" id="mobile-menu">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <div key={item.label}>
                  <div className="flex items-center justify-between">
                    {item.href.startsWith('/') ? (
                      <Link
                        to={item.href}
                        className="block px-3 py-2 text-base font-medium text-black hover:text-sippy-gold"
                        onClick={() => setIsOpen(false)}
                      >
                        {item.label}
                      </Link>
                    ) : item.subItems ? (
                      <a
                        href="#"
                        className="block px-3 py-2 text-base font-medium text-black hover:text-sippy-gold cursor-pointer"
                        onClick={(e) => {
                          e.preventDefault();
                          toggleDropdown(item.label);
                        }}
                      >
                        {item.label}
                      </a>
                    ) : (
                      <a
                        href={item.href}
                        className="block px-3 py-2 text-base font-medium text-black hover:text-sippy-gold"
                        onClick={(e) => {
                          e.preventDefault();
                          setIsOpen(false);
                          scrollToSection(item.href);
                        }}
                      >
                        {item.label}
                      </a>
                    )}
                    {item.subItems && (
                      <button
                        onClick={() => toggleDropdown(item.label)}
                        className="px-2 py-1"
                      >
                        <ChevronDown className={`h-4 w-4 transition-transform ${activeDropdown === item.label ? 'rotate-180' : ''}`} />
                      </button>
                    )}
                  </div>

                  {item.subItems && activeDropdown === item.label && (
                    <div className="ml-4 space-y-1 border-l-2 border-sippy-gold pl-4">
                      {item.subItems.map((subItem) => (
                        <a
                          key={subItem.label}
                          href={subItem.href}
                          className={`block px-3 py-2 text-sm font-medium text-sippy-charcoal hover:text-sippy-gold ${
                            item.label === 'Collections' && subItem.label === 'Luxury'
                              ? 'font-bold text-sippy-gold'
                              : ''
                          }`}
                          onClick={(e) => {
                            e.preventDefault();
                            setIsOpen(false);
                            scrollToSection(subItem.href);
                          }}
                        >
                          {subItem.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* Mobile utilities */}
              <div className="border-t border-gray-200 mt-4 pt-4 space-y-2">
                <Link
                  to="/favorites"
                  className="flex items-center px-3 py-2 text-base font-medium text-black hover:text-sippy-gold"
                  onClick={() => setIsOpen(false)}
                >
                  <Heart className="h-5 w-5 mr-2" />
                  Favorites
                  {cartCount > 0 && (
                    <span className="ml-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </Link>
                <a
                  href="#contact"
                  className="block w-full text-center mt-2 btn-primary"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsOpen(false);
                    scrollToSection("#contact");
                  }}
                >
                  Contact / Enquire
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;