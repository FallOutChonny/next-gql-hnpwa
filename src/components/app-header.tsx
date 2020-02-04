import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import NavLink from 'components/nav-link'

export default function AppHeader() {
  return (
    <tr className="nav nav__header">
      <td className="bg-orange">
        <table
          className="width--full border--none pt-1 pr-2 pl-2"
          cellPadding={0}
          cellSpacing={0}>
          <tbody>
            <tr>
              <td className="pr-4 w-18">
                <Link href="/">
                  <a>
                    <Logo src="/y18.gif" />
                  </a>
                </Link>
              </td>
              <td className="h-10" style={{ lineHeight: '12pt' }}>
                <span className="text-dark">
                  <NavLink
                    title="Hacker News"
                    href="/news"
                    className="mr-5 mr-10 text-600"
                    segment={false}
                  />
                  <NavLink title="new" href="/newest" />
                  <NavLink title="past" href="/front" />
                  <NavLink title="comments" href="/newcomments" />
                  <NavLink title="ask" href="/ask" />
                  <NavLink title="show" href="/show" />
                  <NavLink title="jobs" href="/jobs" />
                  <NavLink title="submit" href="/submit" segment={false} />
                </span>
              </td>
              <td className="text-right pr-4">
                <span className="text-dark">
                  <NavLink
                    title="login"
                    href="/login?goto=ask"
                    segment={false}
                  />
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  )
}

const Logo = styled.img.attrs({
  width: 18,
  height: 18,
})`
  position: relative;
  top: 1px;
  border: 1px solid #fff;
`
