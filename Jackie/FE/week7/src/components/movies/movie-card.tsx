import { Link } from "@tanstack/react-router";
import type { TmdbMovieListItem } from "../../api/movies/models";
import { BookmarkButton } from "../bookmark-button";

interface MovieCardProps {
  movie: TmdbMovieListItem;
}

export default function MovieCard({ movie }: MovieCardProps) {
  return (
    <li className="flex flex-col gap-1">
      <div className="relative h-[274px] w-[241.6px]">
        <img
          className="h-[274px] w-[241.6px] rounded-[10px] object-cover"
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : ""
          }
          alt={movie.title}
        />

        <BookmarkButton movieId={movie.id} />
      </div>

      <Link
        to="/movies/$movieId"
        params={{ movieId: String(movie.id) }}
        className="h-[17px] w-[241.6px] pt-[5px] font-['Pretendard'] text-[14px] font-extrabold leading-none tracking-[0] text-[#17191E]"
      >
        {movie.title}
      </Link>

      <span className="h-[14px] w-[241.6px] pt-[5px] font-['Pretendard'] text-[12px] font-normal leading-none tracking-[0] text-[#969DA8]">
        {movie.release_date}
      </span>
    </li>
  );
}
