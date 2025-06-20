import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Header = ({ navbarCategories, navbarLogoParts, marqueeItems }) => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = React.useState(false);

  // Provide default empty object to avoid undefined error
  const logoParts = navbarLogoParts || {};

  const toggleLanguage = () => {
    const newLang = i18n.language === 'hi' ? 'en' : 'hi';
    i18n.changeLanguage(newLang);
  };

  return (
<header className="sticky top-0 z-50 bg-white shadow-md notranslate">
      {/* Navigation */}
      <nav className="bg-gray-900 text-white">
        <div className="container max-w-[1350px] mx-auto flex items-center justify-between px-6 py-4">

          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group" style={{ fontFamily: "'Poppins', sans-serif" }}>
            <div className="bg-gradient-to-r from-red-700 to-yellow-400 text-white font-extrabold px-4 py-2 rounded-lg text-xl shadow-lg transform group-hover:scale-110 transition-transform duration-300">
              {logoParts.part1 || t('header.news', 'News')}
            </div>
            <div className="text-3xl md:text-4xl font-extrabold text-white drop-shadow-lg group-hover:text-red-600 transition-colors duration-300 tracking-wider">
              {logoParts.part2 || t('header.bihar', 'Bihar')} <span className="text-blue-400">{logoParts.part3 || t('header.time', '24/7')}</span>
            </div>
          </Link>

      {/* Static Quick Links */}
      <div className="hidden md:flex space-x-6 font-medium tracking-wide text-white ml-8">
        <a href="/" className="hover:text-blue-400 transition-colors duration-300">{t('header.home')}</a>
        <a href="/about" className="hover:text-blue-400 transition-colors duration-300">{t('header.about')}</a>
        <a href="/contact" className="hover:text-blue-400 transition-colors duration-300">{t('header.contact')}</a>
      </div>

      <button
        onClick={() => {
          const select = document.querySelector('.goog-te-combo');
          if (select) {
            select.value = 'hi';
            select.dispatchEvent(new Event('change'));
          } else {
            alert('Google Translate is not ready yet. Please try again in a moment.');

          {/* Hamburger Icon */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-blue-400 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Live Ticker */}
      <div className="relative bg-white border-t border-b border-gray-200 py-2 overflow-hidden">
        <div className="container mx-auto px-10 flex items-center relative">

          {/* LIVE Badge */}
          <div className="flex-shrink-0 bg-white text-indigo-900 px-4 py-1 rounded-full font-bold mr-6 flex items-center border border-indigo-500 shadow-sm">
            <div className="w-2 h-2 bg-red-600 rounded-full mr-2 animate-ping"></div>
            {t('header.live')}
          </div>

          {/* Gradient Fades */}
          <div className="absolute left-0 top-0 h-full w-12 bg-gradient-to-r from-white via-white to-transparent z-10" />
          <div className="absolute right-0 top-0 h-full w-12 bg-gradient-to-l from-white via-white to-transparent z-10" />

          {/* Marquee */}
          <div className="flex-1 whitespace-nowrap overflow-hidden">
            <div className="animate-marquee inline-flex space-x-16 min-w-full">
              {marqueeItems && marqueeItems.length > 0 ? (
                marqueeItems.map((item, index) => (
                  <span key={index} className="text-black text-base font-medium">{item}</span>
                ))
              ) : (
                <>
                  {t('header.marquee', { returnObjects: true }).map((item, index) => (
                    <span key={index} className="text-black text-base font-medium">{item}</span>
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Animation Styles */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </header>
  );
};

export default Header;
