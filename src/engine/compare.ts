export function normalize(s: string): string {
  return s.trim().toLowerCase().replace(/\s+/g, ' ')
}

// Remove diacritics but PRESERVE ñ/Ñ (a distinct letter, not an accented n).
// Decompose to NFD (ñ -> n + combining tilde U+0303), recompose only the
// n-with-tilde back to ñ/Ñ, then strip all remaining combining marks.
export function stripAccents(s: string): string {
  return s
    .normalize('NFD')
    .replace(/([nN])̃/g, (_m, n: string) => (n === 'n' ? 'ñ' : 'Ñ'))
    .replace(/[̀-ͯ]/g, '')
}

export interface CompareOptions {
  accentInsensitive?: boolean
  alternates?: string[]
}

export function isCorrect(given: string, expected: string, opts: CompareOptions = {}): boolean {
  const { accentInsensitive = true, alternates = [] } = opts
  const prep = (s: string) => {
    const n = normalize(s)
    return accentInsensitive ? stripAccents(n) : n
  }
  const g = prep(given)
  return [expected, ...alternates].map(prep).includes(g)
}
