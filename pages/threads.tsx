import React from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { Layout } from '@components/common'
import { A, Spacer } from '@components/ui'
import { CommentList } from '@components/comment'
import { useUserPosts } from '@api/user'
import { withApollo } from '@api/client'

function ThreadsPage() {
  const { query } = useRouter()

  const { data, loading } = useUserPosts({ feed: 'comment' })

  const title = `${query.id}'s threads`

  return (
    <Layout title={title} loading={loading} extra={title}>
      <Spacer title={title} />
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
                      <img
                        src="/s.gif"
                        height={1}
                        width={0}
                        alt="Hacker News PWA App"
                      />
                    </td>
                    <td>
                      <img
                        src="/s.gif"
                        height={1}
                        width={14}
                        alt="Hacker News PWA App"
                      />
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
    </Layout>
  )
}

export default withApollo(ThreadsPage)
