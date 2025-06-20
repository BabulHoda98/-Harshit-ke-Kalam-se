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
