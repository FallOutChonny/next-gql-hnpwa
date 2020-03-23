import gql from 'graphql-tag'
import { pathOr } from 'ramda'
import { useRouter } from 'next/router'
import { useQuery } from '@apollo/react-hooks'
// import fetch from 'isomorphic-unfetch'
import { fetchUser, fetchNewsItems } from '../utils/hn-data-api'
// import { HN_ALGOLIA_API_URL } from '../config'
import { getEnDate, formatDate } from '../utils/webHelper'
import { newsItemsFragment } from './typeDefs'

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
  }
`

export const resolvers = {
  Query: {
    user: async (_, { name }) => await fetchUser(name),

    // userComments: async (_, { name }) => {},
  },

  User: {
    // convert to Month(EN) DD, YYYY
    createdEN: (user: User) => getEnDate(new Date(user.created * 1000)),
    // convert to YYYY-MM-DD
    createdYYYYMMDD: (user: User) => formatDate(new Date(user.created * 1000)),
    // get user posts
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

export const useUser = () => {
  const { query } = useRouter()

  const { data, ...others } = useQuery<{ user: User }>(userQuery, {
    variables: { name: query.id },
  })

  return {
    data: pathOr({}, ['user'], data) as User,
    ...others,
  }
}
