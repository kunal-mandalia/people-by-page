import React from 'react'
import {
  onePairSpouse,
  onePerson,
  onePairSpouseOneChild,
} from '../__fixtures__/familyTree'
import { PersonID, PersonSVGDimensions, RelatedPeople } from './types'

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
  const ids = Object.keys(family)

  if (ids.length === 0) return dimensions

  queue.push({ id: Number(ids[0]), level: 0 })

  while (queue.length > 0) {
    const { id, level } = queue.shift()!

    if (processedIds.includes(id)) continue

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
  }
  return dimensions
}

export function familyTreeToSVGDimensions(
  family: Record<PersonID, RelatedPeople>
): PersonSVGDimensions[] {
  const OFFSET_X = 100
  const OFFSET_Y = 100
  const spacing = {
    adjacent: 200,
  }

  const firstPass = Object.keys(family).map((id, idx) => {
    const person = family[Number(id)]
    return {
      id: person.id,
      name: person.name,
      svg: {
        circle: {
          cx: OFFSET_X + idx * spacing.adjacent,
          cy: OFFSET_Y,
        },
        text: {
          x: OFFSET_X - 25 + idx * spacing.adjacent,
          y: OFFSET_Y + 5,
          value: firstNLetters(person.name, 6),
        },
        lines: [
          // {
          //   x1: 100,
          //   x2: 300,
          //   y1: 100,
          //   y2: 100,
          //   strokeWidth: '6',
          // },
        ],
      },
    }
  })

  return firstPass
}

export function FamilyTree() {
  const family = familyTreeToSVGDimensions(onePairSpouseOneChild)
  const lines = family.map((person) => person.svg.lines).flat()
  const circles = family.map((person) => person.svg.circle).flat()
  const texts = family.map((person) => person.svg.text).flat()
  console.log('>>> lines', lines)
  console.log('>>> circles', circles)
  console.log('>>> texts', texts)
  return (
    <svg
      version="1.1"
      baseProfile="full"
      width="100vw"
      height="100vh"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="100%" height="100%" fill="#222222" />

      {lines.map((line, idx) => (
        <line
          key={`line-${idx}`}
          x1={line.x1}
          x2={line.x2}
          y1={line.y1}
          y2={line.y2}
          stroke="rgb(255 255 255 / 60%)"
          strokeWidth={line.strokeWidth}
        />
      ))}

      {circles.map((c, idx) => (
        <circle key={`circle-${idx}`} cx={c.cx} cy={c.cy} fill="green" r={60} />
      ))}

      {texts.map((t, idx) => (
        <text key={`text-${idx}`} x={t.x} y={t.y} fill="white">
          {t.value}
        </text>
      ))}
    </svg>
  )
}
