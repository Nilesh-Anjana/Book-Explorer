import React from 'react';
import './SearchFilters.css';

interface SearchFiltersProps {
  search: string;
  minRating: number;
  maxRating: number;
  minPrice: number;
  maxPrice: number;
  stock: string;
  onSearchChange: (search: string) => void;
  onRatingChange: (min: number, max: number) => void;
  onPriceChange: (min: number, max: number) => void;
  onStockChange: (stock: string) => void;
}

const SearchFilters: React.FC<SearchFiltersProps> = ({
  search,
  minRating,
  maxRating,
  minPrice,
  maxPrice,
  stock,
  onSearchChange,
  onRatingChange,
  onPriceChange,
  onStockChange,
}) => {
  return (
    <div className="search-filters">
      <div className="filter-row">
        <input
          type="text"
          placeholder="Search books by title..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="search-input"
        />
      </div>
      
      <div className="filter-row">
        <div className="filter-group">
          <label>Rating:</label>
          <select 
            value={minRating} 
            onChange={(e) => onRatingChange(Number(e.target.value), maxRating)}
          >
            {[1,2,3,4,5].map(n => (
              <option key={n} value={n}>≥ {n} stars</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label>Price Range:</label>
          <input
            type="number"
            placeholder="Min price"
            value={minPrice}
            onChange={(e) => onPriceChange(Number(e.target.value), maxPrice)}
          />
          <input
            type="number"
            placeholder="Max price"
            value={maxPrice}
            onChange={(e) => onPriceChange(minPrice, Number(e.target.value))}
          />
        </div>

        <div className="filter-group">
          <label>Stock:</label>
          <select value={stock} onChange={(e) => onStockChange(e.target.value)}>
            <option value="all">All</option>
            <option value="in-stock">In Stock</option>
            <option value="out-stock">Out of Stock</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;
