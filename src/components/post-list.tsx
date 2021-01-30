import React from 'react'

import type { IPost } from '../app'
import { Post } from './post'

export interface IPostListProps {
  posts: IPost[]
}

export const PostList = ({ posts }: IPostListProps) => (
  <>
    {posts.map((post, i) => (
      <Post key={i} {...post} />
    ))}
  </>
)
