import React, { createContext, useReducer, useState, useEffect } from 'react'

import { Login } from './components/login'
import { Header } from './components/header'
import { CreatePost } from './components/create-post'
import { PostList } from './components/post-list'

export interface IPost {
  image: File | null
  content: string
  user: User
  id: string
}

export interface IState {
  posts: IPost[]
}

export type User = string | undefined

export enum ActionType {
  ADD_POST = 'ADD_POST',
  DELETE_POST = 'DELETE_POST'
}

export interface IAddPost {
  type: ActionType.ADD_POST
  payload: {
    post: IPost
  }
}

export interface IDeletePost {
  type: ActionType.DELETE_POST
  payload: {
    id: string
  }
}

export type Action = IAddPost | IDeletePost

export const PostContext = createContext(
  {} as {
    state: IState
    dispatch: React.Dispatch<Action>
  }
)

export const UserContext = createContext<User>(undefined)

const postsReducer = (state: IState, action: Action) => {
  switch (action.type) {
    case ActionType.ADD_POST: {
      const newPost = action.payload.post
      return { posts: [newPost, ...state.posts] }
    }
    case ActionType.DELETE_POST: {
      const deletePostId = action.payload.id
      return { posts: state.posts.filter(post => post.id !== deletePostId) }
    }
    default:
      return state
  }
}

const initialPostState: IState = {
  posts: []
}

export const App = () => {
  const [state, dispatch] = useReducer(postsReducer, initialPostState)
  const [user, setUser] = useState<User>(undefined)

  useEffect(() => {
    document.title = user ? `${user}'s feed` : 'Please login'
  }, [user])

  if (!user) {
    return <Login setUser={setUser} />
  }

  return (
    <PostContext.Provider value={{ state, dispatch }}>
      <UserContext.Provider value={user}>
        <Header user={user} setUser={setUser} />
        <CreatePost user={user} />
        <PostList posts={state.posts} />
      </UserContext.Provider>
    </PostContext.Provider>
  )
}
