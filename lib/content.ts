export type Lang = 'en' | 'es';

const content = {
  en: {
    nav: {
      logo: 'TODAS',
      instagram: 'Instagram',
      tiktok: 'TikTok',
    },
    hero: {
      headline: "THE STORE FOR\nWOMEN'S SPORTS\nFANS",
      sub: 'Something big is coming.',
      cta: 'Notify me',
      placeholder: 'Your email address',
      success: "You're on the list! We'll be in touch.",
      duplicate: 'This email is already on the waitlist.',
      error: 'Something went wrong. Please try again.',
    },
    stats: {
      label: 'Why now?',
      items: [
        { number: '80%', text: 'of women would buy more women\'s sports merch — if it actually existed.' },
        { number: '3×', text: 'Women\'s sports apparel is growing three times faster than other categories.' },
        { number: '0', text: 'brands capturing Liga MX Femenil viral moments in real merch. Until now.' },
      ],
    },
    manifesto: {
      quote: 'This is for Todas.',
      body: 'Women\'s sports have never been bigger. The fans are here, the athletes are legends — and the merch? It barely exists. We\'re building the store that should have been here all along: fashion-forward, culturally authentic, made for fans who live and breathe the game.',
    },
    mosaic: {
      label: 'The women we play for',
    },
    cta: {
      headline: 'Be first in line.',
      sub: 'Drop your email and we\'ll reach you before anyone else.',
      cta: 'Notify me',
      placeholder: 'Your email address',
      instagram: 'Follow on Instagram',
      tiktok: 'Follow on TikTok',
    },
    footer: {
      tagline: 'Fashion-forward merch for women\'s sports fans.',
      copy: '© 2025 Todas. All rights reserved.',
    },
  },
  es: {
    nav: {
      logo: 'TODAS',
      instagram: 'Instagram',
      tiktok: 'TikTok',
    },
    hero: {
      headline: 'LA TIENDA PARA\nFANS DEL\nDEPORTE FEMENIL',
      sub: 'Algo grande se acerca.',
      cta: 'Avísame',
      placeholder: 'Tu correo electrónico',
      success: '¡Ya estás en la lista! Te avisamos pronto.',
      duplicate: 'Este correo ya está en la lista de espera.',
      error: 'Algo salió mal. Inténtalo de nuevo.',
    },
    stats: {
      label: '¿Por qué ahora?',
      items: [
        { number: '80%', text: 'de las mujeres comprarían más merch del deporte femenil — si existiera.' },
        { number: '3×', text: 'La ropa del deporte femenil crece tres veces más rápido que otras categorías.' },
        { number: '0', text: 'marcas capturando momentos virales de la Liga MX Femenil en merch real. Hasta ahora.' },
      ],
    },
    manifesto: {
      quote: 'Esto es para Todas.',
      body: 'El deporte femenil nunca ha sido tan grande. Las fans están aquí, las atletas son leyendas — ¿y el merch? Casi no existe. Estamos construyendo la tienda que debió existir desde hace tiempo: con estilo, culturalmente auténtica, hecha para fans que viven y respiran el juego.',
    },
    mosaic: {
      label: 'Las mujeres por quienes jugamos',
    },
    cta: {
      headline: 'Sé la primera.',
      sub: 'Déjanos tu correo y te avisamos antes que a nadie.',
      cta: 'Avísame',
      placeholder: 'Tu correo electrónico',
      instagram: 'Síguenos en Instagram',
      tiktok: 'Síguenos en TikTok',
    },
    footer: {
      tagline: 'Merch con estilo para fans del deporte femenil.',
      copy: '© 2025 Todas. Todos los derechos reservados.',
    },
  },
} as const;

export default content;
