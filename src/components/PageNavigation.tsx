import cx from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/router'

const links = {
  Home: { pathname: '/' },
  Blog: { pathname: '/blog' },
}

export function PageNavigation(): JSX.Element {
  const router = useRouter()

  return (
    <nav>
      <ul className="flex gap-8 text-text">
        {Object.entries(links).map(([label, href]) => {
          const isCurrentPage = href.pathname === router.pathname

          return (
            <Link key={href.pathname} href={href}>
              <a
                aria-current={isCurrentPage ? 'page' : undefined}
                className={cx(
                  'py-2 border-b border-transparent hover:text-text-highlighted focus-visible:text-text-highlighted',
                  isCurrentPage && 'border-current',
                )}
              >
                {label}
              </a>
            </Link>
          )
        })}
      </ul>
    </nav>
  )
}
