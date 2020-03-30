import React from 'react'
import Link from 'next/link'
import App from 'components/app'
import NewsItems from 'components/news-items'
import A from 'components/anchor-link'
import { Feed } from 'constants/types'
import { withApollo } from '../graphql/client'
import { useNewsItems } from '../graphql/news-items'

function NewestPage() {
  const { data, loading } = useNewsItems({ feed: Feed.NEWEST })

  return (
    <App title="New Links" loading={loading}>
      <tr className="height-10" />
      {data.edges.map((x, idx) => (
        <NewsItems
          key={x.node.id}
          data={{ ...x.node, rank: idx + 1 + data.startIndex }}
        />
      ))}
      {data.pageInfo.hasNextPage && (
        <>
          <tr className="height-10" />
          <tr>
            <td colSpan={2} />
            <td className="text-10pt text--grey">
              <Link href={`/newest?p=${data.nextPage}`}>
                <A>More</A>
              </Link>
            </td>
          </tr>
        </>
      )}
    </App>
  )
}

export default withApollo(NewestPage)