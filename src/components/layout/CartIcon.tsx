'use client'

import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'
import { useCartStore } from '@/store/cart'

export default function CartIcon() {
  const t = useTranslations('nav')
  const locale = useLocale()
  const totalItems = useCartStore((s) => s.totalItems())
  const prefix = locale === 'cs' ? '' : `/${locale}`

  return (
    <Link href={`${prefix}/kosik`} className="relative p-2 text-gray-700 hover:text-green-700 transition-colors">
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
      {totalItems > 0 && (
        <span className="absolute -top-1 -right-1 bg-green-700 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
          {totalItems}
        </span>
      )}
    </Link>
  )
}
