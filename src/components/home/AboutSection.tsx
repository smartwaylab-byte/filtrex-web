import { useTranslations } from 'next-intl'

const points = ['point1', 'point2', 'point3', 'point4'] as const

export default function AboutSection() {
  const t = useTranslations('about')

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-800 text-sm font-medium mb-4">
              {t('badge')}
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              {t('title')}
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              {t('description')}
            </p>
            <ul className="space-y-3">
              {points.map((key) => (
                <li key={key} className="flex items-center gap-3 text-gray-700">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                    <svg className="w-3 h-3 text-green-700" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  {t(key)}
                </li>
              ))}
            </ul>
          </div>

          {/* Visual panel */}
          <div className="relative">
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 text-white">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: '🫙', label: 'Rostlinné oleje' },
                  { icon: '☕', label: 'Káva & nápoje' },
                  { icon: '💄', label: 'Kosmetika' },
                  { icon: '⚗️', label: 'Farmacie' },
                ].map((item) => (
                  <div key={item.label} className="bg-white/10 rounded-xl p-4 text-center hover:bg-white/15 transition-colors">
                    <div className="text-3xl mb-2">{item.icon}</div>
                    <div className="text-sm font-medium text-gray-200">{item.label}</div>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-6 border-t border-white/20 text-center">
                <p className="text-green-400 font-semibold text-sm">Technologie nanovlákna</p>
                <p className="text-gray-400 text-xs mt-1">Člen klastru NANOPROGRESS</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
