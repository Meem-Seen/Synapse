import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Workspace from './pages/Workspace'
import './App.css'

function App() {

  return (
    <RoomProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/workspace" element={<Workspace />} />
      </Routes>
    </RoomProvider>
  )
}

export default App
