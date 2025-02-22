// composables/useApi.ts
import { useFetch } from '#app'

export function useApi() {
  const config = useRuntimeConfig()
  const baseURL = config.public.apiBase || 'http://localhost:8000/api'

  const get = async (endpoint: string) => {
    const { data, error } = await useFetch(`${baseURL}${endpoint}`, {
      method: 'GET',
    })
    if (error.value) throw error.value
    return data.value
  }

  const post = async (endpoint: string, body: any) => {
    const { data, error } = await useFetch(`${baseURL}${endpoint}`, {
      method: 'POST',
      body,
    })
    if (error.value) throw error.value
    return data.value
  }

  return {
    get,
    post,
  }
}
