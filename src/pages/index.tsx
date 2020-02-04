import React from 'react'
import App from 'components/app'
import { withApollo } from '../graphql/client'
import { useNewsItems } from '../graphql/news-items'

function IndexPage() {
  const { data } = useNewsItems()

  if (data) {
    const { newsItems } = data

    if (typeof window !== 'undefined') {
      console.log(newsItems)
    }

    return (
      <App>
        <tr>
          <td>111</td>
        </tr>
      </App>
    )
  }

  return null
}

export default withApollo(IndexPage)
