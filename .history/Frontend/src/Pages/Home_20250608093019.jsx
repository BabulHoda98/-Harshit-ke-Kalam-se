import React, { useEffect, useState } from 'react';
import { FaArrowDown } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { HeroBanner, LatestNews, FeaturedArticles, PhotoGallery, PopularTags, Newsletter, VideoNews, BrowseByCategory, LocalNews } from '../Components/HomeSections';

const Home = () => {
  const [heroBanner, setHeroBanner] = useState({
    title: '',
    subtitle: '',
    button1Text: '',
    button2Text: '',
    images: []
  });
  const [latestNewsTitle, setLatestNewsTitle] = useState('');
  const [latestNewsArticles, setLatestNewsArticles] = useState([]);
  const [popularTags, setPopularTags] = useState([]);
  const [newsletterTitle, setNewsletterTitle] = useState('');
  const [newsletterDescription, setNewsletterDescription] = useState('');

  useEffect(() => {
    // Fetch customization data from backend
    fetch('http://localhost:5000/api/admin/customization')
      .then(res => res.json())
      .then(data => {
        setHeroBanner(data.heroBanner || {});
        setLatestNewsTitle(data.latestNewsTitle || '');
        setLatestNewsArticles(data.latestNewsArticles || []);
        setPopularTags(data.popularTags || []);
        setNewsletterTitle(data.newsletterTitle || '');
        setNewsletterDescription(data.newsletterDescription || '');
      })
      .catch(err => console.error('Error fetching customization data:', err));
  }, []);

  return (
    <div className="bg-gray-50">
      {/* Hero Banner Section */}
      <HeroBanner heroBanner={heroBanner} />

      {/* Main Content Container */}
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
        {/* Sidebar Section */}
        <div className="space-y-8">
          {/* Popular Tags */}
          <PopularTags popularTags={popularTags} />

          {/* Newsletter */}
          <Newsletter newsletterTitle={newsletterTitle} newsletterDescription={newsletterDescription} />
        </div>
      </div>
    </div>
  );
};

export default Home;
