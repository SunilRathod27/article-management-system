import type { ArticleApiModel, ArticleApiResponse } from '../models/api/article.model'

export function useAPI() {
  const config = useRuntimeConfig()

  async function getArticles(): Promise<{
    data: ArticleApiModel[] | null
    error: string | null
  }> {
    const { data, error } = await useFetch<ArticleApiResponse>(config.public.articlesApiUrl, {
      key: 'articles-list',
      server: true,
      dedupe: 'defer',
    })

    if (error.value) {
      return { data: null, error: 'Something went wrong loading articles. Please try again.' }
    }

    if (!data.value || !Array.isArray(data.value.articles)) {
      return { data: null, error: 'Unexpected response from the server.' }
    }

    return { data: data.value.articles, error: null }
  }

  return { getArticles }
}
