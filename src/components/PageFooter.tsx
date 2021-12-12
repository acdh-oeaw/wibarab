import cx from 'clsx'

import styles from '@/components/PageFooter.module.css'
import { Link } from '@/lib/core/navigation/Link'
import { routes } from '@/lib/core/navigation/routes'
import { createSiteUrl } from '@/lib/utils'
import { siteMetadata } from '~/config/metadata.config'
import { feed } from '~/config/site.config'
import AcdhChLogo from '~/public/assets/cms/images/acdh-ch_logo.svg?symbol'
import ErcLogo from '~/public/assets/cms/images/erc_logo.svg?symbol'
import InstituteOfOrientalStudiesLogo from '~/public/assets/cms/images/institute-of-oriental-studies_logo.svg?symbol'
import UnivieLogo from '~/public/assets/cms/images/univie_logo.svg?symbol'

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
          <a
            href={String(createSiteUrl({ pathname: feed }))}
            target="_blank"
            rel="noreferrer"
            className="hover:text-text-highlighted focus-visible:text-text-highlighted"
          >
            RSS Feed
          </a>
        </small>
      </div>
      <div className="grid items-center grid-cols-2 gap-6 my-8 xs:grid-cols-4">
        <InstituteOfOrientalStudiesLogo
          title="Institute of Oriental Studies, University of Vienna"
          className={cx('object-contain w-full h-full', styles['themed-image-oriental-studies'])}
        />
        <UnivieLogo
          title="University of Vienna"
          className={cx('object-contain w-full h-full', styles['themed-image-univie'])}
        />
        <AcdhChLogo
          title="Austrian Centre for Digital Humanities and Cultural Heritage"
          className={cx('object-contain w-full h-full', styles['themed-image-acdh-ch'])}
        />
        <ErcLogo
          title="European Research Council"
          className={cx('object-contain w-full h-full', styles['themed-image-erc'])}
        />
      </div>
    </footer>
  )
}
