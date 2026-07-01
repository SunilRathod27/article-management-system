function toBase64(input: string): string {
  const percentEncoded = encodeURIComponent(input)
  const binary = percentEncoded.replace(/%([0-9A-F]{2})/g, (_, hex: string) =>
    String.fromCharCode(parseInt(hex, 16))
  )
  return btoa(binary)
}

function fromBase64(input: string): string {
  const binary = atob(input)
  let percentEncoded = ''
  for (let i = 0; i < binary.length; i += 1) {
    percentEncoded += `%${binary.charCodeAt(i).toString(16).padStart(2, '0')}`
  }
  return decodeURIComponent(percentEncoded)
}

export function encodeArticleId(url: string): string {
  return toBase64(url).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

export function decodeArticleId(id: string): string | null {
  if (!id) return null
  try {
    const padded = id.replace(/-/g, '+').replace(/_/g, '/')
    const paddingLength = (4 - (padded.length % 4)) % 4
    const base64 = padded + '='.repeat(paddingLength)
    const decoded = fromBase64(base64)
    return decoded || null
  } catch {
    return null
  }
}
