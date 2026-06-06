'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useCartStore } from '@/store/cart'

const schema = z.object({
  company: z.string().min(2),
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  volume: z.string().optional(),
  liquid: z.string().optional(),
  message: z.string().min(0),
})
type FormData = z.infer<typeof schema>

export default function InquiryForm() {
  const t = useTranslations('inquiry')
  const locale = useLocale()
  const prefix = locale === 'cs' ? '' : `/${locale}`
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const { items, removeItem, updateQuantity, clearCart } = useCartStore()

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  async function onSubmit(data: FormData) {
    setStatus('sending')
    const productsList = items.length > 0
      ? `Vybrané produkty:\n${items.map((i) => `• ${i.name}: ${i.quantity} ks`).join('\n')}`
      : ''
    const userMessage = data.message || ''
    const fullMessage = [productsList, userMessage].filter(Boolean).join('\n\n')

    if (fullMessage.length < 5) {
      setStatus('error')
      return
    }

    const res = await fetch('/api/poptavka', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...data, message: fullMessage }),
    })
    if (res.ok) {
      clearCart()
      setStatus('success')
      reset()
    } else {
      setStatus('error')
    }
  }

  const inputClass = 'w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent text-gray-900 bg-white'
  const labelClass = 'block text-sm font-medium text-gray-700 mb-1.5'
  const errorClass = 'text-red-500 text-xs mt-1'

  if (status === 'success') {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-brand-light rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p className="text-brand font-semibold text-lg">{t('success')}</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Vybrané produkty */}
      {items.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Vybrané produkty</h3>
          {items.map((item) => (
            <div key={item.id} className="flex items-center gap-3 bg-white rounded-xl border border-gray-200 p-3">
              {item.image && (
                <div className="w-14 h-14 flex-shrink-0 bg-gray-50 rounded-lg relative overflow-hidden">
                  <Image src={item.image} alt={item.name} fill className="object-contain p-1" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 text-sm truncate">{item.name}</p>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 text-sm"
                >
                  −
                </button>
                <span className="w-6 text-center text-sm font-medium">{item.quantity}</span>
                <button
                  type="button"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 text-sm"
                >
                  +
                </button>
              </div>
              <button
                type="button"
                onClick={() => removeItem(item.id)}
                className="text-gray-400 hover:text-red-500 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
          <hr className="border-gray-200" />
        </div>
      )}

      {/* Kontaktní formulář */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>{t('company')} *</label>
            <input {...register('company')} className={inputClass} />
            {errors.company && <p className={errorClass}>Vyplňte název firmy</p>}
          </div>
          <div>
            <label className={labelClass}>{t('name')} *</label>
            <input {...register('name')} className={inputClass} />
            {errors.name && <p className={errorClass}>Vyplňte jméno</p>}
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>{t('email')} *</label>
            <input {...register('email')} type="email" className={inputClass} />
            {errors.email && <p className={errorClass}>Zadejte platný email</p>}
          </div>
          <div>
            <label className={labelClass}>{t('phone')}</label>
            <input {...register('phone')} type="tel" className={inputClass} />
          </div>
        </div>
        <div>
          <Link
            href={`${prefix}/produkty`}
            className="inline-flex items-center px-6 py-3 bg-brand text-white font-semibold rounded-lg hover:bg-brand-dark transition-colors"
          >
            Produkty
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>{t('volume')}</label>
            <input {...register('volume')} placeholder="např. 50 l/h" className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>{t('liquid')}</label>
            <input {...register('liquid')} placeholder="např. slunečnicový olej" className={inputClass} />
          </div>
        </div>
        <div>
          <label className={labelClass}>{t('message')}{items.length === 0 && ' *'}</label>
          <textarea {...register('message')} rows={4} className={inputClass} />
          {errors.message && <p className={errorClass}>Popište prosím váš požadavek</p>}
          {items.length === 0 && <p className="text-xs text-gray-400 mt-1">Nebo vyberte produkty z katalogu tlačítkem "Přidat do poptávky"</p>}
        </div>
        {status === 'error' && <p className="text-red-600 text-sm">{t('error')}</p>}
        <button
          type="submit"
          disabled={status === 'sending'}
          className="w-full py-4 bg-brand-yellow text-gray-900 font-semibold rounded-xl hover:bg-amber-500 transition-colors disabled:opacity-60"
        >
          {status === 'sending' ? t('sending') : t('send')}
        </button>
      </form>
    </div>
  )
}
