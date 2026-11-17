import { Link, useParams } from "@tanstack/react-router";
import { useState } from "react";
import { Footer } from "../../components/layout/footer";
import { movies } from "../../data/movies";
import { cn } from "../../utils/cn";

export function MovieDetailPage() {
  const { movieId } = useParams({ from: "/movies/$movieId" });
  const movie = movies.find((item) => item.id === Number(movieId));
  const [isBookmarked, setIsBookmarked] = useState(movie?.isBookmarked ?? false);
  const [rating, setRating] = useState(0);

  if (!movie) {
    return (
      <main className="mx-auto flex min-h-[calc(100vh-91px)] w-full max-w-[1440px] items-center justify-center px-4 py-16 text-center sm:px-8 lg:px-20">
        <div>
          <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-[#e3e6eb]">
            <img className="size-7 opacity-55" src="/icons/movie.svg" alt="" />
          </span>
          <h1 className="mt-5 mb-0 text-2xl font-bold text-[#17191e]">
            영화를 찾을 수 없어요.
          </h1>
          <Link
            className="mt-5 inline-flex h-11 items-center justify-center rounded-lg bg-[#17191e] px-5 text-sm font-extrabold text-white no-underline outline-none hover:bg-black focus-visible:ring-3 focus-visible:ring-blue-600/35"
            to="/"
          >
            영화 목록으로 돌아가기
          </Link>
        </div>
      </main>
    );
  }

  return (
    <>
      <main className="min-h-[calc(100vh-91px)] bg-[#f6f7f9] pb-[81px] text-[#17191e]">
        <section className="relative isolate h-[360px] overflow-hidden text-white">
          <img
            className="absolute inset-0 -z-20 h-full w-full object-cover object-center"
            src={movie.backdropPath}
            alt=""
            aria-hidden="true"
          />
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(10,12,16,0.82)_0%,rgba(10,12,16,0.38)_58%,rgba(10,12,16,0.12)_100%)]" />
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(0deg,rgba(10,12,16,0.86)_0%,transparent_65%)]" />

          <div className="mx-auto flex h-full w-full max-w-[1440px] flex-col justify-between px-4 py-6 sm:px-8 lg:px-20">
            <Link
              className="inline-flex w-fit items-center gap-1.5 text-sm font-bold text-white no-underline outline-none hover:opacity-80 focus-visible:ring-3 focus-visible:ring-white/40"
              to="/"
            >
              <img className="size-5 invert" src="/icons/chevron-left.svg" alt="" />
              영화 목록
            </Link>

            <div>
              <h1 className="m-0 text-[36px] leading-[42px] font-black tracking-[-1.8px] sm:text-[46px] sm:leading-[50px] sm:tracking-[-2.3px]">
                {movie.title}
              </h1>
              <p className="mt-1 mb-0 text-sm text-white/80">{movie.originalTitle}</p>
              <p className="mt-2 mb-0 text-[13px] font-medium text-white/80">
                {movie.releaseDate} · {movie.genres.join(" · ")} · {movie.runtime}
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto flex w-full max-w-[1440px] flex-col gap-6 px-4 py-6 sm:px-8 lg:flex-row lg:gap-8 lg:px-20">
          <img
            className="h-[286px] w-[200px] shrink-0 rounded-[10px] object-cover shadow-[0_12px_30px_rgba(12,15,20,0.12)]"
            src={movie.posterPath}
            alt={`${movie.title} 포스터`}
          />

          <div className="flex min-w-0 flex-1 flex-col gap-3">
            <h2 className="m-0 text-[21px] leading-7 font-extrabold tracking-[-0.4px]">
              {movie.tagline}
            </h2>
            <p className="m-0 text-sm leading-6 text-[#606774]">{movie.overview}</p>
            <button
              className={cn(
                "mt-auto flex h-[42px] w-fit cursor-pointer items-center gap-2 rounded-lg border px-4 text-sm font-extrabold outline-none focus-visible:ring-3 focus-visible:ring-blue-600/35",
                isBookmarked
                  ? "border-[#17191e] bg-[#17191e] text-white"
                  : "border-[#2563eb] bg-[#2563eb] text-white hover:bg-[#1d4ed8]",
              )}
              type="button"
              aria-pressed={isBookmarked}
              onClick={() => setIsBookmarked((current) => !current)}
            >
              <img
                className="size-5 invert"
                src={isBookmarked ? "/icons/bookmark.svg" : "/icons/bookmark-outline.svg"}
                alt=""
              />
              {isBookmarked ? "즐겨찾기 해제" : "즐겨찾기"}
            </button>
          </div>

          <aside className="w-full border-t border-[#d7dbe2] pt-6 lg:w-[360px] lg:border-t-0 lg:border-l lg:pt-0 lg:pl-[30px]">
            <h2 className="m-0 text-[21px] leading-7 font-extrabold">영화는 어떠셨나요?</h2>
            <p className="mt-1 mb-0 text-xs text-[#606774]">별점과 한줄평을 남겨보세요.</p>

            <div className="mt-3 flex gap-1" role="group" aria-label="별점 선택">
              {[1, 2, 3, 4, 5].map((score) => (
                <button
                  className={cn(
                    "flex size-[38px] cursor-pointer items-center justify-center rounded-lg border p-0 outline-none focus-visible:ring-3 focus-visible:ring-blue-600/35",
                    score <= rating
                      ? "border-[#17191e] bg-[#17191e]"
                      : "border-[#d7dbe2] bg-white hover:bg-[#eef0f3]",
                  )}
                  key={score}
                  type="button"
                  aria-label={`${score}점`}
                  aria-pressed={score === rating}
                  onClick={() => setRating(score)}
                >
                  <img
                    className={cn("size-5", score <= rating && "invert")}
                    src={score <= rating ? "/icons/star.svg" : "/icons/star-outline.svg"}
                    alt=""
                  />
                </button>
              ))}
            </div>

            <label className="sr-only" htmlFor="movie-review">
              한줄평
            </label>
            <textarea
              className="mt-3 h-[102px] w-full resize-none rounded-lg border border-[#d7dbe2] bg-white p-3 text-sm leading-5 outline-none placeholder:text-[#969da8] focus:border-[#17191e]"
              id="movie-review"
              placeholder="한줄평을 입력해 주세요."
            />
            <button
              className="mt-2 h-[42px] w-full cursor-pointer rounded-lg border-0 bg-[#17191e] text-sm font-extrabold text-white outline-none hover:bg-black focus-visible:ring-3 focus-visible:ring-blue-600/35"
              type="button"
            >
              저장하기
            </button>
          </aside>
        </section>
      </main>
      <Footer />
    </>
  );
}
