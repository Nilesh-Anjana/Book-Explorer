// scraper.js
const puppeteer = require('puppeteer');
const mongoose = require('mongoose');
const Book = require('./models/book');
require('dotenv').config();

// The main scraping function, which is now reusable.
async function scrapeBooksToScrape() {
  console.log('🚀 Starting scraper...');
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();
  let currentPage = 1;
  let hasNextPage = true;
  let allBooks = [];

  while (hasNextPage) {
    console.log(`📖 Scraping page ${currentPage}...`);
    const url = currentPage === 1
      ? 'https://books.toscrape.com/'
      : `https://books.toscrape.com/catalogue/page-${currentPage}.html`;
    try {
      await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });
      console.log(`🌐 Loaded: ${url}`);
    } catch (err) {
      console.error(`❌ Failed to load page ${currentPage}:`, err.message);
      break;
    }

    const books = await page.evaluate(() => {
      const bookElements = document.querySelectorAll('.product_pod');
      return Array.from(bookElements).map(book => {
        const title = book.querySelector('h3 a')?.getAttribute('title') || '';
        const priceText = book.querySelector('.price_color')?.textContent || '£0';
        const price = parseFloat(priceText.replace('£', ''));
        const stockText = book.querySelector('.instock.availability')?.textContent.trim() || '';
        const stock = stockText.includes('In stock') ? 'In stock' : 'Out of stock';
        const ratingClass = book.querySelector('p[class*="star-rating"]')?.className || '';
        const ratingMap = { 'One': 1, 'Two': 2, 'Three': 3, 'Four': 4, 'Five': 5 };
        const rating = ratingMap[ratingClass.split(' ')[1]] || 0;
        const detailUrl = 'https://books.toscrape.com/' + book.querySelector('h3 a')?.getAttribute('href');
        const imageUrl = 'https://books.toscrape.com/' + book.querySelector('img')?.getAttribute('src');
        return { title, price, stock, rating, detailUrl, imageUrl };
      });
    });

    allBooks.push(...books);
    console.log(`✅ Found ${books.length} books on page ${currentPage}`);
    hasNextPage = await page.$('.next') !== null;
    console.log(`➡️ Has next page: ${hasNextPage}`);
    currentPage++;
  }

  console.log(`💾 Saving ${allBooks.length} books to database...`);
  await Book.deleteMany({});
  await Book.insertMany(allBooks);

  console.log('✅ Scraping completed successfully!');
  await browser.close();
  // Close the Mongoose connection after the scrape is done
  if (mongoose.connection.readyState === 1) {
    await mongoose.connection.close();
    console.log('🔌 MongoDB connection closed.');
  }
}

module.exports = { scrapeBooksToScrape };