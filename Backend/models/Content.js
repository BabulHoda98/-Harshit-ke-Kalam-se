const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
  heroBanner: {
    title: String,
    subtitle: String,
    button1Text: String,
    button2Text: String,
    images: [String]
  },
  latestNews: [{
    image: String,
    category: String,
    title: String,
    description: String,
    author: String,
    date: String,
    location: String,
    time: String,
    views: Number,
    link: String
  }],
  featuredArticles: [{
    image: String,
    title: String,
    description: String,
    date: String,
    readTime: String,
    videoId: String
  }],
  photoGallery: {
    title: String,
    photos: [{
      url: String,
      alt: String
    }]
  },
  popularTags: [String],
  newsletter: {
    title: String,
    description: String
  },
  videoNews: {
    title: String,
    videos: [String]
  },
  localNews: {
    title: String,
    articles: [{
      image: String,
      title: String,
      description: String,
      author: String,
      date: String
    }]
  },
  marqueeItems: [String],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Middleware to update updatedAt timestamp
contentSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

module.exports = mongoose.model('Content', contentSchema);
