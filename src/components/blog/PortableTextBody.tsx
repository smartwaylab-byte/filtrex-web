'use client'

import { PortableText, type PortableTextComponents } from '@portabletext/react'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity/client'

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="mb-5 text-gray-700 leading-relaxed text-lg">{children}</p>
    ),
    h2: ({ children }) => (
      <h2 className="mt-10 mb-4 text-2xl font-bold text-gray-900">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-8 mb-3 text-xl font-bold text-gray-900">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="mt-6 mb-2 text-lg font-semibold text-gray-900">{children}</h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-brand pl-5 my-6 text-gray-600 italic">
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold text-gray-900">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ value, children }) => (
      <a
        href={value?.href}
        target={value?.href?.startsWith('http') ? '_blank' : undefined}
        rel={value?.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
        className="text-brand underline hover:text-brand-dark transition-colors"
      >
        {children}
      </a>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mb-5 ml-6 list-disc space-y-1 text-gray-700 text-lg">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="mb-5 ml-6 list-decimal space-y-1 text-gray-700 text-lg">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="leading-relaxed">{children}</li>,
    number: ({ children }) => <li className="leading-relaxed">{children}</li>,
  },
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null
      return (
        <div className="my-8 rounded-xl overflow-hidden shadow-md">
          <Image
            src={urlFor(value).width(900).url()}
            alt={value.alt ?? ''}
            width={900}
            height={500}
            className="w-full object-cover"
          />
        </div>
      )
    },
  },
}

export default function PortableTextBody({ value }: { value: unknown[] }) {
  return (
    <div className="mt-2">
      <PortableText
        value={value as Parameters<typeof PortableText>[0]['value']}
        components={components}
      />
    </div>
  )
}
