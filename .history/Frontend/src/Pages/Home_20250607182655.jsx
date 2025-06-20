import React from 'react';
import { FaVideo, FaNewspaper, FaArrowDown,FaCloudSun, FaChartLine, FaCalendarAlt, FaEnvelope, FaTags, FaMapMarkerAlt, FaLaptopCode, FaUsers, FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

const Home = () => {
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
              {[...Array(4)].map((_, i) => (
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
                      src={`https://source.unsplash.com/random/600x400?news=${i}`}
                      alt="News thumbnail"
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                      <span className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                        {['Politics', 'Technology', 'Sports', 'Health'][i]}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-xl mb-3 hover:text-indigo-600 transition-colors">
                      {[
                        'Global Summit Addresses Climate Change Concerns',
                        'New Tech Breakthrough Promises Faster Internet',
                        'National Team Advances to Championship Finals',
                        'Study Reveals Benefits of Mediterranean Diet'
                      ][i]}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {[
                        'World leaders gathered to discuss urgent climate action plans and set new emission targets.',
                        'Researchers developed a revolutionary quantum communication method that could transform data transfer.',
                        'In a stunning victory, the national team secured their spot in the finals after a decade.',
                        'New research confirms significant health improvements for those following Mediterranean eating patterns.'
                      ][i]}
                    </p>
                    <div className="flex justify-between items-center text-sm text-gray-500">
                      <span>By {['Jane Smith', 'Mike Johnson', 'Sarah Williams', 'Dr. Robert Chen'][i]}</span>
                      <span>{new Date().toLocaleDateString()}</span>
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
              <h2 className="text-4xl font-bold uppercase">Featured Articles <span className="block w-24 h-1 mt-4 bg-gradient-to-r from-pink-500 to-yellow-400 rounded-full"></span></h2>
              <a href="#" className="text-indigo-600 hover:underline font-medium flex items-center gap-2">
                View All <FaArrowRight className="text-sm" />
              </a>
            </div>
            <motion.div className="space-y-8">
              {[...Array(2)].map((_, i) => (
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
                        src={`https://source.unsplash.com/random/600x400?featured=${i}`}
                        alt="Featured article"
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                    </div>
                    <div className="md:w-2/3 p-8">
                      <div className="flex items-center mb-4">
                        <span className="bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-800 px-3 py-1 rounded-full text-xs font-medium mr-3">Featured</span>
                        <span className="text-gray-500 text-sm">{new Date().toLocaleDateString()}</span>
                      </div>
                      <h3 className="font-bold text-2xl mb-4 hover:text-indigo-600 transition-colors">
                        {[
                          'The Future of Renewable Energy: What to Expect in the Next Decade',
                          'Urban Development and Its Impact on Community Well-being'
                        ][i]}
                      </h3>
                      <p className="text-gray-700 mb-6">
                        {[
                          'Exploring the rapid advancements in solar, wind, and other renewable technologies that are set to transform our energy landscape in the coming years.',
                          'How city planning and infrastructure projects affect social connections, mental health, and overall quality of life for residents.'
                        ][i]}
                      </p>
                      <div className="flex justify-between items-center">
                        <a href="#" className="text-indigo-600 font-semibold hover:underline flex items-center gap-2">
                          Read More
                          <FaArrowRight className="ml-2 text-sm" />
                        </a>
                        <span className="text-gray-500 text-sm">5 min read</span>
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
              <h2 className="text-4xl font-bold uppercase">Photo Gallery <span className="block w-24 h-1 mt-4 bg-gradient-to-r from-pink-500 to-yellow-400 rounded-full"></span></h2>
              <a href="#" className="text-indigo-600 hover:underline font-medium flex items-center gap-2">
                View All <FaArrowRight className="text-sm" />
              </a>
            </div>
            <motion.div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[...Array(8)].map((_, i) => (
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
                    src={`https://source.unsplash.com/random/300x200?gallery=${i}`}
                    alt="Gallery photo"
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

        {/* Right Column - Sidebar */}
        <div className="space-y-8">
          {/* Popular Tags */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white p-6 rounded-xl shadow-md"
          >
            <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
              <FaTags className="text-indigo-600" /> Popular Tags
            </h3>
            <div className="flex flex-wrap gap-2">
              {['Politics', 'Technology', 'Sports', 'Health', 'Finance', 'Entertainment', 'Science', 'Travel', 'Food', 'Education'].map((tag, i) => (
                <a 
                  key={i} 
                  href="#" 
                  className="px-3 py-1 bg-gray-100 hover:bg-indigo-100 text-gray-800 hover:text-indigo-800 rounded-full text-sm transition-colors"
                >
                  {tag}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Newsletter */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 rounded-xl shadow-md text-white"
          >
            <h3 className="font-bold text-xl mb-2 flex items-center gap-2">
              <FaEnvelope /> Newsletter
            </h3>
            <p className="mb-4 text-indigo-100">Stay updated with our latest news and articles</p>
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
        </div>
      </div>

      {/* Video News Section */}
      <VideoNewsSection />
    </div>
  );
};

// Video News Component
const VideoNewsSection = () => {
  const videos = [
    "https://www.youtube.com/embed/dQw4w9WgXcQ",
    "https://www.youtube.com/embed/oHg5SJYRHA0",
    "https://www.youtube.com/embed/Zi_XLOBDo_Y",
    "https://www.youtube.com/embed/9bZkp7q19f0",
    "https://www.youtube.com/embed/fLexgOxsZu0",
  ];

  const [currentSlide, setCurrentSlide] = React.useState(0);
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
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="py-16 px-6 container max-w-[1400px] mx-auto"
    >
      {/* Header */}
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

      {/* Slider */}
      <div className="relative">
        <div ref={sliderRef} className="keen-slider">
          {videos.map((url, i) => (
            <motion.div
              key={i}
              className="keen-slider__slide"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
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
                    {[
                      'Global Economic Forum Highlights',
                      'Tech Conference Keynote Speech',
                      'Sports Championship Highlights',
                      'Cultural Festival Celebrations',
                      'Scientific Discovery Announcement'
                    ][i]}
                  </h3>
                </div>
              </div>
            </motion.div>
          ))}
          
        </div>
        
        <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="bg-gray-100 py-16"
      >
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Browse by Category</h2>
          <motion.div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
            {[
              { name: "Politics", icon: <FaNewspaper className="text-2xl" />, color: "bg-red-100 text-red-600" },
              { name: "Business", icon: <FaChartLine className="text-2xl" />, color: "bg-blue-100 text-blue-600" },
              { name: "Technology", icon: <FaLaptopCode className="text-2xl" />, color: "bg-purple-100 text-purple-600" },
              { name: "Sports", icon: <FaUsers className="text-2xl" />, color: "bg-green-100 text-green-600" },
              { name: "Health", icon: <FaCloudSun className="text-2xl" />, color: "bg-teal-100 text-teal-600" },
              { name: "Entertainment", icon: <FaVideo className="text-2xl" />, color: "bg-yellow-100 text-yellow-600" },
              { name: "Science", icon: <FaTags className="text-2xl" />, color: "bg-indigo-100 text-indigo-600" },
              { name: "Travel", icon: <FaMapMarkerAlt className="text-2xl" />, color: "bg-orange-100 text-orange-600" },
              { name: "Education", icon: <FaCalendarAlt className="text-2xl" />, color: "bg-pink-100 text-pink-600" },
              { name: "Art", icon: <FaEnvelope className="text-2xl" />, color: "bg-amber-100 text-amber-600" }
            ].map((category, i) => (
              <motion.a
                key={i}
                whileHover={{ y: -5 }}
                href="#"
                className={`${category.color} rounded-xl p-6 flex flex-col items-center justify-center shadow-md hover:shadow-lg transition-all`}
              >
                <div className="mb-3">{category.icon}</div>
                <h3 className="font-bold">{category.name}</h3>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* 12. Local News Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="container mx-auto px-6 py-16"
      >
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold flex items-center gap-3">
            <FaMapMarkerAlt className="text-blue-600" /> Local News
          </h2>
          <a href="#" className="text-blue-600 hover:underline font-medium flex items-center gap-2">
            View All <FaArrowRight className="text-sm" />
          </a>
        </div>
        <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[...Array(3)].map((_, i) => (
            <motion.article 
              key={i}
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl"
            >
              <div className="relative overflow-hidden h-48">
                <img
                  src={`https://source.unsplash.com/random/600x400?local=${i}`}
                  alt={`Local News ${i + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium">Local</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-xl mb-3 hover:text-blue-600 transition-colors">Local News Title {i + 1}</h3>
                <p className="text-gray-600 mb-4">Community updates and stories from your neighborhood affecting local residents.</p>
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>By Local Reporter</span>
                  <span>{new Date().toLocaleDateString()}</span>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </motion.section>

      </div>
    </motion.section>
    
  );
};

export default Home;