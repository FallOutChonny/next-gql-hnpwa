import React from 'react'
import { useRouter } from 'next/router'
import App from 'components/app'
import NewsItemsIndex from 'components/news-items'
import ReadMoreLink from 'components/read-more-link'
import Spacer from 'components/spacer'
import { withApollo } from '../graphql/client'
import { useUserPosts } from '../graphql/user'

function SubmittedPage() {
  const { query } = useRouter()

  const { data, loading } = useUserPosts()

  const title = `${query.id}'s submissions`

  return (
    <App title={title} loading={loading} extra={title}>
      <Spacer title={title} />
      {data.edges.map((x, idx) => (
        <NewsItemsIndex
          key={x.node.id}
          data={{ ...x.node, rank: idx + data.startIndex + 1 }}
        />
      ))}
      <ReadMoreLink
        url={`/submitted?id=${query.id}&p=${data.nextPage}`}
        visible={data.pageInfo.hasNextPage}
        wrapperClassName="text-normal"
        className="text-dark"
        space={false}
      />
    </App>
  )
}

export default withApollo(SubmittedPage)
