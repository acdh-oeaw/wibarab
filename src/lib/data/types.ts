type UrlString = string

export interface TeamMember {
  id: string
  name: string
  email: string
  bio: string
  avatar: string | null
}

export interface ResearchItem {
  title: string
  description: string
  document: string
}

export interface ArticleMetadataRaw {
  title: string
  date: string
  authors: Array<TeamMember['id']>
  abstract: string
  leadIn: string
  featuredImage: string | null
}

export interface ArticlePreview extends Pick<ArticleMetadataRaw, 'abstract' | 'date' | 'title'> {
  id: string
  authors: Array<Pick<TeamMember, 'name'>>
}

export interface ArticleMetadata
  extends Pick<ArticleMetadataRaw, 'abstract' | 'date' | 'leadIn' | 'title'> {
  id: string
  authors: Array<Pick<TeamMember, 'name'>>
  featuredImage: StaticImageData | UrlString | null
}

export interface Article extends ArticleMetadata {
  code: string
}
