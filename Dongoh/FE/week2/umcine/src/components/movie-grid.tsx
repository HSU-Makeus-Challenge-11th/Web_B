import { useState } from "react";
import { movies as initialMovies } from "../data/movies";
import MovieCard from "../components/movie-card";



export default function MovieGrid() {
    const [movies, setMovies] = useState(initialMovies);

    function handleToggleBookmark(movieId: number) {
        setMovies((currentMovies) =>
            currentMovies.map((movie) =>
                movie.id === movieId
                    ? { ...movie, isBookmarked: !movie.isBookmarked }
                    : movie,
            ),
        );
    }

    return (
        <ul className="movie-grid">
            {movies.map((movie) => (
                <MovieCard
                    key={movie.id}
                    movie={movie}
                    onToggleBookmark={handleToggleBookmark}
                />
            ))}
        </ul>

    );

}