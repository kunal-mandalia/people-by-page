import React from 'react'
import './App.css'
import { BookHeader } from './BookHeader/BookHeader'
import { FamilyTree } from './FamilyTree/FamilyTree'
import { PageSlider } from './PageSlider/PageSlider'

function App() {
  return (
    <div className="App">
      <header>
        <BookHeader
          title="The Brothers Karamazov"
          author="Fyodor Dostoyevsky"
        />
        <PageSlider firstPage={17} lastPage={985} />
        <FamilyTree />
      </header>
    </div>
  )
}

export default App
