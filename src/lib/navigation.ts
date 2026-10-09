// Navigation utility to handle hash links from any page
export const scrollToSection = (sectionId: string) => {
  // Remove # if present
  const id = sectionId.replace('#', '');
  
  // If we're not on the home page, navigate to home first
  if (window.location.pathname !== '/') {
    window.location.href = `/#${id}`;
    return;
  }
  
  // If we're on the home page, scroll to the section
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      console.log(element);
  }
};

// Handle hash navigation on page load
export const handleHashNavigation = () => {
  if (window.location.hash) {
    const hash = window.location.hash.replace('#', '');
    setTimeout(() => {
      const element = document.getElementById(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  }
};
