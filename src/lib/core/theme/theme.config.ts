export const themes = { light: 'light', dark: 'dark' } as const

export type Theme = keyof typeof themes

export const defaultTheme: Theme = 'light'

export const dataAttribute = 'theme'

export const localStorageKey = '__theme__'
