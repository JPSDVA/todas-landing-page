'use client';

import { useLanguage } from '@/lib/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-[#0D0D0D] border-t border-white/10 py-10 px-6 md:px-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <span
          className="text-white font-bold text-xl tracking-widest"
          style={{ fontFamily: 'var(--font-space-grotesk, sans-serif)' }}
        >
          TODAS
        </span>
        <p className="text-white/30 text-sm text-center">{t.footer.tagline}</p>
        <p className="text-white/20 text-xs">{t.footer.copy}</p>
      </div>
    </footer>
  );
}
