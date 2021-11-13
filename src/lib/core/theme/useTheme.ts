import { useState, useEffect } from 'react'

import { themeStore } from '@/lib/core/theme/theme'
import type { Theme } from '@/lib/core/theme/theme.config'
import { themes } from '@/lib/core/theme/theme.config'

export interface UseThemeResult {
  theme: Theme | null
  toggleTheme: () => void
}

export function useTheme(): UseThemeResult {
  const [theme, setTheme] = useState<Theme | null>(null)

  useEffect(() => {
    setTheme(themeStore.get())
  }, [])

  useEffect(() => {
    if (theme != null) {
      themeStore.set(theme)
    }
  }, [theme])

  function toggleTheme() {
    setTheme((currentTheme) => {
      return currentTheme === themes.light ? themes.dark : themes.light
    })
  }

  return { theme, toggleTheme }
}
