import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'
import { buildAlternates } from '@/lib/seo'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'references' })
  return {
    title: t('title'),
    description: t('subtitle'),
    alternates: buildAlternates(locale, '/reference'),
  }
}

const references = [
  { name: 'IREL s.r.o.', url: 'https://irel.eu', country: 'CZ', category: 'Rostlinné oleje' },
  { name: 'Faeton s.r.o.', url: 'https://www.faetongroup.cz', country: 'CZ', category: 'Rostlinné oleje' },
  { name: 'Primasoja s.r.o.', url: 'https://www.primasojasro.cz', country: 'CZ', category: 'Rostlinné oleje' },
  { name: 'HEMP PRODUCTION CZ, s.r.o.', url: 'https://hempcentrum.cz', country: 'CZ', category: 'Rostlinné oleje' },
  { name: 'BOHEMIA OLEJ s.r.o.', url: 'https://www.bohemiaolej.cz', country: 'CZ', category: 'Rostlinné oleje' },
  { name: 'EURONA s.r.o.', url: 'https://www.euronabycerny.com', country: 'CZ', category: 'Filtrace kávy' },
  { name: 'For Beauty s.r.o.', url: 'https://www.for-beauty.cz', country: 'CZ', category: 'Kosmetika' },
  { name: 'Natures Care CZ s.r.o.', url: 'https://www.naturescare.cz', country: 'CZ', category: 'Kosmetika' },
  { name: 'Dromy Vet s.r.o.', url: 'https://www.dromy.cz', country: 'CZ', category: 'Krmiva a veterinární produkty' },
  { name: 'Palírna U zeleného stromu a.s.', url: 'https://palirnauzelenehostromu.cz', country: 'CZ', category: 'Lihoviny' },
  { name: 'FLERET FRUIT s.r.o.', url: 'https://www.fleret.cz', country: 'CZ', category: 'Ovocné destiláty' },
  { name: 'VŘÍDLO, výrobní družstvo', url: 'https://www.vridlo.cz', country: 'CZ', category: 'Kosmetika' },
  { name: 'BOHEMIA SEKT, s.r.o. (Víno Mikulov)', url: 'https://www.vinomikulov.cz', country: 'CZ', category: 'Víno' },
  { name: 'Vinařství Viktorín s.r.o.', url: 'https://www.vinarstviviktorin.cz', country: 'CZ', category: 'Víno' },
  { name: 'BIOENERGO – KOMPLEX, s.r.o.', url: 'https://www.bioenergo-komplex.cz', country: 'CZ', category: 'Rostlinné oleje' },
  { name: 'Contipro a.s.', url: 'https://www.contipro.com', country: 'CZ', category: 'Kosmetika' },
  { name: 'Prusa Polymers a.s.', url: 'https://www.prusa3d.com/cs/', country: 'CZ', category: '3D tisk' },
  { name: 'PALÍRNA BOHUŇOV', url: 'https://www.palirnabohunov.cz', country: 'CZ', category: 'Ovocné destiláty' },
  { name: 'Výzkumný ústav včelařský, s.r.o.', url: 'https://www.beedol.cz', country: 'CZ', category: 'Medovina' },
  { name: 'RAWEA s.r.o.', url: 'https://www.rawea.sk', country: 'SK', category: 'Rostlinné oleje' },
  { name: 'PRELIKA, a.s.', url: 'https://www.prelika.sk', country: 'SK', category: 'Lihoviny' },
  { name: 'CALENDULA, a.s.', url: 'https://calendula.sk', country: 'SK', category: 'Kosmetika' },
  { name: 'ST. NICOLAUS, a.s.', url: 'https://www.nicolaus.sk', country: 'SK', category: 'Lihoviny' },
  { name: 'ALLIVE EUROPE UAB', url: 'https://allive.com', country: 'LT', category: 'Rostlinné oleje' },
  { name: 'UAB VETAGRA', url: 'https://www.senojialiejine.lt', country: 'LT', category: 'Rostlinné oleje' },
  { name: 'SIA Transhemp', url: 'https://www.transhemp.lv/en.html', country: 'LV', category: 'Rostlinné oleje' },
  { name: 'Hesthetic Life Private Limited', url: 'https://hesthetic.com', country: 'IN', category: 'Rostlinné oleje' },
  { name: 'SARKAR', url: 'https://sarkar.co', country: 'IN', category: 'Rostlinné oleje' },
  { name: 'CANAH INTERNATIONAL S.R.L.', url: 'https://www.canah.com', country: 'RO', category: 'Rostlinné oleje' },
  { name: 'Dhaka Dough', url: 'https://dhakadough.com', country: 'BD', category: 'Rostlinné oleje' },
  { name: 'ZERNOFF BEVERAGES SRL', url: 'https://www.zernoff.vodka/', country: 'MD', category: 'Lihoviny' },
]

const countryLabel: Record<string, string> = {
  CZ: 'Česká republika',
  SK: 'Slovensko',
  LT: 'Litva',
  LV: 'Lotyšsko',
  IN: 'Indie',
  RO: 'Rumunsko',
  BD: 'Bangladéš',
  MD: 'Moldavsko',
}

const countryFlagUrl: Record<string, string> = {
  CZ: 'https://flagcdn.com/32x24/cz.png',
  SK: 'https://flagcdn.com/32x24/sk.png',
  LT: 'https://flagcdn.com/32x24/lt.png',
  LV: 'https://flagcdn.com/32x24/lv.png',
  IN: 'https://flagcdn.com/32x24/in.png',
  RO: 'https://flagcdn.com/32x24/ro.png',
  BD: 'https://flagcdn.com/32x24/bd.png',
  MD: 'https://flagcdn.com/32x24/md.png',
}

const byCountry = references.reduce<Record<string, typeof references>>((acc, ref) => {
  if (!acc[ref.country]) acc[ref.country] = []
  acc[ref.country].push(ref)
  return acc
}, {})

export default function ReferencePage() {
  const t = useTranslations('references')

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{t('title')}</h1>
        <p className="text-lg text-gray-600">{t('subtitle')}</p>
      </div>

      <div className="space-y-12">
        {Object.entries(byCountry).map(([country, refs]) => (
          <div key={country}>
            <h2 className="text-xl font-semibold text-gray-700 mb-4 pb-2 border-b border-gray-200 flex items-center gap-3">
              {countryFlagUrl[country] && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={countryFlagUrl[country]} alt={country} width={32} height={24} className="rounded-sm shadow-sm" />
              )}
              {countryLabel[country] ?? country}
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {refs.map((ref) => (
                <a
                  key={ref.name}
                  href={ref.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white rounded-xl border border-gray-200 p-5 hover:border-brand/40 hover:shadow-md transition-all group"
                >
                  <p className="font-semibold text-gray-900 group-hover:text-brand transition-colors">{ref.name}</p>
                  <p className="text-sm text-gray-500 mt-1">{ref.category}</p>
                  <p className="text-xs text-brand mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    {ref.url.replace('https://', '')} →
                  </p>
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
