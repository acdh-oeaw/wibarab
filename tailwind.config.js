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
      fontSize: {
        'size-title': 'var(--font-size-title)',
        'size-lead-in': 'var(--font-size-lead-in)',
        'size-heading': 'var(--font-size-heading)',
        'size-text': 'var(--font-size-text)',
      },
      screens: {
        xs: '30rem',
        sm: '40rem',
        md: '48rem',
        lg: '64rem',
        xl: '80ren',
        '2xl': '96rem',
      },
      typography(/** @type {(key: string) => string} */ theme) {
        return {
          DEFAULT: {
            css: {
              color: theme('colors.text'),
              fontSize: theme('fontSize.size-text'),
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
              h1: {
                fontSize: theme('fontSize.size-title'),
              },
              h2: {
                fontSize: theme('fontSize.size-lead-in'),
              },
              h3: {
                fontSize: theme('fontSize.size-heading'),
              },
              h4: {
                fontSize: theme('fontSize.size-text'),
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
