'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/lib/LanguageContext';
import { useCart } from '@/lib/CartContext';
import { Product, formatPrice } from '@/lib/shopify';

function ProductCard({ product }: { product: Product }) {
  const { t } = useLanguage();
  const { add, busy } = useCart();
  const hasOptions = product.variants.length > 1;
  const firstAvailable = product.variants.find((v) => v.availableForSale) ?? product.variants[0];
  const [variantId, setVariantId] = useState(firstAvailable?.id);
  const selected = product.variants.find((v) => v.id === variantId) ?? firstAvailable;
  const soldOut = !selected?.availableForSale;

  return (
    <div className="bg-white rounded-2xl overflow-hidden flex flex-col transition-transform hover:-translate-y-1">
      <Link
        href={`/producto/${product.handle}`}
        aria-label={product.title}
        className="relative block aspect-[4/5] bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#3a0060]"
      >
        {product.image && (
          <Image
            src={product.image.url}
            alt={product.image.alt}
            fill
            sizes="(max-width: 640px) 100vw, 25vw"
            className="object-cover"
          />
        )}
      </Link>
      <div className="p-5 flex flex-col gap-3 flex-1">
        <h3 className="text-lg font-bold" style={{ fontFamily: 'var(--font-space-grotesk, sans-serif)' }}>
          <Link href={`/producto/${product.handle}`} className="hover:underline">
            {product.title}
          </Link>
        </h3>
        <p className="text-[#0D0D0D]/60">{formatPrice(selected?.price ?? product.price, product.currency)}</p>

        {hasOptions && (
          <div className="flex flex-wrap gap-2">
            {product.variants.map((v) => (
              <button
                key={v.id}
                onClick={() => setVariantId(v.id)}
                disabled={!v.availableForSale}
                className={`min-w-9 h-9 px-2 rounded-lg border-[1.5px] text-sm transition-colors disabled:opacity-30 disabled:line-through ${
                  v.id === variantId
                    ? 'bg-[#0D0D0D] text-white border-[#0D0D0D]'
                    : 'bg-white border-[#ddd] hover:border-[#0D0D0D]'
                }`}
              >
                {v.title}
              </button>
            ))}
          </div>
        )}

        <button
          onClick={() => selected && add(selected.id)}
          disabled={soldOut || busy}
          className="mt-auto rounded-full py-3 font-semibold text-sm bg-[#0D0D0D] text-white hover:bg-[#E5FF00] hover:text-black transition-colors disabled:opacity-40 disabled:hover:bg-[#0D0D0D] disabled:hover:text-white"
        >
          {soldOut ? t.shop.soldOut : t.shop.add}
        </button>
      </div>
    </div>
  );
}

export default function ShopGrid({ products }: { products: Product[] }) {
  const { t } = useLanguage();

  return (
    <section id="shop" className="bg-[#F5F0EB] text-[#0D0D0D] py-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <p className="text-[#7a8600] text-xs font-bold tracking-[0.3em] uppercase mb-4">{t.shop.eyebrow}</p>
        <h2
          className="section-headline mb-12"
          style={{ fontFamily: 'var(--font-space-grotesk, sans-serif)' }}
        >
          {t.shop.headline}
        </h2>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-6">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
