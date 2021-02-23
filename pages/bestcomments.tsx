import React from 'react'
import { Layout } from '@components/common'
import { Comment } from '@components/comment'
import { Spacer, ReadMoreLink } from '@components/ui'
import { useBestComments } from '@api/comments'
import { withApollo } from '@api/client'

function BestCommentsPage() {
  const { data, loading } = useBestComments()

  return (
    <Layout loading={loading} title="Best Comments" extra="best comments">
      <Spacer />
      {data.edges.map(x => (
        <Comment key={x.node.id} data={x.node} />
      ))}
      <ReadMoreLink
        visible={data.pageInfo.hasNextPage}
        url={`/bestcomments?p=${data.nextPage}`}
      />
    </Layout>
  )
}

export default withApollo(BestCommentsPage)
