import React from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import App from 'components/app'
import NewsItemsIndex from 'components/news-items'
import A from 'components/anchor-link'
import { withApollo } from '../graphql/client'
import { useUserPosts } from '../graphql/user'

function SubmittedPage() {
  const { query } = useRouter()

  const { data, loading } = useUserPosts()

  const title = `${query.id}'s submissions`

  return (
    <App title={title} loading={loading} extra={title}>
      <tr className="height-10" title={title} />
      {data.edges.map((x, idx) => (
        <NewsItemsIndex
          key={x.node.id}
          data={{ ...x.node, rank: idx + data.startIndex + 1 }}
        />
      ))}
      {data.pageInfo.hasNextPage && (
        <tr>
          <td colSpan={2} />
          <td>
            <Link href={`/submitted?id=${query.id}&p=${data.nextPage}`}>
              <A className="text-dark">More</A>
            </Link>
          </td>
        </tr>
      )}
    </App>
  )
}

export default withApollo(SubmittedPage)
