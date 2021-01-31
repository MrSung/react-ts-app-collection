import React from 'react'

import {
  UserContext,
  PostContext,
  IPost,
  ActionType
} from '../app-social-media'

type PostProps = IPost

export const Post = ({ image, content, user, id }: PostProps) => {
  const currentUser = React.useContext(UserContext)
  const { dispatch } = React.useContext(PostContext)
  const isCurrentUser = currentUser === user

  const handleDeletePost = () => {
    dispatch({ type: ActionType.DELETE_POST, payload: { id } })
  }

  return (
    <>
      {image && (
        <img
          style={{ height: 100, width: 200, objectFit: 'cover' }}
          src={URL.createObjectURL(image)}
          alt='Post cover'
        />
      )}
      <p>{content}</p>
      <div style={{ color: isCurrentUser ? 'green' : '' }}>{user}</div>
      <div>
        {isCurrentUser && (
          <button type='button' onClick={handleDeletePost}>
            Delete
          </button>
        )}
      </div>
    </>
  )
}
