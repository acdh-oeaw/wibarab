export interface TeamMember {
  id: string
  name: string
  email: string
  bio: string
}

export interface ArticleMetadataRaw {
  title: string
  date: string
  authors: Array<TeamMember['id']>
  abstract: string
  leadIn: string
  featuredImage: string
}

export interface ArticlePreview extends Pick<ArticleMetadataRaw, 'title' | 'date' | 'abstract'> {
  id: string
  authors: Array<Pick<TeamMember, 'name'>>
}

export interface ArticleMetadata
  extends Pick<ArticleMetadataRaw, 'title' | 'date' | 'leadIn' | 'featuredImage' | 'abstract'> {
  id: string
  authors: Array<Pick<TeamMember, 'name'>>
}

export interface Article extends ArticleMetadata {
  code: string
}
