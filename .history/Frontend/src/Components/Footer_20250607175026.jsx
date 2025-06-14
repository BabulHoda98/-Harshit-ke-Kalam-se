import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <h2 className="text-xl font-bold text-white">NewsBihar</h2>
          <p className="text-sm mt-1">Delivering the latest news with clarity and speed.</p>
        </div>
        <div className="flex space-x-6">
          <a href="/" className="hover:text-white transition-colors duration-300">Home</a>
          <a href="/aboutus" className="hover:text-white transition-colors duration-300">About Us</a>
          <a href="/contact" className="hover:text-white transition-colors duration-300">Contact</a>
        </div>
        <div className="mt-4 md:mt-0 text-sm">
          &copy; {new Date().getFullYear()} NewsBihar. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
