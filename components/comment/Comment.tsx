import React from 'react'
import Link from 'next/link'
import { A, Upvote } from '@components/ui'
import type { Comment } from '@api/comments'
import { timeSince } from '@utils/web-helper'
import CommentText from './CommentText'

export default function CommentIndex({ data }: { data: Comment }) {
  return (
    <>
      <tr>
        <td />
        <td valign="top">
          <Upvote id={data.id} />
        </td>
        <td className="text--grey text-10pt">
          <div>
            <span className="text-8pt">
              <Link href={`/user?id=${data.by}`}>
                <A>{data.by}</A>
              </Link>
              &nbsp;
              <span>
                <Link href={`/user?id=${data.by}`}>
                  <A>{timeSince(data.time)}</A>
                </Link>
              </span>
              <span id={`unv_${data.id}`} />
              <span>
                &nbsp;|&nbsp;
                <Link href={`/item?id=${data.parent}`}>
                  <A>parent</A>
                </Link>
              </span>
              <span>
                &nbsp;| on:&nbsp;
                <Link href={`/item?id=${data.parent}`}>
                  <A>{data.title}</A>
                </Link>
              </span>
            </span>
          </div>
          <CommentText html={data.text} />
        </td>
      </tr>
      <tr className="height-15" />
    </>
  )
}
