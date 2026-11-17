import { Link } from "@tanstack/react-router";
import type { TmdbMovieListItem } from "../../api/movies/models";
import { formatReleaseDate } from "../../utils/movies/format-movie";
import { getTmdbPosterUrl } from "../../utils/movies/tmdb-image";
import { BookmarkButton } from "./bookmark-button";
import { MovieImage } from "./movie-image";

interface MovieCardProps {
  movie: TmdbMovieListItem;
}

export function MovieCard({ movie }: MovieCardProps) {
  return (
    <article className="relative min-w-0">
      <Link
        to="/movies/$movieId"
        params={{ movieId: String(movie.id) }}
        className="group block"
      >
        <div className="h-[272px] overflow-hidden rounded-lg bg-line">
          <MovieImage
            src={getTmdbPosterUrl(movie.poster_path)}
            alt={`${movie.title} 포스터`}
            className="size-full transition-transform duration-200 group-hover:scale-105"
          />
        </div>
        <h2 className="mt-2 truncate text-sm leading-5 font-semibold">{movie.title}</h2>
        <p className="mt-1 text-xs leading-4 text-fg-tertiary">{formatReleaseDate(movie.release_date)}</p>
      </Link>

      {/* 카드 링크 안에 버튼을 넣지 않도록 포스터 위에 겹쳐서 배치해요 */}
      <BookmarkButton
        movieId={movie.id}
        movieTitle={movie.title}
        variant="overlay"
        className="absolute top-3 right-3"
      />
    </article>
  );
}
