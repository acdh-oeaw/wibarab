import type { PageMetadataProps as NextPageMetadataProps } from '@stefanprobst/next-page-metadata'
import { PageMetadata as NextPageMetadata } from '@stefanprobst/next-page-metadata'
import { useRouter } from 'next/router'
import { useMemo } from 'react'

import { createSiteUrl } from '@/lib/utils'
import { siteMetadata } from '~/config/metadata.config'

const { title, description, image, twitter } = siteMetadata

export type PageMetadataProps = NextPageMetadataProps

export function PageMetadata(props: PageMetadataProps): JSX.Element {
  const router = useRouter()

  const canonicalUrl = useMemo(() => {
    const { pathname } = createSiteUrl({ pathname: router.asPath })
    return String(createSiteUrl({ pathname }))
  }, [router.asPath])

  function defaultTitleTemplate(pageTitle?: string) {
    return [pageTitle, title].filter(Boolean).join(' | ')
  }

  return (
    <NextPageMetadata
      language="en"
      canonicalUrl={canonicalUrl}
      titleTemplate={defaultTitleTemplate}
      title={title}
      description={description}
      openGraph={{ images: [image] }}
      twitter={twitter ?? {}}
      {...props}
    />
  )
}
