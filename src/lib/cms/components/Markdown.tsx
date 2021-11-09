import { useMemo } from 'react'
// @ts-expect-error Ancient version, should probably add to deps.
import toHtml from 'rehype-stringify'
import fromMarkdown from 'remark-parse'
import toHast from 'remark-rehype'
import { unified } from 'unified'

export interface MarkdownProps {
  className?: string
  markdown?: string
}

const processor = unified().use(fromMarkdown).use(toHast).use(toHtml)

export function Markdown(props: MarkdownProps): JSX.Element {
  const html = useMemo(() => {
    return String(processor.processSync(props.markdown))
  }, [props.markdown])

  return <div className={props.className} dangerouslySetInnerHTML={{ __html: html }} />
}
