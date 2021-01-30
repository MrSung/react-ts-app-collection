import React, {
  createContext,
  useContext,
  useReducer,
  useState,
  useEffect
} from 'react'

import { Login } from './components/login'
import { Header } from './components/header'
import { CreatePost } from './components/create-post'
import { PostList } from './components/post-list'

export const PostContext = createContext({
  posts: []
})
export const UserContext = createContext(null)

const postReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_POST': {
      const newPost = action.payload.post
      return { posts: [newPost, ...state.posts] }
    }
    case 'DELETE_POST': {
      const deletePostId = action.payload.id
      return { posts: state.posts.filter(post => post.id !== deletePostId) }
    }
    default:
      return state
  }
}

export const App = () => {
  const initialPostState = useContext(PostContext)
  const [state, dispatch] = useReducer(postReducer, initialPostState)
  const [user, setUser] = useState(undefined)

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
