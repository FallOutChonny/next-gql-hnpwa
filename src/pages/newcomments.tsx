import React from 'react'
import Link from 'next/link'
import App from 'components/app'
import A from 'components/anchor-link'
import Comment from 'components/comment'
import { useNewComments } from '../graphql/new-comments'
import { withApollo } from '../graphql/client'

function NewCommentsPage() {
  const { data, loading } = useNewComments()

  if (process.browser) {
    console.log(data)
  }

  return (
    <App title="New Comments" loading={loading}>
      <tr title="New Comments" className="height-10" />
      {data.edges.map(x => (
        <Comment key={x.node.id} data={x.node} />
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

export default withApollo(NewCommentsPage)
