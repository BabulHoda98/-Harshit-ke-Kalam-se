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
  const [newsletterTitle, setNewsletterTitle] = useState('');
  const [newsletterDescription, setNewsletterDescription] = useState('');
  const [videoNewsTitle, setVideoNewsTitle] = useState('Video News');
  const [videos, setVideos] = useState([]);
  const [browseByCategoryTitle, setBrowseByCategoryTitle] = useState('Browse by Category');
  const [categories, setCategories] = useState([]);
  const [localNewsTitle, setLocalNewsTitle] = useState('Local News');
  const [localNewsArticles, setLocalNewsArticles] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    fetch('/api/customization')
      .then(async res => {
        if (!res.ok) {
          const text = await res.text();
          console.error('Fetch error:', text);
          throw new Error('Failed to fetch customization data');
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

  const filteredLatestNewsArticles = selectedCategory
    ? latestNewsArticles.filter(article => article.category === selectedCategory)
    : latestNewsArticles;

  const filteredLocalNewsArticles = selectedCategory
    ? localNewsArticles.filter(article => article.category === selectedCategory)
    : localNewsArticles;

  return (
    <div className="bg-gray-50">
      <HeroBanner heroBanner={heroBanner} />
      <div className="container px-4 md:px-6 py-8 md:py-12 grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12 max-w-[1400px] mx-auto">
        <div className="lg:col-span-2 space-y-8 md:space-y-12">
          <LatestNews latestNewsTitle={latestNewsTitle} latestNewsArticles={filteredLatestNewsArticles} />
          <FeaturedArticles featuredArticlesTitle={featuredArticlesTitle} featuredArticles={featuredArticles} />
          <PhotoGallery photoGalleryTitle={photoGalleryTitle} galleryPhotos={galleryPhotos} />
          <LocalNews localNewsTitle={localNewsTitle} localNewsArticles={filteredLocalNewsArticles} />
        </div>
        <div className="space-y-6 md:space-y-8">
          <PopularTags popularTags={popularTags} />
          <Newsletter newsletterTitle={newsletterTitle} newsletterDescription={newsletterDescription} />
        </div>
      </div>
      <BrowseByCategory browseByCategoryTitle={browseByCategoryTitle} categories={categories} selectedCategory={selectedCategory} onCategorySelect={setSelectedCategory} />
      <VideoNews videoNewsTitle={videoNewsTitle} videos={videos} />
    </div>
  );
};

export default Home;
