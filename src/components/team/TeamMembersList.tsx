import { TeamMemberDetails } from '@/components/team/TeamMemberDetails'
import type { TeamMember } from '@/lib/data/types'

export interface TeamMembersListProps {
  team: Array<TeamMember>
}

export function TeamMembersList(props: TeamMembersListProps): JSX.Element {
  const { team } = props

  if (team.length === 0) {
    return <p>Nothing to see yet!</p>
  }

  return (
    <ul className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-x-12 gap-y-16">
      {team.map((teamMember) => {
        return (
          <li key={teamMember.name}>
            <TeamMemberDetails teamMember={teamMember} />
          </li>
        )
      })}
    </ul>
  )
}
