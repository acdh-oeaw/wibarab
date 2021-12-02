import { useRouter } from 'next/router'
import { useMemo } from 'react'

import { createSiteUrl } from '@/lib/utils'

/**
 * Converts `router.asPath` into a URL. Be aware that reading `searchParams` before checking
 * `router.isReady` will lead to hydration mismatches, because query params are empty on the
 * server. Use `useSearchParams` to be safe.
 */
export function useRoute(): URL {
  const router = useRouter()

  const route = useMemo(() => {
    return createSiteUrl({ pathname: router.asPath })
  }, [router])

  return route
}
