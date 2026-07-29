import { routing } from '@/i18n/routing'

export const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://filtrex.cz'

const ogLocales: Record<string, string> = {
  cs: 'cs_CZ',
  en: 'en_US',
  de: 'de_DE',
  es: 'es_ES',
  it: 'it_IT',
  pl: 'pl_PL',
}

export function ogLocale(locale: string): string {
  return ogLocales[locale] ?? 'en_US'
}

export function localizedPath(locale: string, path = ''): string {
  const prefix = locale === routing.defaultLocale ? '' : `/${locale}`
  return `${prefix}${path}` || '/'
}

export function buildAlternates(locale: string, path = '') {
  const languages: Record<string, string> = {}
  for (const l of routing.locales) {
    languages[l] = localizedPath(l, path)
  }
  languages['x-default'] = localizedPath(routing.defaultLocale, path)
  return {
    canonical: localizedPath(locale, path),
    languages,
  }
}

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Filtrex s.r.o.',
    url: baseUrl,
    logo: `${baseUrl}/logo.jpg`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Lanškrounská 37',
      postalCode: '568 02',
      addressLocality: 'Svitavy',
      addressCountry: 'CZ',
    },
    telephone: '+420777134829',
    email: 'info@filtrex.cz',
    taxID: '15034313',
    vatID: 'CZ15034313',
  }
}
