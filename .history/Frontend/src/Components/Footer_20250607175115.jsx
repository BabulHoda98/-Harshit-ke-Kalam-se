import React from 'react';
import { Link } from 'react-router-dom';

const categories = [
  "Home",
  "About",
  "Contact"
];

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8 mt-12">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center border-b border-gray-700 pb-6">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 group mb-4 md:mb-0">
          <div className="bg-gradient-to-r from-red-600 to-yellow-500 text-white font-bold px-3 py-1 rounded-md text-lg shadow-md transform group-hover:scale-105 transition-transform duration-300">
            News
          </div>
          <div className="text-2xl md:text-3xl font-black text-gray-100 group-hover:text-red-500 transition-colors duration-300 tracking-tight">
            Bihar <span className="text-blue-400">24/7</span>
          </div>
        </Link>

        {/* Navigation links */}
        <ul className="flex space-x-6 font-medium tracking-wide text-gray-300">
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

      {/* Powered by PigoPi */}
      <div className="container mx-auto px-6 mt-6 text-center text-sm text-gray-500">
        Powered by <a href="https://pigopi.com" target="_blank" rel="noopener noreferrer" className="hover:text-white underline">PigoPi</a>
      </div>
    </footer>
  );
};

export default Footer;
