import React from 'react'
import { useQuery, gql } from '@apollo/client'
import Link from 'next/link'
import { useRouter } from 'next/router'
import pathOr from 'lodash.get'
import App from 'components/app'
import Comment from 'components/comment'
import A from 'components/anchor-link'
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
      <tr className="height-10" />
      {data.edges.map((x, idx) => (
        <Comment key={x.node.id} data={x.node} />
      ))}
      {data.pageInfo.hasNextPage && (
        <>
          <tr className="height-10" />
          <tr>
            <td colSpan={2} />
            <td className="text-10pt text--grey">
              <Link href={`/?p=${data.nextPage}`}>
                <A>More</A>
              </Link>
            </td>
          </tr>
        </>
      )}
    </App>
  )
}

export default withApollo(BestCommentsPage)
