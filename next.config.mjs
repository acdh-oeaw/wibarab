/* @ts-expect-error Missing module declaration. */
import createNextSvgPlugin from '@stefanprobst/next-svg'
import withParsedFrontmatter from '@stefanprobst/remark-extract-yaml-frontmatter'
import withParsedFrontmatterExport from '@stefanprobst/remark-extract-yaml-frontmatter/mdx'
import withPage from '@stefanprobst/remark-mdx-page'
import * as fs from 'fs'
import * as path from 'path'
import withFrontmatter from 'remark-frontmatter'
import withGfm from 'remark-gfm'

/** @typedef {import('next').NextConfig} NextConfig */

/** @type {NextConfig} */
const config = {
  eslint: {
    dirs: ['.'],
    // ignoreDuringBuilds: true,
  },
  future: {
    strictPostcssConfiguration: true,
  },
  async headers() {
    return [
      /** Disallow indexing by search engines. */
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'noindex, nofollow',
          },
        ],
      },
      {
        source: '/assets/fonts/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, immutable, max-age=31536000',
          },
        ],
      },
    ]
  },
  async rewrites() {
    return [
      {
        source: '/admin',
        destination: '/admin/index.html',
      },
    ]
  },
  pageExtensions: ['page.tsx', 'page.mdx', 'api.ts'],
  poweredByHeader: false,
  reactStrictMode: true,
  webpack(config, options) {
    /**
     * This is mostly copied from 'src/lib/data/team.ts` because in `next.config.mjs` we cannot
     * import typescript, and can only use synchronous functions.
     */
    function getTeamMembers() {
      const teamExtension = '.json'
      const teamFolderPath = path.join(process.cwd(), 'src', 'components', 'home', 'team')

      const folderEntries = fs.readdirSync(teamFolderPath, { withFileTypes: true })

      const team = new Map()

      for (const folderEntry of folderEntries) {
        if (folderEntry.isFile() && folderEntry.name.endsWith(teamExtension)) {
          const id = folderEntry.name.slice(0, -teamExtension.length)
          const filePath = path.join(teamFolderPath, folderEntry.name)
          const metadata = JSON.parse(fs.readFileSync(filePath, { encoding: 'utf-8' }))

          const teamMember = {
            id,
            name: metadata.name,
            bio: metadata.bio,
            email: metadata.email,
          }

          team.set(id, teamMember)
        }
      }

      return team
    }

    const team = getTeamMembers()

    config.module.rules.push({
      test: /\.mdx?$/,
      include: path.join(process.cwd(), 'src', 'components'),
      use: [
        options.defaultLoaders.babel,
        {
          loader: '@mdx-js/loader',
          /** @type {import('@mdx-js/loader').Options} */
          options: {
            jsx: true,
            remarkPlugins: [
              withFrontmatter,
              withParsedFrontmatter,
              withParsedFrontmatterExport,
              withGfm,
            ],
            rehypePlugins: [],
          },
        },
      ],
    })

    config.module.rules.push({
      test: /\.mdx?$/,
      include: path.join(process.cwd(), 'src', 'pages', 'blog'),
      use: [
        options.defaultLoaders.babel,
        {
          loader: '@mdx-js/loader',
          /** @type {import('@mdx-js/loader').Options} */
          options: {
            jsx: true,
            remarkPlugins: [
              withFrontmatter,
              [
                withParsedFrontmatter,
                {
                  transform(
                    /** @type {import('@/lib/data/types').ArticleMetadataRaw} */ frontmatter,
                  ) {
                    return {
                      ...frontmatter,
                      authors: frontmatter.authors.map((id) => {
                        return team.get(id)
                      }),
                    }
                  },
                },
              ],
              withParsedFrontmatterExport,
              withGfm,
              [
                withPage,
                {
                  pathname: path.join(
                    process.cwd(),
                    'src',
                    'pages',
                    'blog',
                    '[id].page.template.tsx',
                  ),
                },
              ],
            ],
            rehypePlugins: [],
          },
        },
      ],
    })

    return config
  },
}

/** @type {Array<(config: NextConfig) => NextConfig>} */
const plugins = [
  createNextSvgPlugin(
    /** @type {import('@stefanprobst/next-svg').PluginOptions} */ {
      svgo: {
        plugins: [{ prefixIds: true }, { removeDimensions: true }, { removeViewBox: false }],
      },
      svgr: {
        namedExport: 'Svg',
        titleProp: true,
      },
    },
  ),
]

export default plugins.reduce((config, plugin) => {
  return plugin(config)
}, config)
