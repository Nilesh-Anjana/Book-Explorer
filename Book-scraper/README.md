# 📚 Book Explorer - Full-Stack Web Application
#Live Links

Frontend-https://book-scraper-brown.vercel.app/

Backend - https://book-scraper-r9ra.onrender.com

A modern, feature-rich web application that automatically scrapes book data and provides an elegant browsing experience with advanced search and filtering capabilities.

## 🎯 Project Overview

Book Explorer is a comprehensive full-stack solution that demonstrates modern web development practices, combining automated data collection, robust API design, and stunning user interface. The application scrapes book information from Books to Scrape, stores it efficiently, and presents it through a beautiful, responsive React frontend.

## ✨ Key Features

### 🔧 **Core Functionality**
- **Automated Data Scraping**: Collects 1000+ books from all 50 pages
- **Smart Search & Filtering**: Search by title, filter by rating, price, and availability
- **Intelligent Pagination**: User-friendly navigation with visual indicators
- **Detailed Book Views**: Modal popups with comprehensive book information
- **Real-time Data Refresh**: Manual and scheduled data updates

### 🎨 **Modern UI/UX**
- **Glassmorphism Design**: Translucent cards with blur effects
- **Responsive Layout**: Optimized for desktop, tablet, and mobile
- **Smooth Animations**: Micro-interactions and hover effects
- **Professional Styling**: Modern color schemes and gradients
- **Accessibility Features**: User-friendly navigation hints

### ⚡ **Advanced Features**
- **Background Processing**: Non-blocking scraper execution
- **Scheduled Updates**: Daily automatic data refresh at 2:00 AM
- **Error Handling**: Comprehensive error management and user feedback
- **Performance Optimization**: Efficient pagination and lazy loading

## 🛠️ Technology Stack

### **Backend**
- **Node.js** with **Express.js** - RESTful API server
- **MongoDB** with **Mongoose** - Document database and ODM
- **Puppeteer** - Web scraping automation
- **node-cron** - Scheduled task management

### **Frontend**
- **React 18** with **TypeScript** - Modern component-based UI
- **Custom CSS3** - Professional styling with animations
- **Axios** - HTTP client for API communication

### **Development Tools**
- **Nodemon** - Development server with hot reload
- **Git** - Version control
- **npm** - Package management

## 📁 Project Structure

```
book-explorer/
├── scraper/                 # Data scraping module
│   ├── models/
│   │   └── Book.js         # MongoDB schema
│   ├── scraper.js          # Main scraping script
│   ├── package.json
│   └── .env                # Environment variables
├── backend/                # API server
│   ├── models/
│   │   └── Book.js         # Book model
│   ├── server.js           # Express server
│   ├── package.json
│   └── .env                # Environment variables
├── frontend/               # React application
│   ├── public/
│   ├── src/
│   │   ├── components/     # React components
│   │   │   ├── BookCard.tsx
│   │   │   ├── BookCard.css
│   │   │   ├── SearchFilters.tsx
│   │   │   └── SearchFilters.css
│   │   ├── services/       # API services
│   │   │   └── api.ts
│   │   ├── types/          # TypeScript definitions
│   │   │   └── Book.ts
│   │   ├── App.tsx         # Main app component
│   │   └── App.css         # Global styles
│   ├── package.json
│   └── tsconfig.json
└── README.md               # Project documentation
```

## 🚀 Installation & Setup

### **Prerequisites**
- Node.js 16.0.0 or higher
- npm 7.0.0 or higher
- MongoDB Atlas account (free tier available)

### **1. Clone Repository**
```bash
git clone <your-repository-url>
cd book-explorer
```

### **2. Database Setup**
1. Create a free MongoDB Atlas account
2. Create a new cluster
3. Get your connection string
4. Replace `<password>` with your database password

### **3. Scraper Setup**
```bash
cd scraper
npm install
```

Create `.env` file:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/bookexplorer
```

Run the scraper:
```bash
node scraper.js
```
*This will collect all 1000 books and populate your database (~3 minutes)*

### **4. Backend Setup**
```bash
cd ../backend
npm install
```

Create `.env` file:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/bookexplorer
PORT=5000
```

Start the server:
```bash
npm run dev
```
*Backend will run on http://localhost:5000*

### **5. Frontend Setup**
```bash
cd ../frontend
npm install
npm start
```
*Frontend will run on http://localhost:3000*

## 🔧 API Endpoints

