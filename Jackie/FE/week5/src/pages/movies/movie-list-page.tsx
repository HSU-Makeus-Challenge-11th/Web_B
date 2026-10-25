import { useEffect, useState } from "react";

import MovieGrid from "../../components/movies/movie-grid";
import Pagination from "../../components/movies/pagination";
import { getMovies } from "../../api/movies/get-movies";
import type { TmdbMovieListItem } from "../../api/movies/models";

export function MovieListPage() {
  const [movies, setMovies] = useState<TmdbMovieListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;

    async function loadMovies() {
      setIsLoading(true);
      setErrorMessage(null);

      try {
        const response = await getMovies({ page: 1 });
        if (!ignore) setMovies(response.results.slice(0, 15));
      } catch {
        if (!ignore) setErrorMessage("영화 목록을 불러오지 못했어요.");
      } finally {
        if (!ignore) setIsLoading(false);
      }
    }

    loadMovies();

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <div className="flex min-h-[1024px] w-[1440px] flex-col bg-[#f6f7f9]">
      <main className="flex h-[1185px] w-full flex-col gap-[20px] box-border px-[80px] py-[24px]">
        <h1 className="m-0 h-[44px] w-[134px] font-['Pretendard'] text-[38px] font-[700] leading-[44px] tracking-[-1.71px] text-[#17191E]">
          영화 목록
        </h1>

        {isLoading ? (
          <p>영화 목록을 불러오는 중이에요.</p>
        ) : errorMessage ? (
          <p>{errorMessage}</p>
        ) : movies.length === 0 ? (
          <p>표시할 영화가 없어요.</p>
        ) : (
          <MovieGrid movies={movies} />
        )}

        <Pagination />
      </main>
    </div>
  );
}
