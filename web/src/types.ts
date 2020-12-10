export type BookId = number
export type PersonId = number
export type RelationshipType =
  | 'partner'
  | 'parent'
  | 'child'
  | 'sibling'
  | 'direct'
export type RelatedPeople = {
  id: number
  name: string
  page: number
  relations: { to: number; type: RelationshipType; page: number }[]
}
export type PeopleTree = Record<PersonId, RelatedPeople>
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
export type Book = {
  ISBN: string
  name: string
  author: string
  pages: {
    start: number
    total: number
    read: number
  }
  peopleByPage: PeopleTree
}
