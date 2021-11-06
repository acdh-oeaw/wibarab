/* @ts-expect-error Missing module declaration. */
const pluginTypography = require('@tailwindcss/typography')

module.exports = {
  content: ['src/**/*.tsx', 'src/styles/**/*.css'],
  darkMode: false,
  theme: {
    extend: {
      borderRadius: {
        DEFAULT: 'var(--border-radius)',
      },
      colors: {
        accent: 'var(--color-accent)',
        background: 'var(--color-background)',
        glow: 'var(--color-glow)',
        text: 'var(--color-text)',
        'text-highlighted': 'var(--color-text-highlighted)',
        'text-muted': 'var(--color-text-muted)',
      },
      typography(/** @type {(key: string) => string} */ theme) {
        return {
          DEFAULT: {
            css: {
              color: theme('colors.text'),
              a: {
                color: theme('colors.text'),
                '&:hover': {
                  color: theme('colors.text-highlighted'),
                },
                '&:focus-visible': {
                  color: theme('colors.text-highlighted'),
                },
              },
              strong: {
                color: theme('colors.text'),
              },
              'h1, h2, h3, h4': {
                color: theme('colors.text'),
              },
            },
          },
        }
      },
    },
  },
  variants: {
    extend: {},
    /** Disable responsive variants. */
    typography: [],
  },
  plugins: [pluginTypography],
}
