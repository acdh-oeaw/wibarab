import type { Theme } from '@stefanprobst/next-theme'
import { useTheme } from '@stefanprobst/next-theme'
import type { FC, SVGProps } from 'react'

import MoonIcon from '~/public/assets/icons/moon.svg?symbol'
import SunIcon from '~/public/assets/icons/sun.svg?symbol'

export function ThemeToggleButton(): JSX.Element | null {
  const { theme, toggleTheme } = useTheme()

  if (theme == null) return null

  const icons: Record<Theme, FC<SVGProps<SVGSVGElement>>> = {
    light: MoonIcon,
    dark: SunIcon,
  }

  const Icon = icons[theme]

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="py-2 text-text hover:text-text-highlighted focus-visible:text-text-highlighted"
    >
      <Icon aria-hidden width={20} height={20} />
    </button>
  )
}
