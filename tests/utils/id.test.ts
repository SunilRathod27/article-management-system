import { describe, it, expect } from 'vitest'
import { encodeArticleId, decodeArticleId } from '../../utils/id'

describe('encodeArticleId / decodeArticleId', () => {
  it('round-trips a simple url', () => {
    const url = 'https://example.com/articles/hello-world'
    expect(decodeArticleId(encodeArticleId(url))).toBe(url)
  })

  it('round-trips a url with query params and special characters', () => {
    const url = 'https://example.com/path?a=1&b=two words&c=%20'
    expect(decodeArticleId(encodeArticleId(url))).toBe(url)
  })

  it('produces a url-safe id with no +, /, or = characters', () => {
    const url = 'https://example.com/a/b/c?x=y+z/w'
    const id = encodeArticleId(url)
    expect(id).not.toMatch(/[+/=]/)
  })

  it('returns null for malformed base64 input', () => {
    expect(decodeArticleId('not-valid-base64!!!')).toBeNull()
  })

  it('returns null for an empty id', () => {
    expect(decodeArticleId('')).toBeNull()
  })
})
