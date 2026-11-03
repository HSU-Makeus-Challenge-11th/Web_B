import type { Movie } from "../types/movie";

interface MovieCardProps {
  movie: Movie;
  onToggleBookmark: (movieId: number) => void;
}

export default function MovieCard({ movie, onToggleBookmark }: MovieCardProps) {
  const bookmarkIcon = movie.isBookmarked
    ? "/icons/movie-icons/bookmark.svg"
    : "/icons/movie-icons/bookmark-outline.svg";

  return (
    <li className="movie-card">
      <div className="movie-card__poster-wrap">
        <img className="movie-card__poster" src={movie.posterPath} alt={`${movie.title} 포스터`} />
        <button
          className="movie-card__bookmark-button"
          type="button"
          aria-label={`${movie.title} 북마크 ${movie.isBookmarked ? "해제" : "추가"}`}
          aria-pressed={movie.isBookmarked}
          onClick={() => onToggleBookmark(movie.id)}
        >
          <img src={bookmarkIcon} alt="" aria-hidden="true" />
        </button>
      </div>

      <div className="movie-card__content">
        <h2>{movie.title}</h2>
        <p>{movie.originalTitle}</p>
        <span>{movie.releaseDate}</span>
      </div>
    </li>
  );
}
