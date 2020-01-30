import express from 'express'
import next from 'next'
import bodyParser from 'body-parser'
import { ApolloServer } from 'apollo-server-express'
import { APP_PORT, dev } from './config'
import { resolvers, typeDefs } from './data/schema'

const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = express()

  server.use(bodyParser.urlencoded({ extended: true }))

  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
  })

  apolloServer.applyMiddleware({ app: server })

  server.all('*', (req, res) => handle(req, res))

  server.listen(APP_PORT, () => {
    console.log(`> Ready on http://localhost:${APP_PORT}`)
  })
})
