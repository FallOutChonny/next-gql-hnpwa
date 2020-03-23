import React from 'react'
import Divider from 'components/divider'
import Link from 'components/link'

export default function AppFooter() {
  return (
    <tr className="nav">
      <td>
        <img src="/s.gif" height={10} width={0} alt="nav" />
        <table className="width--full" cellSpacing={0} cellPadding={1}>
          <tbody>
            <tr>
              <td className="bg--orange"></td>
            </tr>
          </tbody>
        </table>
        <br />
        <center>
          <div className="text-8pt">
            <Link href="/newsguidelines" title="Guidelines" />
            <Link href="/newsfaq" title="FAQ" />
            <a href="mailto:hn@ycombinator.com">Support</a>
            <Divider />
            <a href="https://github.com/HackerNews/API">API</a>
            <Divider />
            <Link href="/security" title="Security" />
            <Link href="/lists" title="Lists" />
            <Link href="/libookmarkletsts" title="Bookmarklet" />
            <a href="http://www.ycombinator.com/legal/">Legal</a>
            <Divider />
            <a href="http://www.ycombinator.com/apply/">Apply to YC</a>
            <Divider />
            <a href="mailto:hn@ycombinator.com">Contact</a>
          </div>
          <form
            method="get"
            className="mt-15 m-block-end--1em"
            action="//hn.algolia.com/">
            <span className="mr-5">Search:</span>
            <input
              name="q"
              size={17}
              autoCorrect="off"
              spellCheck="false"
              autoCapitalize="off"
              autoComplete="false"
              className="width-146 text-10pt"
            />
          </form>
        </center>
      </td>
    </tr>
  )
}
