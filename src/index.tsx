import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloProvider } from '@apollo/client'
import { MuiThemeProvider, CssBaseline } from '@material-ui/core'

import { client, theme, AppApolloMusicShare } from './app-apollo-music-share'

ReactDOM.render(
  <ApolloProvider client={client}>
    <MuiThemeProvider theme={theme}>
      <React.StrictMode>
        <CssBaseline />
        <AppApolloMusicShare />
      </React.StrictMode>
    </MuiThemeProvider>
  </ApolloProvider>,
  document.getElementById('root')
)

// Hot Module Replacement (HMR) - Remove this snippet to remove HMR.
// Learn more: https://snowpack.dev/concepts/hot-module-replacement
if (import.meta.hot) {
  import.meta.hot.accept()
}
