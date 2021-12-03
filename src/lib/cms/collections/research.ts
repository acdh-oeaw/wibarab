import type { CmsCollection } from 'netlify-cms-core'

export const collection: CmsCollection = {
  name: 'research',
  label: 'Research',
  label_singular: 'Research',
  slug: '{{slug}}',
  format: 'json',
  folder: 'src/components/research/data',
  create: true,
  media_folder: '/public/assets/cms/documents',
  public_folder: '/assets/cms/documents',
  fields: [
    {
      name: 'title',
      label: 'Title',
    },
    {
      name: 'description',
      label: 'Description',
      widget: 'text',
    },
    {
      name: 'document',
      label: 'Document',
      widget: 'file',
    },
  ],
}
