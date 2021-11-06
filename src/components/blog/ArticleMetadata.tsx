import type { ArticleMetadataRaw } from '@/lib/data/types'
import { formatDate } from '@/lib/utils'

export interface ArticleMetadataProps {
  metadata: ArticleMetadataRaw
}

export function ArticleMedata(props: ArticleMetadataProps): JSX.Element {
  const { date } = props.metadata

  return (
    <dl className="flex gap-1 text-sm leading-relaxed text-text-muted">
      <dt>Published on</dt>
      <dd>
        <time dateTime={date}>{formatDate(new Date(date))}</time>
      </dd>
    </dl>
  )
}
