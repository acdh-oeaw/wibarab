import type { CmsConfig } from 'netlify-cms-core'

import { collection as blog } from '@/lib/cms/collections/blog'
import { collection as sections } from '@/lib/cms/collections/sections'
import { collection as team } from '@/lib/cms/collections/team'
import { branch, repo, scope } from '~/config/cms.config'
import { baseUrl } from '~/config/site.config'

const collections = [blog, sections, team]

export const config: CmsConfig = {
  load_config_file: false,
  logo_url: '/assets/images/logo.svg',
  local_backend: process.env['NEXT_PUBLIC_USE_LOCAL_CMS'] === 'true',
  backend: {
    name: 'github',
    repo,
    branch,
    base_url: baseUrl,
    auth_endpoint: 'api/auth/github',
    auth_scope: scope,
    squash_merges: true,
    commit_messages: {
      create: 'content(cms): create {{collection}} "{{slug}}"',
      update: 'content(cms): update {{collection}} "{{slug}}"',
      delete: 'content(cms): delete {{collection}} "{{slug}}"',
      uploadMedia: 'content(cms): upload "{{path}}"',
      deleteMedia: 'content(cms): delete "{{path}}"',
      openAuthoring: '{{message}}',
    },
  },
  publish_mode: 'editorial_workflow',
  media_folder: 'public/assets/cms/images',
  public_folder: '/assets/cms/images',
  show_preview_links: false,
  editor: {
    preview: false,
  },
  collections,
}
