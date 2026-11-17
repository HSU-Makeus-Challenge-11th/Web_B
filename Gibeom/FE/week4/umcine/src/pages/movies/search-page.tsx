import { Link, useNavigate, useSearch } from "@tanstack/react-router";
import type { SubmitEvent } from "react";
import { movies } from "../../data/movies";
import { useBookmarkStore } from "../../utils/bookmark-storage";
import { cn } from "../../utils/cn";

export function SearchPage() {
  const { query } = useSearch({ from: "/search" });
  const navigate = useNavigate({ from: "/search" });
  const bookmarkedMovieIds = useBookmarkStore(
    (state) => state.bookmarkedMovieIds,
  );
  const toggleBookmark = useBookmarkStore((state) => state.toggleBookmark);

  const normalizedQuery = query?.trim().toLowerCase() ?? "";
  const searchResults = normalizedQuery
    ? movies.filter(
        (movie) =>
          movie.title.toLowerCase().includes(normalizedQuery) ||
          movie.originalTitle.toLowerCase().includes(normalizedQuery),
      )
    : [];

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const nextQuery = String(formData.get("query") ?? "").trim();
    navigate({
      search: nextQuery ? { query: nextQuery } : {},
    });
  }

  return (
    <main className="flex-1 bg-[#f6f7f9]">
      <section
        className="mx-auto w-[min(1170px,calc(100%-32px))] pt-7 pb-[72px] min-[721px]:w-[min(1170px,calc(100%-48px))]"
        aria-labelledby="search-title"
      >
        <h1
          className="mt-0 mb-5 text-[28px] leading-tight font-bold tracking-[-0.045em] min-[481px]:text-[32px]"
          id="search-title"
        >
          영화 검색
        </h1>
        <form
          className="relative flex h-12 w-full overflow-hidden rounded-lg border border-[#d9dee7] bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04)] focus-within:border-[#2463eb] focus-within:shadow-[0_0_0_3px_rgba(36,99,235,0.14)]"
          role="search"
          onSubmit={handleSubmit}
        >
          <label className="sr-only" htmlFor="movie-query">
            영화 검색어
          </label>
          <span className="grid w-[46px] shrink-0 place-items-center" aria-hidden="true">
            <img className="size-[18px] opacity-55" src="/icons/search.svg" alt="" />
          </span>
          <input
            className="min-w-0 flex-1 border-0 bg-transparent pr-3.5 text-[#171a21] outline-0 placeholder:text-[#a3a9b3]"
            id="movie-query"
            key={query}
            name="query"
            placeholder="예: 스파이더맨"
            defaultValue={query ?? ""}
          />
          <button
            className="m-[5px] min-w-[66px] cursor-pointer rounded-md border-0 bg-[#171a21] text-sm font-bold text-white hover:brightness-95 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-blue-500/40 min-[481px]:min-w-[84px]"
            type="submit"
          >
            검색
          </button>
        </form>

        {!normalizedQuery ? (
          <div className="grid min-h-[280px] content-center justify-items-center gap-2 text-center text-[#727b8b]">
            <strong className="text-2xl text-[#171a21]">
              어떤 영화를 찾고 있나요?
            </strong>
            <p className="m-0">검색어를 입력해 주세요.</p>
          </div>
        ) : (
          <section className="mt-6" aria-live="polite">
            <div className="flex items-baseline justify-between gap-4 border-b border-[#e5e7eb] pb-3">
              <h2 className="m-0 text-[17px] font-bold">
                ‘{query?.trim()}’ 검색 결과
              </h2>
              <p className="m-0 text-xs text-[#8b95a5]">
                영화 {searchResults.length}편
              </p>
            </div>

            {searchResults.length === 0 ? (
              <p className="grid min-h-[280px] content-center justify-items-center gap-2 text-center text-[#727b8b]">
                검색 결과가 없어요.
              </p>
            ) : (
              <ul className="m-0 grid list-none grid-cols-1 gap-x-[30px] p-0 min-[721px]:grid-cols-2">
                {searchResults.map((movie) => {
                  const isBookmarked = bookmarkedMovieIds.includes(movie.id);

                  return (
                    <li className="border-b border-[#e5e7eb] py-5" key={movie.id}>
                      <article className="grid grid-cols-[90px_minmax(0,1fr)] gap-3.5 min-[481px]:grid-cols-[105px_minmax(0,1fr)] min-[481px]:gap-[18px]">
                        <Link
                          className="block aspect-2/3 overflow-hidden rounded-[7px] bg-[#e4e7eb] focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-blue-500/40"
                          to="/movies/$movieId"
                          params={{ movieId: String(movie.id) }}
                          aria-label={`${movie.title} 상세 보기`}
                        >
                          <img
                            className="block h-full w-full object-cover"
                            src={movie.posterPath}
                            alt={`${movie.title} 포스터`}
                          />
                        </Link>
                        <div className="min-w-0 self-center">
                          <h3 className="mt-0 mb-[5px] text-base font-bold">
                            <Link
                              className="text-[#171a21] no-underline focus-visible:rounded-sm focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-blue-500/40"
                              to="/movies/$movieId"
                              params={{ movieId: String(movie.id) }}
                            >
                              {movie.title}
                            </Link>
                          </h3>
                          <p className="m-0 text-xs leading-[1.55] text-[#727b8b]">
                            {movie.originalTitle} · {movie.releaseDate}
                          </p>
                          <p className="mt-[9px] mb-0 line-clamp-2 text-xs leading-[1.55] text-[#727b8b]">
                            {movie.overview}
                          </p>
                          <div className="mt-[13px] flex items-center gap-2">
                            <Link
                              className="inline-block text-xs font-bold text-[#2463eb] no-underline focus-visible:rounded-sm focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-blue-500/40"
                              to="/movies/$movieId"
                              params={{ movieId: String(movie.id) }}
                            >
                              상세 보기
                              <span aria-hidden="true"> →</span>
                            </Link>
                            <button
                              className={cn(
                                "inline-flex h-8 cursor-pointer items-center gap-1.5 rounded-md border px-2.5 text-xs font-bold transition hover:brightness-95 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-blue-500/40",
                                isBookmarked
                                  ? "border-[#2463eb] bg-[#2463eb] text-white"
                                  : "border-[#d9dee7] bg-white text-[#555d6c]",
                              )}
                              type="button"
                              aria-label={`${movie.title} ${isBookmarked ? "북마크 해제" : "북마크 추가"}`}
                              aria-pressed={isBookmarked}
                              onClick={() => toggleBookmark(movie.id)}
                            >
                              <img
                                className={cn(
                                  "size-4",
                                  isBookmarked && "invert",
                                )}
                                src={
                                  isBookmarked
                                    ? "/icons/bookmark.svg"
                                    : "/icons/bookmark-outline.svg"
                                }
                                alt=""
                              />
                              {isBookmarked ? "북마크 해제" : "북마크 추가"}
                            </button>
                          </div>
                        </div>
                      </article>
                    </li>
                  );
                })}
              </ul>
            )}
          </section>
        )}
      </section>
    </main>
  );
}
