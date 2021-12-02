import { useMemo } from 'react'

import type { Href } from '@/lib/core/navigation/types'
import { useRoute } from '@/lib/core/navigation/useRoute'
import { removeTrailingSlash } from '@/lib/utils'

export interface Matcher {
  (href: Href, route: URL): boolean
}

const isMatchingPathnames: Matcher = function isMatchingPathnames(href, route) {
  return removeTrailingSlash(href.pathname) === removeTrailingSlash(route.pathname)
}

export interface UseIsCurrentRouteArgs {
  href: Href
  isMatching?: Matcher | undefined
}

export function useIsCurrentRoute(options: UseIsCurrentRouteArgs): boolean {
  const { href, isMatching = isMatchingPathnames } = options

  const route = useRoute()

  const isCurrentRoute = useMemo(() => {
    return isMatching(href, route)
  }, [route, href, isMatching])

  return isCurrentRoute
}
