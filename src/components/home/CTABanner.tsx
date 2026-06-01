import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'

export default function CTABanner() {
  const t = useTranslations('hero')
  const nt = useTranslations('nav')
  const locale = useLocale()
  const prefix = locale === 'cs' ? '' : `/${locale}`

  return (
    <section className="py-20 bg-green-700">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          Potřebujete řešení pro vaši firmu?
        </h2>
        <p className="text-green-100 text-lg mb-8">
          Připravíme nabídku přesně na míru vašim potřebám a objemu filtrace.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href={`${prefix}/poptavka`}
            className="inline-flex items-center justify-center px-8 py-4 bg-white text-green-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
          >
            {t('cta_secondary')}
          </Link>
          <Link
            href={`${prefix}/kontakt`}
            className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-green-600 transition-colors"
          >
            {nt('contact')}
          </Link>
        </div>
      </div>
    </section>
  )
}
