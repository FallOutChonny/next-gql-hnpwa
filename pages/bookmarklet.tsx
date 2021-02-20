import React from 'react'
import Link from 'next/link'
import App from '@components/StaticPage'
import A from '@components/AnchorLink'
import theme from '@utils/theme'

export default function BookmarkletPage() {
  return (
    <App title="Y Combinator: Bookmarklet" isFooterVisible={false}>
      <b>Bookmarklet</b>
      <br />
      <br />
      <div id="main">
        <p id="first">
          Thanks to Phil Kast for writing this bookmarklet for submitting links
          to <a href="http://news.ycombinator.com">Hacker News</a>. When you
          click on the bookmarklet, it will submit the page you're on. To
          install, drag this link to your browser toolbar:
          <br />
          <br />
        </p>
        <center>
          <Link href="/">
            <A
              css={{
                fontSize: '2em',
                color: '#777',
                textDecoration: 'underline',
              }}>
              post to HN
            </A>
          </Link>
        </center>
        <table
          css={{ width: '100%', background: theme.orange, marginTop: 26 }}
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
      </div>
    </App>
  )
}
