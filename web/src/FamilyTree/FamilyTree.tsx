import React from 'react'
import { onePairSpouse, onePerson } from '../__fixtures__/familyTree'
import { PersonID, PersonSVGDimensions, RelatedPeople } from './types'

function firstNLetters(s: string, n: number) {
  if (s.length > n) {
    return s.substring(0, n) + '..'
  }
  return s
}

export function familyTreeToSVGDimensions(
  family: Record<PersonID, RelatedPeople>
): PersonSVGDimensions[] {
  const OFFSET_X = 100
  const OFFSET_Y = 100
  const spacing = {
    adjacent: 200,
  }

  return Object.keys(family).map((id, idx) => {
    const person = family[id]
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
}

export function FamilyTree() {
  const family = familyTreeToSVGDimensions(onePairSpouse)
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
