import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';

import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';

const Footer = ({ footerLogoParts, footerDescription, footerContactInfo, footerQuickLinksCategories }) => {
  return (
    <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-gray-300 py-12 mt-12">
      <div className="container mx-auto px-20 flex justify-between gap-8 border-b border-gray-700 pb-8">
        {/* Logo and Description */}
        <div>
          <Link to="/" className="flex items-center space-x-2 group mb-4">
