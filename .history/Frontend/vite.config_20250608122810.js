import React, { useEffect, useState } from 'react';
import { FaVideo, FaNewspaper, FaCloudSun, FaArrowDown, FaChartLine, FaCalendarAlt, FaEnvelope, FaTags, FaMapMarkerAlt, FaLaptopCode, FaUsers, FaArrowRight, FaArrowLeft, FaEdit } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const HeroBanner = ({ isAdmin, heroData, onChange }) => {
  return (
    <section className="relative h-[80vh] min-h-[600px] bg-gray-900 text-white overflow-hidden">
      {isAdmin && (
        <button className="absolute top-4 right-4 z-50 bg-white/90 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg flex items-center gap-2 text-sm font-medium">
          <FaEdit /> Edit Banner
        </button>
      )}
      
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src={heroData?.imageUrl || "https://source.unsplash.com/random/1920x1080?news"} 
          alt="Hero Banner" 
          className="w-full h-full object-cover opacity-70"
        />
      </div>
      
      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center px-6 container mx-auto">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="max-w-2xl"
        >
          <motion.span 
            variants={fadeInUp}
            className="inline-block bg-indigo-600 text-white px-4 py-1 rounded-full text-sm font-medium mb-4"
          >
            Breaking News
          </motion.span>
          <motion.h1 
            variants={fadeInUp}
            className="text-5xl md:text-6xl font-bold mb-6 leading-tight"
          >
            {heroData?.title || "Stay Informed With The Latest Global News"}
          </motion.h1>
          <motion.p 
            variants={fadeInUp}
            className="text-xl text-gray-300 mb-8"
          >
            {heroData?.subtitle || "Comprehensive coverage of world events, business, technology, and more"}
          </motion.p>
          <motion.div variants={fadeInUp} className="flex gap-4">
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition flex items-center gap-2">
              Read Latest <FaArrowRight />
            </button>
            <button className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-lg font-medium transition flex items-center gap-2">
              <FaVideo /> Watch Video
            </button>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0, transition: { delay: 1 } }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <FaArrowDown className="animate-bounce text-2xl text-white" />
      </motion.div>
    </section>
  );
};

