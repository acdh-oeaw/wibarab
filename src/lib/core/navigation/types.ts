import type { LinkProps } from 'next/link'

export type UrlObject = Exclude<LinkProps['href'], string>

/**
 * Converts page parameter types to strings, so they conform to the `ParsedUrlQuery` type.
 */
export type PageParams<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K] extends null | undefined
    ? undefined
    : T[K] extends Array<unknown>
    ? Array<string>
    : string
}

/**
 * Allowed page parameter input types.
 */
export type { ParsedUrlQueryInput as PageParamsInput } from 'querystring'
