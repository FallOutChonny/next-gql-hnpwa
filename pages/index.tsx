import React from 'react'
import App from '@components/App'
import NewsItems from '@components/NewsItems'
import ReadMoreLink from '@components/ReadMoreLink'
import Spacer from '@components/Spacer'
import { Feed } from '@config/types'
import { withApollo } from '@/apollo/client'
import { useNewsItems } from '@/apollo/news-items'

function IndexPage() {
  const { data, loading } = useNewsItems({ feed: Feed.TOP })

  return (
    <App loading={loading}>
      <Spacer />
      {data.edges.map((x, idx) => (
        <NewsItems
          key={x.node.id}
          data={{ ...x.node, rank: idx + 1 + data.startIndex }}
        />
      ))}
      <ReadMoreLink
        visible={data.pageInfo.hasNextPage}
        url={`/?p=${data.nextPage}`}
      />
    </App>
  )
}

export default withApollo(IndexPage)
