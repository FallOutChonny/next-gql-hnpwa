import React from 'react'
import Link from 'next/link'
import Head from 'next/head'
import { createGlobalStyle } from 'styled-components'
import A from '@/components/AnchorLink'
import theme from '@/utils/theme'

type Props = {
  title?: string
  children: React.ReactNode
  footer?: React.ReactNode | string
  isFooterVisible?: boolean
  width?: string | number
}

const GlobalStyles = createGlobalStyle`
  b {
    color: #333;
  }

  a:link {
    color: #222;
  }

  a:visited {
    color: #444;
  }

  td {
    font-family: Verdana;
    font-size: 8.5pt;
    line-height: 138%;
  }

  p {
    margin-bottom: 15px;
  }

  .text--center {
    text-align: center;
  }
`

export default function StaticPage({
  children,
  title = 'Hacker News',
  footer,
  isFooterVisible = true,
  width = 500,
}: Props) {
  return (
    <>
      <Head>
        <meta name="referrer" content="origin" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#72B340" />
        <meta name="title" content="Hacker News Clone" />
        <meta
          name="description"
          content="Hacker news clone app built with react, next.js and apollo graphql"
        />
        <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
        <title>{title}</title>
      </Head>
      <GlobalStyles />
      <center>
        <table
          id="hnmain"
          css={{ width, border: 0, marginTop: 36 }}
          cellPadding={0}
          cellSpacing={0}>
          <tbody>
            <tr>
              <td css={{ background: '#fafaf0' }}>
                <Link href="/">
                  <A>
                    <img src="/yc500.gif" alt="Hacker News PWA App" />
                  </A>
                </Link>
                <div css={{ marginTop: 12 }} />
                {children}
                {isFooterVisible && (
                  <>
                    {footer}
                    <br />
                    <br />
                    <br />
                    <table
                      css={{ width: '100%', background: theme.orange }}
                      cellPadding={0}>
                      <tbody>
                        <tr>
                          <td></td>
                        </tr>
                      </tbody>
                    </table>
                    <p>
                      <span>
                        <br />
                        <br />
                      </span>
                    </p>
                  </>
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </center>
    </>
  )
}
