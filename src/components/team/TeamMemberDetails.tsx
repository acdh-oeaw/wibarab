import type { TeamMember } from '@/lib/data/types'
import { isNonEmptyString } from '@/lib/utils'

export interface TeamMemberDetailsProps {
  teamMember: TeamMember
}

export function TeamMemberDetails(props: TeamMemberDetailsProps): JSX.Element {
  const { teamMember } = props
  const { name, email, bio, avatar } = teamMember

  const hasAvatar = isNonEmptyString(avatar)

  return (
    <article className="grid gap-3 text-text">
      {hasAvatar ? (
        <img
          src={avatar}
          alt=""
          className="object-contain w-full rounded grayscale mix-blend-difference"
        />
      ) : null}
      <h3 className="font-medium">{name}</h3>
      <p className="text-sm text-text-muted">{bio}</p>
      <dl className="text-sm text-muted">
        <dt className="sr-only">Email</dt>
        <dd>
          <a
            href={`mailto:${email}`}
            className="hover:text-text-highlighted focus-visible:text-text-highlighted"
          >
            {email}
          </a>
        </dd>
      </dl>
    </article>
  )
}
