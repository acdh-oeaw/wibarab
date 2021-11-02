import Head from 'next/head'
import type { FC, SVGProps } from 'react'
import { useEffect, useState } from 'react'

import { Svg as MoonIcon } from '~/public/assets/icons/moon.svg'
import { Svg as SunIcon } from '~/public/assets/icons/sun.svg'

export const themes = ['light', 'dark'] as const

export type Theme = typeof themes[number]

const themeKey = '__theme__'

function isValidTheme(theme: string): theme is Theme {
  return themes.includes(theme as Theme)
}

const themeStore = {
  get() {
    const theme = localStorage.getItem(themeKey)
    if (theme == null || !isValidTheme(theme)) return null
    return theme
  },
  set(theme: Theme) {
    localStorage.setItem(themeKey, theme)

    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  },
}

export function ThemeToggleButton(): JSX.Element | null {
  const [theme, setTheme] = useState<Theme | null>(null)

  useEffect(() => {
    setTheme(themeStore.get() ?? 'light')
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
      return currentTheme === 'light' ? 'dark' : 'light'
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

const initialThemeScript = `const theme = localStorage.getItem('${themeKey}')
if (theme != null) {
  if (theme === 'dark') {
    document.documentElement.classList.add('dark')
  }
} else if (matchMedia('(prefers-color-scheme: dark)').matches) {
  document.documentElement.classList.add('dark')
  localStorage.setItem('${themeKey}', 'dark')
}`
