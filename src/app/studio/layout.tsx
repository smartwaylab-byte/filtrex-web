import type { Metadata } from 'next'

export const metadata: Metadata = {
  robots: { index: false, follow: false },
}

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="cs">
      <body>{children}</body>
    </html>
  )
}
