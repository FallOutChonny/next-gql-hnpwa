import React from 'react'
import App from '@/components/App'
import NewsItems from '@/components/NewsItems'
import ReadMoreLink from '@/components/ReadMoreLink'
import Spacer from '@/components/Spacer'
import { Feed } from '@/config/types'
import { withApollo } from 'apollo/client'
import { useNewsItems } from 'apollo/news-items'

function AskPage() {
  const { data, loading } = useNewsItems({ feed: Feed.ASK })

  return (
    <App title="Ask" loading={loading}>
      <Spacer height={6} />
      {data.edges.map((x, idx) => (
        <NewsItems
          key={x.node.id}
          data={{ ...x.node, rank: idx + 1 + data.startIndex }}
        />
      ))}
      <ReadMoreLink
        visible={data.pageInfo.hasNextPage}
        url={`/ask?p=${data.nextPage}`}
      />
    </App>
  )
}

export default withApollo(AskPage)
