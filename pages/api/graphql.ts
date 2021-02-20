import { ApolloServer } from 'apollo-server-micro'
import schema from '@/apollo/schema'
import { GRAPHQL_URL } from '@config/app-config'

const apolloServer = new ApolloServer({ schema })

export const config = {
  api: {
    bodyParser: false,
  },
}

export default apolloServer.createHandler({ path: GRAPHQL_URL })
