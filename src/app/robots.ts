import type { MetadataRoute } from 'next'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://filtrex.cz'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/studio', '/api', '/kosik'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
