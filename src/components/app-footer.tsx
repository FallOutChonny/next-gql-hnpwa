import React from 'react'
import { Segment } from 'components/layouts'
import NavLink from 'components/nav-link'

export default function AppFooter() {
  return (
    <tr className="nav">
      <td>
        <img src="/s.gif" height={10} width={0} />
        <table className="width--full" cellSpacing={0} cellPadding={1}>
          <tbody>
            <tr>
              <td className="bg-orange"></td>
            </tr>
          </tbody>
        </table>
        <br />
        <div className="d-flex justify-content--center align-items--center flex-direction--column">
          <div className="text-8pt">
            <NavLink href="/newsguidelines" title="Guidelines" />
            <NavLink href="/newsfaq" title="FAQ" />
            <a href="mailto:hn@ycombinator.com">Support</a>
            <Segment />
            <a href="https://github.com/HackerNews/API">API</a>
            <Segment />
            <NavLink href="/security" title="Security" />
            <NavLink href="/lists" title="Lists" />
            <NavLink href="/libookmarkletsts" title="Bookmarklet" />
            <a href="http://www.ycombinator.com/legal/">Legal</a>
            <Segment />
            <a href="http://www.ycombinator.com/apply/">Apply to YC</a>
            <Segment />
            <a href="mailto:hn@ycombinator.com">Contact</a>
          </div>
          <form
            method="get"
            className="mt-15"
            action="//hn.algolia.com/"
            style={{ marginBlockEnd: '1em' }}>
            <span className="mr-5">Search:</span>
            <input
              name="q"
              size={17}
              autoCorrect="off"
              spellCheck="false"
              autoCapitalize="off"
              autoComplete="false"
              className="w-146 text-10pt"
            />
          </form>
        </div>
      </td>
    </tr>
  )
}
