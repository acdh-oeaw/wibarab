import { NavLink } from '@/lib/core/navigation/NavLink'
import { routes } from '@/lib/core/navigation/routes'

const links = {
  Home: routes.HomePage(),
  Team: routes.TeamPage(),
  Blog: routes.BlogPage(),
  Research: routes.ResearchPage(),
}

export function PageNavigation(): JSX.Element {
  return (
    <nav>
      <ul className="flex flex-wrap gap-4 text-text xs:gap-8">
        {Object.entries(links).map(([label, href]) => {
          return (
            <li key={href.pathname}>
              <NavLink
                href={href}
                className="relative py-2 text-sm border-b border-transparent xs:text-base after:absolute after:-inset-x-2 after:inset-y-0 hover:text-text-highlighted focus-visible:text-text-highlighted"
                activeClassName="border-current"
              >
                {label}
              </NavLink>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
