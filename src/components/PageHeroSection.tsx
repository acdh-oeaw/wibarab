import type { ReactNode } from 'react'

export interface PageHeroSectionProps {
  children?: ReactNode
}

export function PageHeroSection(props: PageHeroSectionProps): JSX.Element {
  return <div className="pt-16 pb-16 sm:pt-32 page-section gap-y-6">{props.children}</div>
}
