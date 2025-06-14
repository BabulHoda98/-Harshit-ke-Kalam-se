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

// Example protected route for customization data
app.get('/api/admin/customization', authenticateToken, (req, res) => {
  // Return some dummy customization data
  res.json({
    siteTitle: 'NewsBihar 24/7',
    footerLinks: [
      { name: 'Home', url: '/' },
      { name: 'About', url: '/aboutus' },
      { name: 'Contact', url: '/contact' }
    ]
  });
});

// Example protected route to update customization data
app.post('/api/admin/customization', authenticateToken, (req, res) => {
  // Here you would update customization data in a database
  // For demo, just return success
  res.json({ message: 'Customization updated successfully' });
});

app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
