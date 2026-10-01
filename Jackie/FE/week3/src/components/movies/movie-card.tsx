import { cn } from "../../utils/cn";
import { Link } from "@tanstack/react-router";
import type { Movie } from "../../types/movie";

interface MovieCardProps {
  movie: Movie;
  onToggleBookmark: (movieId: number) => void;
}

export default function MovieCard({ movie, onToggleBookmark }: MovieCardProps) {
  return (
    <li className="flex flex-col gap-1">
      <div className="relative h-[274px] w-[241.6px]">
        <img
          className="h-[274px] w-[241.6px] rounded-[10px] object-cover"
          src={movie.posterPath}
          alt={movie.title}
        />

        <button
          className={cn(
            "absolute right-[10px] top-[10px] flex h-[34px] w-[34px] items-center justify-center rounded-[8px] border p-[7.5px_6px]",
            movie.isBookmarked
              ? "border-[#2563EB] bg-[#2563EB]"
              : "border-white bg-[#17191E]",
          )}
          aria-pressed={movie.isBookmarked}
          onClick={() => onToggleBookmark(movie.id)}
        >
          {movie.isBookmarked ? (
            <img
              className="h-6 w-6 brightness-0 invert"
              src="/icons/bookmark.svg"
              alt="북마크 해제"
            />
          ) : (
            <img
              className="h-6 w-6 brightness-0 invert"
              src="/icons/bookmark-outline.svg"
              alt="북마크"
            />
          )}
        </button>
      </div>

      <Link
        to="/movies/$movieId"
        params={{ movieId: String(movie.id) }}
        className="h-[17px] w-[241.6px] pt-[5px] font-['Pretendard'] text-[14px] font-extrabold leading-none tracking-[0] text-[#17191E]"
      >
        {movie.title}
      </Link>

      <span className="h-[14px] w-[241.6px] pt-[5px] font-['Pretendard'] text-[12px] font-normal leading-none tracking-[0] text-[#969DA8]">
        {movie.releaseDate}
      </span>
    </li>
  );
}
