import { useAPI } from './useAPI'
import { useArticlesStore } from '../stores/articles.store'
import { mapArticle } from '../utils/mappers'
import type { Article } from '../models/domain/article.domain'

export function useArticles() {
  const { getArticles } = useAPI()
  const store = useArticlesStore()

  async function fetchArticles(): Promise<void> {
    if (store.hasArticles) return

    store.setLoading(true)
    const { data, error } = await getArticles()

    if (error || !data) {
      store.setError(error ?? 'Failed to load articles.')
      store.setLoading(false)
      return
    }

    store.setArticles(data.map(mapArticle))
    store.setLoading(false)
  }

  function getArticleById(id: string): Article | null {
    return store.getById(id)
  }

  return { fetchArticles, getArticleById }
}
