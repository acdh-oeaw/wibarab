import type { AdminPage } from '../../../pages/admin.page'
import type { ArticlePage } from '../../../pages/blog/[id].page.template'
import type { BlogPage } from '../../../pages/blog/index.page'
import type { ImprintPage } from '../../../pages/imprint.page'
import type { HomePage } from '../../../pages/index.page'
import type { TeamPage } from '../../../pages/team.page'

export const routes = {
  AdminPage(searchParams?: AdminPage.SearchParamsInput) {
    return { pathname: `/admin`, query: searchParams }
  },
  ArticlePage({ id }: ArticlePage.PathParamsInput, searchParams?: ArticlePage.SearchParamsInput) {
    return { pathname: `/blog/${id}`, query: searchParams }
  },
  BlogPage(searchParams?: BlogPage.SearchParamsInput) {
    return { pathname: `/blog/`, query: searchParams }
  },
  ImprintPage(searchParams?: ImprintPage.SearchParamsInput) {
    return { pathname: `/imprint`, query: searchParams }
  },
  HomePage(searchParams?: HomePage.SearchParamsInput) {
    return { pathname: `/`, query: searchParams }
  },
  TeamPage(searchParams?: TeamPage.SearchParamsInput) {
    return { pathname: `/team`, query: searchParams }
  },
}
