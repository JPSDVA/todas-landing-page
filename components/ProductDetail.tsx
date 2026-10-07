'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/lib/LanguageContext';
import { useCart } from '@/lib/CartContext';
import { ProductDetail as Product, formatPrice } from '@/lib/shopify';

export default function ProductDetail({ product }: { product: Product }) {
  const { t } = useLanguage();
  const { add, busy } = useCart();
  const [imageIndex, setImageIndex] = useState(0);
  const hasOptions = product.variants.length > 1;
  const firstAvailable = product.variants.find((v) => v.availableForSale) ?? product.variants[0];
  const [variantId, setVariantId] = useState(firstAvailable?.id);
  const selected = product.variants.find((v) => v.id === variantId) ?? firstAvailable;
  const soldOut = !selected?.availableForSale;
  const current = product.images[imageIndex];

  return (
    <section className="bg-[#F5F0EB] text-[#0D0D0D] min-h-screen pt-28 pb-24 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <Link href="/#shop" className="inline-block text-sm text-[#0D0D0D]/60 hover:text-black mb-7">
          {t.shop.back}
        </Link>

        <div className="grid gap-10 md:gap-14 md:grid-cols-[1.1fr_1fr] items-start">
          {/* Galería */}
          <div>
            <div className="relative aspect-[4/5] bg-white rounded-2xl overflow-hidden">
              {current && (
                <Image
                  src={current.url}
                  alt={current.alt}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 55vw"
                  className="object-cover"
                />
              )}
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-2.5 mt-3 flex-wrap">
                {product.images.map((img, i) => (
                  <button
                    key={img.url}
                    onClick={() => setImageIndex(i)}
                    aria-label={`${product.title} ${i + 1}`}
                    className={`relative w-[72px] h-[90px] rounded-[10px] overflow-hidden bg-white border-2 transition-colors ${
                      i === imageIndex ? 'border-[#0D0D0D]' : 'border-transparent'
                    }`}
                  >
                    <Image src={img.url} alt="" fill sizes="72px" className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div>
            <p className="text-[#7a8600] text-xs font-bold tracking-[0.3em] uppercase mb-3">{t.shop.eyebrow}</p>
            <h1
              className="text-3xl md:text-5xl font-bold leading-[1.05] tracking-tight mb-3.5"
              style={{ fontFamily: 'var(--font-space-grotesk, sans-serif)' }}
            >
              {product.title}
            </h1>
            <p className="text-xl mb-6">{formatPrice(selected?.price ?? product.price, product.currency)}</p>

            {hasOptions && (
              <>
                <p className="text-sm font-semibold mb-2.5">{t.shop.size}</p>
                <div className="flex flex-wrap gap-2 mb-7">
                  {product.variants.map((v) => (
                    <button
                      key={v.id}
                      onClick={() => setVariantId(v.id)}
                      disabled={!v.availableForSale}
                      className={`min-w-12 h-11 px-3.5 rounded-[10px] border-[1.5px] text-sm transition-colors disabled:opacity-30 disabled:line-through ${
                        v.id === variantId
                          ? 'bg-[#0D0D0D] text-white border-[#0D0D0D]'
                          : 'bg-white border-[#ccc] hover:border-[#0D0D0D]'
                      }`}
                    >
                      {v.title}
                    </button>
                  ))}
                </div>
              </>
            )}

            <button
              onClick={() => selected && add(selected.id)}
              disabled={soldOut || busy}
              className="w-full rounded-full py-4 font-bold text-base bg-[#0D0D0D] text-white hover:bg-[#E5FF00] hover:text-black transition-colors disabled:opacity-40 disabled:hover:bg-[#0D0D0D] disabled:hover:text-white"
            >
              {soldOut ? t.shop.soldOut : t.shop.add}
            </button>

            {product.description && (
              <div className="mt-8 pt-6 border-t border-[#d8d2ca]">
                <h2 className="text-sm font-bold mb-2">{t.shop.description}</h2>
                <p className="text-[15px] leading-relaxed text-[#0D0D0D]/80 whitespace-pre-line">
                  {product.description}
                </p>
              </div>
            )}

            <ul className="mt-5 grid gap-1.5 text-[13px] text-[#0D0D0D]/60">
              <li>✓ {t.shop.madeToOrder}</li>
              <li>✓ {t.shop.shippingNote}</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
