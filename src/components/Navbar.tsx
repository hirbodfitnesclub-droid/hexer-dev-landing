import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { label: "امکانات", href: "#features" },
    { label: "تعرفه‌ها", href: "#pricing" },
    { label: "سوالات متداول", href: "#faq" },
  ];

  return (
    <nav
      id="navbar"
      className={`sticky top-0 z-40 w-full flex items-center justify-between px-6 py-4 transition-all duration-300 ${
        scrolled
          ? "bg-[#0a0a0a]/90 backdrop-blur-lg border-b border-white/10 shadow-lg"
          : "bg-[#0a0a0a]/70 backdrop-blur-lg border-b border-white/5"
      }`}
    >
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
        {/* Right side: Logo & Brand */}
        <div className="flex items-center gap-2.5">
          <img 
            src="/icon-192.png" 
            alt="هکسر" 
            className="w-10 h-10 rounded-xl object-contain shadow-md border border-white/5 active:scale-95 transition-transform"
            referrerPolicy="no-referrer"
          />
          <span className="text-xl font-black text-white">
            هکسر
          </span>
        </div>

        {/* Center: Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          {menuItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-neutral-450 hover:text-white transition-colors"
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Left side: Secondary Action Button */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="https://my.hexerapp.ir"
            className="border border-white/10 px-4 py-2 rounded-lg text-sm text-neutral-200 hover:bg-white/5 transition-all text-center font-medium"
          >
            ورود به اپلیکیشن
          </a>
        </div>

        {/* Mobile Hamburger menu */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-neutral-400 hover:text-white p-2 rounded-lg transition-colors focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer (Only shown when open) */}
      <div
        className={`md:hidden absolute top-full left-0 right-0 bg-[#0a0a0a]/95 border-b border-white/5 backdrop-blur-xl transition-all duration-300 ease-in-out ${
          mobileMenuOpen ? "opacity-100 max-h-[300px] visible" : "opacity-0 max-h-0 invisible overflow-hidden pointer-events-none"
        }`}
      >
        <div className="px-6 py-6 flex flex-col gap-4">
          {menuItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-neutral-300 hover:text-white py-2 text-sm font-medium border-b border-white/5 block"
            >
              {item.label}
            </a>
          ))}
          <a
            href="https://my.hexerapp.ir"
            onClick={() => setMobileMenuOpen(false)}
            className="w-full text-center py-2.5 px-4 border border-white/10 rounded-lg text-sm text-white font-medium hover:bg-white/5 block bg-brand-blue/5"
          >
            ورود به اپلیکیشن
          </a>
        </div>
      </div>
    </nav>
  );
}
