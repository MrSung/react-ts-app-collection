import React from 'react'
import { Grid, useMediaQuery, Hidden } from '@material-ui/core'
import { useTheme } from '@material-ui/core/styles'

import { Header } from './components-apollo-music-share/header'
import { AddSong } from './components-apollo-music-share/add-song'
import { SongList } from './components-apollo-music-share/song-list'
import { SongPlayer } from './components-apollo-music-share/song-player'

export const AppApolloMusicShare = () => {
  const theme = useTheme()
  const greaterThanSm = useMediaQuery(theme.breakpoints.up('sm'))
  const greaterThanMd = useMediaQuery(theme.breakpoints.up('md'))

  return (
    <>
      <Hidden only='xs'>
        <Header />
      </Hidden>
      <Grid container spacing={3}>
        <Grid
          style={{
            paddingTop: greaterThanSm ? 80 : 10
          }}
          item
          xs={12}
          md={7}
        >
          <AddSong />
          <SongList />
        </Grid>
        <Grid
          style={
            greaterThanMd
              ? {
                  position: 'fixed',
                  width: '100%',
                  right: 0,
                  top: 70
                }
              : {
                  position: 'fixed',
                  width: '100%',
                  left: 0,
                  bottom: 0
                }
          }
          item
          xs={12}
          md={5}
        >
          <SongPlayer />
        </Grid>
      </Grid>
    </>
  )
}
