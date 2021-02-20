import React from 'react'
import { useRouter } from 'next/router'
import App from '@components/App'
import NewsItemsIndex from '@components/NewsItems'
import ReadMoreLink from '@components/ReadMoreLink'
import Spacer from '@components/Spacer'
import { withApollo } from '@/apollo/client'
import { useUserPosts } from '@/apollo/user'

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
