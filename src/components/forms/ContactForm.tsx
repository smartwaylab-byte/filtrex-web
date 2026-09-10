'use client'

import { useRef, useState } from 'react'
import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { trackQualifyLead } from '@/lib/analytics'

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  country: z.string().min(2),
  message: z.string().min(10),
})
type FormData = z.infer<typeof schema>

export default function ContactForm() {
  const t = useTranslations('contact')
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  // Ať se GA4 key event `qualify_lead` pošle max. jednou za jedno odeslání
  // (ochrana proti double-clicku / opakovanému submitu).
  const leadTrackedRef = useRef(false)

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  async function onSubmit(data: FormData) {
    if (status === 'sending') return
    setStatus('sending')
    const res = await fetch('/api/kontakt', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    if (res.ok) {
      // GA4 key event (konverze) – až po potvrzené úspěšné odpovědi z /api/kontakt.
      if (!leadTrackedRef.current) {
        leadTrackedRef.current = true
        trackQualifyLead({ form_location: 'kontakt' })
      }
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
    <form onSubmit={(e) => handleSubmit(onSubmit)(e)} className="space-y-5">
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
        <label className={labelClass}>{t('country')} *</label>
        <input {...register('country')} className={inputClass} />
        {errors.country && <p className={errorClass}>Vyplňte prosím zemi</p>}
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
        className="w-full py-4 bg-brand-yellow text-gray-900 font-semibold rounded-xl hover:bg-amber-500 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === 'sending' ? t('sending') : t('send')}
      </button>
    </form>
  )
}
