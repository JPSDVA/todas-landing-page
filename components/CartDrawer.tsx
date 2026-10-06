'use client';

import Image from 'next/image';
import { useLanguage } from '@/lib/LanguageContext';
import { useCart } from '@/lib/CartContext';
import { formatPrice } from '@/lib/shopify';

export default function CartDrawer() {
  const { t } = useLanguage();
  const { cart, open, busy, error, setOpen, setQuantity } = useCart();
  const lines = cart?.lines ?? [];

  return (
    <>
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-[55] bg-black/60 transition-opacity duration-300 ${
          open ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      />
      <aside
        aria-hidden={!open}
        className={`fixed top-0 right-0 bottom-0 z-[60] w-full max-w-[400px] bg-[#0D0D0D] border-l border-white/10 flex flex-col transition-transform duration-300 ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
          <h3 className="text-xl font-bold" style={{ fontFamily: 'var(--font-space-grotesk, sans-serif)' }}>
            {t.shop.cart}
          </h3>
          <button onClick={() => setOpen(false)} aria-label={t.shop.close} className="text-2xl text-white/80 hover:text-white">
            ×
          </button>
        </div>

        <div className="flex-1 overflow-auto px-6">
          {lines.length === 0 ? (
            <p className="text-center text-white/40 text-sm mt-20">{t.shop.empty}</p>
          ) : (
            lines.map((l) => (
              <div key={l.id} className="flex gap-4 py-4 border-b border-white/10">
                <div className="relative w-16 h-20 rounded-lg overflow-hidden shrink-0 bg-gradient-to-br from-[#1a1a2e] to-[#3a0060]">
                  {l.image && <Image src={l.image} alt={l.title} fill sizes="64px" className="object-cover" />}
                </div>
                <div className="flex-1 text-sm">
                  <p>{l.title}</p>
                  {l.variantTitle !== 'Default Title' && (
                    <p className="text-white/50 mt-0.5 mb-2">{l.variantTitle}</p>
                  )}
                  <div className="inline-flex items-center border border-white/20 rounded-full mt-1">
                    <button disabled={busy} onClick={() => setQuantity(l.id, l.quantity - 1)} className="w-7 h-7 disabled:opacity-40">−</button>
                    <span className="min-w-5 text-center text-xs">{l.quantity}</span>
                    <button disabled={busy} onClick={() => setQuantity(l.id, l.quantity + 1)} className="w-7 h-7 disabled:opacity-40">+</button>
                  </div>
                </div>
                <p className="text-sm">{formatPrice(l.price * l.quantity, cart?.currency)}</p>
              </div>
            ))
          )}
        </div>

        <div className="px-6 py-5 border-t border-white/10">
          <div className="flex justify-between font-semibold mb-1.5">
            <span>{t.shop.subtotal}</span>
            <span>{formatPrice(cart?.subtotal ?? 0, cart?.currency)}</span>
          </div>
          <p className="text-xs text-white/40 mb-4">{t.shop.shippingNote}</p>
          {error && <p className="text-xs text-red-400 mb-3">{t.shop.error}</p>}
          <a
            href={lines.length ? cart?.checkoutUrl : undefined}
            aria-disabled={!lines.length}
            className={`block w-full text-center rounded-full py-4 font-bold bg-[#E5FF00] text-black ${
              lines.length ? '' : 'opacity-30 pointer-events-none'
            }`}
          >
            {t.shop.checkout}
          </a>
        </div>
      </aside>
    </>
  );
}
