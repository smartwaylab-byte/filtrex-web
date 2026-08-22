export type Product = {
  id: string
  slug: string
  price: number
  currency: string
  stripePriceId: string
  images: string[]
  inDevelopment?: boolean
  category: 'filter' | 'membrane' | 'accessory'
}

export type ProductParameter = { label: string; value: string }

export type ProductContent = {
  name: string
  shortDescription: string
  description: string
  parameters: ProductParameter[]
}

export type LocalizedProduct = Product & ProductContent

type ProductContentTranslator = {
  (key: string): string
  raw: (key: string) => unknown
}

export const products: Product[] = [
  {
    id: 'filtrex-d18-2020',
    slug: 'filtrex-d18-2020',
    price: 0,
    currency: 'CZK',
    stripePriceId: 'price_DOPLNIT',
    images: ['/products/d18-1.jpg', '/products/d18-2.jpg'],
    category: 'filter',
  },
  {
    id: 'riftelen-n15',
    slug: 'riftelen-n15',
    price: 0,
    currency: 'CZK',
    stripePriceId: 'price_DOPLNIT',
    images: ['/products/riftelen-n15.png'],
    category: 'membrane',
  },
  {
    id: 'filtrex-d11-4040',
    slug: 'filtrex-d11-4040',
    price: 0,
    currency: 'CZK',
    stripePriceId: '',
    images: ['/products/d11.png'],
    inDevelopment: true,
    category: 'filter',
  },
]

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}

export function localizeProduct(product: Product, t: ProductContentTranslator): LocalizedProduct {
  return {
    ...product,
    name: t(`${product.slug}.name`),
    shortDescription: t(`${product.slug}.shortDescription`),
    description: t(`${product.slug}.description`),
    parameters: t.raw(`${product.slug}.parameters`) as ProductParameter[],
  }
}

export function localizeProducts(t: ProductContentTranslator): LocalizedProduct[] {
  return products.map((product) => localizeProduct(product, t))
}
