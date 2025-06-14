const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;
const SECRET_KEY = 'your_secret_key_here'; // Change this to a secure key in production

app.use(cors());
app.use(bodyParser.json());

// Hardcoded admin credentials (for demo purposes)
const adminUser = {
  username: 'admin',
  password: 'admin123' // In production, use hashed passwords and a database
};

// In-memory storage for customization data including latest news articles
let customizationData = {
  siteTitle: 'NewsBihar 24/7',
  footerLinks: [
    { name: 'Home', url: '/' },
    { name: 'About', url: '/aboutus' },
    { name: 'Contact', url: '/contact' }
  ],
  latestNewsArticles: [
    {
      image: 'https://source.unsplash.com/random/600x400?news=0',
      category: 'Politics',
      title: 'Global Summit Addresses Climate Change Concerns',
      description: 'World leaders gathered to discuss urgent climate action plans and set new emission targets.',
      author: 'Jane Smith',
      date: new Date().toLocaleDateString()
    },
    {
      image: 'https://source.unsplash.com/random/600x400?news=1',
      category: 'Technology',
      title: 'New Tech Breakthrough Promises Faster Internet',
      description: 'Researchers developed a revolutionary quantum communication method that could transform data transfer.',
      author: 'Mike Johnson',
      date: new Date().toLocaleDateString()
    },
    {
      image: 'https://source.unsplash.com/random/600x400?news=2',
      category: 'Sports',
      title: 'National Team Advances to Championship Finals',
      description: 'In a stunning victory, the national team secured their spot in the finals after a decade.',
