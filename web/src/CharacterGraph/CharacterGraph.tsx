import React, { Fragment } from 'react'
import { colors, firstNLetters } from '../util'
import { PeopleSVGDimensions, PeopleTree } from '../types'
import Tooltip from '@material-ui/core/Tooltip'

const SIZE_OFFSET_ROW_HEIGHT = 200
const SIZE_OFFSET_COLUMN_WIDTH = 200
const SIZE_ROW_HEIGHT = 250
const SIZE_COLUMN_WIDTH = 300
const SIZE_OFFSET_SIBLING_HEIGHT = 80

function getNextPersonColumn(dimensions: PeopleSVGDimensions[], level: number) {
  const columns = dimensions.filter((d) => d.row === level).map((d) => d.column)
  if (columns.length === 0) return 0
  return Math.max(...columns) + 1
}

export function peopleTreeToChartDimensions(
  peopleTree: PeopleTree
): PeopleSVGDimensions[] {
  let dimensions: PeopleSVGDimensions[] = []
  let queue: { id: number; level: number }[] = []
  let processedIds: number[] = []
  const ids = Object.keys(peopleTree).map((n) => Number(n))

  if (ids.length === 0) return dimensions

  queue.push({ id: Number(ids[0]), level: 0 })

  while (processedIds.length < ids.length) {
    if (queue.length > 0) {
      const { id, level } = queue.shift()!

      if (processedIds.includes(id)) {
        continue
      }

      const person = peopleTree[id]

      dimensions.push({
        id: person.id,
        row: level,
        column: getNextPersonColumn(dimensions, level),
      })
      processedIds.push(id)

      // 1. partners
      const partners = person.relations
        .filter((r) => r.type === 'partner')
        .map((s) => ({ id: s.to, level }))

      if (partners.length > 0) {
        queue.push(...partners)
      }

      // 2. siblings
      const siblings = person.relations
        .filter((r) => r.type === 'sibling')
        .map((s) => ({ id: s.to, level }))

      if (siblings.length > 0) {
        queue.push(...siblings)
      }

      // 3. parents
      const parents = person.relations
        .filter((r) => r.type === 'parent')
        .map((s) => ({ id: s.to, level: level + 1 }))

      if (parents.length > 0) {
        queue.push(...parents)
      }

      // 4. children
      const children = person.relations
        .filter((r) => r.type === 'child')
        .map((s) => ({ id: s.to, level: level - 1 }))

      if (children.length > 0) {
        queue.push(...children)
      }
    } else {
      // non family
      const nextId = ids.find((id) => !processedIds.includes(id))!
      queue.push({ id: nextId, level: 0 })
    }
  }
  return dimensions
}

function mapDimensionsToSVGCanvas(
  dimensions: PeopleSVGDimensions[]
): PeopleSVGDimensions[] {
  const minCol = Math.min(...dimensions.map((d) => d.column))
  const minRow = Math.min(...dimensions.map((d) => d.row))
  const adjCol = -minCol
  const adjRow = -minRow
  return dimensions.map((d) => ({
    id: d.id,
    row: (d.row + adjRow) * SIZE_ROW_HEIGHT + SIZE_OFFSET_ROW_HEIGHT,
    column: (d.column + adjCol) * SIZE_COLUMN_WIDTH + SIZE_OFFSET_COLUMN_WIDTH,
  }))
}

interface Props {
  peopleTree: PeopleTree
}

