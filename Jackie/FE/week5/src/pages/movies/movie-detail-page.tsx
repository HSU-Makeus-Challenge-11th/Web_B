import { Link, useParams } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { getMovieDetail } from "../../api/movies/get-movie-detail";
import type { TmdbMovieDetail } from "../../api/movies/models";
import { getMovieDetailErrorMessage } from "../../utils/movies/get-movie-detail-error-message";
import { cn } from "../../utils/cn";
import { useBookmarkStore } from "../../stores/bookmark-store";

export function MovieDetailPage() {
  const { movieId } = useParams({ from: "/movies/$movieId" });
  const parsedMovieId = Number(movieId);
  const isValidMovieId = Number.isInteger(parsedMovieId) && parsedMovieId > 0;

  const [movie, setMovie] = useState<TmdbMovieDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const isBookmarked = useBookmarkStore((state) =>
    state.bookmarkedMovieIds.includes(parsedMovieId),
  );

  const toggleBookmark = useBookmarkStore((state) => state.toggleBookmark);

  useEffect(() => {
    let ignore = false;

    setMovie(null);
    setErrorMessage(null);

    if (!isValidMovieId) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    getMovieDetail(parsedMovieId)
      .then((response) => {
        if (!ignore) setMovie(response);
      })
      .catch((error) => {
        if (!ignore) {
          setErrorMessage(getMovieDetailErrorMessage(error));
        }
      })
      .finally(() => {
        if (!ignore) setIsLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, [parsedMovieId, isValidMovieId]);

  if (!isValidMovieId) {
    return <main>올바르지 않은 영화 번호예요.</main>;
  }

  if (isLoading) {
    return <main>영화 정보를 불러오는 중이에요.</main>;
  }

  if (errorMessage) {
    return <main>{errorMessage}</main>;
  }

  if (!movie) {
    return <main>영화를 찾을 수 없어요.</main>;
  }

  const genres = movie.genres.map((genre) => genre.name).join(" · ");

  const runtime =
    movie.runtime === null
      ? "상영 시간 정보가 없어요."
      : `${Math.floor(movie.runtime / 60)}시간 ${movie.runtime % 60}분`;

  return (
    <main>
      <div className="w-[1440px] h-[1024px] pb-[238px] bg-[#F6F7F9]">
        <div className="relative w-[1440px] h-[360px]">
          <img
            className="absolute inset-0 w-[1440px] h-[360px] object-cover opacity-100"
            src={
              movie.backdrop_path
                ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
                : ""
            }
            alt=""
            aria-hidden="true"
          />

          <div className="absolute inset-0 flex flex-col w-[1440px] h-[360px] justify-between px-[80px] py-[24px] text-white">
            <Link
              to="/"
              className="flex items-center w-[76px] h-[24px] gap-[4px]"
            >
              <img
                className="w-[24px] h-[24px] brightness-0 invert"
                src="/icons/chevron-left.svg"
                alt=""
              />
              <span className="font-['Pretendard'] text-[13px] font-[700] leading-[16px]">
                영화 목록
              </span>
            </Link>

            <div className="flex flex-col w-[800px] gap-[8px]">
              <h1 className="m-0 w-[800px] font-['Pretendard'] text-[46px] font-[700] leading-[49.68px] tracking-[-2.3px]">
                {movie.title}
              </h1>

              <p className="m-0 w-[800px] font-['Pretendard'] text-[14px] font-[400] leading-[17px]">
                {movie.original_title}
              </p>

              <div className="flex items-center w-[800px] h-[16px] gap-[8px] font-['Pretendard'] text-[13px] font-[700] leading-[16px]">
                <span>{movie.release_date}</span>
                <span>{genres}</span>
                <span>{runtime}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex w-[1440px] h-[342px] px-[80px] py-[24px] gap-[32px]">
          <img
            className="flex flex-col w-[200px] h-[286px] rounded-[10px] bg-[#F6F7F9] shadow-[0_12px_30px_0_rgba(12,15,20,0.12)]"
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : ""
            }
            alt={`${movie.title} 포스터`}
          />

          <div className="flex flex-col w-[656px] h-[163px] gap-[12px]">
            <h2 className="w-[656px] h-[25px] font-['Pretendard'] text-[21px] font-[700] leading-[100%] tracking-[-0.63px] text-[#17191E]">
              {movie.tagline}
            </h2>

            <p className="w-[656px] h-[72px] font-['Pretendard'] text-[14px] font-[400] leading-[24px] text-[#606774]">
              {movie.overview}
            </p>

            <button
              className={cn(
                "flex w-[107px] h-[42px] items-center justify-center rounded-[8px] border px-[16px] gap-[8px]",
                isBookmarked
                  ? "border-[#2563EB] bg-[#2563EB]"
                  : "border-[#FFFFFF] bg-[#17191E]",
              )}
              aria-pressed={isBookmarked}
              onClick={() => toggleBookmark(movie.id)}
            >
              <img
                className="w-[16px] h-[16px] brightness-0 invert"
                src={
                  isBookmarked
                    ? "/icons/bookmark.svg"
                    : "/icons/bookmark-outline.svg"
                }
                alt=""
              />

              <span className="w-[49px] h-[17px] font-['Pretendard'] text-[14px] font-[800] leading-[100%] text-[#FFFFFF]">
                즐겨찾기
              </span>
            </button>
          </div>

          <div className="flex flex-col w-[360px] h-[294px] border-l border-[#E3E6EB] pb-[41px] pl-[30px] gap-[8px]">
            <h2 className="flex flex-col w-[329px] h-[25px] font-['Pretendard'] text-[21px] font-[700] leading-[100%] tracking-[-0.63px] text-[#17191E]">
              내 평점
            </h2>

            <p className="flex flex-col w-[329px] h-[14px] font-['Pretendard'] text-[12px] font-[400] leading-[100%] text-[#969DA8]">
              별점은 필수, 후기는 선택이에요.
            </p>

            <div className="flex w-[329px] h-[38px] gap-[4px]">
              <button
                type="button"
                className="flex w-[40px] h-[40px] items-center justify-center rounded-[8px] border border-[#E3E6EB] px-[6px] py-[1px] bg-[#FFFFFF] text-[24px] text-[#606774]"
              >
                ★
              </button>

              <button
                type="button"
                className="flex w-[40px] h-[40px] items-center justify-center rounded-[8px] border border-[#E3E6EB] px-[6px] py-[1px] bg-[#FFFFFF] text-[24px] text-[#606774]"
              >
                ★
              </button>

              <button
                type="button"
                className="flex w-[40px] h-[40px] items-center justify-center rounded-[8px] border border-[#E3E6EB] px-[6px] py-[1px] bg-[#FFFFFF] text-[24px] text-[#606774]"
              >
                ★
              </button>

              <button
                type="button"
                className="flex w-[40px] h-[40px] items-center justify-center rounded-[8px] border border-[#E3E6EB] px-[6px] py-[1px] bg-[#FFFFFF] text-[24px] text-[#606774]"
              >
                ★
              </button>

              <button
                type="button"
                className="flex w-[40px] h-[40px] items-center justify-center rounded-[8px] border border-[#E3E6EB] px-[6px] py-[1px] bg-[#FFFFFF] text-[24px] text-[#606774]"
              >
                ★
              </button>
            </div>

            <textarea
              className="w-[329px] h-[102px] resize-none rounded-[8px] border border-[#E3E6EB] bg-[#FFFFFF] pt-[16px] pr-[12px] pb-[18px] pl-[12px] font-['Pretendard'] text-[13px] font-[400] leading-[19.5px] text-[#17191E] outline-none placeholder:text-[#969DA8]"
              placeholder="영화를 보고 느낀 점을 남겨보세요."
            />

            <button
              type="button"
              className="flex w-[329px] h-[42px] items-center justify-center rounded-[8px] border border-[#FFFFFF] bg-[#17191E] px-[16px]"
            >
              <p className="m-0 w-[52px] h-[17px] font-['Pretendard'] text-[14px] font-[800] leading-[100%] text-[#FFFFFF]">
                평점 저장
              </p>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
