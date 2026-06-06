'use client'

import { useState } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import Link from 'next/link'
import Image from 'next/image'
import { useCartStore } from '@/store/cart'

export default function CartPage() {
  const t = useTranslations('cart')
  const tInq = useTranslations('inquiry')
  const locale = useLocale()
  const prefix = locale === 'cs' ? '' : `/${locale}`
  const { items, removeItem, updateQuantity, clearCart } = useCartStore()

  const [form, setForm] = useState({ company: '', name: '', email: '', phone: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('sending')
    const productsList = items.map((i) => `• ${i.name}: ${i.quantity} ks`).join('\n')
    const fullMessage = `Vybrané produkty:\n${productsList}${form.message ? '\n\n' + form.message : ''}`
    try {
      const res = await fetch('/api/poptavka', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, message: fullMessage }),
      })
      if (res.ok) {
        clearCart()
        setStatus('success')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-4">{t('success')}</h1>
        <Link href={`${prefix}/produkty`} className="inline-flex items-center px-6 py-3 bg-brand-yellow text-gray-900 font-semibold rounded-lg hover:bg-amber-500 transition-colors">
          {t('continue_shopping')}
        </Link>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center">
        <svg className="w-20 h-20 mx-auto text-gray-300 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
        <h1 className="text-2xl font-bold text-gray-900 mb-4">{t('empty')}</h1>
        <Link href={`${prefix}/produkty`} className="inline-flex items-center px-6 py-3 bg-brand-yellow text-gray-900 font-semibold rounded-lg hover:bg-amber-500 transition-colors">
          {t('continue_shopping')}
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-3xl font-bold text-gray-900 mb-10">{t('title')}</h1>

      {/* Vybrané produkty */}
      <div className="space-y-4 mb-10">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-4 bg-white rounded-xl border border-gray-200 p-4">
            {item.image && (
              <div className="w-20 h-20 flex-shrink-0 bg-gray-50 rounded-lg relative overflow-hidden">
                <Image src={item.image} alt={item.name} fill className="object-contain p-2" />
              </div>
            )}
            <div className="flex-1">
              <p className="font-semibold text-gray-900">{item.name}</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
              >
                −
              </button>
              <span className="w-8 text-center font-medium">{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
              >
                +
              </button>
            </div>
            <button onClick={() => removeItem(item.id)} className="text-gray-400 hover:text-red-500 transition-colors ml-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        ))}
      </div>

      {/* Kontaktní formulář */}
      <div className="bg-gray-50 rounded-2xl p-6 sm:p-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">{tInq('title')}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{tInq('company')} *</label>
              <input
                type="text"
                required
                minLength={2}
                value={form.company}
                onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{tInq('name')} *</label>
              <input
                type="text"
                required
                minLength={2}
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{tInq('email')} *</label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{tInq('phone')}</label>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t('form_message')}</label>
            <textarea
              rows={4}
              value={form.message}
              onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand resize-none"
            />
          </div>
          {status === 'error' && (
            <p className="text-red-600 text-sm">{t('error')}</p>
          )}
          <button
            type="submit"
            disabled={status === 'sending'}
            className="w-full py-4 bg-brand-yellow text-gray-900 font-semibold rounded-xl hover:bg-amber-500 transition-colors disabled:opacity-60"
          >
            {status === 'sending' ? t('sending') : t('send_inquiry')}
          </button>
          <Link href={`${prefix}/produkty`} className="block text-center mt-2 text-sm text-gray-500 hover:text-gray-700">
            {t('continue_shopping')}
          </Link>
        </form>
      </div>
    </div>
  )
}
