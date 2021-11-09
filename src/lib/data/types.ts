export interface TeamMember {
  id: string
  name: string
  email: string
  bio: string
}

export interface ArticleMetadataRaw {
  id: string
  title: string
  date: string
  authors: Array<TeamMember['id']>
  abstract: string
}

export interface ArticleMetadata extends Omit<ArticleMetadataRaw, 'authors'> {
  authors: Array<Pick<TeamMember, 'name'>>
}

export interface ArticleRaw extends ArticleMetadataRaw {
  leadIn: string
  featuredImage: string
}

export interface Article extends Omit<ArticleRaw, 'authors'> {
  authors: Array<Pick<TeamMember, 'name'>>
}
