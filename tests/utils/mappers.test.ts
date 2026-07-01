import { describe, it, expect } from 'vitest'
import { mapArticle } from '../../utils/mappers'
import { encodeArticleId } from '../../utils/id'
import type { ArticleApiModel } from '../../models/api/article.model'

const baseRaw: ArticleApiModel = {
  url: 'https://example.com/full-article',
  title: 'Full Article',
  description: 'A full description.',
  content: 'Full content body.',
  urlToImage: 'https://example.com/image.jpg',
  publishedAt: '2021-10-24T10:00:00Z',
}

describe('mapArticle', () => {
  it('maps a fully-populated article without falling back to defaults', () => {
    expect(mapArticle(baseRaw)).toEqual({
      id: encodeArticleId('https://example.com/full-article'),
      title: 'Full Article',
      description: 'A full description.',
      content: 'Full content body.',
      imageUrl: 'https://example.com/image.jpg',
      publishedAt: '2021-10-24T10:00:00Z',
      sourceUrl: 'https://example.com/full-article',
    })
  })

  it('falls back to "Untitled Article" when title is missing', () => {
    const raw: ArticleApiModel = { ...baseRaw, title: undefined }
    expect(mapArticle(raw).title).toBe('Untitled Article')
  })

  it('falls back to "Untitled Article" when title is blank', () => {
    const raw: ArticleApiModel = { ...baseRaw, title: '   ' }
    expect(mapArticle(raw).title).toBe('Untitled Article')
  })

  it('falls back to a default description when missing or null', () => {
    expect(mapArticle({ ...baseRaw, description: undefined }).description).toBe(
      'No description available.'
    )
    expect(mapArticle({ ...baseRaw, description: null }).description).toBe(
      'No description available.'
    )
  })

  it('falls back to empty content when missing', () => {
    expect(mapArticle({ ...baseRaw, content: undefined }).content).toBe('')
  })

  it('maps a missing or null urlToImage to null', () => {
    expect(mapArticle({ ...baseRaw, urlToImage: undefined }).imageUrl).toBeNull()
    expect(mapArticle({ ...baseRaw, urlToImage: null }).imageUrl).toBeNull()
  })

  it('maps an empty-string urlToImage to null', () => {
    expect(mapArticle({ ...baseRaw, urlToImage: '' }).imageUrl).toBeNull()
  })

  it('maps a missing publishedAt to null', () => {
    expect(mapArticle({ ...baseRaw, publishedAt: undefined }).publishedAt).toBeNull()
  })

  it('derives id and sourceUrl from the url field', () => {
    const result = mapArticle(baseRaw)
    expect(result.sourceUrl).toBe('https://example.com/full-article')
    expect(result.id).toBe(encodeArticleId('https://example.com/full-article'))
  })
})
