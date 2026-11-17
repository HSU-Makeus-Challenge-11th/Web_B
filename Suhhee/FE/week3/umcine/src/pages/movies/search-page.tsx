import { Link, useNavigate, useSearch } from "@tanstack/react-router";
import { useState, type SubmitEvent } from "react";
import { Footer } from "../../components/layout/footer";
import { movies } from "../../data/movies";

export function SearchPage() {
  const { query } = useSearch({ from: "/search" });

  return <SearchPageContent key={query ?? ""} query={query} />;
}

interface SearchPageContentProps {
  query?: string;
}

function SearchPageContent({ query }: SearchPageContentProps) {
  const navigate = useNavigate({ from: "/search" });
  const [searchText, setSearchText] = useState(query ?? "");
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
    const nextQuery = searchText.trim();
    navigate({ search: nextQuery ? { query: nextQuery } : {} });
  }

  if (!normalizedQuery) {
    return (
      <main className="mx-auto min-h-[calc(100vh-91px)] w-full max-w-[1440px] px-4 pt-[clamp(180px,29vh,300px)] sm:px-8 lg:px-20">
        <section className="mx-auto w-full max-w-[784px] text-center">
          <h1 className="m-0 text-[32px] leading-[39px] font-bold tracking-[-1.28px] text-[#17191e] sm:text-[38px] sm:leading-[44px]">
            어떤 영화를 찾고 있나요?
          </h1>
          <form
            className="mt-6 flex h-[54px] w-full items-center rounded-[10px] border border-[#d7dbe2] bg-white pl-4 shadow-[0_8px_24px_rgba(23,25,30,0.08)] focus-within:border-[#17191e]"
            onSubmit={handleSubmit}
          >
            <label className="sr-only" htmlFor="movie-search">
              검색어
            </label>
            <img className="size-6 shrink-0 opacity-55" src="/icons/search.svg" alt="" />
            <input
              className="h-full min-w-0 flex-1 border-0 bg-transparent px-3 text-sm text-[#17191e] outline-none placeholder:text-[#969da8]"
              id="movie-search"
              value={searchText}
              placeholder="예: 스파이더맨"
              onChange={(event) => setSearchText(event.target.value)}
            />
            <button
              className="mr-[5px] h-[42px] shrink-0 cursor-pointer rounded-lg border-0 bg-[#17191e] px-5 text-sm font-extrabold text-white outline-none hover:bg-black focus-visible:ring-3 focus-visible:ring-blue-600/35"
              type="submit"
            >
              검색
            </button>
          </form>
          <p className="mt-4 mb-0 text-sm text-[#606774]">검색어를 입력해 주세요.</p>
        </section>
      </main>
    );
  }

  return (
    <>
      <main className="mx-auto min-h-[calc(100vh-91px)] w-full max-w-[1440px] px-4 pt-6 pb-[90px] sm:px-8 lg:px-20">
        <h1 className="m-0 text-[38px] leading-[44px] font-bold tracking-[-1.71px] text-[#17191e]">
          영화 검색
        </h1>

        <form
          className="mt-5 flex h-[54px] w-full items-center rounded-[10px] border border-[#d7dbe2] bg-white pl-4 shadow-[0_4px_14px_rgba(23,25,30,0.06)] focus-within:border-[#17191e]"
          onSubmit={handleSubmit}
        >
          <label className="sr-only" htmlFor="movie-search-results">
            검색어
          </label>
          <img className="size-6 shrink-0 opacity-55" src="/icons/search.svg" alt="" />
          <input
            className="h-full min-w-0 flex-1 border-0 bg-transparent px-3 text-sm text-[#17191e] outline-none placeholder:text-[#969da8]"
            id="movie-search-results"
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
          />
          {searchText && (
            <button
              className="flex size-[42px] shrink-0 cursor-pointer items-center justify-center border-0 bg-transparent p-0 opacity-55 outline-none hover:opacity-100 focus-visible:ring-3 focus-visible:ring-blue-600/35"
              type="button"
              aria-label="검색어 지우기"
              onClick={() => setSearchText("")}
            >
              <img className="size-5" src="/icons/close.svg" alt="" />
            </button>
          )}
          <button
            className="mr-[5px] h-[42px] shrink-0 cursor-pointer rounded-lg border-0 bg-[#17191e] px-5 text-sm font-extrabold text-white outline-none hover:bg-black focus-visible:ring-3 focus-visible:ring-blue-600/35"
            type="submit"
          >
            다시 검색
          </button>
        </form>

        <section className="mt-6">
          <div className="flex flex-wrap items-end justify-between gap-2 border-b border-[#d7dbe2] pb-3">
            <h2 className="m-0 text-xl leading-7 font-bold tracking-[-0.4px] text-[#17191e] sm:text-2xl">
              ‘{query}’ 검색 결과
            </h2>
            <p className="m-0 text-xs font-medium text-[#606774]">
              영화 {searchResults.length}편 · 1페이지
            </p>
          </div>

          {searchResults.length === 0 ? (
            <div className="flex min-h-[420px] items-center justify-center text-center text-[#606774]">
              <p>검색 결과가 없어요.</p>
            </div>
          ) : (
            <ul className="m-0 grid list-none grid-cols-1 p-0 lg:grid-cols-2 lg:gap-x-10">
              {searchResults.map((movie) => (
                <li
                  className="flex h-[240px] min-w-0 gap-[18px] border-b border-[#e3e6eb] py-5"
                  key={movie.id}
                >
                  <Link
                    className="h-[190px] w-[126px] shrink-0 overflow-hidden rounded-lg bg-[#eef0f3] outline-none focus-visible:ring-3 focus-visible:ring-blue-600/35"
                    to="/movies/$movieId"
                    params={{ movieId: String(movie.id) }}
                    aria-label={`${movie.title} 상세 보기`}
                  >
                    <img
                      className="h-full w-full object-cover"
                      src={movie.posterPath}
                      alt={`${movie.title} 포스터`}
                    />
                  </Link>

                  <div className="flex min-w-0 flex-1 flex-col py-0.5">
                    <Link
                      className="w-fit text-lg leading-6 font-extrabold text-[#17191e] no-underline outline-none hover:underline focus-visible:ring-3 focus-visible:ring-blue-600/35"
                      to="/movies/$movieId"
                      params={{ movieId: String(movie.id) }}
                    >
                      {movie.title}
                    </Link>
                    <p className="mt-1 mb-0 truncate text-sm text-[#606774]">
                      {movie.originalTitle}
                    </p>
                    <p className="mt-2 mb-0 text-xs font-medium text-[#969da8]">
                      {movie.releaseDate}
                    </p>
                    <p className="mt-4 mb-0 line-clamp-4 text-sm leading-6 text-[#606774]">
                      {movie.overview}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
