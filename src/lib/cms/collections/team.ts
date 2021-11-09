import type { CmsCollection } from 'netlify-cms-core'

export const collection: CmsCollection = {
  name: 'team',
  label: 'Team',
  label_singular: 'Team member',
  identifier_field: 'name',
  slug: '{{slug}}',
  format: 'json',
  folder: 'src/components/home/team',
  create: true,
  fields: [
    {
      name: 'name',
      label: 'Name',
    },
    {
      name: 'email',
      label: 'Email',
    },
    {
      name: 'bio',
      label: 'Bio',
      widget: 'text',
    },
  ],
}
