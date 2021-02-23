import React from 'react'
import { Layout } from '@components/common'
import { Comment } from '@components/comment'
import { Spacer, ReadMoreLink } from '@components/ui'
import { useNewComments } from '@api/comments'
import { withApollo } from '@api/client'

function NewCommentsPage() {
  const { data, loading } = useNewComments()

  return (
    <Layout title="New Comments" loading={loading}>
      <Spacer title="New Comments" />
      {data.edges.map(x => (
        <Comment key={x.node.id} data={x.node} />
      ))}
      <ReadMoreLink
        visible={data.pageInfo.hasNextPage}
        url={`/newcomments?p=${data.nextPage}`}
        wrapperClassName="text-normal"
        className="text-dark"
      />
    </Layout>
  )
}

export default withApollo(NewCommentsPage)
