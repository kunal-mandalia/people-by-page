import { PeopleTree, PersonID, RelatedPeople } from '../types'

export const onePerson: PeopleTree = {
  1: {
    id: 1,
    name: 'Fyodor Pavlovich Karamazov',
    relations: [],
  },
}

export const onePairPartner: PeopleTree = {
  1: {
    id: 1,
    name: 'Fyodor Pavlovich Karamazov',
    relations: [
      {
        to: 2,
        type: 'partner',
      },
    ],
  },
  2: {
    id: 2,
    name: 'Adelaida Ivanovna Miusova',
    relations: [
      {
        to: 1,
        type: 'partner',
      },
    ],
  },
}

export const onePairPartnerOneChild: PeopleTree = {
  1: {
    id: 1,
    name: 'Adelaida Ivanovna Miusova',
    relations: [
      {
        to: 2,
        type: 'partner',
      },
      {
        to: 3,
        type: 'parent',
      },
    ],
  },
  2: {
    id: 2,
    name: 'Fyodor Pavlovich Karamazov',
    relations: [
      {
        to: 1,
        type: 'partner',
      },
      {
        to: 3,
        type: 'parent',
      },
    ],
  },
  3: {
    id: 3,
    name: 'Dmitry Fyodorovich Karamazov',
    relations: [
      {
        to: 1,
        type: 'child',
      },
      {
        to: 2,
        type: 'child',
      },
    ],
  },
}

export const onePairPartnerTwoChildren: PeopleTree = {
  1: {
    id: 1,
    name: 'Fyodor Pavlovich Karamazov',
    relations: [
      {
        to: 4,
        type: 'partner',
      },
      {
        to: 5,
        type: 'parent',
      },
      {
        to: 6,
        type: 'parent',
      },
    ],
  },
  4: {
    id: 4,
    name: 'Sofya Ivanovna',
    relations: [
      {
        to: 1,
        type: 'partner',
      },
      {
        to: 5,
        type: 'parent',
      },
      {
        to: 6,
        type: 'parent',
      },
    ],
  },
  5: {
    id: 5,
    name: 'Ivan Karamazov',
    relations: [
      {
        to: 1,
        type: 'child',
      },
      {
        to: 4,
        type: 'child',
      },
      {
        to: 6,
        type: 'sibling',
      },
    ],
  },
  6: {
    id: 6,
    name: 'Alexei Karamazov',
    relations: [
      {
        to: 1,
        type: 'child',
      },
      {
        to: 4,
        type: 'child',
      },
      {
        to: 5,
        type: 'sibling',
      },
    ],
  },
}

export const twoPairPartnerThreeChildren: PeopleTree = {
  1: {
    id: 1,
    name: 'Adelaida Ivanovna Miusova',
    relations: [
      {
        to: 2,
        type: 'partner',
      },
      {
        to: 3,
        type: 'parent',
      },
    ],
  },
  2: {
    id: 2,
    name: 'Fyodor Pavlovich Karamazov',
    relations: [
      {
        to: 1,
        type: 'partner',
      },
      {
        to: 4,
        type: 'partner',
      },
      {
        to: 3,
        type: 'parent',
      },
      {
        to: 5,
        type: 'parent',
      },
      {
        to: 6,
        type: 'parent',
      },
    ],
  },
  3: {
    id: 3,
    name: 'Dmitry Fyodorovich Karamazov',
    relations: [
      {
        to: 1,
        type: 'child',
      },
      {
        to: 2,
        type: 'child',
      },
    ],
  },
  4: {
    id: 4,
    name: 'Sofya Ivanovna',
    relations: [
      {
        to: 2,
        type: 'partner',
      },
      {
        to: 5,
        type: 'parent',
      },
      {
        to: 6,
        type: 'parent',
      },
    ],
  },
  5: {
    id: 5,
    name: 'Ivan Karamazov',
    relations: [
      {
        to: 2,
        type: 'child',
      },
      {
        to: 4,
        type: 'child',
      },
      {
        to: 6,
        type: 'sibling',
      },
    ],
  },
  6: {
    id: 6,
    name: 'Alexei Karamazov',
    relations: [
      {
        to: 2,
        type: 'child',
      },
      {
        to: 4,
        type: 'child',
      },
      {
        to: 5,
        type: 'sibling',
      },
    ],
  },
}

export const twoPairPartnerThreeChildrenOneNonFamily: Record<
  PersonID,
  RelatedPeople
> = {
  1: {
    id: 1,
    name: 'Adelaida Ivanovna Miusova',
    relations: [
      {
        to: 2,
        type: 'partner',
      },
      {
        to: 3,
        type: 'parent',
      },
    ],
  },
  2: {
    id: 2,
    name: 'Fyodor Pavlovich Karamazov',
    relations: [
      {
        to: 1,
        type: 'partner',
      },
      {
        to: 4,
        type: 'partner',
      },
      {
        to: 3,
        type: 'parent',
      },
      {
        to: 5,
        type: 'parent',
      },
      {
        to: 6,
        type: 'parent',
      },
    ],
  },
  3: {
    id: 3,
    name: 'Dmitry Fyodorovich Karamazov',
    relations: [
      {
        to: 1,
        type: 'child',
      },
      {
        to: 2,
        type: 'child',
      },
    ],
  },
  4: {
    id: 4,
    name: 'Sofya Ivanovna',
    relations: [
      {
        to: 2,
        type: 'partner',
      },
      {
        to: 5,
        type: 'parent',
      },
      {
        to: 6,
        type: 'parent',
      },
    ],
  },
  5: {
    id: 5,
    name: 'Ivan Karamazov',
    relations: [
      {
        to: 2,
        type: 'child',
      },
      {
        to: 4,
        type: 'child',
      },
      {
        to: 6,
        type: 'sibling',
      },
    ],
  },
  6: {
    id: 6,
    name: 'Alexei Karamazov',
    relations: [
      {
        to: 2,
        type: 'child',
      },
      {
        to: 4,
        type: 'child',
      },
      {
        to: 5,
        type: 'sibling',
      },
    ],
  },
  7: {
    id: 7,
    name: 'Father Zosima',
    relations: [],
  },
}
