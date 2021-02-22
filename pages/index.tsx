import React from 'react'
import { Layout, NewsItems } from '@components/common'
import { Spacer, ReadMoreLink } from '@components/ui'
import Feed from '@utils/feed'
import { useNewsItems } from '@api/news-items'
import { withApollo } from '@api/client'

function IndexPage() {
  const { data, loading } = useNewsItems({ feed: Feed.TOP })

  return (
    <Layout loading={loading}>
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
    </Layout>
  )
}

export default withApollo(IndexPage)
