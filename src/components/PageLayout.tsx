import type { AppProps } from 'next/app'
import type { ReactNode } from 'react'

import { PageFooter } from '@/components/PageFooter'
import { PageHeader } from '@/components/PageHeader'
import { SkipLink } from '@/components/SkipLink'

export interface PageLayoutProps {
  children?: ReactNode
  pageProps: AppProps['pageProps']
}

export function PageLayout(props: PageLayoutProps): JSX.Element {
  return (
    <div className="page-layout">
      <SkipLink>Skip to main content</SkipLink>
      <PageHeader />
      {props.children}
      <PageFooter />
    </div>
  )
}
