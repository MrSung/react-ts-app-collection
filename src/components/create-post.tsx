import React, { useContext, useState, useRef } from 'react'

import { PostContext, User, ActionType } from '../app-social-media'

export interface ICreatePostProps {
  user: User
}

export const CreatePost = ({ user }: ICreatePostProps) => {
  const { dispatch } = useContext(PostContext)
  const [content, setContent] = useState('')
  const [image, setImage] = useState<File | null>(null)
  const imageInputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault()

    const post = { content, image, user, id: String(Date.now()) }
    dispatch({ type: ActionType.ADD_POST, payload: { post } })

    setContent('')
    setImage(null)

    const $imageInput = imageInputRef.current
    if ($imageInput === null) {
      return
    }
    $imageInput.value = ''
  }

  return (
    <div>
      <h1>Create New Post</h1>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='Add Post Content'
          onChange={ev => setContent(ev.target.value)}
          value={content}
        />
        <input
          type='file'
          onChange={ev => {
            const { files } = ev.target
            if (files === null) {
              return
            }
            setImage([...files][0])
          }}
          ref={imageInputRef}
        />
        <button type='submit'>Submit Post</button>
      </form>
    </div>
  )
}
