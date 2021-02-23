import React from 'react'
import Link from 'next/link'
import { A, Upvote, LinkTitle } from '@components/ui'
import { timeSince, getHostname } from '@utils/web-helper'
import Feed from '@utils/feed'
import type { NewsItems } from '@api/news-items'

type Props = {
  data: NewsItems
  isRankVisible?: boolean
}

export default function NewsItemsIndex({ data, isRankVisible = true }: Props) {
  // the fields of job story is different
  const isJobStories = data.type === Feed.JOB

  return (
    <>
      <tr id={`${data.id}`}>
        <td valign="top" align="right" className="text-10pt text-grey">
          {isJobStories || !isRankVisible ? '' : `${data.rank}.`}
        </td>
        <td valign="top">{!isJobStories && <Upvote id={data.id} />}</td>
        <td className="text-10pt text-grey">
          <LinkTitle href={data.url}>{data.title}</LinkTitle>
          {data.url && (
            <span className="ml-2 text-8pt text-grey">
              (
              <Link href={`/from?site=${getHostname(data.url)}`}>
                <A className="text-grey">{getHostname(data.url)}</A>
              </Link>
              )
            </span>
          )}
        </td>
      </tr>
      <tr>
        <td colSpan={2} />
        <td className="text-7pt text-grey">
          {isJobStories && (
            <span>
              <Link href={`/item?id=${data.id}`}>
                <A>{timeSince(data.time)}</A>
              </Link>
            </span>
          )}
          {!isJobStories && (
            <>
              <span id={`score_${data.id}`}>{data.score} points</span> by{' '}
              <A href={`/user?id=${data.by}`}>{data.by}</A>{' '}
              <span>
                <Link href={`/item?id=${data.id}`}>
                  <A>{timeSince(data.time)}</A>
                </Link>
              </span>
              <span id={`unv_${data.id}`}>
                &nbsp;|&nbsp;
                <Link href={`/hide?id=${data.id}`} prefetch={false}>
                  <A>hide</A>
                </Link>
                &nbsp;|&nbsp;
              </span>
              <Link href={`/item?id=${data.id}`}>
                <A>{(data.kids || []).length} comments</A>
              </Link>
            </>
          )}
        </td>
      </tr>
      <tr className="height-5" />
    </>
  )
}
