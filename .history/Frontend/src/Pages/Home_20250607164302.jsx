import React from 'react'
import { motion } from 'framer-motion'
import { 
  FaNewspaper, FaChartLine, FaLaptopCode, FaUsers, FaCloudSun, FaVideo, 
  FaTags, FaMapMarkerAlt, FaCalendarAlt, FaEnvelope, FaArrowRight 
} from 'react-icons/fa'

const staggerContainer = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.1 } }
}

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

const Home = () => {
  return (
    <div>
      {/* 11. Categories Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
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
                variants={fadeInUp}
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
        variants={staggerContainer}
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
              variants={fadeInUp}
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
  )
}

export default Home
