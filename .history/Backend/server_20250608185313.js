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
  button2Text: String,
  images: [String]
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
  // Removed browseByCategoryTitle and categories as per request
  localNewsTitle: String,
  localNewsArticles: [latestNewsArticleSchema],
  marqueeItems: [String],
  version: { type: Number, default: 1 },
  createdAt: { type: Date, default: Date.now }
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
  if (!token) return res.sendStatus(401);

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

app.get('/api/customization', async (req, res) => {
  try {
    // Fetch the latest version
    let customization = await Customization.findOne().sort({ version: -1 });
    if (!customization) {
      // Create default customization if none exists
      customization = new Customization({
        siteTitle: 'NewsBihar 24/7',
        footerLinks: [
          { name: 'Home', url: '/' },
          { name: 'About', url: '/aboutus' },
          { name: 'Contact', url: '/contact' }
        ],
        heroBanner: {
          title: 'Welcome to Our News Portal',
          subtitle: 'Stay updated with the latest news, articles, and videos from around the world',
          button1Text: 'Read Latest News',
          button2Text: 'Watch Videos'
        },
        latestNewsTitle: 'Latest News',
        latestNewsArticles: [],
        featuredArticlesTitle: 'Featured Articles',
        featuredArticles: [],
        photoGalleryTitle: 'Photo Gallery',
        galleryPhotos: [],
        popularTags: ['Politics', 'Technology', 'Sports', 'Health', 'Finance'],
        newsletterTitle: 'Newsletter',
        newsletterDescription: 'Stay updated with our latest news and articles',
        videoNewsTitle: 'Video News',
        videos: [],
        browseByCategoryTitle: 'Browse by Category',
        categories: [],
        localNewsTitle: 'Local News',
        localNewsArticles: []
      });
      await customization.save();
    }
    res.json(customization);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching customization data' });
  }
});

app.post('/api/admin/customization', authenticateToken, async (req, res) => {
  try {
    // Find the latest version number
    const latestCustomization = await Customization.findOne().sort({ version: -1 });
    const newVersion = latestCustomization ? latestCustomization.version + 1 : 1;

    const {
      siteTitle,
      footerLinks,
      heroBanner,
      latestNewsTitle,
      latestNewsArticles,
      featuredArticlesTitle,
      featuredArticles,
      photoGalleryTitle,
      galleryPhotos,
      popularTags,
      newsletterTitle,
      newsletterDescription,
      videoNewsTitle,
      videos,
      browseByCategoryTitle,
      categories,
      localNewsTitle,
      localNewsArticles,
      marqueeItems
    } = req.body;

    // Create a new customization document with incremented version
    const newCustomization = new Customization({
      siteTitle,
      footerLinks,
      heroBanner,
      latestNewsTitle,
      latestNewsArticles,
      featuredArticlesTitle,
      featuredArticles,
      photoGalleryTitle,
      galleryPhotos,
      popularTags,
      newsletterTitle,
      newsletterDescription,
      videoNewsTitle,
      videos,
      browseByCategoryTitle,
      categories,
      localNewsTitle,
      localNewsArticles,
      marqueeItems,
      version: newVersion,
      createdAt: new Date()
    });

    await newCustomization.save();
    res.json({ message: 'Customization saved as new version', version: newVersion });
  } catch (error) {
    console.error('Error saving new customization version:', error);
    res.status(500).json({ message: 'Error saving new customization version' });
  }
});

app.get('/', (req, res) => {
  res.send('NewsBihar API is running.');
});

app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
