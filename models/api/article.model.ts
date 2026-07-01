export interface ArticleApiSource {
  id: string | null
  name?: string
}

export interface ArticleApiModel {
  source?: ArticleApiSource
  author?: string | null
  title?: string
  description?: string | null
  url: string
  urlToImage?: string | null
  publishedAt?: string
  content?: string
}

export interface ArticleApiResponse {
  status: string
  totalResults: number
  articles: ArticleApiModel[]
}
