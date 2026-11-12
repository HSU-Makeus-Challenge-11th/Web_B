import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import MovieGrid from "../../components/movies/movie-grid";
import Pagination from "../../components/movies/pagination";
import { getMovies } from "../../api/movies/get-movies";

export function MovieListPage() {
  const [page, setPage] = useState(1);

  const moviesQuery = useQuery({
    queryKey: ["movies", "list", { page }],
    queryFn: () => getMovies({ page }),
  });

  const movies = moviesQuery.data?.results.slice(0, 15) ?? [];
  const totalPages = moviesQuery.data?.total_pages ?? 0;

  const handlePageChange = (nextPage: number) => {
    if (nextPage < 1 || nextPage > totalPages) return;

    setPage(nextPage);
  };

  return (
    <div className="min-h-[calc(100vh-148px)] w-full bg-[#F6F7F9]">
      <main className="mx-auto flex w-full max-w-[1440px] flex-col gap-[20px] px-5 py-[24px] sm:px-8 lg:px-[80px]">
        <h1 className="m-0 font-['Pretendard'] text-[32px] font-bold leading-tight tracking-[-1.71px] text-[#17191E] sm:text-[38px]">
          영화 목록
        </h1>

        {moviesQuery.isPending ? (
          <p>영화 목록을 불러오는 중이에요.</p>
        ) : moviesQuery.isError ? (
          <p>영화 목록을 불러오지 못했어요.</p>
        ) : movies.length === 0 ? (
          <p>표시할 영화가 없어요.</p>
        ) : (
          <MovieGrid movies={movies} />
        )}

        {totalPages > 1 && (
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </main>
    </div>
  );
}
