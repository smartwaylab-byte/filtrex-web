import Link from 'next/link'
import Image from 'next/image'
import { useTranslations, useLocale } from 'next-intl'

export default function Footer() {
  const t = useTranslations('footer')
  const nt = useTranslations('nav')
  const locale = useLocale()
  const prefix = locale === 'cs' ? '' : `/${locale}`

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="mb-3 inline-block bg-white px-3 py-2">
              <Image
                src="/logo.jpg"
                alt="Filtrex s.r.o."
                width={120}
                height={44}
                className="h-8 w-auto object-contain"
              />
            </div>
            <p className="text-sm text-gray-400">{t('tagline')}</p>
            <p className="text-sm text-gray-400 mt-4">
              Filtrex s.r.o.<br />
              Lanškrounská 37<br />
              568 02 Svitavy<br />
              Česká republika
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-white font-semibold mb-3">{t('company')}</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href={`${prefix}/produkty`} className="hover:text-white transition-colors">{nt('products')}</Link></li>
              <li><Link href={`${prefix}/reference`} className="hover:text-white transition-colors">{nt('references')}</Link></li>
              <li><Link href={`${prefix}/aktuality`} className="hover:text-white transition-colors">{nt('news')}</Link></li>
              <li><Link href={`${prefix}/kontakt`} className="hover:text-white transition-colors">{nt('contact')}</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-3">{nt('contact')}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="tel:+420777134829" className="hover:text-white transition-colors">
                  +420 777 134 829
                </a>
              </li>
              <li>
                <a href="mailto:info@filtrex.cz" className="hover:text-white transition-colors">
                  info@filtrex.cz
                </a>
              </li>
              <li className="text-gray-500 text-xs mt-3">
                IČO: 15034313 · DIČ: CZ15034313
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-gray-500">
          <span>© {new Date().getFullYear()} Filtrex s.r.o. {t('rights')}.</span>
          <div className="flex gap-4">
            <Link href={`${prefix}/ochrana-osobnich-udaju`} className="hover:text-gray-300 transition-colors">{t('privacy')}</Link>
            <Link href={`${prefix}/obchodni-podminky`} className="hover:text-gray-300 transition-colors">{t('terms')}</Link>
            <Link href={`${prefix}/copyright`} className="hover:text-gray-300 transition-colors">Copyright</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
