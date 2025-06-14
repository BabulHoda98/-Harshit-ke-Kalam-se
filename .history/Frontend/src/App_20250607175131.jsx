import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import Header from './Components/Header'
import About from './Pages/About'
import Contact from './Pages/Contact'
import Footer from './Components/Footer'

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="aboutus" element={<About/>}/>
        <Route path="contact" element={<Contact/>}/>
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
