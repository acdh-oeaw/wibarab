import { NavLink } from '@/lib/core/navigation/NavLink'
import { routes } from '@/lib/core/navigation/routes'

const links = {
  Home: routes.HomePage(),
  Team: routes.TeamPage(),
  Blog: routes.BlogPage(),
}

export function PageNavigation(): JSX.Element {
  return (
    <nav>
      <ul className="flex gap-8 text-text">
        {Object.entries(links).map(([label, href]) => {
          return (
            <li key={href.pathname}>
              <NavLink
                href={href}
                className="relative py-2 border-b border-transparent after:absolute after:-inset-x-2 after:inset-y-0 hover:text-text-highlighted focus-visible:text-text-highlighted"
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
