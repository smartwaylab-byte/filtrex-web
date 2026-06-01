import { sanityClient } from './client'

export type Post = {
  _id: string
  title: string
  slug: { current: string }
  excerpt: string
  body: unknown[]
  mainImage?: { asset: { _ref: string } }
  publishedAt: string
}

export async function getPosts(): Promise<Post[]> {
  return sanityClient.fetch(
    `*[_type == "post"] | order(publishedAt desc) {
      _id, title, slug, excerpt, mainImage, publishedAt
    }`
  )
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  return sanityClient.fetch(
    `*[_type == "post" && slug.current == $slug][0] {
      _id, title, slug, excerpt, body, mainImage, publishedAt
    }`,
    { slug }
  )
}