### **GET /api/books**
Returns paginated list of books with filtering options.

**Query Parameters:**
- `page` - Page number (default: 1)
- `limit` - Books per page (default: 20)
- `search` - Search by title
- `minRating` - Minimum rating (1-5)
- `maxRating` - Maximum rating (1-5)
- `minPrice` - Minimum price
- `maxPrice` - Maximum price
- `stock` - Stock status (`all`, `in-stock`, `out-stock`)

**Example:**
```bash
GET /api/books?page=1&limit=20&search=python&minRating=4&stock=in-stock
```

### **GET /api/books/:id**
Returns detailed information for a single book.

### **POST /api/refresh** ⭐ *Bonus Feature*
Triggers manual data refresh by running the scraper.

### **GET /api/health**
Health check endpoint for monitoring.

## 📊 Database Schema

```javascript
{
  title: String,           // Book title
  price: Number,           // Price in GBP
  stock: String,           // "In stock" or "Out of stock"
  rating: Number,          // 1-5 star rating
  detailUrl: String,       // Original book page URL
  imageUrl: String,        // Book cover image URL
  scrapedAt: Date          // Timestamp of data collection
}
```

## ⏰ Automated Features

### **Scheduled Data Updates** ⭐ *Bonus Feature*
- Automatic scraper execution daily at 2:00 AM IST
- Background processing without downtime
- Comprehensive logging and error handling

### **Manual Refresh**
- Frontend refresh button for on-demand updates
- Real-time progress feedback
- Non-blocking user experience

## 🎨 UI/UX Highlights

### **Modern Design Elements**
- **Glassmorphism Effects**: Frosted glass appearance with backdrop blur
- **Gradient Backgrounds**: Multi-color smooth transitions
- **Smooth Animations**: Hover effects, modal transitions, and loading states
- **Professional Typography**: Optimized font weights and spacing

### **User Experience Features**
- **Smart Pagination**: Shows relevant page numbers (1...4 5 6...50)
- **Pagination Hints**: Sticky navigation guidance for users
- **Responsive Grid**: Adaptive layout for all screen sizes
- **Loading States**: Animated spinners and skeleton screens
- **Error Handling**: User-friendly error messages and fallbacks

## 🚀 Deployment

### **Backend Deployment (Render/Railway)**
1. Connect GitHub repository
2. Set environment variables:
   - `MONGODB_URI`
   - `NODE_ENV=production`
3. Deploy from `backend` folder

### **Frontend Deployment (Vercel/Netlify)**
1. Update API URL in production
2. Build and deploy from `frontend` folder
3. Configure build settings for React

## 📈 Performance Optimizations

- **Efficient Database Queries**: Indexed searches and pagination
- **Image Optimization**: Lazy loading and proper sizing
- **Bundle Optimization**: Code splitting and tree shaking
- **Caching Strategy**: Browser caching for static assets
- **API Rate Limiting**: Controlled request handling

## 🔮 Future Enhancements

*Given additional development time, the following improvements would be implemented:*

### **Database Migration**
- **PostgreSQL Integration**: Transition from MongoDB to PostgreSQL for enhanced relational data handling, ACID compliance, and complex query optimization
- **Advanced Indexing**: Multi-column indexes for faster search performance
- **Data Analytics**: SQL-based reporting and analytics capabilities

### **Styling Framework**
- **Tailwind CSS**: Replace custom CSS with Tailwind for rapid development, consistent design system, and reduced bundle size
- **Component Libraries**: Integration with headless UI libraries for enhanced accessibility
- **Design Tokens**: Centralized theme management and dark mode support

### **Advanced Features**
- **User Authentication**: Personal book collections and preferences
- **Advanced Search**: Full-text search with elasticsearch integration
- **Real-time Updates**: WebSocket integration for live data updates
- **PWA Features**: Offline functionality and mobile app experience
- **Data Visualization**: Charts and analytics dashboard
- **API Rate Limiting**: Redis-based rate limiting and caching
- **Microservices Architecture**: Service separation for better scalability


### **API Testing**
```bash
# Test health endpoint
curl http://localhost:5000/api/health

# Test books endpoint with filters
curl "http://localhost:5000/api/books?page=1&search=python&minRating=4"

# Test refresh endpoint
curl -X POST http://localhost:5000/api/refresh
```

## 🤝 Contributing
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

**Built with ❤️ by TANMAY JAIN**
