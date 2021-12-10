import { RouteManifestPlugin } from '@stefanprobst/next-route-manifest'
import createNextSvgPlugin from '@stefanprobst/next-svg'
import prettierOptions from '@stefanprobst/prettier-config'
// import withHeadingFragmentLinks from '@stefanprobst/rehype-fragment-links'
import withImageCaptions from '@stefanprobst/rehype-image-captions'
import withListsWithAriaRole from '@stefanprobst/rehype-lists-with-aria-role'
import withNextLinks from '@stefanprobst/rehype-next-links'
import withNoReferrerLinks from '@stefanprobst/rehype-noreferrer-links'
import withParsedFrontmatter from '@stefanprobst/remark-extract-yaml-frontmatter'
import withParsedFrontmatterExport from '@stefanprobst/remark-extract-yaml-frontmatter/mdx'
import withPage from '@stefanprobst/remark-mdx-page'
import withSmartQuotes from '@stefanprobst/remark-smart-quotes'
import * as fs from 'fs'
// import { h } from 'hastscript'
import * as path from 'path'
import withHeadingIds from 'rehype-slug'
import withFrontmatter from 'remark-frontmatter'
import withGfm from 'remark-gfm'

/** @typedef {import('next').NextConfig} NextConfig */

export const routeManifestConfig = {
  outputFolder: path.join(process.cwd(), 'src', 'lib', 'core', 'navigation'),
  pagesFolder: path.join(process.cwd(), 'src', 'pages'),
  pageExtensions: ['page.tsx', 'page.template.tsx'],
  prettierOptions,
}

/** @type {NextConfig} */
const config = {
  eslint: {
    dirs: ['.'],
    // ignoreDuringBuilds: true,
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
  typescript: {
    // ignoreBuildErrors: true,
  },
  webpack(config, options) {
    /**
     * @see https://github.com/vercel/next.js/issues/17806
     */
    config.module?.rules?.push({
      test: /\.mjs$/,
      type: 'javascript/auto',
      resolve: {
        fullySpecified: false,
      },
    })

    /** Evaluate modules at build-time. */
    config.module?.rules?.push({
      test: /\.static\.ts$/,
      use: [{ loader: '@stefanprobst/val-loader' }],
      exclude: /node_modules/,
    })

    /** Auto-generate route manifest. */
    if (!options.isServer) {
      config.plugins?.push(new RouteManifestPlugin(routeManifestConfig))
    }

    /**
     * This is mostly copied from 'src/lib/data/team.ts` because in `next.config.mjs` we cannot
     * import typescript, and can only use synchronous functions.
     */
    function getTeamMembers() {
      const teamExtension = '.json'
      const teamFolderPath = path.join(process.cwd(), 'src', 'components', 'team', 'data')

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
            avatar: metadata.avatar,
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
              withSmartQuotes,
            ],
            rehypePlugins: [
              withNoReferrerLinks,
              withNextLinks,
              withImageCaptions,
              withListsWithAriaRole,
              withHeadingIds,
            ],
          },
        },
      ],
    })

    // /** @typedef {import('hast').Element} HastElement */
    // /** @type {(heading: HastElement, id: string) => Array<HastElement>} */
    // function createPermalink(headingElement, id) {
    //   const permaLinkId = ['permalink', id].join('-')
    //   const ariaLabelledBy = [permaLinkId, id].join(' ')
    //   return [
    //     h('a', { ariaLabelledBy, href: '#' + id }, [
    //       h('span', { id: permaLinkId, hidden: true }, 'Permalink to'),
    //       h('span', '#'),
    //     ]),
    //     headingElement,
    //   ]
    // }

    const articlePageTemplate = path.join(
      process.cwd(),
      'src',
      'pages',
      'blog',
      '[id].page.template.tsx',
    )
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
              withSmartQuotes,
            ],
            rehypePlugins: [
              withNoReferrerLinks,
              withNextLinks,
              withImageCaptions,
              withListsWithAriaRole,
              withHeadingIds,
              // [withHeadingFragmentLinks, { generate: createPermalink }],
            ],
            recmaPlugins: [
              [
                withPage,
                /** @type {import('@stefanprobst/remark-mdx-page').Options} */
                ({
                  template: articlePageTemplate,
                  imports: ['import { Link } from "@/lib/core/navigation/Link"'],
                  props: '{ components: { Link }, metadata }',
                }),
              ],
            ],
          },
        },
      ],
    })

    return config
  },
}

/** @type {Array<(config: NextConfig) => NextConfig>} */
const plugins = [createNextSvgPlugin()]

export default plugins.reduce((config, plugin) => {
  return plugin(config)
}, config)
