import { motion } from 'framer-motion';
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { useState, useEffect } from 'react';
import { FaEdit, FaNewspaper, FaChartLine, FaLaptopCode, FaUsers, FaCloudSun, FaVideo, FaTags, FaMapMarkerAlt, FaCalendarAlt, FaEnvelope } from 'react-icons/fa';

export const HeroBanner = ({ heroBanner }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    slides: {
      perView: 1,
      spacing: 0,
    },
    mode: "snap",
    drag: true,
    renderMode: "performance",
    breakpoints: {
      '(min-width: 768px)': {
        slides: { perView: 1, spacing: 0 },
      },
    },
  });

  useEffect(() => {
    if (instanceRef.current) {
      instanceRef.current.update();
    }
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
    }, 1000);
    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, [currentSlide, instanceRef, heroBanner.images]);

  return (
    <section className="relative h-screen w-full flex items-center justify-center text-white overflow-hidden">
      <div ref={sliderRef} className="keen-slider bg-black/50 h-full w-full">
        {heroBanner.images && heroBanner.images.length > 0 ? 
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
      
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl font-bold mb-6 text-white"
        >
          {heroBanner.title}
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto text-white"
        >
          {heroBanner.subtitle}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row justify-center gap-4"
        >
          <button className="bg-white text-blue-800 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors">
            {heroBanner.button1Text}
          </button>
          <button className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white/10 transition-colors">
            {heroBanner.button2Text}
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export const LatestNews = ({ latestNewsTitle, latestNewsArticles }) => (
  <motion.section
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-100px" }}
    variants={{
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.1 } }
    }}
    className="relative"
  >
    <div className="flex justify-between items-center mb-14">
      <h2 className="text-4xl font-bold uppercase">
        {latestNewsTitle}{" "}
        <span className="block w-24 h-1 mt-4 bg-gradient-to-r from-pink-500 to-yellow-400 rounded-full"></span>
      </h2>
      <a href="#" className="text-indigo-600 hover:underline font-medium flex items-center gap-2">
        View All
      </a>
    </div>
    <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {latestNewsArticles.length > 0 ? latestNewsArticles.map((article, i) => (
        <motion.article
          key={`news-article-${i}`}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 }
          }}
          whileHover={{ y: -5 }}
          className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl"
        >
          <div className="relative overflow-hidden h-48">
            <img
              src={article.image}
              alt="News thumbnail"
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                {article.category}
              </span>
            </div>
          </div>
          <div className="p-6">
            <h3 className="font-bold text-xl mb-3 hover:text-indigo-600 transition-colors">
              {article.title}
            </h3>
            <p className="text-gray-600 mb-4">
              {article.description.split(' ').slice(0, 15).join(' ')}...
              <a href="/articles" className="text-indigo-600 hover:underline ml-2">Read More</a>
            </p>
            <div className="flex justify-between items-center text-sm text-gray-500">
              <span>By {article.author}</span>
              <span>{article.date}</span>
            </div>
          </div>
        </motion.article>
      )) : (
        <p>No latest news articles available.</p>
      )}
    </motion.div>
  </motion.section>
);

export const FeaturedArticles = ({ featuredArticlesTitle, featuredArticles }) => (
  <motion.section
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-100px" }}
    variants={{
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.1
        }
      }
    }}
  >
    <div className="flex justify-between items-center mb-14">
      <h2 className="text-4xl font-bold uppercase">{featuredArticlesTitle} <span className="block w-24 h-1 mt-4 bg-gradient-to-r from-pink-500 to-yellow-400 rounded-full"></span></h2>
      <a href="#" className="text-indigo-600 hover:underline font-medium flex items-center gap-2">
        View All
      </a>
    </div>
    <motion.div className="space-y-8">
      {featuredArticles && featuredArticles.length > 0 ? featuredArticles.map((article, i) => (
        <motion.article
          key={i}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          whileHover={{ y: -5 }}
          className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl"
        >
          <div className="md:flex">
            <div className="md:w-1/3 relative overflow-hidden">
              <img
                src={article.image}
                alt="Featured article"
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
            <div className="md:w-2/3 p-8">
              <div className="flex items-center mb-4">
                <span className="bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-800 px-3 py-1 rounded-full text-xs font-medium mr-3">Featured</span>
                <span className="text-gray-500 text-sm">{article.date}</span>
              </div>
              <h3 className="font-bold text-2xl mb-4 hover:text-indigo-600 transition-colors">{article.title}</h3>
              <p className="text-gray-700 mb-6">
                {article.description.split(' ').slice(0, 15).join(' ')}...
                <a href={`/articles/${article.id}`} className="text-indigo-600 font-semibold hover:underline flex items-center gap-2 ml-2">
                  Read More
                </a>
              </p>
              <div className="flex justify-between items-center">
                <span className="text-gray-500 text-sm">{article.readTime || '5 min read'}</span>
              </div>
            </div>
          </div>
        </motion.article>
      )) : (
        <p>No featured articles available.</p>
      )}
    </motion.div>
  </motion.section>
);

