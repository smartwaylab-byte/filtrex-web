import Link from 'next/link'
import Image from 'next/image'
import { useTranslations, useLocale } from 'next-intl'
import { products } from '@/lib/products'

export default function ProductsPreview() {
  const t = useTranslations('products')
  const locale = useLocale()
  const prefix = locale === 'cs' ? '' : `/${locale}`

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">{t('title')}</h2>
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-brand-light text-brand-dark text-base font-medium">{t('subtitle')}</span>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="group bg-white rounded-2xl border border-gray-200 overflow-hidden hover:border-brand/40 hover:shadow-lg transition-all"
            >
              {/* Image */}
              <div className="aspect-[4/3] bg-gray-50 relative overflow-hidden">
                {product.images[0] ? (
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-gray-300">
                    <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                )}
                {product.inDevelopment && (
                  <span className="absolute top-3 right-3 bg-amber-100 text-amber-800 text-xs font-semibold px-2.5 py-1 rounded-full">
                    {t('in_development')}
                  </span>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{product.shortDescription}</p>
                <Link
                  href={`${prefix}/produkty/${product.slug}`}
                  className="inline-flex items-center text-brand font-semibold text-sm hover:text-brand-dark transition-colors"
                >
                  {t('more') ?? 'Více informací'}
                  <svg className="ml-1.5 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href={`${prefix}/produkty`}
            className="inline-flex items-center gap-2 px-6 py-3 border-2 border-brand text-brand font-semibold rounded-lg hover:bg-brand-yellow hover:text-gray-900 transition-colors"
          >
            {t('view_all')}
          </Link>
        </div>
      </div>
    </section>
  )
}
