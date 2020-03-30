import { useRouter } from 'next/router'
import fetch from 'isomorphic-unfetch'
import { useQuery, gql } from '@apollo/client'
import pathOr from 'lodash.get'
import { QueryResult, HNQueryResult, nullQueryResult } from '../constants/types'
import { HN_ALGOLIA_API_URL, POSTS_PER_PAGE } from '../config'
import { fetchNewsItems } from '../utils/hn-data-api'

export type Comment = {
  by: string
  id: number
  parent: Comment
  text: string
  title: string
  time: number
  score: number
}

export type Item = {
  author: string
  objectID: number
  parent_id: number
  story_id: number
  points: number
  url: string
  comment_text: string
  created_at: string
  created_at_i: number
  story_title: string
}

export const typeDefs = /* GraphQL */ `
  type Comment {
    by: String
    id: ID
    parent: Comment
    text: String
    time: Int
    title: String
    score: Int
    url: String
  }

  type CommentEdge {
    cursor: String!
    node: Comment!
  }

  type CommentsConnection {
    pageInfo: PageInfo!
    edges: [CommentEdge]
  }

  extend type Query {
    newComments(first: Int): CommentsConnection
    bestComments(first: Int): CommentsConnection
  }
`

export const resolvers = {
  Query: {
    newComments: async (_, { first }) => {
      const page = first - 1
      const response: HNQueryResult = await fetch(
        `${HN_ALGOLIA_API_URL}/search_by_date?tags=comment&page=${page}&hitsPerPage=${POSTS_PER_PAGE}`,
      ).then(response => response.json())

      return {
        first: 1,
        ids: Array.from({ length: response.nbPages * POSTS_PER_PAGE }),
        limit: POSTS_PER_PAGE,
        data: response.hits,
      }
    },
    bestComments: async (_, { first }) => {
      const page = first - 1
      const response = await fetch(
        `${HN_ALGOLIA_API_URL}/search?tags=comment&page=${page}&hitsPerPage=${POSTS_PER_PAGE}`,
      ).then(response => response.json())

      return {
        first: 1,
        ids: Array.from({ length: response.nbPages * POSTS_PER_PAGE }),
        limit: POSTS_PER_PAGE,
        data: response.hits,
      }
    },
  },

  CommentsConnection: {
    edges: ({ data }) => data,
    pageInfo: data => data,
  },

  CommentEdge: {
    cursor: (comment: Item) => {
      return Buffer.from(comment.created_at).toString('base64')
    },
    node: (comment: Item) => ({
      by: comment.author,
      id: Number(comment.objectID),
      parent: comment.story_id,
      text: comment.comment_text,
      time: comment.created_at_i,
      title: comment.story_title,
      score: comment.points || 0,
      url: comment.url,
    }),
  },

  Comment: {
    // time: (comment: Comment) => new Date(comment.time),
    parent: async (comment: Comment) => {
      console.log(comment)
      return fetchNewsItems(comment.parent as any)
    },
  },
}

export const newCommentsQuery = gql`
  query NewComments($first: Int) {
    newComments(first: $first) {
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

type NewCommentsQueryResult = {
  newsItems: QueryResult<Comment>
}

export const useNewComments = () => {
  const { query } = useRouter()
  const first = +pathOr(query, ['p'], 1)

  const { data, ...others } = useQuery<NewCommentsQueryResult>(
    newCommentsQuery,
    {
      variables: { first },
    },
  )

  return {
    data: {
      ...(pathOr(data, ['newComments'], nullQueryResult) as QueryResult<
        Comment
      >),
      nextPage: first + 1,
      startIndex: (first - 1) * POSTS_PER_PAGE,
    },
    ...others,
  }
}
