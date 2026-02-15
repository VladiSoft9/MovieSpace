import MovieCards from './MovieCards';
import './MovieGrid.css';

function MovieGrid({ movies}) {
    return (
        <div className="movie-grid">
            {movies.map((movie) => (
                <MovieCards key={movie.id} movie={movie} />
            ))}
        </div>
    );
};

export default MovieGrid;