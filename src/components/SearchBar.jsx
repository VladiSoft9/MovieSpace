import { useState } from 'react';
import './SearchBar.css';
import { useRef } from 'react';

function SearchBar({ onSearch, showFavorites, setShowFavorites, favoritesCount, sortOrder, setSortOrder }) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault()
    if (query.trim()) {
      onSearch(query);
    }
    setQuery('');
  };

  const inputRef = useRef(null);

  function focusInput() {
    inputRef.current.focus();
  }


  return (

    <div className="search-container">
      <h1 className="app-title">
        <span className="gradient-text">MovieSpace</span>
      </h1>
      <p className="app-subtitle">Discover your next favorite movie</p>

      <form onSubmit={handleSubmit} className="search-form">
        <div className="search-input-wrapper">
          <svg
            className="search-icon"
            onClick={focusInput}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            className="search-input"
            ref={inputRef}
            placeholder="Search for movies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit" className="search-button">
            Search
          </button>
        </div>
      </form>
      <p className="favorites-toggle" onClick={() => setShowFavorites(!showFavorites)}>
        {showFavorites ? "Show All Movies" : `Show My Favorite Movies (${favoritesCount})`}
      </p>
      <div className="sort-wrapper">
        <label htmlFor="sort-select">Sort By:</label>
        <select className='sort-select' value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
          <option value="title-asc">Title (A-Z)</option>
          <option value="title-desc">Title (Z-A)</option>
          <option value="release-asc">Release Date (Oldest First)</option>
          <option value="release-desc">Release Date (Newest First)</option>
        </select>
      </div>
    </div>
  );
}
export default SearchBar;