import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [message, setMessage] = useState('');
  const [isNavOpen, setIsNavOpen] = useState(false);

  // State for Home page sections - matching Home.jsx structure
  const [heroBanner, setHeroBanner] = useState({
    title: 'हर्षित के कलम से में आपका स्वागत है',
    subtitle: 'बिहार और झारखंड की ताज़ा खबरें, राजनीति, अपराध और करियर समाचार',
    button1Text: 'ताज़ा खबरें पढ़ें',
    button2Text: 'वीडियो देखें',
    images: [
      'https://navbharattimes.indiatimes.com/thumb/113599197/bihar-politics-sound-power-change-113599197.jpg?imgsize=62408&width=1600&height=900&resizemode=75'
    ]
  });

  const [latestNewsTitle, setLatestNewsTitle] = useState('Latest News');
  const [latestNewsArticles, setLatestNewsArticles] = useState([
    {
      title: 'बिहार: मुख्यमंत्री ने लॉन्च की नई योजना',
      image: 'https://images.indianexpress.com/2024/01/bihar-1600.jpg',
      link: '/news/bihar-new-scheme',
      category: 'बिहार',
      description: 'बिहार में नई योजना लॉन्च',
      author: 'हर्षित',
      date: new Date().toISOString(),
      location: 'पटना',
      time: '2 घंटे पहले',
      views: 1500
    },
    {
      title: 'झारखंड: खनन घोटाले में 3 अधिकारी गिरफ्तार',
      image: 'https://swarajya.gumlet.io/swarajya/2024-04/40a53b4d-7dc8-4017-8d35-fd3fdd3e08f6/10_04_3.png?w=1200&h=675&auto=format%2Ccompress&fit=max&enlarge=true',
      link: '/news/jharkhand-mining-scam',
      category: 'झारखंड',
      description: 'खनन घोटाले में गिरफ्तारी',
      author: 'हर्षित',
      date: new Date().toISOString(),
      location: 'रांची',
      time: '5 घंटे पहले',
      views: 2200
    },
    {
      title: 'पटना मेट्रो में नई सुविधा',
      image: 'https://thedailyguardian.com/wp-content/uploads/2025/01/political-landscape-in-Bihar.webp',
      link: '/news/patna-metro',
      category: 'विकास',
      description: 'मेट्रो में नई सुविधा',
      author: 'हर्षित',
      date: new Date().toISOString(),
      location: 'पटना',
      time: '1 घंटे पहले',
      views: 1800
    }
  ]);

  const [featuredArticlesTitle, setFeaturedArticlesTitle] = useState('Featured Articles');
  const [featuredArticles, setFeaturedArticles] = useState([]);
  const [photoGalleryTitle, setPhotoGalleryTitle] = useState('Photo Gallery');
  const [galleryPhotos, setGalleryPhotos] = useState([]);
  const [popularTags, setPopularTags] = useState(['Politics', 'Technology', 'Sports', 'Health', 'Finance']);
  const [newsletterTitle, setNewsletterTitle] = useState('Newsletter');
  const [newsletterDescription, setNewsletterDescription] = useState('Stay updated with our latest news and articles');
  const [videoNewsTitle, setVideoNewsTitle] = useState('बिहार की ताज़ा राजनीतिक खबरें | नीतीश कुमार का बड़ा बयान');
  const [videos, setVideos] = useState(['https://youtu.be/dQw4w9WgXcQ']);
  const [localNewsTitle, setLocalNewsTitle] = useState('Local News');
  const [localNewsArticles, setLocalNewsArticles] = useState([]);
  const [marqueeItems, setMarqueeItems] = useState([]);

  // Login handler
  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          username: 'admin',
          password: 'admin123'
        })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        setMessage(data.message || 'Login failed');
        return;
      }
      
      console.log('Login successful, token:', data.token);
      setToken(data.token);
      localStorage.setItem('token', data.token);
      setIsLoggedIn(true);
      navigate('/admin');
    } catch (error) {
      console.error('Login error:', error);
      setMessage('Error connecting to server: ' + error.message);
    }
  };

  // Fetch customization data
  const fetchCustomization = async (authToken) => {
    try {
      const response = await fetch('http://localhost:5000/api/content', {
        headers: { Authorization: 'Bearer ' + authToken }
      });
      if (response.ok) {
        const data = await response.json();
        if (data.data) {
          const content = data.data;
          setHeroBanner(content.heroBanner || heroBanner);
          setLatestNewsTitle(content.latestNewsTitle || 'Latest News');
          setLatestNewsArticles(content.latestNews || latestNewsArticles);
          setFeaturedArticlesTitle(content.featuredArticlesTitle || featuredArticlesTitle);
          setFeaturedArticles(content.featuredArticles || []);
          setPhotoGalleryTitle(content.photoGallery?.title || photoGalleryTitle);
          setGalleryPhotos(content.photoGallery?.photos || []);
          setPopularTags(content.popularTags || popularTags);
          setNewsletterTitle(content.newsletter?.title || newsletterTitle);
          setNewsletterDescription(content.newsletter?.description || newsletterDescription);
          setVideoNewsTitle(content.videoNews?.title || videoNewsTitle);
          setVideos(content.videoNews?.videos || videos);
          setLocalNewsTitle(content.localNews?.title || localNewsTitle);
          setLocalNewsArticles(content.localNews?.articles || []);
          setMarqueeItems(content.marqueeItems || []);
        }
      } else {
        const errorData = await response.json();
        setMessage(errorData.message || 'Failed to fetch customization data');
      }
    } catch (error) {
      setMessage('Error fetching customization data: ' + error.message);
    }
  };

  // Save customization data with popup and redirect
  const handleSave = async () => {
    try { 
      const payload = {
        heroBanner: heroBanner,
        latestNewsTitle: latestNewsTitle,
        latestNews: latestNewsArticles,
        featuredArticlesTitle: featuredArticlesTitle,
        featuredArticles: featuredArticles,
        photoGallery: {
          title: photoGalleryTitle,
          photos: galleryPhotos
        },
        popularTags: popularTags,
        newsletter: {
          title: newsletterTitle,
          description: newsletterDescription
        },
        videoNews: {
          title: videoNewsTitle,
          videos: videos
        },
        localNews: {
          title: localNewsTitle,
          articles: localNewsArticles
        },
        marqueeItems: marqueeItems
      };

      const response = await fetch('http://localhost:5000/api/content', {
        method: 'PUT',  
        headers: { 
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token
        },
        body: JSON.stringify(payload)
      });

      // First check if the response is ok
      if (!response.ok) {
        const errorText = await response.text();
        setMessage('Error: ' + errorText);
        return;
      }

      // Try to parse JSON response if it exists
      const contentType = response.headers.get('content-type');
      let data;
      if (contentType && contentType.includes('application/json')) {
        try {
          data = await response.json();
        } catch (parseError) {
          console.error('Failed to parse JSON response:', parseError);
          data = { message: 'Invalid JSON response from server' };
        }
      }

      // If no JSON data, just use the text response
      if (!data) {
        const text = await response.text();
        data = { message: text };
      }

      if (response.ok) {
        alert('Changes saved successfully!');
        // navigate('/');
        // window.location.reload();
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
      author: 'हर्षित',
      date: new Date().toISOString(),
      location: 'बिहार',
      time: 'अभी',
      views: 0,
      link: '#'
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
            value="admin"
            readOnly
            className="w-full mb-4 px-3 py-2 border rounded"
          />
          <input
            type="password"
            value="admin123"
            readOnly
            className="w-full mb-6 px-3 py-2 border rounded"
          />
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
            Login
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8 overflow-auto space-y-6 md:space-y-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">Admin Dashboard</h1>
      <div className="bg-white p-6 rounded shadow-md">
        <h2 className="text-xl font-semibold mb-4">Welcome to Admin Dashboard</h2>
        <p className="text-gray-600">You are logged in as admin.</p>
      </div>

      {/* Hero Banner Section */}
      <section className="bg-white p-6 rounded shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Hero Banner (मुख्य छवि)</h2>
        <label className="block font-semibold mb-1">Title (शीर्षक)</label>
        <input
          type="text"
          value={heroBanner.title}
          onChange={(e) => setHeroBanner({ ...heroBanner, title: e.target.value })}
          className="w-full px-3 py-2 border rounded mb-3"
          placeholder="हर्षित के कलम से में आपका स्वागत है"
        />
        <label className="block font-semibold mb-1">Subtitle (उपशीर्षक)</label>
        <input
          type="text"
          value={heroBanner.subtitle}
          onChange={(e) => setHeroBanner({ ...heroBanner, subtitle: e.target.value })}
          className="w-full px-3 py-2 border rounded mb-3"
          placeholder="बिहार और झारखंड की ताज़ा खबरें"
        />
        <div className="mb-4">
          <label className="block font-semibold mb-2">Images (छवियां)</label>
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
            <label className="block font-semibold mb-1">Button 1 Text (बटन 1)</label>
            <input
              type="text"
              value={heroBanner.button1Text}
              onChange={(e) => setHeroBanner({ ...heroBanner, button1Text: e.target.value })}
              className="w-full px-3 py-2 border rounded"
              placeholder="ताज़ा खबरें पढ़ें"
            />
          </div>
          <div className="flex-1">
            <label className="block font-semibold mb-1">Button 2 Text (बटन 2)</label>
            <input
              type="text"
              value={heroBanner.button2Text}
              onChange={(e) => setHeroBanner({ ...heroBanner, button2Text: e.target.value })}
              className="w-full px-3 py-2 border rounded"
              placeholder="वीडियो देखें"
            />
          </div>
        </div>
      </section>

      {/* Latest News Section - For Top 3 Images */}
      <section className="bg-white p-6 rounded shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Latest News (शीर्ष 3 छवियां)</h2>
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
              <h3 className="font-bold text-lg mb-3">Article {index + 1}</h3>
              <label className="block font-semibold mb-1">Image URL</label>
              <input
                type="text"
                value={article.image}
                onChange={(e) => handleUpdateLatestNewsArticle(index, 'image', e.target.value)}
                className="w-full px-3 py-2 border rounded mb-2"
                placeholder="https://example.com/image.jpg"
              />
              <label className="block font-semibold mb-1">Category</label>
              <select
                value={article.category}
                onChange={(e) => handleUpdateLatestNewsArticle(index, 'category', e.target.value)}
                className="w-full px-3 py-2 border rounded mb-2"
              >
                <option value="">Select Category</option>
                <option value="बिहार">बिहार</option>
                <option value="झारखंड">झारखंड</option>
                <option value="राजनीति">राजनीति</option>
                <option value="अपराध">अपराध</option>
                <option value="खेल">खेल</option>
                <option value="करियर">करियर</option>
                <option value="विकास">विकास</option>
                <option value="देश">देश</option>
              </select>
              <label className="block font-semibold mb-1">Title</label>
              <input
                type="text"
                value={article.title}
                onChange={(e) => handleUpdateLatestNewsArticle(index, 'title', e.target.value)}
                className="w-full px-3 py-2 border rounded mb-2"
                placeholder="समाचार का शीर्षक"
              />
              <label className="block font-semibold mb-1">Link</label>
              <input
                type="text"
                value={article.link}
                onChange={(e) => handleUpdateLatestNewsArticle(index, 'link', e.target.value)}
                className="w-full px-3 py-2 border rounded mb-2"
                placeholder="/news/article-link"
              />
              <label className="block font-semibold mb-1">Location</label>
              <input
                type="text"
                value={article.location}
                onChange={(e) => handleUpdateLatestNewsArticle(index, 'location', e.target.value)}
                className="w-full px-3 py-2 border rounded mb-2"
                placeholder="पटना"
              />
              <label className="block font-semibold mb-1">Time</label>
              <input
                type="text"
                value={article.time}
                onChange={(e) => handleUpdateLatestNewsArticle(index, 'time', e.target.value)}
                className="w-full px-3 py-2 border rounded mb-2"
                placeholder="2 घंटे पहले"
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

      {/* Video News Section */}
      <section className="bg-white p-6 rounded shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Video News (यूट्यूब वीडियो)</h2>
        <label className="block font-semibold mb-1">Section Title</label>
        <input
          type="text"
          value={videoNewsTitle}
          onChange={(e) => setVideoNewsTitle(e.target.value)}
          className="w-full px-3 py-2 border rounded mb-3"
          placeholder="बिहार की ताज़ा राजनीतिक खबरें"
        />
        <div>
          {videos.map((video, index) => (
            <div key={index} className="mb-6 border p-4 rounded shadow-sm bg-gray-50">
              <label className="block font-semibold mb-1">YouTube Video URL</label>
              <input
                type="text"
                value={video}
                onChange={(e) => handleUpdateVideo(index, e.target.value)}
                className="w-full px-3 py-2 border rounded mb-2"
                placeholder="https://youtu.be/VIDEO_ID"
              />
              <p className="text-sm text-gray-600 mb-2">Example: https://youtu.be/dQw4w9WgXcQ</p>
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

      {/* Marquee Items Section */}
      <section className="bg-white p-6 rounded shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Marquee Items (ब्रेकिंग न्यूज़)</h2>
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
              placeholder="ब्रेकिंग न्यूज़ आइटम"
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

export default AdminLogin;