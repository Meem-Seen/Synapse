import React from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Workspace from './pages/Workspace' 

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/workspace" element={<Workspace />} />
    </Routes>
  )
}

