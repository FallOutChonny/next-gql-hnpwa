import React from 'react'
import App from 'components/app'
import CommentList from 'components/comment-list'
import { withApollo } from '../graphql/client'

function ThreadsPage() {
  return (
    <App title={''}>
      <tr className="height-10" title={''} />
    </App>
  )
}

export default withApollo(ThreadsPage)
