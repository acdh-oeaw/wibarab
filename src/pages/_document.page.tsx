import { InitialThemeScript } from '@stefanprobst/next-theme'
import { Head, Html, Main, NextScript } from 'next/document'

export default function Document(): JSX.Element {
  return (
    <Html lang="en" translate="no">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+Display:ital,wght@0,400..700;1,400..700&display=swap"
          rel="stylesheet"
        />
        <InitialThemeScript />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
