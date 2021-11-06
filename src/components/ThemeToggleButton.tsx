import Head from 'next/head'
import type { FC, SVGProps } from 'react'
import { useEffect, useState } from 'react'

import { Svg as MoonIcon } from '~/public/assets/icons/moon.svg'
import { Svg as SunIcon } from '~/public/assets/icons/sun.svg'

export const themes = { light: 'light', dark: 'dark' } as const

export type Theme = keyof typeof themes

const dataAttribute = 'theme'
const localStorageKey = '__theme__'

function isValidTheme(theme: string): theme is Theme {
  return Object.prototype.hasOwnProperty.call(themes, theme)
}

const themeStore = {
  get() {
    const theme =
      (document.documentElement.dataset[dataAttribute] as Theme | undefined) ??
      localStorage.getItem(localStorageKey)
    if (theme == null || !isValidTheme(theme)) return null
    return theme
  },
  set(theme: Theme) {
    document.documentElement.dataset[dataAttribute] = theme
    localStorage.setItem(localStorageKey, theme)
  },
}

export function ThemeToggleButton(): JSX.Element | null {
  const [theme, setTheme] = useState<Theme | null>(null)

  useEffect(() => {
    setTheme(themeStore.get() ?? themes.light)
  }, [])

  useEffect(() => {
    if (theme != null) {
      themeStore.set(theme)
    }
  }, [theme])

  if (theme == null) return null

  const icons: Record<Theme, FC<SVGProps<SVGSVGElement>>> = {
    light: MoonIcon,
    dark: SunIcon,
  }

  const Icon = icons[theme]

  function onToggleTheme() {
    setTheme((currentTheme) => {
      return currentTheme === themes.light ? themes.dark : themes.light
    })
  }

  return (
    <button
      onClick={onToggleTheme}
      aria-label="Toggle theme"
      className="text-text hover:text-text-highlighted focus-visible:text-text-highlighted"
    >
      <Icon aria-hidden width={20} height={20} />
    </button>
  )
}

export function InitialThemeScript(): JSX.Element {
  return (
    <Head>
      <script dangerouslySetInnerHTML={{ __html: initialThemeScript }} type="module" />
    </Head>
  )
}

const initialThemeScript = `const theme = localStorage.getItem('${localStorageKey}')
if (
  theme === '${themes.dark}' ||
  matchMedia('(prefers-color-scheme: ${themes.dark})').matches
) {
  document.documentElement.dataset[${dataAttribute}] = '${themes.dark}'
} else {
  document.documentElement.dataset[${dataAttribute}] = '${themes.light}'
}`
