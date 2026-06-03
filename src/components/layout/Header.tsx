'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useTranslations, useLocale } from 'next-intl'
import { usePathname } from 'next/navigation'
import CartIcon from './CartIcon'
import LangSwitch from './LangSwitch'

const locales = ['cs', 'en', 'de', 'es', 'it', 'pl'] as const

export default function Header() {
  const t = useTranslations('nav')
  const locale = useLocale()
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  const prefix = locale === 'cs' ? '' : `/${locale}`

  const navLinks = [
    { href: `${prefix}/produkty`, label: t('products') },
    { href: `${prefix}/reference`, label: t('references') },
    { href: `${prefix}/aktuality`, label: t('news') },
    { href: `${prefix}/kontakt`, label: t('contact') },
  ]

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href={prefix || '/'} className="flex items-center">
            <Image
              src="/logo.jpg"
              alt="Filtrex s.r.o."
              width={140}
              height={52}
              priority
              className="h-10 w-auto object-contain"
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-gray-700 hover:text-brand transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <LangSwitch />
            <CartIcon />
            <Link
              href={`${prefix}/poptavka`}
              className="hidden sm:inline-flex items-center px-4 py-2 bg-brand-yellow text-gray-900 text-sm font-medium rounded-md hover:bg-amber-500 transition-colors"
            >
              {t('inquiry')}
            </Link>
            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-md text-gray-700 hover:text-brand"
              aria-label="Menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 py-3 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block py-2 text-sm font-medium text-gray-700 hover:text-brand"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href={`${prefix}/poptavka`}
            onClick={() => setMobileOpen(false)}
            className="block py-2 text-sm font-medium text-brand"
          >
            {t('inquiry')}
          </Link>
        </div>
      )}
    </header>
  )
}
