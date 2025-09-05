import React, { useState, useEffect, useCallback } from 'react';
import { booksAPI } from './services/api';
import { Book, BooksResponse } from './types/Book';
import BookCard from './components/BookCard';
import SearchFilters from './components/SearchFilters';
import './App.css';

const App: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalBooks, setTotalBooks] = useState(0);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  // Filter states
  const [search, setSearch] = useState('');
  const [minRating, setMinRating] = useState(1);
  const [maxRating, setMaxRating] = useState(5);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100);
  const [stock, setStock] = useState('all');

  const fetchBooks = useCallback(async () => {
    try {
      setLoading(true);
      const response: BooksResponse = await booksAPI.getBooks({
        page: currentPage,
        limit: 20,
        search,
        minRating,
        maxRating,
        minPrice,
        maxPrice,
        stock,
      });
      
      setBooks(response.books);
      setTotalPages(response.totalPages);
      setTotalBooks(response.totalBooks);
      setError(null);
    } catch (err) {
      setError('Failed to fetch books. Make sure the backend is running!');
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, [currentPage, search, minRating, maxRating, minPrice, maxPrice, stock]);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  const handleBookClick = (book: Book) => {
    setSelectedBook(book);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const handleRefreshData = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/refresh', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      const result = await response.json();
      
      if (result.success) {
        alert('Data refresh started! Please wait a few minutes and refresh the page.');
      } else {
        alert('Failed to start data refresh');
      }
    } catch (error) {
      alert('Error triggering data refresh');
      console.error('Refresh error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>📚 Book Explorer</h1>
        <p>So, what do you want to learn today !</p>
        <button 
          onClick={handleRefreshData}
          className="refresh-btn"
          disabled={loading}
        >
          🔄 Refresh to see new books
        </button>
      </header>

      <main className="app-main">
        {totalPages > 1 && (
          <div className="pagination-hint">
             <span>↓</span>
          </div>
        )}
        
        <SearchFilters
          search={search}
          minRating={minRating}
          maxRating={maxRating}
          minPrice={minPrice}
          maxPrice={maxPrice}
          stock={stock}
          onSearchChange={setSearch}
          onRatingChange={(min, max) => {
            setMinRating(min);
            setMaxRating(max);
            setCurrentPage(1);
          }}
          onPriceChange={(min, max) => {
            setMinPrice(min);
            setMaxPrice(max);
            setCurrentPage(1);
          }}
          onStockChange={(newStock) => {
            setStock(newStock);
            setCurrentPage(1);
          }}
        />

        {loading && <div className="loading">Loading books...</div>}
        
        {error && <div className="error">{error}</div>}

        {!loading && !error && (
          <>
            <div className="results-info">
              <p>Found {totalBooks} books</p>
            </div>

            <div className="books-grid">
              {books.map((book) => (
                <BookCard
                  key={book._id}
                  book={book}
                  onClick={handleBookClick}
                />
              ))}
            </div>
                    
            <div className="pagination">
              {currentPage > 1 && (
                <button
                  className="page-btn"
                  onClick={() => handlePageChange(currentPage - 1)}
                >
                  ← Previous
                </button>
              )}

              {currentPage > 3 && (
                <>
                  <button className="page-btn" onClick={() => handlePageChange(1)}>1</button>
                  {currentPage > 4 && <span className="pagination-dots">...</span>}
                </>
              )}

              {[...Array(3)].map((_, i) => {
                const page = currentPage - 1 + i;
                if (page >= 1 && page <= totalPages) {
                  return (
                    <button
                      key={page}
                      className={`page-btn ${currentPage === page ? 'active' : ''}`}
                      onClick={() => handlePageChange(page)}
                    >
                      {page}
                    </button>
                  );
                }
                return null;
              })}

              {currentPage < totalPages - 2 && (
                <>
                  {currentPage < totalPages - 3 && <span className="pagination-dots">...</span>}
                  <button className="page-btn" onClick={() => handlePageChange(totalPages)}>
                    {totalPages}
                  </button>
                </>
              )}

              {currentPage < totalPages && (
                <button
                  className="page-btn"
                  onClick={() => handlePageChange(currentPage + 1)}
                >
                  Next →
                </button>
              )}
            </div>
          </>
        )}
      </main>

      {selectedBook && (
        <div className="modal-overlay" onClick={() => setSelectedBook(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedBook(null)}>×</button>
            <div className="book-detail">
              <img src={selectedBook.imageUrl} alt={selectedBook.title} />
              <div className="book-detail-info">
                <h2>{selectedBook.title}</h2>
                <p className="detail-price">£{selectedBook.price}</p>
                <p className="detail-rating">{'★'.repeat(selectedBook.rating)}{'☆'.repeat(5 - selectedBook.rating)} ({selectedBook.rating}/5)</p>
                <p className={`detail-stock ${selectedBook.stock === 'In stock' ? 'in-stock' : 'out-stock'}`}>
                  {selectedBook.stock}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
