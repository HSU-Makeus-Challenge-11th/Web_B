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
    <div className="flex min-h-[1024px] w-[1440px] flex-col bg-[#f6f7f9]">
      <main className="flex h-[1185px] w-full flex-col gap-[20px] box-border px-[80px] py-[24px]">
        <h1 className="m-0 h-[44px] w-[134px] font-['Pretendard'] text-[38px] font-[700] leading-[44px] tracking-[-1.71px] text-[#17191E]">
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

        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </main>
    </div>
  );
}
