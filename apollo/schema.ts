import { makeExecutableSchema } from 'graphql-tools'
import merge from 'lodash.merge'
import * as items from '@/apollo/news-items'
import * as comments from '@/apollo/new-comments'
import * as user from '@/apollo/user'

const Query = /* GraphQL */ `
  type Query {
    _dummary: String
  }

  type PageInfo {
    hasNextPage: Boolean!
    hasPreviousPage: Boolean!
    totalPageCount: Int
  }
`

export const schema = makeExecutableSchema({
  typeDefs: [Query, items.typeDefs, comments.typeDefs, user.typeDefs],
  resolvers: merge(items.resolvers, comments.resolvers, user.resolvers),
})

export default schema
