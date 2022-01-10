import { ResearchItemDetails } from '@/components/research/ResearchItemDetails'
import type { ResearchItem } from '@/lib/data/types'

export interface ResearchListProps {
  research: Array<ResearchItem>
}

export function ResearchList(props: ResearchListProps): JSX.Element {
  const { research } = props

  if (research.length === 0) {
    return <p>Documents will follow soon!</p>
  }

  return (
    <ul className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-x-12 gap-y-16">
      {research.map((researchItem) => {
        return (
          <li key={researchItem.title}>
            <ResearchItemDetails researchItem={researchItem} />
          </li>
        )
      })}
    </ul>
  )
}
