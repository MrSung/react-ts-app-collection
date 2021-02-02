import React from 'react'
import {
  Typography,
  Avatar,
  IconButton,
  makeStyles,
  useMediaQuery
} from '@material-ui/core'
import { Delete } from '@material-ui/icons'
import { useTheme } from '@material-ui/core/styles'

interface ISong {
  title: string
  artist: string
  thumbnail: string
}

const song: ISong = {
  title: 'LÜNE',
  artist: 'MÖÖN',
  thumbnail: 'http://img.youtube.com/vi/--ZtUFsIgMk/0.jpg'
}

export const QueuedSongList = () => {
  const theme = useTheme()
  const greaterThanMd = useMediaQuery(theme.breakpoints.up('md'))

  if (!greaterThanMd) {
    return null
  }

  return (
    <div style={{ margin: '10px 0' }}>
      <Typography color='textSecondary' variant='button'>
        QUEUE (5)
      </Typography>
      {Array.from({ length: 5 }, () => song).map((song, index) => (
        <QueuedSong key={index} song={song} />
      ))}
    </div>
  )
}

const useStyles = makeStyles({
  avatar: {
    width: 44,
    height: 44
  },
  text: {
    textOverflow: 'ellipsis',
    overflow: 'hidden'
  },
  container: {
    display: 'grid',
    gridAutoFlow: 'column',
    gridTemplateColumns: '50px auto 50px',
    gridGap: 12,
    alignItems: 'center',
    marginTop: 10
  },
  songInfoContainer: {
    overflow: 'hidden',
    whiteSpace: 'nowrap'
  }
})

interface IQueuedSongProps {
  song: ISong
}

export const QueuedSong = ({ song }: IQueuedSongProps) => {
  const classes = useStyles()
  const { thumbnail, artist, title } = song

  return (
    <div className={classes.container}>
      <Avatar src={thumbnail} alt='Song thumbnail' className={classes.avatar} />
      <div className={classes.songInfoContainer}>
        <Typography variant='subtitle2' className={classes.text}>
          {title}
        </Typography>
        <Typography
          color='textSecondary'
          variant='body2'
          className={classes.text}
        >
          {artist}
        </Typography>
      </div>
      <IconButton>
        <Delete color='error' />
      </IconButton>
    </div>
  )
}
