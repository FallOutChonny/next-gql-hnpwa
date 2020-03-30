import { ApolloServer } from 'apollo-server-micro'
import schema from '../../graphql/schema'
import { GRAPHQL_URL } from '../../config'

const apolloServer = new ApolloServer({ schema })

export const config = {
  api: {
    bodyParser: false,
  },
}

export default apolloServer.createHandler({ path: GRAPHQL_URL })
