import React from 'react'
import App from '@components/App'
import Comment from '@components/Comment'
import ReadMoreLink from '@components/ReadMoreLink'
import Spacer from '@components/Spacer'
import { useNewComments } from '@/apollo/new-comments'
import { withApollo } from '@/apollo/client'

function NewCommentsPage() {
  const { data, loading } = useNewComments()

  return (
    <App title="New Comments" loading={loading}>
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
    </App>
  )
}

export default withApollo(NewCommentsPage)
