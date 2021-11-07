import * as fs from 'fs'
import * as path from 'path'

import createNextSvgPlugin from '@stefanprobst/next-svg'
import withParsedFrontmatter from '@stefanprobst/remark-extract-yaml-frontmatter'
import withParsedFrontmatterExport from '@stefanprobst/remark-extract-yaml-frontmatter/mdx'
import withFrontmatter from 'remark-frontmatter'

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
  pageExtensions: ['page.tsx', 'api.ts', 'md', 'mdx'],
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
        if (folderEntry.isFile() && path.extname(folderEntry.name) === teamExtension) {
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
                  transform(frontmatter) {
                    return {
                      ...frontmatter,
                      authors: frontmatter.authors?.map((id) => {
                        return team.get(id)
                      }),
                    }
                  },
                },
              ],
              withParsedFrontmatterExport,
              function withMdxLayout() {
                return function transformer(tree, _file) {
                  tree.children.push({
                    type: 'mdxjsEsm',
                    data: {
                      estree: {
                        type: 'Program',
                        sourceType: 'module',
                        body: [
                          {
                            type: 'ImportDeclaration',
                            specifiers: [
                              {
                                type: 'ImportSpecifier',
                                imported: {
                                  type: 'Identifier',
                                  name: 'ArticlePageLayout',
                                },
                                local: {
                                  type: 'Identifier',
                                  name: 'PageLayout',
                                },
                              },
                            ],
                            source: {
                              type: 'Literal',
                              value: '@/components/blog/ArticlePageLayout',
                              raw: "'@/components/blog/ArticlePageLayout'",
                            },
                          },
                          {
                            type: 'ExpressionStatement',
                            expression: {
                              type: 'AssignmentExpression',
                              operator: '=',
                              left: {
                                type: 'MemberExpression',
                                object: {
                                  type: 'Identifier',
                                  name: 'MDXContent',
                                },
                                property: {
                                  type: 'Identifier',
                                  name: 'getLayout',
                                },
                                computed: false,
                                optional: false,
                              },
                              right: {
                                type: 'FunctionExpression',
                                id: {
                                  type: 'Identifier',
                                  name: 'getLayout',
                                },
                                expression: false,
                                generator: false,
                                async: false,
                                params: [
                                  {
                                    type: 'Identifier',
                                    name: 'page',
                                  },
                                ],
                                body: {
                                  type: 'BlockStatement',
                                  body: [
                                    {
                                      type: 'ReturnStatement',
                                      argument: {
                                        type: 'JSXElement',
                                        openingElement: {
                                          type: 'JSXOpeningElement',
                                          attributes: [
                                            {
                                              type: 'JSXAttribute',
                                              name: {
                                                type: 'JSXIdentifier',
                                                name: 'metadata',
                                              },
                                              value: {
                                                type: 'JSXExpressionContainer',
                                                expression: {
                                                  type: 'Identifier',
                                                  name: 'metadata',
                                                },
                                              },
                                            },
                                          ],
                                          name: {
                                            type: 'JSXIdentifier',
                                            name: 'PageLayout',
                                          },
                                          selfClosing: false,
                                        },
                                        closingElement: {
                                          type: 'JSXClosingElement',
                                          name: {
                                            type: 'JSXIdentifier',
                                            name: 'PageLayout',
                                          },
                                        },
                                        children: [
                                          {
                                            type: 'JSXExpressionContainer',
                                            expression: {
                                              type: 'Identifier',
                                              name: 'page',
                                            },
                                          },
                                        ],
                                      },
                                    },
                                  ],
                                },
                              },
                            },
                          },
                        ],
                      },
                    },
                  })
                }
              },
            ],
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
