import React, { useEffect, useState } from 'react';
import { FaVideo, FaNewspaper, FaArrowDown,FaCloudSun, FaChartLine, FaCalendarAlt, FaEnvelope, FaTags, FaMapMarkerAlt, FaLaptopCode, FaUsers, FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

const Home = () => {
  const [latestNewsArticles, setLatestNewsArticles] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/admin/customization')
      .then(res => res.json())
      .then(data => {
        if (data.latestNewsArticles) {
          setLatestNewsArticles(data.latestNewsArticles);
        }
      })
      .catch(err => {
        console.error('Failed to fetch latest news articles:', err);
      });
  }, []);

  return (
    <div className="bg-gray-50">
      {/* Hero Banner Section */}
      <section className="relative h-screen flex items-center justify-center bg-gradient-to-r from-blue-800 to-purple-700 text-white">
        <div className="container mx-auto px-6 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-bold mb-6"
          >
            Welcome to Our News Portal
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto"
          >
            Stay updated with the latest news, articles, and videos from around the world
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <button className="bg-white text-blue-800 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors">
              Read Latest News
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white/10 transition-colors">
              Watch Videos
            </button>
          </motion.div>
        </div>
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
          <FaArrowDown className="animate-bounce text-2xl" />
        </div>
      </section>

      {/* Main Content Container */}
      <div className="container px-6 py-12 grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-[1400px] mx-auto">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-12">
          {/* Latest News Grid */}
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
                      {article.description}
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

          {/* Featured Articles */}
          {/* ... keep existing Featured Articles, Photo Gallery, etc. unchanged for now ... */}

        </div>

        {/* Right Column - Sidebar */}
        {/* ... keep existing sidebar unchanged ... */}

      </div>

      {/* Video News Section */}
      {/* ... keep existing VideoNewsSection unchanged ... */}

    </div>
  );
};

export default Home;
