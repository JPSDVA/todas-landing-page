'use client';

import { useState, FormEvent } from 'react';
import { useLanguage } from '@/lib/LanguageContext';

interface EmailFormProps {
  variant?: 'hero' | 'cta';
}

export default function EmailForm({ variant = 'hero' }: EmailFormProps) {
  const { lang, t } = useLanguage();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'duplicate' | 'error'>('idle');

  const section = variant === 'hero' ? t.hero : t.cta;

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, lang }),
      });
      const data = await res.json();
      if (res.ok) setStatus('success');
      else if (data.code === 'duplicate') setStatus('duplicate');
      else setStatus('error');
    } catch {
      setStatus('error');
    }
  }

  const isHero = variant === 'hero';

  if (status === 'success') {
    return (
      <p className={`font-medium ${isHero ? 'text-[#E5FF00] text-lg' : 'text-[#0D0D0D] text-base'}`}>
        {t.hero.success}
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
      <input
        type="email"
        required
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder={section.placeholder}
        className={`flex-1 px-5 py-4 text-sm outline-none focus:ring-2 focus:ring-[#E5FF00] ${
          isHero
            ? 'bg-white/10 border border-white/20 text-white placeholder-white/40 rounded-full'
            : 'bg-white border border-[#0D0D0D]/20 text-[#0D0D0D] placeholder-[#0D0D0D]/40 rounded-full'
        }`}
      />
      <button
        type="submit"
        disabled={status === 'loading'}
        className="px-7 py-4 bg-[#E5FF00] text-[#0D0D0D] font-bold text-sm rounded-full hover:bg-yellow-300 active:scale-95 transition-all disabled:opacity-60 whitespace-nowrap"
      >
        {status === 'loading' ? '...' : section.cta}
      </button>
      {(status === 'duplicate' || status === 'error') && (
        <p className={`text-xs mt-1 w-full ${isHero ? 'text-white/60' : 'text-[#0D0D0D]/60'}`}>
          {status === 'duplicate' ? t.hero.duplicate : t.hero.error}
        </p>
      )}
    </form>
  );
}
