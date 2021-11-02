import type { ReactNode } from 'react'

export interface PageHeroLeadInProps {
  children?: ReactNode
}

export function PageHeroLeadIn(props: PageHeroLeadInProps): JSX.Element {
  return <h2 className="text-2xl text-text-muted">{props.children}</h2>
}
