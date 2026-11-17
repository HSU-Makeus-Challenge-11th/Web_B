import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getMovies } from "../../api/movies/get-movies";
import { MovieGrid } from "../../components/movies/movie-grid";
import { Pagination } from "../../components/movies/pagination";

// TMDB는 수백 페이지를 알려 주지만 시안처럼 페이지 번호는 5개까지만 보여 줘요
const MAX_VISIBLE_PAGES = 5;

export function MovieListPage() {
  const [page, setPage] = useState(1);

  const moviesQuery = useQuery({
    queryKey: ["movies", "list", { page }],
    queryFn: () => getMovies({ page }),
  });

  const movies = moviesQuery.data?.results ?? [];
  const totalPages = Math.min(moviesQuery.data?.total_pages ?? 0, MAX_VISIBLE_PAGES);

  const handlePageChange = (nextPage: number) => {
    setPage(nextPage);
  };

  return (
    <main className="mx-auto w-[1280px] pt-8 pb-[50px]">
      <h1 className="mb-5 text-[32px] leading-10 font-bold tracking-tight">영화 목록</h1>
      {moviesQuery.isPending ? (
        <p className="py-24 text-center text-fg-secondary">영화 목록을 불러오는 중이에요.</p>
      ) : moviesQuery.isError ? (
        <p className="py-24 text-center text-danger">영화 목록을 불러오지 못했어요.</p>
      ) : movies.length === 0 ? (
        <p className="py-24 text-center text-fg-secondary">조건에 맞는 영화가 없어요.</p>
      ) : (
        <>
          <MovieGrid movies={movies} />
          <div className="mt-10">
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </>
      )}
    </main>
  );
}
