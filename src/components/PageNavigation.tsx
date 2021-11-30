import cx from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { routes } from '@/lib/core/navigation/routes'

const links = {
  Home: routes.HomePage(),
  Test: routes.TestPage(),
  Blog: routes.BlogPage(),
}

export function PageNavigation(): JSX.Element {
  const router = useRouter()

  return (
    <nav>
      <ul className="flex gap-8 text-text">
        {Object.entries(links).map(([label, href]) => {
          const isCurrentPage = href.pathname === router.pathname

          return (
            <li key={href.pathname}>
              <Link href={href}>
                <a
                  aria-current={isCurrentPage ? 'page' : undefined}
                  className={cx(
                    'py-2 relative after:absolute after:-inset-x-2 after:inset-y-0 border-b border-transparent hover:text-text-highlighted focus-visible:text-text-highlighted',
                    isCurrentPage && 'border-current',
                  )}
                >
                  {label}
                </a>
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
