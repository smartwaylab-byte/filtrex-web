import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Analytics } from '@vercel/analytics/next'
import '../globals.css'

const inter = Inter({ subsets: ['latin', 'latin-ext'] })

export const metadata: Metadata = {
  title: {
    default: 'Filtrex s.r.o. – Nanovlákenná filtrace pro potravinářství',
    template: '%s | Filtrex s.r.o.',
  },
  description:
    'Výrobce průmyslových deskových filtrů a nanovlákenných filtračních membrán. Filtrace rostlinných olejů, kávy a kosmetiky.',
  keywords: ['filtrace', 'nanovlákno', 'deskový filtr', 'rostlinné oleje', 'kosmetika', 'potravinářství'],
  openGraph: {
    siteName: 'Filtrex s.r.o.',
    locale: 'cs_CZ',
  },
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound()
  }

  const messages = await getMessages()

  return (
    <html lang={locale} className="h-full scroll-smooth">
      <body className={`${inter.className} min-h-full flex flex-col antialiased bg-white text-gray-900`}>
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  )
}
