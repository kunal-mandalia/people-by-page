import React from 'react'
import './App.css'
import { BookHeader } from './BookHeader/BookHeader'
import { CharacterGraph } from './CharacterGraph/CharacterGraph'
import { PageSlider } from './PageSlider/PageSlider'
import { twoPairPartnerThreeChildrenOneNonFamily as peopleTree } from './__fixtures__/peopleTrees'

function App() {
  return (
    <div className="App">
      <header>
        <BookHeader
          title="The Brothers Karamazov"
          author="Fyodor Dostoyevsky"
        />
        <PageSlider firstPage={17} lastPage={985} onPageChange={() => {}} />
        <CharacterGraph peopleTree={peopleTree} />
      </header>
    </div>
  )
}

export default App
