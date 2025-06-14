import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from '../Pages/Home'
import About from '../Pages/About'
import Contact from '../Pages/Contact'
import AdminDashboard from '../Pages/AdminDashboard'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="aboutus" element={<About />} />
      <Route path="contact" element={<Contact />} />
      <Route path="articles" element={<Article />} />
      <Route path="admin" element={<AdminDashboard />} />
    </Routes>
  )
}

export default AppRoutes
