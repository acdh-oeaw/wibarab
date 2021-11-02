import createNextSvgPlugin from '@stefanprobst/next-svg'
import withFrontmatter from 'remark-frontmatter'
import { remarkMdxFrontmatter as withMdxFrontmatter } from 'remark-mdx-frontmatter'

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
              [withMdxFrontmatter, { name: 'metadata' }],
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
