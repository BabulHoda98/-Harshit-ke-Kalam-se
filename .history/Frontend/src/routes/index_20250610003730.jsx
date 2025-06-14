import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from '../Pages/Home'
import About from '../Pages/About'
import Contact from '../Pages/Contact'
import AdminDashboard from '../Pages/AdminDashboard'
import ArticlePage from "../Pages/CustomPages/ArticlePage"
import NewsPage from "../Pages/CustomPages/NewsPage"
import SectionPage from "../Pages/CustomPages/SectionPage"
import NotFound from '../Pages/NotFound'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="aboutus" element={<About />} />
      <Route path="contact" element={<Contact />} />
      <Route path="articles" element={<ArticlePage />} />
      <Route path="articles/:id" element={<ArticlePage />} />
      <Route path="news/:id" element={<NewsPage />} />
      <Route path="section" element={<SectionPage />} />
      <Route path="admin" element={<AdminDashboard />} />
      <Route path="404" element={<NotFound />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default AppRoutes
