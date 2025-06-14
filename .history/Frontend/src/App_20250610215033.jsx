import React, { useState, useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'
import Header from './Components/Header'
import Footer from './Components/Footer'
import AppRoutes from './routes'
import ScrollToTop from './Components/ScrollToTop'

function App() {
  const [customization, setCustomization] = useState(null)

  useEffect(() => {
    fetch('http://localhost:5000/api/customization')
      .then(res => res.json())
      .then(data => setCustomization(data))
      .catch(err => console.error('Error fetching customization:', err))
  }, [])

  // Fixed header and footer links to prevent admin changes
  const fixedNavbarCategories = ["Home", "Contact", "About"];
  // For footer links, keep the original footerQuickLinksCategories if available, else empty array
  const fixedFooterQuickLinksCategories = customization ? customization.footerQuickLinksCategories : [];

  return (
    <BrowserRouter>
      <ScrollToTop />
      {customization && <Header navbarCategories={fixedNavbarCategories} navbarLogoParts={customization.navbarLogoParts} marqueeItems={customization.marqueeItems} />}
      <AppRoutes />
      {customization && <Footer footerLogoParts={customization.footerLogoParts} footerDescription={customization.footerDescription} footerContactInfo={customization.footerContactInfo} footerQuickLinksCategories={fixedFooterQuickLinksCategories} />}
    </BrowserRouter>
  )
}

export default App
