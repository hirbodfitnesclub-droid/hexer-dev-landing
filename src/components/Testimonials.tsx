import { useState, useRef } from "react";
import AnimateOnScroll from "./AnimateOnScroll";
import { Star, ChevronRight, ChevronLeft } from "lucide-react";

export default function Testimonials() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const reviews = [
    {
      name: "امیرحسین رضایی",
      role: "توسعه‌دهنده ارشد بک‌اند",
      avatarChar: "ا",
      avatarGradient: "from-brand-blue to-indigo-500",
      text: "سرچ سمنتیکش یه جوریه که انگار یکی نشسته بغلدستم و کانتکست پروژهمو میدونه. دیگه دغدغهی گمکردن ایدههای ناگهانی رو ندارم.",
    },
    {
      name: "سارا احمدی",
      role: "معمار سیستم و نرم‌افزار",
      avatarChar: "س",
      avatarGradient: "from-brand-purple to-pink-500",
      text: "واسه منی که همیشه وسط معماری سیستم ایدههای بیربط میزنه به سرم، هکسر یه نجاتدهندهست. ویس میدم، تسک میشه، برمیگردم تو VSCode.",
    },
  ];

  const scrollToSlide = (index: number) => {
    if (!containerRef.current) return;
    const children = containerRef.current.children;
    if (children && children[index]) {
      children[index].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
      setCurrentSlide(index);
    }
  };

  const handleScroll = () => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const children = Array.from(container.children) as HTMLElement[];
    const containerCenter = container.getBoundingClientRect().left + container.clientWidth / 2;
    
    let closestIdx = 0;
    let minDistance = Infinity;
    children.forEach((child, idx) => {
      const rect = child.getBoundingClientRect();
      const childCenter = rect.left + rect.width / 2;
      const distance = Math.abs(childCenter - containerCenter);
      if (distance < minDistance) {
        minDistance = distance;
        closestIdx = idx;
      }
    });
    
    setCurrentSlide(closestIdx);
  };

  const slideNext = () => {
    const nextIdx = Math.min(currentSlide + 1, reviews.length - 1);
    scrollToSlide(nextIdx);
  };

  const slidePrev = () => {
    const prevIdx = Math.max(currentSlide - 1, 0);
    scrollToSlide(prevIdx);
  };

  return (
    <section id="testimonials" className="relative py-24 bg-brand-dark overflow-hidden">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-brand-purple/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 select-none">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <AnimateOnScroll delayMs={100}>
            <span className="text-xs font-bold text-brand-purple tracking-wider uppercase border border-brand-purple/20 px-3.5 py-1 rounded-full bg-brand-purple/5">
              تجربه‌ی توسعه‌دهندگانی که از هکسر استفاده می‌کنند 💻
            </span>
          </AnimateOnScroll>
          <AnimateOnScroll delayMs={200}>
            <h2 className="text-3xl sm:text-4xl font-black text-white mt-4 tracking-tight">
              تجربه‌ی اونهایی که «مغز دوم» دارن
            </h2>
          </AnimateOnScroll>
        </div>

        {/* Testimonials (Flexible swipe scroll on mobile, side-by-side grid on desktop) */}
        <div className="relative">
          <div 
            ref={containerRef}
            onScroll={handleScroll}
            className="flex md:grid md:grid-cols-2 max-w-5xl mx-auto gap-6 overflow-x-auto md:overflow-x-visible snap-x snap-mandatory flex-nowrap md:flex-wrap pb-[12px] md:pb-0 scrollbar-none px-2"
          >
            {reviews.map((item, idx) => (
              <div 
                key={idx} 
                className="shrink-0 w-[85vw] md:w-auto snap-center md:snap-align-none"
              >
                <AnimateOnScroll delayMs={idx * 150} className="h-full">
                  <div className="h-full bg-[#111]/40 rounded-2xl p-6.5 sm:p-8 border border-white/5 hover:border-white/10 transition-all duration-300 flex flex-col justify-between text-right relative overflow-hidden group">
                    
                    <div>
                      {/* Star ratings */}
                      <div className="flex items-center gap-1 mb-5">
                        {[...Array(5)].map((_, sIdx) => (
                          <Star key={sIdx} className="w-4 h-4 text-amber-400 fill-amber-400" />
                        ))}
                      </div>

                      {/* Testimonial Quote */}
                      <p className="text-base sm:text-lg text-neutral-250 leading-relaxed font-sans mb-6">
                        "{item.text}"
                      </p>
                    </div>

                    {/* Profile info footer */}
                    <div className="flex items-center gap-3.5 border-t border-white/5 pt-5">
                      <div className={`w-11 h-11 rounded-full bg-gradient-to-tr ${item.avatarGradient} flex items-center justify-center font-bold text-white text-base shadow-lg shrink-0 select-none`}>
                        {item.avatarChar}
                      </div>
                      <div>
                        <h4 className="text-sm font-black text-white">{item.name}</h4>
                        <span className="text-xs text-neutral-500 font-sans mt-0.5 block">{item.role}</span>
                      </div>
                    </div>

                  </div>
                </AnimateOnScroll>
              </div>
            ))}
          </div>

          {/* Mobile Interactive Slider Control Panel */}
          <div className="md:hidden flex flex-col items-center gap-4 mt-6">
            {/* Indicators dots */}
            <div className="flex items-center gap-2">
              {reviews.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => scrollToSlide(idx)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    currentSlide === idx ? "w-5 bg-brand-blue" : "bg-white/10"
                  }`}
                  aria-label={`Slide ${idx + 1}`}
                />
              ))}
            </div>

            {/* Navigation Controls */}
            <div className="flex items-center justify-between w-full max-w-[280px] bg-[#111]/60 border border-white/5 rounded-xl px-4 py-2 font-sans text-xs text-neutral-400">
              <button 
                onClick={slidePrev}
                disabled={currentSlide === 0}
                className="p-1.5 rounded-lg hover:bg-white/5 disabled:opacity-30 disabled:hover:bg-transparent text-white transition-all transform active:scale-90"
                aria-label="Previous slide"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
              
              <span className="font-bold">
                بازخورد {currentSlide + 1} از {reviews.length}
              </span>

              <button 
                onClick={slideNext}
                disabled={currentSlide === reviews.length - 1}
                className="p-1.5 rounded-lg hover:bg-white/5 disabled:opacity-30 disabled:hover:bg-transparent text-white transition-all transform active:scale-90"
                aria-label="Next slide"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