export const PhotoGallery = ({ photoGalleryTitle, galleryPhotos }) => (
  <motion.section
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-100px" }}
    variants={{
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.1
        }
      }
    }}
  >
    <div className="flex justify-between items-center mb-14">
      <h2 className="text-4xl font-bold uppercase">{photoGalleryTitle} <span className="block w-24 h-1 mt-4 bg-gradient-to-r from-pink-500 to-yellow-400 rounded-full"></span></h2>
      <a href="#" className="text-indigo-600 hover:underline font-medium flex items-center gap-2">
        View All
      </a>
    </div>
    <motion.div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {galleryPhotos && galleryPhotos.length > 0 ? galleryPhotos.map((photo, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
          className="relative rounded-lg overflow-hidden shadow-md cursor-pointer group"
        >
          <img
            src={photo.url}
            alt={photo.alt || 'Gallery photo'}
            className="w-full h-32 object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
            </svg>
          </div>
        </motion.div>
      )) : (
        <p>No photos available.</p>
      )}
    </motion.div>
  </motion.section>
);

export const PopularTags = ({ popularTags }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="bg-white p-6 rounded-xl shadow-md"
  >
    <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
      Popular Tags
    </h3>
    <div className="flex flex-wrap gap-2">
      {popularTags && popularTags.length > 0 ? popularTags.map((tag, i) => (
        <a 
          key={i} 
          href="#" 
          className="px-3 py-1 bg-gray-100 hover:bg-indigo-100 text-gray-800 hover:text-indigo-800 rounded-full text-sm transition-colors"
        >
          {tag}
        </a>
      )) : (
        <p>No tags available.</p>
      )}
    </div>
  </motion.div>
);

export const Newsletter = ({ newsletterTitle, newsletterDescription }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: 0.4 }}
    className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 rounded-xl shadow-md text-white"
  >
    <h3 className="font-bold text-xl mb-2 flex items-center gap-2">
      {newsletterTitle}
    </h3>
    <p className="mb-4 text-indigo-100">{newsletterDescription}</p>
    <form className="space-y-3">
      <input 
        type="email" 
        placeholder="Your email address" 
        className="w-full px-4 py-2 rounded-lg bg-white/20 placeholder-indigo-200 focus:outline-none focus:ring-2 focus:ring-white"
        required
      />
      <button 
        type="submit" 
        className="w-full bg-white text-indigo-700 font-semibold py-2 rounded-lg hover:bg-gray-100 transition-colors"
      >
        Subscribe
      </button>
    </form>
    <p className="text-xs text-indigo-200 mt-3">We respect your privacy. Unsubscribe at any time.</p>
  </motion.div>
);

export const LocalNews = ({ localNewsTitle, localNewsArticles }) => (
  <motion.section
    initial="hidden"
    whileInView="visible"

export const BrowseByCategory = ({ isAdmin }) => {
  return (
    <section className="bg-gray-100 py-16 relative max-w-[1400px] mx-auto">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">Browse by Category</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
          {[
            { name: "Politics", icon: <FaNewspaper className="text-2xl" />, color: "bg-red-100 text-red-600" },
            { name: "Business", icon: <FaChartLine className="text-2xl" />, color: "bg-blue-100 text-blue-600" },
            { name: "Technology", icon: <FaLaptopCode className="text-2xl" />, color: "bg-indigo-100 text-indigo-600" },
            { name: "Sports", icon: <FaUsers className="text-2xl" />, color: "bg-green-100 text-green-600" },
            { name: "Health", icon: <FaCloudSun className="text-2xl" />, color: "bg-teal-100 text-teal-600" },
            { name: "Entertainment", icon: <FaVideo className="text-2xl" />, color: "bg-yellow-100 text-yellow-600" },
            { name: "Science", icon: <FaTags className="text-2xl" />, color: "bg-purple-100 text-purple-600" },
            { name: "Travel", icon: <FaMapMarkerAlt className="text-2xl" />, color: "bg-orange-100 text-orange-600" },
            { name: "Education", icon: <FaCalendarAlt className="text-2xl" />, color: "bg-pink-100 text-pink-600" },
            { name: "Art", icon: <FaEnvelope className="text-2xl" />, color: "bg-amber-100 text-amber-600" }
          ].map((category, i) => (
            <a
              key={i}
              href="#"
              className={`${category.color} rounded-xl p-6 flex flex-col items-center justify-center shadow-md hover:shadow-lg transition-all relative`}
            >
              <div className="mb-3">{category.icon}</div>
              <h3 className="font-bold">{category.name}</h3>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
