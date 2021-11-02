/// <reference types="@stefanprobst/next-svg" />

declare module '@/components/home/About.mdx' {
  import type { MDXProps } from 'mdx/types'

  export const metadata: { title: string }
  export default function MDXContent(props: MDXProps): JSX.Element
}
