import gql from 'graphql-tag'
import { useRouter } from 'next/router'
import fetch from 'isomorphic-unfetch'
import { useQuery } from '@apollo/react-hooks'
import { pathOr } from 'ramda'
import { QueryResult, HNQueryResult, nullQueryResult } from '../constants/types'
import { HN_ALGOLIA_API_URL, POSTS_PER_PAGE } from '../config'

export type Comment = {
  by: string
  id: number
  parent: number
  text: string
  title: string
  time: number
  type: string
}

export const typeDefs = /* GraphQL */ `
  type Comment {
    by: String
    id: ID
    parent: ID
    text: String
    time: Int
    type: String
  }

  type NewCommentsEdge {
    cursor: String!
    node: Comment!
  }

  type NewCommentsConnection {
    pageInfo: PageInfo!
    edges: [NewCommentsEdge]!
  }

  extend type Query {
    newComments(first: Int): NewCommentsConnection!
  }
`

export const resolvers = {
  Query: {
    newComments: async (_, { first }) => {
      const response: HNQueryResult = await fetch(
        `${HN_ALGOLIA_API_URL}/search_by_date?tags=comment&page=${first}&hitsPerPage=${POSTS_PER_PAGE}`,
      ).then(response => response.json())

      return {
        edges: response.hits.map(x => ({
          cursor: Buffer.from(x.created_at).toString('base64'),
          node: {
            by: x.author,
            id: x.objectID,
            parent: x.parent_id,
            text: x.comment_text,
            time: x.created_at_i,
            title: x.story_title,
          },
        })),
        pageInfo: {
          hasNextPage: first < response.nbPages,
          totalPageCount: response.nbPages,
        },
      }
    },
  },
}

export const newCommentsQuery = gql`
  query NewComments($first: Int) {
    newComments(first: $first) {
      edges {
        cursor
        node {
          by
          id
          parent
          text
          time
          type
        }
      }
      pageInfo {
        hasNextPage
        totalPageCount
      }
    }
  }
`

type NewCommentsQueryResult = {
  newsItems: QueryResult<Comment>
}

export const useNewComments = () => {
  const { query } = useRouter()
  const first = +pathOr(0, ['p'], query)

  const { data, ...others } = useQuery<NewCommentsQueryResult>(
    newCommentsQuery,
    {
      variables: { first },
    },
  )

  return {
    data: {
      ...(pathOr(nullQueryResult, ['newComments'], data) as QueryResult<
        Comment
      >),
      nextPage: first + 1,
      startIndex: (first - 1) * POSTS_PER_PAGE,
    },
    ...others,
  }
}
