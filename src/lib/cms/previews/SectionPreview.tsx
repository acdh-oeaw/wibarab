import type { PreviewTemplateComponentProps } from 'netlify-cms-core'

import { PageSection } from '@/components/PageSection'
import { PageSectionTitle } from '@/components/PageSectionTitle'
import { Spacer } from '@/components/Spacer'
import { Mdx } from '@/lib/cms/components/Mdx'
import { Preview } from '@/lib/cms/previews/Preview'

export type SectionPreviewProps = PreviewTemplateComponentProps

export function SectionPreview(props: SectionPreviewProps): JSX.Element {
  const { entry } = props

  const title = entry.getIn(['data', 'title'])
  const content = entry.getIn(['data', 'body'])

  return (
    <Preview>
      <Spacer />
      <PageSection>
        <PageSectionTitle>{title}</PageSectionTitle>
        <Mdx className="prose" mdx={content} />
      </PageSection>
      <Spacer />
    </Preview>
  )
}
