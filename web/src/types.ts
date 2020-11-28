export type PersonID = number
export type RelationshipType = 'partner' | 'parent' | 'child' | 'sibling'
export type RelatedPeople = {
  id: number
  name: string
  relations: { to: number; type: RelationshipType }[]
}
export type PeopleTree = Record<PersonID, RelatedPeople>
export type PersonSVGDimensions = {
  id: number
  name: string
  svg: {
    circle: {
      cx: number
      cy: number
    }
    text: {
      x: number
      y: number
      value: string
    }
    lines: {
      x1: number
      x2: number
      y1: number
      y2: number
      strokeWidth: string
    }[]
  }
}
export type PeopleSVGDimensions = {
  id: number
  row: number
  column: number
}
