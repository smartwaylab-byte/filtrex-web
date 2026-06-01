'use client'

import { useState, useRef, useEffect } from 'react'
import { useLocale } from 'next-intl'
import { useRouter, usePathname } from '@/i18n/navigation'
import { routing } from '@/i18n/routing'

const labels: Record<string, string> = {
  cs: 'CS', en: 'EN', de: 'DE', es: 'ES', it: 'IT', pl: 'PL',
}

export default function LangSwitch() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  function switchLocale(next: (typeof routing.locales)[number]) {
    router.replace(pathname, { locale: next })
    setOpen(false)
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 px-2 py-1.5 text-sm font-medium text-gray-700 hover:text-green-700 rounded-md border border-gray-200 hover:border-green-300 transition-colors"
      >
        {labels[locale]}
        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="absolute right-0 mt-1 w-16 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-50">
          {routing.locales.map((l) => (
            <button
              key={l}
              onClick={() => switchLocale(l)}
              className={`w-full text-center px-3 py-1.5 text-sm hover:bg-green-50 hover:text-green-700 transition-colors ${
                l === locale ? 'font-bold text-green-700 bg-green-50' : 'text-gray-700'
              }`}
            >
              {labels[l]}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
