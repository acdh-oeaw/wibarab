import type { ReactNode } from 'react'

export interface ArticleHeaderSectionProps {
  children?: ReactNode
}

export function ArticleHeaderSection(props: ArticleHeaderSectionProps): JSX.Element {
  return <div className="py-16 page-section gap-y-6">{props.children}</div>
}
