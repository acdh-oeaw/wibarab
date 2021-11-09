import type { CmsAuthScope } from 'netlify-cms-core'

export const repo = process.env['NEXT_PUBLIC_GIT_REPO'] ?? 'acdh-oeaw/wibarab'
export const branch = process.env['NEXT_PUBLIC_GIT_BRANCH'] ?? 'main'
export const scope = (process.env['NEXT_PUBLIC_GIT_SCOPE'] ?? 'public_repo') as CmsAuthScope
