const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: String, required: true },
  rating: { type: Number, required: true },
  detailUrl: { type: String, required: true },
  imageUrl: { type: String, required: true },
  scrapedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Book', bookSchema);
