'use client';

import { useEffect, useState } from 'react';
import { useLanguage } from '@/lib/LanguageContext';

export default function Navbar() {
  const { lang, setLang, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-5 transition-all duration-300 ${
        scrolled ? 'bg-[#0D0D0D] border-b border-white/10' : 'bg-transparent'
      }`}
    >
      {/* Logo */}
      <span className="text-white font-bold text-2xl tracking-widest" style={{ fontFamily: 'var(--font-space-grotesk, sans-serif)' }}>
        {t.nav.logo}
      </span>

      {/* Right side */}
      <div className="flex items-center gap-6">
        {/* Language toggle */}
        <div className="flex items-center gap-1 text-sm font-medium">
          <button
            onClick={() => setLang('en')}
            className={`px-2 py-1 transition-colors ${lang === 'en' ? 'text-[#E5FF00]' : 'text-white/40 hover:text-white'}`}
          >
            EN
          </button>
          <span className="text-white/20">|</span>
          <button
            onClick={() => setLang('es')}
            className={`px-2 py-1 transition-colors ${lang === 'es' ? 'text-[#E5FF00]' : 'text-white/40 hover:text-white'}`}
          >
            ES
          </button>
        </div>

        {/* Instagram */}
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t.nav.instagram}
          className="text-white/60 hover:text-white transition-colors"
        >
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
            <circle cx="12" cy="12" r="4"/>
            <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
          </svg>
        </a>

        {/* TikTok */}
        <a
          href="https://tiktok.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t.nav.tiktok}
          className="text-white/60 hover:text-white transition-colors"
        >
          <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.25 8.25 0 004.82 1.54V6.78a4.86 4.86 0 01-1.05-.09z"/>
          </svg>
        </a>
      </div>
    </nav>
  );
}
