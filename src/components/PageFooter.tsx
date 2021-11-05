import Link from 'next/link'

export function PageFooter(): JSX.Element {
  const acdhHref = 'https://www.oeaw.ac.at/acdh/projects/wibarab-what-is-bedouin-type-arabic'
  const imprintHref = { pathname: '/imprint' }
  const rssFeedHref = '/feed.xml'

  return (
    <footer className="py-32 page-section text-text">
      <div className="flex items-center justify-between gap-x-6">
        <small>
          &copy; {new Date().getUTCFullYear()}{' '}
          <a
            href={acdhHref}
            target="_blank"
            rel="noreferrer"
            className="hover:text-text-highlighted focus-visible:text-text-highlighted"
          >
            ACDH-CH
          </a>
          <span className="mx-2">&bull;</span>
          <Link href={imprintHref}>
            <a className="hover:text-text-highlighted focus-visible:text-text-highlighted">
              Imprint
            </a>
          </Link>
        </small>
        <small>
          <a href={rssFeedHref} target="_blank" rel="noreferrer">
            RSS Feed
          </a>
        </small>
      </div>
    </footer>
  )
}
