import cx from 'clsx'

import type { LinkProps } from '@/lib/core/navigation/Link'
import { Link } from '@/lib/core/navigation/Link'
import type { UseIsCurrentRouteArgs } from '@/lib/core/navigation/useIsCurrentRoute'
import { useIsCurrentRoute } from '@/lib/core/navigation/useIsCurrentRoute'

export interface NavLinkProps extends LinkProps, UseIsCurrentRouteArgs {
  activeClassName?: string
  inactiveClassName?: string
}

export function NavLink(props: NavLinkProps): JSX.Element {
  const { href, isMatching, className, activeClassName, inactiveClassName, ...linkProps } = props

  const isCurrentRoute = useIsCurrentRoute({ href, isMatching })

  return (
    <Link
      href={href}
      aria-current={isCurrentRoute ? 'page' : undefined}
      className={cx(className, isCurrentRoute ? activeClassName : inactiveClassName)}
      {...linkProps}
    >
      {props.children}
    </Link>
  )
}
