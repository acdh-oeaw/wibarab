import { Fragment } from 'react'

import { PageMainContent } from '@/components/PageMainContent'
import { PageSection } from '@/components/PageSection'
import { PageMetadata } from '@/lib/core/metadata/PageMetadata'
import type { PageParams } from '@/lib/core/navigation/types'

export type NotFoundPageParamsInput = Record<string, never>
export type NotFoundPageParams = PageParams<NotFoundPageParamsInput>
export type NotFoundPageProps = Record<string, never>

export default function NotFoundPage(_props: NotFoundPageProps): JSX.Element {
  return (
    <Fragment>
      <PageMetadata nofollow noindex title="Not found" />
      <PageMainContent>
        <PageSection className="h-full">
          <div className="grid self-stretch place-items-center" role="alert">
            <p>Sorry, this page does not exist.</p>
          </div>
        </PageSection>
      </PageMainContent>
    </Fragment>
  )
}
