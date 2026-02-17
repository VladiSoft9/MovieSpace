import './MovieCards.css';
import { useRef } from 'react';

function MovieCards({ movie }) {
    const imageUrl = movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : 'https://placeholder.vn/placeholder/500x750?bg=1e2434&color=ffffff&text=No+Poster';

    const rating = movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A';
    const year = movie.release_date ? new Date(movie.release_date).getFullYear() : '';
    const language = movie.original_language ? movie.original_language.toUpperCase() : '';

    const overviewRef = useRef(null);

    function increaseOverviewHeight() {
        overviewRef.current.style.webkitLineClamp = '20';
    }

    return (
        <div className="movie-card">
            <div className='movie-poster-wrapper'>
                <img src={imageUrl} alt={movie.title} className="movie-poster" />
                <div className='movie-overview-container'>
                    <p className='movie-overview' ref={overviewRef} onClick={increaseOverviewHeight}>{movie.overview || 'No overview available.'}</p>
                </div>
            </div>
            <div className="movie-info">
                <h3 className="movie-title">{movie.title}</h3>
                <p className="movie-language">{language}</p>
                <p className="movie-year">{year}</p>
                <div className="movie-rating">
                    <svg
                            className="star-icon"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span>{rating}</span>
                </div>
            </div>
         </div>
    );
};


export default MovieCards;