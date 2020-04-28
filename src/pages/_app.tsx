import React from 'react'
import NextApp from 'next/app'
import { ThemeProvider } from 'styled-components'
import ErrorBoundary from 'components/error-boundary'
import Loading from 'components/skeleton'
import theme from 'utils/theme'

const Suspense = ({ children, ssr, reload }) => {
  const [suspense, setSuspense] = React.useState(!ssr)
  React.useEffect(() => {
    if (!suspense && reload) {
      setSuspense(true)
    }
  }, [ssr])
  return suspense || !ssr ? (
    <React.Suspense fallback={<Loading list={4} />}>{children}</React.Suspense>
  ) : (
    <>{children}</>
  )
}

export default class App extends NextApp {
  render() {
    const { Component, pageProps } = this.props
    return (
      <ErrorBoundary
        fallback={({ error, componentStack }) => (
          <>
            <h1>Something went wrong.</h1>
            {error && error.toString()}
            <p style={{ whiteSpace: 'pre-wrap' }}>{componentStack}</p>
          </>
        )}>
        <Suspense ssr={pageProps.ssr} reload={false}>
          <ThemeProvider theme={theme}>
            <Component {...pageProps} />
          </ThemeProvider>
        </Suspense>
      </ErrorBoundary>
    )
  }
}
