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
