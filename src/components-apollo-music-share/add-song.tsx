import React, { useState, useEffect } from 'react'
import {
  TextField,
  InputAdornment,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  makeStyles
} from '@material-ui/core'
import { Link, AddBoxOutlined } from '@material-ui/icons'
import ReactPlayer from 'react-player'
// @ts-ignore: no type definition file...
import SoundCloudPlayer from 'react-player/lib/players/SoundCloud'
// @ts-ignore: no type definition file...
import YouTubePlayer from 'react-player/lib/players/YouTubePlayer'

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    alignItems: 'center'
  },
  urlInput: {
    margin: theme.spacing(1)
  },
  addSongButton: {
    margin: theme.spacing(1)
  },
  dialog: {
    textAlign: 'center'
  },
  thumbnail: {
    width: '90%'
  }
}))

export const AddSong = () => {
  const classes = useStyles()
  const [url, setUrl] = useState('')
  const [playable, setPlayable] = useState(false)
  const [dialog, setDialog] = useState(false)

  const handleCloseDialog = () => {
    setDialog(false)
  }

  const getYouTubeInfo = player => {
    const duration = player.getDuration()
    const { title, video_id, author } = player.getVideoData()
    const thumbnail = `http://img.youtube.com/vi/${video_id}/0.jpg`
    return {
      duration,
      title,
      artist: author,
      thumbnail
    }
  }
  const getSoundCloudInfo = async player => {
    return new Promise(resolve => {
      player.getCurrentSound(songData => {
        if (songData) {
          resolve({
            duration: songData.duration / 1000,
            title: songData.title,
            artist: songData.user.username,
            thumbnail: songData.artwork_url.replace('-large', '-t500x500')
          })
        }
      })
    })
  }
  const handleEditSong = async ({ player }) => {
    const nestedPlayer = player.player.player
    const songData = nestedPlayer.getVideoData
      ? getYouTubeInfo(nestedPlayer)
      : await getSoundCloudInfo(nestedPlayer)
  }

  useEffect(() => {
    const isPlayable =
      SoundCloudPlayer.canPlay(url) || YouTubePlayer.canPlay(url)
    setPlayable(isPlayable)
  }, [url])

  return (
    <div className={classes.container}>
      <Dialog
        className={classes.dialog}
        open={dialog}
        onClose={handleCloseDialog}
      >
        <DialogTitle>Edit Song</DialogTitle>
        <DialogContent>
          <img
            src='http://img.youtube.com/vi/--ZtUFsIgMk/0.jpg'
            alt='Song thumbnail'
            className={classes.thumbnail}
          />
          <TextField margin='dense' name='title' label='Title' fullWidth />
          <TextField margin='dense' name='artist' label='Artist' fullWidth />
          <TextField
            margin='dense'
            name='thumbnail'
            label='Thumbnail'
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color='secondary'>
            Cancel
          </Button>
          <Button variant='outlined' color='primary'>
            Add Song
          </Button>
        </DialogActions>
      </Dialog>
      <TextField
        value={url}
        onChange={ev => setUrl(ev.target.value)}
        placeholder='Add YouTube or SoundCloud Url'
        className={classes.urlInput}
        fullWidth
        margin='normal'
        type='url'
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <Link />
            </InputAdornment>
          )
        }}
      />
      <Button
        disabled={!playable}
        onClick={() => setDialog(true)}
        className={classes.addSongButton}
        variant='contained'
        color='primary'
        endIcon={<AddBoxOutlined />}
      >
        Add
      </Button>
      <ReactPlayer url={url} hidden onReady={handleEditSong} />
    </div>
  )
}
