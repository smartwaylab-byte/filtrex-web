import Image from 'next/image'
import { urlFor } from '@/lib/sanity/client'
import type { SanityImageRef } from '@/lib/sanity/queries'

type Props = {
  images: SanityImageRef[]
  alt: string
  /** Extra classes for the outer 16:9 box (e.g. `rounded-2xl`). */
  className?: string
  /** Zoom the photos on hover of a parent `.group` element. */
  hoverZoom?: boolean
  /** `sizes` hint for one cell at its largest rendered width. */
  sizes?: string
}

function src(img: SanityImageRef, w: number, h: number) {
  return urlFor(img).width(w).height(h).fit('crop').auto('format').url()
}

export default function PostImageGrid({ images, alt, className = '', hoverZoom = false, sizes }: Props) {
  const imgs = images.slice(0, 4)
  if (imgs.length === 0) return null

  const zoom = hoverZoom
    ? 'transition-transform duration-300 group-hover:scale-105'
    : ''

  const cell = (img: SanityImageRef, w: number, h: number, extra = '') => (
    <div className={`relative h-full w-full overflow-hidden ${extra}`}>
      <Image src={src(img, w, h)} alt={alt} fill sizes={sizes} className={`object-cover ${zoom}`} />
    </div>
  )

  return (
    <div className={`aspect-[16/9] relative overflow-hidden bg-gray-100 ${className}`}>
      {imgs.length === 1 && cell(imgs[0], 1600, 900)}

      {imgs.length === 2 && (
        <div className="absolute inset-0 grid grid-cols-2 grid-rows-1 gap-0.5">
          {cell(imgs[0], 800, 900)}
          {cell(imgs[1], 800, 900)}
        </div>
      )}

      {imgs.length === 3 && (
        <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-0.5">
          {cell(imgs[0], 800, 900, 'row-span-2')}
          {cell(imgs[1], 800, 450)}
          {cell(imgs[2], 800, 450)}
        </div>
      )}

      {imgs.length === 4 && (
        <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-0.5">
          {cell(imgs[0], 800, 450)}
          {cell(imgs[1], 800, 450)}
          {cell(imgs[2], 800, 450)}
          {cell(imgs[3], 800, 450)}
        </div>
      )}
    </div>
  )
}
