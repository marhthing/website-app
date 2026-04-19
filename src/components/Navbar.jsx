import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { ASSETS } from "../constants/assets";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsDropdownOpen(false);
  }, [location]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { label: "Home", to: "/" },
    { label: "About", to: "/about" },
    { label: "Admission", to: "/admission" },
    { label: "Calendar", to: "/calender" },
    { label: "Contact", to: "/contact" },
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? "shadow-lg" : ""} bg-[#4a0f3f]`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">

            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 flex-shrink-0 min-h-[44px]">
              <img
                src={ASSETS.logo}
                alt="Sure Foundation"
                className="h-9 w-9 sm:h-10 sm:w-10 object-contain"
              />
              <div className="hidden sm:block">
                <span className="block text-white font-bold text-sm leading-tight">Sure Foundation</span>
                <span className="block text-[#F069B4] text-xs">Group of Schools</span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <ul className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                      location.pathname === link.to
                        ? "text-white bg-white/10"
                        : "text-[#F069B4] hover:text-white hover:bg-white/10"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}

              {/* Schools Dropdown */}
              <li
                className="relative"
                onMouseEnter={() => setIsDropdownOpen(true)}
                onMouseLeave={() => setIsDropdownOpen(false)}
              >
                <button className="flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium text-[#F069B4] hover:text-white hover:bg-white/10 transition-colors duration-200">
                  Schools
                  <ChevronDown size={13} className={`transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`} />
                </button>
                <div className={`absolute top-full left-0 mt-1 w-48 bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden transition-all duration-200 ${isDropdownOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-1"}`}>
                  <Link to="/primary-nursery" className="block px-4 py-3 text-sm text-[#4a0f3f] font-medium hover:bg-[#4a0f3f] hover:text-white transition-colors duration-200 border-b border-gray-100">
                    Primary / Nursery
                  </Link>
                  <Link to="/secondary" className="block px-4 py-3 text-sm text-[#4a0f3f] font-medium hover:bg-[#4a0f3f] hover:text-white transition-colors duration-200">
                    Secondary
                  </Link>
                </div>
              </li>

              <li className="ml-2">
                <a
                  href="https://portal.sfgs.com.ng/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-5 py-2 bg-[#F069B4] text-white text-sm font-semibold rounded-md hover:bg-white hover:text-[#4a0f3f] transition-all duration-200"
                >
                  Student Portal
                </a>
              </li>
            </ul>

            {/* Hamburger */}
            <button
              type="button"
              className="md:hidden flex items-center justify-center w-11 h-11 text-[#F069B4] rounded-md hover:bg-white/10 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* ── Mobile Drawer ── */}
      {/* Backdrop */}
      <div
        onClick={() => setIsMobileMenuOpen(false)}
        className={`fixed inset-0 z-40 bg-black/60 md:hidden transition-opacity duration-300 ${isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      />

      {/* Drawer panel */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-[280px] bg-[#4a0f3f] shadow-2xl md:hidden flex flex-col transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 h-16">
          <div className="flex items-center gap-2.5">
            <img src={ASSETS.logo} alt="Logo" className="h-8 w-8 object-contain" />
            <div>
              <span className="block text-white font-bold text-xs leading-tight">Sure Foundation</span>
              <span className="block text-[#F069B4] text-[10px]">Group of Schools</span>
            </div>
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center justify-center w-10 h-10 text-[#F069B4] hover:text-white hover:bg-white/10 rounded-md transition-colors"
            aria-label="Close menu"
          >
            <X size={22} />
          </button>
        </div>

        {/* Drawer Links — scrollable if needed */}
        <nav className="flex-1 overflow-y-auto px-4 py-4">
          <ul className="space-y-1">
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className={`flex items-center px-4 py-3.5 rounded-md text-sm font-medium transition-colors min-h-[48px] ${
                    location.pathname === link.to
                      ? "bg-white/15 text-white"
                      : "text-[#F069B4] hover:text-white hover:bg-white/10"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}

            {/* Schools Accordion */}
            <li>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center justify-between w-full px-4 py-3.5 rounded-md text-sm font-medium text-[#F069B4] hover:text-white hover:bg-white/10 transition-colors min-h-[48px]"
              >
                Schools
                <ChevronDown size={15} className={`transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`} />
              </button>
              {isDropdownOpen && (
                <ul className="ml-4 mt-1 border-l border-white/15 pl-3 space-y-1">
                  <li>
                    <Link
                      to="/primary-nursery"
                      className="flex items-center px-3 py-3 rounded-md text-sm text-[#F069B4]/80 hover:text-white hover:bg-white/10 transition-colors min-h-[44px]"
                    >
                      Primary / Nursery
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/secondary"
                      className="flex items-center px-3 py-3 rounded-md text-sm text-[#F069B4]/80 hover:text-white hover:bg-white/10 transition-colors min-h-[44px]"
                    >
                      Secondary
                    </Link>
                  </li>
                </ul>
              )}
            </li>
          </ul>
        </nav>

        {/* Portal CTA pinned at bottom */}
        <div className="px-4 py-5 border-t border-white/10">
          <a
            href="https://portal.sfgs.com.ng/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-full py-3.5 bg-[#F069B4] text-white text-sm font-semibold rounded-md hover:bg-white hover:text-[#4a0f3f] transition-all duration-200 min-h-[52px]"
          >
            Student Portal
          </a>
        </div>
      </div>
    </>
  );
};

export default Navbar;
