import type { FC, SVGProps } from 'react'
import { useEffect, useState } from 'react'

import { themeStore } from '@/lib/core/theme/theme'
import type { Theme } from '@/lib/core/theme/theme.config'
import { themes } from '@/lib/core/theme/theme.config'
import { Svg as MoonIcon } from '~/public/assets/icons/moon.svg'
import { Svg as SunIcon } from '~/public/assets/icons/sun.svg'

export function ThemeToggleButton(): JSX.Element | null {
  const [theme, setTheme] = useState<Theme | null>(null)

  useEffect(() => {
    setTheme(themeStore.get())
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
      className="py-2 text-text hover:text-text-highlighted focus-visible:text-text-highlighted"
    >
      <Icon aria-hidden width={20} height={20} />
    </button>
  )
}
