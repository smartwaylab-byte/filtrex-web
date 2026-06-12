import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { csCZLocale } from '@sanity/locale-cs-cz'
import { schemaTypes } from './sanity/schemas'

export default defineConfig({
  name: 'filtrex',
  title: 'Filtrex – správa obsahu',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? 'DOPLNIT',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  basePath: '/studio',
  plugins: [structureTool(), visionTool(), csCZLocale()],
  schema: { types: schemaTypes },
})
