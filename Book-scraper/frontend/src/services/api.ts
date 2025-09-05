import axios from 'axios';
import { Book, BooksResponse } from '../types/Book';

// Use env variable if available, else fallback to default
const API_BASE_URL = process.env.REACT_APP_BACKEND_URL 
  || (process.env.NODE_ENV === 'production'
    ? 'https://book-scraper-r9ra.onrender.com/api'
    : 'http://localhost:5000/api');


export const api = axios.create({
  baseURL: API_BASE_URL,
});

export const booksAPI = {
  getBooks: (params: {
    page?: number;
    limit?: number;
    search?: string;
    minRating?: number;
    maxRating?: number;
    minPrice?: number;
    maxPrice?: number;
    stock?: string;
  }): Promise<BooksResponse> => api.get('/books', { params }).then(res => res.data),

  getBook: (id: string): Promise<Book> => api.get(`/books/${id}`).then(res => res.data),
};
