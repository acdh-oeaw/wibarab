import 'tailwindcss/tailwind.css'
import '@/styles/index.css'

import { InitialThemeScript } from '@stefanprobst/next-theme'
import type { AppProps as NextAppProps, NextWebVitalsMetric } from 'next/app'
import Head from 'next/head'
import { Fragment } from 'react'

import { PageLayout } from '@/components/PageLayout'
import { reportPageView } from '@/lib/core/analytics/analytics-service'
import { AnalyticsScript } from '@/lib/core/analytics/AnalyticsScript'
import { createSiteUrl } from '@/lib/utils'
import { feed, webManifest } from '~/config/site.config'

export interface GetLayout {
  (page: JSX.Element, pageProps: AppProps['pageProps']): JSX.Element
}

export type PageWithLayout<T = unknown> = NextAppProps<T>['Component'] & {
  getLayout?: GetLayout | undefined
}

export interface AppProps extends NextAppProps {
  Component: PageWithLayout
}

export default function App(props: AppProps): JSX.Element {
  const { Component, pageProps } = props

  const getLayout = Component.getLayout ?? getDefaultLayout

  return (
    <Fragment>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href={String(createSiteUrl({ pathname: webManifest }))} />

        <link
          rel="alternate"
          type="application/rss+xml"
          title="RSS"
          href={String(createSiteUrl({ pathname: feed }))}
        />
      </Head>
      <InitialThemeScript />
      <AnalyticsScript />
      {getLayout(<Component {...pageProps} />, pageProps)}
    </Fragment>
  )
}

const getDefaultLayout: GetLayout = function getDefaultLayout(page, pageProps) {
  return <PageLayout pageProps={pageProps}>{page}</PageLayout>
}

export function reportWebVitals(metric: NextWebVitalsMetric): void {
  switch (metric.name) {
    case 'Next.js-hydration':
      /** Register right after hydration. */
      break
    case 'Next.js-route-change-to-render':
      /** Register page views after client-side transitions. */
      reportPageView()
      break
    default:
      break
  }
}
