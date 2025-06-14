import React, { useState } from 'react';

const AdminDashboard = () => {
  const [token, setToken] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [siteTitle, setSiteTitle] = useState('');
  const [footerLinks, setFooterLinks] = useState([
    { name: 'Home', url: '/' },
    { name: 'About', url: '/aboutus' },
    { name: 'Contact', url: '/contact' }
  ]);
  const [message, setMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // New state for Home page sections
  const [heroBanner, setHeroBanner] = useState({
    title: 'Welcome to Our News Portal',
    subtitle: 'Stay updated with the latest news, articles, and videos from around the world',
    button1Text: 'Read Latest News',
    button2Text: 'Watch Videos'
  });

  const [latestNewsTitle, setLatestNewsTitle] = useState('Latest News');
  const [featuredArticlesTitle, setFeaturedArticlesTitle] = useState('Featured Articles');
  const [photoGalleryTitle, setPhotoGalleryTitle] = useState('Photo Gallery');
  const [popularTags, setPopularTags] = useState(['Politics', 'Technology', 'Sports', 'Health', 'Finance']);
  const [newsletterTitle, setNewsletterTitle] = useState('Newsletter');
  const [newsletterDescription, setNewsletterDescription] = useState('Stay updated with our latest news and articles');
  const [videoNewsTitle, setVideoNewsTitle] = useState('Video News');
  const [browseByCategoryTitle, setBrowseByCategoryTitle] = useState('Browse by Category');
  const [localNewsTitle, setLocalNewsTitle] = useState('Local News');

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const response = await fetch('http://localhost:5000/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      if (response.ok) {
        const data = await response.json();
        setToken(data.token);
        setIsLoggedIn(true);
        fetchCustomization(data.token);
      } else {
        setMessage('Invalid credentials');
      }
    } catch (error) {
      setMessage('Error connecting to server');
    }
  };

  const fetchCustomization = async (authToken) => {
    try {
      const response = await fetch('http://localhost:5000/api/admin/customization', {
        headers: { Authorization: 'Bearer ' + authToken }
      });
      if (response.ok) {
        const data = await response.json();
        setSiteTitle(data.siteTitle);
        setFooterLinks(data.footerLinks);
        // TODO: set other section states from data
      }
    } catch (error) {
      setMessage('Error fetching customization data');
    }
  };

  const handleSave = async () => {
    setMessage('');
    try {
      const response = await fetch('http://localhost:5000/api/admin/customization', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token
        },
        body: JSON.stringify({ 
          siteTitle, 
          footerLinks,
          heroBanner,
          latestNewsTitle,
          featuredArticlesTitle,
          photoGalleryTitle,
          popularTags,
          newsletterTitle,
          newsletterDescription,
          videoNewsTitle,
          browseByCategoryTitle,
          localNewsTitle
        })
      });
      if (response.ok) {
        setMessage('Customization saved successfully');
      } else {
        setMessage('Failed to save customization');
      }
    } catch (error) {
      setMessage('Error saving customization');
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow-md w-96">
          <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>
          {message && <p className="text-red-500 mb-4">{message}</p>}
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full mb-4 px-3 py-2 border rounded"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mb-6 px-3 py-2 border rounded"
            required
          />
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
            Login
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8 overflow-auto">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      {message && <p className="mb-4 text-green-600">{message}</p>}

      <div className="mb-6">
        <label className="block font-semibold mb-2">Site Title</label>
        <input
          type="text"
          value={siteTitle}
          onChange={(e) => setSiteTitle(e.target.value)}
          className="w-full px-3 py-2 border rounded"
        />
      </div>

      <div className="mb-6">
        <label className="block font-semibold mb-2">Hero Banner Title</label>
        <input
          type="text"
          value={heroBanner.title}
          onChange={(e) => setHeroBanner({ ...heroBanner, title: e.target.value })}
          className="w-full px-3 py-2 border rounded"
        />
      </div>

      <div className="mb-6">
        <label className="block font-semibold mb-2">Hero Banner Subtitle</label>
        <input
          type="text"
          value={heroBanner.subtitle}
          onChange={(e) => setHeroBanner({ ...heroBanner, subtitle: e.target.value })}
          className="w-full px-3 py-2 border rounded"
        />
      </div>

      <div className="mb-6 flex space-x-4">
        <div className="flex-1">
          <label className="block font-semibold mb-2">Hero Banner Button 1 Text</label>
          <input
            type="text"
            value={heroBanner.button1Text}
            onChange={(e) => setHeroBanner({ ...heroBanner, button1Text: e.target.value })}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="flex-1">
          <label className="block font-semibold mb-2">Hero Banner Button 2 Text</label>
          <input
            type="text"
            value={heroBanner.button2Text}
            onChange={(e) => setHeroBanner({ ...heroBanner, button2Text: e.target.value })}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
      </div>

      <div className="mb-6">
        <label className="block font-semibold mb-2">Latest News Section Title</label>
        <input
          type="text"
          value={latestNewsTitle}
