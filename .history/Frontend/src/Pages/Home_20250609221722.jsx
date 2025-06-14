import React from 'react';
import { HeroBanner, LatestNews, FeaturedArticles, PhotoGallery, PopularTags, Newsletter, LocalNews, BrowseByCategory, VideoNews } from '../Components/HomeSections';
import FeaturedArticlesFix from '../Components/FeaturedArticlesFix';

const Home = () => {
  return (
    <div>
      <HeroBanner heroBanner={{}} />
      <LatestNews latestNewsTitle="Latest News" latestNewsArticles={[]} />
      <FeaturedArticlesFix featuredArticlesTitle="Featured Articles" featuredArticles={[]} />
      <PhotoGallery photoGalleryTitle="Photo Gallery" galleryPhotos={[]} />
      <PopularTags popularTags={[]} />
      <Newsletter newsletterTitle="Newsletter" newsletterDescription="" />
      <LocalNews localNewsTitle="Local News" localNewsArticles={[]} />
      <BrowseByCategory />
      <VideoNews videoNewsTitle="Video News" videos={[]} />
    </div>
  );
  const [newsletterDescription, setNewsletterDescription] = useState('');
  const [videoNewsTitle, setVideoNewsTitle] = useState('Video News');
  const [videos, setVideos] = useState([]);
  const [browseByCategoryTitle, setBrowseByCategoryTitle] = useState('Browse by Category');
  const [categories, setCategories] = useState([]);
  const [localNewsTitle, setLocalNewsTitle] = useState('Local News');
  const [localNewsArticles, setLocalNewsArticles] = useState([]);

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

  return (
    <div className="bg-gray-50">
      <HeroBanner heroBanner={heroBanner} />
      <div className="container px-6 py-12 grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-[1400px] mx-auto">
        <div className="lg:col-span-2 space-y-12">
          <LatestNews latestNewsTitle={latestNewsTitle} latestNewsArticles={latestNewsArticles} />
          <FeaturedArticles featuredArticlesTitle={featuredArticlesTitle} featuredArticles={featuredArticles} />
          <PhotoGallery photoGalleryTitle={photoGalleryTitle} galleryPhotos={galleryPhotos} />
          <LocalNews localNewsTitle={localNewsTitle} localNewsArticles={localNewsArticles} />
        </div>
        <div className="space-y-8">
          <PopularTags popularTags={popularTags} />
          <Newsletter newsletterTitle={newsletterTitle} newsletterDescription={newsletterDescription} />
        </div>
      </div>
      <BrowseByCategory browseByCategoryTitle={browseByCategoryTitle} categories={categories} />
      <VideoNews videoNewsTitle={videoNewsTitle} videos={videos} />
    </div>
  );
};

export default Home;
