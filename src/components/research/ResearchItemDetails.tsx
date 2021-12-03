import type { ResearchItem } from '@/lib/data/types'

export interface ResearchItemDetailsProps {
  researchItem: ResearchItem
}

export function ResearchItemDetails(props: ResearchItemDetailsProps): JSX.Element {
  const { researchItem } = props
  const { title, description, document } = researchItem

  return (
    <article className="grid gap-3 text-text">
      <h3 className="font-medium">
        <a href={document} download>
          {title}
        </a>
      </h3>
      <p className="text-sm text-text-muted">{description}</p>
    </article>
  )
}
