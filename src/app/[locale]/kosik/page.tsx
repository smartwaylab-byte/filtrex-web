'use client'

import { useTranslations, useLocale } from 'next-intl'
import Link from 'next/link'
import Image from 'next/image'
import { useCartStore } from '@/store/cart'

export default function CartPage() {
  const t = useTranslations('cart')
  const locale = useLocale()
  const prefix = locale === 'cs' ? '' : `/${locale}`
  const { items, removeItem, updateQuantity, totalPrice } = useCartStore()

  async function handleCheckout() {
    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items }),
    })
    const { url } = await res.json()
    if (url) window.location.href = url
  }

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center">
        <svg className="w-20 h-20 mx-auto text-gray-300 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        <h1 className="text-2xl font-bold text-gray-900 mb-4">{t('empty')}</h1>
        <Link href={`${prefix}/produkty`} className="inline-flex items-center px-6 py-3 bg-green-700 text-white font-semibold rounded-lg hover:bg-green-800 transition-colors">
          {t('continue_shopping')}
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-3xl font-bold text-gray-900 mb-10">{t('title')}</h1>

      <div className="space-y-4 mb-8">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-4 bg-white rounded-xl border border-gray-200 p-4">
            {item.image && (
              <div className="w-20 h-20 flex-shrink-0 bg-gray-50 rounded-lg relative overflow-hidden">
                <Image src={item.image} alt={item.name} fill className="object-contain p-2" />
              </div>
            )}
            <div className="flex-1">
              <p className="font-semibold text-gray-900">{item.name}</p>
              <p className="text-sm text-gray-500">
                {item.price === 0 ? 'Cena na dotaz' : `${item.price.toLocaleString('cs-CZ')} Kč`}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100">-</button>
              <span className="w-8 text-center font-medium">{item.quantity}</span>
              <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100">+</button>
            </div>
            <button onClick={() => removeItem(item.id)} className="text-gray-400 hover:text-red-500 transition-colors ml-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        ))}
      </div>

      <div className="bg-gray-50 rounded-xl p-6">
        <div className="flex justify-between text-lg font-bold text-gray-900 mb-6">
          <span>{t('total')}</span>
          <span>{totalPrice() === 0 ? 'Cena na dotaz' : `${totalPrice().toLocaleString('cs-CZ')} Kč`}</span>
        </div>
        <button
          onClick={handleCheckout}
          className="w-full py-4 bg-green-700 text-white font-semibold rounded-xl hover:bg-green-800 transition-colors"
        >
          {t('checkout')}
        </button>
        <Link href={`${prefix}/produkty`} className="block text-center mt-4 text-sm text-gray-500 hover:text-gray-700">
          {t('continue_shopping')}
        </Link>
      </div>
    </div>
  )
}
