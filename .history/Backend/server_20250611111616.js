require('dotenv').config();
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;
const SECRET_KEY = process.env.JWT_SECRET;

const FRONTEND_URL = 'Fetch error: <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Page not found</title>
    <style>
      :root {
        --colorRgbFacetsTeal600: 2 128 125;
        --colorTealAction: var(--colorRgbFacetsTeal600);
        --colorRgbFacetsNeutralLight200: 233 235 237;
        --colorHr: var(--colorRgbFacetsNeutralLight200);
        --colorRgbFacetsNeutralLight700: 53 58 62;
        --colorGrayDarkest: var(--colorRgbFacetsNeutralLight700);
        --colorGrayLighter: var(--colorRgbFacetsNeutralLight200);
        --colorText: var(--colorGrayDarkest);
        --effectShadowLightShallow: 0 1px 10px 0 rgb(53 58 62 / 6%),
          0 2px 4px 0 rgb(53 58 62 / 8%);
        --colorRgbFacetsNeutralDark900: 6 11 16;
      }
      body {
        font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
          Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji",
          "Segoe UI Emoji", "Segoe UI Symbol";
        background: white;
        overflow: hidden;
        margin: 0;
        padding: 0;
        line-height: 1.5;
        color: rgb(var(--colorText));
      }

      @media (prefers-color-scheme: dark) {
        body {
          background: rgb(var(--colorRgbFacetsNeutralDark900));
        }
      }

      h1 {
        margin: 0;
        font-size: 1.375rem;
        line-height: 1;
      }

      h1 + p {
        margin-top: 8px;
      }

      .main {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100vh;
        width: 100vw;
      }

      .card {
        position: relative;
        width: 75%;
        max-width: 364px;
        padding: 24px;
        background: white;
        border-radius: 8px;
        box-shadow: var(--effectShadowLightShallow);
        border: 1px solid rgb(var(--colorGrayLighter));
      }

      a {
        margin: 0;
        font-weight: 600;
        color: rgb(var(--colorTealAction));
        text-decoration-skip-ink: all;
        text-decoration-thickness: 1px;
        text-underline-offset: 2px;
        text-decoration-color: rgb(var(--colorTealAction) / 0.5);
        transition: text-decoration-color 0.15s ease-in-out;
      }

      a:hover,
      a:focus-visible {
        text-decoration-color: rgb(var(--colorTealAction));
      }

      p:last-of-type {
        margin-bottom: 0;
      }

      hr {
        border: 0;
        height: 1px;
        background: rgb(var(--colorHr));
        margin-top: 16px;
        margin-bottom: 16px;
      }

      .your-site {
        font-size: 0.875rem;
      }
    </style>
  </head>
  <body>
    <div class="main">
      <div class="card">
        <h1>Page not found</h1>
        <p>
          Looks like you’ve followed a broken link or entered a URL that doesn’t
          exist on this site.
        </p>
        <hr />
        <p class="your-site">
          If this is your site, and you weren’t expecting a 404 for this path,
          please visit Netlify’s
          <a
            href="https://answers.netlify.com/t/support-guide-i-ve-deployed-my-site-but-i-still-see-page-not-found/125?utm_source=404page&utm_campaign=community_tracking"
            >“page not found” support guide</a
          >
          for troubleshooting tips.
        </p>
      </div>
    </div>
  </body>
</html>

overrideMethod @ hook.js:608Understand this error
hook.js:608 Failed to fetch customization data: Error: Failed to fetch customization data
    at index-Q-vkZEnx.js:294:178951
