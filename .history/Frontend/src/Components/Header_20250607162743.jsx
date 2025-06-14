import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import EditableContent from './EditableContent';

const categories = [
  "Home",
  "Business",
  "Travel",
  "Politics",
  "Health",
  "Art",
  "About Us",
  "Contact"
];

const Header = () => {
  const { isAuthenticated, isAdmin, logout } = useAuth();

  const handleSave = async (newContent, field) => {
    try {
      const response = await fetch('/api/content/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          field,
          content: newContent
        })
      });

      if (!response.ok) {
        throw new Error('Failed to update content');
      }
    } catch (error) {
      console.error('Error updating content:', error);
      // Handle error appropriately
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      {/* Navigation */}
      <nav className="bg-gray-900 text-white">
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="bg-gradient-to-r from-red-600 to-yellow-500 text-white font-bold px-3 py-1 rounded-md text-lg shadow-md transform group-hover:scale-105 transition-transform duration-300">
              <EditableContent
                onSave={(content) => handleSave(content, 'logo')}
                initialContent="News"
              >
                News
              </EditableContent>
            </div>
            <div className="text-2xl md:text-3xl font-black text-gray-100 group-hover:text-red-500 transition-colors duration-300 tracking-tight">
              <EditableContent
                onSave={(content) => handleSave(content, 'title')}
                initialContent=""
              >
                Bihar <span className="text-blue-400">24/7</span>
              </EditableContent>
            </div>
          </Link>

          {/* Navigation links */}
          <ul className="hidden md:flex space-x-6 font-medium tracking-wide text-white">
            {categories.map((category, index) => (
              <li key={index}>
                <EditableContent
                  onSave={(content) => handleSave(content, category.toLowerCase().replace(/\s+/g, ''))}
                  initialContent={category}
                >
                  <Link
                    to={category === "Home" ? "/" : `/${category.toLowerCase().replace(/\s+/g, '')}`}
                    className="hover:text-blue-400 transition-colors duration-300"
                  >
                    {category}
                  </Link>
                </EditableContent>
              </li>
            ))}
          </ul>

          {/* Hamburger icon placeholder */}
          <div className="md:hidden">
            <button className="text-white hover:text-blue-400 focus:outline-none">
              {/* Placeholder for mobile menu */}
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

          {/* Auth buttons */}
          <div className="auth-buttons">
            {isAuthenticated ? (
              <>
                {isAdmin && (
                  <span className="admin-badge">Admin</span>
                )}
                <button onClick={logout}>Logout</button>
              </>
            ) : (
              <Link to="/login">Login</Link>
            )}
          </div>
        </div>
      </nav>

      {/* Live Ticker Marquee */}
      <div className="relative bg-white border-t border-b border-gray-200 py-2 overflow-hidden">
        <div className="container mx-auto px-6 flex items-center relative">
          
          {/* LIVE Badge */}
          <div className="flex-shrink-0 bg-white text-indigo-900 px-4 py-1 rounded-full font-bold mr-6 flex items-center border border-indigo-500 shadow-sm">
            <div className="w-2 h-2 bg-red-600 rounded-full mr-2 animate-ping"></div>
            LIVE
          </div>

          {/* Left & Right Fades */}
          <div className="absolute left-0 top-0 h-full w-12 bg-gradient-to-r from-white via-white to-transparent z-10" />
          <div className="absolute right-0 top-0 h-full w-12 bg-gradient-to-l from-white via-white to-transparent z-10" />

          {/* Marquee Scroll */}
          <div className="flex-1 whitespace-nowrap overflow-hidden">
            <div className="animate-marquee inline-flex space-x-16 min-w-full">
              <span className="text-black text-base font-medium">🚨 Major event unfolds in the city as emergency services respond</span>
              <span className="text-black text-base font-medium">📈 Market hits record highs today amid economic optimism</span>
              <span className="text-black text-base font-medium">💡 New tech trends in 2025 set to transform industries</span>
              <span className="text-black text-base font-medium">🌞 Health experts share essential tips for summer wellness</span>
              <span className="text-black text-base font-medium">🏆 Local sports team wins championship after thrilling final match</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tailwind Inline Animation */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </header>
  );
};

export default Header;
