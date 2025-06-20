import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';

const Footer = ({ footerLogoParts, footerDescription, footerContactInfo, footerQuickLinksCategories }) => {
  // Provide default empty objects to avoid undefined errors
  const logoParts = footerLogoParts || {};
  const contactInfo = footerContactInfo || {};
  const quickLinks = footerQuickLinksCategories || [];

  return (
    <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-gray-300 py-12 mt-12">
      <div className="container mx-auto px-20 flex justify-between gap-8 border-b border-gray-700 pb-8">
        {/* Logo and Description */}
        <div>
          <Link to="/" className="flex items-center space-x-2 group mb-4">

        {/* Navigation links */}
        <div>
          <h3 className="text-white font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            {(footerQuickLinksCategories || []).map((category, index) => (
              <li key={index}>
                <Link
                  to={category === "Home" ? "/" : `/${category.toLowerCase().replace(/\s+/g, '')}`}
                  className="hover:text-white transition-colors duration-300"
                >
                  {category}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Latest News */}
        <div>
          <h3 className="text-white font-semibold mb-4">Latest News</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li>🚨 Major event unfolds in the city as emergency services respond</li>
            <li>📈 Market hits record highs today amid economic optimism</li>
            <li>💡 New tech trends in 2025 set to transform industries</li>
            <li>🌞 Health experts share essential tips for summer wellness</li>
            <li>🏆 Local sports team wins championship after thrilling final match</li>
          </ul>
        </div>

        {/* Contact & Subscribe */}
        <div>
          <h3 className="text-white font-semibold mb-4">Contact Us</h3>
          <p className="text-gray-400 mb-4">
            Email: {footerContactInfo.email || 'contact@newsbihar247.com'}<br/>
            Phone: {footerContactInfo.phone || '+91 12345 67890'}<br/>
            Address: {footerContactInfo.address || '123 News Street, Bihar, India'}
          </p>
          <form className="flex">
            <input
              type="email"
              placeholder="Subscribe to newsletter"
              className="w-full px-3 py-2 rounded-l-md bg-gray-800 text-gray-300 placeholder-gray-500 focus:outline-none"
            />
            <button
              type="submit"
              className="bg-red-600 hover:bg-red-700 text-white px-4 rounded-r-md transition-colors duration-300"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Powered by PigoPi */}
      <div className="container mx-auto px-6 mt-8 text-center text-sm text-gray-500">
        Powered by <a href="https://pigopi.com" target="_blank" rel="noopener noreferrer" className="hover:text-white underline">PigoPi</a>
      </div>
    </footer>
  );
};

export default Footer;
