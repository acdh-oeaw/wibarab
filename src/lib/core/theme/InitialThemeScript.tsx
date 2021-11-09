import Head from 'next/head'

import { localStorageKey, dataAttribute, themes } from '@/lib/core/theme/theme.config'

const setInitialThemeScript = `const theme = localStorage.getItem('${localStorageKey}')
if (
  theme === '${themes.dark}' ||
  matchMedia('(prefers-color-scheme: ${themes.dark})').matches
) {
  document.documentElement.dataset['${dataAttribute}'] = '${themes.dark}'
} else {
  document.documentElement.dataset['${dataAttribute}'] = '${themes.light}'
}`

export function InitialThemeScript(): JSX.Element {
  return (
    <Head>
      <script id="set-initial-theme" dangerouslySetInnerHTML={{ __html: setInitialThemeScript }} />
    </Head>
  )
}
