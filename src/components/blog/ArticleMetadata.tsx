import type { Article } from '@/lib/data/types'
import { formatDate } from '@/lib/utils'

export interface ArticleMetadataProps {
  metadata: Article
}

export function ArticleMedata(props: ArticleMetadataProps): JSX.Element {
  const { date, authors } = props.metadata

  return (
    <dl className="flex flex-wrap gap-1 text-sm leading-relaxed text-text-muted">
      <dt className="sr-only">Authors</dt>
      <dd>
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
      <dt className="whitespace-nowrap">Published on</dt>
      <dd>
        <time dateTime={date}>{formatDate(new Date(date))}</time>
      </dd>
    </dl>
  )
}
