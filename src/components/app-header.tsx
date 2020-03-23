import React from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import Link from 'components/link'

export default function AppHeader() {
  const { pathname } = useRouter()

  const cx = (path: string) => (pathname === path ? 'text-white' : '')

  return (
    <tr className="nav nav__header">
      <td className="bg--orange">
        <table
          className="width--full border--none pt-1 pr-2 pl-2"
          cellPadding={0}
          cellSpacing={0}>
          <tbody>
            <tr>
              <td className="pr-4 width-18">
                <Link
                  href="/"
                  title={<Logo src="/y18.gif" />}
                  segment={false}
                />
              </td>
              <td className="h-10" css={{ lineHeight: '12pt' }}>
                <span className="text-dark">
                  <Link
                    title="Hacker News"
                    href="/news"
                    className="mr-10 text-600"
                    segment={false}
                  />
                  <Link title="new" href="/newest" className={cx('/newest')} />
                  <Link title="past" href="/front" className={cx('/front')} />
                  <Link
                    title="comments"
                    href="/newcomments"
                    className={cx('/newcomments')}
                  />
                  <Link title="ask" href="/ask" className={cx('/ask')} />
                  <Link title="show" href="/show" className={cx('/show')} />
                  <Link title="jobs" href="/jobs" className={cx('/jobs')} />
                  <Link title="submit" href="/submit" segment={false} />
                </span>
              </td>
              <td className="text-right pr-4">
                <span className="text-dark">
                  <Link title="login" href="/login?goto=ask" segment={false} />
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
