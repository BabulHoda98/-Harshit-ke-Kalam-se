import React, { useState, useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'
import Header from './Components/Header'
import Footer from './Components/Footer'
import AppRoutes from './routes'
import ScrollToTop from './Components/ScrollToTop'

function App() {
  const [customization, setCustomization] = useState(null)

  useEffect(() => {
    fetch('/api/customization')
      .then(res => res.json())
      .then(data => {
        // Remove translation JSON integration by directly setting data
        setCustomization(data)
      })
      .catch(err => console.error('Error fetching customization:', err))
  }, [])

  const fixedNavbarCategories = ["Home", "Contact", "About"];
  const fixedFooterQuickLinksCategories = customization ? customization.footerQuickLinksCategories : [];

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header navbarCategories={fixedNavbarCategories} />
      <AppRoutes />
      <Footer />
    </BrowserRouter>
  )
}

export default App
