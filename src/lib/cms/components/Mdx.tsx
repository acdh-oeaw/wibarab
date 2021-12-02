import withImageCaptions from '@stefanprobst/rehype-image-captions'
import withSmartQuotes from '@stefanprobst/remark-smart-quotes'
import { createElement, Fragment, useMemo } from 'react'
import toVdom from 'rehype-react'
import withGfm from 'remark-gfm'
import withMdx from 'remark-mdx'
import fromMarkdown from 'remark-parse'
import toHast from 'remark-rehype'
import { unified } from 'unified'

import { Link } from '@/lib/core/navigation/Link'

const processor = unified()
  .use(fromMarkdown)
  .use(withMdx)
  .use(withGfm)
  .use(withSmartQuotes)
  .use(toHast)
  .use(withImageCaptions)
  /* @ts-expect-error Upstream types don't handle custom components. */
  .use(toVdom, { createElement, components: { Link } })

export interface MdxProps {
  mdx: string
}

export function Mdx(props: MdxProps): JSX.Element {
  const { mdx } = props

  const { result: vdom } = useMemo(() => {
    return processor.processSync(mdx)
  }, [mdx])

  return <Fragment>{vdom}</Fragment>
}
