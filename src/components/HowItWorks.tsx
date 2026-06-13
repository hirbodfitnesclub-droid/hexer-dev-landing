import { useState, useRef } from "react";
import { Mic, BrainCircuit, BookCopy, Network, ChevronRight, ChevronLeft } from "lucide-react";
import AnimateOnScroll from "./AnimateOnScroll";

export default function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const cards = [
    {
      id: "voice-to-task",
      title: "تسکسازی با فکزدن، نه تایپکردن!",
      description: "بگو باگ کجاست یا فیچر چیه؛ هکسر خودش تایتل, دیسکریپشن و تگها رو توی پروژهت میسازه. دست به کیبورد نزن.",
      icon: <Mic className="w-6 h-6 text-brand-blue" />,
      iconBg: "bg-brand-blue/10 border-brand-blue/20",
      spanClass: "md:col-span-2",
      badge: "تبدیل ویس به تسک",
    },
    {
      id: "semantic-search",
      title: "سرچ سمنتیک؛ با مفهوم بگرد.",
      description: "اسمِ متغیر یادت رفته؟ فقط بگو \"همون کدی که واسه کشِ سرور زدم\". هکسر منظور تو رو میفهمه و مستقیم همون یادداشت رو میاره.",
      icon: <BrainCircuit className="w-6 h-6 text-brand-purple" />,
      iconBg: "bg-brand-purple/10 border-brand-purple/20",
      spanClass: "md:col-span-1",
      badge: "سرچ سمنتیک",
    },
    {
      id: "auto-documentation",
      title: "دیلی (Daily) دادن، بدونِ عذاب.",
      description: "تو فقط بلندبلند فکر کن. هکسر ویسهای روزانهت رو تبدیل میکنه به داکیومنت، خلاصهی روز و تسکهای قابلِ پیگیری برای تیم.",
      icon: <BookCopy className="w-6 h-6 text-indigo-400" />,
      iconBg: "bg-indigo-500/10 border-indigo-500/20",
      spanClass: "md:col-span-1",
      badge: "داکیومنت‌سازی خودکار",
    },
    {
      id: "network-brain",
      title: "گراف دانش؛ همهچی به هم وصله.",
      description: "یه شبکه عصبی از تسکها و پروژههات. کانتکست (Context) پروژه رو گم نمیکنی، حتی اگه یه ماه سمت کدهات نرفته باشی.",
      icon: <Network className="w-6 h-6 text-pink-400" />,
      iconBg: "bg-pink-500/10 border-pink-500/20",
      spanClass: "md:col-span-2",
      badge: "مغز دوم متصل",
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
    const nextIdx = Math.min(currentSlide + 1, cards.length - 1);
    scrollToSlide(nextIdx);
  };

  const slidePrev = () => {
    const prevIdx = Math.max(currentSlide - 1, 0);
    scrollToSlide(prevIdx);
  };

  return (
    <section id="features" className="py-24 px-4 md:px-12 max-w-7xl mx-auto select-none overflow-hidden">
      
      {/* Title block */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <AnimateOnScroll delayMs={100}>
          <span className="text-xs font-bold text-brand-blue tracking-wider uppercase border border-brand-blue/20 px-3.5 py-1 rounded-full bg-brand-blue/5">
            امکاناتِ مجهز به AI برای برنامه‌نویس‌ها 🧠
          </span>
        </AnimateOnScroll>
        <AnimateOnScroll delayMs={200}>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 tracking-tight">
            ویژگی‌های منحصربه‌فردِ دستیار هوشمند شما
          </h2>
        </AnimateOnScroll>
      </div>

      {/* Bento Grid layout with responsive horizontal scroll on mobile */}
      <div className="relative">
        <div 
          ref={containerRef}
          onScroll={handleScroll}
          className="flex md:grid md:grid-cols-3 gap-6 overflow-x-auto md:overflow-x-visible snap-x snap-mandatory flex-nowrap md:flex-wrap pb-4 md:pb-0 scrollbar-none px-2"
        >
          {cards.map((card, idx) => (
            <div 
              key={card.id}
              className={`shrink-0 w-[85vw] md:w-auto snap-center md:snap-align-none ${card.spanClass}`}
            >
              <AnimateOnScroll delayMs={idx * 100} className="h-full">
                <div className="h-full bg-[#111]/40 border border-white/5 backdrop-blur-md rounded-2xl p-6 sm:p-8 flex flex-col justify-between hover:border-brand-blue/20 hover:bg-[#111]/65 transition-all duration-300 relative overflow-hidden group">
                  {/* Subtle top indicator beam */}
                  <div className="absolute top-0 right-0 w-20 h-[2px] bg-gradient-to-l from-brand-blue to-transparent group-hover:w-full transition-all duration-500"></div>
                  
                  <div>
                    {/* Badge and Icon */}
                    <div className="flex items-center justify-between mb-6">
                      <div className={`p-3 rounded-xl border ${card.iconBg} flex items-center justify-center transition-all duration-300`}>
                        {card.icon}
                      </div>
                      <span className="text-[10px] font-black text-brand-blue bg-brand-blue/5 border border-brand-blue/10 px-2.5 py-1 rounded-md">
                        {card.badge}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg sm:text-xl font-bold text-white mb-3 tracking-tight">
                      {card.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-neutral-450 leading-relaxed font-sans mt-4">
                    {card.description}
                  </p>
                </div>
              </AnimateOnScroll>
            </div>
          ))}
        </div>

        {/* Mobile Interactive Slider Control Panel */}
        <div className="md:hidden flex flex-col items-center gap-4 mt-6">
          {/* Indicators dots */}
          <div className="flex items-center gap-2">
            {cards.map((_, idx) => (
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
              بخش {currentSlide + 1} از {cards.length}
            </span>

            <button 
              onClick={slideNext}
              disabled={currentSlide === cards.length - 1}
              className="p-1.5 rounded-lg hover:bg-white/5 disabled:opacity-30 disabled:hover:bg-transparent text-white transition-all transform active:scale-90"
              aria-label="Next slide"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
