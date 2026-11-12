import { Link, useNavigate, useSearch } from "@tanstack/react-router";
import { useEffect, useState, type SubmitEvent } from "react";
import { useQuery } from "@tanstack/react-query";
import { searchMovies } from "../../api/movies/search-movies";

export function SearchPage() {
  const { query } = useSearch({ from: "/search" });
  const navigate = useNavigate({ from: "/search" });

  const normalizedQuery = query?.trim() ?? "";
  const [searchText, setSearchText] = useState(query ?? "");

  useEffect(() => {
    setSearchText(query ?? "");
  }, [query]);

  const searchQuery = useQuery({
    queryKey: ["movies", "search", { query: normalizedQuery }],
    queryFn: () => searchMovies({ query: normalizedQuery }),
    enabled: normalizedQuery.length > 0,
  });

  const movies = searchQuery.data?.results ?? [];

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextQuery = searchText.trim();

    navigate({
      search: nextQuery ? { query: nextQuery } : {},
    });
  }

  return (
    <main className="min-h-[calc(100vh-148px)] w-full bg-[#F6F7F9]">
      {!normalizedQuery ? (
        <section className="mx-auto flex min-h-[calc(100vh-148px)] w-full max-w-[1440px] justify-center px-5 pt-[140px] sm:px-8 lg:pt-[209px]">
          <div className="flex h-fit w-full max-w-[790px] flex-col gap-[36px]">
            <h1 className="m-0 text-center font-['Pretendard'] text-[30px] font-bold leading-tight tracking-[-2px] text-[#17191E] sm:text-[46px] sm:tracking-[-2.3px]">
              어떤 영화를 찾고 있나요?
            </h1>

            <form
              className="flex h-[64px] w-full items-center gap-[14px] rounded-[12px] border-[2px] border-[#17191E] pl-[21px] pr-[17px] sm:h-[74px]"
              onSubmit={handleSubmit}
            >
              <img
                className="h-[24px] w-[24px] shrink-0"
                src="/icons/search.svg"
                alt=""
              />

              <input
                className="h-[22px] min-w-0 flex-1 bg-transparent px-[2px] py-[1px] font-['Pretendard'] text-[17px] font-normal leading-none text-[#17191E] outline-none placeholder:text-[#969DA8]"
                aria-label="검색어"
                placeholder="예: 스파이더맨"
                value={searchText}
                onChange={(event) => setSearchText(event.target.value)}
              />

              <button
                className="flex h-[42px] w-[59px] shrink-0 items-center justify-center rounded-[12px] border border-[#17191E] bg-[#17191E] px-[16px]"
                type="submit"
              >
                <span className="font-['Pretendard'] text-[14px] font-extrabold leading-none text-white">
                  검색
                </span>
              </button>
            </form>
          </div>
        </section>
      ) : (
        <section className="mx-auto flex min-h-[938px] w-full max-w-[1440px] flex-col px-5 pt-[32px] pb-12 sm:px-8 lg:px-[80px]">
          <h1 className="m-0 font-['Pretendard'] text-[32px] font-bold leading-[38px] tracking-[-1.6px] text-[#17191E]">
            영화 검색
          </h1>

          <form
            className="mt-[20px] flex h-[54px] w-full items-center gap-[8px] rounded-[8px] border border-[#E3E6EB] bg-white pl-[16px] pr-[8px]"
            onSubmit={handleSubmit}
          >
            <img
              className="h-[24px] w-[24px] shrink-0"
              src="/icons/search.svg"
              alt=""
            />

            <input
              className="h-[20px] min-w-0 flex-1 border-0 bg-transparent font-['Pretendard'] text-[14px] font-normal leading-none text-[#17191E] outline-none"
              aria-label="검색어"
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
            />

            <button
              type="button"
              className="flex h-[24px] w-[24px] shrink-0 items-center justify-center border-0 bg-transparent text-[20px] text-[#606774]"
              onClick={() => setSearchText("")}
              aria-label="검색어 지우기"
            >
              ×
            </button>

            <button
              className="flex h-[42px] shrink-0 items-center justify-center rounded-[8px] border border-[#17191E] bg-[#17191E] px-[12px] sm:w-[84px] sm:px-[16px]"
              type="submit"
            >
              <span className="whitespace-nowrap font-['Pretendard'] text-[14px] font-extrabold leading-none text-white">
                다시 검색
              </span>
            </button>
          </form>

          <div className="flex min-h-[54px] w-full flex-wrap items-center justify-between gap-2 border-b border-[#E3E6EB] py-3">
            <h2 className="m-0 font-['Pretendard'] text-[18px] font-bold leading-[21px] text-[#17191E]">
              ‘{query}’ 검색 결과
            </h2>

            <span className="font-['Pretendard'] text-[12px] font-normal leading-[14px] text-[#969DA8]">
              영화 {movies.length}편 · 1페이지
            </span>
          </div>

          {searchQuery.isLoading ? (
            <p className="mt-5 font-['Pretendard'] text-[14px] text-[#606774]">
              검색 결과를 불러오는 중이에요.
            </p>
          ) : searchQuery.isError ? (
            <p className="mt-5 font-['Pretendard'] text-[14px] text-[#606774]">
              검색 결과를 불러오지 못했어요.
            </p>
          ) : searchQuery.isSuccess && movies.length === 0 ? (
            <p className="mt-5 font-['Pretendard'] text-[14px] text-[#606774]">
              검색 결과가 없어요.
            </p>
          ) : (
            <ul className="m-0 grid w-full grid-cols-1 gap-x-[40px] p-0 list-none lg:grid-cols-2">
              {movies.map((movie) => (
                <li
                  key={movie.id}
                  className="flex min-h-[240px] min-w-0 w-full gap-[18px] border-b border-[#E3E6EB] py-[20px]"
                >
                  <img
                    className="h-[144px] w-[96px] shrink-0 rounded-[10px] object-cover sm:h-[190px] sm:w-[126px]"
                    src={
                      movie.poster_path
                        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                        : ""
                    }
                    alt={`${movie.title} 포스터`}
                  />

                  <div className="flex min-w-0 flex-1 flex-col gap-[8px]">
                    <h3 className="m-0 font-['Pretendard'] text-[18px] font-bold leading-[25px] text-[#17191E]">
                      {movie.title}
                    </h3>

                    <div className="flex flex-wrap items-center gap-[8px] font-['Pretendard'] text-[12px] font-normal leading-[14px] text-[#969DA8]">
                      <span>{movie.original_title}</span>
                      <span>{movie.release_date}</span>
                    </div>

                    <p className="m-0 line-clamp-5 font-['Pretendard'] text-[12.5px] font-normal leading-[20.25px] text-[#606774]">
                      {movie.overview}
                    </p>

                    <Link
                      className="mt-auto flex w-fit items-center gap-[4px] pt-2 font-['Pretendard'] text-[12px] font-extrabold leading-[16px] text-[#2563EB] no-underline"
                      to="/movies/$movieId"
                      params={{ movieId: String(movie.id) }}
                    >
                      <span>상세 보기</span>
                      <img
                        src="/icons/arrow-right.svg"
                        alt=""
                        className="h-[16px] w-[16px]"
                      />
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      )}
    </main>
  );
}
