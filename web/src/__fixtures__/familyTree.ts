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
    name: 'Fyodor Pavlovich Karamazov',
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
    name: 'Adelaida Ivanovna Miusova',
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
