import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts')

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.sanity.io' },
      { protocol: 'https', hostname: 'www.filtrex.cz' },
    ],
  },
  async redirects() {
    return [
      // Staré CZ stránky (/cs/*.html) z předchozího statického webu
      { source: '/cs/kontakt.html', destination: '/kontakt', permanent: true },
      { source: '/cs/o-nas.html', destination: '/', permanent: true },
      { source: '/cs/produkty.html', destination: '/produkty', permanent: true },
      { source: '/cs/nabidka-filtru.html', destination: '/produkty', permanent: true },
      { source: '/cs/reference.html', destination: '/reference', permanent: true },
      { source: '/cs/certifikaty.html', destination: '/produkty', permanent: true },
      { source: '/cs/filtrace-podle-odvetvi.html', destination: '/produkty', permanent: true },
      { source: '/cs/prislusenstvi.html', destination: '/produkty', permanent: true },
      { source: '/cs/blog.html', destination: '/aktuality', permanent: true },
      { source: '/cs/blog/filtry-pro-etiopii-na-vyrobu-likeru.html', destination: '/aktuality', permanent: true },
      { source: '/cs/blog/specialni-filtry-d18-pro-velkou-zakazku-do-ciny.html', destination: '/aktuality', permanent: true },
      { source: '/cs/blog/ucinnost-filtrace-zvysuje-pridani-celulozy.html', destination: '/aktuality', permanent: true },
      { source: '/cs/akce-vyhodna-nabidka-filtru-d-18.html', destination: '/produkty/filtrex-d18-2020', permanent: true },
      { source: '/cs/produkty/filtry-pro-prumysl.html', destination: '/produkty', permanent: true },
      { source: '/cs/produkty/filtr-vino-lihoviny-olej.html', destination: '/produkty/filtrex-d18-2020', permanent: true },
      { source: '/cs/produkty/akce-sleva-20-na-filtr-d11-4040.html', destination: '/produkty/filtrex-d11-4040', permanent: true },
      { source: '/cs/produkty/hlo-01-ekonom.html', destination: '/produkty', permanent: true },
      { source: '/cs/produkty/sestava-hf-10040.html', destination: '/produkty', permanent: true },

      // Staré DE stránky
      { source: '/de.html', destination: '/de', permanent: true },
      { source: '/de/kontakt.html', destination: '/de/kontakt', permanent: true },
      { source: '/de/referenzen.html', destination: '/de/reference', permanent: true },
      { source: '/de/ueber-uns.html', destination: '/de', permanent: true },
      { source: '/de/filterangebot.html', destination: '/de/produkty', permanent: true },

      // Staré EN stránky
      { source: '/en.html', destination: '/en', permanent: true },
      { source: '/en/about-us.html', destination: '/en', permanent: true },
      { source: '/en/contact.html', destination: '/en/kontakt', permanent: true },
      { source: '/en/references.html', destination: '/en/reference', permanent: true },
      { source: '/en/filters.html', destination: '/en/produkty', permanent: true },
      { source: '/en/filters/filters-for-industry.html', destination: '/en/produkty', permanent: true },
      { source: '/en/filters/filter-wine-spirits-oil.html', destination: '/en/produkty/filtrex-d18-2020', permanent: true },

      // Staré PDF produktové listy a návody (/media/*.pdf)
      { source: '/media/filtrex_d_11.pdf', destination: '/produkty/filtrex-d11-4040', permanent: true },
      { source: '/media/filtrex_d_12.pdf', destination: '/produkty', permanent: true },
      { source: '/media/filtrex_d_18.pdf', destination: '/produkty/filtrex-d18-2020', permanent: true },
      { source: '/media/D11_alkohol.pdf', destination: '/produkty/filtrex-d11-4040', permanent: true },
      { source: '/media/D11_olej.pdf', destination: '/produkty/filtrex-d11-4040', permanent: true },
      { source: '/media/D12_alkohol.pdf', destination: '/produkty', permanent: true },
      { source: '/media/D12_olej.pdf', destination: '/produkty', permanent: true },
      { source: '/media/D18_alkohol.pdf', destination: '/produkty/filtrex-d18-2020', permanent: true },
      { source: '/media/D18_olej.pdf', destination: '/produkty/filtrex-d18-2020', permanent: true },
      { source: '/media/LisHLO-01EKONOM/HLO-01EKONOM_navod.pdf', destination: '/produkty', permanent: true },
      { source: '/media/LisHLO-01EKONOM/HLO-01EKONOM_produktovylist_deutsch.pdf', destination: '/de/produkty', permanent: true },
      { source: '/media/filtrex_lis_navod.pdf', destination: '/produkty', permanent: true },

      // Ještě starší verze webu (pre-2015, statické .htm stránky)
      { source: '/czech', destination: '/', permanent: true },
      { source: '/deutsch', destination: '/de', permanent: true },
      { source: '/english', destination: '/en', permanent: true },
      { source: '/index.htm', destination: '/', permanent: true },
      { source: '/index_de.htm', destination: '/de', permanent: true },
      { source: '/index_en.htm', destination: '/en', permanent: true },
    ]
  },
}

export default withNextIntl(nextConfig)
