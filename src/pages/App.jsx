import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import './App.css'
import SearchBar from '../components/SearchBar'
import MovieGrid from '../components/MovieGrid';
import FavoriteGrid from '../components/FavoriteGrid';


const API_KEY = '8265bd1679663a7ea12ac168da84d2e8'; // Demo API key
const BASE_URL = 'https://api.themoviedb.org/3';


function App() {
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState(() => {
    const storedMovies = localStorage.getItem('favorites');
    return storedMovies ? JSON.parse(storedMovies) : [];
  });
  const [showFavorites, setShowFavorites] = useState(false);
  const [sortOrder, setSortOrder] = useState('title-asc');
  
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

  const { session, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !session) {
      navigate('/', { replace: true });
    }
  }, [session, loading, navigate]);

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

  function sortHelper(array, option) {
    return [...array].sort((a, b) => {
      switch (option) {
        case 'title-asc':
          return a.title.localeCompare(b.title);
        case 'title-desc':
          return b.title.localeCompare(a.title);
        case 'release-asc':
          return new Date(a.release_date) - new Date(b.release_date);
        case 'release-desc':
          return new Date(b.release_date) - new Date(a.release_date);
        default:
          return 0;
      }
    });
  }

  const sortedMovies = useMemo(() => sortHelper(movies, sortOrder), [movies, sortOrder]);
  const sortedFavorites = useMemo(() => sortHelper(favorites, sortOrder), [favorites, sortOrder]);

  
 if (session) {

  return (
    <div className="app">
      <SearchBar onSearch={fetchMovies} showFavorites={showFavorites} setShowFavorites={setShowFavorites} favoritesCount={favorites.length} sortOrder={sortOrder} setSortOrder={setSortOrder} />
      {showFavorites ? (
        <FavoriteGrid favorites={sortedFavorites} updateFavorites={updateFavorites} favoritesCount={favorites.length} />
      ) 
      : 
      (
        <MovieGrid movies={sortedMovies} favorites={favorites} updateFavorites={updateFavorites} />
      )}

      <footer>
        <p>© {new Date().getFullYear()} MovieSpace - Created by VladiSoft</p>
        <p>Made it possible by: <a href="https://www.themoviedb.org/" target="_blank" rel="noopener noreferrer" className='link'>The Movie Database (TMDb)</a>.</p>
      </footer>

    </div>
  )
  }
}

export default App
