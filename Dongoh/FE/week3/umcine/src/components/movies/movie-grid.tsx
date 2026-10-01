import { useState } from "react";
import { movies as initialMovies } from "../../data/movies";
import MovieCard from "./movie-card";

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
    <ul
      aria-label="영화 카드 목록"
      className="movie-grid m-0 grid list-none grid-cols-1 gap-5 p-0 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
    >
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
