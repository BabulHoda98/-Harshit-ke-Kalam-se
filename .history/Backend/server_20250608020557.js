require('dotenv').config();
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;
const SECRET_KEY = process.env.JWT_SECRET;

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use(cors());
app.use(bodyParser.json());

// Hardcoded admin credentials (for demo purposes)
const adminUser = {
  username: 'admin',
  password: 'admin123' // In production, use hashed passwords and a database
};

// Define Mongoose schemas for homepage sections
const heroBannerSchema = new mongoose.Schema({
  title: String,
  subtitle: String,
  button1Text: String,
  button2Text: String
});

const latestNewsArticleSchema = new mongoose.Schema({
  image: String,
  category: String,
  title: String,
  description: String,
  author: String,
  date: String
});

const featuredArticleSchema = new mongoose.Schema({
  image: String,
  title: String,
  description: String,
  date: String,
  readTime: String
});

const galleryPhotoSchema = new mongoose.Schema({
  url: String,
  alt: String
});

const customizationSchema = new mongoose.Schema({
  siteTitle: String,
  footerLinks: [{ name: String, url: String }],
  heroBanner: heroBannerSchema,
  latestNewsTitle: String,
  latestNewsArticles: [latestNewsArticleSchema],
  featuredArticlesTitle: String,
  featuredArticles: [featuredArticleSchema],
  photoGalleryTitle: String,
  galleryPhotos: [galleryPhotoSchema],
  popularTags: [String],
  newsletterTitle: String,
  newsletterDescription: String,
  videoNewsTitle: String,
  videos: [String],
  browseByCategoryTitle: String,
  categories: [{ name: String, icon: String, color: String }],
  localNewsTitle: String,
  localNewsArticles: [latestNewsArticleSchema]
});

const Customization = mongoose.model('Customization', customizationSchema);

// Admin login endpoint
app.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body;
  if (username === adminUser.username && password === adminUser.password) {
    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

// Middleware to verify JWT token
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
