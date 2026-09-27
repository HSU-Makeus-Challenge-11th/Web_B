import type { Movie } from "../types/movie";

interface MovieCardProps {
  movie: Movie;
  onToggleBookmark: (movieId: number) => void;
}

export function MovieCard({ movie, onToggleBookmark }: MovieCardProps) {
  const bookmarkLabel = movie.isBookmarked
    ? `${movie.title} 북마크 해제`
    : `${movie.title} 북마크 추가`;

  return (
    <li className="movie-card">
      <article>
        <div className="poster-wrap">
          <img src={movie.posterPath} alt={`${movie.title} 포스터`} />
          <button
            className={`bookmark-button${movie.isBookmarked ? " bookmarked" : ""}`}
            type="button"
            aria-label={bookmarkLabel}
            aria-pressed={movie.isBookmarked}
            onClick={() => onToggleBookmark(movie.id)}
          >
            <img
              src={
                movie.isBookmarked
                  ? "/images/icons/bookmark.svg"
                  : "/images/icons/bookmark-outline.svg"
              }
              alt=""
            />
          </button>
        </div>
        <h2 className="movie-title">{movie.title}</h2>
        <p className="movie-release-date">{movie.releaseDate}</p>
      </article>
    </li>
  );
}
