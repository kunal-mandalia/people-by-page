import { PeopleTree } from '../types'

export const onePerson: PeopleTree = {
  1: {
    id: 1,
    name: 'Fyodor Pavlovich Karamazov',
    page: 17,
    relations: [],
  },
}

export const onePairPartner: PeopleTree = {
  1: {
    id: 1,
    name: 'Fyodor Pavlovich Karamazov',
    page: 17,
    relations: [
      {
        to: 2,
        type: 'partner',
        page: 17,
      },
    ],
  },
  2: {
    id: 2,
    name: 'Adelaida Ivanovna Miusova',
    page: 17,
    relations: [
      {
        to: 1,
        type: 'partner',
        page: 17,
      },
    ],
  },
}

export const onePairPartnerOneChild: PeopleTree = {
  1: {
    id: 1,
    name: 'Adelaida Ivanovna Miusova',
    page: 17,
    relations: [
      {
        to: 2,
        type: 'partner',
        page: 17,
      },
      {
        to: 3,
        type: 'parent',
        page: 17,
      },
    ],
  },
  2: {
    id: 2,
    name: 'Fyodor Pavlovich Karamazov',
    page: 17,
    relations: [
      {
        to: 1,
        type: 'partner',
        page: 17,
      },
      {
        to: 3,
        type: 'parent',
        page: 17,
      },
    ],
  },
  3: {
    id: 3,
    name: 'Dmitry Fyodorovich Karamazov',
    page: 17,
    relations: [
      {
        to: 1,
        type: 'child',
        page: 17,
      },
      {
        to: 2,
        type: 'child',
        page: 17,
      },
    ],
  },
}

export const onePairPartnerTwoChildren: PeopleTree = {
  1: {
    id: 1,
    name: 'Fyodor Pavlovich Karamazov',
    page: 17,
    relations: [
      {
        to: 4,
        type: 'partner',
        page: 17,
      },
      {
        to: 5,
        type: 'parent',
        page: 17,
      },
      {
        to: 6,
        type: 'parent',
        page: 17,
      },
    ],
  },
  4: {
    id: 4,
    name: 'Sofya Ivanovna',
    page: 17,
    relations: [
      {
        to: 1,
        type: 'partner',
        page: 17,
      },
      {
        to: 5,
        type: 'parent',
        page: 17,
      },
      {
        to: 6,
        type: 'parent',

        page: 17,
      },
    ],
  },
  5: {
    id: 5,
    name: 'Ivan Karamazov',
    page: 17,
    relations: [
      {
        to: 1,
        type: 'child',
        page: 17,
      },
      {
        to: 4,
        type: 'child',
        page: 17,
      },
      {
        to: 6,
        type: 'sibling',
        page: 17,
      },
    ],
  },
  6: {
    id: 6,
    name: 'Alexei Karamazov',
    page: 17,
    relations: [
      {
        to: 1,
        type: 'child',
        page: 17,
      },
      {
        to: 4,
        type: 'child',
        page: 17,
      },
      {
        to: 5,
        type: 'sibling',
        page: 17,
      },
    ],
  },
}

export const twoPairPartnerThreeChildren: PeopleTree = {
  1: {
    id: 1,
    name: 'Adelaida Ivanovna Miusova',
    page: 17,
    relations: [
      {
        to: 2,
        type: 'partner',
        page: 17,
      },
      {
        to: 3,
        type: 'parent',
        page: 17,
      },
    ],
  },
  2: {
    id: 2,
    name: 'Fyodor Pavlovich Karamazov',
    page: 17,
    relations: [
      {
        to: 1,
        type: 'partner',
        page: 17,
      },
      {
        to: 4,
        type: 'partner',
        page: 17,
      },
      {
        to: 3,
        type: 'parent',
        page: 17,
      },
      {
        to: 5,
        type: 'parent',
        page: 17,
      },
      {
        to: 6,
        type: 'parent',
        page: 17,
      },
    ],
  },
  3: {
    id: 3,
    name: 'Dmitry Fyodorovich Karamazov',
    page: 17,
    relations: [
      {
        to: 1,
        type: 'child',
        page: 17,
      },
      {
        to: 2,
        type: 'child',
        page: 17,
      },
    ],
  },
  4: {
    id: 4,
    name: 'Sofya Ivanovna',
    page: 17,
    relations: [
      {
        to: 2,
        type: 'partner',
        page: 17,
      },
      {
        to: 5,
        type: 'parent',
        page: 17,
      },
      {
        to: 6,
        type: 'parent',
        page: 17,
      },
    ],
  },
  5: {
    id: 5,
    name: 'Ivan Karamazov',
    page: 17,
    relations: [
      {
        to: 2,
        type: 'child',
        page: 17,
      },
      {
        to: 4,
        type: 'child',
        page: 17,
      },
      {
        to: 6,
        type: 'sibling',
        page: 17,
      },
    ],
  },
  6: {
    id: 6,
    name: 'Alexei Karamazov',
    page: 17,
    relations: [
      {
        to: 2,
        type: 'child',
        page: 17,
      },
      {
        to: 4,
        type: 'child',
        page: 17,
      },
      {
        to: 5,
        type: 'sibling',
        page: 17,
      },
    ],
  },
}

export const twoPairPartnerThreeChildrenOneNonFamily: PeopleTree = {
  1: {
    id: 1,
    name: 'Adelaida Ivanovna Miusova',
    page: 17,
    relations: [
      {
        to: 2,
        type: 'partner',
        page: 17,
      },
      {
        to: 3,
        type: 'parent',
        page: 17,
      },
    ],
  },
  2: {
    id: 2,
    name: 'Fyodor Pavlovich Karamazov',
    page: 17,
    relations: [
      {
        to: 1,
        type: 'partner',
        page: 17,
      },
      {
        to: 4,
        type: 'partner',
        page: 17,
      },
      {
        to: 3,
        type: 'parent',
        page: 17,
      },
      {
        to: 5,
        type: 'parent',
        page: 17,
      },
      {
        to: 6,
        type: 'parent',
        page: 17,
      },
    ],
  },
  3: {
    id: 3,
    name: 'Dmitry Fyodorovich Karamazov',
    page: 17,
    relations: [
      {
        to: 1,
        type: 'child',
        page: 17,
      },
      {
        to: 2,
        type: 'child',
        page: 17,
      },
    ],
  },
  4: {
    id: 4,
    name: 'Sofya Ivanovna',
    page: 17,
    relations: [
      {
        to: 2,
        type: 'partner',
        page: 17,
      },
      {
        to: 5,
        type: 'parent',
        page: 17,
      },
      {
        to: 6,
        type: 'parent',
        page: 17,
      },
    ],
  },
  5: {
    id: 5,
    name: 'Ivan Karamazov',
    page: 17,
    relations: [
      {
        to: 2,
        type: 'child',
        page: 17,
      },
      {
        to: 4,
        type: 'child',
        page: 17,
      },
      {
        to: 6,
        type: 'sibling',
        page: 17,
      },
    ],
  },
  6: {
    id: 6,
    name: 'Alexei Karamazov',
    page: 17,
    relations: [
      {
        to: 2,
        type: 'child',
        page: 17,
      },
      {
        to: 4,
        type: 'child',
        page: 17,
      },
      {
        to: 5,
        type: 'sibling',
        page: 17,
      },
    ],
  },
  7: {
    id: 7,
    name: 'Father Zosima',
    page: 30,
    relations: [],
  },
}
