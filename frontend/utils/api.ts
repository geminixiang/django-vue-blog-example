// utils/api.ts
import type { FetchOptions } from 'ofetch'

export const API_BASE_URL = 'http://localhost:8000/api'

export const fetchApi = async <T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> => {
  const config = useRuntimeConfig()
  
  const defaultOptions: FetchOptions = {
    baseURL: API_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  }

  try {
    return await $fetch<T>(endpoint, { ...defaultOptions, ...options })
  } catch (error: any) {
    // 處理錯誤
    console.error('API Error:', error)
    throw error
  }
}
