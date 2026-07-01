import type { ArticleApiModel } from '../models/api/article.model'
import type { Article } from '../models/domain/article.domain'
import { encodeArticleId } from './id'

export function mapArticle(raw: ArticleApiModel): Article {
  const title = raw.title?.trim() || 'Untitled Article'
  const description = raw.description?.trim() || 'No description available.'
  const content = raw.content?.trim() || ''
  const trimmedImage = raw.urlToImage?.trim()
  const imageUrl = trimmedImage ? trimmedImage : null
  const publishedAt = raw.publishedAt?.trim() || null

  return {
    id: encodeArticleId(raw.url),
    title,
    description,
    content,
    imageUrl,
    publishedAt,
    sourceUrl: raw.url,
  }
}
