'use client'

import { useTranslations } from 'next-intl'
import { useCartStore } from '@/store/cart'
import type { Product } from '@/lib/products'

export default function AddToCart({ product }: { product: Product }) {
  const t = useTranslations('products')
  const addItem = useCartStore((s) => s.addItem)

  function handleAdd() {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      stripePriceId: product.stripePriceId,
    })
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <span className="text-2xl font-bold text-gray-900">
          {product.price === 0
            ? <span className="text-green-700 text-lg font-semibold">{t('inquiry_cta')}</span>
            : `${product.price.toLocaleString('cs-CZ')} Kč`}
        </span>
      </div>
      <button
        onClick={handleAdd}
        className="w-full py-4 bg-green-700 text-white font-semibold rounded-xl hover:bg-green-800 transition-colors text-base"
      >
        {t('add_to_cart')}
      </button>
    </div>
  )
}
