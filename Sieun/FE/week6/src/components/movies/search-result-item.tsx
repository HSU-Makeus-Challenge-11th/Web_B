import { Link } from "@tanstack/react-router";
import type { TmdbMovieListItem } from "../../api/movies/models";
import { formatReleaseDate } from "../../utils/movies/format-movie";
import { getTmdbPosterUrl } from "../../utils/movies/tmdb-image";
import { Icon } from "../common/icon";
import { BookmarkButton } from "./bookmark-button";
import { MovieImage } from "./movie-image";

interface SearchResultItemProps {
  movie: TmdbMovieListItem;
}

export function SearchResultItem({ movie }: SearchResultItemProps) {
  const detailLink = { to: "/movies/$movieId", params: { movieId: String(movie.id) } } as const;

  return (
    <article className="flex gap-5 border-b border-line py-6">
      <div className="relative shrink-0">
        <Link {...detailLink}>
          <MovieImage
            src={getTmdbPosterUrl(movie.poster_path)}
            alt={`${movie.title} 포스터`}
            className="h-[189px] w-[126px] rounded-md"
          />
        </Link>
        <BookmarkButton
          movieId={movie.id}
          movieTitle={movie.title}
          variant="overlay"
          className="absolute top-2 right-2 size-7 [&>span]:size-4"
        />
      </div>

      <div className="flex min-w-0 flex-1 flex-col pt-1">
        <h3 className="truncate text-lg leading-7 font-bold">{movie.title}</h3>
        <p className="mt-1 flex gap-2.5 text-[13px] text-fg-tertiary">
          <span className="truncate">{movie.original_title}</span>
          <span className="shrink-0">{formatReleaseDate(movie.release_date)}</span>
        </p>
        <p className="mt-3 mb-3 line-clamp-3 text-sm leading-[22px] text-fg-secondary">
          {movie.overview || "줄거리 정보가 없어요."}
        </p>
        <Link
          {...detailLink}
          className="mt-auto mb-6 flex w-fit items-center gap-1 text-[13px] font-semibold text-action hover:text-action-hover"
        >
          상세 보기
          <Icon name="arrow-right" className="size-4" />
        </Link>
      </div>
    </article>
  );
}