const VideoNewsSection = ({ isAdmin }) => {
  const videos = [
    "https://www.youtube.com/embed/dQw4w9WgXcQ",
    "https://www.youtube.com/embed/oHg5SJYRHA0",
    "https://www.youtube.com/embed/Zi_XLOBDo_Y",
    "https://www.youtube.com/embed/9bZkp7q19f0",
    "https://www.youtube.com/embed/fLexgOxsZu0",
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [sliderRef, instanceRef] = useKeenSlider({
    initial: 0,
    loop: true,
    slides: {
      perView: 1,
      spacing: 16,
    },
    breakpoints: {
      "(min-width: 768px)": {
        slides: { perView: 2, spacing: 24 },
      },
      "(min-width: 1024px)": {
        slides: { perView: 3, spacing: 28 },
      },
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
  });

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="py-16 px-6 container max-w-[1400px] mx-auto relative"
    >
      {isAdmin && (
        <button className="absolute top-4 right-4 z-50 bg-white/90 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg flex items-center gap-2 text-sm font-medium">
          <FaEdit /> Edit Videos
        </button>
      )}

      <div className="flex justify-between items-center mb-8">
        <motion.h2 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-bold uppercase block text-gray-900 tracking-tight gap-3"
        >
          Video News
          <span className="block w-24 h-1 mt-4 bg-gradient-to-r from-pink-500 to-yellow-400 rounded-full"></span>
        </motion.h2>
        
        <motion.a 
          href="#"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="text-indigo-600 hover:underline font-semibold text-base flex items-center gap-2"
        >
          View All <FaArrowRight className="text-sm" />
        </motion.a>
      </div>

      <div className="relative">
        <div ref={sliderRef} className="keen-slider">
          {videos.map((url, i) => (
            <motion.div
              key={i}
              className="keen-slider__slide"
              custom={i}
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className="group relative rounded-xl overflow-hidden shadow-xl bg-white transition-all duration-300 hover:shadow-2xl">
                <div className="w-full h-[40vh] bg-black">
                  <iframe
                    src={url}
                    title={`Video ${i + 1}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  ></iframe>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-6 opacity-0 group-hover:opacity-100 transition-opacity">
                  <h3 className="text-white font-semibold text-lg">
                    Video News Title {i + 1}
                  </h3>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <button
          onClick={() => instanceRef.current?.prev()}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg z-10 transition-all hover:scale-110"
        >
          <FaArrowLeft className="w-5 h-5 text-gray-800" />
        </button>

        <button
          onClick={() => instanceRef.current?.next()}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg z-10 transition-all hover:scale-110"
        >
          <FaArrowRight className="w-5 h-5 text-gray-800" />
        </button>
      </div>
    </motion.section>
  );
};

const Home = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [homeContent, setHomeContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const role = localStorage.getItem('userRole');
    setIsAdmin(role === 'admin');
  }, []);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const url = isAdmin ? '/api/content/draft' : '/api/content';
        const res = await fetch(url, {
          headers: isAdmin ? { 'Authorization': `Bearer ${localStorage.getItem('token')}` } : {}
        });
        if (!res.ok) {
          throw new Error('Failed to fetch content');
        }
        const data = await res.json();
        setHomeContent(data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchContent();
  }, [isAdmin]);

  const handleContentChange = async (section, field, value) => {
    setHomeContent(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));

    if (isAdmin) {
      try {
        const res = await fetch('/api/content/update', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify({ section, field, value })
        });
        if (!res.ok) {
          throw new Error('Failed to save draft');
        }
      } catch (err) {
        alert(err.message);
      }
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
    </div>;
  }

  return (
    <div className="bg-gray-50">
      <HeroBanner
        isAdmin={isAdmin}
        heroData={homeContent?.heroBanner}
        onChange={handleContentChange}
      />

      <div className="container px-6 py-12 grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-[1400px] mx-auto">
        <div className="lg:col-span-2 space-y-12">
          {/* Latest News Grid */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="relative"
          >
            {isAdmin && (
              <button className="absolute top-0 right-0 z-50 bg-white/90 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg flex items-center gap-2 text-sm font-medium">
                <FaEdit /> Edit
              </button>
            )}

            <div className="flex justify-between items-center mb-14">
              <h2 className="text-4xl font-bold uppercase">
                Latest News{" "}
                <span className="block w-24 h-1 mt-4 bg-gradient-to-r from-pink-500 to-yellow-400 rounded-full"></span>
              </h2>

              <a
                href="#"
                className="text-indigo-600 hover:underline font-medium flex items-center gap-2"
              >
                View All <FaArrowRight className="text-sm" />
              </a>
            </div>
            
            <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {homeContent?.latestNews?.map((news, i) => (
                <motion.article
                  key={`news-article-${i}`}
                  variants={fadeInUp}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl relative"
                >
                  {isAdmin && (
                    <button className="absolute top-2 right-2 z-50 bg-white/90 hover:bg-white text-gray-800 p-1 rounded-full shadow-lg flex items-center gap-1 text-xs font-medium">
                      <FaEdit size={12} />
                    </button>
                  )}

                  <div className="relative overflow-hidden h-48">
                    <img
                      src={news.imageUrl}
                      alt={news.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                      <span className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                        {news.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-xl mb-3 hover:text-indigo-600 transition-colors">
                      {news.title}
                    </h3>
                    <p className="text-gray-600 mb-4">{news.description}</p>
                    <div className="flex justify-between items-center text-sm text-gray-500">
                      <span>By {news.author}</span>
                      <span>{new Date(news.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </motion.section>

          {/* Featured Articles */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="relative"
          >
            {isAdmin && (
              <button className="absolute top-0 right-0 z-50 bg-white/90 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg flex items-center gap-2 text-sm font-medium">
                <FaEdit /> Edit
              </button>
            )}
            
            <div className="flex justify-between items-center mb-14">
              <h2 className="text-4xl font-bold uppercase">
                Featured Articles{" "}
                <span className="block w-24 h-1 mt-4 bg-gradient-to-r from-pink-500 to-yellow-400 rounded-full"></span>
              </h2>
              <a href="#" className="text-indigo-600 hover:underline font-medium flex items-center gap-2">
                View All <FaArrowRight className="text-sm" />
              </a>
            </div>
            
            <motion.div className="space-y-8">
              {homeContent?.featuredArticles?.map((article, i) => (
                <motion.article
                  key={i}
                  variants={fadeInUp}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl relative"
                >
                  {isAdmin && (
                    <button className="absolute top-2 right-2 z-50 bg-white/90 hover:bg-white text-gray-800 p-1 rounded-full shadow-lg flex items-center gap-1 text-xs font-medium">
                      <FaEdit size={12} />
                    </button>
                  )}
                  
                  <div className="md:flex">
                    <div className="md:w-1/3 relative overflow-hidden">
                      <img
                        src={article.imageUrl}
                        alt={article.title}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                    </div>
                    <div className="md:w-2/3 p-8">
                      <div className="flex items-center mb-4">
                        <span className="bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-800 px-3 py-1 rounded-full text-xs font-medium mr-3">
                          Featured
                        </span>
                        <span className="text-gray-500 text-sm">
                          {new Date(article.date).toLocaleDateString()}
                        </span>
                      </div>
                      <h3 className="font-bold text-2xl mb-4 hover:text-indigo-600 transition-colors">
                        {article.title}
                      </h3>
                      <p className="text-gray-700 mb-6">{article.summary}</p>
                      <div className="flex justify-between items-center">
                        <a href="#" className="text-indigo-600 font-semibold hover:underline flex items-center gap-2">
                          Read More
                          <FaArrowRight className="text-sm" />
                        </a>
                        <span className="text-gray-500 text-sm">{article.readTime} min read</span>
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </motion.section>

          {/* Photo Gallery */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="relative"
          >
            {isAdmin && (
              <button className="absolute top-0 right-0 z-50 bg-white/90 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg flex items-center gap-2 text-sm font-medium">
                <FaEdit /> Edit
              </button>
            )}
            
            <div className="flex justify-between items-center mb-14">
              <h2 className="text-4xl font-bold uppercase">
                Photo Gallery{" "}
                <span className="block w-24 h-1 mt-4 bg-gradient-to-r from-pink-500 to-yellow-400 rounded-full"></span>
              </h2>
              <a href="#" className="text-indigo-600 hover:underline font-medium flex items-center gap-2">
                View All <FaArrowRight className="text-sm" />
              </a>
            </div>
            
            <motion.div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {homeContent?.photoGallery?.map((photo, i) => (
                <motion.div
                  key={i}
                  variants={fadeInUp}
                  whileHover={{ scale: 1.05 }}
                  className="relative rounded-lg overflow-hidden shadow-md cursor-pointer group"
                >
                  {isAdmin && (
                    <button className="absolute top-1 right-1 z-50 bg-white/90 hover:bg-white text-gray-800 p-1 rounded-full shadow-lg flex items-center gap-1 text-xs font-medium">
                      <FaEdit size={10} />
                    </button>
                  )}
                  
                  <img
                    src={photo.imageUrl}
                    alt={photo.caption || `Photo ${i + 1}`}
                    className="w-full h-32 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.section>
        </div>

        {/* Right Column */}
        <div className="space-y-12">
          {/* Weather Widget */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="bg-gradient-to-br from-teal-600 to-cyan-600 rounded-2xl p-6 shadow-xl text-white relative"
          >
            {isAdmin && (
              <button className="absolute top-2 right-2 z-50 bg-white/90 hover:bg-white text-gray-800 p-1 rounded-full shadow-lg flex items-center gap-1 text-xs font-medium">
                <FaEdit size={12} /> Edit
              </button>
            )}
            
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold flex items-center gap-3">
                <FaCloudSun className="text-yellow-300" /> Weather
              </h2>
              <span className="text-sm">Updated just now</span>
            </div>
            
            <div className="flex justify-between items-center mb-6">
              <div>
                <p className="text-2xl font-bold">{homeContent?.weather?.location || "San Diego, CA"}</p>
                <p className="text-gray-200">{homeContent?.weather?.condition || "Sunny with clear skies"}</p>
              </div>
              <div className="text-5xl font-bold">{homeContent?.weather?.temperature || "72"}°F</div>
            </div>
            
            <div className="grid grid-cols-4 gap-4 text-center text-sm">
              {homeContent?.weather?.forecast?.map((day, i) => (
                <div key={i} className="flex flex-col items-center">
                  <p className="font-medium">{day.day}</p>
                  <div className="my-2">
                    <FaCloudSun className="text-yellow-300 mx-auto" />
                  </div>
                  <p className="font-bold">{day.temp}°F</p>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Stock Market Updates */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="bg-white rounded-2xl shadow-md p-6 relative"
          >
            {isAdmin && (
              <button className="absolute top-2 right-2 z-50 bg-white/90 hover:bg-white text-gray-800 p-1 rounded-full shadow-lg flex items-center gap-1 text-xs font-medium">
                <FaEdit size={12} /> Edit
              </button>
            )}
            
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold flex items-center gap-3">
                <FaChartLine className="text-indigo-600" /> Market Watch
              </h2>
              <span className="text-sm text-gray-500">Live</span>
            </div>
            
            <div className="space-y-4">
              {homeContent?.marketData?.map((stock, i) => (
                <div key={i} className="flex justify-between items-center">
                  <div>
                    <p className="font-bold">{stock.symbol}</p>
                    <p className="text-sm text-gray-500">{stock.price}</p>
                  </div>
                  <span className={`font-semibold ${stock.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                    {stock.change}
                  </span>
                </div>
              ))}
            </div>
            
            <button className="w-full mt-6 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 font-medium py-2 px-4 rounded-lg transition">
              View All Markets
            </button>
          </motion.section>

          {/* Newsletter Signup */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="bg-gradient-to-br from-purple-600 to-indigo-600 rounded-2xl p-6 shadow-xl text-white relative"
          >
            {isAdmin && (
              <button className="absolute top-2 right-2 z-50 bg-white/90 hover:bg-white text-gray-800 p-1 rounded-full shadow-lg flex items-center gap-1 text-xs font-medium">
                <FaEdit size={12} /> Edit
              </button>
            )}
            
            <div className="text-center mb-6">
              <FaEnvelope className="text-white text-3xl mx-auto mb-3" />
              <h2 className="text-xl font-bold mb-2">Daily News Digest</h2>
              <p className="text-white/80">Get the top stories delivered to your inbox every morning</p>
            </div>
            
            <form className="space-y-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button
                type="submit"
                className="w-full bg-white text-indigo-600 font-semibold py-3 px-4 rounded-lg hover:bg-gray-100 transition flex items-center justify-center gap-2"
              >
                Subscribe Now
                <FaArrowRight className="text-sm" />
              </button>
            </form>
            
            <p className="text-xs text-white/60 mt-4 text-center">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </motion.section>

          {/* Trending Topics */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="bg-white rounded-2xl shadow-md p-6 relative"
          >
            {isAdmin && (
              <button className="absolute top-2 right-2 z-50 bg-white/90 hover:bg-white text-gray-800 p-1 rounded-full shadow-lg flex items-center gap-1 text-xs font-medium">
                <FaEdit size={12} /> Edit
              </button>
            )}
            
            <h2 className="text-xl font-bold mb-6">Trending Topics</h2>
            
            <div className="flex flex-wrap gap-3">
              {homeContent?.trendingTopics?.map((topic, i) => (
                <a
                  key={i}
                  href="#"
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-800 font-medium text-sm transition"
                >
                  #{topic}
                </a>
              ))}
            </div>
          </motion.section>
        </div>
      </div>

      <VideoNewsSection isAdmin={isAdmin} />
    </div>
  );
};

export default Home;