import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "@tanstack/react-router";
import { useState } from "react";
import { getMovieDetail } from "../../api/movies/get-movie-detail";
import type { TmdbMovieDetail } from "../../api/movies/models";
import { Icon } from "../../components/common/icon";
import { BookmarkButton } from "../../components/movies/bookmark-button";
import { MovieImage } from "../../components/movies/movie-image";
import { cn } from "../../utils/cn";
import { formatReleaseDate, formatRuntime } from "../../utils/movies/format-movie";
import {
  getMovieDetailErrorMessage,
  isMovieNotFoundError,
} from "../../utils/movies/get-movie-detail-error-message";
import { getTmdbBackdropUrl, getTmdbPosterUrl } from "../../utils/movies/tmdb-image";

const RATING_SCORES = [1, 2, 3, 4, 5];
const THIRTY_SECONDS = 30 * 1000;

function MovieDetailMessage({ message }: { message: string }) {
  return (
    <main className="mx-auto flex w-[1280px] flex-col items-center py-32 text-center">
      <p className="text-xl font-bold">{message}</p>
      <Link
        to="/"
        className="mt-6 flex h-10 items-center rounded-lg bg-action px-4 text-sm font-semibold text-white hover:bg-action-hover"
      >
        영화 목록으로 돌아가기
      </Link>
    </main>
  );
}

interface MovieDetailContentProps {
  movie: TmdbMovieDetail;
}

function MovieDetailContent({ movie }: MovieDetailContentProps) {
  const [rating, setRating] = useState(0);

  return (
    <main>
      <section className="relative h-[358px] overflow-hidden bg-fg text-white">
        <MovieImage
          src={getTmdbBackdropUrl(movie.backdrop_path)}
          alt=""
          className="absolute inset-0 size-full"
        />
        <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/25 to-transparent" />
        <div className="absolute inset-0 bg-linear-to-t from-black/75 via-transparent to-black/20" />

        <div className="relative mx-auto flex h-full w-[1280px] flex-col pt-7 pb-6">
          <Link to="/" className="flex w-fit items-center gap-1 text-[13px] font-semibold">
            <Icon name="chevron-left" />
            영화 목록
          </Link>

          <div className="mt-auto">
            <h1 className="text-[44px] leading-[56px] font-bold tracking-tight">{movie.title}</h1>
            <p className="mt-1 text-base text-white/90">{movie.original_title}</p>
            <p className="mt-2 flex gap-3 text-sm font-semibold">
              <span>{formatReleaseDate(movie.release_date)}</span>
              <span>{movie.genres.map((genre) => genre.name).join(", ")}</span>
              <span>{formatRuntime(movie.runtime)}</span>
            </p>
          </div>
        </div>
      </section>

      <div className="mx-auto grid w-[1280px] grid-cols-[200px_1fr_360px] gap-8 pt-6 pb-16">
        <MovieImage
          src={getTmdbPosterUrl(movie.poster_path)}
          alt={`${movie.title} 포스터`}
          className="h-[284px] w-[200px] rounded-lg shadow-[0_12px_28px_rgba(23,25,30,0.25)]"
        />

        <div className="pt-1">
          {movie.tagline && <h2 className="mb-3 text-xl leading-7 font-bold">{movie.tagline}</h2>}
          <p className="text-[15px] leading-6 text-fg-secondary">
            {movie.overview || "줄거리 정보가 없어요."}
          </p>
          <BookmarkButton
            movieId={movie.id}
            movieTitle={movie.title}
            variant="detail"
            className="mt-5"
          />
        </div>

        <aside className="border-l border-line pt-1 pl-8">
          <h2 className="text-lg leading-7 font-bold">내 평점</h2>
          <p className="mt-0.5 text-[13px] text-fg-tertiary">별점은 필수, 후기는 선택이에요.</p>

          <div className="mt-3 flex gap-1.5" role="group" aria-label="별점 선택">
            {RATING_SCORES.map((score) => (
              <button
                key={score}
                type="button"
                aria-label={`${score}점`}
                aria-pressed={score <= rating}
                onClick={() => setRating(score)}
                className={cn(
                  "flex size-9 items-center justify-center rounded-lg border border-line bg-surface",
                  score <= rating ? "text-action" : "text-fg-secondary hover:text-fg",
                )}
              >
                <Icon name="star" />
              </button>
            ))}
          </div>

          <textarea
            aria-label="후기"
            placeholder="영화를 보고 느낀 점을 남겨보세요."
            className="mt-3 h-[100px] w-full resize-none rounded-lg border border-line bg-surface px-4 py-3 text-sm outline-none placeholder:text-fg-tertiary focus:border-fg-tertiary"
          />

          {/* 평점 저장은 서버 연동 전이라 별점을 고르기 전까지 비활성화만 해 둬요 */}
          <button
            type="button"
            disabled={rating === 0}
            className="mt-3 h-10 w-full rounded-lg bg-fg text-sm font-semibold text-white hover:bg-fg/85 disabled:cursor-not-allowed disabled:hover:bg-fg"
          >
            평점 저장
          </button>
        </aside>
      </div>
    </main>
  );
}

export function MovieDetailPage() {
  const { movieId: movieIdParam } = useParams({ from: "/movies/$movieId" });
  const movieId = Number(movieIdParam);
  const isValidMovieId = Number.isInteger(movieId) && movieId > 0;

  const movieDetailQuery = useQuery({
    queryKey: ["movies", "detail", movieId],
    queryFn: () => getMovieDetail(movieId),
    enabled: isValidMovieId,
    // 미니 실습: 상세 조회는 전역 기본값(1분) 대신 30초 동안만 최신으로 취급해요
    staleTime: THIRTY_SECONDS,
    // 없는 영화(404)는 다시 요청해도 결과가 같아서 재시도하지 않아요
    retry: (failureCount, error) => !isMovieNotFoundError(error) && failureCount < 3,
  });

  // 유효하지 않은 번호는 요청하지 않아도 isPending이 참이라 로딩보다 먼저 확인해요
  if (!isValidMovieId) {
    return <MovieDetailMessage message="올바르지 않은 영화 번호예요." />;
  }

  if (movieDetailQuery.isPending) {
    return <main className="py-32 text-center text-fg-secondary">영화 정보를 불러오는 중이에요.</main>;
  }

  if (movieDetailQuery.isError) {
    return <MovieDetailMessage message={getMovieDetailErrorMessage(movieDetailQuery.error)} />;
  }

  // movieId가 바뀌면 key로 새로 만들어 이전 영화의 별점 입력이 남지 않게 해요
  return <MovieDetailContent key={movieId} movie={movieDetailQuery.data} />;
}
