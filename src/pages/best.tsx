import React from 'react'
import App from 'components/app'
import NewsItems from 'components/news-items'
import ReadMoreLink from 'components/read-more-link'
import Spacer from 'components/spacer'
import { Feed } from 'constants/types'
import { withApollo } from '../graphql/client'
import { useNewsItems } from '../graphql/news-items'

function BestPage() {
  const { data, loading } = useNewsItems({ feed: Feed.BEST })

  return (
    <App loading={loading} title="Top Links" extra="best">
      <Spacer />
      {data.edges.map((x, idx) => (
        <NewsItems
          key={x.node.id}
          data={{ ...x.node, rank: idx + 1 + data.startIndex }}
        />
      ))}
      <ReadMoreLink
        visible={data.pageInfo.hasNextPage}
        url={`/best?p=${data.nextPage}`}
      />
    </App>
  )
}

export default withApollo(BestPage)
