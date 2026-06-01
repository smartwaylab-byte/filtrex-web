import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  locales: ['cs', 'en', 'de', 'es', 'it', 'pl'],
  defaultLocale: 'cs',
  localePrefix: 'as-needed',
  localeDetection: false,
})
