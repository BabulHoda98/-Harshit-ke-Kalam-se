// About.jsx
import React from 'react';
import { FaUsers, FaLightbulb, FaChartLine, FaGlobeAmericas } from 'react-icons/fa';
import { motion } from 'framer-motion';

const About = () => {
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

  const teamMembers = [
    {
      id: 1,
      name: "John Doe",
      role: "CEO & Founder",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      bio: "Visionary leader with 15+ years in media innovation."
    },
    {
      id: 2,
      name: "Jane Smith",
      role: "Editor-in-Chief",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      bio: "Award-winning journalist with a passion for truth."
    },
    {
      id: 3,
      name: "Mike Johnson",
      role: "CTO",
      image: "https://randomuser.me/api/portraits/men/75.jpg",
      bio: "Tech expert driving our digital transformation."
    }
  ];

  const stats = [
    { value: "10M+", label: "Monthly Readers", icon: <FaUsers className="text-3xl" /> },
    { value: "50+", label: "Awards Won", icon: <FaLightbulb className="text-3xl" /> },
    { value: "200+", label: "Team Members", icon: <FaChartLine className="text-3xl" /> },
    { value: "100+", label: "Countries Reached", icon: <FaGlobeAmericas className="text-3xl" /> }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto mb-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-center"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">Our Story</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Delivering trusted news and insights to empower our global community since 2010.
          </p>
        </motion.div>
      </div>

      {/* Mission Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="max-w-7xl mx-auto mb-20"
      >
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-12">
              <motion.h2 variants={fadeInUp} className="text-3xl font-bold text-gray-900 mb-6">
                Our Mission
              </motion.h2>
              <motion.p variants={fadeInUp} className="text-gray-600 mb-6">
                We believe in the power of information to transform lives. Our mission is to deliver accurate, unbiased news that helps people make informed decisions about their lives, communities, and the world.
              </motion.p>
              <motion.p variants={fadeInUp} className="text-gray-600">
                Founded in 2010, we've grown from a small local news outlet to an internationally recognized media platform, without ever compromising our commitment to journalistic integrity.
              </motion.p>
            </div>
            <div className="bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center p-12">
              <motion.div
                variants={fadeInUp}
                className="text-white text-center"
              >
                <blockquote className="text-2xl font-medium mb-6">
                  "Truth is the foundation of all knowledge and the cement of all societies."
                </blockquote>
                <p className="text-blue-200">— Our Founding Principle</p>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Stats Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="max-w-7xl mx-auto mb-20"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl shadow-lg p-8 text-center"
            >
              <div className="text-blue-600 mb-4 flex justify-center">
                {stat.icon}
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</h3>
              <p className="text-gray-600">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Team Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="max-w-7xl mx-auto mb-20"
      >
        <div className="text-center mb-12">
          <motion.h2 variants={fadeInUp} className="text-3xl font-bold text-gray-900 mb-4">
            Meet Our Team
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-xl text-gray-600 max-w-2xl mx-auto">
            The passionate professionals behind our award-winning journalism
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teamMembers.map((member, i) => (
            <motion.div
              key={member.id}
              variants={fadeInUp}
              whileHover={{ y: -10 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <div className="h-64 overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-blue-600 mb-4">{member.role}</p>
                <p className="text-gray-600">{member.bio}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Values Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="max-w-7xl mx-auto"
      >
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl shadow-xl p-12 text-white">
          <motion.h2 variants={fadeInUp} className="text-3xl font-bold mb-8 text-center">
            Our Core Values
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Integrity",
                description: "We adhere to the highest ethical standards in all our reporting."
              },
              {
                title: "Accuracy",
                description: "Every fact is verified, every source is vetted."
              },
              {
                title: "Impact",
                description: "We focus on stories that matter to our communities."
              }
            ].map((value, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                className="bg-white/10 backdrop-blur-sm p-6 rounded-lg"
              >
                <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                <p className="text-blue-100">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default About;