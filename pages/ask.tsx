import React from 'react'
import { Layout, NewsItems } from '@components/common'
import { Spacer, ReadMoreLink } from '@components/ui'
import NewsItems from '@components/common/NewsItems'
import Feed from '@utils/feed'
import { useNewsItems } from '@api/news-items'
import { withApollo } from '@api/client'

function AskPage() {
  const { data, loading } = useNewsItems({ feed: Feed.ASK })

  return (
    <Layout title="Ask" loading={loading}>
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
    </Layout>
  )
}

export default withApollo(AskPage)
