"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { getMovieDetail } from "../../api/movies/get-movie-detail";
import { cn } from "../../utils/cn";
import { BookmarkButton } from "../../components/bookmark-button";
import { MovieRating } from "../../components/movie-rating";
import { getMovieDetailErrorMessage } from "../../utils/movies/get-movie-detail-error-message";
import {
  getTmdbBackdropUrl,
  getTmdbPosterUrl,
} from "../../utils/movies/tmdb-image";

export function MovieDetailPage({ movieId }: { movieId: number }) {
  return <MovieDetailPageContent key={movieId} movieId={movieId} />;
}

function MovieDetailPageContent({ movieId }: { movieId: number }) {
  const isValidMovieId = Number.isInteger(movieId) && movieId > 0;
  const movieDetailQuery = useQuery({
    queryKey: ["movies", "detail", movieId],
    queryFn: () => getMovieDetail(movieId),
    enabled: isValidMovieId,
  });

  if (!isValidMovieId) {
    return <MovieDetailStatus message="올바르지 않은 영화 번호예요." isError />;
  }

  if (movieDetailQuery.isPending) {
    return <MovieDetailStatus message="영화 정보를 불러오는 중이에요." />;
  }

  if (movieDetailQuery.isError) {
    return (
      <MovieDetailStatus
        message={getMovieDetailErrorMessage(movieDetailQuery.error)}
        isError
      />
    );
  }

  const movie = movieDetailQuery.data;

  if (!movie) {
    return <MovieDetailStatus message="영화를 찾을 수 없어요." isError />;
  }

  const posterUrl = getTmdbPosterUrl(movie.poster_path);
  const backdropUrl = getTmdbBackdropUrl(movie.backdrop_path);
  const genreNames = movie.genres.map((genre) => genre.name).join(", ");
  const runtimeText = formatRuntime(movie.runtime);

  return (
    <main className="min-h-[calc(100svh_-_64px)] bg-[#f4f6fb]">
      <section
        className={cn(
          "min-h-[300px] bg-cover bg-center text-white max-[720px]:min-h-[260px]",
          !backdropUrl && "bg-gray-600",
        )}
        style={{
          backgroundImage: backdropUrl
            ? `linear-gradient(90deg, rgba(17, 24, 39, 0.9), rgba(17, 24, 39, 0.44), rgba(17, 24, 39, 0.1)), url(${backdropUrl})`
            : undefined,
        }}
      >
        <div className="mx-auto w-[calc(100%_-_32px)] max-w-[1120px] max-[720px]:w-[calc(100%_-_24px)] flex min-h-[300px] flex-col justify-between pt-[22px] pb-[34px] max-[720px]:min-h-[260px]">
          <Link className="w-fit rounded-md bg-gray-900/35 px-[9px] py-[7px] text-[13px] font-extrabold text-white" href="/">
            &lt; 영화 목록
          </Link>
          {!backdropUrl && (
            <p className="m-0 self-center">이미지 없음</p>
          )}
          <div className="max-w-[640px] [&_h1]:mb-2 [&_h1]:text-[34px] [&_h1]:leading-[1.2] [&_h1]:font-black [&_h1]:text-white max-[720px]:[&_h1]:text-[27px] [&_p]:mb-1.5 [&_p]:text-sm [&_p]:font-bold [&_p]:text-white/85 [&_span]:block [&_span]:text-[13px] [&_span]:font-bold [&_span]:text-white/90">
            <h1>{movie.title}</h1>
            <p>{movie.original_title}</p>
            <span>
              {movie.release_date} · {genreNames} · {runtimeText}
            </span>
          </div>
        </div>
      </section>

      <section className="mx-auto w-[calc(100%_-_32px)] max-w-[1120px] max-[720px]:w-[calc(100%_-_24px)] grid grid-cols-[170px_minmax(0,1fr)_280px] gap-7 pt-7 pb-24 max-[1000px]:grid-cols-[140px_minmax(0,1fr)] max-[720px]:grid-cols-[110px_minmax(0,1fr)] max-[720px]:gap-[18px] max-[720px]:pb-14">
        {posterUrl ? (
          <img
            className="aspect-[2/3] w-[170px] self-start rounded-lg object-cover shadow-[0_18px_36px_rgba(15,23,42,0.22)] max-[1000px]:w-[140px] max-[720px]:w-[110px]"
            src={posterUrl}
            alt={`${movie.title} 포스터`}
          />
        ) : (
          <div className="aspect-[2/3] w-[170px] self-start rounded-lg object-cover shadow-[0_18px_36px_rgba(15,23,42,0.22)] max-[1000px]:w-[140px] max-[720px]:w-[110px] grid place-items-center bg-gray-200 text-[13px] text-gray-500">
            이미지 없음
          </div>
        )}

        <article className="pr-3 [&_h2]:mb-3.5 [&_h2]:text-lg [&_h2]:leading-[1.35] [&_h2]:font-black [&_h2]:text-gray-900 [&_p]:mb-3 [&_p]:text-sm [&_p]:leading-7 [&_p]:text-gray-600 [&_button]:mt-1">
          {movie.tagline && <h2>{movie.tagline}</h2>}
          <p>{movie.overview}</p>
          <p>
            {genreNames && `이 영화는 ${genreNames} 장르의 작품입니다. `}
            {typeof movie.runtime === "number"
              ? `러닝타임은 ${runtimeText}입니다.`
              : runtimeText}
          </p>
          <BookmarkButton movieId={movie.id} movieTitle={movie.title} />
        </article>

        <MovieRating movieId={movie.id} />
      </section>
    </main>
  );
}

function MovieDetailStatus({
  message,
  isError = false,
}: {
  message: string;
  isError?: boolean;
}) {
  return (
    <main className="min-h-[calc(100svh_-_64px)] bg-[#f4f6fb]">
      <div className="mx-auto w-[calc(100%_-_32px)] max-w-[1120px] max-[720px]:w-[calc(100%_-_24px)] py-10 text-gray-500 [&_a]:text-blue-600">
        <Link href="/">&lt; 영화 목록</Link>
        <p role={isError ? "alert" : "status"}>{message}</p>
      </div>
    </main>
  );
}

function formatRuntime(runtime: number | null) {
  if (typeof runtime !== "number") return "상영 시간 정보가 없어요.";

  const hours = Math.floor(runtime / 60);
  const minutes = runtime % 60;

  return hours > 0 ? `${hours}시간 ${minutes}분` : `${minutes}분`;
}
