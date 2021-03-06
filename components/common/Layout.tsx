import React from 'react'
import Head from 'next/head'
import theme from '@utils/theme'
import Header from './Header'
import Footer from './Footer'
import GlobalStyles from './GlobalStyles'

type Props = {
  children?: React.ReactNode
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

export default function Layout({
  title,
  children,
  extra,
  isFooterVisible = true,
  isNavVisible = true,
  width = '85%',
  table = {},
}: Props) {
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
                  <tbody>{children}</tbody>
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
