import { motion } from 'framer-motion';
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { useState, useEffect } from 'react';
import { FaEdit, FaNewspaper, FaChartLine, FaLaptopCode, FaUsers, FaCloudSun, FaVideo, FaTags, FaMapMarkerAlt, FaCalendarAlt, FaEnvelope, FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

export const HeroBanner = ({ heroBanner }) => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    slides: {
      perView: 1,
      spacing: 0,
    },
    mode: "snap",
    drag: true,
    renderMode: "performance",
    created() {
      setLoaded(true);
    }
  });

  useEffect(() => {
    const handleResize = () => {
      if (instanceRef.current) {
        instanceRef.current.update();
      }
    };
    window.addEventListener('resize', handleResize);

    const interval = setInterval(() => {
      if (instanceRef.current && heroBanner.images && heroBanner.images.length > 0) {
        const nextSlide = (currentSlide + 1) % heroBanner.images.length;
        instanceRef.current.moveToIdx(nextSlide);
        setCurrentSlide(nextSlide);
      }
    }, 5000);
    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, [currentSlide, instanceRef, heroBanner.images]);

  const handleReadLatestNews = () => {
    const element = document.getElementById('latest-news');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleWatchVideos = () => {
    const element = document.getElementById('video-news');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative h-screen w-full flex items-center justify-center text-white overflow-hidden">
      <div ref={sliderRef} className="keen-slider h-full w-full">
        {Array.isArray(heroBanner.images) && heroBanner.images.length > 0 ? 
          heroBanner.images.map((image, index) => (
            <div 
              key={index} 
              className={`keen-slider__slide h-full w-full bg-cover bg-center ${index === currentSlide ? 'opacity-100' : 'opacity-0'} transition-opacity duration-1000`}
              style={{ 
                backgroundImage: `url(${image})`, 
                filter: 'brightness(0.7)'
              }}
            />
          )) : (
            <div className="keen-slider__slide h-full w-full bg-cover bg-center" 
              style={{ 
                backgroundImage: `url('https://source.unsplash.com/random/1920x1080?news')`, 
                filter: 'brightness(0.7)' 
              }} 
            />
          )
        }
      </div>
      
      <div className="absolute bg-black/70 inset-0 z-10 flex flex-col items-center justify-center px-6 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <motion.h1 
            className="text-5xl md:text-7xl font-bold mb-6 text-white leading-tight"
          >
            {heroBanner.title}
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl mb-8 text-white/90 font-light"
          >
            {heroBanner.subtitle}
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <button 
              onClick={handleReadLatestNews}
              className="bg-white text-blue-800 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 hover:shadow-lg flex items-center gap-2"
            >
              {heroBanner.button1Text}
              <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
            </button>
            <button 
              onClick={handleWatchVideos}
              className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white/10 transition-all duration-300 hover:shadow-lg flex items-center gap-2"
            >
              {heroBanner.button2Text}
              <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Navigation Dots */}
      {loaded && instanceRef.current && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex gap-2">
          {heroBanner.images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                instanceRef.current?.moveToIdx(idx);
                setCurrentSlide(idx);
              }}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${currentSlide === idx ? 'bg-white w-6' : 'bg-white/50'}`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export const LatestNews = ({ latestNewsTitle, latestNewsArticles }) => {
  const navigate = useNavigate();

  const handleArticleClick = (article, index) => {
    const id = article._id !== undefined ? article._id : index;
    navigate(`/news/${id}`);
  };

  const truncateDescription = (text, wordLimit = 15) => {
    if (!text) return '';
    const words = text.split(' ');
    if (words.length <= wordLimit) return text;
    return words.slice(0, wordLimit).join(' ');
  };

  return (
    <motion.section
      id="latest-news"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className="py-5 px-6 max-w-7xl mx-auto"
    >
      <div className="flex justify-between items-center mb-14">
        <motion.h2 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-bold"
        >
          {latestNewsTitle}
          <span className="block w-24 h-1.5 mt-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></span>
        </motion.h2>
        <motion.button 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          onClick={() => navigate('/section', { state: { title: latestNewsTitle, items: latestNewsArticles } })}
          className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-2 transition-colors"
        >
          View All
          <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
        </motion.button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {latestNewsArticles.length > 0 ? latestNewsArticles.map((article, i) => (
          <motion.article
            key={`news-article-${i}`}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            whileHover={{ y: -10 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl cursor-pointer group"
            onClick={() => handleArticleClick(article, i)}
          >
            <div className="relative overflow-hidden h-64">
              <img
                src={article.image}
                alt="News thumbnail"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent p-6 flex flex-col justify-end">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1.5 rounded-full text-sm font-medium self-start">
                  {article.category}
                </span>
              </div>
            </div>
            <div className="p-8">
              <h3 className="font-bold text-2xl mb-4 text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                {article.title}
              </h3>
              <div className="text-gray-600 mb-6 text-lg">
                <p className="line-clamp-3">
                  {truncateDescription(article.description)}
                  {article.description.split(' ').length > 15 && (
                    <span 
                      className="text-blue-600 hover:text-blue-800 font-medium ml-2 cursor-pointer inline-flex items-center"
                      onClick={(e) => { 
                        e.stopPropagation(); 
                        handleArticleClick(article, i); 
                      }}
                    >
                      Read More
                      <FaArrowRight className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  )}
                </p>
              </div>
              <div className="flex justify-between items-center text-sm text-gray-500 border-t border-gray-100 pt-4">
                <span className="font-medium">By {article.author}</span>
                <span>{article.date}</span>
              </div>
            </div>
          </motion.article>
        )) : (
          <p className="text-gray-500 text-center col-span-2 py-12">No latest news articles available.</p>
        )}
      </div>
    </motion.section>
  );
};

export const FeaturedArticles = ({ featuredArticlesTitle, featuredArticles }) => {
  const navigate = useNavigate();

  const handleArticleClick = (article, index) => {
    const id = article.id !== undefined ? article.id : (article._id !== undefined ? article._id : null);
    if (id !== null) {
      navigate(`/articles/${id}`);
    } else {
      console.error('Article ID is missing, cannot navigate');
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="py-2 px-6 bg-gray-50"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-14">
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold"
          >
            {featuredArticlesTitle}
            <span className="block w-24 h-1.5 mt-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></span>
          </motion.h2>
          <motion.button 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            onClick={() => navigate('/section', { state: { title: featuredArticlesTitle, items: featuredArticles } })}
            className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-2 transition-colors"
          >
            View All
            <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
          </motion.button>
        </div>

        <div className="space-y-10">
          {featuredArticles && featuredArticles.length > 0 ? featuredArticles.map((article, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ y: -10 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl cursor-pointer group"
              onClick={() => handleArticleClick(article)}
            >
              <div className="md:flex">
                <div className="md:w-2/5 relative overflow-hidden">
                  <img
                    src={article.image}
                    alt="Featured article"
                    className="w-full h-64 md:h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="md:w-3/5 p-8">
                  <div className="flex items-center mb-4">
                    <span className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 px-4 py-1.5 rounded-full text-sm font-medium mr-3">
                      Featured
                    </span>
                    <span className="text-gray-500 text-sm">{article.date}</span>
                  </div>
                  <h3 className="font-bold text-2xl md:text-3xl mb-4 text-gray-900 group-hover:text-blue-600 transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-gray-700 mb-6 text-lg">
                    {article.description.split(' ').slice(0, 30).join(' ')}...
                    <span 
                      className="text-blue-600 font-semibold hover:underline flex items-center gap-2 ml-2 cursor-pointer mt-2" 
                      onClick={(e) => { e.stopPropagation(); handleArticleClick(article); }}
                    >
                      Continue Reading
                      <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </p>
                  <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                    <span className="text-gray-500 text-sm">{article.readTime || '5 min read'}</span>
                    <span className="text-blue-600 text-sm font-medium">Featured Story</span>
                  </div>
                </div>
              </div>
            </motion.article>
          )) : (
            <p className="text-gray-500 text-center py-12">No featured articles available.</p>
          )}
        </div>
      </div>
    </motion.section>
  );
};

export const PhotoGallery = ({ photoGalleryTitle, galleryPhotos }) => (
  <motion.section
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    className="py-2 px-6 max-w-7xl mx-auto"
  >
    <div className="flex justify-between items-center mb-14">
      <motion.h2 
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl md:text-5xl font-bold"
      >
        {photoGalleryTitle}
        <span className="block w-24 h-1.5 mt-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></span>
      </motion.h2>
      <motion.a 
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        href="#"
        className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-2 transition-colors"
      >
        View All
        <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
      </motion.a>
    </div>
    
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {galleryPhotos && galleryPhotos.length > 0 ? galleryPhotos.map((photo, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.05 }}
          whileHover={{ scale: 1.03 }}
          className="relative rounded-xl overflow-hidden shadow-lg cursor-pointer group"
        >
          <img
            src={photo.url}
            alt={photo.alt || 'Gallery photo'}
            className="w-full h-48 md:h-64 object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
            <h3 className="text-white font-semibold text-lg translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
              {photo.title || `Photo ${i + 1}`}
            </h3>
          </div>
          <div className="absolute top-4 right-4 bg-white/90 text-gray-900 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
            </svg>
          </div>
        </motion.div>
      )) : (
        <p className="text-gray-500 text-center col-span-4 py-12">No photos available.</p>
      )}
    </div>
  </motion.section>
);

export const PopularTags = ({ popularTags }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className="bg-white p-8 rounded-2xl shadow-lg"
  >
    <h3 className="font-bold text-2xl mb-6 flex items-center gap-3 text-gray-900">
      <FaTags className="text-blue-600" />
      Popular Tags
    </h3>
    <div className="flex flex-wrap gap-3">
      {popularTags && popularTags.length > 0 ? popularTags.map((tag, i) => (
        <motion.a
          key={i}
          whileHover={{ y: -2 }}
          href="#"
          className="px-4 py-2 bg-gray-100 hover:bg-blue-100 text-gray-800 hover:text-blue-800 rounded-full text-sm font-medium transition-all duration-300"
        >
          #{tag}
        </motion.a>
      )) : (
        <p className="text-gray-500">No tags available.</p>
      )}
    </div>
  </motion.div>
);

export const Newsletter = ({ newsletterTitle, newsletterDescription }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: 0.2 }}
    className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 rounded-2xl shadow-lg text-white"
  >
    <div className="flex items-start gap-4 mb-6">
      <div className="bg-white/20 p-3 rounded-full">
        <FaEnvelope className="text-xl" />
      </div>
      <div>
        <h3 className="font-bold text-2xl mb-2">{newsletterTitle}</h3>
        <p className="text-blue-100">{newsletterDescription}</p>
      </div>
    </div>
    <form className="space-y-4">
      <input 
        type="email" 
        placeholder="Your email address" 
        className="w-full px-5 py-3 rounded-xl bg-white/20 placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-white text-white"
        required
      />
      <button 
        type="submit" 
        className="w-full bg-white text-blue-700 font-semibold py-3 rounded-xl hover:bg-gray-100 transition-all duration-300 flex items-center justify-center gap-2"
      >
        Subscribe Now
        <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
      </button>
    </form>
    <p className="text-xs text-blue-200 mt-4">We respect your privacy. Unsubscribe at any time.</p>
  </motion.div>
);

export const LocalNews = ({ localNewsTitle, localNewsArticles }) => {
  const navigate = useNavigate();

  const handleArticleClick = (article, index) => {
    const id = article._id !== undefined ? article._id : index;
    navigate(`/news/${id}`);
  };

  const truncateDescription = (text, wordLimit = 15) => {
    if (!text) return '';
    const words = text.split(' ');
    if (words.length <= wordLimit) return text;
    return words.slice(0, wordLimit).join(' ');
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="py-20 px-6 bg-gray-50"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-14">
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold flex items-center gap-4"
          >
            <FaMapMarkerAlt className="text-blue-600" />
            {localNewsTitle}
            {/* <span className="block w-24 h-1.5 mt-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></span> */}
          </motion.h2>
          <motion.button 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            onClick={() => navigate('/section', { state: { title: localNewsTitle, items: localNewsArticles } })}
            className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-2 transition-colors"
          >
            View All
            <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
          </motion.button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {localNewsArticles && localNewsArticles.length > 0 ? localNewsArticles.map((article, i) => (
            <motion.article 
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -10 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl cursor-pointer group"
              onClick={() => handleArticleClick(article, i)}
            >
              <div className="relative overflow-hidden h-56">
                <img
                  src={article.image}
                  alt={`Local News ${i + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-600/80 via-transparent to-transparent p-6 flex flex-col justify-end">
                  <span className="bg-blue-600 text-white px-4 py-1.5 rounded-full text-sm font-medium self-start">
                    Local News
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-xl mb-3 text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                  {article.title}
                </h3>
                <div className="text-gray-600 mb-4">
                  <p className="line-clamp-3">
                    {truncateDescription(article.description)}
                    {article.description.split(' ').length > 15 && (
                      <span 
                        className="text-blue-600 hover:text-blue-800 font-medium ml-2 cursor-pointer inline-flex items-center"
                        onClick={(e) => { 
                          e.stopPropagation(); 
                          handleArticleClick(article, i); 
                        }}
                      >
                        Read More
                        <FaArrowRight className="ml-1 transition-transform duration-300 group-hover:translate-x-1" />
                      </span>
                    )}
                  </p>
                </div>
                <div className="flex justify-between items-center text-sm text-gray-500 border-t border-gray-100 pt-4">
                  <span className="font-medium">By {article.author}</span>
                  <span>{article.date}</span>
                </div>
              </div>
            </motion.article>
          )) : (
            <p className="text-gray-500 text-center col-span-3 py-12">No local news articles available.</p>
          )}
        </div>
      </div>
    </motion.section>
  );
};

