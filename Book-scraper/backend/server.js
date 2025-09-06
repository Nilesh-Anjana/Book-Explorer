// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Book = require('./models/book');
const { scrapeBooksToScrape } = require('./scraper'); // Import the scraper function
const cron = require('node-cron');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ PERMANENT CORS FIX IS HERE
// This new configuration automatically allows requests from any of your Vercel preview deployments.
const vercelRegex = /^https:\/\/book-explorer-.*-nilesh-s-projects.*\.vercel\.app$/;

const corsOptions = {
  // The origin function checks if the incoming request URL matches our rules
  origin: function (origin, callback) {
    // Allow requests from localhost, the main Vercel app, and any Vercel preview URLs
    if (
      !origin || 
      origin === 'http://localhost:3000' || 
      origin === 'https://book-explorer.vercel.app' || 
      vercelRegex.test(origin)
    ) {
      callback(null, true); // Allow the request
    } else {
      callback(new Error('Not allowed by CORS')); // Block the request
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
};

app.use(cors(corsOptions));

app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

app.get('/', (req, res) => {
  res.json({
    message: '📚 Book Explorer API is running!',
    status: 'healthy',
    timestamp: new Date().toISOString(),
    endpoints: {
      'Health Check': '/api/health',
      'Get Books': '/api/books',
      'Get Single Book': '/api/books/:id',
      'Refresh Data': 'POST /api/refresh',
      'Run Scraper': 'GET /run-scraper'
    },
    version: '1.0.0',
    developer: 'Nilesh'
  });
});

app.get('/api/books', async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      search = '',
      minRating = 0,
      maxRating = 5,
      minPrice = 0,
      maxPrice = 1000,
      stock = 'all'
    } = req.query;

    let filter = {
      rating: { $gte: parseInt(minRating), $lte: parseInt(maxRating) },
      price: { $gte: parseFloat(minPrice), $lte: parseFloat(maxPrice) }
    };

    if (search) filter.title = { $regex: search, $options: 'i' };
    if (stock !== 'all') filter.stock = stock === 'in-stock' ? 'In stock' : 'Out of stock';

    const books = await Book.find(filter)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ title: 1 });

    const total = await Book.countDocuments(filter);

    res.json({
      books,
      currentPage: parseInt(page),
      totalPages: Math.ceil(total / limit),
      totalBooks: total
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/books/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ error: 'Book not found' });
    res.json(book);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/run-scraper', async (req, res) => {
  try {
    await scrapeBooksToScrape();
    res.json({ message: "✅ Scraper executed successfully!" });
  } catch (err) {
    console.error("❌ Scraper failed:", err);
    res.status(500).json({ error: "Scraper failed", details: err.message });
  }
});

app.post('/api/refresh', async (req, res) => {
  try {
    console.log('🔄 Refresh endpoint triggered - Starting scraper...');
    await scrapeBooksToScrape();
    res.json({
      success: true,
      message: 'Data refresh initiated successfully',
      timestamp: new Date().toISOString(),
      status: 'Scraper finished'
    });
  } catch (error) {
    console.error('❌ Error triggering scraper:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to trigger data refresh',
      message: error.message
    });
  }
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

cron.schedule('0 2 * * *', async () => {
  console.log('🕐 Scheduled scraper execution started at:', new Date().toISOString());
  await scrapeBooksToScrape();
  console.log('✅ Scheduled scraper completed');
}, { timezone: "Asia/Kolkata" });

console.log('⏰ Cron job scheduled: Daily scraper at 2:00 AM IST');

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);
});