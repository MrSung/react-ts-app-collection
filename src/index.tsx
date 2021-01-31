import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'

import { AppGraphqlChecklist } from './app-graphql-checklist'

const client = new ApolloClient({
  uri: 'https://healthy-locust-20.hasura.app/v1/graphql',
  cache: new InMemoryCache()
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <React.StrictMode>
      <AppGraphqlChecklist />
    </React.StrictMode>
  </ApolloProvider>,
  document.getElementById('root')
)

// Hot Module Replacement (HMR) - Remove this snippet to remove HMR.
// Learn more: https://snowpack.dev/concepts/hot-module-replacement
if (import.meta.hot) {
  import.meta.hot.accept()
}
