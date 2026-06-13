import { Twitter, Instagram, Send } from "lucide-react";

export default function Footer() {
  const currentPersianYear = "۱۴۰۵"; // Adjusted dynamically according to metadata 2026-06

  const menuItems = [
    { label: "امکانات", href: "#features" },
    { label: "تعرفه‌ها", href: "#pricing" },
    { label: "سوالات متداول", href: "#faq" },
  ];

  return (
    <footer className="relative bg-zinc-950 text-zinc-400 select-none">
      
      {/* Dynamic top gradient line divider */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-zinc-800 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-right">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
          
          {/* Column 1: Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <img 
                src="/icon-192.png" 
                alt="HEXER logo" 
                className="w-9 h-9 rounded-xl object-contain shadow-sm"
                referrerPolicy="no-referrer"
              />
              <span className="text-lg font-black tracking-wider bg-gradient-to-r from-sky-400 via-indigo-300 to-fuchsia-400 bg-clip-text text-transparent font-mono">
                HEXER
              </span>
            </div>
            
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-sans max-w-sm">
              هِکسِر اولین دستیار بهره‌وری هوش مصنوعی بومی در ایران است که افکار آشفته، ویس‌ها و عکس‌های شما را تبدیل به یک ساختار تودوی تمیز و منظم می‌کند.
            </p>

            {/* Social channels (Lucide only) */}
            <div className="flex items-center gap-4.5 pt-2">
              <a
                href="#"
                className="p-2 rounded-lg bg-zinc-900 border border-zinc-850 text-zinc-400 hover:text-sky-400 hover:border-sky-500/20 transition-all cursor-pointer"
                aria-label="X (Twitter)"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="p-2 rounded-lg bg-zinc-900 border border-zinc-850 text-zinc-400 hover:text-fuchsia-400 hover:border-fuchsia-500/20 transition-all cursor-pointer"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="p-2 rounded-lg bg-zinc-900 border border-zinc-850 text-zinc-400 hover:text-indigo-400 hover:border-indigo-500/20 transition-all cursor-pointer"
                aria-label="Telegram"
              >
                <Send className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Sitemap Navigation links */}
          <div className="md:col-span-3 pb-2">
            <h4 className="text-sm font-bold text-zinc-100 mb-4">بخش‌های وب‌سایت</h4>
            <div className="flex flex-col gap-3">
              {menuItems.map((item, idx) => (
                <a
                  key={idx}
                  href={item.href}
                  className="text-xs sm:text-sm text-zinc-450 hover:text-white transition-colors cursor-pointer"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          {/* Column 3: Policy / legal links */}
          <div className="md:col-span-4 pb-2">
            <h4 className="text-sm font-bold text-zinc-100 mb-4">امنیت و حریم خصوصی</h4>
            <div className="flex flex-col gap-3 text-xs sm:text-sm">
              <a href="#" className="text-zinc-450 hover:text-white transition-colors font-sans">
                شرایط استفاده و خدمت به کاربران
              </a>
              <a href="#" className="text-zinc-450 hover:text-white transition-colors font-sans">
                حفظ امنیت سرتاسری و حریم خصوصی
              </a>
              <a href="#" className="text-zinc-450 hover:text-white transition-colors font-sans">
                پیمان‌نامه پردازش با هوش مصنوعی
              </a>
              <a href="#" className="text-zinc-450 hover:text-white transition-colors font-sans">
                تماس با تیم پشتیبانی فنی
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Credits copyright block */}
        <div className="border-t border-zinc-900 mt-14 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-500 font-sans">
          <span>
            ساخته شده با ❤️ برای جامعه توسعه‌یافته و پرانرژی فارسی‌زبانان
          </span>
          <span>
            © {currentPersianYear} هِکسِر (دستیار شخصی بهره‌وری). تمامی حقوق فکری و معنوی محفوظ است.
          </span>
        </div>
      </div>
    </footer>
  );
}
