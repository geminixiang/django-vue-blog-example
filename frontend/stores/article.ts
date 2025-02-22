// stores/article.ts
import { defineStore } from 'pinia'

interface Article {
  id: number
  title: string
  content: string
  slug: string
  created_at: string
  // ... 其他文章屬性
}

export const useArticleStore = defineStore('article', {
  state: () => ({
    articles: [] as Article[],
    currentArticle: null as Article | null,
    loading: false,
    error: null as string | null,
  }),

  actions: {
    async fetchArticles() {
      const api = useApi()
      this.loading = true
      try {
        const data = await api.get('/articles/')
        this.articles = data
      } catch (err) {
        this.error = (err as Error).message
      } finally {
        this.loading = false
      }
    },

    async fetchArticleBySlug(slug: string) {
      const api = useApi()
      this.loading = true
      try {
        const data = await api.get(`/articles/${slug}/`)
        this.currentArticle = data
      } catch (err) {
        this.error = (err as Error).message
      } finally {
        this.loading = false
      }
    }
  }
})
