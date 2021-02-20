import React from 'react'
import Link from 'next/link'
import App from '@/components/App'
import A from '@/components/AnchorLink'

export default function ListsPage() {
  return (
    <App
      title="Lists"
      table={{
        props: { cellPadding: 1, cellSpacing: 1 },
        style: { borderSpacing: '7px 0' },
      }}>
      <tr className="height-10" />
      <tr>
        <td>
          <A>leaders</A>
        </td>
        <td>Users with most karma</td>
      </tr>
      <tr>
        <td>
          <Link href="/front">
            <A>front</A>
          </Link>
        </td>
        <td>
          Front page submissions for a given day (e.g.{' '}
          <A href="front?day=2016-06-20">2016-06-20</A>), ordered by time spent
          there
        </td>
      </tr>
      <tr>
        <td>
          <Link href="/best">
            <A>best</A>
          </Link>
        </td>
        <td>Highest-voted recent links</td>
      </tr>
      <tr>
        <td>
          <A>active</A>
        </td>
        <td>Most active current discussions</td>
      </tr>
      <tr>
        <td>
          <Link href="/bestcomments">
            <A>bestcomments</A>
          </Link>
        </td>
        <td>Highest-voted recent comments</td>
      </tr>
      <tr>
        <td>
          <A>noobstories</A>
        </td>
        <td>Submissions from new accounts</td>
      </tr>
      <tr>
        <td>
          <A>noobcomments</A>
        </td>
        <td>Comments from new accounts</td>
      </tr>
    </App>
  )
}
