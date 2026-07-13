import { defineType, defineField } from 'sanity'

export const postSchema = defineType({
  name: 'post',
  title: 'Příspěvek',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Nadpis', type: 'string', validation: (R) => R.required() }),
    defineField({ name: 'slug', title: 'URL slug', type: 'slug', options: { source: 'title' }, validation: (R) => R.required() }),
    defineField({ name: 'publishedAt', title: 'Datum publikace', type: 'datetime', initialValue: () => new Date().toISOString() }),
    defineField({ name: 'excerpt', title: 'Krátký popis', type: 'text', rows: 3 }),
    defineField({ name: 'mainImage', title: 'Hlavní obrázek', type: 'image', options: { hotspot: true } }),
    defineField({
      name: 'videoUrl',
      title: 'Video',
      type: 'url',
      description: 'Odkaz na YouTube video (nepovinné)',
    }),
    defineField({
      name: 'body',
      title: 'Obsah',
      type: 'array',
      of: [
        { type: 'block' },
        { type: 'image', options: { hotspot: true } },
      ],
    }),
  ],
  preview: {
    select: { title: 'title', media: 'mainImage', date: 'publishedAt' },
    prepare({ title, media, date }) {
      return { title, media, subtitle: date ? new Date(date).toLocaleDateString('cs-CZ') : '' }
    },
  },
})
