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

  const fixedNavbarCategories = ["Home", "Contact", "About"];
  const fixedFooterQuickLinksCategories = customization ? customization.footerQuickLinksCategories : [];

  useEffect(() => {
    function triggerGoogleTranslate() {
      const select = document.querySelector('#google_translate_element select');
      if (select) {
        select.value = 'hi';
        select.dispatchEvent(new Event('change'));
      }
    }
    const intervalId = setInterval(() => {
      if (document.querySelector('#google_translate_element select')) {
        triggerGoogleTranslate();
        clearInterval(intervalId);
      }
    }, 500);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <BrowserRouter>
      <ScrollToTop />
      {customization && <Header navbarCategories={fixedNavbarCategories} navbarLogoParts={customization.navbarLogoParts} marqueeItems={customization.marqueeItems} />}
      <div id="translate-content">
        <AppRoutes />
      </div>
      {customization && <Footer footerLogoParts={customization.footerLogoParts} footerDescription={customization.footerDescription} footerContactInfo={customization.footerContactInfo} footerQuickLinksCategories={fixedFooterQuickLinksCategories} />}
      {/* Google Translate Widget */}
      <div id="google_translate_element" className="translate-widget" style={{position: 'fixed', bottom: 10, right: 10, zIndex: 1000}}></div>
      <script type="text/javascript">
        {`
          function googleTranslateElementInit() {
            new window.google.translate.TranslateElement({
              pageLanguage: 'en',
              includedLanguages: 'hi,en,es,fr,de,zh-CN,ar',
              layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
              autoDisplay: false
            }, 'google_translate_element');
          }
        `}
      </script>
      <script type="text/javascript" src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"></script>
    </BrowserRouter>
  )
}

export default App
