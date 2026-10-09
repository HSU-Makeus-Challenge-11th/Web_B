import { Link, useParams } from "@tanstack/react-router";
import { movies } from "../../data/movies";
import { useBookmarkStore } from "../../utils/bookmark-storage";
import { cn } from "../../utils/cn";

export function MovieDetailPage() {
  const { movieId } = useParams({ from: "/movies/$movieId" });
  const movie = movies.find((item) => item.id === Number(movieId));
  const isBookmarked = useBookmarkStore((state) =>
    movie ? state.bookmarkedMovieIds.includes(movie.id) : false,
  );
  const toggleBookmark = useBookmarkStore((state) => state.toggleBookmark);

  if (!movie) {
    return (
      <main className="grid min-h-[420px] flex-1 place-items-center bg-[#f6f7f9] text-lg font-bold text-[#555d6c]">
        영화를 찾을 수 없어요.
      </main>
    );
  }

  return (
    <main className="flex-1 bg-[#f6f7f9]">
      <section
        className="relative min-h-[260px] bg-cover text-white [background-position:center_32%] min-[481px]:min-h-[300px]"
        aria-labelledby="movie-detail-title"
        style={{ backgroundImage: `url(${movie.backdropPath})` }}
      >
        <div
          className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,12,19,0.9)_0%,rgba(8,12,19,0.58)_48%,rgba(8,12,19,0.18)_100%)]"
          aria-hidden="true"
        />
        <div className="relative z-1 mx-auto flex min-h-[260px] w-[min(1170px,calc(100%-32px))] flex-col justify-between py-6 pb-[34px] min-[481px]:min-h-[300px] min-[721px]:w-[min(1170px,calc(100%-48px))]">
          <Link
            className="w-fit text-sm font-[650] text-white no-underline focus-visible:rounded-sm focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-blue-500/40"
            to="/"
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
              {movie.originalTitle}
            </p>
            <p className="mt-1 mb-0 text-[13px] text-white/80">
              {movie.releaseDate} · {movie.genres.join(" · ")} · {movie.runtime}
            </p>
          </div>
        </div>
      </section>

      <section
        className="mx-auto grid w-[min(1170px,calc(100%-32px))] grid-cols-1 gap-[18px] pt-[30px] pb-[84px] min-[481px]:grid-cols-[110px_minmax(0,1fr)] min-[721px]:w-[min(1170px,calc(100%-48px))] min-[721px]:grid-cols-[150px_minmax(0,1fr)] min-[721px]:gap-7 min-[1025px]:grid-cols-[165px_minmax(0,1fr)_300px]"
        aria-label="영화 상세 정보"
      >
        <img
          className="block aspect-2/3 w-[min(180px,55vw)] rounded-lg object-cover shadow-[0_8px_22px_rgba(15,23,42,0.16)] min-[481px]:w-full"
          src={movie.posterPath}
          alt={`${movie.title} 포스터`}
        />

        <div className="mt-1 min-w-0 min-[481px]:mt-0 min-[721px]:px-2 min-[721px]:py-1">
          <h2 className="mt-0 mb-3.5 text-xl font-bold tracking-[-0.025em]">
            {movie.tagline}
          </h2>
          <p className="m-0 text-sm leading-[1.75] text-[#656e7c]">
            {movie.overview}
          </p>
          <button
            className={cn(
              "mt-5 inline-flex h-[38px] cursor-pointer items-center gap-[7px] rounded-md border-0 px-3.5 text-[13px] font-bold text-white hover:brightness-95 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-blue-500/40",
              isBookmarked ? "bg-[#174fc6]" : "bg-[#2463eb]",
            )}
            type="button"
            aria-label={`${movie.title} ${isBookmarked ? "북마크 해제" : "북마크 추가"}`}
            aria-pressed={isBookmarked}
            onClick={() => toggleBookmark(movie.id)}
          >
            <img
              className="size-[18px] invert"
              src={
                isBookmarked
                  ? "/icons/bookmark.svg"
                  : "/icons/bookmark-outline.svg"
              }
              alt=""
            />
            {isBookmarked ? "북마크 해제" : "즐겨찾기"}
          </button>
        </div>

        <aside
          className="col-span-full border-t border-[#e5e7eb] pt-6 min-[1025px]:col-auto min-[1025px]:border-t-0 min-[1025px]:border-l min-[1025px]:pt-0 min-[1025px]:pl-7"
          aria-labelledby="rating-title"
        >
          <h2 className="m-0 text-[17px] font-bold" id="rating-title">
            내 평점
          </h2>
          <p className="mt-1 mb-0 text-[11px] text-[#8b95a5]">
            별을 눌러 평점을 남겨 보세요.
          </p>
          <div
            className="mt-2.5 flex max-w-[220px] gap-1.5 min-[1025px]:max-w-none"
            aria-label="별점 선택"
          >
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                className="grid size-[34px] cursor-pointer place-items-center rounded-[5px] border border-[#e5e7eb] bg-white p-0 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-blue-500/40"
                key={star}
                type="button"
                aria-label={`${star}점`}
              >
                <img className="size-[18px]" src="/icons/star-outline.svg" alt="" />
              </button>
            ))}
          </div>
          <textarea
            className="mt-3 block h-20 w-full max-w-[520px] resize-y rounded-md border border-[#e5e7eb] bg-white p-2.5 text-xs text-[#171a21] focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-blue-500/40 min-[1025px]:max-w-none"
            aria-label="평점 한 줄 리뷰"
            placeholder="영화를 보고 느낀 점을 남겨주세요."
          />
          <button
            className="mt-2.5 h-[38px] w-full max-w-[520px] cursor-pointer rounded-md border-0 bg-[#171a21] text-[13px] font-bold text-white hover:brightness-95 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-blue-500/40 min-[1025px]:max-w-none"
            type="button"
          >
            평점 저장
          </button>
        </aside>
      </section>
    </main>
  );
}
