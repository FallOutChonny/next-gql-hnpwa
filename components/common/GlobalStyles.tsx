import { createGlobalStyle, css } from 'styled-components'
import { theme } from '@utils/theme'

const device = {
  mobileS: `(max-width: 320px)`,
  mobileM: `(max-width: 375px)`,
  mobileL: `(max-width: 425px)`,
  tablet: `(max-width: 768px)`,
}

export default createGlobalStyle`
  body {
    font-family: Verdana, Geneva, sans-serif;
    font-size: 10pt;
    color: #828282;
  }

  ${[1, 2, 3, 4, 5, 6, 10, 14, 15, 16, 18, 146].map(
    x =>
      css`
        .w-${x} {
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

        .m-${x} {
          margin: ${x}px;
        }

        .p-${x} {
          padding: ${x}px;
        }
      `,
  )};

  ${Object.keys(theme).map(
    t => css`
      .text-${t} {
        color: ${theme[t]};
      }

      .bg-${t} {
        background: ${theme[t]};
      }
    `,
  )}

  .block {
    display: block;
  }

  .w-full {
    width: 100%;
  }

  .text-right {
    text-align: right;
  }

  .text-white {
    color: #fff !important;
  }

  .text-dark {
    color: #000;
  }

  .text-normal {
    color: inherit;
  }

  .text-7pt {
    font-size: 7pt;
  }

  .text-8pt {
    font-size: 8pt;
  }

  .text-9pt {
    font-size: 9pt;
  }

  .text-10pt {
    font-size: 10pt;
  }

  @media ${device.tablet} {
    .text-7pt {
      font-size: 12px;
    }

    .text-8pt {
      font-size: 12px;
    }
  }

  .font-semibold {
    font-weight: 600;
  }

  .underline {
    text-decoration: underline;
  }

  .no-underline {
    text-decoration: none;
  }

  a.no-underline:hover {
    text-decoration: none;
  }

  .border-0 {
    border: 0;
  }

  .m-block-end-1em {
    margin-block-end: 1em;
  }
`
