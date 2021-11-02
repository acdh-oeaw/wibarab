import type { ReactNode } from 'react'

export interface PageHeroTitleProps {
  children?: ReactNode
}

export function PageHeroTitle(props: PageHeroTitleProps): JSX.Element {
  return (
    <h1 className="text-6xl font-bold leading-none text-text-highlighted glow">{props.children}</h1>
  )
}
