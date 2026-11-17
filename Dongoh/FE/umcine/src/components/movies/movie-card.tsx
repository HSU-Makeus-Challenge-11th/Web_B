import { Link } from "@tanstack/react-router";
import type { TmdbMovieListItem } from "../../api/movies/models";
import { cn } from "../../utils/cn";

interface MovieCardProps {
  movie: TmdbMovieListItem & { isBookmarked: boolean };
  onToggleBookmark: (movieId: number) => void;
}

export default function MovieCard({ movie, onToggleBookmark }: MovieCardProps) {
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : null;
  const bookmarkIcon = movie.isBookmarked
    ? "/icons/movie-icons/bookmark.svg"
    : "/icons/movie-icons/bookmark-outline.svg";

  return (
    <li className="min-w-0">
      <div className="relative overflow-hidden rounded-lg bg-gray-900">
        <Link
          className="block"
          to="/movies/$movieId"
          params={{ movieId: String(movie.id) }}
        >
          {posterUrl ? (
            <img
              className="block aspect-[7/8] w-full object-cover"
              src={posterUrl}
              alt={`${movie.title} 포스터`}
            />
          ) : (
            <div className="block aspect-[7/8] w-full object-cover grid place-items-center bg-gray-200 text-gray-500">
              이미지 없음
            </div>
          )}
        </Link>
        <button
          className={cn(
            "absolute top-2 right-2 inline-flex size-9 items-center justify-center rounded-lg border border-white/80 p-[7px] transition-[background,transform] duration-150 hover:-translate-y-px",
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

      <div className="pt-[9px] [&_h2]:m-0 [&_h2]:truncate [&_h2]:text-[13px] [&_h2]:leading-[1.35] [&_h2]:font-extrabold [&_h2]:text-gray-900 [&_span]:mt-1 [&_span]:block [&_span]:text-xs [&_span]:text-gray-400">
        <Link to="/movies/$movieId" params={{ movieId: String(movie.id) }}>
          <h2>{movie.title}</h2>
        </Link>
        <span>{movie.release_date}</span>
      </div>
    </li>
  );
}
