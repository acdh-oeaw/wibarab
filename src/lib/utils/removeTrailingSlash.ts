export function removeTrailingSlash(str: string | null | undefined): string {
  if (typeof str !== 'string') return ''
  return str.replace(/\/$/, '')
}
