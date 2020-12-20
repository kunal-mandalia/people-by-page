import { books } from './books'

books.forEach((book) => {
  test(`Book relationships and page constraints in ${book.name} (${book.ISBN})`, () => {
    const {
      pages: { start, total, read },
      peopleByPage,
    } = book

    // Page constraints
    expect(start).toBeGreaterThanOrEqual(1)
    expect(start).toBeLessThanOrEqual(total)
    expect(read).toBeGreaterThanOrEqual(start)
    expect(read).toBeLessThanOrEqual(total)

    // Symmetry of relationships between people
    Object.keys(peopleByPage).map((id) => {
      const person = peopleByPage[Number(id)]!
      person.relations.forEach((r) => {
        switch (r.type) {
          case 'parent': {
            const child = peopleByPage[r.to]
            expect(child).toBeTruthy()
            expect(
              child.relations.some(
                (rc) => rc.to === person.id && rc.type === 'child'
              )
            ).toBe(true)
            break
          }
          case 'child': {
            const parent = peopleByPage[r.to]
            expect(parent).toBeTruthy()
            expect(
              parent.relations.some(
                (rp) => rp.to === person.id && rp.type === 'parent'
              )
            ).toBe(true)
            break
          }
          case 'partner': {
            const partner = peopleByPage[r.to]
            expect(partner).toBeTruthy()
            expect(
              partner.relations.some(
                (r) => r.to === person.id && r.type === 'partner'
              )
            ).toBe(true)
            break
          }
          case 'sibling': {
            const sibling = peopleByPage[r.to]
            expect(sibling).toBeTruthy()
            expect(
              sibling.relations.some(
                (r) => r.to === person.id && r.type === 'sibling'
              )
            ).toBe(true)
            break
          }
          case 'direct': {
            const direct = peopleByPage[r.to]
            expect(direct).toBeTruthy()
            expect(
              direct.relations.some(
                (r) => r.to === person.id && r.type === 'direct'
              )
            ).toBe(true)
            break
          }
          default: {
          }
        }
      })
    })
  })
})
