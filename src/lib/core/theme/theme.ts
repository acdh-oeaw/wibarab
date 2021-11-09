import { localStorageKey, dataAttribute, themes, defaultTheme } from '@/lib/core/theme/theme.config'
import type { Theme } from '@/lib/core/theme/theme.config'

export function isValidTheme(theme: string): theme is Theme {
  return Object.prototype.hasOwnProperty.call(themes, theme)
}

export const themeStore = {
  get(): Theme {
    const theme =
      (document.documentElement.dataset[dataAttribute] as Theme | undefined) ??
      localStorage.getItem(localStorageKey)
    if (theme == null || !isValidTheme(theme)) return defaultTheme
    return theme
  },
  set(theme: Theme): void {
    document.documentElement.dataset[dataAttribute] = theme
    localStorage.setItem(localStorageKey, theme)
  },
}
