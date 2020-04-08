import React from 'react'
import { useQuery, gql } from '@apollo/client'
import { useRouter } from 'next/router'
import pathOr from 'lodash.get'
import App from 'components/app'
import Comment from 'components/comment'
import ReadMoreLink from 'components/read-more-link'
import Spacer from 'components/spacer'
import { POSTS_PER_PAGE } from '../config'
import { QueryResult, NewsItems, nullQueryResult } from 'constants/types'
import { withApollo } from '../graphql/client'

const query = gql`
  query BestComments($first: Int) {
    bestComments(first: $first) {
      edges {
        cursor
        node {
          id
          text
          by
          time
          title
        }
      }
      pageInfo {
        hasNextPage
        totalPageCount
      }
    }
  }
`

const useBestComments = () => {
  const router = useRouter()
  const first = +pathOr(router, ['query', 'p'], 1)

  const { data, ...others } = useQuery<{
    bestComments: QueryResult<NewsItems>
  }>(query, {
    variables: { first },
  })

  return {
    data: {
      ...(pathOr(data, ['bestComments'], nullQueryResult) as QueryResult<
        NewsItems
      >),
      nextPage: first + 1,
      startIndex: (first - 1) * POSTS_PER_PAGE,
    },
    ...others,
  }
}

function BestCommentsPage() {
  const { data, loading } = useBestComments()

  return (
    <App loading={loading} title="Best Comments" extra="best comments">
      <Spacer />
      {data.edges.map(x => (
        <Comment key={x.node.id} data={x.node} />
      ))}
      <ReadMoreLink
        visible={data.pageInfo.hasNextPage}
        url={`/bestcomments?p=${data.nextPage}`}
      />
    </App>
  )
}

export default withApollo(BestCommentsPage)
