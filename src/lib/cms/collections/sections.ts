import type { CmsCollection } from 'netlify-cms-core'

export const collection: CmsCollection = {
  name: 'sections',
  label: 'Sections',
  label_singular: 'Section',
  editor: {
    preview: true,
  },
  format: 'frontmatter',
  extension: 'mdx',
  files: [
    {
      name: 'intro',
      label: 'Introduction',
      file: 'src/components/home/Intro.mdx',
      fields: [
        {
          name: 'title',
          label: 'Title',
        },
        {
          name: 'body',
          label: 'Content',
          widget: 'markdown',
        },
      ],
    },
    {
      name: 'about',
      label: 'About the project',
      file: 'src/components/home/About.mdx',
      fields: [
        {
          name: 'title',
          label: 'Title',
        },
        {
          name: 'body',
          label: 'Content',
          widget: 'markdown',
        },
      ],
    },
  ],
}
