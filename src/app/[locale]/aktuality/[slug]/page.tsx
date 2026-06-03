import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'
import { getPostBySlug, getPosts } from '@/lib/sanity/queries'
import { urlFor } from '@/lib/sanity/client'
import { PortableText } from '@portabletext/react'

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

  return <PostDetailClient post={post} />
}

function PostDetailClient({ post }: { post: NonNullable<Awaited<ReturnType<typeof getPostBySlug>>> }) {
  const t = useTranslations('news')
  const locale = useLocale()
  const prefix = locale === 'cs' ? '' : `/${locale}`

  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <Link href={`${prefix}/aktuality`} className="inline-flex items-center gap-1.5 text-brand text-sm font-medium hover:text-brand-dark mb-8">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        {t('back')}
      </Link>

      <p className="text-sm text-gray-400 mb-3">{new Date(post.publishedAt).toLocaleDateString('cs-CZ')}</p>
      <h1 className="text-4xl font-bold text-gray-900 mb-6">{post.title}</h1>

      {post.mainImage && (
        <div className="aspect-[16/9] relative rounded-2xl overflow-hidden mb-10 bg-gray-100">
          <Image src={urlFor(post.mainImage).width(1200).height(675).url()} alt={post.title} fill className="object-cover" />
        </div>
      )}

      <div className="prose prose-lg prose-green max-w-none">
        {post.body && <PortableText value={post.body as any} />}
      </div>
    </article>
  )
}
