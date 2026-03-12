import MovieCards from "./MovieCards";
import './FavoriteGrid.css';

function FavoriteGrid({ favorites, updateFavorites, favoritesCount }) {

    if (!favorites || favorites.length === 0) { 
        return <p className="no-movies-state">You still do not have any favorite movies! Click the heart icon on a movie to add it to your favorites.</p>;
    }
    else {
        return (
            <>
            <p className="favorites-count">You have {favoritesCount} {favoritesCount === 1 ? 'favorite movie' : 'favorite movies'}!</p>
            <div className="favorite-grid">
                {favorites.map((movie) => (
                    <MovieCards key={movie.id} movie={movie} favorites={favorites} updateFavorites={updateFavorites} />
                ))}
            </div>
            </>
        );
    }}

    export default FavoriteGrid;
