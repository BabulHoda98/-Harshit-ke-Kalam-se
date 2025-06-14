import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from '../Pages/Home'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* Add more routes here as needed */}
    </Routes>
  )
}

export default AppRoutes
