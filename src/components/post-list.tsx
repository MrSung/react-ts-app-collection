import React from 'react'

import { Post } from './post'

export const PostList = ({ posts }) =>
  posts.map((post, i) => <Post key={i} {...post} />)
