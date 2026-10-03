'use client'

import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'

// Zpět na předchozí stránku; bez historie (přímé otevření odkazu) vede na fallbackHref
export default function BackButton({ fallbackHref }: { fallbackHref: string }) {
  const t = useTranslations('common')
  const router = useRouter()

  function handleBack() {
    if (window.history.length > 1) router.back()
    else router.push(fallbackHref)
  }

  return (
    <button
      type="button"
      onClick={handleBack}
      className="inline-flex items-center gap-1 text-brand hover:text-brand-dark text-sm font-semibold"
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
      </svg>
      {t('back')}
    </button>
  )
}