overrideMethod @ hook.js:608Understand this error
hook.js:608 Fetch error: <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Page not found</title>
    <style>
      :root {
        --colorRgbFacetsTeal600: 2 128 125;
        --colorTealAction: var(--colorRgbFacetsTeal600);
        --colorRgbFacetsNeutralLight200: 233 235 237;
        --colorHr: var(--colorRgbFacetsNeutralLight200);
        --colorRgbFacetsNeutralLight700: 53 58 62;
        --colorGrayDarkest: var(--colorRgbFacetsNeutralLight700);
        --colorGrayLighter: var(--colorRgbFacetsNeutralLight200);
        --colorText: var(--colorGrayDarkest);
        --effectShadowLightShallow: 0 1px 10px 0 rgb(53 58 62 / 6%),
          0 2px 4px 0 rgb(53 58 62 / 8%);
        --colorRgbFacetsNeutralDark900: 6 11 16;
      }
      body {
        font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
          Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji",
          "Segoe UI Emoji", "Segoe UI Symbol";
        background: white;
        overflow: hidden;
        margin: 0;
        padding: 0;
        line-height: 1.5;
        color: rgb(var(--colorText));
      }

      @media (prefers-color-scheme: dark) {
        body {
          background: rgb(var(--colorRgbFacetsNeutralDark900));
        }
      }

      h1 {
        margin: 0;
        font-size: 1.375rem;
        line-height: 1;
      }

      h1 + p {
        margin-top: 8px;
      }

      .main {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100vh;
        width: 100vw;
      }

      .card {
        position: relative;
        width: 75%;
        max-width: 364px;
        padding: 24px;
        background: white;
        border-radius: 8px;
        box-shadow: var(--effectShadowLightShallow);
        border: 1px solid rgb(var(--colorGrayLighter));
      }

      a {
        margin: 0;
        font-weight: 600;
        color: rgb(var(--colorTealAction));
        text-decoration-skip-ink: all;
        text-decoration-thickness: 1px;
        text-underline-offset: 2px;
        text-decoration-color: rgb(var(--colorTealAction) / 0.5);
        transition: text-decoration-color 0.15s ease-in-out;
      }

      a:hover,
      a:focus-visible {
        text-decoration-color: rgb(var(--colorTealAction));
      }

      p:last-of-type {
        margin-bottom: 0;
      }

      hr {
        border: 0;
        height: 1px;
        background: rgb(var(--colorHr));
        margin-top: 16px;
        margin-bottom: 16px;
      }

      .your-site {
        font-size: 0.875rem;
      }
    </style>
  </head>
  <body>
    <div class="main">
      <div class="card">
        <h1>Page not found</h1>
        <p>
          Looks like you’ve followed a broken link or entered a URL that doesn’t
          exist on this site.
        </p>
        <hr />
        <p class="your-site">
          If this is your site, and you weren’t expecting a 404 for this path,
          please visit Netlify’s
          <a
            href="https://answers.netlify.com/t/support-guide-i-ve-deployed-my-site-but-i-still-see-page-not-found/125?utm_source=404page&utm_campaign=community_tracking"
            >“page not found” support guide</a
          >
          for troubleshooting tips.
        </p>
      </div>
    </div>
  </body>
</html>

overrideMethod @ hook.js:608Understand this error
hook.js:608 Failed to fetch customization data: Error: Failed to fetch customization data
    at index-Q-vkZEnx.js:294:178951
overrideMethod @ hook.js:608Understand this error
hook.js:608 Error fetching customization: TypeError: Failed to fetch
    at window.fetch (frame_ant.js:2:11940)
    at index-Q-vkZEnx.js:294:288347
    at react-stack-bottom-frame (index-Q-vkZEnx.js:260:13563)
    at Oe (index-Q-vkZEnx.js:76:109)
    at Co (index-Q-vkZEnx.js:181:24688)
    at N0 (index-Q-vkZEnx.js:194:1133)
    at M0 (index-Q-vkZEnx.js:194:19625)
    at Cs (index-Q-vkZEnx.js:194:19509)
    at M0 (index-Q-vkZEnx.js:194:20359)
    at Cs (index-Q-vkZEnx.js:194:19509)
overrideMethod @ hook.js:608Understand this error
frame_ant.js:2 
            
            
           
        
       Uncaught (in promise) TypeError: Failed to fetch
    at window.fetch (frame_ant.js:2:11940)
    at index-Q-vkZEnx.js:294:288347
    at react-stack-bottom-frame (index-Q-vkZEnx.js:260:13563)
    at Oe (index-Q-vkZEnx.js:76:109)
    at Co (index-Q-vkZEnx.js:181:24688)
    at N0 (index-Q-vkZEnx.js:194:1133)
    at M0 (index-Q-vkZEnx.js:194:19625)
    at Cs (index-Q-vkZEnx.js:194:19509)
    at M0 (index-Q-vkZEnx.js:194:20359)
    at Cs (index-Q-vkZEnx.js:194:19509)Understand this error
