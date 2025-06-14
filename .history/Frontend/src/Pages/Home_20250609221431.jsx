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
};

export default Home;
