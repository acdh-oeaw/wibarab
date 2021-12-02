import type { StringParams } from '@stefanprobst/next-route-manifest'
import dynamic from 'next/dynamic'
import { Fragment, memo } from 'react'

import { config } from '@/lib/cms/cms.config'
import { ArticlePagePreview } from '@/lib/cms/previews/ArticlePagePreview'
import { SectionPreview } from '@/lib/cms/previews/SectionPreview'
import { PageMetadata } from '@/lib/core/metadata/PageMetadata'
import type { PageWithLayout } from '@/pages/_app.page'

const CMS = dynamic(
  async () => {
    const { default: CMS } = await import('netlify-cms-app')

    CMS.registerPreviewStyle('/assets/cms/styles/tailwind.css')
    CMS.registerPreviewStyle('/assets/cms/styles/index.css')

    CMS.registerPreviewTemplate('blog', memo(ArticlePagePreview))
    CMS.registerPreviewTemplate('about', memo(SectionPreview))

    CMS.init({ config })

    return Fragment
  },
  {
    ssr: false,
    loading: function Loading(props) {
      const { error, pastDelay, retry, timedOut } = props

      const message =
        error != null ? (
          <div>
            Failed to load CMS! <button onClick={retry}>Retry</button>
          </div>
        ) : timedOut === true ? (
          <div>
            Taking a long time to load CMS&hellip; <button onClick={retry}>Retry</button>
          </div>
        ) : pastDelay === true ? (
          <div>Loading CMS&hellip;</div>
        ) : null

      return <div className="grid min-h-screen place-items-center">{message}</div>
    },
  },
)

export namespace AdminPage {
  export type PathParamsInput = never
  export type PathParams = StringParams<PathParamsInput>
  export type SearchParamsInput = never
  export type Props = Record<string, never>
}

export default function AdminPage(_props: AdminPage.Props): JSX.Element {
  return (
    <Fragment>
      <PageMetadata nofollow noindex title="CMS" />
      <div id="nc-root" />
      <CMS />
    </Fragment>
  )
}

const Page: PageWithLayout<AdminPage.Props> = AdminPage

Page.getLayout = (page) => {
  return page
}

// @refresh reset
