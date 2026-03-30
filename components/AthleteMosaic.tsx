'use client';

import { useLanguage } from '@/lib/LanguageContext';

// Placeholder colors represent athlete image slots — user replaces with real photos
const PLACEHOLDER_COLORS = [
  '#1a1a2e', '#16213e', '#0f3460', '#533483',
  '#2c003e', '#4a0072', '#6b0f1a', '#180a0a',
  '#1a2a1a', '#0a2a0a', '#2a1a0a', '#3a0060',
  '#001f3f', '#004080', '#800020', '#003300',
];

export default function AthleteMosaic() {
  const { t } = useLanguage();

  return (
    <section className="bg-[#0D0D0D] py-20 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <p className="text-xs font-bold tracking-[0.3em] uppercase text-white/30 mb-10 text-center">
          {t.mosaic.label}
        </p>

        {/* Mosaic grid */}
        <div
          className="grid gap-2"
          style={{
            gridTemplateColumns: 'repeat(4, 1fr)',
            gridAutoRows: '140px',
          }}
        >
          {PLACEHOLDER_COLORS.map((color, i) => (
            <div
              key={i}
              className="rounded-lg overflow-hidden relative"
              style={{
                backgroundColor: color,
                gridRow: i === 0 || i === 5 || i === 10 ? 'span 2' : 'span 1',
              }}
            >
              {/* Placeholder overlay */}
              <div className="absolute inset-0 flex items-center justify-center opacity-10">
                <svg width="32" height="32" fill="white" viewBox="0 0 24 24">
                  <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zm-8.5-5.5l2.5 3.01L18 12l4 5H6l3.5-4.51z"/>
                </svg>
              </div>
            </div>
          ))}
        </div>

        <p className="text-white/20 text-xs text-center mt-6">
          — Replace placeholders with your athlete images in /public/images/ —
        </p>
      </div>
    </section>
  );
}
