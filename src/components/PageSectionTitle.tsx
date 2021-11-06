import type { ReactNode } from 'react'

export interface PageSectionTitleProps {
  children?: ReactNode
}

export function PageSectionTitle(props: PageSectionTitleProps): JSX.Element {
  return (
    <h2 className="pb-2 font-medium border-b text-size-heading border-text-highlighted text-text-highlighted glow">
      {props.children}
    </h2>
  )
}