hook.js:608 Error fetching customization: TypeError: Failed to fetch
    at window.fetch (frame_ant.js:2:11940)
    at index-Q-vkZEnx.js:294:288347
    at react-stack-bottom-frame (index-Q-vkZEnx.js:260:13563)
    at Oe (index-Q-vkZEnx.js:76:109)
    at Co (index-Q-vkZEnx.js:181:24688)
    at N0 (index-Q-vkZEnx.js:194:1133)
    at P0 (index-Q-vkZEnx.js:194:20565)
    at Qi (index-Q-vkZEnx.js:194:20451)
    at P0 (index-Q-vkZEnx.js:194:20816)
    at ob (index-Q-vkZEnx.js:207:1136)
overrideMethod @ hook.js:608Understand this error
frame_ant.js:2 
            
            
           
        
       Uncaught (in promise) TypeError: Failed to fetch
    at window.fetch (frame_ant.js:2:11940)
    at index-Q-vkZEnx.js:294:288347
    at react-stack-bottom-frame (index-Q-vkZEnx.js:260:13563)
    at Oe (index-Q-vkZEnx.js:76:109)
    at Co (index-Q-vkZEnx.js:181:24688)
    at N0 (index-Q-vkZEnx.js:194:1133)
    at P0 (index-Q-vkZEnx.js:194:20565)
    at Qi (index-Q-vkZEnx.js:194:20451)
    at P0 (index-Q-vkZEnx.js:194:20816)
    at ob (index-Q-vkZEnx.js:207:1136)';

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use(cors({
  origin: FRONTEND_URL
}));
app.use(bodyParser.json());

