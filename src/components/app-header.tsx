import React from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import Link from 'components/link'
import Divider from 'components/divider'
import A from 'components/anchor-link'

export default function AppHeader({
  extra,
}: {
  extra?: React.ReactNode | string
}) {
  const { pathname } = useRouter()

  const cx = (path: string) => (pathname === path ? 'text-white' : '')

  return (
    <tr>
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
                  <A className="text-dark no--underline">submit</A>
                  {extra ? (
                    <span className="text-white">
                      <Divider />
                      {extra}
                    </span>
                  ) : (
                    ''
                  )}
                </span>
              </td>
              <td className="text-right pr-4">
                <span>
                  <A className="text-dark no--underline">login</A>
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
