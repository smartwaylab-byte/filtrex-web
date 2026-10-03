import Link from 'next/link'
import Image from 'next/image'
import { useTranslations, useLocale } from 'next-intl'

const countries = [
  { code: 'CZ', label: 'Česká republika' },
  { code: 'SK', label: 'Slovensko' },
  { code: 'LT', label: 'Litva' },
  { code: 'LV', label: 'Lotyšsko' },
  { code: 'IN', label: 'Indie' },
  { code: 'RO', label: 'Rumunsko' },
  { code: 'BD', label: 'Bangladéš' },
  { code: 'MD', label: 'Moldavsko' },
  { code: 'US', label: 'USA' },
  { code: 'AT', label: 'Rakousko' },
]

const countryFlagUrl: Record<string, string> = {
  CZ: 'https://flagcdn.com/48x36/cz.png',
  SK: 'https://flagcdn.com/48x36/sk.png',
  LT: 'https://flagcdn.com/48x36/lt.png',
  LV: 'https://flagcdn.com/48x36/lv.png',
  IN: 'https://flagcdn.com/48x36/in.png',
  RO: 'https://flagcdn.com/48x36/ro.png',
  BD: 'https://flagcdn.com/48x36/bd.png',
  MD: 'https://flagcdn.com/48x36/md.png',
  US: 'https://flagcdn.com/48x36/us.png',
  AT: 'https://flagcdn.com/48x36/at.png',
}

export default function ReferencesSection() {
  const t = useTranslations('references')
  const locale = useLocale()
  const prefix = locale === 'cs' ? '' : `/${locale}`

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">{t('title')}</h2>
          <span className="inline-flex w-fit items-center px-4 py-1.5 rounded-full bg-brand-light text-brand-dark text-base font-medium">{t('subtitle')}</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {countries.map((country) => (
            <Link
              key={country.code}
              href={`${prefix}/reference#${country.code}`}
              className="flex flex-col items-center text-center gap-2 bg-white rounded-xl border border-gray-200 p-4 hover:border-brand/40 hover:shadow-md transition-all group"
            >
              <Image src={countryFlagUrl[country.code]} alt={country.label} width={40} height={30} className="rounded-sm shadow-sm" />
              <p className="font-semibold text-sm text-gray-900 group-hover:text-brand transition-colors">
                {country.label}
              </p>
            </Link>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            href={`${prefix}/reference`}
            className="inline-flex items-center gap-2 text-brand font-semibold hover:text-brand-dark transition-colors"
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
