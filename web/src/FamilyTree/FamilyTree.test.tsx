import {
  onePairSpouse,
  onePairSpouseOneChild,
  onePairSpouseTwoChildren,
  onePerson,
  twoPairSpouseThreeChildren,
} from '../__fixtures__/familyTree'
import {
  familyTreeToSVGDimensions,
  familyTreeToChartDimensions,
} from './FamilyTree'

test.skip('familyTreeToSVGDimensions > should return circle for single person', () => {
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

test.skip('familyTreeToSVGDimensions should map spousal relationship to SVG dimensions', () => {
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

test('familyTreeToChartDimensions returns correct dimensions given onePerson', () => {
  // arrange
  const expected = [
    {
      id: 1,
      row: 0,
      column: 0,
    },
  ]

  // act
  const actual = familyTreeToChartDimensions(onePerson)

  // assert
  expect(actual).toMatchObject(expected)
})

test('familyTreeToChartDimensions returns correct dimensions given onePairSpouse', () => {
  // arrange
  const expected = [
    {
      id: 1,
      row: 0,
      column: 0,
    },
    {
      id: 2,
      row: 0,
      column: 1,
    },
  ]

  // act
  const actual = familyTreeToChartDimensions(onePairSpouse)

  // assert
  expect(actual).toMatchObject(expected)
})

test('familyTreeToChartDimensions returns correct dimensions given onePairSpouseOneChild', () => {
  // arrange
  const expected = [
    {
      id: 1,
      row: 0,
      column: 0,
    },
    {
      id: 2,
      row: 0,
      column: 1,
    },
    {
      id: 3,
      row: 1,
      column: 0,
    },
  ]

  // act
  const actual = familyTreeToChartDimensions(onePairSpouseOneChild)

  // assert
  expect(actual).toMatchObject(expected)
})

test('familyTreeToChartDimensions returns correct dimensions given onePairSpouseTwoChildren', () => {
  // arrange
  const expected = [
    {
      id: 1,
      row: 0,
      column: 0,
    },
    {
      id: 4,
      row: 0,
      column: 1,
    },
    {
      id: 5,
      row: 1,
      column: 0,
    },
    {
      id: 6,
      row: 1,
      column: 1,
    },
  ]

  // act
  const actual = familyTreeToChartDimensions(onePairSpouseTwoChildren)

  // assert
  expect(actual).toMatchObject(expected)
})

test('familyTreeToChartDimensions returns correct dimensions given twoPairSpouseThreeChildren', () => {
  // arrange
  const expected = [
    {
      id: 1,
      row: 0,
      column: 0,
    },
    {
      id: 2,
      row: 0,
      column: 1,
    },
    {
      id: 4,
      row: 0,
      column: 2,
    },
    {
      id: 3,
      row: 1,
      column: 0,
    },
    {
      id: 5,
      row: 1,
      column: 1,
    },
    {
      id: 6,
      row: 1,
      column: 2,
    },
  ]

  // act
  const actual = familyTreeToChartDimensions(twoPairSpouseThreeChildren)

  // assert
  expect(actual).toMatchObject(expected)
})
