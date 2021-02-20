import pathOr from 'lodash.get'
import { useRouter } from 'next/router'
import { useQuery, gql } from '@apollo/client'
import { NewsItems, QueryResult, nullQueryResult } from '@config/types'
import { fetchUser, fetchNewsItems } from '@utils/hn-data-api'
import { getEnDate, formatDate } from '@utils/web-helper'
import { POSTS_PER_PAGE } from '@config/app-config'
import { newsItemsFragment, newsItemsConnectionFragment } from './queries'

export type User = {
  id: number
  delay: number
  created: number
  createdYYYYMMDD: string
  createdEN: string
  karma: number
  about: string
  submitted: number[]
}

export const typeDefs = /* GraphQL */ `
  type User {
    id: ID
    delay: Int
    created: Int
    createdYYYYMMDD: String
    createdEN: String
    karma: Int
    about: String
    submitted: [NewsItems]
  }

  extend type Query {
    user(name: String): User!
    userPosts(first: Int, name: String, isThreads: Boolean): NewsItemsConnection
  }
`

export const resolvers = {
  Query: {
    user: async (_, { name }) => await fetchUser(name),
    userPosts: async (_, { name, first, isThreads }) => ({
      first,
      ids: await fetchUser(name)
        .then(({ submitted }) =>
          Promise.all<NewsItems>(submitted.map(id => fetchNewsItems(id))),
        )
        .then(newsItems =>
          newsItems
            .filter(Boolean)
            .filter(x =>
              isThreads ? x.type === 'comment' : x.type !== 'comment',
            )
            .map(x => x.id),
        ),
      limit: POSTS_PER_PAGE,
    }),
  },

  User: {
    createdEN: (user: User) => getEnDate(new Date(user.created * 1000)),
    createdYYYYMMDD: (user: User) => formatDate(new Date(user.created * 1000)),
    submitted: (user: User) => user.submitted.map(id => fetchNewsItems(id)),
  },
}

export const userQuery = gql`
  query User($name: String) {
    user(name: $name) {
      id
      delay
      created
      createdEN
      createdYYYYMMDD
      karma
      about
      submitted {
        ...NewsItemsFields
        kids {
          __typename
          id
        }
      }
    }
  }
  ${newsItemsFragment}
`

export const userPostsQuery = gql`
  query UserPosts($first: Int, $name: String, $isThreads: Boolean) {
    userPosts(first: $first, name: $name, isThreads: $isThreads) {
      ...NewsItemsConnectionFields
      edges {
        cursor
        node {
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
    }
  }
  ${newsItemsConnectionFragment}
  ${newsItemsFragment}
`

export const useUser = () => {
  const { query } = useRouter()

  const { data, ...others } = useQuery<{ user: User }>(userQuery, {
    variables: { name: query.id },
  })

  return {
    data: pathOr(data, ['user'], {}) as User,
    ...others,
  }
}

export const useUserPosts = ({ feed }: { feed?: string } = {}) => {
  const { query } = useRouter()
  const first = +pathOr(query, ['p'], 1)

  const { data, ...others } = useQuery<{ userPosts: QueryResult<NewsItems> }>(
    userPostsQuery,
    {
      variables: {
        name: query.id,
        first,
        isThreads: feed === 'comment',
      },
    },
  )

  return {
    data: {
      ...(pathOr(data, ['userPosts'], nullQueryResult) as QueryResult<
        NewsItems
      >),
      nextPage: first + 1,
      startIndex: (first - 1) * POSTS_PER_PAGE,
    },
    ...others,
  }
}
