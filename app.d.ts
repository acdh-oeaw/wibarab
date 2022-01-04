/// <reference types="@stefanprobst/next-svg/types" />

declare module '@/components/home/*.mdx' {
  import type { MDXProps } from 'mdx/types'

  export const metadata: { title: string }
  export default function MDXContent(props: MDXProps): JSX.Element
}

declare module '*.svg?symbol' {
  import type { ReactNode, SVGProps, VFC } from 'react'

  const Image: VFC<SVGProps<SVGSVGElement> & { title?: ReactNode }>

  export default Image
}

declare module '*.svg' {
  const content: StaticImageData

  export default content
}
