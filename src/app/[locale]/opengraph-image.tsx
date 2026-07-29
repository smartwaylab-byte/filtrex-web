import { ImageResponse } from 'next/og'
import { getTranslations } from 'next-intl/server'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export const alt = 'Filtrex s.r.o. – Nanovlákenná filtrace pro potravinářství'

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'hero' })

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#ffffff',
          padding: '80px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 48 }}>
          <div style={{ display: 'flex', gap: 6 }}>
            <div style={{ width: 14, height: 64, backgroundColor: '#D4701E' }} />
            <div style={{ width: 14, height: 64, backgroundColor: '#F5B200' }} />
            <div style={{ width: 14, height: 64, backgroundColor: '#7B1A2A' }} />
          </div>
          <div style={{ display: 'flex', fontSize: 72, fontWeight: 700, color: '#111827' }}>
            FILTREX
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: 36,
            color: '#4B5563',
            textAlign: 'center',
            maxWidth: 900,
          }}
        >
          {t('headline')}
        </div>
      </div>
    ),
    { ...size }
  )
}
