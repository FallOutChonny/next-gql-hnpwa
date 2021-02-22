import React, { ErrorInfo } from 'react'

const MISSING_ERROR = 'Error was swallowed during propagation.'

type Props = {
  fallback: React.ComponentType<any>
}

type State = {
  error: Error | null
  info: ErrorInfo | null
}

export default class ErrorBoundary extends React.Component<Props, State> {
  state: State = {
    error: null,
    info: null,
  }

  componentDidCatch(error: Error | null, info: ErrorInfo) {
    this.setState({ error: error || new Error(MISSING_ERROR), info })
    this.logErrorToCloud(error, info)
  }

  logErrorToCloud = (error: Error | null, info: ErrorInfo) => {
    // TODO: send error report to service provider
  }

  render() {
    const { children, fallback } = this.props
    const { error, info } = this.state

    if (error) {
      return React.createElement(fallback, {
        error,
        componentStack: info ? info.componentStack : '',
      })
    }

    return children
  }
}
