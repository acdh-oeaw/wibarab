import Link from 'next/link'
import type { ReactNode } from 'react'

const defaultId = 'main-content'

export interface SkipLinkProps {
  children?: ReactNode
  /** @default 'main-content' */
  id?: string
}

export function SkipLink(props: SkipLinkProps): JSX.Element {
  const id = props.id ?? defaultId

  return (
    <Link href={{ hash: id }}>
      <a className="skip-link">{props.children}</a>
    </Link>
  )
}
