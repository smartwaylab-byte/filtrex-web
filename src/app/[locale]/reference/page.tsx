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

type Reference = {
  name: string
  url: string
  country: string
  category: string
  logo?: string
  initials?: string
  badgeColor?: string
  wideLogo?: boolean
}

const references: Reference[] = [
  { name: 'IREL s.r.o.', url: 'https://irel.eu', country: 'CZ', category: 'Rostlinné oleje', logo: '/logos/irel.png' },
  { name: 'Faeton s.r.o.', url: 'https://www.faetongroup.cz', country: 'CZ', category: 'Rostlinné oleje', logo: '/logos/faeton.png' },
  { name: 'HEMP PRODUCTION CZ, s.r.o.', url: 'https://hempcentrum.cz', country: 'CZ', category: 'Rostlinné oleje', logo: '/logos/hemp-production-cz.png' },
  { name: 'BOHEMIA OLEJ s.r.o.', url: 'https://www.bohemiaolej.cz', country: 'CZ', category: 'Rostlinné oleje', logo: '/logos/bohemia-olej.png' },
  { name: 'EURONA s.r.o.', url: 'https://www.euronabycerny.com', country: 'CZ', category: 'Filtrace kávy', logo: '/logos/eurona.svg' },
  { name: 'Natures Care CZ s.r.o.', url: 'https://www.naturescare.cz', country: 'CZ', category: 'Kosmetika', logo: '/logos/natures-care.png' },
  { name: 'Dromy Vet s.r.o.', url: 'https://www.dromy.cz', country: 'CZ', category: 'Krmiva a veterinární produkty', logo: '/logos/dromy-vet.svg' },
  { name: 'Palírna U zeleného stromu a.s.', url: 'https://palirnauzelenehostromu.cz', country: 'CZ', category: 'Lihoviny', logo: '/logos/palirna-u-zeleneho-stromu.svg' },
  { name: 'FLERET FRUIT s.r.o.', url: 'https://www.fleret.cz', country: 'CZ', category: 'Ovocné destiláty', logo: '/logos/fleret.png' },
  { name: 'VŘÍDLO, výrobní družstvo', url: 'https://www.vridlo.cz', country: 'CZ', category: 'Kosmetika', logo: '/logos/vridlo.jpg' },
  { name: 'BOHEMIA SEKT, s.r.o. (Víno Mikulov)', url: 'https://www.vinomikulov.cz', country: 'CZ', category: 'Víno', logo: '/logos/bohemia-sekt.png' },
  { name: 'Vinařství Viktorín s.r.o.', url: 'https://www.vinarstviviktorin.cz', country: 'CZ', category: 'Víno', logo: '/logos/vinarstvi-viktorin.svg', wideLogo: true },
  { name: 'Contipro a.s.', url: 'https://www.contipro.com', country: 'CZ', category: 'Kosmetika', logo: '/logos/contipro.webp' },
  { name: 'Prusa Polymers a.s.', url: 'https://www.prusa3d.com/cs/', country: 'CZ', category: '3D tisk', logo: '/logos/prusa-polymers.png' },
  { name: 'PALÍRNA BOHUŇOV', url: 'https://www.palirnabohunov.cz', country: 'CZ', category: 'Ovocné destiláty', logo: '/logos/palirna-bohunov.png' },
  { name: 'Primasoja s.r.o.', url: 'https://www.primasojasro.cz', country: 'CZ', category: 'Rostlinné oleje', initials: 'PS', badgeColor: 'bg-orange-100 text-orange-700' },
  { name: 'For Beauty s.r.o.', url: 'https://www.for-beauty.cz', country: 'CZ', category: 'Kosmetika' },
  { name: 'BIOENERGO – KOMPLEX, s.r.o.', url: 'https://www.bioenergo-komplex.cz', country: 'CZ', category: 'Rostlinné oleje' },
  { name: 'Výzkumný ústav včelařský, s.r.o.', url: 'https://www.beedol.cz', country: 'CZ', category: 'Medovina', logo: '/logos/beedol.png' },
  { name: 'RAWEA s.r.o.', url: 'https://www.rawea.sk', country: 'SK', category: 'Rostlinné oleje', logo: '/logos/rawea.png' },
  { name: 'PRELIKA, a.s.', url: 'https://www.prelika.sk', country: 'SK', category: 'Lihoviny', logo: '/logos/prelika.png' },
  { name: 'CALENDULA, a.s.', url: 'https://calendula.sk', country: 'SK', category: 'Kosmetika', logo: '/logos/calendula.png' },
  { name: 'ST. NICOLAUS, a.s.', url: 'https://www.nicolaus.sk', country: 'SK', category: 'Lihoviny', logo: '/logos/st-nicolaus.png' },
  { name: 'ALLIVE EUROPE UAB', url: 'https://allive.com', country: 'LT', category: 'Rostlinné oleje', logo: '/logos/allive.png' },
  { name: 'UAB VETAGRA', url: 'https://www.senojialiejine.lt', country: 'LT', category: 'Rostlinné oleje', logo: '/logos/vetagra.png' },
  { name: 'SIA Transhemp', url: 'https://www.transhemp.lv/en.html', country: 'LV', category: 'Rostlinné oleje' },
  { name: 'Hesthetic Life Private Limited', url: 'https://hesthetic.com', country: 'IN', category: 'Rostlinné oleje', logo: '/logos/hesthetic.png' },
  { name: 'SARKAR', url: 'https://sarkar.co', country: 'IN', category: 'Rostlinné oleje', logo: '/logos/sarkar.png' },
  { name: 'CANAH INTERNATIONAL S.R.L.', url: 'https://www.canah.com', country: 'RO', category: 'Rostlinné oleje', logo: '/logos/canah.png' },
  { name: 'Dhaka Dough', url: 'https://dhakadough.com', country: 'BD', category: 'Rostlinné oleje', logo: '/logos/dhaka-dough.png' },
  { name: 'ZERNOFF BEVERAGES SRL', url: 'https://www.zernoff.vodka/', country: 'MD', category: 'Lihoviny', logo: '/logos/zernoff.png' },
  { name: 'The Oil Barn', url: 'https://www.facebook.com/theoilbarnmt', country: 'US', category: 'Rostlinné oleje' },
  { name: 'Sillehof', url: 'https://sillehof.com/', country: 'AT', category: 'Rostlinné oleje', logo: '/logos/sillehof.png' },
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
  US: 'USA',
  AT: 'Rakousko',
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
  US: 'https://flagcdn.com/32x24/us.png',
  AT: 'https://flagcdn.com/32x24/at.png',
}

