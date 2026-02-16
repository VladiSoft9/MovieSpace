import MovieCards from './MovieCards';
import './MovieGrid.css';

function MovieGrid({ movies}) {

    if (!movies || movies.length === 0) {
        return <p className="no-movies-state">No movies found! Please search for a different movie.</p>;
    }

    return (
        <div className="movie-grid">
            {movies.map((movie) => (
                <MovieCards key={movie.id} movie={movie} />
            ))}
        </div>
    );
};

export default MovieGrid;