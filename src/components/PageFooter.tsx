import { Link } from '@/lib/core/navigation/Link'
import { routes } from '@/lib/core/navigation/routes'
import { createSiteUrl } from '@/lib/utils'
import { siteMetadata } from '~/config/metadata.config'
import { feed } from '~/config/site.config'

const { creator } = siteMetadata

export function PageFooter(): JSX.Element {
  return (
    <footer className="py-32 page-section text-text">
      <div className="flex items-center justify-between gap-x-6">
        <small>
          &copy; {new Date().getUTCFullYear()}{' '}
          <a
            href={creator?.website}
            target="_blank"
            rel="noreferrer"
            className="hover:text-text-highlighted focus-visible:text-text-highlighted"
          >
            {creator?.shortName}
          </a>
          <span className="mx-2">&bull;</span>
          <Link
            href={routes.ImprintPage()}
            className="hover:text-text-highlighted focus-visible:text-text-highlighted"
          >
            Imprint
          </Link>
        </small>
        <small>
          <a href={String(createSiteUrl({ pathname: feed }))} target="_blank" rel="noreferrer">
            RSS Feed
          </a>
        </small>
      </div>
      <div className="grid items-center grid-cols-5 gap-6 my-8">
        <img src="/assets/cms/images/institutslogo_farbe.jpg" alt="Logo_Orientalistik" className="object-contain" />
        <img src="/assets/cms/images/erc_logo.png" alt="Logo_ERC" className="object-contain" />
        <img src="/assets/cms/images/uni_logo_2016.png" alt="Logo_Univie" width="h14" className="object-contain" />
        <img src="/assets/cms/images/erc_logo.png" alt="" className="object-contain" />
        <img src="/assets/cms/images/erc_logo.png" alt="" className="object-contain" />
      </div>
    </footer>
  )
}
