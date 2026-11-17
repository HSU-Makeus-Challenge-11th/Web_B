import { Link, useNavigate, useSearch } from "@tanstack/react-router";
import { useEffect, useState, type SubmitEvent } from "react";
import { searchMovies } from "../../api/movies/search-movies";
import type { TmdbMovieListItem } from "../../api/movies/models";

export function SearchPage() {
  const { query } = useSearch({ from: "/search" });
  const navigate = useNavigate({ from: "/search" });

  const [searchText, setSearchText] = useState(query ?? "");

  const [movies, setMovies] = useState<TmdbMovieListItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    setSearchText(query ?? "");
  }, [query]);

  useEffect(() => {
    let ignore = false;
    const normalizedQuery = (query ?? "").trim();

    setMovies([]);
    setErrorMessage(null);

    if (!normalizedQuery) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    searchMovies({ query: normalizedQuery })
      .then((response) => {
        if (!ignore) setMovies(response.results);
      })
      .catch(() => {
        if (!ignore) setErrorMessage("검색 결과를 불러오지 못했어요.");
      })
      .finally(() => {
        if (!ignore) setIsLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, [query]);

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextQuery = searchText.trim();

    navigate({
      search: nextQuery ? { query: nextQuery } : {},
    });
  }

  return (
    <main>
      {!(query ?? "").trim() ? (
        <div className="w-[1440px] h-[1024px] bg-[#F6F7F9]">
          <section className="flex flex-col items-center w-[1440px] h-[582px] pt-[209px] px-[72px] pb-[210px]">
            <div className="flex flex-col w-[790px] h-[163px] gap-[36px]">
              <h1 className="m-0 self-center w-[425px] h-[53px] font-['Pretendard'] text-[46px] font-[700] leading-[52.44px] tracking-[-2.3px] text-[#17191E]">
                어떤 영화를 찾고 있나요?
              </h1>

              <form
                className="flex items-center w-[790px] h-[74px] rounded-[12px] border-[2px] border-[#17191E] pr-[17px] pl-[21px] gap-[14px]"
                onSubmit={handleSubmit}
              >
                <img
                  className="h-[24px] w-[24px]"
                  src="/icons/search.svg"
                  alt="검색"
                />

                <input
                  className="w-[637px] h-[22px] px-[2px] py-[1px] bg-transparent outline-none font-['Pretendard'] text-[17px] font-[400] leading-[100%] text-[#17191E] placeholder:text-[#969DA8]"
                  aria-label="검색어"
                  placeholder="예: 스파이더맨"
                  value={searchText}
                  onChange={(event) => setSearchText(event.target.value)}
                />

                <button
                  className="flex items-center justify-center w-[59px] h-[42px] rounded-[12px] border border-[#17191E] px-[16px] bg-[#17191E]"
                  type="submit"
                >
                  <span className="font-['Pretendard'] text-[14px] font-[800] leading-[100%] text-[#FFFFFF]">
                    검색
                  </span>
                </button>
              </form>
            </div>
          </section>
        </div>
      ) : (
        <section className="flex flex-col w-[1440px] min-h-[938px] bg-[#F6F7F9] pt-[32px] px-[80px]">
          <h1 className="m-0 font-['Pretendard'] text-[32px] font-[700] leading-[38px] tracking-[-1.6px] text-[#17191E]">
            영화 검색
          </h1>

          <form
            className="mt-[20px] flex items-center w-[1280px] h-[54px] rounded-[8px] border border-[#E3E6EB] bg-[#FFFFFF] pl-[16px] pr-[8px] gap-[8px]"
            onSubmit={handleSubmit}
          >
            <img
              className="w-[24px] h-[24px]"
              src="/icons/search.svg"
              alt="검색"
            />

            <input
              className="flex-1 h-[20px] border-0 bg-transparent outline-none font-['Pretendard'] text-[14px] font-[400] leading-[100%] text-[#17191E]"
              aria-label="검색어"
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
            />

            <button
              type="button"
              className="flex w-[24px] h-[24px] items-center justify-center border-0 bg-transparent text-[20px] text-[#606774]"
              onClick={() => setSearchText("")}
              aria-label="검색어 지우기"
            >
              ×
            </button>

            <button
              className="flex items-center justify-center w-[84px] h-[42px] rounded-[8px] border border-[#17191E] px-[16px] bg-[#17191E]"
              type="submit"
            >
              <span className="font-['Pretendard'] text-[14px] font-[800] leading-[100%] text-[#FFFFFF] whitespace-nowrap">
                다시 검색
              </span>
            </button>
          </form>

          <div className="flex items-center justify-between w-[1280px] h-[54px] border-b border-[#E3E6EB]">
            <h2 className="m-0 font-['Pretendard'] text-[18px] font-[700] leading-[21px] text-[#17191E]">
              ‘{query}’ 검색 결과
            </h2>

            <span className="font-['Pretendard'] text-[12px] font-[400] leading-[14px] text-[#969DA8]">
              영화 {movies.length}편 · 1페이지
            </span>
          </div>

          {isLoading ? (
            <p className="font-['Pretendard'] text-[14px] text-[#606774]">
              검색 결과를 불러오는 중이에요.
            </p>
          ) : errorMessage ? (
            <p className="font-['Pretendard'] text-[14px] text-[#606774]">
              {errorMessage}
            </p>
          ) : movies.length === 0 ? (
            <p className="font-['Pretendard'] text-[14px] text-[#606774]">
              검색 결과가 없어요.
            </p>
          ) : (
            <ul className="m-0 grid w-[1280px] grid-cols-2 gap-x-[40px] p-0 list-none">
              {movies.map((movie) => (
                <li
                  key={movie.id}
                  className="flex w-[620px] h-[240px] gap-[18px] py-[20px] border-b border-[#E3E6EB]"
                >
                  <img
                    className="w-[126px] h-[190px] shrink-0 rounded-[10px] object-cover"
                    src={
                      movie.poster_path
                        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                        : ""
                    }
                    alt={`${movie.title} 포스터`}
                  />

                  <div className="flex min-w-0 flex-1 flex-col gap-[8px]">
                    <h3 className="m-0 font-['Pretendard'] text-[18px] font-[700] leading-[25px] text-[#17191E]">
                      {movie.title}
                    </h3>

                    <div className="flex items-center gap-[8px] font-['Pretendard'] text-[12px] font-[400] leading-[14px] text-[#969DA8]">
                      <span>{movie.original_title}</span>
                      <span>{movie.release_date}</span>
                    </div>

                    <p className="m-0 font-['Pretendard'] text-[12.5px] font-[400] leading-[20.25px] text-[#606774]">
                      {movie.overview}
                    </p>

                    <Link
                      className="flex items-center gap-[4px] w-fit font-['Pretendard'] text-[12px] font-[800] leading-[16px] text-[#2563EB] no-underline"
                      to="/movies/$movieId"
                      params={{ movieId: String(movie.id) }}
                    >
                      <span>상세 보기</span>
                      <img
                        src="/icons/arrow-right.svg"
                        alt=""
                        className="w-[16px] h-[16px]"
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
