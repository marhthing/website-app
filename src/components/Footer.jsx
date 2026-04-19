import { Link } from "react-router-dom";
import { ASSETS } from "../constants/assets";
import { MapPin, Phone, Mail, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const nextYear = currentYear + 1;

  const quickLinks = [
    { label: "Home", to: "/" },
    { label: "About Us", to: "/about" },
    { label: "Admission", to: "/admission" },
    { label: "Contact", to: "/contact" },
    { label: "Calendar", to: "/calender" },
    { label: "Student Portal", href: "https://portal.sfgs.com.ng/" },
  ];

  const admissionLinks = [
    { label: "How to Apply", to: "/admission" },
    { label: "Admission Criteria", to: "/admission" },
    { label: `${currentYear}/${nextYear} Admission`, to: "/admission" },
    { label: "Contact Admissions", to: "/contact" },
  ];

  const socialLinks = [
    { icon: <Facebook size={18} />, href: "#", label: "Facebook" },
    { icon: <Twitter size={18} />, href: "#", label: "Twitter" },
    { icon: <Instagram size={18} />, href: "#", label: "Instagram" },
    { icon: <Linkedin size={18} />, href: "#", label: "LinkedIn" },
  ];

  return (
    <footer className="bg-[#3a0a30] text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link to="/" className="inline-flex items-center gap-3 mb-5">
              <img src={ASSETS.logo} alt="Sure Foundation" className="h-12 w-12 object-contain" />
              <div>
                <span className="block font-bold text-white text-sm leading-tight">Sure Foundation</span>
                <span className="block text-[#F069B4] text-xs">Group of Schools</span>
              </div>
            </Link>
            <p className="text-white/70 text-sm leading-relaxed mb-6">
              A leading educational institution offering comprehensive programs for
              students aged 3 to 18 in Port Harcourt, Nigeria.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="flex items-center justify-center w-9 h-9 rounded-full bg-white/10 text-white hover:bg-[#F069B4] hover:text-white transition-all duration-200"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-[#F069B4] mb-5">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  {link.href ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block py-1.5 text-white/70 text-sm hover:text-[#F069B4] transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      to={link.to}
                      className="inline-block py-1.5 text-white/70 text-sm hover:text-[#F069B4] transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Admission */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-[#F069B4] mb-5">
              Admission
            </h3>
            <ul className="space-y-3">
              {admissionLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="inline-block py-1.5 text-white/70 text-sm hover:text-[#F069B4] transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-[#F069B4] mb-5">
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=33%20Ada%20George%20Road%2C%20Agip%2C%20Port%20Harcourt%2C%20Nigeria"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-white/70 text-sm hover:text-[#F069B4] transition-colors"
                >
                  <MapPin size={16} className="text-[#F069B4] flex-shrink-0 mt-0.5" />
                  33 Ada George Road, Agip, Port Harcourt, Nigeria
                </a>
              </li>
              <li className="space-y-2">
                {["+234 7066574117", "+234 8032750680", "+234 7070879787"].map((tel) => (
                  <a
                    key={tel}
                    href={`tel:${tel.replace(/\s/g, "")}`}
                    className="flex items-center gap-3 text-white/70 text-sm hover:text-[#F069B4] transition-colors"
                  >
                    <Phone size={14} className="text-[#F069B4] flex-shrink-0" />
                    {tel}
                  </a>
                ))}
              </li>
              <li>
                <a
                  href="mailto:surefoundationgroupofschool@gmail.com"
                  className="flex items-start gap-3 text-white/70 text-sm hover:text-[#F069B4] transition-colors break-all"
                >
                  <Mail size={14} className="text-[#F069B4] flex-shrink-0 mt-0.5" />
                  surefoundationgroupofschool@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-center">
          <p className="text-white/50 text-xs">
            &copy; {currentYear} Sure Foundation Group of Schools. All Rights Reserved.
          </p>
          <p className="text-white/30 text-xs">
            Shaping futures in Port Harcourt, Nigeria.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
