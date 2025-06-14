import React, { useState, useEffect } from 'react';
import { HeroBanner, LatestNews, FeaturedArticles, PhotoGallery, PopularTags, Newsletter, VideoNews, BrowseByCategory, LocalNews, FooterLinks } from '../Components/HomeSections';

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

  const [browseByCategoryTitle, setBrowseByCategoryTitle] = useState('Browse by Category');
  const [categories, setCategories] = useState([]);

  const [localNewsTitle, setLocalNewsTitle] = useState('Local News');
  const [localNewsArticles, setLocalNewsArticles] = useState([]);

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
        setHeroBanner(data.heroBanner || heroBanner);
        setLatestNewsTitle(data.latestNewsTitle || 'Latest News');
        setLatestNewsArticles(data.latestNewsArticles || []);
