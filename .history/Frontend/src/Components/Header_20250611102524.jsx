import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ navbarCategories, navbarLogoParts, marqueeItems }) => {
  const [isOpen, setIsOpen] = React.useState(false);

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
