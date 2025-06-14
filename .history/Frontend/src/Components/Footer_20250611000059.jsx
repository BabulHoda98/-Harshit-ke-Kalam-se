import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const Footer = ({ footerLogoParts, footerDescription, footerContactInfo, footerQuickLinksCategories }) => {
  const { t } = useTranslation();
  // We'll hardcode the brand name here since it's a fixed brand identity for the footer logo
  const brandName = "Harshit ke Kalam se";
  const contactInfo = footerContactInfo || { email: '', phone: '', address: '' };
  const quickLinks = footerQuickLinksCategories || [];
  const currentYear = new Date().getFullYear(); // Get the current year for the copyright

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-gray-300 py-8 md:py-12 mt-8 md:mt-12 notranslate">
      <div className="container mx-auto px-4 md:px-10 flex flex-wrap justify-between gap-6 md:gap-8 border-b border-gray-700 pb-6 md:pb-8">
        {/* Logo and Description */}
        <div className="flex flex-col w-full md:w-auto md:flex-grow-0">
          <Link to="/" className="flex items-center space-x-2 group mb-4">
            {/* Symbol/Icon for the brand */}
            <div className="bg-gradient-to-br from-indigo-600 via-pink-500 to-yellow-400 text-white font-bold text-lg px-3 py-2 rounded-full shadow-lg transform group-hover:scale-110 transition-transform duration-300">
              ✍️
            </div>
            {/* Brand Text - Harshit ke Kalam se */}
            <div className="text-2xl md:text-3xl font-black text-gray-100 group-hover:text-pink-500 transition-colors duration-300 tracking-tight">
              {brandName}
            </div>
          </Link>
          <p className="text-gray-400 max-w-xs text-sm md:text-base">
            {footerDescription || t('footer.description', 'Delivering profound thoughts and stories. Dive deep into reflections, insights, and creative expressions from Harshit ke Kalam se.')}
          </p>
          <div className="flex space-x-4 mt-4 md:mt-6 text-gray-400">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors duration-300">
              <FaFacebookF size={18} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors duration-300">
              <FaTwitter size={18} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500 transition-colors duration-300">
              <FaInstagram size={18} />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-red-600 transition-colors duration-300">
              <FaYoutube size={18} />
            </a>
          </div>
        </div>

        {/* Navigation links */}
        <div className="w-1/2 md:w-auto">
          <h3 className="text-white font-semibold mb-4">{t('footer.quickLinks')}</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="hover:text-white transition-colors duration-300">{t('footer.home')}</Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-white transition-colors duration-300">{t('footer.about')}</Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-white transition-colors duration-300">{t('footer.contact')}</Link>
            </li>
            <li>
              <Link to="/advertise" className="hover:text-white transition-colors duration-300">{t('footer.advertise')}</Link>
            </li>
          </ul>
        </div>

        {/* Contact & Subscribe */}
        <div className="w-full md:w-auto md:max-w-xs">
          <h3 className="text-white font-semibold mb-4">{t('footer.contactUs')}</h3>
          <p className="text-gray-400 mb-4">
            {t('footer.email')}: {contactInfo.email || 'harshit@kalamse.com'}<br/>
            {t('footer.phone')}: {contactInfo.phone || '+91 98765 43210'}<br/>
            {t('footer.address')}: {contactInfo.address || 'Creative Corner, Nashik, India'}
          </p>
          <form className="flex">
            <input
              type="email"
              placeholder={t('footer.subscribePlaceholder', 'Your Email')}
              className="w-full px-3 py-2 rounded-l-md bg-gray-800 text-gray-300 placeholder-gray-500 focus:outline-none"
            />
            <button
              type="submit"
              className="bg-red-600 hover:bg-red-700 text-white px-4 rounded-r-md transition-colors duration-300"
            >
              {t('footer.subscribeButton', 'Subscribe')}
            </button>
          </form>
        </div>
      </div>

      {/* Copyright Line */}
      <div className="container mx-auto px-6 mt-8 text-center text-sm text-gray-500">
        <p className="mb-2">© {currentYear} {brandName}. All rights reserved.</p>
      </div>

      {/* Powered by PigoPi with Gradient */}
      <div className="container mx-auto px-6 text-center text-lg font-semibold">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
          {t('footer.poweredBy', 'Powered By')}
        </span>{' '}
        <a href="https://pigo-pi.com/" target="_blank" rel="noopener noreferrer" className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-cyan-400 to-green-500 hover:opacity-80 transition-opacity duration-300">
          PigoPi
        </a>
      </div>
    </footer>
  );
};

export default Footer;