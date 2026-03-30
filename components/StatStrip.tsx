'use client';

import { useLanguage } from '@/lib/LanguageContext';

export default function StatStrip() {
  const { t } = useLanguage();

  return (
    <section className="bg-[#F5F0EB] text-[#0D0D0D] py-20 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <p className="text-xs font-bold tracking-[0.3em] uppercase text-[#0D0D0D]/40 mb-16">
          {t.stats.label}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {t.stats.items.map((item, i) => (
            <div key={i} className="border-t-2 border-[#0D0D0D] pt-8">
              <div className="stat-number" style={{ fontFamily: 'var(--font-space-grotesk, sans-serif)' }}>
                {item.number}
              </div>
              <p className="mt-4 text-[#0D0D0D]/70 text-base leading-relaxed max-w-xs">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
