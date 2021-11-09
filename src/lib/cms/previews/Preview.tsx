import type { ErrorFallbackProps } from '@stefanprobst/next-error-boundary'
import { ErrorBoundary } from '@stefanprobst/next-error-boundary'
import { RouterContext } from 'next/dist/shared/lib/router-context'
import type { NextRouter } from 'next/router'
import type { ReactNode } from 'react'

/* eslint-disable arrow-body-style */

const mockRouter: NextRouter = {
  basePath: '/',
  asPath: '/',
  pathname: '/',
  route: '/',
  query: {},
  isLocaleDomain: false,
  push: () => Promise.resolve(true),
  replace: () => Promise.resolve(true),
  reload: () => null,
  back: () => null,
  prefetch: () => Promise.resolve(),
  beforePopState: () => null,
  events: { on: () => null, off: () => null, emit: () => null },
  isFallback: false,
  isReady: true,
  isPreview: false,
}

export interface PreviewProps {
  children?: ReactNode
}

export function Preview(props: PreviewProps): JSX.Element {
  return (
    <RouterContext.Provider value={mockRouter}>
      <ErrorBoundary fallback={ErrorFallback}>{props.children}</ErrorBoundary>
    </RouterContext.Provider>
  )
}

function ErrorFallback(props: ErrorFallbackProps) {
  return (
    <section role="alert">
      <p>Sorry, something went wrong.</p>
      <button onClick={props.onReset}>Clear errors</button>
    </section>
  )
}
