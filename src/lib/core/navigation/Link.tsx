import type { LinkProps as NextLinkProps } from 'next/link'
import NextLink from 'next/link'
import type { ComponentPropsWithoutRef, ReactNode } from 'react'

import type { Href } from '@/lib/core/navigation/types'

export interface LinkProps
  extends Omit<ComponentPropsWithoutRef<'a'>, 'href'>,
    Omit<NextLinkProps, 'as' | 'href' | 'locale' | 'passHref'> {
  href: Href
  children?: ReactNode
}

export function Link(props: LinkProps): JSX.Element {
  const { href, replace, scroll, shallow, prefetch, ...anchorProps } = props

  /** `NextLink` types currently don't work well with `exactOptionalPropertyTypes`. */
  const linkProps = { replace, scroll, shallow, prefetch } as Partial<
    Pick<LinkProps, 'prefetch' | 'replace' | 'scroll' | 'shallow'>
  >

  return (
    <NextLink href={href} {...linkProps}>
      <a {...anchorProps}>{props.children}</a>
    </NextLink>
  )
}
