"use client";

import { Waves, Globe, ExternalLink, Play, MessageCircle } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-ink pt-20 pb-8">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-16 border-b border-paper/5">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-water/20 flex items-center justify-center border border-water/10">
                <Waves size={16} className="text-water-light" />
              </div>
              <span className="font-[family-name:var(--font-display)] text-xl font-bold text-paper">
                Chhab Chhaba <span className="text-sun">Chhab</span>
              </span>
            </div>
            <p className="font-[family-name:var(--font-serif)] text-sm text-paper/40 italic leading-relaxed">
              &ldquo;Where every splash tells a story. Gujarat&apos;s most beloved water fun park.&rdquo;
            </p>
          </div>

          {/* Park */}
          <div>
            <h4 className="font-[family-name:var(--font-sans)] text-[9px] uppercase tracking-[0.25em] text-sun mb-5">Park</h4>
            <div className="flex flex-col gap-2.5">
              <a href="#attractions" className="font-[family-name:var(--font-sans)] text-sm text-paper/40 hover:text-paper transition-colors">Attractions</a>
              <a href="#" className="font-[family-name:var(--font-sans)] text-sm text-paper/40 hover:text-paper transition-colors">Family Zone</a>
              <a href="#" className="font-[family-name:var(--font-sans)] text-sm text-paper/40 hover:text-paper transition-colors">Food Court</a>
              <a href="#facilities" className="font-[family-name:var(--font-sans)] text-sm text-paper/40 hover:text-paper transition-colors">Facilities</a>
            </div>
          </div>

          {/* Info */}
          <div>
            <h4 className="font-[family-name:var(--font-sans)] text-[9px] uppercase tracking-[0.25em] text-sun mb-5">Info</h4>
            <div className="flex flex-col gap-2.5">
              <a href="#tickets" className="font-[family-name:var(--font-sans)] text-sm text-paper/40 hover:text-paper transition-colors">Tickets & Pricing</a>
              <a href="#" className="font-[family-name:var(--font-sans)] text-sm text-paper/40 hover:text-paper transition-colors">Events</a>
              <a href="#" className="font-[family-name:var(--font-sans)] text-sm text-paper/40 hover:text-paper transition-colors">Safety</a>
              <a href="#" className="font-[family-name:var(--font-sans)] text-sm text-paper/40 hover:text-paper transition-colors">Park Map</a>
            </div>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-[family-name:var(--font-sans)] text-[9px] uppercase tracking-[0.25em] text-sun mb-5">Connect</h4>
            <div className="flex flex-col gap-2.5">
              <a href="tel:+919904980234" className="font-[family-name:var(--font-sans)] text-sm text-paper/40 hover:text-paper transition-colors">+91 99049 80234</a>
              <a href="mailto:info@chhabchhabachhab.com" className="font-[family-name:var(--font-sans)] text-sm text-paper/40 hover:text-paper transition-colors font-sans">info@chhabchhabachhab.com</a>
              <a href="#" className="font-[family-name:var(--font-sans)] text-sm text-paper/40 hover:text-paper transition-colors">Careers</a>
              <a href="#" className="font-[family-name:var(--font-sans)] text-sm text-paper/40 hover:text-paper transition-colors">Group Bookings</a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-wrap justify-between items-center pt-6 gap-4">
          <p className="font-[family-name:var(--font-sans)] text-xs text-paper/20">
            &copy; 2026 Chhab Chhaba Chhab Water Fun Park. All rights reserved.
          </p>
          <div className="flex gap-3">
            {[Globe, ExternalLink, Play, MessageCircle].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="w-8 h-8 flex items-center justify-center border border-paper/8 text-paper/30 hover:border-sun hover:text-sun transition-all duration-300 rounded-md"
              >
                <Icon size={14} />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* WhatsApp Floating */}
      <a
        href="https://wa.me/919904980234"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-[9998] w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-[0_4px_20px_rgba(37,211,102,0.3)] hover:scale-110 transition-transform duration-300 pointer-events-auto"
        aria-label="Chat on WhatsApp"
      >
        <svg width="26" height="26" viewBox="0 0 24 24" fill="white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>
    </footer>
  );
}
