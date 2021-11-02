import type { AppProps as NextAppProps } from 'next/app'
import Head from 'next/head'
import { Fragment } from 'react'

import { PageLayout } from '@/components/PageLayout'
import { InitialThemeScript } from '@/components/ThemeToggleButton'

import 'tailwindcss/tailwind.css'
import '@/styles/index.css'

export interface GetLayout {
  (page: JSX.Element): JSX.Element
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
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      <InitialThemeScript />
      <PageLayout pageProps={pageProps}>{getLayout(<Component {...pageProps} />)}</PageLayout>
    </Fragment>
  )
}

const getDefaultLayout: GetLayout = function getDefaultLayout(page) {
  return page
}
