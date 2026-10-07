import type { MetadataRoute } from 'next'
import { routing } from '@/i18n/routing'
import { products } from '@/lib/products'
import { getPosts } from '@/lib/sanity/queries'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://filtrex.cz'

function localizedUrl(locale: string, path: string) {
  const prefix = locale === routing.defaultLocale ? '' : `/${locale}`
  return `${baseUrl}${prefix}${path}`
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let posts: Awaited<ReturnType<typeof getPosts>> = []
  try {
    posts = await getPosts()
  } catch {
    posts = []
  }

  const staticPaths = ['', '/produkty', '/reference', '/aktuality', '/kontakt', '/poptavka']
  // Jen česky - obsah není přeložený, ostatní jazykové varianty mají noindex (viz generateMetadata)
  const legalPaths = ['/obchodni-podminky', '/ochrana-osobnich-udaju', '/copyright']
  const productPaths = products.map((p) => `/produkty/${p.slug}`)
  const postPaths = posts.map((p) => `/aktuality/${p.slug.current}`)

  const paths = [...staticPaths, ...productPaths, ...postPaths]

  return [
    ...paths.flatMap((path) =>
      routing.locales.map((locale) => ({
        url: localizedUrl(locale, path),
        lastModified: new Date(),
      }))
    ),
    ...legalPaths.map((path) => ({
      url: localizedUrl(routing.defaultLocale, path),
      lastModified: new Date(),
    })),
  ]
}
