import { createGlobalStyle, css } from 'styled-components'
import { theme } from 'utils/theme'

export default createGlobalStyle`
  body {
    font-family: Verdana, Geneva, sans-serif;
    font-size: 10pt;
    color: #828282;
  }

  ${[1, 2, 3, 4, 5, 6, 10, 12, 14, 15, 16, 18, 146].map(
    x =>
      css`
        .width-${x} {
          width: ${x}px;
        }

        .height-${x} {
          height: ${x}px;
        }

        .pt-${x} {
          padding-top: ${x}px;
        }

        .pl-${x} {
          padding-left: ${x}px;
        }

        .pb-${x} {
          padding-bottom: ${x}px;
        }

        .pr-${x} {
          padding-right: ${x}px;
        }

        .mt-${x} {
          margin-top: ${x}px;
        }

        .mb-${x} {
          margin-bottom: ${x}px;
        }

        .ml-${x} {
          margin-left: ${x}px;
        }

        .mr-${x} {
          margin-right: ${x}px;
        }

        .margin-${x} {
          margin: ${x}px;
        }

        .padding-${x} {
          padding: ${x}px;
        }
      `,
  )};

  ${Object.keys(theme).map(
    t => css`
      .text--${t} {
        color: ${theme[t]};
      }

      .bg--${t} {
        background: ${theme[t]};
      }
    `,
  )}

  .d-block {
    display: block;
  }

  .width--full {
    width: 100%;
  }

  .text-right {
    text-align: right;
  }

  .text-white {
    color: #fff !important;
  }

  .text-7pt {
    font-size: 7pt;
  }

  .text-9pt {
    font-size: 9pt;
  }

  .text-8pt {
    font-size: 8pt;
  }

  .text-10pt {
    font-size: 10pt;
  }

  .text-dark {
    color: #000;
  }

  .text-underline {
    text-decoration: underline;
  }

  .text-600 {
    font-weight: 600;
  }

  .border--none {
    border: 0;
  }

  .cursor--pointer {
    cursor: pointer;
  }

  .m-block-end--1em {
    margin-block-end: 1em;
  }
`
