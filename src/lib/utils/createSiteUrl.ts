import { baseUrl } from '~/config/site.config'

type Primitive = string | number | boolean | null | undefined

export interface UrlInit {
  pathname: string
  searchParams?: Record<string, Primitive | Array<Primitive>>
  hash?: string
}

export function createSiteUrl(init: UrlInit): URL {
  const url = new URL(init.pathname, baseUrl)

  if (init.hash != null) {
    url.hash = init.hash
  }

  if (init.searchParams != null) {
    Object.entries(init.searchParams).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((v) => {
          if (v != null) {
            url.searchParams.append(key, String(v))
          }
        })
      } else if (value != null) {
        url.searchParams.append(key, String(value))
      }
    })
  }

  return url
}
