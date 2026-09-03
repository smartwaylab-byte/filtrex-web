'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import PostImageGrid from '@/components/blog/PostImageGrid'
import { postImages, type Post } from '@/lib/sanity/queries'

const PAGE_SIZE = 6

export default function AktualityList({ posts, prefix }: { posts: Post[]; prefix: string }) {
  const t = useTranslations('news')
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)
  const visiblePosts = posts.slice(0, visibleCount)
  const hasMore = visibleCount < posts.length

  return (
    <>
      <div className="grid md:grid-cols-2 gap-8">
        {visiblePosts.map((post) => {
          const images = postImages(post)
          return (
          <Link
            key={post._id}
            href={`${prefix}/aktuality/${post.slug.current}`}
            className="group bg-white rounded-2xl border border-gray-200 overflow-hidden hover:border-brand/40 hover:shadow-lg transition-all"
          >
            {images.length > 0 && (
              <PostImageGrid
                images={images}
                alt={post.title}
                hoverZoom
                sizes="(max-width: 768px) 100vw, 400px"
              />
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
          )
        })}
      </div>

      {hasMore && (
        <div className="mt-12 flex justify-center">
          <button
            type="button"
            onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}
            className="px-6 py-3 bg-brand-yellow text-gray-900 font-semibold rounded-lg hover:bg-amber-500 transition-colors"
          >
            {t('load_more')}
          </button>
        </div>
      )}
    </>
  )
}
