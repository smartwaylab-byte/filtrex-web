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
    defineField({
      name: 'images',
      title: 'Obrázky',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
      options: { layout: 'grid' },
      validation: (R) => R.max(4),
      description:
        '1 až 4 fotky. Jedna fotka vyplní celou plochu. Dvě se zobrazí vedle sebe, tři nebo čtyři se rozdělí do mřížky ve stejném prostoru. Pořadí lze měnit tažením.',
    }),
    defineField({
      name: 'mainImage',
      title: 'Hlavní obrázek (starší – použij raději pole „Obrázky“ výše)',
      type: 'image',
      options: { hotspot: true },
      hidden: ({ document }) => Array.isArray(document?.images) && document.images.length > 0,
    }),
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
    select: { title: 'title', media: 'mainImage', gallery: 'images.0', date: 'publishedAt' },
    prepare({ title, media, gallery, date }) {
      return { title, media: gallery || media, subtitle: date ? new Date(date).toLocaleDateString('cs-CZ') : '' }
    },
  },
})
