'use client';

import React, { createContext, useContext, useState } from 'react';
import content, { Lang } from './content';

type ContentShape = typeof content['en'] | typeof content['es'];

interface LanguageContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: ContentShape;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>('es');
  const t = content[lang];
  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}