const adminUser = {
  username: 'admin',
  password: 'admin123'
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
  localNewsTitle: String,
  localNewsArticles: [latestNewsArticleSchema],
  marqueeItems: [String],

  navbarCategories: [String],
  navbarLogoParts: {
    part1: String, 
    part2: String, 
    part3: String
  },
  footerLogoParts: {
    part1: String,
    part2: String,
    part3: String
  },
  footerDescription: String,
  footerContactInfo: {
    email: String,
    phone: String,
    address: String
  },
  footerQuickLinksCategories: [String],

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
    let customization = await Customization.findOne().sort({ version: -1 });
if (!customization) {
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
          button2Text: 'Watch Videos',
          images: [
            'https://source.unsplash.com/random/1920x1080?news1',
            'https://source.unsplash.com/random/1920x1080?news2',
            'https://source.unsplash.com/random/1920x1080?news3'
          ]
        },
        latestNewsTitle: 'Latest News',
        latestNewsArticles: [
          {
            image: 'https://source.unsplash.com/random/400x300?news1',
            category: 'Politics',
            title: 'Political Update: New Policies Announced',
            description: 'The government has announced new policies aimed at economic growth and social welfare.',
            author: 'John Doe',
            date: '2024-06-01'
          },
          {
            image: 'https://source.unsplash.com/random/400x300?news2',
            category: 'Technology',
            title: 'Tech Innovations in 2024',
            description: 'Latest advancements in AI and robotics are shaping the future of technology.',
            author: 'Jane Smith',
            date: '2024-06-02'
          }
        ],
        featuredArticlesTitle: 'Featured Articles',
        featuredArticles: [
          {
            image: 'https://source.unsplash.com/random/600x400?feature1',
            title: 'In-depth: Climate Change Effects',
            description: 'An extensive look at how climate change is impacting global ecosystems.',
            date: '2024-05-30',
            readTime: '8 min read'
          },
          {
            image: 'https://source.unsplash.com/random/600x400?feature2',
            title: 'Health and Wellness Trends',
            description: 'Exploring the latest trends in health and wellness for a better lifestyle.',
            date: '2024-05-28',
            readTime: '6 min read'
          }
        ],
        photoGalleryTitle: 'Photo Gallery',
        galleryPhotos: [
          { url: 'https://source.unsplash.com/random/400x400?photo1', alt: 'Photo 1' },
          { url: 'https://source.unsplash.com/random/400x400?photo2', alt: 'Photo 2' },
          { url: 'https://source.unsplash.com/random/400x400?photo3', alt: 'Photo 3' }
        ],
        popularTags: ['Politics', 'Technology', 'Sports', 'Health', 'Finance'],
        newsletterTitle: 'Newsletter',
        newsletterDescription: 'Stay updated with our latest news and articles',
        videoNewsTitle: 'Video News',
        videos: [
          'https://www.youtube.com/embed/dQw4w9WgXcQ',
          'https://www.youtube.com/embed/3JZ_D3ELwOQ'
        ],
        browseByCategoryTitle: 'Browse by Category',
        categories: ['Politics', 'Business', 'Technology', 'Sports', 'Health'],
        localNewsTitle: 'Local News',
        localNewsArticles: [
          {
            image: 'https://source.unsplash.com/random/400x300?local1',
            category: 'Local',
            title: 'Community Event Brings Neighbors Together',
            description: 'A recent community event has strengthened neighborhood ties and promoted local culture.',
            author: 'Local Reporter',
            date: '2024-06-03'
          },
          {
            image: 'https://source.unsplash.com/random/400x300?local2',
            category: 'Local',
            title: 'New Park Opens Downtown',
            description: 'The city has opened a new park offering recreational facilities and green space.',
            author: 'City News',
            date: '2024-06-04'
          },
          {
            image: 'https://source.unsplash.com/random/400x300?local3',
            category: 'Local',
            title: 'Local School Wins Award',
            description: 'A local school has been recognized for excellence in education and community service.',
            author: 'Education Desk',
            date: '2024-06-05'
          }
        ]
      });
      await customization.save();
    }
    // Fix malformed JSON by using lean() to get plain JS object and then send JSON
    let customizationObj = await Customization.findOne().sort({ version: -1 }).lean();
    if (!customizationObj) {
      customizationObj = {
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
        localNewsArticles: [],
        marqueeItems: [],
        navbarCategories: ['Home', 'About', 'Contact'],
        navbarLogoParts: { part1: 'News', part2: 'Bihar', part3: '24/7' },
        footerLogoParts: { part1: 'News', part2: 'Bihar', part3: '24/7' },
        footerDescription: 'Delivering the latest news with clarity and speed. Stay informed with breaking news, in-depth analysis, and exclusive stories.',
        footerContactInfo: { email: 'contact@newsbihar247.com', phone: '+91 12345 67890', address: '123 News Street, Bihar, India' },
        footerQuickLinksCategories: ['Home', 'About', 'Contact', 'Advertise'],
        version: 1,
        createdAt: new Date()
      };
    }
    res.json(customizationObj);
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
      marqueeItems,
      navbarCategories,
      navbarLogoParts,
      footerLogoParts,
      footerDescription,
      footerContactInfo,
      footerQuickLinksCategories
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
      navbarCategories,
      navbarLogoParts,
      footerLogoParts,
      footerDescription,
      footerContactInfo,
      footerQuickLinksCategories,
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

app.get('/api/news/category/:category', async (req, res) => {
  try {
    const category = req.params.category;
    // Fetch the latest customization document
    const customization = await Customization.findOne().sort({ version: -1 });
    if (!customization) {
      return res.status(404).json({ message: 'No customization data found' });
    }
    // Filter latestNewsArticles by category (case-insensitive)
    const filteredArticles = (customization.latestNewsArticles || []).filter(article => 
      article.category && article.category.toLowerCase() === category.toLowerCase()
    );
    res.json(filteredArticles);
  } catch (error) {
    console.error('Error fetching news by category:', error);
    res.status(500).json({ message: 'Error fetching news by category' });
  }
});

// Remove static file serving from local frontend dist directory
// const path = require('path');
// const expressStaticMiddleware = express.static(path.join(__dirname, '../Frontend/dist'));

// app.use(expressStaticMiddleware);

// Catch-all route to handle non-API requests without redirecting
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api/')) {
    return next();
  }
  // Instead of redirecting, respond with a JSON message or frontend URL
  res.json({ message: 'Frontend URL is ' + FRONTEND_URL });
});

app.get('/', (req, res) => {
  res.send('NewsBihar API is running.');
});

// New endpoint to get frontend URL
app.get('/api/frontend-url', (req, res) => {
  res.json({ frontendUrl: FRONTEND_URL });
});

app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
