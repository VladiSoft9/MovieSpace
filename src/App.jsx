import { useState, useEffect } from 'react'
import './App.css'
import SearchBar from './components/SearchBar'
import MovieGrid from './components/MovieGrid';


const API_KEY = '8265bd1679663a7ea12ac168da84d2e8'; // Demo API key
const BASE_URL = 'https://api.themoviedb.org/3';


function App() {

  const [movies, setMovies] = useState([]);
  
  async function fetchMovies(query) {
    // If Query is provided, search for movies, otherwise get popular movies
    const endpoint =  query 
    ? `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}` 
    : `${BASE_URL}/movie/popular?api_key=${API_KEY}`;

    try {
      const response = await fetch(endpoint);
      if (!response.ok) {
        throw new Error('Failed to fetch movies');
      }
      const data = await response.json();
      setMovies(data.results);
      console.log(data.results);
    }
    catch (error) {
      console.error('Error fetching movies:', error);
    }
  }

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <div className="app">
      <SearchBar onSearch={fetchMovies} />
      <MovieGrid movies={movies} />
    </div>
  )
}

export default App
