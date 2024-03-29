import React from 'react'
import './App.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Home } from './Home/Home'
import { Book } from './Book/Book'

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/book/:ISBN">
            <Book />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App
