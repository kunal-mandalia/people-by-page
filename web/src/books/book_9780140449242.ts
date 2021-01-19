import { Book } from '../types'

export const book_9780140449242: Book = {
  ISBN: '9780140449242',
  name: 'The Brothers Karamazov',
  author: 'Fyodor Dostoyevesky',
  pages: {
    start: 15,
    total: 985,
    read: 130,
  },
  peopleByPage: {
    900: {
      id: 900,
      name: 'Pyotr Fomich Kalganov',
      page: 50,
      relations: [
        {
          to: 1000,
          type: 'direct',
          page: 50,
        },
      ],
    },
    1000: {
      id: 1000,
      name: 'Pyotr Aleksandrovich Miusov',
      page: 19,
      relations: [
        {
          to: 1100,
          type: 'direct',
          page: 19,
        },
        {
          to: 900,
          type: 'direct',
          page: 50,
        },
      ],
    },
    1100: {
      id: 1100,
      name: 'Adelaida Ivanovna Miusova',
      page: 16,
      relations: [
        {
          to: 1200,
          type: 'partner',
          page: 16,
        },
        {
          to: 1300,
          type: 'parent',
          page: 16,
        },
        {
          to: 1000,
          type: 'direct',
          page: 22,
        },
      ],
    },
    1200: {
      id: 1200,
      name: 'Fyodor Pavlovich Karamazov',
      page: 15,
      relations: [
        {
          to: 1100,
          type: 'partner',
          page: 16,
        },
        {
          to: 1400,
          type: 'partner',
          page: 22,
        },
        {
          to: 1300,
          type: 'parent',
          page: 15,
        },
        {
          to: 1500,
          type: 'parent',
          page: 15,
        },
        {
          to: 1600,
          type: 'parent',
          page: 15,
        },
      ],
    },
    1300: {
      id: 1300,
      name: 'Dmitry Fyodorovich Karamazov',
      page: 15,
      relations: [
        {
          to: 1100,
          type: 'child',
          page: 16,
        },
        {
          to: 1200,
          type: 'child',
          page: 15,
        },
      ],
    },
    1400: {
      id: 1400,
      name: 'Sofya Ivanovna',
      page: 22,
      relations: [
        {
          to: 1200,
          type: 'partner',
          page: 22,
        },
        {
          to: 1500,
          type: 'parent',
          page: 22,
        },
        {
          to: 1600,
          type: 'parent',
          page: 22,
        },
        {
          to: 1800,
          type: 'child',
          page: 22,
        },
      ],
    },
    1500: {
      id: 1500,
      name: 'Ivan Karamazov',
      page: 15,
      relations: [
        {
          to: 1200,
          type: 'child',
          page: 15,
        },
        {
          to: 1400,
          type: 'child',
          page: 22,
        },
        {
          to: 1600,
          type: 'sibling',
          page: 15,
        },
      ],
    },
    1600: {
      id: 1600,
      name: 'Alexei Karamazov',
      page: 15,
      relations: [
        {
          to: 1200,
          type: 'child',
          page: 15,
        },
        {
          to: 1400,
          type: 'child',
          page: 22,
        },
        {
          to: 1500,
          type: 'sibling',
          page: 15,
        },
      ],
    },
    1700: {
      id: 1700,
      name: 'Grigory',
      page: 19,
      relations: [
        {
          to: 2900,
          type: 'partner',
          page: 124,
        },
      ],
    },
    1800: {
      id: 1800,
      name: 'Widow of General Vorokhov',
      page: 22,
      relations: [
        {
          to: 1400,
          type: 'parent',
          page: 22,
        },
      ],
    },
    1900: {
      id: 1900,
      name: 'Yefim Petrovich Polyonov',
      page: 25,
      relations: [],
    },
    2000: {
      id: 2000,
      name: 'Father Zosima',
      page: 30,
      relations: [],
    },
    2100: {
      id: 2100,
      name: 'Maximov (landowner)',
      page: 52,
      relations: [],
    },
    2200: {
      id: 2200,
      name: 'Mrs Khokhlakova',
      page: 54,
      relations: [
        {
          to: 2300,
          type: 'parent',
          page: 74,
        },
      ],
    },
    2300: {
      id: 2300,
      name: 'Liza Khokhlakova',
      page: 74,
      relations: [
        {
          to: 2200,
          type: 'child',
          page: 74,
        },
      ],
    },
    2400: {
      id: 2400,
      name: 'Katerina Ivanovna',
      page: 75,
      relations: [],
    },
    2500: {
      id: 2500,
      name: 'Rakitin',
      page: 91,
      relations: [],
    },
    2600: {
      id: 2600,
      name: 'Grushenka',
      page: 107,
      relations: [],
    },
    2700: {
      id: 2700,
      name: 'Father Superior',
      page: 113,
      relations: [],
    },
    2800: {
      id: 2800,
      name: 'Father Isidor',
      page: 113,
      relations: [],
    },
    2900: {
      id: 2900,
      name: 'Marfa',
      page: 124,
      relations: [
        {
          to: 1700,
          type: 'partner',
          page: 124,
        },
      ],
    },
    3000: {
      id: 3000,
      name: 'Smerdyakov',
      page: 124,
      relations: [],
    },
    3100: {
      id: 3100,
      name: 'Lizavetta Smerdyashchaya',
      page: 130,
      relations: [],
    },
  },
}
