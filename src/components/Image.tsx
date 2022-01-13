import type { ImageProps as NextImageProps } from 'next/image'
import NextImage from 'next/image'

export type ImageProps = NextImageProps

export function Image(props: ImageProps): JSX.Element {
  return <NextImage sizes="880px" layout="responsive" placeholder="blur" {...props} />
}
