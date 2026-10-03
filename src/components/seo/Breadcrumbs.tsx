import Link from 'next/link'
import { breadcrumbSchema } from '@/lib/seo'
import JsonLd from '@/components/seo/JsonLd'

export default function Breadcrumbs({ items }: { items: { name: string; path: string }[] }) {
  return (
    <>
      <JsonLd data={breadcrumbSchema(items)} />
      <nav aria-label="Drobečková navigace" className="text-sm text-gray-500 mb-6">
        <ol className="flex flex-wrap items-center gap-2">
          {items.map((item, i) => {
            const isLast = i === items.length - 1
            return (
              <li key={item.path} className="flex items-center gap-2">
                {i > 0 && <span aria-hidden="true">/</span>}
                {isLast ? (
                  <span aria-current="page" className="text-gray-900">{item.name}</span>
                ) : (
                  <Link href={item.path} className="hover:text-brand transition-colors">{item.name}</Link>
                )}
              </li>
            )
          })}
        </ol>
      </nav>
    </>
  )
}
