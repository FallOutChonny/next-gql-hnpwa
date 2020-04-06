import React from 'react'
import Head from 'next/head'
import Footer from 'components/app-footer'
import Header from 'components/app-header'
import GlobalStyles from 'components/global-styles'
import theme from 'utils/theme'
// import Spin from 'components/spin'

type Props = {
  children: React.ReactNode
  table?: {
    props?: React.DetailedHTMLProps<
      React.TableHTMLAttributes<HTMLTableElement>,
      HTMLTableElement
    >
    style?: React.CSSProperties
  }
  title?: string
  isFooterVisible?: boolean
  isNavVisible?: boolean
  loading?: boolean
  width?: string | number
  extra?: string | React.ReactNode
}

const defaultTableProps = {
  border: 0,
  cellPadding: 0,
  cellSpacing: 0,
}

export default function App({
  title,
  children,
  extra,
  // loading = false,
  isFooterVisible = true,
  isNavVisible = true,
  width = '85%',
  table = {},
}: Props) {
  // const isLoading = process.browser && loading

  return (
    <>
      <Head>
        <meta name="referrer" content="origin" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="title" content="Hacker News Clone" />
        <meta name="theme-color" content={theme.orange} />
        <meta
          name="description"
          content="Hacker news clone app built with react, next.js and apollo graphql"
        />
        <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
        <title>{title ? `${title} | ` : ''}Hacker News</title>
      </Head>
      <GlobalStyles />
      <center>
        <table
          {...defaultTableProps}
          id="hnmain"
          css={{ width, background: '#f6f6ef' }}>
          <tbody>
            {isNavVisible && <Header extra={extra} />}
            <tr id="pagespace" title={title} />
            <tr>
              <td>
                <table
                  {...defaultTableProps}
                  {...table.props}
                  style={table.style}
                  className="itemlist">
                  <tbody>
                    {/* {isLoading && <Spin spin className="mt-10 ml-10" />} */}
                    {/* {!isLoading ? children : null} */}
                    {children}
                  </tbody>
                </table>
              </td>
            </tr>
            {isFooterVisible && <Footer />}
          </tbody>
        </table>
      </center>
    </>
  )
}