export function CharacterGraph({ peopleTree }: Props) {
  const dimensions = mapDimensionsToSVGCanvas(
    peopleTreeToChartDimensions(peopleTree)
  )
  let processedSpouses: number[] = []

  const singleParents = dimensions
    .map((d) => {
      const p1 = peopleTree[d.id]!
      const children = p1.relations
        .filter((r) => r.type === 'parent')
        .map((r) => peopleTree[r.to])
        .filter((c) => {
          const parents = c.relations.filter((r) => r.type === 'child')
          return parents.length === 1
        })
      return children
    })
    .filter((children) => children.length > 0)

  const singleParentLines = singleParents
    .map((children) => {
      const childrenDimensions = children.map((p) => {
        return dimensions.find((d) => d.id === p.id)!
      })
      const xMin = childrenDimensions.reduce((x, cur) => {
        if (cur.column < x) return cur.column
        return x
      }, Infinity)
      const xMax = childrenDimensions.reduce((x, cur) => {
        if (cur.column > x) return cur.column
        return x
      }, 0)
      const y = childrenDimensions[0].row
      const parentId = children[0].relations.find((r) => r.type === 'child')
        ?.to!
      const parentDimensions = dimensions.find((d) => d.id === parentId)!

      const parentToChildLine = (
        <line
          key={`single-parent-child-${JSON.stringify(
            childrenDimensions.map((cd) => cd.id)
          )}`}
          y1={parentDimensions.row}
          y2={y}
          x1={parentDimensions.column}
          x2={parentDimensions.column}
          stroke={colors[0]}
          strokeWidth="4px"
        />
      )
      const adjacentChildLine = (
        <line
          key={`adjacent-child-${JSON.stringify(
            childrenDimensions.map((cd) => cd.id)
          )}`}
          y1={y - SIZE_OFFSET_SIBLING_HEIGHT}
          y2={y - SIZE_OFFSET_SIBLING_HEIGHT}
          x1={xMin}
          x2={xMax}
          stroke={colors[0]}
          strokeWidth="4px"
        />
      )
      const childToParent = childrenDimensions.map((cd) => (
        <line
          key={`child-to-parent-${cd.id}`}
          y1={cd.row - SIZE_OFFSET_SIBLING_HEIGHT}
          y2={cd.row}
          x1={cd.column}
          x2={cd.column}
          stroke={colors[0]}
          strokeWidth="4px"
        />
      ))
      return [...childToParent, parentToChildLine, adjacentChildLine]
    })
    .flat()

  const partnerLines = dimensions
    .map((d) => {
      const p1 = peopleTree[d.id]!
      const partners = p1.relations.filter(
        (r) => r.type === 'partner' && !processedSpouses.includes(r.to)
      )
      if (partners.length === 0) return null

      const lines = partners.map((s, idx) => {
        const p2 = dimensions.find((d) => d.id === s.to)!

        // partners have children together
        const childrenLines = p1.relations
          .filter((r) => r.type === 'parent')
          .map((c) => peopleTree[c.to])
          .filter((p) =>
            p.relations.some((r) => r.to === p2.id && r.type === 'child')
          )
          .map((c) => {
            const x = p2.column - SIZE_COLUMN_WIDTH / 2
            const y1 = d.row - idx * 20
            const cd = dimensions.find((d) => d.id === c.id)!
            const y2 = cd.row - SIZE_OFFSET_SIBLING_HEIGHT
            const xc = cd.column
            const parentToChildLine = (
              <line
                key={`parent-child-${c.id}`}
                y1={y1}
                y2={y2}
                x1={x}
                x2={x}
                stroke={colors[idx]}
                strokeWidth="4px"
              />
            )
            const adjacentChildLine = (
              <line
                key={`adjacent-child-${c.id}`}
                y1={y2}
                y2={y2}
                x1={xc}
                x2={x}
                stroke={colors[idx]}
                strokeWidth="4px"
              />
            )
            const childToParent = (
              <line
                key={`child-to-parent-${cd.id}`}
                y1={cd.row - SIZE_OFFSET_SIBLING_HEIGHT}
                y2={cd.row}
                x1={cd.column}
                x2={cd.column}
                stroke={colors[0]}
                strokeWidth="4px"
              />
            )
            return [childToParent, parentToChildLine, adjacentChildLine]
          })
          .flat()

        return (
          <Fragment key={`partner-line-${d.id}`}>
            <line
              y1={d.row}
              y2={d.row}
              x1={d.column}
              x2={p2.column}
              stroke={colors[idx]}
              strokeWidth="10px"
            />
            {childrenLines}
          </Fragment>
        )
      })
      processedSpouses.push(d.id)
      return lines
    })
    .filter(Boolean)
    .flat()

  return (
    <div>
      <svg
        version="1.1"
        baseProfile="full"
        width="100vw"
        height="100vh"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="100%" height="100%" fill="#222222" />
        {singleParentLines}
        {partnerLines}
        {dimensions.map((d) => {
          return (
            <Fragment key={`person-${d.id}`}>
              <circle cx={d.column} cy={d.row} fill="#880e4f" r={60} />
              <Tooltip title={peopleTree[d.id].name}>
                <text x={d.column - 25} y={d.row + 5} fill="white">
                  {firstNLetters(peopleTree[d.id].name, 6)}
                </text>
              </Tooltip>
            </Fragment>
          )
        })}
      </svg>
    </div>
  )
}
