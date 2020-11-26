import React, { Fragment } from 'react'
import { twoPairSpouseThreeChildrenOneNonFamily } from '../__fixtures__/familyTree'
import { PersonID, RelatedPeople } from './types'

function firstNLetters(s: string, n: number) {
  if (s.length > n) {
    return s.substring(0, n) + '..'
  }
  return s
}

type familyChartDimensions = {
  id: number
  row: number
  column: number
}

const colors = ['#535b2d', '#494949', '#d7d7d7', '9ad4ce']

function getNextPersonColumn(
  dimensions: familyChartDimensions[],
  level: number
) {
  const columns = dimensions.filter((d) => d.row === level).map((d) => d.column)
  if (columns.length === 0) return 0
  return Math.max(...columns) + 1
}

export function familyTreeToChartDimensions(
  family: Record<PersonID, RelatedPeople>
): familyChartDimensions[] {
  let dimensions: familyChartDimensions[] = []
  let queue: { id: number; level: number }[] = []
  let processedIds: number[] = []
  const ids = Object.keys(family).map((n) => Number(n))

  if (ids.length === 0) return dimensions

  queue.push({ id: Number(ids[0]), level: 0 })

  while (processedIds.length < ids.length) {
    if (queue.length > 0) {
      const { id, level } = queue.shift()!

      if (processedIds.includes(id)) {
        continue
      }

      const person = family[id]

      dimensions.push({
        id: person.id,
        row: level,
        column: getNextPersonColumn(dimensions, level),
      })
      processedIds.push(id)

      // 1. spouses
      const spouses = person.relations
        .filter((r) => r.type === 'spouse')
        .map((s) => ({ id: s.to, level }))

      if (spouses.length > 0) {
        queue.push(...spouses)
      }

      // 2. siblings
      const siblings = person.relations
        .filter((r) => r.type === 'sibling')
        .map((s) => ({ id: s.to, level }))

      if (spouses.length > 0) {
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

const offsetRowHeight = 200
const offsetColumnWidth = 200
const rowHeight = 250
const columnWidth = 300

function mapDimensionsToSVGCanvas(
  dims: familyChartDimensions[]
): familyChartDimensions[] {
  const minCol = Math.min(...dims.map((d) => d.column))
  const minRow = Math.min(...dims.map((d) => d.row))
  const adjCol = -minCol
  const adjRow = -minRow
  return dims.map((d) => ({
    id: d.id,
    row: (d.row + adjRow) * rowHeight + offsetRowHeight,
    column: (d.column + adjCol) * columnWidth + offsetColumnWidth,
  }))
}

export function FamilyTree() {
  const tree = twoPairSpouseThreeChildrenOneNonFamily
  const dimensions = mapDimensionsToSVGCanvas(familyTreeToChartDimensions(tree))
  let processedSpouses: number[] = []
  const spouseLines = dimensions
    .map((d) => {
      const p1 = tree[d.id]!
      const spouses = p1.relations.filter(
        (r) => r.type === 'spouse' && !processedSpouses.includes(r.to)
      )
      if (spouses.length === 0) return null

      const lines = spouses.map((s, idx) => {
        const p2 = dimensions.find((d) => d.id === s.to)!
        // spouse have children together?
        const childrenLines = p1.relations
          .filter((r) => r.type === 'parent')
          .map((c) => tree[c.to])
          .filter((p) =>
            p.relations.some((r) => r.to === p2.id && r.type === 'child')
          )
          .map((c) => {
            const x = p2.column - columnWidth / 2
            const y1 = d.row - idx * 20
            const cd = dimensions.find((d) => d.id === c.id)!
            const y2 = cd.row - 55
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
            return [parentToChildLine, adjacentChildLine]
          })
          .flat()

        return (
          <Fragment key={`spouse-line-${d.id}`}>
            <line
              y1={d.row - idx * 20}
              y2={d.row - idx * 20}
              x1={d.column}
              x2={p2.column}
              stroke={colors[idx]}
              strokeWidth="8px"
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
        {spouseLines}
        {dimensions.map((d) => {
          return (
            <Fragment key={`person-${d.id}`}>
              <circle cx={d.column} cy={d.row} fill="green" r={60} />
              <text x={d.column - 25} y={d.row + 5} fill="white">
                {firstNLetters(tree[d.id].name, 6)}
              </text>
            </Fragment>
          )
        })}
      </svg>
    </div>
  )
}
