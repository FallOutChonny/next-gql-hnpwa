declare module 'apollo-link-logger'

interface Window {
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: Function
}

declare namespace React {
  interface HTMLAttributes<T> extends DOMAttributes<T> {
    css?: import('react').CSSProperties
  }
}

declare namespace JSX {
  interface IntrinsicElements {
    center: React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement>,
      HTMLElement
    >
  }
}

declare namespace NodeJS {
  interface Process {
    browser: boolean
  }
}
