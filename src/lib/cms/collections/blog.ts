import type { CmsCollection } from 'netlify-cms-core'

export const collection: CmsCollection = {
  name: 'blog',
  label: 'Blog',
  label_singular: 'Article',
  editor: {
    preview: true,
  },
  format: 'frontmatter',
  extension: 'page.mdx',
  folder: 'src/pages/blog',
  create: true,
  fields: [
    {
      name: 'title',
      label: 'Title',
    },
    {
      name: 'authors',
      label: 'Authors',
      widget: 'relation',
      collection: 'team',
      multiple: true,
      value_field: '{{slug}}',
      search_fields: ['name'],
      display_fields: ['{{name}}'],
    },
    {
      name: 'date',
      label: 'Publication date',
      widget: 'datetime',
      date_format: 'DD/MM/YYYY',
      time_format: false,
      picker_utc: true,
      default: '',
    },
    {
      name: 'abstract',
      label: 'Abstract',
      widget: 'text',
    },
    {
      name: 'leadIn',
      label: 'Lead in',
      widget: 'text',
    },
    {
      name: 'featuredImage',
      label: 'Featured image',
      widget: 'image',
    },
    {
      name: 'body',
      label: 'Content',
      widget: 'markdown',
    },
  ],
}
