
import { useState } from 'react';
import { Phone, X, Mail, MessageCircle } from "lucide-react";
import { scrollToSection } from "@/lib/navigation";
import { GENERAL_CONTACT_NUMBER, getPhoneHref } from "@/lib/contactRouting";

const FloatingContact = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-24 right-10 z-50 flex flex-col items-end space-y-3">
      {isOpen && (
        <div className="flex flex-col space-y-3 animate-fade-in">
          <a
            href={getPhoneHref(GENERAL_CONTACT_NUMBER)}
            className="bg-sippy-charcoal text-white rounded-full p-3 shadow-lg hover:bg-opacity-90 transition-all"
            title="Call Us"
          >
            <Phone className="h-5 w-5" />
          </a>
          <a
            href="mailto:sippyhousing@gmail.com,sanjaysippy@sippyhousing.com"
            className="bg-sippy-charcoal text-white rounded-full p-3 shadow-lg hover:bg-opacity-90 transition-all"
            title="Email Us"
          >
            <Mail className="h-5 w-5" />
          </a>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("#contact");
            }}
            className="bg-sippy-charcoal text-white rounded-full p-3 shadow-lg hover:bg-opacity-90 transition-all cursor-pointer"
            title="Contact Form"
          >
            <MessageCircle className="h-5 w-5" />
          </a>
        </div>
      )}
      
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="floating-contact"
        aria-label="Contact options"
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <Phone className="h-6 w-6" />
        )}
      </button>
    </div>
  );
};

export default FloatingContact;
