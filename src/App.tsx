import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import PainPoints from "./components/PainPoints";
import HowItWorks from "./components/HowItWorks";
import Pricing from "./components/Pricing";
import Testimonials from "./components/Testimonials";
import FAQ from "./components/FAQ";
import FinalCTA from "./components/FinalCTA";
import Footer from "./components/Footer";
import { initUniversalTracker } from "./utils/universalTracker";
import { Sparkles } from "lucide-react";

export default function App() {
  useEffect(() => {
    const cleanup = initUniversalTracker();
    return () => {
      if (cleanup) cleanup();
    };
  }, []);

  return (
    <div dir="rtl" className="bg-brand-dark text-neutral-50 min-h-screen font-sans selection:bg-brand-blue/30 selection:text-neutral-100 relative">
      {/* Structural Header Navigation */}
      <Navbar />

      {/* Main Structural Layout Content */}
      <main className="relative">
        <Hero />
        
        <PainPoints />
        
        <HowItWorks />
        
        <Pricing />
        
        <Testimonials />
        
        <FAQ />
        
        <FinalCTA />
      </main>

      {/* Structured Site Map Footer */}
      <Footer />

      {/* Sticky Floating CTA for Mobile Screens */}
      <div className="fixed bottom-4 inset-x-4 z-50 md:hidden">
        <a
          href="https://my.hexerapp.ir"
          className="group relative flex items-center justify-center font-extrabold text-[#fff] px-6 py-4 rounded-xl transition-all duration-300 bg-[#0c0c0e] border border-white/10 overflow-hidden shadow-[0_4px_30px_rgba(53,146,234,0.25)] select-none cursor-pointer w-full"
        >
          {/* Subtle glow fill */}
          <div className="absolute inset-0 bg-gradient-to-r from-brand-blue/10 to-brand-purple/10"></div>
          {/* Cyber neon line indicator */}
          <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-gradient-to-l from-brand-blue via-indigo-400 to-brand-purple"></div>
          
          <div className="relative flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4 text-brand-blue animate-pulse" />
            <span className="tracking-wide text-sm">۳ روز اکانت پرو رایگان</span>
            <span className="text-brand-purple opacity-90">←</span>
          </div>
        </a>
      </div>
    </div>
  );
}
