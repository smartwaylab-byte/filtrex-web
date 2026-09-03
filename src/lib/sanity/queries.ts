import { sanityClient } from './client'

export type SanityImageRef = {
  asset: { _ref: string }
  hotspot?: unknown
  crop?: unknown
}

export type Post = {
  _id: string
  title: string
  slug: { current: string }
  excerpt: string
  body: unknown[]
  mainImage?: SanityImageRef
  images?: SanityImageRef[]
  videoUrl?: string
  publishedAt: string
}

/** Fotky aktuality: nová galerie `images`, jinak fallback na starší `mainImage`. */
export function postImages(post: Post): SanityImageRef[] {
  if (post.images?.length) return post.images
  if (post.mainImage) return [post.mainImage]
  return []
}

export async function getPosts(): Promise<Post[]> {
  return sanityClient.fetch(
    `*[_type == "post"] | order(publishedAt desc) {
      _id, title, slug, excerpt, mainImage, images, videoUrl, publishedAt
    }`
  )
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  return sanityClient.fetch(
    `*[_type == "post" && slug.current == $slug][0] {
      _id, title, slug, excerpt, body, mainImage, images, videoUrl, publishedAt
    }`,
    { slug }
  )
}
