'use client';

import { useLanguage } from '@/lib/LanguageContext';

export default function Manifesto() {
  const { t } = useLanguage();

  return (
    <section className="bg-[#0D0D0D] py-32 px-6 md:px-12">
      <div className="max-w-5xl mx-auto">
        <blockquote
          className="section-headline text-white mb-12"
          style={{ fontFamily: 'var(--font-space-grotesk, sans-serif)' }}
        >
          <span className="text-[#E5FF00] border-b-4 border-[#E5FF00] pb-1">
            {t.manifesto.quote}
          </span>
        </blockquote>
        <p className="text-white/60 text-lg md:text-xl leading-relaxed max-w-3xl">
          {t.manifesto.body}
        </p>
      </div>
    </section>
  );
}
