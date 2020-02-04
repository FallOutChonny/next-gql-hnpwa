import React from 'react'
import Head from 'next/head'
import Footer from 'components/app-footer'
import Header from 'components/app-header'
import GlobalStyles from 'components/global-styles'

type Props = {
  children: React.ReactNode
  title?: string
}

const tableProps = {
  border: 0,
  cellPadding: 0,
  cellSpacing: 0,
}

export default function App({ title, children }: Props) {
  return (
    <>
      <Head>
        <meta name="referrer" content="origin" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="shortcut icon" href="favicon.ico" />
        <title>{title} | Hacker News</title>
      </Head>
      <GlobalStyles />
      <div className="d-flex justify-content--center">
        <table
          {...tableProps}
          id="hnmain"
          className="bg-lightGrey"
          style={{ width: '85%' }}>
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
            <Footer />
          </tbody>
        </table>
      </div>
    </>
  )
}
