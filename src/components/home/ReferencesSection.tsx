import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'

const references = [
  { name: 'IREL s.r.o.', url: 'https://irel.eu', country: 'CZ', category: 'Rostlinné oleje' },
  { name: 'Faeton s.r.o.', url: 'https://www.faetongroup.cz', country: 'CZ', category: 'Rostlinné oleje' },
  { name: 'Primasoja s.r.o.', url: 'https://www.primasojasro.cz', country: 'CZ', category: 'Rostlinné oleje' },
  { name: 'HEMP PRODUCTION CZ', url: 'https://hempcentrum.cz', country: 'CZ', category: 'Rostlinné oleje' },
  { name: 'BOHEMIA OLEJ s.r.o.', url: 'https://www.bohemiaolej.cz', country: 'CZ', category: 'Rostlinné oleje' },
  { name: 'EURONA s.r.o.', url: 'https://www.euronabycerny.com', country: 'CZ', category: 'Filtrace kávy' },
  { name: 'For Beauty s.r.o.', url: 'https://www.for-beauty.cz', country: 'CZ', category: 'Kosmetika' },
  { name: 'Natures Care CZ', url: 'https://www.naturescare.cz', country: 'CZ', category: 'Kosmetika' },
  { name: 'RAWEA s.r.o.', url: 'https://www.rawea.sk', country: 'SK', category: 'Rostlinné oleje' },
  { name: 'ALLIVE EUROPE UAB', url: 'https://allive.com', country: 'LT', category: 'Rostlinné oleje' },
  { name: 'Hesthetic Life', url: 'https://hesthetic.com', country: 'IN', category: 'Rostlinné oleje' },
  { name: 'CANAH INTERNATIONAL', url: 'https://www.canah.com', country: 'RO', category: 'Rostlinné oleje' },
]

const countryFlag: Record<string, string> = {
  CZ: '🇨🇿', SK: '🇸🇰', LT: '🇱🇹', IN: '🇮🇳', RO: '🇷🇴',
}

export default function ReferencesSection() {
  const t = useTranslations('references')
  const locale = useLocale()
  const prefix = locale === 'cs' ? '' : `/${locale}`

  const preview = references.slice(0, 8)

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">{t('title')}</h2>
          <p className="text-lg text-gray-600">{t('subtitle')}</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {preview.map((ref) => (
            <a
              key={ref.name}
              href={ref.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-xl border border-gray-200 p-4 hover:border-green-300 hover:shadow-md transition-all group"
            >
              <div className="flex items-start justify-between mb-2">
                <span className="text-xl">{countryFlag[ref.country]}</span>
                <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">{ref.country}</span>
              </div>
              <p className="font-semibold text-sm text-gray-900 group-hover:text-green-700 transition-colors leading-tight">
                {ref.name}
              </p>
              <p className="text-xs text-gray-500 mt-1">{ref.category}</p>
            </a>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            href={`${prefix}/reference`}
            className="inline-flex items-center gap-2 text-green-700 font-semibold hover:text-green-800 transition-colors"
          >
            {t('view_all')}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
