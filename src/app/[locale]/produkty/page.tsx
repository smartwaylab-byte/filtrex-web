import { useTranslations, useLocale } from 'next-intl'
import Link from 'next/link'
import Image from 'next/image'
import { products } from '@/lib/products'

export default function ProductsPage() {
  const t = useTranslations('products')
  const locale = useLocale()
  const prefix = locale === 'cs' ? '' : `/${locale}`

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{t('title')}</h1>
        <p className="text-lg text-gray-600">{t('subtitle')}</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <div key={product.id} className="group bg-white rounded-2xl border border-gray-200 overflow-hidden hover:border-green-300 hover:shadow-lg transition-all">
            <div className="aspect-[4/3] bg-gray-50 relative">
              {product.images[0] ? (
                <Image src={product.images[0]} alt={product.name} fill className="object-contain p-4 group-hover:scale-105 transition-transform duration-300" />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-gray-300">
                  <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              )}
              {product.inDevelopment && (
                <span className="absolute top-3 right-3 bg-amber-100 text-amber-800 text-xs font-semibold px-2.5 py-1 rounded-full">{t('in_development')}</span>
              )}
            </div>
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h2>
              <p className="text-gray-600 text-sm mb-6">{product.shortDescription}</p>
              <Link
                href={`${prefix}/produkty/${product.slug}`}
                className="inline-flex w-full items-center justify-center px-4 py-2.5 bg-green-700 text-white font-medium rounded-lg hover:bg-green-800 transition-colors text-sm"
              >
                {t('more') ?? 'Více informací'}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
