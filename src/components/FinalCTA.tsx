import AnimateOnScroll from "./AnimateOnScroll";
import { Sparkles } from "lucide-react";

export default function FinalCTA() {
  return (
    <section 
      id="final-cta" 
      className="relative py-32 px-4 bg-black text-center w-full select-none"
    >
      <div className="max-w-4xl mx-auto">
        {/* Title */}
        <AnimateOnScroll delayMs={100} className="mb-8">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
            ایدههاتو تو بکلاگِ ذهنت تلنبار نکن.
          </h2>
        </AnimateOnScroll>

        {/* Button Repeating Hero Action with premium cyber style */}
        <AnimateOnScroll delayMs={200} className="mt-8 flex justify-center">
          <a
            href="https://my.hexerapp.ir"
            className="group relative inline-flex items-center justify-center font-extrabold text-base text-white px-8 py-4.5 rounded-xl transition-all duration-300 bg-zinc-950 border border-white/10 hover:border-brand-blue/30 overflow-hidden hover:shadow-[0_0_30px_rgba(53,146,234,0.18)] select-none cursor-pointer w-full sm:w-auto"
          >
            {/* Cool subtle glow fill in hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-brand-blue/10 to-brand-purple/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            {/* Cyber neon line indicator */}
            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-l from-brand-blue via-indigo-400 to-brand-purple"></div>
            
            <div className="relative flex items-center justify-center gap-2.5">
              <Sparkles className="w-4 h-4 text-brand-blue animate-pulse group-hover:rotate-12 transition-transform duration-300" />
              <span className="tracking-wide">۳ روز رایگان تست کن</span>
              <span className="text-brand-purple opacity-70 group-hover:translate-x-[-2px] transition-transform duration-300">←</span>
            </div>
          </a>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
