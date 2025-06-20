import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ navbarCategories, navbarLogoParts, marqueeItems }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md notranslate">
      {/* Navigation */}
      <nav className="bg-gradient-to-r from-blue-900 to-red-700 text-white">
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

          {/* Dynamic Category Links */}

          <div className="hidden md:flex space-x-6 font-medium tracking-wide text-white ml-8">
          <Link to="/">
            Home
          </Link>
            {["Politics", "Business", "Education"].map((category, index) => (
              <Link
                key={index}
                to={`/category/${category.toLowerCase()}`}
                className="hover:text-blue-400 transition-colors duration-300 capitalize"
              >
                {category}
              </Link>
            ))}
            <Link to="/about">
              About
            </Link>
            <Link to="/contact" >
              Contact
            </Link>
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
        <div className="container mx-auto px-10 flex items-center relative ">

          {/* LIVE Badge */}
          <div className="flex-shrink-0 bg-gradient-to-r from-blue-500 to-red-500 text-indigo-900 px-4 py-1 rounded-full font-bold mr-6 flex items-center border border-indigo-500 shadow-sm">
            <div className="w-2 h-2 bg-red-600 rounded-full mr-2 animate-ping"></div>
            LIVE
          </div>

          {/* Gradient Fades */}
          <div className="absolute left-0 top-0 h-full w-12 bg-gradient-to-r from-white via-white to-transparent z-10" />
          <div className="absolute right-0 top-0 h-full w-12 bg-gradient-to-l from-white via-white to-transparent z-10" />

          {/* Marquee */}
          {/* <div className="flex-1 whitespace-nowrap overflow-hidden border border-red-500 bg-gray-200 rounded-2xl p-1.5">
            <div className="animate-marquee inline-flex space-x-16 min-w-full">
              {marqueeItems && marqueeItems.length > 0 ? (
                marqueeItems.map((item, index) => (
                  <span key={index} className="text-black text-base font-medium">{item}</span>
                ))
              ) : (
                <>
                  <span className="text-black text-base font-medium ">Welcome to Harshit ke Kalam se Welcome to Harshit ke Kalam se Welcome to Harshit ke Kalam se</span>
                </>
              )}
            </div>
          </div> */}
          <div className="flex-1 whitespace-nowrap overflow-hidden bg-gray-200 rounded-2xl p-1.5">
  <div className="animate-marquee inline-flex space-x-16">
    {marqueeItems && marqueeItems.length > 0 ? (
      // Duplicate marqueeItems for seamless loop
      [...marqueeItems, ...marqueeItems].map((item, index) => (
        <span key={index} className="text-black text-base font-medium">
          {item}
        </span>
      ))
    ) : (
      <>
        {/* Duplicate fallback message */}
        <span className="text-black text-base font-medium">
          Welcome to Harshit ke Kalam se • Welcome to Harshit ke Kalam se • Welcome to Harshit ke Kalam se
        </span>
        <span className="text-black text-base font-medium">
          Welcome to Harshit ke Kalam se • Welcome to Harshit ke Kalam se • Welcome to Harshit ke Kalam se
        </span>
      </>
    )}
  </div>
</div>

        </div>
      </div>

      {/* Animation Styles */}
      <style>{`
        @keyframes marquee {
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(-100%);
  }
}

.animate-marquee {
  display: inline-block;
  white-space: nowrap;
  animation: marquee 15s linear infinite;
}

      `}</style>
    </header>
  );
};

export default Header;
