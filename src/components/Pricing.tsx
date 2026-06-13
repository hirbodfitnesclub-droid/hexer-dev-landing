import { useState, useRef } from "react";
import AnimateOnScroll from "./AnimateOnScroll";
import { Check, ShieldCheck, CreditCard, Clock, ChevronRight, ChevronLeft } from "lucide-react";

export default function Pricing() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const plans = [
    {
      name: "رایگان",
      price: "رایگان",
      period: "بدون نیاز به کارت بانکی",
      description: "ارائه طعم کامل سرعت و هوشمندی مدل ۳.۱ بدون ایجاد مانع مالی",
      quota: "۳۰ درخواست AI",
      duration: "۳ روز اعتبار رایگان",
      features: [
        "دسترسی به تمام قابلیت‌های هوشمند",
        "مدیریت تسک و چک‌لیست نامحدود",
        "یادداشت‌های هوشمند متنی",
        "اپ موبایل (PWA)",
      ],
      ctaText: "شروع استفاده رایگان",
      link: "https://my.hexerapp.ir",
    },
    {
      name: "استارتر",
      price: "۹۹,۰۰۰",
      period: "تومان / ماهانه",
      description: "کاربران روزمره با نیازهای پایه‌ای یادآوری و ردیابی",
      quota: "۳۰۰ درخواست ماهانه",
      duration: "مناسب فریلنسرها",
      features: [
        "همه امکانات پلن رایگان",
        "بدون محدودیت روزانه (آزاد)",
        "استخراج هوشمند از ویس و عکس",
        "پستیبانی تیکتی خوب",
      ],
      ctaText: "شروع با استارتر",
      link: "https://my.hexerapp.ir",
    },
    {
      name: "پلاس",
      price: "۱۹۹,۰۰۰",
      period: "تومان / ماهانه",
      description: "ویژه مدیران و توسعه‌دهندگان ارشد",
      quota: "۷۰۰ درخواست ماهانه",
      duration: "مناسب توسعه‌دهندگان ارشد",
      features: [
        "بیش از ۲ برابر ظرفیت نسبت به استارتر",
        "بدون محدودیت روزانه (آزاد)",
        "دستیار صوتی هوشمند تلگرام",
        "پشتیبانی تلگرامی اولویت‌دار",
      ],
      ctaText: "شروع با پلاس",
      link: "https://my.hexerapp.ir",
    },
    {
      name: "پرو",
      price: "۳۶۹,۰۰۰",
      period: "تومان / ماهانه",
      description: "ویژه کاربران پرمصرف و تیم‌های چابک",
      quota: "۱۳۰۰ درخواست ماهانه",
      duration: "۳0 روز اعتبار",
      features: [
        "حجم پردازش فوق‌العاده بالا",
        "اولویت طلایی در صف پردازش AI",
        "دسترسی زودهنگام به وب‌هوک و API",
        "پشتیبانی VIP مکرر ۲۴ ساعته",
      ],
      ctaText: "شروع ۳ روز تست رایگان پرو",
      link: "https://my.hexerapp.ir",
      badge: "پرفروشترین برای تیمها و اسکراممسترها",
      popular: true,
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
    const nextIdx = Math.min(currentSlide + 1, plans.length - 1);
    scrollToSlide(nextIdx);
  };

  const slidePrev = () => {
    const prevIdx = Math.max(currentSlide - 1, 0);
    scrollToSlide(prevIdx);
  };

  return (
    <section id="pricing" className="relative py-24 bg-brand-dark border-t border-white/5 overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/3 -right-24 w-80 h-80 rounded-full opacity-10 blur-3xl bg-brand-blue pointer-events-none"></div>
      <div className="absolute bottom-1/3 -left-24 w-80 h-80 rounded-full opacity-10 blur-3xl bg-brand-purple pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 select-none">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <AnimateOnScroll delayMs={100}>
            <span className="text-xs font-bold text-brand-blue tracking-wider uppercase border border-brand-blue/20 px-3.5 py-1 rounded-full bg-brand-blue/5">
              تعرفه‌های برنامه‌ریزی هوشمند 💵
            </span>
          </AnimateOnScroll>
          <AnimateOnScroll delayMs={200}>
            <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-black text-white mt-4 tracking-tight">
              تمرکزت چقدر می‌ارزه؟
            </h2>
          </AnimateOnScroll>
        </div>

        {/* Pricing Cards Grid (Horizontal scroll on mobile, custom grid on desktop) */}
        <div className="relative">
          <div 
            ref={containerRef}
            onScroll={handleScroll}
            className="flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch overflow-x-auto md:overflow-x-visible snap-x snap-mandatory flex-nowrap md:flex-wrap pb-[12px] md:pb-0 scrollbar-none px-2"
          >
            {plans.map((plan, idx) => (
              <div 
                key={idx} 
                className="shrink-0 w-[85vw] md:w-auto snap-center md:snap-align-none"
              >
                <AnimateOnScroll delayMs={idx * 100} className="h-full">
                  <div
                    className={`w-full h-full rounded-2xl flex flex-col justify-between text-right relative group ${
                      plan.popular
                        ? "animated-neon-border scale-102 z-10 shadow-xl shadow-brand-purple/5"
                        : "bg-[#111]/40 border border-white/5 hover:border-white/10"
                    }`}
                  >
                    {/* Inside card inner wrapper to cover neon border overflow on top/bottom */}
                    <div className="bg-[#0e0e0f] rounded-2xl p-6 flex flex-col h-full relative z-10 justify-between">
                      <div>
                        {/* Popular Indicator badge */}
                        {plan.badge ? (
                          <div className="flex justify-start items-center mb-5">
                            <span className="text-[10px] font-bold px-2.5 py-1 rounded-md bg-brand-purple/15 text-brand-purple border border-brand-purple/20">
                              {plan.badge}
                            </span>
                          </div>
                        ) : (
                          <div className="h-7 mb-5" />
                        )}

                        {/* Plan Identification */}
                        <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                        <p className="text-xs text-neutral-400 mb-6 font-sans">{plan.description}</p>

                        {/* Price display */}
                        <div className="flex items-baseline gap-2 mb-6">
                          <span className="text-3xl sm:text-4.5xl font-black text-white tracking-tight font-mono">
                            {plan.price}
                          </span>
                          <span className="text-xs text-neutral-400 font-sans">{plan.period}</span>
                        </div>

                        {/* Divider */}
                        <div className="h-[1px] bg-white/5 mb-6"></div>

                        {/* Quota metadata details */}
                        <div className="space-y-3 mb-6 font-sans">
                          <div className="flex items-center gap-2 text-xs text-neutral-200">
                            <Clock className="w-4 h-4 text-brand-blue shrink-0" />
                            <span>سهمیه: <strong>{plan.quota}</strong></span>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-neutral-400">
                            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                            <span>اعتبار: {plan.duration}</span>
                          </div>
                        </div>

                        {/* Divider */}
                        <div className="h-[1px] bg-white/5 mb-6"></div>

                        {/* Features lists */}
                        <ul className="space-y-3.5 mb-8">
                          {plan.features.map((feature, fIdx) => (
                            <li key={fIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-300 font-sans">
                              <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Primary Button */}
                      <a
                        href={plan.link}
                        className={`w-full py-4 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 active:scale-95 text-center cursor-pointer block ${
                          plan.popular
                            ? "bg-brand-blue text-white shadow-lg shadow-brand-blue/15 hover:bg-brand-blue/90"
                            : "bg-white/5 text-neutral-250 hover:bg-white/10 hover:text-white border border-white/5"
                        }`}
                      >
                        {plan.ctaText}
                      </a>
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
              {plans.map((_, idx) => (
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
                پلن {currentSlide + 1} از {plans.length}
              </span>

              <button 
                onClick={slideNext}
                disabled={currentSlide === plans.length - 1}
                className="p-1.5 rounded-lg hover:bg-white/5 disabled:opacity-30 disabled:hover:bg-transparent text-white transition-all transform active:scale-90"
                aria-label="Next slide"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Confidence Row */}
        <AnimateOnScroll delayMs={450} className="w-full mt-12 md:mt-16">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-xs text-neutral-500 border-t border-white/5 pt-8 font-sans">
            <span className="flex items-center gap-1.5 leading-none">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>پرداخت از طریق درگاه آنلاین و کارت به کارت</span>
            </span>
            <span className="hidden sm:inline text-neutral-800">·</span>
            <span className="flex items-center gap-1.5 leading-none">
              <CreditCard className="w-4 h-4 text-brand-purple" />
              <span>قیمت‌های به صرفه</span>
            </span>
            <span className="hidden sm:inline text-neutral-800">·</span>
            <span className="flex items-center gap-1.5 leading-none">
              <Clock className="w-4 h-4 text-brand-blue" />
              <span>پشتیبانی سریع</span>
            </span>
          </div>
        </AnimateOnScroll>

      </div>
    </section>
  );
}
