import AnimateOnScroll from "./AnimateOnScroll";
import { Terminal } from "lucide-react";

export default function PainPoints() {
  return (
    <section 
      id="problem-agitation" 
      className="w-full py-24 bg-brand-dark border-y border-white/5 flex justify-center items-center overflow-hidden select-none relative"
    >
      {/* Background grid representation */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full opacity-10 blur-3xl bg-brand-purple pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 text-center relative z-10 w-full">
        <AnimateOnScroll delayMs={100}>
          <div className="relative bg-gradient-to-br from-[#0c0c0e] to-[#121215] border border-white/5 rounded-3xl p-8 sm:p-14 shadow-[0_0_50px_rgba(177,88,238,0.03)] overflow-hidden text-right max-w-3xl mx-auto group">
            
            {/* Background glowing line effects */}
            <div className="absolute -inset-[1px] bg-gradient-to-r from-brand-purple/20 via-brand-blue/20 to-brand-purple/20 rounded-3xl -z-10 opacity-60 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            {/* Soft background radial gradients */}
            <div className="absolute -top-12 -left-12 w-48 h-48 bg-brand-blue/5 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-brand-purple/5 rounded-full blur-2xl pointer-events-none" />
            
            {/* Terminal Chrome Bar Decorator */}
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/5 relative z-10">
              <div className="flex items-center gap-2" style={{ direction: "ltr" }}>
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/30 border border-red-500/20" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/30 border border-yellow-500/20" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/30 border border-green-500/20" />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-brand-purple bg-brand-purple/10 border border-brand-purple/20 px-2.5 py-1 rounded-md uppercase font-mono">
                  🚨 ADHD MODE ACTIVE
                </span>
              </div>
            </div>

            {/* Pain Point Quote statement */}
            <div className="relative z-10 my-6">
              <span className="absolute -top-8 -right-6 text-7xl text-brand-purple/15 font-serif select-none pointer-events-none">«</span>
              
              <p className="relative text-lg sm:text-[22px] md:text-[23px] font-black text-neutral-105 leading-normal sm:leading-relaxed font-sans pr-4 pr-3">
                پیدا کردن اون باگِ لعنتی سخت نیست... عذاب‌آور اونجاست که وسطِ یه تمرکز عمیق، مجبور شی <span className="text-brand-blue bg-brand-blue/10 border border-brand-blue/20 px-2.5 py-0.5 rounded-lg font-mono font-medium tracking-wide inline-block" style={{ direction: "ltr" }}>Alt+Tab</span> کنی تو جیرا تا یه تسکِ ساده بسازی و کلاً یادت بره داشتی چیکار میکردی!
              </p>

              <span className="absolute -bottom-14 -left-4 text-7xl text-brand-blue/10 font-serif select-none pointer-events-none">»</span>
            </div>

            {/* Simulated Debug details */}
            <div className="mt-10 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] text-neutral-400 font-mono relative z-10">
              <div className="flex items-center gap-1.5 text-brand-purple">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-purple animate-pulse"></span>
                <span>STATE: COGNITIVE_OVERLOAD</span>
              </div>
              <div>
                CONTEXT_SWITCH_COST = <span className="text-red-400 font-bold">100%</span>
              </div>
            </div>

          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
