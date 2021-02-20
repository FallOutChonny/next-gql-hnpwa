import React from 'react'
import NextApp from 'next/app'
import { ThemeProvider } from 'styled-components'
import ErrorBoundary from '@components/ErrorBoundary'
// import Loading from '@components/Skeleton'
import theme from '@utils/theme'

const Suspense = ({ children, ssr, reload }) => {
  // const [suspense, setSuspense] = React.useState(!ssr)
  // React.useEffect(() => {
  //   if (!suspense && reload) {
  //     setSuspense(true)
  //   }
  // }, [ssr])
  // return suspense || !ssr ? (
  //   <React.Suspense fallback={<Loading list={4} />}>{children}</React.Suspense>
  // ) : (
  //   <>{children}</>
  // )
  return <>{children}</>
}

export default class App extends NextApp {
  render() {
    const { Component, pageProps } = this.props
    return (
      <ErrorBoundary
        fallback={({ error, componentStack }) => (
          <>
            <p>Something went wrong.</p>
            {error && error.toString()}
            <p css={{ whiteSpace: 'pre-wrap' }}>{componentStack}</p>
          </>
        )}>
        <Suspense ssr={false} reload={false}>
          <ThemeProvider theme={theme}>
            <Component {...pageProps} />
          </ThemeProvider>
        </Suspense>
      </ErrorBoundary>
    )
  }
}
