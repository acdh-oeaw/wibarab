import cx from 'clsx'
import type { ReactNode } from 'react'

export interface PageSectionProps {
  children?: ReactNode
  className?: string
}

export function PageSection(props: PageSectionProps): JSX.Element {
  return <section className={cx('page-section', props.className)}>{props.children}</section>
}
