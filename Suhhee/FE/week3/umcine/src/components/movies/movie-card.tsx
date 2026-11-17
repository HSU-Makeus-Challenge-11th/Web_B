import { Link } from "@tanstack/react-router";
import type { Movie } from "../../types/movie";
import { cn } from "../../utils/cn";

interface MovieCardProps {
  movie: Movie
  onToggleBookmark: (movieId: number) => void
}

function MovieCard({
  movie,
  onToggleBookmark,
}: MovieCardProps) {
  const bookmarkIcon = movie.isBookmarked
    ? "/icons/bookmark.svg"
    : "/icons/bookmark-outline.svg";

  const bookmarkLabel = movie.isBookmarked
    ? `${movie.title} 북마크 해제`
    : `${movie.title} 북마크 추가`;

  return (
    <article className="flex h-[318px] min-w-0 flex-col gap-1">
      <div className="relative h-[274px] w-full shrink-0 overflow-hidden rounded-[10px] bg-[#f6f7f9]">
        <Link
          className="block h-full w-full outline-none focus-visible:ring-3 focus-visible:ring-blue-600/35"
          to="/movies/$movieId"
          params={{ movieId: String(movie.id) }}
          aria-label={`${movie.title} 상세 보기`}
        >
          <img
            className="block h-full w-full object-cover object-center transition-transform duration-200 hover:scale-[1.02]"
            src={movie.posterPath}
            alt={`${movie.title} 포스터`}
          />
        </Link>

        <button
          className={cn(
            "absolute top-2.5 right-2.5 flex size-[34px] cursor-pointer items-center justify-center rounded-lg border p-0 outline-none focus-visible:ring-3 focus-visible:ring-blue-600/35",
            movie.isBookmarked
              ? "border-[#2563eb] bg-[#2563eb] hover:bg-[#1d4ed8]"
              : "border-white bg-[#17191e]",
          )}
          type="button"
          aria-label={bookmarkLabel}
          aria-pressed={movie.isBookmarked}
          onClick={() => onToggleBookmark(movie.id)}
        >
          <img className="size-6 invert" src={bookmarkIcon} alt="" />
        </button>
      </div>

      <h2 className="m-0 h-[22px] w-full overflow-hidden pt-[5px] text-sm leading-[17px] font-extrabold text-ellipsis whitespace-nowrap text-[#17191e]">
        <Link
          className="text-inherit no-underline outline-none hover:underline focus-visible:ring-3 focus-visible:ring-blue-600/35"
          to="/movies/$movieId"
          params={{ movieId: String(movie.id) }}
        >
          {movie.title}
        </Link>
      </h2>
      <p className="m-0 h-3.5 w-full text-xs leading-3.5 font-normal text-[#969da8]">
        {movie.releaseDate}
      </p>
    </article>
  );
}

export default MovieCard;
