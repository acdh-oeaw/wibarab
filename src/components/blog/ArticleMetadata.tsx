import type { Article } from '@/lib/data/types'
import { formatDate } from '@/lib/utils'

export interface ArticleMetadataProps {
  metadata: Article
}

export function ArticleMedata(props: ArticleMetadataProps): JSX.Element {
  const { date, authors } = props.metadata

  return (
    <dl className="text-sm leading-relaxed text-text-muted">
      <dt className="inline sr-only">Authors</dt>
      <dd className="inline">
        <span aria-hidden>By </span>
        {authors
          .map((author) => {
            return author.name
          })
          .join(', ')}
      </dd>
      <span aria-hidden className="mx-3">
        &bull;
      </span>
      <dt className="inline whitespace-nowrap">Published on</dt>
      <dd className="inline">
        <time dateTime={date}>{formatDate(new Date(date))}</time>
      </dd>
    </dl>
  )
}
