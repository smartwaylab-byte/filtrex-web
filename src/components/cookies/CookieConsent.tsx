'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'
import { GoogleAnalytics } from '@next/third-parties/google'

const STORAGE_KEY = 'filtrex-cookie-consent'
type Consent = 'accepted' | 'rejected'

export default function CookieConsent({ gaId }: { gaId?: string }) {
  const t = useTranslations('cookies')
  const locale = useLocale()
  const [consent, setConsent] = useState<Consent | null>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (stored === 'accepted' || stored === 'rejected') {
      setConsent(stored)
    }
    setReady(true)
  }, [])

  function choose(value: Consent) {
    window.localStorage.setItem(STORAGE_KEY, value)
    setConsent(value)
  }

  const prefix = locale === 'cs' ? '' : `/${locale}`

  return (
    <>
      {/* GA4 se načte pouze po výslovném souhlasu */}
      {gaId && consent === 'accepted' && <GoogleAnalytics gaId={gaId} />}

      {ready && consent === null && (
        <div className="fixed inset-x-0 bottom-0 z-[100] p-4 sm:p-6">
          <div className="mx-auto flex max-w-3xl flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-xl sm:flex-row sm:items-center sm:p-6">
            <p className="flex-1 text-sm text-gray-700">
              {t('message')}{' '}
              <Link href={`${prefix}/ochrana-osobnich-udaju`} className="text-brand underline hover:text-brand-dark">
                {t('learn_more')}
              </Link>
            </p>
            <div className="flex shrink-0 gap-3">
              <button
                type="button"
                onClick={() => choose('rejected')}
                className="rounded-full border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
              >
                {t('reject')}
              </button>
              <button
                type="button"
                onClick={() => choose('accepted')}
                className="rounded-full bg-brand px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-dark"
              >
                {t('accept')}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
