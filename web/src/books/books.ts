import { Book } from '../types'
import { book_9780140449242 } from './book_9780140449242'

export const books: Book[] = [book_9780140449242]

export function getBookByISBN(ISBN: string) {
  return books.find((b) => b.ISBN === ISBN)
}
