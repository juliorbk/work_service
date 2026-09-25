import { BRAND, PRICING, FAQ } from '@/lib/site-config'

const SITE_URL = 'https://www.workservice.site'

export function localBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${SITE_URL}/#business`,
    name: BRAND.name,
    legalName: BRAND.legalName,
    url: `${SITE_URL}/`,
    logo: `${SITE_URL}/brand/logo-horizontal.png`,
    image: `${SITE_URL}/images/gallery/highlight.jpg`,
    email: BRAND.email,
    telephone: '+58 424-6042538',
    priceRange: '$$',
    description:
      'Coworking, oficinas privadas y salas de conferencias en Maracaibo. Soporte incluido, internet con respaldo y disponibilidad 24 horas.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Maracaibo',
      addressCountry: 'VE',
    },
    areaServed: {
      '@type': 'City',
      name: 'Maracaibo',
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
      ],
      opens: '00:00',
      closes: '23:59',
    },
    sameAs: [BRAND.instagramUrl],
    makesOffer: PRICING.spaces.map((space) => ({
      '@type': 'Offer',
      name: space.name,
      description: space.description,
      price: space.price.replace(/\D/g, ''),
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      url: `${SITE_URL}/#pricing`,
    })),
  }
}

export function faqSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ.items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }
}