export function reportPageView(): void {
  const matomo = (window as typeof window & { _paq?: Array<unknown> })._paq
  if (matomo != null) {
    matomo.push(['setCustomUrl', window.location.href])
    matomo.push(['setDocumentTitle', document.title])
    matomo.push(['trackPageView'])
  }
}
