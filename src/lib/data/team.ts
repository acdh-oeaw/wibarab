import { existsSync, promises as fs } from 'fs'
import * as path from 'path'

import { teamExtension, teamFolderPath } from '@/lib/data/data.config'
import type { TeamMember, TeamRole } from '@/lib/data/types'

export async function getTeam(): Promise<Record<TeamRole, Array<TeamMember>>> {
  if (!existsSync(teamFolderPath)) return { core: [], extended: [] }

  const folderEntries = await fs.readdir(teamFolderPath, { withFileTypes: true })

  const team = []

  for (const folderEntry of folderEntries) {
    if (folderEntry.isFile() && folderEntry.name.endsWith(teamExtension)) {
      const id = folderEntry.name.slice(0, -teamExtension.length)
      const teamMember = await getTeamMember(id)

      team.push(teamMember)
    }
  }

  team.sort((a, b) => {
    return a.name.localeCompare(b.name)
  })

  const grouped: Record<TeamRole, Array<TeamMember>> = { core: [], extended: [] }

  team.forEach((teamMember) => {
    grouped[teamMember.role].push(teamMember)
  })

  return grouped
}

export async function getTeamMember(id: string): Promise<TeamMember> {
  const filePath = path.join(teamFolderPath, id + teamExtension)
  const content = await fs.readFile(filePath, { encoding: 'utf-8' })
  const metadata = JSON.parse(content) as TeamMember

  const teamMember = {
    id,
    name: metadata.name,
    bio: metadata.bio,
    email: metadata.email,
    role: metadata.role,
  }

  return teamMember
}
