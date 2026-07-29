import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Analytics } from '@vercel/analytics/next'
import { GoogleAnalytics } from '@next/third-parties/google'
import { baseUrl, ogLocale, buildAlternates, organizationSchema } from '@/lib/seo'
import JsonLd from '@/components/seo/JsonLd'
import '../globals.css'

const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

const inter = Inter({ subsets: ['latin', 'latin-ext'] })

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'hero' })

  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: t('headline'),
      template: '%s | Filtrex s.r.o.',
    },
    description: t('subheadline'),
    keywords: ['filtrace', 'nanovlákno', 'deskový filtr', 'rostlinné oleje', 'kosmetika', 'potravinářství'],
    alternates: buildAlternates(locale),
    openGraph: {
      siteName: 'Filtrex s.r.o.',
      locale: ogLocale(locale),
      type: 'website',
    },
  }
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
        <JsonLd data={organizationSchema()} />
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </NextIntlClientProvider>
        <Analytics />
        {gaMeasurementId && gaMeasurementId !== 'DOPLNIT' && (
          <GoogleAnalytics gaId={gaMeasurementId} />
        )}
      </body>
    </html>
  )
}
