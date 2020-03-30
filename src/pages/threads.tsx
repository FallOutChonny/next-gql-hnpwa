import React from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import App from 'components/app'
import A from 'components/anchor-link'
import CommentList from 'components/comment-list'
import { useUserPosts } from '../graphql/user'
import { withApollo } from '../graphql/client'

function ThreadsPage() {
  const { query } = useRouter()

  const { data, loading } = useUserPosts({ feed: 'comment' })

  const title = `${query.id}'s threads`

  return (
    <App title={title} loading={loading} extra={title}>
      <tr className="height-10" title={title} />
      {data.edges.map(comment => (
        <CommentList
          key={comment.cursor}
          data={comment.node}
          render={rows =>
            React.Children.map(rows as any, child =>
              React.cloneElement(child, { readOnly: true }),
            )
          }
        />
      ))}
      {data.pageInfo.hasNextPage && (
        <>
          <tr className="height-10" />
          <tr>
            <td>
              <table>
                <tbody>
                  <tr>
                    <td>
                      <img src="/s.gif" height={1} width={0} alt="s" />
                    </td>
                    <td>
                      <img src="/s.gif" height={1} width={14} alt="s" />
                    </td>
                    <td>
                      <Link href={`/threads?id=${query.id}&p=${data.nextPage}`}>
                        <A>More</A>
                      </Link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </>
      )}
    </App>
  )
}

export default withApollo(ThreadsPage)