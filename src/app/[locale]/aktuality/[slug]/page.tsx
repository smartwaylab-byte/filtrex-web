import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getTranslations, getLocale } from 'next-intl/server'
import { getPostBySlug, getPosts } from '@/lib/sanity/queries'
import { urlFor } from '@/lib/sanity/client'
import { getVideoEmbedUrl } from '@/lib/video'
import PortableTextBody from '@/components/blog/PortableTextBody'

export const revalidate = 60

export async function generateStaticParams() {
  try {
    const posts = await getPosts()
    return posts.map((p) => ({ slug: p.slug.current }))
  } catch {
    return []
  }
}

export default async function PostDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) notFound()

  const t = await getTranslations('news')
  const locale = await getLocale()
  const prefix = locale === 'cs' ? '' : `/${locale}`
  const videoEmbedUrl = post.videoUrl ? getVideoEmbedUrl(post.videoUrl) : null

  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <Link
        href={`${prefix}/aktuality`}
        className="inline-flex items-center gap-1.5 text-brand text-sm font-medium hover:text-brand-dark mb-8"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        {t('back')}
      </Link>

      <p className="text-sm text-gray-400 mb-3">
        {new Date(post.publishedAt).toLocaleDateString('cs-CZ')}
      </p>
      <h1 className="text-4xl font-bold text-gray-900 mb-6">{post.title}</h1>

      {post.excerpt && (
        <p className="text-xl text-gray-600 mb-8 leading-relaxed border-l-4 border-brand pl-4">
          {post.excerpt}
        </p>
      )}

      {post.mainImage && (
        <div className="aspect-[16/9] relative rounded-2xl overflow-hidden mb-10 bg-gray-100">
          <Image
            src={urlFor(post.mainImage).width(1200).height(675).url()}
            alt={post.title}
            fill
            className="object-cover"
          />
        </div>
      )}

      {videoEmbedUrl && (
        <div className="aspect-[16/9] relative rounded-2xl overflow-hidden mb-10 bg-gray-100">
          <iframe
            src={videoEmbedUrl}
            title={post.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
          />
        </div>
      )}

      {post.body && <PortableTextBody value={post.body as unknown[]} />}
    </article>
  )
}
