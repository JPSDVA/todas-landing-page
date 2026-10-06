'use client';

import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import {
  Cart,
  addToCart,
  createCart,
  getCart,
  removeCartLine,
  updateCartLine,
} from './shopify';

const STORAGE_KEY = 'todas-cart-id';

interface CartContextType {
  cart: Cart | null;
  open: boolean;
  busy: boolean;
  error: boolean;
  setOpen: (open: boolean) => void;
  add: (variantId: string) => Promise<void>;
  setQuantity: (lineId: string, quantity: number) => Promise<void>;
}

const CartContext = createContext<CartContextType | null>(null);

function readId() {
  try { return localStorage.getItem(STORAGE_KEY); } catch { return null; }
}
function saveId(id: string | null) {
  try {
    if (id) localStorage.setItem(STORAGE_KEY, id);
    else localStorage.removeItem(STORAGE_KEY);
  } catch {}
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Cart | null>(null);
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(false);

  // Recupera el carrito guardado en este navegador
  useEffect(() => {
    const id = readId();
    if (!id) return;
    getCart(id)
      .then((c) => {
        if (c) setCart(c);
        else saveId(null);
      })
      .catch(() => saveId(null));
  }, []);

  const run = useCallback(async (fn: () => Promise<Cart>) => {
    setBusy(true);
    setError(false);
    try {
      const next = await fn();
      setCart(next);
      saveId(next.id);
      return true;
    } catch (e) {
      console.error(e);
      setError(true);
      return false;
    } finally {
      setBusy(false);
    }
  }, []);

  const add = useCallback(
    async (variantId: string) => {
      const ok = await run(() => (cart ? addToCart(cart.id, variantId, 1) : createCart(variantId, 1)));
      if (ok) setOpen(true);
    },
    [cart, run],
  );

  const setQuantity = useCallback(
    async (lineId: string, quantity: number) => {
      if (!cart) return;
      await run(() =>
        quantity < 1 ? removeCartLine(cart.id, lineId) : updateCartLine(cart.id, lineId, quantity),
      );
    },
    [cart, run],
  );

  return (
    <CartContext.Provider value={{ cart, open, busy, error, setOpen, add, setQuantity }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
