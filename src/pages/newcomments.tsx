import React from 'react'
import Link from 'next/link'
import App from 'components/app'
import Upvote from 'components/upvote'
import A from 'components/anchor-link'
import CommentText from 'components/comment-text'
import { timeSince } from 'utils/webHelper'
import { useNewComments, Comment } from '../graphql/new-comments'
import { withApollo } from '../graphql/client'

function NewCommentsPage() {
  const { data } = useNewComments()

  return (
    <App title="New Comments">
      <tr title="New Comments" className="height-10" />
      {data.edges.map(x => (
        <NewComment key={x.node.id} data={x.node} />
      ))}
      {data.pageInfo.hasNextPage && (
        <>
          <tr className="height-10" />
          <tr>
            <td colSpan={2} />
            <td className="text-10pt">
              <Link href={`/newcomments?p=${data.nextPage}`}>
                <A className="text-dark">More</A>
              </Link>
            </td>
          </tr>
        </>
      )}
    </App>
  )
}

const NewComment = ({ data }: { data: Comment }) => {
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
              <Link href={`/user?id=${data.id}`}>
                <A>{data.by}</A>
              </Link>
              &nbsp;
              <span>
                <Link href={`/user?id=${data.id}`}>
                  <A>{timeSince(data.time)}</A>
                </Link>
              </span>
              <span id={`unv_${data.id}`} />
              <span>
                &nbsp;|&nbsp;
                <Link href={`/user?id=${data.parent}`}>
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

export default withApollo(NewCommentsPage)
