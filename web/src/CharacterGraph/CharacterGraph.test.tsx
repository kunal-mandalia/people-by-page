import {
  onePairPartner,
  onePairPartnerOneChild,
  onePairPartnerTwoChildren,
  onePerson,
  twoPairPartnerThreeChildren,
} from '../__fixtures__/peopleTrees'
import { peopleTreeToChartDimensions } from './CharacterGraph'

test('peopleTreeToChartDimensions returns correct dimensions given onePerson', () => {
  // arrange
  const expected = [
    {
      id: 1,
      row: 0,
      column: 0,
    },
  ]

  // act
  const actual = peopleTreeToChartDimensions(onePerson)

  // assert
  expect(actual).toMatchObject(expected)
})

test('peopleTreeToChartDimensions returns correct dimensions given onePairPartner', () => {
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
  const actual = peopleTreeToChartDimensions(onePairPartner)

  // assert
  expect(actual).toMatchObject(expected)
})

test('peopleTreeToChartDimensions returns correct dimensions given onePairPartnerOneChild', () => {
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
  const actual = peopleTreeToChartDimensions(onePairPartnerOneChild)

  // assert
  expect(actual).toMatchObject(expected)
})

test('peopleTreeToChartDimensions returns correct dimensions given onePairPartnerTwoChildren', () => {
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
  const actual = peopleTreeToChartDimensions(onePairPartnerTwoChildren)

  // assert
  expect(actual).toMatchObject(expected)
})

test('peopleTreeToChartDimensions returns correct dimensions given twoPairPartnerThreeChildren', () => {
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
  const actual = peopleTreeToChartDimensions(twoPairPartnerThreeChildren)

  // assert
  expect(actual).toMatchObject(expected)
})
