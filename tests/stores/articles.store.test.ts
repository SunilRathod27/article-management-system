import { describe, it, expect, beforeEach } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useArticlesStore } from '../../stores/articles.store'
import type { Article } from '../../models/domain/article.domain'

const sampleArticle: Article = {
  id: 'abc123',
  title: 'Sample',
  description: 'Sample description',
  content: 'Sample content',
  imageUrl: null,
  publishedAt: null,
  sourceUrl: 'https://example.com/sample',
}

describe('useArticlesStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('starts empty, not loading, with no error', () => {
    const store = useArticlesStore()
    expect(store.articles).toEqual([])
    expect(store.isLoading).toBe(false)
    expect(store.error).toBeNull()
    expect(store.hasArticles).toBe(false)
  })

  it('setArticles populates the list and clears any prior error', () => {
    const store = useArticlesStore()
    store.setError('previous failure')
    store.setArticles([sampleArticle])
    expect(store.articles).toEqual([sampleArticle])
    expect(store.hasArticles).toBe(true)
    expect(store.error).toBeNull()
  })

  it('getById finds an article by id or returns null', () => {
    const store = useArticlesStore()
    store.setArticles([sampleArticle])
    expect(store.getById('abc123')).toEqual(sampleArticle)
    expect(store.getById('missing')).toBeNull()
  })

  it('setLoading and setError update state independently', () => {
    const store = useArticlesStore()
    store.setLoading(true)
    expect(store.isLoading).toBe(true)
    store.setError('failed')
    expect(store.error).toBe('failed')
  })

  it('reset clears articles, loading, and error', () => {
    const store = useArticlesStore()
    store.setArticles([sampleArticle])
    store.setLoading(true)
    store.setError('failed')
    store.reset()
    expect(store.articles).toEqual([])
    expect(store.isLoading).toBe(false)
    expect(store.error).toBeNull()
  })
})
