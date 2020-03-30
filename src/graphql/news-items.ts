import { useRouter } from 'next/router'
import { useQuery, gql } from '@apollo/client'
import pathOr from 'lodash.get'
import { POSTS_PER_PAGE } from '../config'
import { QueryResult, nullQueryResult, NewsItems } from '../constants/types'
import { fetch, fetchNewsItems } from '../utils/hn-data-api'
import { newsItemsFragment, newsItemsConnectionFragment } from './queries'

export const typeDefs = /* GraphQL */ `
  enum Feed {
    top
    ask
    job
    show
    new
    best
  }

  enum Story {
    comment
    story
    job
    poll
    pollopt
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
    parent: NewsItems
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
    feed: async (_, { input: { first = 1, feed } }) => ({
      first,
      ids: await fetch(`${feed}stories`),
      limit: POSTS_PER_PAGE,
    }),
    newsItems: async (_, { id }) => await fetchNewsItems(id),
  },

  NewsItemsConnection: {
    edges: async ({ ids, first, limit }) => {
      return ids
        .slice((first - 1) * limit, first * limit)
        .map(id => fetchNewsItems(id))
    },
    pageInfo: data => data,
  },

  PageInfo: {
    hasPreviousPage: ({ first }) => first > 0,
    hasNextPage: ({ ids, limit }) => ids * limit < ids.length,
    totalPageCount: ({ ids }) => Math.floor(ids.length / POSTS_PER_PAGE) + 1,
  },

  NewsItemsEdge: {
    cursor: (newsItems: NewsItems) => {
      return Buffer.from(`${newsItems.time}`).toString('base64')
    },
    node: (newsItems: NewsItems) => newsItems,
  },

  NewsItems: {
    parent: async (newsItems: NewsItems) => {
      // While fetching on the apollo server, parent type is number
      return newsItems.parent ? fetchNewsItems(newsItems.parent as any) : null
    },
    kids: async (newsItems: NewsItems) => {
      return (newsItems.kids || []).map(id => fetchNewsItems(id as any))
    },
    // by: async (newsItems: NewsItems) => fetchUser(newsItems.by),
  },
}

const newsItemsQuery = gql`
  query Feed($input: NewsItemsInput) {
    feed(input: $input) {
      ...NewsItemsConnectionFields
    }
  }
  ${newsItemsConnectionFragment}
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
  const first = +pathOr(query, ['p'], 1)

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
      ...(pathOr(data, ['feed'], nullQueryResult) as QueryResult<NewsItems>),
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
    data: pathOr(data, ['newsItems'], { kids: [] }) as NewsItems,
    ...others,
  }
}
