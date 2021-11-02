import generate from '@stefanprobst/favicons'

import { siteMetadata } from '../config/metadata.config'
import { log } from '../src/lib/utils/log'

const { favicon, shortTitle, title } = siteMetadata
const webManifest = 'site.webmanifest'

generate({
  inputFilePath: favicon.src,
  outputFolder: 'public',
  name: title,
  shortName: shortTitle,
  maskable: favicon.maskable,
  color: '#fff',
  manifestFileName: webManifest,
})
  .then(() => {
    log.success('Successfully generated favicons.')
  })
  .catch((error) => {
    log.error('Failed to generate favicons.', error)
  })
