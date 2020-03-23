import React from 'react'
import Head from 'next/head'
import Footer from 'components/app-footer'
import Header from 'components/app-header'
import GlobalStyles from 'components/global-styles'

type Props = {
  children: React.ReactNode
  title?: string
  isFooterVisible?: boolean
}

const tableProps = {
  border: 0,
  cellPadding: 0,
  cellSpacing: 0,
}

export default function App({
  title,
  children,
  isFooterVisible = true,
}: Props) {
  return (
    <>
      <Head>
        <meta name="referrer" content="origin" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
        <title>{title ? `${title} | ` : ''}Hacker News</title>
      </Head>
      <GlobalStyles />
      <center>
        <table
          {...tableProps}
          id="hnmain"
          css={{ width: '85%', background: '#f6f6ef' }}>
          <tbody>
            <Header />
            <tr id="pagespace" title={title} />
            <tr>
              <td>
                <table {...tableProps} className="itemlist">
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
