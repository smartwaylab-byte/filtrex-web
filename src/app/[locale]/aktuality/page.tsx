import Link from 'next/link'
import Image from 'next/image'
import { getTranslations, getLocale } from 'next-intl/server'
import { getPosts } from '@/lib/sanity/queries'
import { urlFor } from '@/lib/sanity/client'

export const revalidate = 60

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
        <div className="grid md:grid-cols-2 gap-8">
          {posts.map((post) => (
            <Link
              key={post._id}
              href={`${prefix}/aktuality/${post.slug.current}`}
              className="group bg-white rounded-2xl border border-gray-200 overflow-hidden hover:border-brand/40 hover:shadow-lg transition-all"
            >
              {post.mainImage && (
                <div className="aspect-[16/9] relative overflow-hidden bg-gray-100">
                  <Image
                    src={urlFor(post.mainImage).width(800).height(450).url()}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              <div className="p-6">
                <p className="text-sm text-gray-400 mb-2">
                  {new Date(post.publishedAt).toLocaleDateString('cs-CZ')}
                </p>
                <h2 className="text-xl font-bold text-gray-900 group-hover:text-brand transition-colors mb-2">
                  {post.title}
                </h2>
                <p className="text-gray-600 text-sm line-clamp-3">{post.excerpt}</p>
                <span className="inline-flex items-center gap-1 mt-4 text-brand text-sm font-semibold">
                  {t('read_more')}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
