import { useQuery, gql } from '@apollo/client'
import { useRouter } from 'next/router'
import pathOr from 'lodash.get'
import { POSTS_PER_PAGE } from './config'
import { defaultQueryResult } from './defaults'
import { NewsItemsData } from './news-items'

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

export const useBestComments = () => {
  const router = useRouter()
  const first = +pathOr(router, ['query', 'p'], 1)

  const { data, ...others } = useQuery<{ bestComments: NewsItemsData }>(query, {
    variables: { first },
  })

  return {
    data: {
      ...(pathOr(data, ['bestComments'], defaultQueryResult) as NewsItemsData),
      nextPage: first + 1,
      startIndex: (first - 1) * POSTS_PER_PAGE,
    },
    ...others,
  }
}