const byCountry = references.reduce<Record<string, typeof references>>((acc, ref) => {
  if (!acc[ref.country]) acc[ref.country] = []
  acc[ref.country].push(ref)
  return acc
}, {})

const LEGAL_SUFFIX_RE =
  /\b(s\.?\s?r\.?\s?o\.?|a\.?\s?s\.?|spol\.?\s?s\s?r\s?\.?o\.?|gmbh|ltd\.?|s\.?\s?r\.?\s?l\.?|uab|sia|private limited|výrobní družstvo)\b/gi

function getInitials(name: string): string {
  const cleaned = name
    .replace(/\([^)]*\)/g, ' ')
    .replace(LEGAL_SUFFIX_RE, ' ')
    .replace(/[,.]/g, ' ')
  const words = cleaned.split(/\s+/).filter((w) => /[A-Za-zÀ-ž]/.test(w))
  if (words.length >= 2) return (words[0][0] + words[1][0]).toUpperCase()
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase()
  return name.slice(0, 2).toUpperCase()
}

const badgeColors = [
  'bg-emerald-100 text-emerald-700',
  'bg-teal-100 text-teal-700',
  'bg-sky-100 text-sky-700',
  'bg-indigo-100 text-indigo-700',
  'bg-amber-100 text-amber-700',
  'bg-rose-100 text-rose-700',
  'bg-lime-100 text-lime-700',
  'bg-cyan-100 text-cyan-700',
]

function getBadgeColor(name: string): string {
  let hash = 0
  for (let i = 0; i < name.length; i++) hash = (hash * 31 + name.charCodeAt(i)) % badgeColors.length
  return badgeColors[hash]
}

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
          <div key={country} id={country} className="scroll-mt-24">
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
                  className="relative bg-white rounded-xl border border-gray-200 p-5 hover:border-brand/40 hover:shadow-md transition-all group"
                >
                  <p className="font-semibold text-gray-900 group-hover:text-brand transition-colors">{ref.name}</p>
                  <p className="text-sm text-gray-500 mt-1">{ref.category}</p>
                  <p className="text-xs text-brand mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    {ref.url.replace('https://', '')} →
                  </p>
                  {ref.logo ? (
                    <div
                      className={`absolute bottom-4 right-4 rounded-xl border border-gray-100 bg-white flex items-center justify-center overflow-hidden shadow-sm transition-transform hover:scale-110 ${ref.wideLogo ? 'w-24 h-10' : 'w-14 h-14'}`}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={ref.logo} alt={`${ref.name} logo`} className="w-full h-full object-contain p-1.5" />
                    </div>
                  ) : (
                    <div
                      className={`absolute bottom-4 right-4 w-14 h-14 rounded-xl flex items-center justify-center text-sm font-semibold shadow-sm transition-transform hover:scale-110 ${ref.badgeColor ?? getBadgeColor(ref.name)}`}
                    >
                      {ref.initials ?? getInitials(ref.name)}
                    </div>
                  )}
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
