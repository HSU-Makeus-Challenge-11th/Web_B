import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate, useSearch } from "@tanstack/react-router";
import { useState, type SubmitEvent } from "react";
import { searchMovies } from "../../api/movies/search-movies";
import { BookmarkButton } from "../../components/bookmark-button";
import { getTmdbPosterUrl } from "../../utils/movies/tmdb-image";

export function SearchPage() {
  const { query } = useSearch({ from: "/search" });

  return <SearchPageContent key={query ?? ""} query={query} />;
}

function SearchPageContent({ query }: { query?: string }) {
  const navigate = useNavigate({ from: "/search" });
  const [searchText, setSearchText] = useState(query ?? "");

  const normalizedQuery = (query ?? "").trim();
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
    <main className="mx-auto w-[calc(100%_-_32px)] max-w-[1120px] max-[720px]:w-[calc(100%_-_24px)] pt-10 pb-14">
      <section className="grid min-h-60 place-items-center border-b border-gray-200 text-center [&_h1]:text-[28px] [&_h1]:leading-tight [&_h1]:font-extrabold [&_h1]:text-gray-900">
        <h1>어떤 영화를 찾으시나요?</h1>
        <form className="mt-6 flex w-full max-w-[520px] overflow-hidden rounded-md border border-gray-300 bg-white shadow-[0_10px_26px_rgba(15,23,42,0.08)] focus-within:ring-2 focus-within:ring-blue-500 [&_input]:min-w-0 [&_input]:flex-1 [&_input]:border-0 [&_input]:px-3.5 [&_input]:py-[13px] [&_input]:text-gray-900 [&_input]:outline-none [&_input]:placeholder:text-gray-400 [&_button]:border-l [&_button]:border-gray-300 [&_button]:bg-blue-600 [&_button]:px-[18px] [&_button]:text-sm [&_button]:font-extrabold [&_button]:text-white" onSubmit={handleSubmit}>
          <input
            aria-label="검색어"
            placeholder="영화 제목을 입력해주세요"
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
          />
          <button type="submit">검색</button>
        </form>
      </section>

      {!normalizedQuery ? (
        <p className="mt-7 text-center text-gray-500" role="status">
          검색어를 입력해 주세요.
        </p>
      ) : searchQuery.isLoading ? (
        <p className="mt-7 text-center text-gray-500" role="status">
          검색 결과를 불러오는 중이에요.
        </p>
      ) : searchQuery.isError ? (
        <p className="mt-7 text-center text-gray-500" role="alert">
          {searchQuery.error.message}
        </p>
      ) : (
        <section className="pt-8">
          <div className="mb-[18px] flex items-end justify-between gap-4 max-[720px]:flex-col max-[720px]:items-start max-[720px]:gap-1 [&_h2]:text-[22px] [&_h2]:font-extrabold [&_h2]:text-gray-900 [&_p]:text-[13px] [&_p]:font-bold [&_p]:text-gray-500">
            <h2>'{query}' 검색 결과</h2>
            <p>영화 {movies.length}편</p>
          </div>
          {searchQuery.isSuccess && movies.length === 0 ? (
            <p className="mt-7 text-center text-gray-500" role="status">
              검색 결과가 없어요.
            </p>
          ) : (
            <ul className="m-0 grid list-none grid-cols-1 gap-3.5 p-0 md:grid-cols-2">
              {movies.map((movie) => {
                const posterUrl = getTmdbPosterUrl(movie.poster_path);

                return (
                  <li className="grid min-h-[138px] grid-cols-[92px_minmax(0,1fr)] gap-3.5 rounded-lg border border-gray-200 bg-white p-2.5" key={movie.id}>
                    {posterUrl ? (
                      <img
                        className="h-[118px] w-[92px] rounded-md object-cover"
                        src={posterUrl}
                        alt={`${movie.title} 포스터`}
                      />
                    ) : (
                      <div className="h-[118px] w-[92px] rounded-md object-cover grid place-items-center bg-gray-200 text-[13px] text-gray-500">
                        이미지 없음
                      </div>
                    )}
                    <div className="min-w-0 [&_h3]:mt-0.5 [&_h3]:mb-1 [&_h3]:truncate [&_h3]:text-[15px] [&_h3]:leading-[1.35] [&_h3]:font-extrabold [&_h3]:text-gray-900 [&_p]:line-clamp-2 [&_p]:text-xs [&_p]:leading-normal [&_p]:text-gray-600">
                      <h3>{movie.title}</h3>
                      <p className="mb-1.5 truncate text-gray-400!">
                        {movie.original_title} · {movie.release_date}
                      </p>
                      <p>{movie.overview}</p>
                      <div className="mt-2.5 flex items-center gap-2 [&_a]:rounded-md [&_a]:border [&_a]:border-gray-300 [&_a]:bg-white [&_a]:px-[9px] [&_a]:py-1.5 [&_a]:text-xs [&_a]:font-extrabold [&_a]:text-blue-600">
                        <BookmarkButton movieId={movie.id} />
                        <Link
                          to="/movies/$movieId"
                          params={{ movieId: String(movie.id) }}
                        >
                          상세 보기
                        </Link>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </section>
      )}
    </main>
  );
}
