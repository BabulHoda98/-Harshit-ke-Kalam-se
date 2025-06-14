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

  // Inject Google Translate script and initialize
  useEffect(() => {
    // Remove any existing script to avoid duplicates
    const existingScript = document.getElementById('google-translate-script');
    if (existingScript) existingScript.remove();

    // Define the callback function globally
    window.googleTranslateElementInit = function () {
      new window.google.translate.TranslateElement({
        pageLanguage: 'en',
        includedLanguages: 'hi,en,es,fr,de,zh-CN,ar',
        layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
        autoDisplay: false
      }, 'google_translate_element');
    };

    // Inject the Google Translate script
    const script = document.createElement('script');
    script.id = 'google-translate-script';
    script.type = 'text/javascript';
    script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    document.body.appendChild(script);

    // Cleanup
    return () => {
      if (window.googleTranslateElementInit) delete window.googleTranslateElementInit;
      if (script) script.remove();
    };
  }, []);

  // Optional: Auto-select Hindi on load (can be adjusted)
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
    </BrowserRouter>
  )
}

export default App