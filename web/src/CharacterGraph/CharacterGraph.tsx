import React, { Fragment, useState } from 'react'
import { colors, firstNLetters } from '../util'
import { PeopleSVGDimensions, PeopleTree } from '../types'
import Tooltip from '@material-ui/core/Tooltip'
import { makeStyles } from '@material-ui/core'

const SIZE_OFFSET_ROW_HEIGHT = 100
const SIZE_OFFSET_COLUMN_WIDTH = 250
const SIZE_ROW_HEIGHT = 250
const SIZE_COLUMN_WIDTH = 300
const SIZE_OFFSET_SIBLING_HEIGHT = 75
const PERSON_FILL = '#880e4f'
const NEW_PERSON_FILL = '#d0084d'
const BACKGROUND_FILL = '#222222'
const PERSON_RADIUS = 60

const useStyles = makeStyles((theme) => ({
  zoomControl: {
    stroke: theme.palette.secondary.dark,
    strokeWidth: 2,
    fill: BACKGROUND_FILL,
    cursor: 'pointer',
  },
  zoomControlText: {
    fill: theme.palette.secondary.dark,
    cursor: 'pointer',
    userSelect: 'none',
  },
  personCircle: {
    userSelect: 'none',
  },
}))

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

      // 0. direct cousins
      const cousins = person.relations
        .filter((r) => r.type === 'direct-cousin')
        .map((s) => ({ id: s.to, level }))

      if (cousins.length > 0) {
        queue.push(...cousins)
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

function normaliseDimensions(dimensions: PeopleSVGDimensions[]) {
  const minCol = Math.min(...dimensions.map((d) => d.column))
  const minRow = Math.min(...dimensions.map((d) => d.row))
  const adjCol = -minCol
  const adjRow = -minRow
  return dimensions.map((d) => ({
    id: d.id,
    row: d.row + adjRow,
    column: d.column + adjCol,
  }))
}

function mapDimensionsToSVGCanvas(
  dimensions: PeopleSVGDimensions[],
  zoom: number = 1
): PeopleSVGDimensions[] {
  return dimensions.map((d) => ({
    id: d.id,
    row: d.row * SIZE_ROW_HEIGHT * zoom + SIZE_OFFSET_ROW_HEIGHT,
    column: d.column * SIZE_COLUMN_WIDTH * zoom + SIZE_OFFSET_COLUMN_WIDTH,
  }))
}

export function getDistance(
  dimension: PeopleSVGDimensions,
  dimensions: PeopleSVGDimensions[],
  peopleTree: PeopleTree
) {
  const p1 = peopleTree[dimension.id]
  const p1D = dimension
  const totalDistance = p1.relations
    .filter((r) => r.type === 'child' || r.type === 'parent')
    .map((r) => {
      const p2D = dimensions.find((d) => d.id === r.to)!
      const distance = Math.abs(p1D.column - p2D.column)
      return distance
    })
    .reduce((a, b) => a + b, 0)
  return totalDistance
}

export function optimiseDimensions(
  dimensions: PeopleSVGDimensions[],
  peopleTree: PeopleTree
) {
  const optimisedDimensions: PeopleSVGDimensions[] = []
  const maxColumn = dimensions.reduce(
    (column, d) => (d.column > column ? d.column : column),
    0
  )
  const maxColumnByRow: Record<number, number> = {}

  const getMaxAvailableColumn = (row: number) => {
    const mcr = maxColumnByRow[row]
    if (!mcr) return maxColumn
    return mcr - 1
  }

  const setMaxAvailableColumn = (row: number, column: number) => {
    if (!maxColumnByRow[row] || maxColumnByRow[row] > column) {
      maxColumnByRow[row] = column
    }
  }

  const getLatestDimensions = () => {
    return dimensions.map((d) => {
      const optD = optimisedDimensions.find((o) => o.id === d.id)
      if (optD) return optD
      return d
    })
  }

  const sorted = dimensions
    .sort((a, b) => {
      if (a.row === b.row) {
        return a.column - b.column
      }
      return a.row - b.row
    })
    .reverse()

  for (let i = 0; i < sorted.length; i++) {
    let dimension = sorted[i]
    let optimalDimension = dimension
    let distance = getDistance(dimension, getLatestDimensions(), peopleTree)
    const maxAvailableColumn = getMaxAvailableColumn(dimension.row)

    for (let j = dimension.column; j <= maxAvailableColumn; j++) {
      const nextDimension = { ...dimension, column: j }
      const nextDistance = getDistance(
        nextDimension,
        getLatestDimensions(),
        peopleTree
      )
      if (nextDistance <= distance) {
        distance = nextDistance
        optimalDimension = nextDimension
      }
      if (nextDistance > distance || j === maxAvailableColumn) {
        optimisedDimensions.push(optimalDimension)
        setMaxAvailableColumn(optimalDimension.row, optimalDimension.column)
        break
      }
    }
  }
  return optimisedDimensions
}

interface Props {
  peopleTree: PeopleTree
  page: number
  startPage: number
}

export function CharacterGraph({ peopleTree, page, startPage }: Props) {
  const [zoom, setZoom] = useState<number>(1)
  const classes = useStyles()

  const handleZoom = (out: boolean) => () => {
    const nextZoom = zoom + (out ? -0.1 : 0.1)
    setZoom(nextZoom)
  }

  const opt = optimiseDimensions(
    normaliseDimensions(peopleTreeToChartDimensions(peopleTree)),
    peopleTree
  )
  const dimensions = mapDimensionsToSVGCanvas(opt, zoom)
  let processedPartners: number[] = []

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
      const parentId = children[0].relations.find((r) => r.type === 'child')
        ?.to!
      const parentDimensions = dimensions.find((d) => d.id === parentId)!

      const childrenDimensions = children.map((p) => {
        return dimensions.find((d) => d.id === p.id)!
      })
      const xMin =
        childrenDimensions.length === 1
          ? parentDimensions.column
          : childrenDimensions.reduce((x, cur) => {
              if (cur.column < x) return cur.column
              return x
            }, Infinity)
      const xMax = childrenDimensions.reduce((x, cur) => {
        if (cur.column > x) return cur.column
        return x
      }, 0)
      const xAvg =
        childrenDimensions.reduce((total, c) => total + c.column, 0) /
        childrenDimensions.length
      const y = childrenDimensions[0].row

      const parentToChildLine = (
        <line
          key={`single-parent-child-${JSON.stringify(
            childrenDimensions.map((cd) => cd.id)
          )}`}
          y1={parentDimensions.row}
          y2={y - SIZE_OFFSET_SIBLING_HEIGHT * zoom}
          x1={parentDimensions.column}
          x2={xAvg}
          stroke={colors[0]}
          strokeWidth="4px"
        />
      )
      const adjacentChildLine =
        childrenDimensions.length > 1 ? (
          <line
            key={`adjacent-child-${JSON.stringify(
              childrenDimensions.map((cd) => cd.id)
            )}`}
            y1={y - SIZE_OFFSET_SIBLING_HEIGHT * zoom}
            y2={y - SIZE_OFFSET_SIBLING_HEIGHT * zoom}
            x1={xMin}
            x2={xMax}
            stroke={colors[0]}
            strokeWidth="4px"
          />
        ) : null
      const childToParent = childrenDimensions.map((cd) => (
        <line
          key={`child-to-parent-${cd.id}`}
          y1={cd.row - SIZE_OFFSET_SIBLING_HEIGHT * zoom}
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

  const partnerLines = dimensions.map((d) => {
    const p1 = peopleTree[d.id]!
    const p1D = dimensions.find((d) => d.id === p1.id)!
    const partners = p1.relations.filter(
      (r) => r.type === 'partner' && !processedPartners.includes(r.to)
    )
    if (partners.length === 0) return null

    const lines = partners
      .map((p, idx) => {
        const p2 = peopleTree[p.to]
        const p2D = dimensions.find((d) => d.id === p.to)!

        const p1p2Children = p2.relations.filter(
          (r2) =>
            r2.type === 'parent' &&
            p1.relations.some((r1) => r1.to === r2.to && r1.type === 'parent')
        )

        const p1p2ChildrenDimensions = p1p2Children
          .map((r) => r.to)
          .map((id) => dimensions.find((d) => d.id === id))

        const siblingLineX1 = p1p2ChildrenDimensions.reduce(
          (minCol, cur) => (cur!.column < minCol ? cur!.column : minCol),
          Infinity
        )
        const siblingLineX2 = p1p2ChildrenDimensions.reduce(
          (maxCol, cur) => (cur!.column > maxCol ? cur!.column : maxCol),
          0
        )
        const parentMidpoint = (p1D.column + p2D.column) / 2
        const siblingMidpointCol =
          p1p2ChildrenDimensions.reduce((sum, cur) => cur!.column + sum, 0) /
          p1p2ChildrenDimensions.length
        const c1D = p1p2ChildrenDimensions[0]!

        const siblingY =
          p1p2ChildrenDimensions[0]!.row - SIZE_OFFSET_SIBLING_HEIGHT * zoom
        const siblingLine = (
          <line
            key={`siblingLine:${p.to}:${c1D.id}`}
            y1={siblingY}
            y2={siblingY}
            x1={siblingLineX1}
            x2={siblingLineX2}
            stroke={colors[0]}
            strokeWidth="4px"
          />
        )
        const parentToParentLine = (
          <line
            key={`parentToParentLine:${p.to}:${p1D.id}:${p2D.id}`}
            x1={p1D.column}
            y1={p1D.row}
            x2={p2D.column}
            y2={p2D.row}
            stroke={colors[0]}
            strokeWidth="8px"
          />
        )
        const parentToMidSiblingLine = (
          <line
            key={`parentToMidSiblingLine:${p.to}:${siblingMidpointCol}`}
            x1={parentMidpoint}
            y1={p1D.row}
            x2={siblingMidpointCol}
            y2={c1D.row - SIZE_OFFSET_SIBLING_HEIGHT * zoom}
            stroke={colors[0]}
            strokeWidth="4px"
          />
        )
        const childToParent = p1p2ChildrenDimensions
          .filter(Boolean)
          .map((cd) => (
            <line
              key={`child-to-parent-${cd!.id}`}
              y1={cd!.row - SIZE_OFFSET_SIBLING_HEIGHT * zoom}
              y2={cd!.row}
              x1={cd!.column}
              x2={cd!.column}
              stroke={colors[0]}
              strokeWidth="4px"
            />
          ))
        return [
          ...childToParent,
          parentToParentLine,
          parentToMidSiblingLine,
          siblingLine,
        ]
      })
      .flat()
      .filter(Boolean)
    return lines
  })

  return (
    <div>
      <svg
        version="1.1"
        baseProfile="full"
        width="100vw"
        height="100vh"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="100%" height="100%" fill={BACKGROUND_FILL} />
        {/* Zoom */}
        <rect
          width="32"
          height="32"
          x={100}
          y={10}
          rx={4}
          ry={4}
          onClick={handleZoom(false)}
          className={classes.zoomControl}
        ></rect>
        <text
          x={108}
          y={34}
          fontSize="28"
          onClick={handleZoom(false)}
          className={classes.zoomControlText}
        >
          +
        </text>

        <rect
          width="32"
          height="32"
          x={100}
          y={50}
          rx={4}
          ry={4}
          onClick={handleZoom(true)}
          className={classes.zoomControl}
        />
        <text
          x={109}
          y={74}
          fontSize="28"
          onClick={handleZoom(true)}
          className={classes.zoomControlText}
        >
          –
        </text>
        {singleParentLines}
        {partnerLines}
        {dimensions.map((d) => {
          const person = peopleTree[d.id]
          const isIntroduced = page > startPage && person.page === page
          return (
            <Fragment key={`person-${d.id}`}>
              <circle
                cx={d.column}
                cy={d.row}
                fill={isIntroduced ? NEW_PERSON_FILL : PERSON_FILL}
                r={PERSON_RADIUS * zoom}
              />
              <Tooltip title={peopleTree[d.id].name}>
                <text
                  x={d.column - 25 * zoom}
                  y={d.row + 5 * zoom}
                  fill="white"
                  fontSize={16 * zoom}
                  className={classes.personCircle}
                >
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
