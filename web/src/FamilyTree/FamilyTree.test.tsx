import {
  onePairSpouse,
  onePairSpouseOneChild,
  onePairSpouseTwoChildren,
  onePerson,
  twoPairSpouseThreeChildren,
} from '../__fixtures__/familyTree'
import { familyTreeToChartDimensions } from './FamilyTree'

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
      id: 3,
      row: 1,
      column: 0,
    },
    {
      id: 4,
      row: 0,
      column: 2,
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
