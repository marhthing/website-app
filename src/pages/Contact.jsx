import { useState } from "react";
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram } from "lucide-react";
import { portalFetchJson } from "../utils/portal";

const CONTACT_ENDPOINT =
  import.meta.env.VITE_PORTAL_CONTACT_ENDPOINT ||
  "https://portal.sfgs.com.ng/?page=contact_submit";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus("Sending...");

    try {
      const result = await portalFetchJson(CONTACT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });

      if (result?.success) {
        setStatus(result.success);
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setStatus(null), 5000);
        return;
      }

      setStatus("Message sent.");
    } catch (error) {
      console.error('Network error details:', error);
      setStatus(error?.message || "Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#2c0202] px-6 py-12">
      <h2 className="text-3xl font-bold text-white mt-10 mb-8">Contact Us</h2>

      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-4 sm:p-6 md:p-8 rounded-lg shadow-lg">
        {/* Email Form */}
        <form
          onSubmit={handleSubmit}
          className="order-1 md:order-none space-y-3 sm:space-y-4"
        >
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800">Send us a Message</h3>
          
          <div>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              required
              disabled={isLoading}
              className="w-full p-2 sm:p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
              minLength="2"
              maxLength="100"
            />
          </div>

          <div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              required
              disabled={isLoading}
              className="w-full p-2 sm:p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
              maxLength="100"
            />
          </div>

          <div>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message"
              required
              rows="4"
              disabled={isLoading}
              className="w-full p-2 sm:p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed resize-vertical"
              minLength="10"
              maxLength="1000"
            />
            <p className="text-xs text-gray-500 mt-1">
              {formData.message.length}/1000 characters
            </p>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-red-500 text-white py-2 sm:py-3 rounded-md hover:bg-red-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Sending...
              </span>
            ) : (
              "Send Message"
            )}
          </button>

          {status && (
            <div className={`p-3 rounded-md text-sm ${
              status.includes("successfully") 
                ? "bg-green-50 text-green-700 border border-green-200" 
                : status.includes("Sending") 
                ? "bg-blue-50 text-blue-700 border border-blue-200" 
                : "bg-red-50 text-red-700 border border-red-200"
            }`}>
              {status}
            </div>
          )}
        </form>
        
        {/* Contact Info */}
        <div className="order-2 space-y-6">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800">Get in Touch</h3>
          <p className="text-gray-600">Feel free to reach out to us through any of the following channels:</p>
        
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Phone className="text-red-500 flex-shrink-0" />
              <div className="text-gray-700 text-sm sm:text-base leading-6">
                <p>
                  <a className="hover:underline" href="tel:+2347066574117">
                    +234 7066574117
                  </a>
                </p>
                <p>
                  <a className="hover:underline" href="tel:+2348032750680">
                    +234 8032750680
                  </a>
                </p>
                <p>
                  <a className="hover:underline" href="tel:+2347070879787">
                    +234 7070879787
                  </a>
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Mail className="text-red-500 flex-shrink-0" />
              <p className="text-gray-700 text-sm sm:text-base">
                <a className="hover:underline" href="mailto:surefoundationgroupofschool@gmail.com">
                  surefoundationgroupofschool@gmail.com
                </a>
              </p>
            </div>
            <div className="flex items-start space-x-3">
              <MapPin className="text-red-500 flex-shrink-0 mt-1" />
              <p className="text-gray-700 text-sm sm:text-base">
                <a
                  className="hover:underline"
                  href="https://www.google.com/maps/search/?api=1&query=33%20Ada%20George%20Road%2C%20Agip%2C%20Port%20Harcourt%2C%20Nigeria"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  33 Ada George Road, Agip, Port Harcourt, Nigeria
                </a>
              </p>
            </div>
          </div>
        
          {/* Social Icons */}
          <div className="flex space-x-4 mt-6">
            <a 
              href="https://facebook.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="transition-colors duration-200"
            >
              <Facebook className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700 hover:text-blue-500" />
            </a>
            <a 
              href="https://twitter.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="transition-colors duration-200"
            >
              <Twitter className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700 hover:text-blue-400" />
            </a>
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="transition-colors duration-200"
            >
              <Instagram className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700 hover:text-pink-500" />
            </a>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="w-full max-w-4xl mt-12">
        <h3 className="text-xl font-semibold text-white mb-4">Our Location</h3>
        <iframe
          title="Google Map - Sure Foundation Group of Schools"
          className="w-full h-64 rounded-lg shadow-lg"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3975.7694183363833!2d6.979764973977257!3d4.809609095165839!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1069ce5ad10db071%3A0x8006133cf065813e!2ssure%20foundation%20group%20of%20schools!5e0!3m2!1sen!2sau!4v1740086912752!5m2!1sen!2sau"
          allowFullScreen
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
};

export default Contact;
