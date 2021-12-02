import type { ReactNode } from 'react'

import { Link } from '@/lib/core/navigation/Link'

const defaultId = 'main-content'

export interface SkipLinkProps {
  children?: ReactNode
  /** @default 'main-content' */
  id?: string
}

export function SkipLink(props: SkipLinkProps): JSX.Element {
  const id = props.id ?? defaultId

  function moveFocus() {
    /**
     * Fragment identifier links do not move focus to the target in Firefox.
     */
    document.getElementById(id)?.focus()
  }

  return (
    <Link href={{ hash: id }} className="skip-link" onClick={moveFocus}>
      {props.children}
    </Link>
  )
}
