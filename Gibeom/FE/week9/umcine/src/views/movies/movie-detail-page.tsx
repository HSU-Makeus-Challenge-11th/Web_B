import Image from "next/image";
import Link from "next/link";
import type { TmdbMovieDetail } from "../../api/movies/models";
import { FavoriteButton } from "../../components/movies/favorite-button";
import { MovieRatingForm } from "../../components/movies/movie-rating-form";
import {
  getTmdbBackdropUrl,
  getTmdbPosterUrl,
} from "../../utils/movies/tmdb-image";

function getRuntimeText(runtime: number | null) {
  if (runtime === null) return "상영 시간 정보가 없어요.";

  const hours = Math.floor(runtime / 60);
  const minutes = runtime % 60;
  return `${hours}시간 ${minutes}분`;
}

// 서버에서 조회한 영화 정보를 그리는 Server Component
// 즐겨찾기 버튼과 평점 폼처럼 토큰·클릭이 필요한 부분만 Client Component로 넣음
export function MovieDetail({ movie }: { movie: TmdbMovieDetail }) {
  const backdropUrl = getTmdbBackdropUrl(movie.backdrop_path);
  const posterUrl = getTmdbPosterUrl(movie.poster_path);

  return (
    <main className="flex-1 bg-[#f6f7f9]">
      <section
        className="relative min-h-[260px] bg-[#555d6c] text-white min-[481px]:min-h-[300px]"
        aria-labelledby="movie-detail-title"
      >
        {backdropUrl ? (
          // 첫 화면에서 가장 큰 이미지(LCP)라 지연 로딩하지 않고 먼저 요청함
          // (Next.js 16부터 priority 대신 loading="eager"·fetchPriority 사용)
          <Image
            className="object-cover object-[center_32%]"
            src={backdropUrl}
            alt=""
            fill
            sizes="100vw"
            loading="eager"
            fetchPriority="high"
          />
        ) : (
          <span className="absolute inset-0 z-1 grid place-items-center text-sm text-white/70">
            이미지 없음
          </span>
        )}
        <div
          className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,12,19,0.9)_0%,rgba(8,12,19,0.58)_48%,rgba(8,12,19,0.18)_100%)]"
          aria-hidden="true"
        />
        <div className="relative z-1 mx-auto flex min-h-[260px] w-[min(1170px,calc(100%-32px))] flex-col justify-between py-6 pb-[34px] min-[481px]:min-h-[300px] min-[721px]:w-[min(1170px,calc(100%-48px))]">
          <Link
            className="w-fit text-sm font-[650] text-white no-underline focus-visible:rounded-sm focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-blue-500/40"
            href="/"
          >
            <span className="mr-1 text-[21px] leading-none" aria-hidden="true">
              ‹
            </span>{" "}
            영화 목록
          </Link>
          <div>
            <h1
              className="mt-0 mb-[7px] text-[clamp(28px,3vw,42px)] leading-[1.2] font-bold tracking-[-0.045em]"
              id="movie-detail-title"
            >
              {movie.title}
            </h1>
            <p className="mt-1 mb-0 text-[13px] text-white/80">
              {movie.original_title}
            </p>
            <p className="mt-1 mb-0 text-[13px] text-white/80">
              {movie.release_date} ·{" "}
              {movie.genres.map((genre) => genre.name).join(", ")} ·{" "}
              {getRuntimeText(movie.runtime)}
            </p>
          </div>
        </div>
      </section>

      <section
        className="mx-auto grid w-[min(1170px,calc(100%-32px))] grid-cols-1 gap-[18px] pt-[30px] pb-[84px] min-[481px]:grid-cols-[110px_minmax(0,1fr)] min-[721px]:w-[min(1170px,calc(100%-48px))] min-[721px]:grid-cols-[150px_minmax(0,1fr)] min-[721px]:gap-7 min-[1025px]:grid-cols-[165px_minmax(0,1fr)_300px]"
        aria-label="영화 상세 정보"
      >
        {posterUrl ? (
          <Image
            className="block aspect-2/3 h-auto w-[min(180px,55vw)] rounded-lg object-cover shadow-[0_8px_22px_rgba(15,23,42,0.16)] min-[481px]:w-full"
            src={posterUrl}
            alt={`${movie.title} 포스터`}
            width={500}
            height={750}
            sizes="(min-width: 1025px) 165px, (min-width: 721px) 150px, (min-width: 481px) 110px, 180px"
            loading="eager"
          />
        ) : (
          <div className="grid aspect-2/3 w-[min(180px,55vw)] place-items-center rounded-lg bg-[#e4e7eb] text-xs text-[#8b95a5] shadow-[0_8px_22px_rgba(15,23,42,0.16)] min-[481px]:w-full">
            이미지 없음
          </div>
        )}

        <div className="mt-1 min-w-0 min-[481px]:mt-0 min-[721px]:px-2 min-[721px]:py-1">
          <h2 className="mt-0 mb-3.5 text-xl font-bold tracking-[-0.025em]">
            {movie.tagline}
          </h2>
          <p className="m-0 text-sm leading-[1.75] text-[#656e7c]">
            {movie.overview}
          </p>
          <FavoriteButton movieId={movie.id} title={movie.title} />
        </div>

        <MovieRatingForm movieId={movie.id} />
      </section>
    </main>
  );
}
