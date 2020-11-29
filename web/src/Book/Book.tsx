import React, { useEffect, useState } from 'react'
import { Redirect, useParams } from 'react-router-dom'
import { BookHeader } from '../BookHeader/BookHeader'
import { getBookByISBN } from '../books/books'
import { CharacterGraph } from '../CharacterGraph/CharacterGraph'
import { PageSlider } from '../PageSlider/PageSlider'
import { PeopleTree } from '../types'

export function Book() {
  const { ISBN } = useParams<{ ISBN: string }>()
  const [page, setPage] = useState<number>(0)
  const [peopleByPage, setPeopleByPage] = useState<PeopleTree>({})

  const handlePageChange = (value: number) => {
    setPage(value)
  }

  const book = getBookByISBN(ISBN)

  useEffect(() => {
    if (book) {
      setPage(book.pages.start)

      const peopleTree = book.peopleByPage
      const peopleByCurrentPage = Object.keys(book.peopleByPage).reduce(
        (acc, id) => {
          const personId = Number(id)
          const person = peopleTree[personId]

          if (page >= person.page) {
            acc[personId] = {
              ...peopleTree[personId],
              relations: peopleTree[personId].relations.filter(
                (r) => page >= r.page
              ),
            }
          }
          return acc
        },
        {} as PeopleTree
      )
      setPeopleByPage(peopleByCurrentPage)
    }
  }, [book])

  useEffect(() => {
    if (book) {
      const peopleTree = book.peopleByPage
      const peopleByCurrentPage = Object.keys(book.peopleByPage).reduce(
        (acc, id) => {
          const personId = Number(id)
          const person = peopleTree[personId]

          if (page >= person.page) {
            acc[personId] = {
              ...peopleTree[personId],
              relations: peopleTree[personId].relations.filter(
                (r) => page >= r.page
              ),
            }
          }
          return acc
        },
        {} as PeopleTree
      )
      setPeopleByPage(peopleByCurrentPage)
    }
  }, [book, page])

  if (!book) {
    return <Redirect to="/"></Redirect>
  }

  return (
    <div>
      <BookHeader title={book.name} author="Fyodor Dostoyevsky" />
      <PageSlider
        firstPage={book.pages.start}
        lastPage={book.pages.total}
        page={page}
        onPageChange={handlePageChange}
      />
      <CharacterGraph peopleTree={peopleByPage} />
    </div>
  )
}
