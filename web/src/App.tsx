import React from 'react'
import './App.css'
import { FamilyTree } from './FamilyTree/FamilyTree'
import { PageSlider } from './PageSlider/PageSlider'

function App() {
  return (
    <div className="App">
      <header>
        <PageSlider firstPage={17} lastPage={985} />
        <FamilyTree />
      </header>
    </div>
  )
}

export default App
