'use client';

import { useLanguage } from '@/lib/LanguageContext';
import EmailForm from './EmailForm';

export default function EmailCTA() {
  const { t } = useLanguage();

  return (
    <section className="bg-[#F5F0EB] text-[#0D0D0D] py-32 px-6 md:px-12">
      <div className="max-w-3xl mx-auto text-center">
        <h2
          className="section-headline text-[#0D0D0D] mb-6"
          style={{ fontFamily: 'var(--font-space-grotesk, sans-serif)' }}
        >
          {t.cta.headline}
        </h2>
        <p className="text-[#0D0D0D]/60 text-lg mb-10 max-w-lg mx-auto">
          {t.cta.sub}
        </p>

        <div className="flex justify-center mb-12">
          <EmailForm variant="cta" />
        </div>

        {/* Social buttons */}
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <a
            href="https://instagram.com/todas.club"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 border-2 border-[#0D0D0D] text-[#0D0D0D] font-bold text-sm rounded-full hover:bg-[#0D0D0D] hover:text-white transition-all"
          >
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
              <rect x="2" y="2" width="20" height="20" rx="5"/>
              <circle cx="12" cy="12" r="4"/>
              <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
            </svg>
            {t.cta.instagram}
          </a>
          <a
            href="https://tiktok.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 border-2 border-[#0D0D0D] text-[#0D0D0D] font-bold text-sm rounded-full hover:bg-[#0D0D0D] hover:text-white transition-all"
          >
            <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.25 8.25 0 004.82 1.54V6.78a4.86 4.86 0 01-1.05-.09z"/>
            </svg>
            {t.cta.tiktok}
          </a>
        </div>
      </div>
    </section>
  );
}
