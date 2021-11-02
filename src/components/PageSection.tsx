import type { ReactNode } from 'react'

export interface PageSectionProps {
  children?: ReactNode
}

export function PageSection(props: PageSectionProps): JSX.Element {
  return <section className="page-section">{props.children}</section>
}
