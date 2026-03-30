'use client';

import Image from 'next/image';
import { useLanguage } from '@/lib/LanguageContext';

const IMAGES = [
  { src: '/images/athlete-01.jpg', span: 2 },
  { src: '/images/athlete-02.jpg', span: 1 },
  { src: '/images/athlete-03.jpg', span: 1 },
  { src: '/images/athlete-04.jpg', span: 1 },
  { src: '/images/athlete-05.jpg', span: 2 },
  { src: '/images/athlete-06.jpg', span: 1 },
  { src: '/images/athlete-07.jpg', span: 1 },
  { src: '/images/athlete-08.jpg', span: 2 },
  { src: '/images/athlete-09.jpg', span: 1 },
];

export default function AthleteMosaic() {
  const { t } = useLanguage();

  return (
    <section className="bg-[#0D0D0D] py-20 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <p className="text-xs font-bold tracking-[0.3em] uppercase text-white/30 mb-10 text-center">
          {t.mosaic.label}
        </p>

        <div
          className="grid gap-2"
          style={{
            gridTemplateColumns: 'repeat(4, 1fr)',
            gridAutoRows: '220px',
          }}
        >
          {IMAGES.map((img, i) => (
            <div
              key={i}
              className="rounded-lg overflow-hidden relative bg-[#1a1a1a]"
              style={{ gridRow: `span ${img.span}` }}
            >
              <Image
                src={img.src}
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
