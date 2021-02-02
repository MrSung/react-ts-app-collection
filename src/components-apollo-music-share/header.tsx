import React from 'react'
import { makeStyles, AppBar, Toolbar, Typography } from '@material-ui/core'
import { HeadsetTwoTone } from '@material-ui/icons'

const useStyles = makeStyles(theme => ({
  title: {
    marginLeft: theme.spacing(2)
  }
}))

export const Header = () => {
  const classes = useStyles()

  return (
    <AppBar color='primary' position='fixed'>
      <Toolbar>
        <HeadsetTwoTone />
        <Typography className={classes.title} variant='h6' component='h1'>
          Apollo Music Share
        </Typography>
      </Toolbar>
    </AppBar>
  )
}
