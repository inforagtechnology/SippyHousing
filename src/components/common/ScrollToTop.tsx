import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ChevronUp } from 'lucide-react';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { pathname } = useLocation();

  // Scroll to top when route changes
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    setIsVisible(false);
  }, [pathname]);

  // Show button when page is scrolled down
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 left-6 sm:bottom-8 sm:left-8 z-50 bg-sippy-gold text-white rounded-full p-3 sm:p-4 shadow-lg hover:scale-105 hover:bg-opacity-90 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 font-medium"
          aria-label="Scroll to top"
        >
          <ChevronUp className="h-5 w-5 sm:h-5 sm:w-5" />
          <span className="hidden sm:inline">Take me to top</span>
        </button>
      )}
    </>
  );
};

export default ScrollToTop;

