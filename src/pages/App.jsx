import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import supabase from '../supabase.js';
import './App.css'
import SearchBar from '../components/SearchBar'
import MovieGrid from '../components/MovieGrid';
import FavoriteGrid from '../components/FavoriteGrid';
import UserBar from '../components/UserBar';


const API_KEY = '8265bd1679663a7ea12ac168da84d2e8'; // Demo API key
const BASE_URL = 'https://api.themoviedb.org/3';


function App() {
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  const [showFavorites, setShowFavorites] = useState(false);
  const [sortOrder, setSortOrder] = useState('title-asc');

  async function fetchMovies(query) {
    // If Query is provided, search for movies, otherwise get popular movies
    const endpoint = query
      ? `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
      : `${BASE_URL}/movie/popular?api_key=${API_KEY}`;

    try {
      const response = await fetch(endpoint);
      if (!response.ok) {
        throw new Error('Failed to fetch movies');
      }
      const data = await response.json();
      setMovies(data.results);
    }
    catch (error) {
      console.error('Error fetching movies:', error);
      setFetchError('Failed to load movies. Please try again later.');
    }
  }

  const { session, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !session) {
      navigate('/MovieSpace/', { replace: true });
    }
  }, [session, loading, navigate]);

  useEffect(() => {
    fetchMovies();
  }, []);

  useEffect(() => {
    async function getFavorites() {
      if (session?.user?.id) {
        const { data, error } = await supabase
          .from('favorites')
          .select('movie_data')
          .eq('user_id', session.user.id);

        if (!error && data) {
          setFavorites(data.map(item => item.movie_data));
        }
      } else {
        setFavorites([]);
      }
    }
    getFavorites();
  }, [session]);

  async function updateFavorites(movie) {
    const isSaved = favorites.some((fav) => fav.id === movie.id);

    setFavorites(prevFavorites => {
      if (isSaved) {
        return prevFavorites.filter((fav) => fav.id !== movie.id);
      } else {
        return [...prevFavorites, movie];
      }
    });

    if (session?.user?.id) {
      if (isSaved) {
        const { error } = await supabase
          .from('favorites')
          .delete()
          .eq('user_id', session.user.id)
          .eq('movie_id', movie.id);

        if (error) console.error("Error removing favorite:", error);
      } else {
        const { error } = await supabase
          .from('favorites')
          .insert({
            user_id: session.user.id,
            movie_id: movie.id,
            movie_data: movie
          });

        if (error) console.error("Error adding favorite:", error);
      }
    }
  }

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
        <UserBar />
        <SearchBar onSearch={fetchMovies} showFavorites={showFavorites} setShowFavorites={setShowFavorites} favoritesCount={favorites.length} sortOrder={sortOrder} setSortOrder={setSortOrder} />
        {showFavorites ? (
          <FavoriteGrid favorites={sortedFavorites} updateFavorites={updateFavorites} favoritesCount={favorites.length} />
        )
          :
          (
            <MovieGrid movies={sortedMovies} favorites={favorites} updateFavorites={updateFavorites} fetchError={fetchError} />
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
