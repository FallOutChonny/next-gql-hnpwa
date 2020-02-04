import { makeExecutableSchema } from 'graphql-tools'
import merge from 'lodash.merge'
import { newsItemsTypeDef, newsItemsResolver } from './news-items'

const Query = /* GraphQL */ `
  type Query {
    _dummary: String
  }
`

const schema = makeExecutableSchema({
  typeDefs: [Query, newsItemsTypeDef],
  resolvers: merge(newsItemsResolver),
})

export default schema
