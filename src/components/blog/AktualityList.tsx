'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { urlFor } from '@/lib/sanity/client'
import type { Post } from '@/lib/sanity/queries'

const PAGE_SIZE = 6

export default function AktualityList({ posts, prefix }: { posts: Post[]; prefix: string }) {
  const t = useTranslations('news')
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)
  const visiblePosts = posts.slice(0, visibleCount)
  const hasMore = visibleCount < posts.length

  return (
    <>
      <div className="grid md:grid-cols-2 gap-8">
        {visiblePosts.map((post) => (
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
