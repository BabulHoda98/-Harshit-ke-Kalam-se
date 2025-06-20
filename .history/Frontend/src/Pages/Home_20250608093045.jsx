import React, { useEffect, useState } from 'react';
import { HeroBanner, LatestNews, FeaturedArticles, PhotoGallery, PopularTags, Newsletter, VideoNews, BrowseByCategory, LocalNews } from '../Components/HomeSections';

const Home = () => {
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
  const [popularTags, setPopularTags] = useState([]);
  const [newsletterTitle, setNewsletterTitle] = useState('Newsletter');
  const [newsletterDescription, setNewsletterDescription] = useState('');
  const [videoNewsTitle, setVideoNewsTitle] = useState('Video News');
  const [videos, setVideos] = useState([]);
  const [browseByCategoryTitle, setBrowseByCategoryTitle] = useState('Browse by Category');
  const [categories, setCategories] = useState([]);
  const [localNewsTitle, setLocalNewsTitle] = useState('Local News');
  const [localNewsArticles, setLocalNewsArticles] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found, please login');
      return;
    }
    fetch('http://localhost:5000/api/admin/customization', {
      headers: { Authorization: 'Bearer ' + token }
    })
      .then(async res => {
        if (!res.ok) {
          const text = await res.text();
          console.error('Fetch error:', text);
          if (res.status === 401) {
            localStorage.removeItem('token');
          }
          throw new Error('Unauthorized');
        }
        return res.json();
      })
      .then(data => {
        setHeroBanner(data.heroBanner || heroBanner);
        setLatestNewsTitle(data.latestNewsTitle || latestNewsTitle);
        setLatestNewsArticles(data.latestNewsArticles || []);
        setFeaturedArticlesTitle(data.featuredArticlesTitle || featuredArticlesTitle);
        setFeaturedArticles(data.featuredArticles || []);
        setPhotoGalleryTitle(data.photoGalleryTitle || photoGalleryTitle);
        setGalleryPhotos(data.galleryPhotos || []);
        setPopularTags(data.popularTags || []);
        setNewsletterTitle(data.newsletterTitle || newsletterTitle);
        setNewsletterDescription(data.newsletterDescription || newsletterDescription);
        setVideoNewsTitle(data.videoNewsTitle || videoNewsTitle);
        setVideos(data.videos || []);
        setBrowseByCategoryTitle(data.browseByCategoryTitle || browseByCategoryTitle);
        setCategories(data.categories || []);
        setLocalNewsTitle(data.localNewsTitle || localNewsTitle);
        setLocalNewsArticles(data.localNewsArticles || []);
      })
      .catch(err => {
        console.error('Failed to fetch customization data:', err);
      });
  }, []);

  return (
    <div className="bg-gray-50">
      <HeroBanner heroBanner={heroBanner} />
      <div className="container px-6 py-12 grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-[1400px] mx-auto">
        <div className="lg:col-span-2 space-y-12">
          <LatestNews latestNewsTitle={latestNewsTitle} latestNewsArticles={latestNewsArticles} />
          <FeaturedArticles featuredArticlesTitle={featuredArticlesTitle} featuredArticles={featuredArticles} />
          <PhotoGallery photoGalleryTitle={photoGalleryTitle} galleryPhotos={galleryPhotos} />
          <PopularTags popularTags={popularTags} />
          <Newsletter newsletterTitle={newsletterTitle} newsletterDescription={newsletterDescription} />
          <VideoNews videoNewsTitle={videoNewsTitle} videos={videos} />
          <BrowseByCategory browseByCategoryTitle={browseByCategoryTitle} categories={categories} />
          <LocalNews localNewsTitle={localNewsTitle} localNewsArticles={localNewsArticles} />
        </div>
        {/* Sidebar can remain unchanged */}
      </div>
    </div>
  );
};

export default Home;
