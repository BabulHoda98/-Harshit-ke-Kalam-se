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
      
    </div>
  )
}

export default Home
