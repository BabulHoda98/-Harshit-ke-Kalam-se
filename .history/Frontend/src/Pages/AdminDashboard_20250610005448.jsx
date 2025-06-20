import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HeroBanner, LatestNews, FeaturedArticles, PhotoGallery, PopularTags, Newsletter, LocalNews, VideoNews } from '../Components/HomeSections';
import FooterLinks from '../Components/Footer';

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [token, setToken] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [siteTitle, setSiteTitle] = useState('');
  // Removed header and footer editing from admin side as per request
  // const [footerLinks, setFooterLinks] = useState([
  //   { name: 'Home', url: '/' },
  //   { name: 'About', url: '/aboutus' },
  //   { name: 'Contact', url: '/contact' }
  // ]);
  // const [navbarCategories, setNavbarCategories] = useState(['Home', 'About', 'Contact']);
  // const [navbarLogoParts, setNavbarLogoParts] = useState({ part1: 'News', part2: 'Bihar', part3: '24/7' });
  // const [footerLogoParts, setFooterLogoParts] = useState({ part1: 'News', part2: 'Bihar', part3: '24/7' });
  // const [footerDescription, setFooterDescription] = useState('Delivering the latest news with clarity and speed. Stay informed with breaking news, in-depth analysis, and exclusive stories.');
  // const [footerContactInfo, setFooterContactInfo] = useState({ email: 'contact@newsbihar247.com', phone: '+91 12345 67890', address: '123 News Street, Bihar, India' });
  // const [footerQuickLinksCategories, setFooterQuickLinksCategories] = useState(['Home', 'About', 'Contact', 'Advertise']);
  const [message, setMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Fix: define isNavOpen state for navigation menu toggle
  const [isNavOpen, setIsNavOpen] = useState(false);

  // New state for Home page sections
  const [heroBanner, setHeroBanner] = useState({
    title: 'Welcome to Our News Portal',
    subtitle: 'Stay updated with the latest news, articles, and videos from around the world',
    button1Text: 'Read Latest News',
    button2Text: 'Watch Videos',
    images: [
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrjp5jjw8oTsE0TUtUJuo0ahese0svE0JV2Q&s',
      'https://images.indianexpress.com/2025/06/lammy-modi-2col.jpg?w=430',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKy9w_Y_EZGXUbQSxvuUmXnenYo7K2miY3Wg&s',
      'https://s.france24.com/media/display/e6279b3c-db08-11ee-b7f5-005056bf30b7/w:1280/p:16x9/news_en_1920x1080.jpg'
    ]
  });

  const [latestNewsTitle, setLatestNewsTitle] = useState('Latest News');
  const [latestNewsArticles, setLatestNewsArticles] = useState([]);

  const [featuredArticlesTitle, setFeaturedArticlesTitle] = useState('Featured Articles');
  const [featuredArticles, setFeaturedArticles] = useState([]);

  const [photoGalleryTitle, setPhotoGalleryTitle] = useState('Photo Gallery');
  const [galleryPhotos, setGalleryPhotos] = useState([]);

  const [popularTags, setPopularTags] = useState(['Politics', 'Technology', 'Sports', 'Health', 'Finance']);
  const [newsletterTitle, setNewsletterTitle] = useState('Newsletter');
  const [newsletterDescription, setNewsletterDescription] = useState('Stay updated with our latest news and articles');
  const [videoNewsTitle, setVideoNewsTitle] = useState('Video News');
  const [videos, setVideos] = useState([]);

  // Removed browseByCategoryTitle and categories as per request
  // const [browseByCategoryTitle, setBrowseByCategoryTitle] = useState('Browse by Category');
  // const [categories, setCategories] = useState([]);

  const [localNewsTitle, setLocalNewsTitle] = useState('Local News');
  const [localNewsArticles, setLocalNewsArticles] = useState([]);

  // New state for marquee items
  const [marqueeItems, setMarqueeItems] = useState([]);

  // Login handler
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
        console.log('Login successful, token:', data.token);
        setToken(data.token);
        localStorage.setItem('token', data.token);
        setIsLoggedIn(true);
        fetchCustomization(data.token);
      } else {
        setMessage('Invalid credentials');
      }

  // Save customization data with popup and redirect
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
          latestNewsArticles,
          featuredArticlesTitle,
          featuredArticles,
          photoGalleryTitle,
          galleryPhotos,
          popularTags,
          newsletterTitle,
          newsletterDescription,
          videoNewsTitle,
          videos,
        // browseByCategoryTitle,
        // categories,
          localNewsTitle,
          localNewsArticles,
          marqueeItems,
          navbarCategories,
          navbarLogoParts,
          footerLogoParts,
          footerDescription,
          footerContactInfo,
          footerQuickLinksCategories
        })
      });
      const data = await response.json();
      if (response.ok) {
        alert(`Changes saved successfully! New version: ${data.version}`);
        navigate('/');
        window.location.reload();
      } else {
        setMessage(data.message || 'Failed to save customization');
      }
    } catch (error) {
      setMessage('Error saving customization: ' + error.message);
      console.error('Error saving customization:', error);
    }
  };

  // Handlers for CRUD operations on heroBanner images
  const handleAddHeroBannerImage = () => {
    setHeroBanner({
      ...heroBanner,
      images: [...(heroBanner.images || []), '']
    });
  };

  const handleUpdateHeroBannerImage = (index, value) => {
    const updatedImages = [...(heroBanner.images || [])];
    updatedImages[index] = value;
    setHeroBanner({
      ...heroBanner,
      images: updatedImages
    });
  };

  const handleRemoveHeroBannerImage = (index) => {
    const updatedImages = (heroBanner.images || []).filter((_, i) => i !== index);
    setHeroBanner({
      ...heroBanner,
      images: updatedImages
    });
  };

  // Handlers for CRUD operations on latestNewsArticles
  const handleAddLatestNewsArticle = () => {
    setLatestNewsArticles([...latestNewsArticles, {
      image: '',
      category: '',
      title: '',
      description: '',
      author: '',
      date: new Date().toLocaleDateString()
    }]);
  };

  const handleUpdateLatestNewsArticle = (index, field, value) => {
    const updatedArticles = [...latestNewsArticles];
    updatedArticles[index][field] = value;
    setLatestNewsArticles(updatedArticles);
  };

  const handleRemoveLatestNewsArticle = (index) => {
    const updatedArticles = latestNewsArticles.filter((_, i) => i !== index);
    setLatestNewsArticles(updatedArticles);
  };

  // Handlers for CRUD operations on featuredArticles
  const handleAddFeaturedArticle = () => {
    setFeaturedArticles([...featuredArticles, {
      image: '',
      title: '',
      description: '',
      date: '',
      readTime: ''
    }]);
  };

  const handleUpdateFeaturedArticle = (index, field, value) => {
    const updatedArticles = [...featuredArticles];
    updatedArticles[index][field] = value;
    setFeaturedArticles(updatedArticles);
  };

  const handleRemoveFeaturedArticle = (index) => {
    const updatedArticles = featuredArticles.filter((_, i) => i !== index);
    setFeaturedArticles(updatedArticles);
  };

  // Handlers for CRUD operations on galleryPhotos
  const handleAddGalleryPhoto = () => {
    setGalleryPhotos([...galleryPhotos, {
      url: '',
      alt: ''
    }]);
  };

  const handleUpdateGalleryPhoto = (index, field, value) => {
    const updatedPhotos = [...galleryPhotos];
    updatedPhotos[index][field] = value;
    setGalleryPhotos(updatedPhotos);
  };

  const handleRemoveGalleryPhoto = (index) => {
    const updatedPhotos = galleryPhotos.filter((_, i) => i !== index);
    setGalleryPhotos(updatedPhotos);
  };

  // Handlers for CRUD operations on videos
  const handleAddVideo = () => {
    setVideos([...videos, '']);
  };

  const handleUpdateVideo = (index, value) => {
    const updatedVideos = [...videos];
    updatedVideos[index] = value;
    setVideos(updatedVideos);
  };

  const handleRemoveVideo = (index) => {
    const updatedVideos = videos.filter((_, i) => i !== index);
    setVideos(updatedVideos);
  };

  // Handlers for CRUD operations on categories
  const handleAddCategory = () => {
    setCategories([...categories, { name: '', icon: null, color: '' }]);
  };

  const handleUpdateCategory = (index, field, value) => {
    const updatedCategories = [...categories];
    updatedCategories[index][field] = value;
    setCategories(updatedCategories);
  };

  const handleRemoveCategory = (index) => {
    const updatedCategories = categories.filter((_, i) => i !== index);
    setCategories(updatedCategories);
  };

  // Handlers for CRUD operations on localNewsArticles
  const handleAddLocalNewsArticle = () => {
    setLocalNewsArticles([...localNewsArticles, {
      image: '',
      title: '',
      description: '',
      author: '',
      date: ''
    }]);
  };

  const handleUpdateLocalNewsArticle = (index, field, value) => {
    const updatedArticles = [...localNewsArticles];
    updatedArticles[index][field] = value;
    setLocalNewsArticles(updatedArticles);
  };

  const handleRemoveLocalNewsArticle = (index) => {
    const updatedArticles = localNewsArticles.filter((_, i) => i !== index);
    setLocalNewsArticles(updatedArticles);
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
    <div className="min-h-screen bg-gray-100 p-8 overflow-auto space-y-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      {message && <p className="mb-4 text-green-600">{message}</p>}

      {/* Navigation Menu Section */}
      <section className="bg-white p-6 rounded shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Navigation Menu</h2>
        <button
          onClick={() => setIsNavOpen(!isNavOpen)}
          className="mb-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          {isNavOpen ? 'Close Menu' : 'Open Menu'}
        </button>
        {isNavOpen && (
          <>
            <div className="mb-4">
              <label className="block font-semibold mb-1">Navbar Logo Part 1</label>
              <input
                type="text"
                value={navbarLogoParts.part1}
                onChange={(e) => setNavbarLogoParts({ ...navbarLogoParts, part1: e.target.value })}
                className="w-full px-3 py-2 border rounded mb-2"
              />
              <label className="block font-semibold mb-1">Navbar Logo Part 2</label>
              <input
                type="text"
                value={navbarLogoParts.part2}
                onChange={(e) => setNavbarLogoParts({ ...navbarLogoParts, part2: e.target.value })}
                className="w-full px-3 py-2 border rounded mb-2"
              />
              <label className="block font-semibold mb-1">Navbar Logo Part 3</label>
              <input
                type="text"
                value={navbarLogoParts.part3}
                onChange={(e) => setNavbarLogoParts({ ...navbarLogoParts, part3: e.target.value })}
                className="w-full px-3 py-2 border rounded mb-2"
              />
            </div>
            <div className="mb-4">
              <label className="block font-semibold mb-1">Navbar Categories (comma separated)</label>
              <input
                type="text"
                value={navbarCategories.join(', ')}
                onChange={(e) => setNavbarCategories(e.target.value.split(',').map(cat => cat.trim()))}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <ul className="space-y-2">
              {footerLinks.map((link, index) => (
                <li key={index} className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={link.name}
                    onChange={(e) => {
                      const newLinks = [...footerLinks];
                      newLinks[index].name = e.target.value;
                      setFooterLinks(newLinks);
                    }}
                    className="flex-1 px-3 py-2 border rounded"
                  />
                  <input
                    type="text"
                    value={link.url}
                    onChange={(e) => {
                      const newLinks = [...footerLinks];
                      newLinks[index].url = e.target.value;
                      setFooterLinks(newLinks);
                    }}
                    className="flex-1 px-3 py-2 border rounded"
                  />
                  <button
                    onClick={() => {
                      const newLinks = footerLinks.filter((_, i) => i !== index);
                      setFooterLinks(newLinks);
                    }}
                    type="button"
                    className="bg-red-600 text-white px-3 rounded hover:bg-red-700 transition"
                  >
                    Remove
                  </button>
                </li>
              ))}
              <button
                onClick={() => setFooterLinks([...footerLinks, { name: '', url: '' }])}
                type="button"
                className="mt-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
              >
                Add Link
              </button>
            </ul>
          </>
        )}
      </section>

      {/* Hero Banner Section */}
      <section className="bg-white p-6 rounded shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Hero Banner</h2>
        <label className="block font-semibold mb-1">Title</label>
        <input
          type="text"
          value={heroBanner.title}
          onChange={(e) => setHeroBanner({ ...heroBanner, title: e.target.value })}
          className="w-full px-3 py-2 border rounded mb-3"
        />
        <label className="block font-semibold mb-1">Subtitle</label>
        <input
          type="text"
          value={heroBanner.subtitle}
          onChange={(e) => setHeroBanner({ ...heroBanner, subtitle: e.target.value })}
          className="w-full px-3 py-2 border rounded mb-3"
        />
        <div className="mb-4">
          <label className="block font-semibold mb-2">Images</label>
          {heroBanner.images && heroBanner.images.length > 0 ? heroBanner.images.map((image, index) => (
            <div key={index} className="flex items-center space-x-2 mb-2">
              <input
                type="text"
                value={image}
                onChange={(e) => handleUpdateHeroBannerImage(index, e.target.value)}
                className="flex-1 px-3 py-2 border rounded"
                placeholder="Image URL"
              />
              <button
                onClick={() => handleRemoveHeroBannerImage(index)}
                type="button"
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
              >
                Remove
              </button>
            </div>
          )) : (
            <p>No images added.</p>
          )}
          <button
            onClick={handleAddHeroBannerImage}
            type="button"
            className="mt-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
          >
            Add Image
          </button>
        </div>
        <div className="flex space-x-4">
          <div className="flex-1">
            <label className="block font-semibold mb-1">Button 1 Text</label>
            <input
              type="text"
              value={heroBanner.button1Text}
              onChange={(e) => setHeroBanner({ ...heroBanner, button1Text: e.target.value })}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="flex-1">
            <label className="block font-semibold mb-1">Button 2 Text</label>
            <input
              type="text"
              value={heroBanner.button2Text}
              onChange={(e) => setHeroBanner({ ...heroBanner, button2Text: e.target.value })}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
        </div>
      </section>

      {/* Latest News Section */}
      <section className="bg-white p-6 rounded shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Latest News</h2>
        <label className="block font-semibold mb-1">Section Title</label>
        <input
          type="text"
          value={latestNewsTitle}
          onChange={(e) => setLatestNewsTitle(e.target.value)}
          className="w-full px-3 py-2 border rounded mb-3"
        />
        <div>
          {latestNewsArticles.map((article, index) => (
            <div key={index} className="mb-6 border p-4 rounded shadow-sm bg-gray-50">
              <label className="block font-semibold mb-1">Image URL</label>
              <input
                type="text"
                value={article.image}
                onChange={(e) => handleUpdateLatestNewsArticle(index, 'image', e.target.value)}
                className="w-full px-3 py-2 border rounded mb-2"
              />
              <label className="block font-semibold mb-1">Category</label>
              <input
                type="text"
                value={article.category}
                onChange={(e) => handleUpdateLatestNewsArticle(index, 'category', e.target.value)}
                className="w-full px-3 py-2 border rounded mb-2"
              />
              <label className="block font-semibold mb-1">Title</label>
              <input
                type="text"
                value={article.title}
                onChange={(e) => handleUpdateLatestNewsArticle(index, 'title', e.target.value)}
                className="w-full px-3 py-2 border rounded mb-2"
              />
              <label className="block font-semibold mb-1">Description</label>
              <textarea
                value={article.description}
                onChange={(e) => handleUpdateLatestNewsArticle(index, 'description', e.target.value)}
                className="w-full px-3 py-2 border rounded mb-2"
                rows={3}
              />
              <label className="block font-semibold mb-1">Author</label>
              <input
                type="text"
                value={article.author}
                onChange={(e) => handleUpdateLatestNewsArticle(index, 'author', e.target.value)}
                className="w-full px-3 py-2 border rounded mb-2"
              />
              <label className="block font-semibold mb-1">Date</label>
              <input
                type="text"
                value={article.date}
                onChange={(e) => handleUpdateLatestNewsArticle(index, 'date', e.target.value)}
                className="w-full px-3 py-2 border rounded mb-2"
              />
              <button
                onClick={() => handleRemoveLatestNewsArticle(index)}
                type="button"
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
              >
                Remove Article
              </button>
            </div>
          ))}
          <button
            onClick={handleAddLatestNewsArticle}
            type="button"
            className="mt-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
          >
            Add Article
          </button>
        </div>
      </section>

      {/* Featured Articles Section */}
      <section className="bg-white p-6 rounded shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Featured Articles</h2>
        <label className="block font-semibold mb-1">Section Title</label>
        <input
          type="text"
          value={featuredArticlesTitle}
          onChange={(e) => setFeaturedArticlesTitle(e.target.value)}
          className="w-full px-3 py-2 border rounded mb-3"
        />
        <div>
          {featuredArticles.map((article, index) => (
            <div key={index} className="mb-6 border p-4 rounded shadow-sm bg-gray-50">
              <label className="block font-semibold mb-1">Image URL</label>
              <input
                type="text"
                value={article.image}
                onChange={(e) => handleUpdateFeaturedArticle(index, 'image', e.target.value)}
                className="w-full px-3 py-2 border rounded mb-2"
              />
              <label className="block font-semibold mb-1">Title</label>
              <input
                type="text"
                value={article.title}
                onChange={(e) => handleUpdateFeaturedArticle(index, 'title', e.target.value)}
                className="w-full px-3 py-2 border rounded mb-2"
              />
              <label className="block font-semibold mb-1">Description</label>
              <textarea
                value={article.description}
                onChange={(e) => handleUpdateFeaturedArticle(index, 'description', e.target.value)}
                className="w-full px-3 py-2 border rounded mb-2"
                rows={3}
              />
              <label className="block font-semibold mb-1">Date</label>
              <input
                type="text"
                value={article.date}
                onChange={(e) => handleUpdateFeaturedArticle(index, 'date', e.target.value)}
                className="w-full px-3 py-2 border rounded mb-2"
              />
              <label className="block font-semibold mb-1">Read Time</label>
              <input
                type="text"
                value={article.readTime}
                onChange={(e) => handleUpdateFeaturedArticle(index, 'readTime', e.target.value)}
                className="w-full px-3 py-2 border rounded mb-2"
              />
              <button
                onClick={() => handleRemoveFeaturedArticle(index)}
                type="button"
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
              >
                Remove Article
              </button>
            </div>
          ))}
          <button
            onClick={handleAddFeaturedArticle}
            type="button"
            className="mt-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
          >
            Add Article
          </button>
        </div>
      </section>

      {/* Photo Gallery Section */}
      <section className="bg-white p-6 rounded shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Photo Gallery</h2>
        <label className="block font-semibold mb-1">Section Title</label>
        <input
          type="text"
          value={photoGalleryTitle}
          onChange={(e) => setPhotoGalleryTitle(e.target.value)}
          className="w-full px-3 py-2 border rounded mb-3"
        />
        <div>
          {galleryPhotos.map((photo, index) => (
            <div key={index} className="mb-6 border p-4 rounded shadow-sm bg-gray-50">
              <label className="block font-semibold mb-1">Photo URL</label>
              <input
                type="text"
                value={photo.url}
                onChange={(e) => handleUpdateGalleryPhoto(index, 'url', e.target.value)}
                className="w-full px-3 py-2 border rounded mb-2"
              />
              <label className="block font-semibold mb-1">Alt Text</label>
              <input
                type="text"
                value={photo.alt}
                onChange={(e) => handleUpdateGalleryPhoto(index, 'alt', e.target.value)}
                className="w-full px-3 py-2 border rounded mb-2"
              />
              <button
                onClick={() => handleRemoveGalleryPhoto(index)}
                type="button"
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
              >
                Remove Photo
              </button>
            </div>
          ))}
          <button
            onClick={handleAddGalleryPhoto}
            type="button"
            className="mt-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
          >
            Add Photo
          </button>
        </div>
      </section>

      {/* Popular Tags Section */}
      <section className="bg-white p-6 rounded shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Popular Tags</h2>
        <label className="block font-semibold mb-1">Tags (comma separated)</label>
        <input
          type="text"
          value={popularTags.join(', ')}
          onChange={(e) => setPopularTags(e.target.value.split(',').map(tag => tag.trim()))}
          className="w-full px-3 py-2 border rounded mb-3"
        />
      </section>

      {/* Newsletter Section */}
      <section className="bg-white p-6 rounded shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Newsletter</h2>
        <label className="block font-semibold mb-1">Title</label>
        <input
          type="text"
          value={newsletterTitle}
          onChange={(e) => setNewsletterTitle(e.target.value)}
          className="w-full px-3 py-2 border rounded mb-3"
        />
        <label className="block font-semibold mb-1">Description</label>
        <input
          type="text"
          value={newsletterDescription}
          onChange={(e) => setNewsletterDescription(e.target.value)}
          className="w-full px-3 py-2 border rounded"
        />
      </section>

      {/* Video News Section */}
      <section className="bg-white p-6 rounded shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Video News</h2>
        <label className="block font-semibold mb-1">Section Title</label>
        <input
          type="text"
          value={videoNewsTitle}
          onChange={(e) => setVideoNewsTitle(e.target.value)}
          className="w-full px-3 py-2 border rounded"
        />
        <div>
          {videos.map((video, index) => (
            <div key={index} className="mb-6 border p-4 rounded shadow-sm bg-gray-50">
              <label className="block font-semibold mb-1">Video URL</label>
              <input
                type="text"
                value={video}
                onChange={(e) => handleUpdateVideo(index, e.target.value)}
                className="w-full px-3 py-2 border rounded mb-2"
              />
              <button
                onClick={() => handleRemoveVideo(index)}
                type="button"
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
              >
                Remove Video
              </button>
            </div>
          ))}
          <button
            onClick={handleAddVideo}
            type="button"
            className="mt-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
          >
            Add Video
          </button>
        </div>
      </section>
      
      {/* Local News Section */}
      <section className="bg-white p-6 rounded shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Local News</h2>
        <label className="block font-semibold mb-1">Section Title</label>
        <input
          type="text"
          value={localNewsTitle}
          onChange={(e) => setLocalNewsTitle(e.target.value)}
          className="w-full px-3 py-2 border rounded"
        />
        <div>
          {localNewsArticles.map((article, index) => (
            <div key={index} className="mb-6 border p-4 rounded shadow-sm bg-gray-50">
              <label className="block font-semibold mb-1">Image URL</label>
              <input
                type="text"
                value={article.image}
                onChange={(e) => handleUpdateLocalNewsArticle(index, 'image', e.target.value)}
                className="w-full px-3 py-2 border rounded mb-2"
              />
              <label className="block font-semibold mb-1">Title</label>
              <input
                type="text"
                value={article.title}
                onChange={(e) => handleUpdateLocalNewsArticle(index, 'title', e.target.value)}
                className="w-full px-3 py-2 border rounded mb-2"
              />
              <label className="block font-semibold mb-1">Description</label>
              <textarea
                value={article.description}
                onChange={(e) => handleUpdateLocalNewsArticle(index, 'description', e.target.value)}
                className="w-full px-3 py-2 border rounded mb-2"
                rows={3}
              />
              <label className="block font-semibold mb-1">Author</label>
              <input
                type="text"
                value={article.author}
                onChange={(e) => handleUpdateLocalNewsArticle(index, 'author', e.target.value)}
                className="w-full px-3 py-2 border rounded mb-2"
              />
              <label className="block font-semibold mb-1">Date</label>
              <input
                type="text"
                value={article.date}
                onChange={(e) => handleUpdateLocalNewsArticle(index, 'date', e.target.value)}
                className="w-full px-3 py-2 border rounded mb-2"
              />
              <button
                onClick={() => handleRemoveLocalNewsArticle(index)}
                type="button"
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
              >
                Remove Article
              </button>
            </div>
          ))}
          <button
            onClick={handleAddLocalNewsArticle}
            type="button"
            className="mt-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
          >
            Add Article
          </button>
        </div>
      </section>

      {/* Footer Links Section */}
      <section className="bg-white p-6 rounded shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Footer Links</h2>
        <div className="mb-4">
          <label className="block font-semibold mb-1">Footer Logo Part 1</label>
          <input
            type="text"
            value={footerLogoParts.part1}
            onChange={(e) => setFooterLogoParts({ ...footerLogoParts, part1: e.target.value })}
            className="w-full px-3 py-2 border rounded mb-2"
          />
          <label className="block font-semibold mb-1">Footer Logo Part 2</label>
          <input
            type="text"
            value={footerLogoParts.part2}
            onChange={(e) => setFooterLogoParts({ ...footerLogoParts, part2: e.target.value })}
            className="w-full px-3 py-2 border rounded mb-2"
          />
          <label className="block font-semibold mb-1">Footer Logo Part 3</label>
          <input
            type="text"
            value={footerLogoParts.part3}
            onChange={(e) => setFooterLogoParts({ ...footerLogoParts, part3: e.target.value })}
            className="w-full px-3 py-2 border rounded mb-2"
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-1">Footer Description</label>
          <textarea
            value={footerDescription}
            onChange={(e) => setFooterDescription(e.target.value)}
            className="w-full px-3 py-2 border rounded mb-2"
            rows={3}
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-1">Footer Contact Email</label>
          <input
            type="email"
            value={footerContactInfo.email}
            onChange={(e) => setFooterContactInfo({ ...footerContactInfo, email: e.target.value })}
            className="w-full px-3 py-2 border rounded mb-2"
          />
          <label className="block font-semibold mb-1">Footer Contact Phone</label>
          <input
            type="text"
            value={footerContactInfo.phone}
            onChange={(e) => setFooterContactInfo({ ...footerContactInfo, phone: e.target.value })}
            className="w-full px-3 py-2 border rounded mb-2"
          />
          <label className="block font-semibold mb-1">Footer Contact Address</label>
          <input
            type="text"
            value={footerContactInfo.address}
            onChange={(e) => setFooterContactInfo({ ...footerContactInfo, address: e.target.value })}
            className="w-full px-3 py-2 border rounded mb-2"
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-1">Footer Quick Links Categories (comma separated)</label>
          <input
            type="text"
            value={footerQuickLinksCategories.join(', ')}
            onChange={(e) => setFooterQuickLinksCategories(e.target.value.split(',').map(cat => cat.trim()))}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
      </section>

      {/* Marquee Items Section */}
      <section className="bg-white p-6 rounded shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Marquee Items</h2>
        {marqueeItems.length > 0 ? marqueeItems.map((item, index) => (
          <div key={index} className="flex items-center space-x-2 mb-2">
            <input
              type="text"
              value={item}
              onChange={(e) => {
                const newItems = [...marqueeItems];
                newItems[index] = e.target.value;
                setMarqueeItems(newItems);
              }}
              className="flex-1 px-3 py-2 border rounded"
              placeholder="Marquee item text"
            />
            <button
              onClick={() => {
                const newItems = marqueeItems.filter((_, i) => i !== index);
                setMarqueeItems(newItems);
              }}
              type="button"
              className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
            >
              Remove
            </button>
          </div>
        )) : (
          <p>No marquee items added.</p>
        )}
        <button
          onClick={() => setMarqueeItems([...marqueeItems, ''])}
          type="button"
          className="mt-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          Add Marquee Item
        </button>
      </section>

      <button
        onClick={handleSave}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
      >
        Save Changes
      </button>
    </div>
  );
};

export default AdminDashboard;