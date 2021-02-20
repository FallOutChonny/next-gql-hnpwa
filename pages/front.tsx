import React from 'react'
import App from '@components/App'
import { withApollo } from '@/apollo/client'

function FrontPage() {

  return <App title="Ask" />
}

export default withApollo(FrontPage)
