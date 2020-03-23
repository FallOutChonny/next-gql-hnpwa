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
}

export default function Comment({ data, lvl = 0 }: Props) {
  const handleClick = () => {
    console.log(1234)
  }

  return (
    <tr id={`${data.id}`} className="athing comtr">
      <td>
        <table>
          <tbody>
            <tr>
              <td>
                <img src="/s.gif" height={1} width={lvl * 40} alt="s" />
              </td>
              <td valign="top">
                <Upvote id={data.id} />
              </td>
              <td>
                <div>
                  <span className="text-8pt">
                    <Link href={`/user?id=${data.id}`}>
                      <A>{data.by}</A>
                    </Link>
                    &nbsp;
                    <span>
                      <Link href={`/user?id=${data.id}`}>
                        <A>{timeSince(data.time)}</A>
                      </Link>
                    </span>
                    &nbsp;
                    <A onClick={handleClick}>[-]</A>
                  </span>
                </div>
                <CommentText html={data.text} />
                <div>
                  <Reply>
                    <A
                      className="text-underline"
                      css={{
                        fontSize: 'x-small',
                        color: lvl > 0 ? '#000' : 'inherit',
                      }}>
                      reply
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
`
