import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import { NewsItems } from 'constants/types'
import Upvote from 'components/upvote'
import CommentText from 'components/comment-text'
import A from 'components/anchor-link'
import { timeSince } from 'utils/webHelper'

type Props = {
  data: NewsItems
  lvl?: number
  readOnly?: boolean
}

export default function CommentWithFooter({
  data,
  lvl = 0,
  readOnly = false,
}: Props) {
  const handleClick = () => {
    console.log(1234)
  }

  return (
    <tr id={`${data.id}`}>
      <td>
        <table>
          <tbody>
            <tr>
              <td>
                <img
                  src="/s.gif"
                  height={1}
                  width={lvl * 40}
                  alt="Hacker News PWA App"
                />
              </td>
              <td valign="top">
                <Upvote id={data.id} />
              </td>
              <td>
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
                    &nbsp;
                    <A onClick={handleClick}>[-]</A>
                  </span>
                </div>
                <CommentText html={data.text} />
                <div>
                  <Reply className={readOnly ? 'is--readonly' : ''}>
                    <A css={{ color: lvl > 0 ? '#000' : 'inherit' }}>
                      {readOnly ? '' : 'reply'}
                    </A>
                  </Reply>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  )
}

const Reply = styled.p`
  margin-top: 5px;
  margin-bottom: 0px;

  &.is--readonly {
    margin-top: 8px;
  }

  a {
    font-size: x-small;
    text-decoration: underline;
  }
`
