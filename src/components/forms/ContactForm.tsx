'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  message: z.string().min(10),
})
type FormData = z.infer<typeof schema>

export default function ContactForm() {
  const t = useTranslations('contact')
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  async function onSubmit(data: FormData) {
    setStatus('sending')
    const res = await fetch('/api/kontakt', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    if (res.ok) { setStatus('success'); reset() }
    else setStatus('error')
  }

  const inputClass = 'w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent text-gray-900 bg-white'
  const labelClass = 'block text-sm font-medium text-gray-700 mb-1.5'
  const errorClass = 'text-red-500 text-xs mt-1'

  if (status === 'success') {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p className="text-green-700 font-semibold text-lg">{t('success')}</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <label className={labelClass}>{t('name')} *</label>
        <input {...register('name')} className={inputClass} />
        {errors.name && <p className={errorClass}>Vyplňte prosím jméno</p>}
      </div>
      <div>
        <label className={labelClass}>{t('email')} *</label>
        <input {...register('email')} type="email" className={inputClass} />
        {errors.email && <p className={errorClass}>Zadejte platný email</p>}
      </div>
      <div>
        <label className={labelClass}>{t('phone')}</label>
        <input {...register('phone')} type="tel" className={inputClass} />
      </div>
      <div>
        <label className={labelClass}>{t('message')} *</label>
        <textarea {...register('message')} rows={5} className={inputClass} />
        {errors.message && <p className={errorClass}>Zpráva musí mít alespoň 10 znaků</p>}
      </div>
      {status === 'error' && <p className="text-red-600 text-sm">{t('error')}</p>}
      <button
        type="submit"
        disabled={status === 'sending'}
        className="w-full py-4 bg-green-700 text-white font-semibold rounded-xl hover:bg-green-800 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === 'sending' ? t('sending') : t('send')}
      </button>
    </form>
  )
}
