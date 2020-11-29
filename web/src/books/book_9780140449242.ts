import { Book } from '../types'

export const book_9780140449242: Book = {
  ISBN: '9780140449242',
  name: 'The Brothers Karamazov',
  author: 'Fyodor Dostoyevesky',
  pages: {
    start: 15,
    total: 985,
    read: 22,
  },
  peopleByPage: {
    1: {
      id: 1,
      name: 'Adelaida Ivanovna Miusova',
      page: 16,
      relations: [
        {
          to: 2,
          type: 'partner',
          page: 16,
        },
        {
          to: 3,
          type: 'parent',
          page: 16,
        },
      ],
    },
    2: {
      id: 2,
      name: 'Fyodor Pavlovich Karamazov',
      page: 15,
      relations: [
        {
          to: 1,
          type: 'partner',
          page: 16,
        },
        {
          to: 4,
          type: 'partner',
          page: 22,
        },
        {
          to: 3,
          type: 'parent',
          page: 15,
        },
        {
          to: 5,
          type: 'parent',
          page: 15,
        },
        {
          to: 6,
          type: 'parent',
          page: 15,
        },
      ],
    },
    3: {
      id: 3,
      name: 'Dmitry Fyodorovich Karamazov',
      page: 15,
      relations: [
        {
          to: 1,
          type: 'child',
          page: 16,
        },
        {
          to: 2,
          type: 'child',
          page: 15,
        },
      ],
    },
    4: {
      id: 4,
      name: 'Sofya Ivanovna',
      page: 22,
      relations: [
        {
          to: 2,
          type: 'partner',
          page: 22,
        },
        {
          to: 5,
          type: 'parent',
          page: 22,
        },
        {
          to: 6,
          type: 'parent',
          page: 22,
        },
      ],
    },
    5: {
      id: 5,
      name: 'Ivan Karamazov',
      page: 15,
      relations: [
        {
          to: 2,
          type: 'child',
          page: 15,
        },
        {
          to: 4,
          type: 'child',
          page: 22,
        },
        {
          to: 6,
          type: 'sibling',
          page: 15,
        },
      ],
    },
    6: {
      id: 6,
      name: 'Alexei Karamazov',
      page: 15,
      relations: [
        {
          to: 2,
          type: 'child',
          page: 15,
        },
        {
          to: 4,
          type: 'child',
          page: 22,
        },
        {
          to: 5,
          type: 'sibling',
          page: 15,
        },
      ],
    },
  },
}
