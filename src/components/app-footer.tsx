import React from 'react'
import Divider from 'components/divider'
import Link from 'components/link'

const linkCls = 'text--grey no--underline'

export default function AppFooter() {
  return (
    <tr>
      <td>
        <img src="/s.gif" height={10} width={0} alt="nav" />
        <table className="width--full" cellSpacing={0} cellPadding={1}>
          <tbody>
            <tr>
              <td className="bg--orange" />
            </tr>
          </tbody>
        </table>
        <br />
        <center>
          <a className={linkCls} href="https://www.ycombinator.com/apply/">
            Applications are open for YC Summer 2020
          </a>
        </center>
        <br />
        <center>
          <div className="text-8pt">
            <Link href="/newsguidelines" title="Guidelines" />
            <Link href="/newsfaq" title="FAQ" />
            <a className={linkCls} href="mailto:hn@ycombinator.com">
              Support
            </a>
            <Divider />
            <a className={linkCls} href="https://github.com/HackerNews/API">
              API
            </a>
            <Divider />
            <Link href="/security" title="Security" />
            <Link href="/lists" title="Lists" />
            <Link href="/bookmarklet" title="Bookmarklet" />
            <a className={linkCls} href="http://www.ycombinator.com/legal/">
              Legal
            </a>
            <Divider />
            <a className={linkCls} href="http://www.ycombinator.com/apply/">
              Apply to YC
            </a>
            <Divider />
            <a className={linkCls} href="mailto:hn@ycombinator.com">
              Contact
            </a>
          </div>
          <form
            method="get"
            className="mt-15 m-block-end--1em"
            action="//hn.algolia.com/">
            <label htmlFor="search" className="mr-5 text--grey">
              Search:
            </label>
            <input
              id="search"
              type="text"
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
