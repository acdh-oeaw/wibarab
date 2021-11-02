import type { ReactNode } from 'react'

const defaultId = 'main-content'

export interface PageMainContentProps {
  children?: ReactNode
  /** @default 'main-content' */
  id?: string
}

export function PageMainContent(props: PageMainContentProps): JSX.Element {
  const id = props.id ?? defaultId

  return (
    <main id={id} tabIndex={-1}>
      {props.children}
    </main>
  )
}
