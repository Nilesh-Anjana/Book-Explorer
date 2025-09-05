export interface Book {
  _id: string;
  title: string;
  price: number;
  stock: string;
  rating: number;
  detailUrl: string;
  imageUrl: string;
  scrapedAt: string;
}

export interface BooksResponse {
  books: Book[];
  currentPage: number;
  totalPages: number;
  totalBooks: number;
}
