
import { Phone, Mail, MapPin, Building } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { clientService } from "@/services/clientService";
import { useToast } from "@/hooks/use-toast";
import {
  GENERAL_CONTACT_NUMBER,
  SPECIAL_CONTACT_NUMBER,
  formatIndianPhone,
  getPhoneHref,
} from "@/lib/contactRouting";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    full_name: "",
    phone_number: "",
    email: "",
    interest_area: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.full_name.trim() || !formData.phone_number.trim()) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields (Name and Phone Number).",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      await clientService.addClient({
        full_name: formData.full_name.trim(),
        phone_number: formData.phone_number.trim(),
        email: formData.email.trim() || undefined,
        interest_area: formData.interest_area || "General Inquiry",
        message: formData.message.trim() || undefined
      });

      toast({
        title: "Success!",
        description: "Your message has been sent successfully. We'll get back to you soon!",
      });

      // Reset form
      setFormData({
        full_name: "",
        phone_number: "",
        email: "",
        interest_area: "",
        message: ""
      });

    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-sippy-charcoal text-white">
      <div className="section-container">
        <div className="text-center mb-16">
          <h2 className="section-title text-white">
            Contact <span className="text-sippy-gold">Us</span>
          </h2>
          <p className="section-subtitle mx-auto text-white/80">
            Get in touch with our luxury property specialists to discuss your real estate needs.
          </p>
          <div className="gold-divider"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <div>
            <div className="mb-10">
              <h3 className="text-2xl font-bold mb-6 font-playfair">Get In Touch</h3>
              <div className="space-y-6">
                <div className="flex items-start">
                  <Building className="h-6 w-6 text-sippy-gold mr-4 mt-1" />
                  <div>
                    <h4 className="font-bold mb-1">Mumbai Headquarters</h4>
                    <p className="text-white/80">B-401, Dheeraj Sneh, 30th Road, Pali Naka, Bandra West Mumbai, 400050. India</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Phone className="h-6 w-6 text-sippy-gold mr-4 mt-1" />
                  <div>
                    <h4 className="font-bold mb-1">Phone</h4>
                    <p className="text-white/80">New Projects, Resale, Residential, Commercial: {formatIndianPhone(GENERAL_CONTACT_NUMBER)}</p>
                    <p className="text-white/80">Luxury, Plots, Independent Buildings, Hotels, International: {formatIndianPhone(SPECIAL_CONTACT_NUMBER)}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Mail className="h-6 w-6 text-sippy-gold mr-4 mt-1" />
                  <div>
                    <h4 className="font-bold mb-1">Email</h4>
                    <p className="text-white/80">info@sippyhousing.com</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <MapPin className="h-6 w-6 text-sippy-gold mr-4 mt-1" />
                  <div>
                    <h4 className="font-bold mb-1">Office Hours</h4>
                    <p className="text-white/80">Monday - Saturday: 10am - 7pm</p>
                    <p className="text-white/80">Sunday: By appointment only</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white/5 p-6 rounded-lg border border-white/10">
              <h4 className="font-bold mb-4 text-center">Schedule a Property Visit</h4>
              <p className="text-white/80 text-sm mb-4 text-center">
                Visit our luxury properties with our dedicated specialists for a personalized tour.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <a 
                  href={getPhoneHref(GENERAL_CONTACT_NUMBER)}
                  className="bg-white/10 hover:bg-white/20 transition-colors rounded-md p-4 flex flex-col items-center justify-center"
                >
                  <Phone className="h-5 w-5 text-sippy-gold mb-2" />
                  <span className="text-sm">Call (General)</span>
                </a>
                <a 
                  href="mailto:sippyhousing@gmail.com,sanjaysippy@sippyhousing.com"
                  className="bg-white/10 hover:bg-white/20 transition-colors rounded-md p-4 flex flex-col items-center justify-center"
                >
                  <Mail className="h-5 w-5 text-sippy-gold mb-2" />
                  <span className="text-sm">Email Us</span>
                </a>
              </div>
            </div>
          </div>
          
          <div className="bg-white/5 p-8 rounded-lg border border-white/10">
            <h3 className="text-xl font-bold mb-6 font-playfair">Send Us a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-2">Full Name*</label>
                  <Input 
                    className="bg-white/10 border-white/20 placeholder:text-white/50 text-white"
                    placeholder="Your name"
                    value={formData.full_name}
                    onChange={(e) => handleInputChange("full_name", e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2">Phone Number*</label>
                  <Input 
                    className="bg-white/10 border-white/20 placeholder:text-white/50 text-white"
                    placeholder="+91 XXXXX XXXXX"
                    value={formData.phone_number}
                    onChange={(e) => handleInputChange("phone_number", e.target.value)}
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm mb-2">Email Address</label>
                <Input 
                  className="bg-white/10 border-white/20 placeholder:text-white/50 text-white"
                  placeholder="Your email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm mb-2">Interest Area</label>
                <Select value={formData.interest_area} onValueChange={(value) => handleInputChange("interest_area", value)}>
                  <SelectTrigger className="bg-white/10 border-white/20 text-white">
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="joint-venture">Joint Venture / Redevelopment</SelectItem>
                    <SelectItem value="luxury-homes">Luxury Homes</SelectItem>
                    <SelectItem value="apartments">Apartments & Flats</SelectItem>
                    <SelectItem value="investment">Investment Opportunities</SelectItem>
                    <SelectItem value="resale-rent">Resale & Rental Properties</SelectItem>
                    <SelectItem value="dubai">Dubai Investment</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm mb-2">Message</label>
                <Textarea 
                  className="bg-white/10 border-white/20 placeholder:text-white/50 text-white min-h-[120px]"
                  placeholder="Please share your requirements..."
                  value={formData.message}
                  onChange={(e) => handleInputChange("message", e.target.value)}
                />
              </div>
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-sippy-gold text-white px-6 py-3 rounded hover:bg-opacity-90 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Sending..." : "Submit Message"}
              </button>
              <p className="text-xs text-white/60 text-center">
                By submitting this form, you agree to our Privacy Policy and Terms of Service
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
