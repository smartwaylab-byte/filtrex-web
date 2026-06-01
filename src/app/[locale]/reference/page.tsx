import { useTranslations } from 'next-intl'

const references = [
  { name: 'IREL s.r.o.', url: 'https://irel.eu', country: 'CZ', category: 'Rostlinné oleje' },
  { name: 'Faeton s.r.o.', url: 'https://www.faetongroup.cz', country: 'CZ', category: 'Rostlinné oleje' },
  { name: 'Primasoja s.r.o.', url: 'https://www.primasojasro.cz', country: 'CZ', category: 'Rostlinné oleje' },
  { name: 'HEMP PRODUCTION CZ, s.r.o.', url: 'https://hempcentrum.cz', country: 'CZ', category: 'Rostlinné oleje' },
  { name: 'BOHEMIA OLEJ s.r.o.', url: 'https://www.bohemiaolej.cz', country: 'CZ', category: 'Rostlinné oleje' },
  { name: 'EURONA s.r.o.', url: 'https://www.euronabycerny.com', country: 'CZ', category: 'Filtrace kávy' },
  { name: 'For Beauty s.r.o.', url: 'https://www.for-beauty.cz', country: 'CZ', category: 'Kosmetika' },
  { name: 'Natures Care CZ s.r.o.', url: 'https://www.naturescare.cz', country: 'CZ', category: 'Kosmetika' },
  { name: 'RAWEA s.r.o.', url: 'https://www.rawea.sk', country: 'SK', category: 'Rostlinné oleje' },
  { name: 'ALLIVE EUROPE UAB', url: 'https://allive.com', country: 'LT', category: 'Rostlinné oleje' },
  { name: 'Hesthetic Life Private Limited', url: 'https://hesthetic.com', country: 'IN', category: 'Rostlinné oleje' },
  { name: 'CANAH INTERNATIONAL S.R.L.', url: 'https://www.canah.com', country: 'RO', category: 'Rostlinné oleje' },
]

const countryLabel: Record<string, string> = {
  CZ: 'Česká republika 🇨🇿',
  SK: 'Slovensko 🇸🇰',
  LT: 'Litva 🇱🇹',
  IN: 'Indie 🇮🇳',
  RO: 'Rumunsko 🇷🇴',
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
            <h2 className="text-xl font-semibold text-gray-700 mb-4 pb-2 border-b border-gray-200">
              {countryLabel[country] ?? country}
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {refs.map((ref) => (
                <a
                  key={ref.name}
                  href={ref.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white rounded-xl border border-gray-200 p-5 hover:border-green-300 hover:shadow-md transition-all group"
                >
                  <p className="font-semibold text-gray-900 group-hover:text-green-700 transition-colors">{ref.name}</p>
                  <p className="text-sm text-gray-500 mt-1">{ref.category}</p>
                  <p className="text-xs text-green-700 mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
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
