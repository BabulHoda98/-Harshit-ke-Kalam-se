import React from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { motion } from 'framer-motion';

export const HeroBanner = ({ heroBanner }) => (
  <section className="relative h-screen flex items-center justify-center bg-gradient-to-r from-blue-800 to-purple-700 text-white">
    <div className="container mx-auto px-6 text-center">
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-5xl md:text-6xl font-bold mb-6"
      >
        {heroBanner.title}
      </motion.h1>
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto"
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
);

// Additional components for other sections can be added here similarly
