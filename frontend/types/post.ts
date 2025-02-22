// types/post.ts
export interface Post {
  id: number
  title: string
  content: string
  created: string
  modified: string
  thumbnail: string
}

export interface PostCreate {
  title: string
  content: string
}

export interface PostUpdate extends PostCreate {
  id: number
}
