import type { ReactNode } from 'react'

export interface PageHeroSectionProps {
  children?: ReactNode
}

export function PageHeroSection(props: PageHeroSectionProps): JSX.Element {
  return <div className="page-section py-32 gap-y-6">{props.children}</div>
}
