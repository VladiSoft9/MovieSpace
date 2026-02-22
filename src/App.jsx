import { useState, useEffect } from 'react'
import './App.css'
import SearchBar from './components/SearchBar'
import MovieGrid from './components/MovieGrid';


const API_KEY = '8265bd1679663a7ea12ac168da84d2e8'; // Demo API key
const BASE_URL = 'https://api.themoviedb.org/3';


function App() {

  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState(() => {
    const storedMovies = localStorage.getItem('favorites');
    return storedMovies ? JSON.parse(storedMovies) : [];
  });
  
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

  function updateFavorites(movie) {
    setFavorites(prevFavorites => {
      const isSaved = prevFavorites.some((fav) => fav.id === movie.id)
        if(isSaved){
          return prevFavorites.filter((fav) => fav.id !== movie.id);
        }
        else{
          return [...prevFavorites,movie];
        }
    });
    console.log(favorites);
  }

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  return (
    <div className="app">
      <SearchBar onSearch={fetchMovies} />
      <MovieGrid movies={movies} favorites={favorites} updateFavorites={updateFavorites} />

      <footer>
        <p>© {new Date().getFullYear()} MovieSpace - Created by VladiSoft</p>
        <p>Made it possible by: <a href="https://www.themoviedb.org/" target="_blank" rel="noopener noreferrer" className='link'>The Movie Database (TMDb)</a>.</p>
      </footer>

    </div>
  )
}

export default App
