import { PersonID, RelatedPeople } from '../FamilyTree/types'

export const onePerson: Record<PersonID, RelatedPeople> = {
  1: {
    id: 1,
    name: 'Fyodor Pavlovich Karamazov',
    relations: [],
  },
}

export const onePairSpouse: Record<PersonID, RelatedPeople> = {
  1: {
    id: 1,
    name: 'Fyodor Pavlovich Karamazov',
    relations: [
      {
        to: 2,
        type: 'spouse',
      },
    ],
  },
  2: {
    id: 2,
    name: 'Adelaida Ivanovna Miusova',
    relations: [
      {
        to: 1,
        type: 'spouse',
      },
    ],
  },
}

export const onePairSpouseOneChild: Record<PersonID, RelatedPeople> = {
  1: {
    id: 1,
    name: 'Adelaida Ivanovna Miusova',
    relations: [
      {
        to: 2,
        type: 'spouse',
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
        type: 'spouse',
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

export const onePairSpouseTwoChildren: Record<PersonID, RelatedPeople> = {
  1: {
    id: 1,
    name: 'Fyodor Pavlovich Karamazov',
    relations: [
      {
        to: 4,
        type: 'spouse',
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
        type: 'spouse',
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

export const twoPairSpouseThreeChildren: Record<PersonID, RelatedPeople> = {
  1: {
    id: 1,
    name: 'Adelaida Ivanovna Miusova',
    relations: [
      {
        to: 2,
        type: 'spouse',
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
        type: 'spouse',
      },
      {
        to: 4,
        type: 'spouse',
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
        type: 'spouse',
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
