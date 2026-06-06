import Image from 'next/image'
import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'

export default function Hero() {
  const t = useTranslations('hero')
  const locale = useLocale()
  const prefix = locale === 'cs' ? '' : `/${locale}`

  return (
    <>
      {/* Tmavá hero sekce – jen nadpis + tlačítka */}
      <section className="relative bg-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image src="/linka.png" alt="" fill className="object-cover" aria-hidden="true" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-yellow border border-brand-yellow text-gray-900 text-sm font-medium mb-6">
              <span className="w-2 h-2 rounded-full bg-gray-700 animate-pulse" />
              Filtrex s.r.o.
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              {t('headline')}
            </h1>

            <p className="text-lg sm:text-xl text-gray-300 max-w-2xl">
              {t('subheadline')}
            </p>
          </div>
        </div>
      </section>

      {/* Tlačítka + statistiky – bílý pruh */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          {/* Tlačítka */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href={`${prefix}/produkty`}
              className="inline-flex items-center justify-center px-8 py-4 bg-brand-yellow text-gray-900 font-semibold rounded-lg hover:bg-amber-500 transition-colors text-base"
            >
              {t('cta_primary')}
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              href={`${prefix}/poptavka`}
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:border-brand hover:text-brand transition-colors text-base"
            >
              {t('cta_secondary')}
            </Link>
          </div>

          {/* Statistiky */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-2 border-t border-gray-100">
            {[
              { value: '30+', label: 'let zkušeností' },
              { value: '12', label: 'zákazníků ve světě' },
              { value: '5', label: 'zemí' },
              { value: '#1', label: 'nanovlákno v ČR' },
            ].map((stat) => (
              <div key={stat.label} className="border-l-2 border-brand pl-4">
                <div className="text-3xl font-bold text-brand">{stat.value}</div>
                <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
