import "./movie-card.css";
import type { Movie } from "../types/movie";

interface MovieCardProps {
  movie: Movie;
  onToggleBookmark: (movieId: number) => void;
}

export default function MovieCard({movie,onToggleBookmark,}: MovieCardProps) {
  return (
    <li className="movielist">
      <div className="poster">
        <img
          className="movie-poster"
          src={movie.posterPath}
          alt={movie.title}
        />

        <button
          className="movie-button" 
          aria-pressed={movie.isBookmarked}
          onClick={() => onToggleBookmark(movie.id)}
        >
          {movie.isBookmarked ? (
            <img src="/icons/bookmark.svg" />
          ) : (
            <img src="/icons/bookmark-outline.svg" />
          )}
        </button>
      </div>

      <span className="movie-title">{movie.title}</span>
      <span className="movie-date">{movie.releaseDate}</span>
    </li>
  );
}