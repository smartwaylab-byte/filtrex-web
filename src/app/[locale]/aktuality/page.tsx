import type { Metadata } from 'next'
import { getTranslations, getLocale } from 'next-intl/server'
import { getPosts } from '@/lib/sanity/queries'
import AktualityList from '@/components/blog/AktualityList'
import { buildAlternates } from '@/lib/seo'

export const revalidate = 60

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'news' })
  return {
    title: t('title'),
    description: t('subtitle'),
    alternates: buildAlternates(locale, '/aktuality'),
  }
}

export default async function AktualityPage() {
  const t = await getTranslations('news')
  const locale = await getLocale()
  const prefix = locale === 'cs' ? '' : `/${locale}`
  let posts: Awaited<ReturnType<typeof getPosts>> = []
  try { posts = await getPosts() } catch { posts = [] }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{t('title')}</h1>
        <p className="text-lg text-gray-600">{t('subtitle')}</p>
      </div>

      {posts.length === 0 ? (
        <p className="text-gray-500">{t('no_posts')}</p>
      ) : (
        <AktualityList posts={posts} prefix={prefix} />
      )}
    </div>
  )
}
