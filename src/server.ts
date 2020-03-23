import express from 'express'
import next from 'next'
import bodyParser from 'body-parser'
import { ApolloServer } from 'apollo-server-express'
import { APP_PORT, dev } from './config'
import schema from './graphql/schema'

const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = express()

  server.use(bodyParser.urlencoded({ extended: true }))

  const apolloServer = new ApolloServer({
    schema,
    introspection: true,
    playground: true,
    context: ctx => ctx,
  })

  apolloServer.applyMiddleware({ app: server, path: '/graphql' })

  server.all('*', (req, res) => handle(req, res))

  server.listen(APP_PORT, () => {
    console.log(`🚀  App ready on http://localhost:${APP_PORT}`)
    console.log(`🔥  GraphQL ready on http://localhost:${APP_PORT}/graphql`)
  })
})

export default app
