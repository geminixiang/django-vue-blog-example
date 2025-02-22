// stores/usePostStore.ts
import { defineStore } from 'pinia'
import type { Post, PostCreate, PostUpdate } from '~/types/post'
import { fetchApi } from '~/utils/api'

export const usePostStore = defineStore('post', () => {
  const posts = ref<Post[]>([])
  const currentPost = ref<Post | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  // 獲取所有文章
  const fetchPosts = async () => {
    loading.value = true
    error.value = null
    try {
      posts.value = await fetchApi<Post[]>('/posts/')
    } catch (err: any) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  // 獲取單篇文章
  const fetchPost = async (id: number) => {
    loading.value = true
    error.value = null
    try {
      currentPost.value = await fetchApi<Post>(`/posts/${id}/`)
    } catch (err: any) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  // 創建文章
  const createPost = async (post: PostCreate) => {
    loading.value = true
    error.value = null
    try {
      const newPost = await fetchApi<Post>('/posts/', {
        method: 'POST',
        body: JSON.stringify(post),
      })
      posts.value.unshift(newPost)
      return newPost
    } catch (err: any) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  // 更新文章
  const updatePost = async (post: PostUpdate) => {
    loading.value = true
    error.value = null
    try {
      const updatedPost = await fetchApi<Post>(`/posts/${post.id}/`, {
        method: 'PUT',
        body: JSON.stringify(post),
      })
      const index = posts.value.findIndex(p => p.id === post.id)
      if (index !== -1) {
        posts.value[index] = updatedPost
      }
      return updatedPost
    } catch (err: any) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  // 刪除文章
  const deletePost = async (id: number) => {
    loading.value = true
    error.value = null
    try {
      await fetchApi(`/posts/${id}/`, {
        method: 'DELETE',
      })
      posts.value = posts.value.filter(post => post.id !== id)
    } catch (err: any) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    posts,
    currentPost,
    loading,
    error,
    fetchPosts,
    fetchPost,
    createPost,
    updatePost,
    deletePost,
  }
})
