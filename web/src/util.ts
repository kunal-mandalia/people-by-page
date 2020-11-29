export function firstNLetters(s: string, n: number) {
  if (s.length > n) {
    return s.substring(0, n) + '..'
  }
  return s
}

export const colors = ['#880e4f', '#535b2d', '#494949', '#d7d7d7', '9ad4ce']
