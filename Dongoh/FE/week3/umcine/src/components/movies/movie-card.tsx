import { Link } from "@tanstack/react-router";
import type { Movie } from "../../types/movie";
import { cn } from "../../utils/cn";

interface MovieCardProps {
  movie: Movie;
  onToggleBookmark: (movieId: number) => void;
}

export default function MovieCard({ movie, onToggleBookmark }: MovieCardProps) {
  const bookmarkIcon = movie.isBookmarked
    ? "/icons/movie-icons/bookmark.svg"
    : "/icons/movie-icons/bookmark-outline.svg";

  return (
    <li className="movie-card min-w-0">
      <div className="movie-card__poster-wrap relative">
        <Link
          className="block"
          to="/movies/$movieId"
          params={{ movieId: String(movie.id) }}
        >
          <img
            className="movie-card__poster block aspect-[2/3] w-full object-cover"
            src={movie.posterPath}
            alt={`${movie.title} 포스터`}
          />
        </Link>
        <button
          className={cn(
            "movie-card__bookmark-button absolute right-2 top-2 h-6 w-6 rounded border border-white/80 p-1",
            movie.isBookmarked ? "bg-blue-600" : "bg-black/60",
          )}
          type="button"
          aria-label={`${movie.title} 북마크 ${movie.isBookmarked ? "해제" : "추가"}`}
          aria-pressed={movie.isBookmarked}
          onClick={() => onToggleBookmark(movie.id)}
        >
          <img
            className="h-full w-full"
            src={bookmarkIcon}
            alt=""
            aria-hidden="true"
          />
        </button>
      </div>

      <div className="movie-card__content pt-1">
        <Link to="/movies/$movieId" params={{ movieId: String(movie.id) }}>
          <h2 className="truncate text-xs font-semibold">
            {movie.title}
          </h2>
        </Link>
        <p className="truncate text-[10px] text-slate-600">
          {movie.originalTitle}
        </p>
        <span className="block text-[10px] text-slate-400">
          {movie.releaseDate}
        </span>
      </div>
    </li>
  );
}
