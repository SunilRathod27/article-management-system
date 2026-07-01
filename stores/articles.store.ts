import { defineStore } from 'pinia'
import type { Article } from '../models/domain/article.domain'

interface ArticlesState {
  articles: Article[]
  isLoading: boolean
  error: string | null
}

export const useArticlesStore = defineStore('articles', {
  state: (): ArticlesState => ({
    articles: [],
    isLoading: false,
    error: null,
  }),
  getters: {
    hasArticles: (state): boolean => state.articles.length > 0,
    getById:
      (state) =>
      (id: string): Article | null =>
        state.articles.find((article) => article.id === id) ?? null,
  },
  actions: {
    setArticles(articles: Article[]): void {
      this.articles = articles
      this.error = null
    },
    setLoading(value: boolean): void {
      this.isLoading = value
    },
    setError(message: string | null): void {
      this.error = message
    },
    reset(): void {
      this.articles = []
      this.isLoading = false
      this.error = null
    },
  },
})
