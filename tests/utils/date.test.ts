import { describe, it, expect } from 'vitest'
import { formatAbsoluteDate, formatRelativeTime } from '../../utils/date'

describe('formatAbsoluteDate', () => {
  it('formats a valid ISO date', () => {
    expect(formatAbsoluteDate('2021-10-24T10:00:00Z')).toBe('24 Oct, 2021')
  })

  it('falls back for null input', () => {
    expect(formatAbsoluteDate(null)).toBe('Date unavailable')
  })

  it('falls back for invalid date strings', () => {
    expect(formatAbsoluteDate('not-a-date')).toBe('Date unavailable')
  })
})

describe('formatRelativeTime', () => {
  const now = new Date('2021-10-24T12:00:00Z')

  it('returns "Just now" for timestamps under a minute old', () => {
    expect(formatRelativeTime('2021-10-24T11:59:30Z', now)).toBe('Just now')
  })

  it('returns minutes ago for timestamps under an hour old', () => {
    expect(formatRelativeTime('2021-10-24T11:45:00Z', now)).toBe('15m ago')
  })

  it('returns hours ago for timestamps under a day old', () => {
    expect(formatRelativeTime('2021-10-24T02:00:00Z', now)).toBe('10h ago')
  })

  it('returns days ago for timestamps under a week old', () => {
    expect(formatRelativeTime('2021-10-22T12:00:00Z', now)).toBe('2d ago')
  })

  it('falls back to the absolute date for timestamps a week or older', () => {
    expect(formatRelativeTime('2021-10-01T12:00:00Z', now)).toBe('1 Oct, 2021')
  })

  it('falls back for null input', () => {
    expect(formatRelativeTime(null, now)).toBe('Date unavailable')
  })
})
