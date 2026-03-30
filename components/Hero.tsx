'use client';

import { useLanguage } from '@/lib/LanguageContext';
import EmailForm from './EmailForm';

export default function Hero() {
  const { t } = useLanguage();
  const lines = t.hero.headline.split('\n');

  return (
    <section className="relative min-h-screen flex flex-col justify-end bg-[#0D0D0D] overflow-hidden">
      {/* Background image placeholder */}
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0D0D0D]" />
        {/* Overlay grain texture feel */}
        <div className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: 'radial-gradient(ellipse at 70% 30%, #3a0060 0%, transparent 60%)',
          }}
        />
      </div>

      {/* Accent decorative line */}
      <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-[#E5FF00]/20 to-transparent z-10" />

      {/* Content */}
      <div className="relative z-10 px-6 md:px-12 pb-20 pt-40">
        <div className="max-w-7xl mx-auto">
          {/* Eyebrow */}
          <p className="text-[#E5FF00] text-xs font-bold tracking-[0.3em] uppercase mb-8">
            {t.hero.sub}
          </p>

          {/* Headline */}
          <h1 className="hero-headline text-white mb-10" style={{ fontFamily: 'var(--font-space-grotesk, sans-serif)' }}>
            {lines.map((line, i) => (
              <span key={i} className="block">
                {i === 1 ? <span className="text-[#E5FF00]">{line}</span> : line}
              </span>
            ))}
          </h1>

          {/* Email form */}
          <EmailForm variant="hero" />
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 opacity-40">
        <div className="w-px h-12 bg-white animate-pulse" />
      </div>
    </section>
  );
}
