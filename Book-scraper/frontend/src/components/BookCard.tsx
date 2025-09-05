import React from 'react';
import { Book } from '../types/Book';
import './BookCard.css';

interface BookCardProps {
  book: Book;
  onClick: (book: Book) => void;
}

const BookCard: React.FC<BookCardProps> = ({ book, onClick }) => {
  const renderStars = (rating: number) => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  return (
    <div className="book-card" onClick={() => onClick(book)}>
      <div className="book-image">
        <img src={book.imageUrl} alt={book.title} />
      </div>
      <div className="book-info">
        <h3 className="book-title">{book.title}</h3>
        <p className="book-price">£{book.price}</p>
        <p className="book-rating">{renderStars(book.rating)} ({book.rating})</p>
        <p className={`book-stock ${book.stock === 'In stock' ? 'in-stock' : 'out-stock'}`}>
          {book.stock}
        </p>
      </div>
    </div>
  );
};

export default BookCard;
