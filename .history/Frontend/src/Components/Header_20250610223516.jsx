import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Header = ({ navbarCategories, navbarLogoParts, marqueeItems }) => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = React.useState(false);
  const logoParts = navbarLogoParts || {};

  const toggleLanguage = () => {
    const newLang = i18n.language === 'hi' ? 'en' : 'hi';
    i18n.changeLanguage(newLang);
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md notranslate font-sans">
      {/* Navigation */}
      <nav className="bg-gradient-to-r from-[#111827] to-[#1f2937] text-white">
        <div className="container max-w-[1350px] mx-auto flex items-center justify-between px-6 py-4">

          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group transition-transform duration-300 hover:scale-105">
            <div className="text-white font-black text-xl bg-gradient-to-r from-red-700 to-yellow-400 px-4 py-1 rounded-xl shadow-md tracking-wide animate-pulse">
              Harshit
            </div>
            <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-widest text-white">
              <span className="text-pink-400">के</span> Kalam Se
            </div>
          </Link>

          {/* Static Links */}
          <div className="hidden md:flex space-x-6 font-medium text-white ml-8 text-base">
            <a href="/" className="hover:text-pink-400 transition duration-300">{t('header.home')}</a>
            <a href="/about" className="hover:text-pink-400 transition duration-300">{t('header.about')}</a>
            <a href="/contact" className="hover:text-pink-400 transition duration-300">{t('header.contact')}</a>
            <button
              onClick={toggleLanguage}
              className="hover:text-yellow-400 transition duration-300"
            >
              {i18n.language === 'hi' ? 'EN' : 'हिंदी'}
            </button>
          </div>

          {/* Hamburger */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu" className="text-white">
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

      {/* Marquee / Live Ticker */}
      <div className="relative bg-gray-50 border-t border-b border-gray-200 py-2 overflow-hidden">
        <div className="container mx-auto px-6 flex items-center gap-4">

          {/* LIVE Badge */}
          <div className="flex-shrink-0 bg-white border border-pink-500 text-pink-600 px-4 py-1 rounded-full font-semibold flex items-center shadow-sm animate-bounce">
            <span className="w-2 h-2 bg-red-600 rounded-full mr-2 animate-ping"></span>
            {t('header.live')}
          </div>

          {/* Fade edges */}
          <div className="absolute left-0 top-0 h-full w-12 bg-gradient-to-r from-white via-white to-transparent z-10" />
          <div className="absolute right-0 top-0 h-full w-12 bg-gradient-to-l from-white via-white to-transparent z-10" />

          {/* Marquee Scroll */}
          <div className="flex-1 whitespace-nowrap overflow-hidden">
            <div className="animate-marquee inline-flex space-x-12 min-w-full text-gray-800 font-medium text-base">
              {marqueeItems?.length > 0 ? (
                marqueeItems.map((item, index) => (
                  <span key={index} className="hover:text-pink-500 transition duration-200">{item}</span>
                ))
              ) : (
                (t('header.marquee', { returnObjects: true }) || []).map((item, index) => (
                  <span key={index} className="hover:text-pink-500 transition duration-200">{item}</span>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Animation Style */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee {
          animation: marquee 25s linear infinite;
        }
      `}</style>
    </header>
  );
};

export default Header;
