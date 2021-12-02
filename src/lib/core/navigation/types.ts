import type { LinkProps } from 'next/link'

export type Href = Exclude<LinkProps['href'], string>
