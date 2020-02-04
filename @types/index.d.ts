declare module 'apollo-link-logger'

interface Window {
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: Function
}

declare namespace React {
  interface HTMLAttributes<T> extends DOMAttributes<T> {
    css?: import('react').CSSProperties
  }
}

declare namespace NodeJS {
  interface Process {
    browser: boolean
  }
}
