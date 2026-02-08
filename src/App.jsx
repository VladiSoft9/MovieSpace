import { useState } from 'react'
import './App.css'
import SearchBar from './components/SearchBar'

function App() {

  return (
    <div className="app">
      <SearchBar onSearch={(query) => console.log('Searching for:', query)} />
    </div>
  )
}

export default App
