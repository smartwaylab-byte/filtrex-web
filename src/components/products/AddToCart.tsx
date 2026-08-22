'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'
import { useCartStore } from '@/store/cart'
import type { LocalizedProduct } from '@/lib/products'

export default function AddToCart({ product }: { product: LocalizedProduct }) {
  const t = useTranslations('products')
  const locale = useLocale()
  const prefix = locale === 'cs' ? '' : `/${locale}`
  const addItem = useCartStore((s) => s.addItem)
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)

  function handleAdd() {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      stripePriceId: product.stripePriceId,
    }, qty)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium text-gray-700">{t('quantity')}:</span>
        <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
          <button
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="w-9 h-9 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors"
          >
            −
          </button>
          <span className="w-10 text-center font-semibold text-gray-900">{qty}</span>
          <button
            onClick={() => setQty((q) => q + 1)}
            className="w-9 h-9 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors"
          >
            +
          </button>
        </div>
      </div>

      <button
        onClick={handleAdd}
        className={`w-full py-4 font-semibold rounded-xl transition-colors text-base ${
          added
            ? 'bg-brand-light text-brand-dark border border-brand/40'
            : 'bg-brand-yellow text-gray-900 hover:bg-amber-500'
        }`}
      >
        {added ? t('added_to_cart') : t('add_to_cart')}
      </button>

      <Link
        href={`${prefix}/poptavka`}
        className="inline-flex items-center gap-1 text-brand hover:text-brand-dark text-sm font-semibold"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        {t('back_to_inquiry')}
      </Link>
    </div>
  )
}
