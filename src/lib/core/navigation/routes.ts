import type { UrlObject } from '@/lib/core/navigation/types'

export const routes = {
  BlogPage(): UrlObject {
    return { pathname: `/blog/` }
  },
  HomePage(): UrlObject {
    return { pathname: `/` }
  },
}