export const BrowseByCategory = ({ isAdmin }) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="py-5 bg-gradient-to-br from-gray-50 to-gray-100"
    >
      <div className="max-w-7xl mx-auto px-6">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-bold text-center mb-16"
        >
          Browse by Category
          <span className="block w-24 h-1.5 mt-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mx-auto"></span>
        </motion.h2>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
          {[
            { name: "Politics", icon: <FaNewspaper className="text-3xl" />, color: "bg-red-50 text-red-600 hover:bg-red-100" },
            { name: "Business", icon: <FaChartLine className="text-3xl" />, color: "bg-blue-50 text-blue-600 hover:bg-blue-100" },
            { name: "Technology", icon: <FaLaptopCode className="text-3xl" />, color: "bg-indigo-50 text-indigo-600 hover:bg-indigo-100" },
            { name: "Sports", icon: <FaUsers className="text-3xl" />, color: "bg-green-50 text-green-600 hover:bg-green-100" },
            { name: "Health", icon: <FaCloudSun className="text-3xl" />, color: "bg-teal-50 text-teal-600 hover:bg-teal-100" },
            { name: "Entertainment", icon: <FaVideo className="text-3xl" />, color: "bg-yellow-50 text-yellow-600 hover:bg-yellow-100" },
            { name: "Science", icon: <FaTags className="text-3xl" />, color: "bg-purple-50 text-purple-600 hover:bg-purple-100" },
            { name: "Travel", icon: <FaMapMarkerAlt className="text-3xl" />, color: "bg-orange-50 text-orange-600 hover:bg-orange-100" },
            { name: "Education", icon: <FaCalendarAlt className="text-3xl" />, color: "bg-pink-50 text-pink-600 hover:bg-pink-100" },
            { name: "Art", icon: <FaEnvelope className="text-3xl" />, color: "bg-amber-50 text-amber-600 hover:bg-amber-100" }
          ].map((category, i) => (
            <motion.a
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              whileHover={{ y: -10 }}
              href="#"
              className={`${category.color} rounded-2xl p-6 flex flex-col items-center justify-center shadow-md hover:shadow-lg transition-all duration-300`}
            >
              <div className="mb-4 p-4 bg-white rounded-full shadow-sm">
                {category.icon}
              </div>
              <h3 className="font-bold text-lg text-center">{category.name}</h3>
            </motion.a>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export const VideoNews = ({ videoNewsTitle, videos }) => {
  const [sliderRef, instanceRef] = useKeenSlider({
    loop: false,
    mode: "free-snap",
    slides: {
      origin: "center",
      perView: 2.5,
      spacing: 24,
    },
    breakpoints: {
      "(max-width: 768px)": {
        slides: {
          perView: 1.2,
          spacing: 16,
        },
      },
      "(max-width: 1024px)": {
        slides: {
          perView: 2,
          spacing: 20,
        },
      },
    },
  });

  return (
    <section 
      id="video-news" 
      className="py-20 px-6 max-w-7xl mx-auto"
    >
      <div className="flex justify-between items-center mb-14">
        <motion.h2 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-bold"
        >
          {videoNewsTitle}
          <span className="block w-24 h-1.5 mt-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></span>
        </motion.h2>
        <motion.a 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          href="#" 
          className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-2 transition-colors"
        >
          View All
          <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
        </motion.a>
      </div>
      
      <div className="relative">
        <div ref={sliderRef} className="keen-slider">
          {videos && videos.length > 0 ? videos.map((url, i) => (
            <div key={i} className="keen-slider__slide">
              <motion.div 
                whileHover={{ y: -10 }}
                className="group relative rounded-2xl overflow-hidden shadow-xl bg-white transition-all duration-300 hover:shadow-2xl"
              >
                <div className="w-full h-64 bg-black">
                  <iframe
                    src={url}
                    title={`Video ${i + 1}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  ></iframe>
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-lg text-gray-900 group-hover:text-blue-600 transition-colors">
                    Video {i + 1}
                  </h3>
                  <p className="text-gray-600 mt-2">Watch our latest video coverage</p>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="bg-white/90 text-blue-600 p-3 rounded-full">
                    <FaVideo className="text-xl" />
                  </div>
                </div>
              </motion.div>
            </div>
          )) : (
            <p className="text-gray-500">No videos available.</p>
          )}
        </div>
        
        {videos && videos.length > 2 && (
          <>
            <button
              onClick={() => instanceRef.current?.prev()}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-6 bg-white text-blue-600 p-3 rounded-full shadow-lg hover:bg-blue-50 transition-colors z-10"
              aria-label="Previous"
            >
              <FaArrowLeft />
            </button>
            <button
              onClick={() => instanceRef.current?.next()}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-6 bg-white text-blue-600 p-3 rounded-full shadow-lg hover:bg-blue-50 transition-colors z-10"
              aria-label="Next"
            >
              <FaArrowRight />
            </button>
          </>
        )}
      </div>
    </section>
  );
};