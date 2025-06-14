import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const Footer = ({ footerLogoParts, footerDescription, footerContactInfo, footerQuickLinksCategories }) => {
  const { t } = useTranslation();
  // Provide default empty objects to avoid undefined errors
  const logoParts = footerLogoParts || {};
  const contactInfo = footerContactInfo || { email: '', phone: '', address: '' };
  const quickLinks = footerQuickLinksCategories || [];

  return (
    <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-gray-300 py-8 md:py-12 mt-8 md:mt-12">
      <div className="container mx-auto px-4 md:px-20 flex flex-col md:flex-row justify-between gap-6 md:gap-8 border-b border-gray-700 pb-6 md:pb-8">
        {/* Logo and Description */}
        <div className="flex-1">
          <Link to="/" className="flex items-center space-x-2 group mb-4">
            <div className="bg-gradient-to-r from-red-600 to-yellow-500 text-white font-bold px-3 py-1 md:px-4 md:py-2 rounded-md text-lg md:text-xl shadow-md transform group-hover:scale-110 transition-transform duration-300">
              {logoParts.part1 || t('header.news', 'News')}
            </div>
            <div className="text-2xl md:text-3xl font-black text-gray-100 group-hover:text-red-500 transition-colors duration-300 tracking-tight">
              {logoParts.part2 || t('header.bihar', 'Bihar')} <span className="text-blue-400">{logoParts.part3 || t('header.time', '24/7')}</span>
            </div>
          </Link>
          <p className="text-gray-400 max-w-xs text-sm md:text-base">
            {footerDescription || t('footer.description', 'Delivering the latest news with clarity and speed. Stay informed with breaking news, in-depth analysis, and exclusive stories.')}
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
        <div>
          <h3 className="text-white font-semibold mb-4">{t('footer.quickLinks')}</h3>
          <ul className="space-y-2">
            {/* Static Quick Links */}
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

        {/* Latest News */}
        <div>
          <h3 className="text-white font-semibold mb-4">{t('footer.latestNews')}</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li>{t('header.marquee.0')}</li>
            <li>{t('header.marquee.1')}</li>
            <li>{t('header.marquee.2')}</li>
            <li>{t('header.marquee.3')}</li>
            <li>{t('header.marquee.4')}</li>
          </ul>
        </div>

        {/* Contact & Subscribe */}
        <div>
          <h3 className="text-white font-semibold mb-4">{t('footer.contactUs')}</h3>
          <p className="text-gray-400 mb-4">
            {t('footer.email')}: {contactInfo.email || 'contact@newsbihar247.com'}<br/>
            {t('footer.phone')}: {contactInfo.phone || '+91 12345 67890'}<br/>
            {t('footer.address')}: {contactInfo.address || '123 News Street, Bihar, India'}
          </p>
          <form className="flex">
            <input
              type="email"
              placeholder={t('footer.subscribePlaceholder')}
              className="w-full px-3 py-2 rounded-l-md bg-gray-800 text-gray-300 placeholder-gray-500 focus:outline-none"
            />
            <button
              type="submit"
              className="bg-red-600 hover:bg-red-700 text-white px-4 rounded-r-md transition-colors duration-300"
            >
              {t('footer.subscribeButton')}
            </button>
          </form>
        </div>
      </div>

      {/* Powered by PigoPi */}
      <div className="container mx-auto px-6 mt-8 text-center text-sm text-gray-500">
        {t('footer.poweredBy')} <a href="https://pigo-pi.com/" target="_blank" rel="noopener noreferrer" className="hover:text-white underline">PigoPi</a>
      </div>
    </footer>
  );
};

export default Footer;
