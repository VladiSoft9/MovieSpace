import {useState} from 'react';
import './SearchBar.css';

function SearchBar({onSearch}) {
    const [query, setQuery] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault()
        if(query.trim()) {
            onSearch(query);
        }
    };

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
            placeholder="Search for movies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit" className="search-button">
            Search
          </button>
        </div>
      </form>
    </div>
  );
}
export default SearchBar;