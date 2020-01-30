import { createGlobalStyle, css } from 'styled-components'
import { Theme } from 'utils/theme'
import { SPACINGS } from 'constants/enums'

const space = css`
  ${[1, 2, 4, 5, 10, 15, 18, 146].map(x =>
    Object.keys(SPACINGS).map(
      s => css`
      .${s}-${x} {
        ${SPACINGS[s]}: ${x}px;
      }
    `,
    ),
  )};

  .width--full {
    width: 100%;
  }
`

const topology = css`
  .text-right {
    text-align: right;
  }

  .text-8pt {
    font-size: 8pt;
  }

  .text-10pt {
    font-size: 10pt;
  }

  .text-dark {
    color: #222;
  }

  .text-600 {
    font-weight: 600;
  }

  .border--none {
    border: 0;
  }
`

const layout = css`
  .d-flex {
    display: flex;

    &.justify-content--center {
      justify-content: center;
    }

    &.align-items--center {
      align-items: center;
    }

    &.flex-direction--column {
      flex-direction: column;
    }
  }
`

const color = css`
  .bg-orange {
    background: ${(p: Theme) => p.theme.orange};
  }

  .bg-lightGrey {
    background: #f6f6ef;
  }
`

const component = css`
  .nav {
    a {
      color: #000;
      text-decoration: none;
    }

    a:visited {
      color: #828282;
    }

    &.nav__header {
      a:visited {
        color: #000;
      }
    }
  }
`

export default createGlobalStyle`
  body {
    font-family: Verdana, Geneva, sans-serif;
    font-size: 10pt;
    color: #828282;
  }

  ${space};
  ${topology};
  ${layout};
  ${color};
  ${component};
`
