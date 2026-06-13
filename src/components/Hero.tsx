import { useState, useEffect } from "react";
import { Sparkles, Brain, Loader2, Check, Mic, Terminal, Database, Code } from "lucide-react";
import AnimateOnScroll from "./AnimateOnScroll";

export default function Hero() {
  const [animStep, setAnimStep] = useState<"emit" | "absorb" | "process" | "result">("emit");

  // Cinematic interactive storytelling state loop for developers
  useEffect(() => {
    const timer1 = setTimeout(() => setAnimStep("absorb"), 3500);
    const timer2 = setTimeout(() => setAnimStep("process"), 6000);
    const timer3 = setTimeout(() => setAnimStep("result"), 9000);

    const interval = setInterval(() => {
      setAnimStep("emit");
      setTimeout(() => setAnimStep("absorb"), 3500);
      setTimeout(() => setAnimStep("process"), 6000);
      setTimeout(() => setAnimStep("result"), 9000);
    }, 13000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearInterval(interval);
    };
  }, []);

  return (
    <section id="hero" className="relative min-h-[85vh] flex flex-col md:flex-row items-center gap-12 px-4 md:px-12 py-16 md:py-24 overflow-hidden bg-brand-dark">
      {/* DevTools DNA Glowing background with strong blur effects */}
      <div className="absolute top-1/4 -right-12 w-96 h-96 rounded-full opacity-20 blur-3xl bg-brand-purple pointer-events-none animate-pulse-glow"></div>
      <div className="absolute bottom-1/4 -left-12 w-96 h-96 rounded-full opacity-25 blur-3xl bg-brand-blue pointer-events-none animate-pulse-glow" style={{ animationDelay: "2s" }}></div>

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Typography (Right Side) */}
        <div className="lg:col-span-7 flex flex-col items-start text-right select-none">
          
          {/* Badge */}
          <AnimateOnScroll delayMs={100} className="mb-6">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold border border-brand-blue/20 bg-brand-blue/10 text-brand-blue tracking-wide">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-blue animate-ping"></span>
              <span>اولین مغز دومِ هوشمند برای برنامه‌نویس‌ها</span>
            </span>
          </AnimateOnScroll>

          {/* Heading (H1) */}
          <AnimateOnScroll delayMs={200} className="mb-6">
            <h1 className="text-3xl sm:text-4xl md:text-4xl lg:text-[40px] font-black text-white leading-[1.3] tracking-tight">
              تب‌های ذهنت رو ببند؛
              <span className="block mt-4 bg-gradient-to-l from-brand-blue via-indigo-300 to-brand-purple bg-clip-text text-transparent pb-1 font-black">
                هِکسِر همه چیزو هندل میکنه
              </span>
              <span className="block mt-3 text-sm md:text-base font-normal text-neutral-500 font-sans">
                یه مغز بکاپ همیشه تو جیبته
              </span>
            </h1>
          </AnimateOnScroll>

          {/* Subtitle (H2) */}
          <AnimateOnScroll delayMs={300} className="mb-8">
            <p className="text-sm sm:text-base text-neutral-400 leading-relaxed max-w-2xl font-sans">
              این ابزار رو یکی مثل خودت که مشکل زیادی با دونه دونه وارد کردن تسک توی تسک منیجر ها داشته، به وجود آورده. ویس بده، اسکرین شات از چت یا عکس از دفترچت بده خودش تسک و نوت ازش برمیداره. با کلی امکانات دیگه...
            </p>
          </AnimateOnScroll>

        </div>

        {/* Product / Simulation Column (Left Side) */}
        {/* On mobile, placed after main typography / CTA */}
        <div className="lg:col-span-5 w-full flex flex-col items-center justify-center min-h-[440px]">
          <AnimateOnScroll delayMs={300} className="w-full max-w-md">
            <div className="relative bg-[#0a0a0a]/90 border border-white/5 rounded-3xl p-6 shadow-2xl backdrop-blur-xl overflow-hidden ring-1 ring-white/5 flex flex-col items-center">
              
              {/* Neon border line on top */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-brand-blue via-indigo-505 to-brand-purple"></div>

              {/* Cognitive Node Terminal Header */}
              <div className="relative flex flex-col items-center mb-6 w-full">
                <div className="relative p-4 rounded-full bg-[#111]/80 border border-white/5 animate-pulse-glow z-10">
                  <Brain className={`w-12 h-12 transition-all duration-700 ${
                    animStep === "emit" ? "text-brand-blue scale-110" : 
                    animStep === "absorb" ? "text-brand-purple scale-95" : "text-neutral-600 scale-100"
                  }`} />
                  <span className="absolute inset-0 rounded-full border border-brand-blue/10 animate-ping pointer-events-none"></span>
                </div>
                
                <div className="absolute top-8 left-12 w-2 h-2 rounded-full bg-brand-purple/80 animate-ping"></div>
                <div className="absolute top-4 right-16 w-1.5 h-1.5 rounded-full bg-brand-blue/80 animate-ping" style={{ animationDelay: "1s" }}></div>
                <div className="text-[10px] text-neutral-500 tracking-wider font-mono uppercase mt-3 flex items-center gap-1">
                  <Terminal className="w-3.5 h-3.5 text-brand-blue" />
                  <span>HEXER_IDE_SYNAPSE_v1.0</span>
                </div>
              </div>

              {/* Simulation Visuals */}
              <div className="relative w-full h-[180px] overflow-hidden flex flex-col items-center justify-start py-2">
                
                {/* Voice note input thought bubble */}
                <div
                  className={`absolute z-20 px-4 py-3 rounded-2xl bg-[#111] border border-white/10 shadow-xl text-xs text-white leading-relaxed flex items-center gap-2.5 transition-all duration-[1200ms] cubic-bezier(0.16, 1, 0.3, 1) left-1/2 -translate-x-1/2 w-[95%] sm:w-auto sm:whitespace-nowrap ${
                    animStep === "emit" ? "opacity-100 translate-y-1 -translate-x-1/2 scale-100" :
                    animStep === "absorb" ? "opacity-0 translate-y-28 -translate-x-1/2 scale-50 filter blur-md" : "opacity-0 scale-70 -translate-x-1/2 pointer-events-none translate-y-0"
                  }`}
                >
                  <span className="p-1 rounded-lg bg-brand-blue/10 text-brand-blue shrink-0">
                    <Mic className="w-4 h-4 text-brand-blue animate-pulse" />
                  </span>
                  <span className="font-bold flex-1 text-right font-sans">«یه باگ تو کش ردیس داریم، متد گت اِرور میده، تسکش کن تا یادم نرفته»</span>
                </div>

                <div
                  className={`absolute z-10 px-4 py-3 rounded-2xl bg-[#111] border border-white/10 shadow-xl text-xs text-white leading-relaxed flex items-center gap-2.5 transition-all duration-[1200ms] cubic-bezier(0.16, 1, 0.3, 1) left-1/2 -translate-x-1/2 w-[95%] sm:w-auto sm:whitespace-nowrap ${
                    animStep === "emit" ? "opacity-100 translate-y-16 -translate-x-1/2 scale-100" :
                    animStep === "absorb" ? "opacity-0 translate-y-28 -translate-x-1/2 scale-50 filter blur-md" : "opacity-0 scale-70 -translate-x-1/2 pointer-events-none translate-y-0"
                  }`}
                  style={{ transitionDelay: "150ms" }}
                >
                  <span className="p-1 rounded-lg bg-brand-purple/10 text-brand-purple shrink-0">
                    <Code className="w-4 h-4 text-brand-purple" />
                  </span>
                  <span className="flex-1 text-right font-sans">«سورس داک کش گیتوی رو بروزرسانی کن»</span>
                </div>

                {/* Symmetrical swirling background whirlpool during absorb */}
                <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full border border-brand-purple/10 border-dashed animate-spin-slow transition-opacity duration-700 ${
                  animStep === "absorb" ? "opacity-100" : "opacity-0"
                }`}></div>
              </div>

              {/* Dynamic Chamber representation for parsing thoughts */}
              <div className="relative w-full bg-zinc-950/55 border border-white/5 rounded-2xl p-4 min-h-[190px] flex flex-col justify-between overflow-hidden">
                
                {/* Upper hatch styling */}
                <div className={`absolute -top-1 left-1/2 -translate-x-1/2 h-1.5 rounded-b-xl bg-gradient-to-r from-brand-blue via-indigo-500 to-brand-purple shadow-lg transition-all duration-700 w-24 ${
                  animStep === "absorb" ? "translate-y-[2px] scale-110 shadow-brand-purple/50" : ""
                }`}></div>

                {/* Scanline Sweep */}
                {animStep === "process" && (
                  <div className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-brand-blue to-transparent shadow-[0_0_12px_#3592ea] animate-pulse z-30" style={{ top: "45%" }} />
                )}

                {/* Chamber States Rendering */}
                {animStep === "process" && (
                  <div className="flex-1 flex flex-col items-center justify-center p-4 text-center select-none z-10">
                    <Loader2 className="w-8 h-8 text-brand-blue animate-spin mb-3" />
                    <div className="text-xs text-brand-blue font-bold mb-1 font-sans">در حال مدل‌سازی کانتکست و استخراج تسک...</div>
                    <div className="text-[10px] text-neutral-500 font-mono">PARSING_VOICE_NLP_GRAMMAR // AST_GENERATION</div>
                  </div>
                )}

                {(animStep === "emit" || animStep === "absorb") && (
                  <div className="flex-1 flex flex-col items-center justify-center text-center p-4 z-10 opacity-70">
                    <div className="w-10 h-10 rounded-full bg-[#111] flex items-center justify-center border border-white/5 text-neutral-550 mb-2">
                      🎙️
                    </div>
                    <div className="text-xs text-neutral-300 font-black font-sans">دستیار صوتی و ساختاردهی کدهای هکسر</div>
                    <div className="text-[10px] text-neutral-500 mt-1 font-sans">آماده دریافت فرمان‌های صوتی و ایده‌های فنی شما</div>
                  </div>
                )}

                {animStep === "result" && (
                  <div className="flex-1 flex flex-col justify-center space-y-2.5 z-10 text-right">
                    
                    {/* Organized Task Result 1 */}
                    <div className="p-2.5 rounded-xl bg-emerald-500/5 border border-emerald-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 text-right">
                      <div className="flex items-center gap-2">
                        <span className="p-1 rounded-lg bg-emerald-500/15 text-emerald-400">
                          <Check className="w-3.5 h-3.5" />
                        </span>
                        <span className="text-[11px] font-bold text-neutral-200 font-sans">بررسی اِرور متد گت در حافظه کَش ردیس</span>
                      </div>
                      <span className="bg-emerald-500/10 text-emerald-400 text-[9px] px-1.5 py-0.5 rounded-md font-bold self-start sm:self-auto font-mono">⚡ HIGH_PRIORITY</span>
                    </div>

                    {/* Organized Task Result 2 */}
                    <div className="p-2.5 rounded-xl bg-brand-blue/5 border border-brand-blue/25 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 text-right">
                      <div className="flex items-center gap-2">
                        <span className="p-1 rounded-lg bg-brand-blue/15 text-brand-blue">
                          <Database className="w-3.5 h-3.5" />
                        </span>
                        <span className="text-[11px] font-bold text-neutral-200 font-sans">آپدیت داک پروژه (docs/gateway-cache)</span>
                      </div>
                      <span className="bg-brand-blue/10 text-brand-blue text-[9px] px-1.5 py-0.5 rounded-md font-bold self-start sm:self-auto font-mono">🏷️ BACKEND</span>
                    </div>

                  </div>
                )}

                {/* Digital telemetry stats line */}
                <div className="border-t border-white/5 pt-2.5 flex items-center justify-between text-[10px] text-neutral-500 font-mono">
                  <div className="flex items-center gap-1.5">
                    <span className={`w-1.5 h-1.5 rounded-full ${
                      animStep === "emit" ? "bg-amber-400" :
                      animStep === "absorb" ? "bg-brand-purple animate-ping" : 
                      animStep === "process" ? "bg-brand-blue animate-spin" : "bg-emerald-400"
                    }`} />
                    <span>
                      {animStep === "emit" ? "STANDBY" :
                       animStep === "absorb" ? "RECORDING" :
                       animStep === "process" ? "PARSING" : "STRUCTURED_OK"}
                    </span>
                  </div>
                  <div className="font-sans text-[10px]">
                    {animStep === "emit" ? "در حال مانیتور فرکانس صدا..." :
                     animStep === "absorb" ? "دریافت کدهای مکتوب شده صوتی..." :
                     animStep === "process" ? "تطبیق اصطلاحات فنی فارسی..." : "داکیومنت و تسک‌ها مکتوب شدند 🎉"}
                  </div>
                </div>

              </div>

            </div>
          </AnimateOnScroll>
        </div>

      </div>
    </section>
  );
}
