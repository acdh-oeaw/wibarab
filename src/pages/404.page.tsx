import { PageMainContent } from '@/components/PageMainContent'
import { PageSection } from '@/components/PageSection'
import type { PageParams } from '@/lib/core/navigation/types'

export type NotFoundPageParamsInput = Record<string, never>
export type NotFoundPageParams = PageParams<NotFoundPageParamsInput>
export type NotFoundPageProps = Record<string, never>

export default function NotFoundPage(_props: NotFoundPageProps): JSX.Element {
  return (
    <PageMainContent>
      <PageSection className="h-full">
        <div className="grid self-stretch place-items-center" role="alert">
          <p>Sorry, this page does not exist.</p>
        </div>
      </PageSection>
    </PageMainContent>
  )
}
