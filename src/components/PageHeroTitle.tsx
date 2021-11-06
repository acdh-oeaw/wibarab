import type { ReactNode } from 'react'

export interface PageHeroTitleProps {
  children?: ReactNode
}

export function PageHeroTitle(props: PageHeroTitleProps): JSX.Element {
  return (
    <h1 className="font-bold leading-none text-size-title text-text-highlighted glow">
      {props.children}
    </h1>
  )
}
