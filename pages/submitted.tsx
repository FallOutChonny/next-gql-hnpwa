import React from 'react'
import { useRouter } from 'next/router'
import { Layout, NewsItems } from '@components/common'
import { Spacer, ReadMoreLink } from '@components/ui'
import { withApollo } from '@api/client'
import { useUserPosts } from '@api/user'

function SubmittedPage() {
  const { query } = useRouter()

  const { data, loading } = useUserPosts()

  const title = `${query.id}'s submissions`

  return (
    <Layout title={title} loading={loading} extra={title}>
      <Spacer title={title} />
      {data.edges.map((x, idx) => (
        <NewsItems
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
    </Layout>
  )
}

export default withApollo(SubmittedPage)
