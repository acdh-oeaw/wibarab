import { createElement, Fragment, useMemo } from 'react'
import toVdom from 'rehype-react'
import withGfm from 'remark-gfm'
import withMdx from 'remark-mdx'
import fromMarkdown from 'remark-parse'
import toHast from 'remark-rehype'
import { unified } from 'unified'

const processor = unified()
  .use(fromMarkdown)
  .use(withMdx)
  .use(withGfm)
  .use(toHast)
  .use(toVdom, { createElement })

export interface MdxProps {
  className?: string
  mdx: string
}

export function Mdx(props: MdxProps): JSX.Element {
  const { mdx } = props

  const { result: vdom } = useMemo(() => {
    return processor.processSync(mdx)
  }, [mdx])

  return <Fragment>{vdom}</Fragment>
}
