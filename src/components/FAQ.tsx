import { useState } from "react";
import AnimateOnScroll from "./AnimateOnScroll";
import { ChevronDown, HelpCircle } from "lucide-react";

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const faqItems = [
    {
      question: "آیا هکسر هنوز آپدیت میشه؟",
      answer: "حتما که میشه! بابا هکسر تازه اول راهه؛ ممکنه هر هفته آپدیت هایی ببینید که فیچر و قابلیت های جذابی به برنامه اضافه کنه.",
    },
    {
      question: "آیا امکان پیشنهاد برای اضافه شدن فیچر یا بهبود برنامه وجود داره؟",
      answer: "بله کاملا؛ رفیق ما ازت ممنون میشیم که کمکمون کنی برنامه رو برای کسایی مثل خودمون بهتر کنیم. میتونی از بخش پروفایل، با کلیک روی دکمه تیکت پشتیبانی هر پیشنهادی داری بهمون بدی.",
    },
    {
      question: "اگر درگاه پرداخت مشکل داشت چیکار کنم؟",
      answer: "در چند هفته اخیر ایراداتی برای استفاده از همه درگاه ها به وجود اومده؛ پس اگر مشکل داشت از روش کارت به کارت استفاده کن و عکسش رو ضمیمه کن، خیلی زود اشتراکت فعال میشه!",
    },
    {
      question: "هوش مصنوعی هکسر چقدر زبان فارسی و اصطلاحات فنی رو میفهمه؟",
      answer: "کاملاً! هکسر روی ترکیب زبان فارسی و اصطلاحات برنامهنویسی آموزش دیده. وقتی بگی \"API گِیتوِی دان شده، یه تسک بزن برای چک کردن لاگها\"، دقیقاً میفهمه داری درباره چی حرف میزنی.",
    },
  ];

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faq" className="relative py-24 bg-brand-dark border-t border-white/5">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 select-none">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <AnimateOnScroll delayMs={100}>
            <span className="text-xs font-bold text-brand-blue tracking-wider uppercase border border-brand-blue/20 px-3.5 py-1 rounded-full bg-brand-blue/5">
              پاسخ به ابهامات فنی شما ❓
            </span>
          </AnimateOnScroll>
          <AnimateOnScroll delayMs={200}>
            <h2 className="text-3xl sm:text-4xl font-black text-white mt-4 tracking-tight">
              سوالات متداول برنامه‌نویسان
            </h2>
          </AnimateOnScroll>
        </div>

        {/* Q&A Accordion List */}
        <div className="space-y-4 max-w-3xl mx-auto">
          {faqItems.map((item, idx) => {
            const isOpen = activeIndex === idx;
            return (
              <AnimateOnScroll key={idx} delayMs={idx * 100} className="w-full">
                <div className="w-full bg-[#111]/40 rounded-2xl border border-white/5 overflow-hidden transition-all duration-300">
                  
                  {/* Accordion trigger bar */}
                  <button
                    onClick={() => toggleAccordion(idx)}
                    className="w-full py-5 px-6 flex items-center justify-between gap-4 text-right cursor-pointer focus:outline-none"
                  >
                    <div className="flex items-center gap-3.5">
                      <HelpCircle className={`w-5 h-5 shrink-0 transition-colors ${isOpen ? "text-brand-blue" : "text-neutral-550"}`} />
                      <span className="text-sm sm:text-base font-bold text-neutral-200 hover:text-white transition-colors">
                        {item.question}
                      </span>
                    </div>
                    
                    <span className={`p-1.5 rounded-lg bg-white/5 text-neutral-400 hover:text-white transition-all duration-300 ${
                      isOpen ? "rotate-180 bg-brand-blue/10 text-brand-blue" : ""
                    }`}>
                      <ChevronDown className="w-4 h-4" />
                    </span>
                  </button>

                  {/* Accordion collapsible body */}
                  <div
                    className={`transition-all duration-300 ease-in-out overflow-hidden ${
                      isOpen ? "max-h-[300px] border-t border-white/5 bg-zinc-950/30" : "max-h-0"
                    }`}
                  >
                    <div className="p-6 text-sm text-neutral-400 leading-relaxed font-sans text-right">
                      {item.answer}
                    </div>
                  </div>

                </div>
              </AnimateOnScroll>
            );
          })}
        </div>

      </div>
    </section>
  );
}
