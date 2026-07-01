const MONTH_NAMES = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
]

const MINUTE = 60 * 1000
const HOUR = 60 * MINUTE
const DAY = 24 * HOUR
const WEEK = 7 * DAY

export function formatAbsoluteDate(iso: string | null | undefined): string {
  if (!iso) return 'Date unavailable'
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return 'Date unavailable'
  const day = date.getUTCDate()
  const month = MONTH_NAMES[date.getUTCMonth()]
  const year = date.getUTCFullYear()
  return `${day} ${month}, ${year}`
}

export function formatRelativeTime(
  iso: string | null | undefined,
  now: Date = new Date()
): string {
  if (!iso) return 'Date unavailable'
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return 'Date unavailable'

  const diffMs = now.getTime() - date.getTime()
  if (diffMs < MINUTE) return 'Just now'
  if (diffMs < HOUR) return `${Math.floor(diffMs / MINUTE)}m ago`
  if (diffMs < DAY) return `${Math.floor(diffMs / HOUR)}h ago`
  if (diffMs < WEEK) return `${Math.floor(diffMs / DAY)}d ago`
  return formatAbsoluteDate(iso)
}
