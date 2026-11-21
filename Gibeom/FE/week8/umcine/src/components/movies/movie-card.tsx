import { Link } from "@tanstack/react-router";
import type { TmdbMovieListItem } from "../../api/movies/models";
import { cn } from "../../utils/cn";
import { getTmdbPosterUrl } from "../../utils/movies/tmdb-image";

interface MovieCardProps {
  movie: TmdbMovieListItem;
  isBookmarked: boolean;
  onToggleBookmark: (movieId: number) => void;
}

export function MovieCard({
  movie,
  isBookmarked,
  onToggleBookmark,
}: MovieCardProps) {
  const posterUrl = getTmdbPosterUrl(movie.poster_path);
  const bookmarkLabel = isBookmarked
    ? `${movie.title} 북마크 해제`
    : `${movie.title} 북마크 추가`;

  return (
    <li className="min-w-0">
      <article>
        <div className="relative aspect-[5/5.65] overflow-hidden rounded-[9px] bg-[#e4e7eb]">
          <Link
            className="block h-full w-full"
            to="/movies/$movieId"
            params={{ movieId: String(movie.id) }}
            aria-label={`${movie.title} 상세 보기`}
          >
            {posterUrl ? (
              <img
                className="block h-full w-full object-cover object-[center_20%]"
                src={posterUrl}
                alt={`${movie.title} 포스터`}
              />
            ) : (
              <span className="grid h-full place-items-center text-xs text-[#8b95a5]">
                이미지 없음
              </span>
            )}
          </Link>

          <button
            className={cn(
              "absolute right-[9px] top-[9px] grid h-[33px] w-[33px] cursor-pointer place-items-center rounded-[7px] border border-white/80 p-0 shadow-md transition hover:brightness-95 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-blue-500/40",
              isBookmarked
                ? "border-blue-600 bg-blue-600"
                : "bg-black/60",
            )}
            type="button"
            aria-label={bookmarkLabel}
            aria-pressed={isBookmarked}
            onClick={() => onToggleBookmark(movie.id)}
          >
            <img
              className="h-[23px] w-[23px] invert"
              src={
                isBookmarked
                  ? "/icons/bookmark.svg"
                  : "/icons/bookmark-outline.svg"
              }
              alt=""
            />
          </button>
        </div>

        <h2 className="mt-2.5 mb-0.5 truncate text-[14px] leading-[1.35] font-[750] tracking-[-0.025em] text-[#21242b]">
          {movie.title}
        </h2>

        <p className="m-0 text-xs leading-[1.4] text-[#8b95a5]">
          {movie.release_date}
        </p>
      </article>
    </li>
  );
}
