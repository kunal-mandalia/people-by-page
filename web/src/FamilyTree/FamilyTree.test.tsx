import { onePairSpouse, onePerson } from '../__fixtures__/familyTree'
import { familyTreeToSVGDimensions } from './FamilyTree'

test('familyTreeToSVGDimensions > should return circle for single person', () => {
  // arrange
  const expected = [
    {
      id: 1,
      name: 'Fyodor Pavlovich Karamazov',
      svg: {
        circle: {
          cx: 100,
          cy: 100,
        },
        text: {
          x: 75,
          y: 105,
          value: 'Fyodor..',
        },
        lines: [],
      },
    },
  ]

  // act
  const actual = familyTreeToSVGDimensions(onePerson)

  // assert
  expect(actual).toMatchObject(expected)
})

test('familyTreeToSVGDimensions should map spousal relationship to SVG dimensions', () => {
  // arrange
  const expected = [
    {
      id: 1,
      name: 'Fyodor Pavlovich Karamazov',
      svg: {
        circle: {
          cx: 100,
          cy: 100,
        },
        text: {
          x: 100,
          y: 100,
          value: 'Fyodor..',
        },
        lines: [
          {
            x1: 400,
            x2: 400,
            y1: 200,
            y2: 400,
            strokeWidth: '6',
          },
        ],
      },
    },
    {
      id: 2,
      name: 'Adelaida Ivanovna Miusova',
      svg: {
        circle: {
          cx: 200,
          cy: 100,
        },
        text: {
          x: 100,
          y: 100,
          value: 'Adelai..',
        },
        lines: [
          {
            x1: 400,
            x2: 400,
            y1: 200,
            y2: 400,
            strokeWidth: '6',
          },
        ],
      },
    },
  ]

  // act
  const actual = familyTreeToSVGDimensions(onePairSpouse)

  // assert
  expect(actual).toMatchObject(expected)
})
