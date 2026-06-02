import { notFound } from 'next/navigation'
import Image from 'next/image'
import { getTranslations } from 'next-intl/server'
import { getProductBySlug, products } from '@/lib/products'
import AddToCart from '@/components/products/AddToCart'
import type { Metadata } from 'next'

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const product = getProductBySlug(slug)
  if (!product) return {}
  return { title: product.name, description: product.shortDescription }
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = getProductBySlug(slug)
  if (!product) notFound()

  const t = await getTranslations('products')

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="grid lg:grid-cols-2 gap-12">
        {/* Images */}
        <div className="space-y-4">
          {product.images.length > 0 ? (
            product.images.map((src, i) => (
              <div key={i} className="aspect-[4/3] bg-gray-50 rounded-2xl overflow-hidden relative">
                <Image src={src} alt={`${product.name} ${i + 1}`} fill className="object-contain p-6" />
              </div>
            ))
          ) : (
            <div className="aspect-[4/3] bg-gray-100 rounded-2xl flex items-center justify-center text-gray-300">
              <svg className="w-24 h-24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          )}
        </div>

        {/* Info */}
        <div>
          {product.inDevelopment && (
            <span className="inline-block bg-amber-100 text-amber-800 text-sm font-semibold px-3 py-1 rounded-full mb-4">
              {t('in_development')}
            </span>
          )}
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
          <p className="text-gray-600 mb-8 leading-relaxed whitespace-pre-line">{product.description}</p>

          {product.parameters.length > 0 && (
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">{t('parameters')}</h2>
              <div className="bg-gray-50 rounded-xl overflow-hidden">
                {product.parameters.map((param, i) => (
                  <div key={i} className={`flex justify-between px-4 py-3 text-sm ${i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                    <span className="font-medium text-gray-700">{param.label}</span>
                    <span className="text-gray-900">{param.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {!product.inDevelopment && <AddToCart product={product} />}
        </div>
      </div>
    </div>
  )
}
