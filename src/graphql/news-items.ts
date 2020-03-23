import gql from 'graphql-tag'
import { useRouter } from 'next/router'
import { useQuery } from '@apollo/react-hooks'
import { pathOr } from 'ramda'
import { POSTS_PER_PAGE } from '../config'
import { QueryResult, nullQueryResult, NewsItems } from '../constants/types'
import {
  fetch,
  fetchNewsItems,
  loopFetchNewsItemsComments,
} from '../utils/hn-data-api'
import { newsItemsFragment } from './typeDefs'

export const typeDefs = /* GraphQL */ `
  enum Feed {
    top
    ask
    job
    show
    new
    best
  }

  type NewsItems {
    by: String
    id: ID
    score: Int
    text: String
    time: Int
    title: String
    type: String
    url: String
    kids: [NewsItems]
  }

  type NewsItemsEdge {
    cursor: String!
    node: NewsItems!
  }

  type NewsItemsConnection {
    pageInfo: PageInfo!
    edges: [NewsItemsEdge]
  }

  input NewsItemsInput {
    first: Int
    feed: Feed
  }

  extend type Query {
    feed(input: NewsItemsInput): NewsItemsConnection

    newsItems(id: Int): NewsItems!
  }
`

export const resolvers = {
  Query: {
    feed: async (_, { input: { first = 1, feed } }) => {
      const limit = POSTS_PER_PAGE

      const ids: number[] = await fetch(`${feed}stories`)

      return {
        edges: await Promise.all(
          ids.slice((first - 1) * limit, first * limit).map(async id => {
            const items = await fetchNewsItems(id)

            return {
              cursor: Buffer.from(`${items.time}`).toString('base64'),
              node: {
                ...items,
                kids: pathOr([], ['kids'], items).map(id => ({ id })),
              },
            }
          }),
        ),
        pageInfo: {
          hasNextPage: first * limit < ids.length,
          totalPageCount: Math.floor(ids.length / limit) + 1,
        },
      }
    },

    newsItems: async (_, { id }) => {
      return await loopFetchNewsItemsComments(await fetchNewsItems(id))
    },
  },

  // For the performance, dont enable nested news-items query
  // NewsItems: {
  //   kids: async (newsItems: NewsItems) => fetchNewsItems(newsItems.id),
  //   by: async (newsItems: NewsItems) => fetchUser(newsItems.by),
  // },
}

const newsItemsQuery = gql`
  query Feed($input: NewsItemsInput) {
    feed(input: $input) {
      edges {
        cursor
        node {
          ...NewsItemsFields
          kids {
            id
            __typename
          }
        }
      }
      pageInfo {
        hasNextPage
        totalPageCount
      }
    }
  }
  ${newsItemsFragment}
`

const newsItemsWithCommentsQuery = gql`
  query NewsItems($id: Int) {
    newsItems(id: $id) {
      __typename
      ...NewsItemsFields
      kids {
        ...NewsItemsFields
        kids {
          ...NewsItemsFields
          kids {
            ...NewsItemsFields
            kids {
              ...NewsItemsFields
              kids {
                ...NewsItemsFields
                kids {
                  ...NewsItemsFields
                }
              }
            }
          }
        }
      }
    }
  }
  ${newsItemsFragment}
`

export const useNewsItems = ({ feed }: { feed?: string } = {}) => {
  const { query } = useRouter()
  const first = +pathOr(1, ['p'], query)

  const { data, ...others } = useQuery<{ newsItems: QueryResult<NewsItems> }>(
    newsItemsQuery,
    {
      variables: {
        input: { first, feed },
      },
    },
  )

  return {
    data: {
      ...(pathOr(nullQueryResult, ['feed'], data) as QueryResult<NewsItems>),
      nextPage: first + 1,
      startIndex: (first - 1) * POSTS_PER_PAGE,
    },
    ...others,
  }
}

export const useNewsItemsWithComments = () => {
  const { query } = useRouter()

  const { data, ...others } = useQuery<{ newsItems: NewsItems }>(
    newsItemsWithCommentsQuery,
    {
      variables: { id: +query.id },
    },
  )

  return {
    data: pathOr({ kids: [] }, ['newsItems'], data) as NewsItems,
    ...others,
  }
}
