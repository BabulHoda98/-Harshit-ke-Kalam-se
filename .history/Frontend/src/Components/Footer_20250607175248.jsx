import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';

const categories = [
  "Home",
  "About",
  "Contact",
  "Privacy Policy",
  "Terms of Service",
  "Advertise"
];

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-gray-300 py-12 mt-12">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8 border-b border-gray-700 pb-8">
        {/* Logo and Description */}
        <div>
          <Link to="/" className="flex items-center space-x-2 group mb-4">
            <div className="bg-gradient-to-r from-red-600 to-yellow-500 text-white font-bold px-4 py-2 rounded-md text-xl shadow-md transform group-hover:scale-110 transition-transform duration-300">
              News
            </div>
            <div className="text-3xl font-black text-gray-100 group-hover:text-red-500 transition-colors duration-300 tracking-tight">
              Bihar <span className="text-blue-400">24/7</span>
            </div>
          </Link>
          <p className="text-gray-400 max-w-xs">
            Delivering the latest news with clarity and speed. Stay informed with breaking news, in-depth analysis, and exclusive stories.
          </p>
          <div className="flex space-x-4 mt-6 text-gray-400">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors duration-300">
              <FaFacebookF size={20} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors duration-300">
              <FaTwitter size={20} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500 transition-colors duration-300">
              <FaInstagram size={20} />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-red-600 transition-colors duration-300">
              <FaYoutube size={20} />
            </a>
          </div>
        </div>

        {/* Navigation links */}
        <div>
          <h3 className="text-white font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            {categories.map((category, index) => (
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
