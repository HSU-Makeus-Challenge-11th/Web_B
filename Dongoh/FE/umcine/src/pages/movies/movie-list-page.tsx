import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getMovies } from "../../api/movies/get-movies";
import MovieGrid from "../../components/movies/movie-grid";
import Pagination from "../../components/movies/pagination";

export function MovieListPage() {
  const [page, setPage] = useState(1);

  const moviesQuery = useQuery({
    queryKey: ["movies", "list", { page }],
    queryFn: () => getMovies({ page }),
  });

  const movies = moviesQuery.data?.results ?? [];
  const totalPages = moviesQuery.data?.total_pages ?? 0;

  const handlePageChange = (nextPage: number) => {
    setPage(nextPage);
  };

  return (
    <main className="mx-auto w-[calc(100%_-_32px)] max-w-[1120px] max-[720px]:w-[calc(100%_-_24px)] pt-10 pb-14">
      <section className="mb-6 [&_p]:mb-1.5 [&_p]:text-[13px] [&_p]:font-extrabold [&_p]:text-blue-600 [&_h1]:text-[28px] [&_h1]:leading-tight [&_h1]:font-extrabold [&_h1]:text-gray-900">
        <p>UMC Movie</p>
        <h1>영화 목록</h1>
      </section>

      {moviesQuery.isPending ? (
        <p className="mt-7 text-center text-gray-500" role="status">
          영화 목록을 불러오는 중이에요.
        </p>
      ) : moviesQuery.isError ? (
        <p className="mt-7 text-center text-gray-500" role="alert">
          {moviesQuery.error.message}
        </p>
      ) : movies.length === 0 ? (
        <p className="mt-7 text-center text-gray-500" role="status">
          조건에 맞는 영화가 없어요.
        </p>
      ) : (
        <>
          <MovieGrid movies={movies} />
          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </main>
  );
}
