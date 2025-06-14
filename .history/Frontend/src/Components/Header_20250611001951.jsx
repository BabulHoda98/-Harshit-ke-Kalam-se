import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Header = ({ navbarCategories, navbarLogoParts, marqueeItems }) => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleLanguage = () => {
    const newLang = i18n.language === 'hi' ? 'en' : 'hi';
    i18n.changeLanguage(newLang);
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md notranslate">
      {/* Navigation */}
      <nav className="bg-gray-900 text-white">
        <div className="container max-w-[1350px] mx-auto flex items-center justify-between px-6 py-4">

          {/* Modern Logo - Now with combined Brand Name */}
          <Link
            to="/"
            className="group flex items-center space-x-3 transition-all duration-300 hover:scale-105"
          >
            {/* Gradient Symbol Circle */}
            <div className="bg-gradient-to-br from-indigo-600 via-pink-500 to-yellow-400 text-white font-bold text-lg px-3 py-2 rounded-full shadow-lg">
              ✍️
            </div>

            {/* Brand Text - Combined and Enhanced */}
            <div className="flex flex-col leading-tight">
              <span className="text-xl sm:text-2xl font-extrabold text-white tracking-tight group-hover:text-pink-600 transition-colors duration-300">
                Harshit ke Kalam se
              </span>
              {/* Optional: Add a subtle tagline if desired, or remove this span */}
              <span className="text-sm sm:text-base font-medium text-gray-400 tracking-widest group-hover:text-yellow-500 transition-colors duration-300">
                Unleashing Thoughts
              </span>
            </div>
          </Link>

          {/* Static Quick Links */}
          <div className="hidden md:flex space-x-6 font-medium tracking-wide text-white ml-8">
            <a href="/" className="hover:text-blue-400 transition-colors duration-300">{t('header.home')}</a>
            <a href="/politics" className="hover:text-blue-400 transition-colors duration-300">{t('header.home')}</a>
            <a href="/sports" className="hover:text-blue-400 transition-colors duration-300">{t('header.home')}</a>
            <a href="/business" className="hover:text-blue-400 transition-colors duration-300">{t('header.home')}</a>
            <a href="/about" className="hover:text-blue-400 transition-colors duration-300">{t('header.about')}</a>
            <a href="/contact" className="hover:text-blue-400 transition-colors duration-300">{t('header.contact')}</a>
          </div>

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