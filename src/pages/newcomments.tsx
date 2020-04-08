import React from 'react'
import App from 'components/app'
import Comment from 'components/comment'
import ReadMoreLink from 'components/read-more-link'
import Spacer from 'components/spacer'
import { useNewComments } from '../graphql/new-comments'
import { withApollo } from '../graphql/client'

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
