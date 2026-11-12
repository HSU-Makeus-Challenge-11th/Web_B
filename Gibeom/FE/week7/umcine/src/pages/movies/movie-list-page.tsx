import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { getMovies } from "../../api/movies/get-movies";
import { MovieGrid } from "../../components/movies/movie-grid";
import { Pagination } from "../../components/movies/pagination";
import { useBookmarkStore } from "../../utils/bookmark-storage";

export function MovieListPage() {
  const [page, setPage] = useState(1);
  const bookmarkedMovieIds = useBookmarkStore(
    (state) => state.bookmarkedMovieIds,
  );
  const toggleBookmark = useBookmarkStore((state) => state.toggleBookmark);
  const moviesQuery = useQuery({
    queryKey: ["movies", "list", { page }],
    queryFn: () => getMovies({ page }),
  });

  const movies = moviesQuery.data?.results ?? [];
  const totalPages = moviesQuery.data?.total_pages ?? 0;

  return (
    <main className="flex-1 bg-[#f6f7f9]">
      <section
        className="mx-auto w-[min(1170px,calc(100%-32px))] pt-7 pb-[92px] min-[721px]:w-[min(1170px,calc(100%-48px))]"
        aria-labelledby="movie-list-title"
      >
        <h1
          className="mt-0 mb-[25px] text-[34px] leading-tight font-extrabold tracking-[-0.045em] text-[#171a21]"
          id="movie-list-title"
        >
          영화 목록
        </h1>
        {moviesQuery.isPending ? (
          <p className="grid min-h-[280px] place-items-center text-center text-[#727b8b]">
            영화 목록을 불러오는 중이에요.
          </p>
        ) : moviesQuery.isError ? (
          <p className="grid min-h-[280px] place-items-center text-center text-[#727b8b]">
            영화 목록을 불러오지 못했어요.
          </p>
        ) : movies.length === 0 ? (
          <p className="grid min-h-[280px] place-items-center text-center text-[#727b8b]">
            조건에 맞는 영화가 없어요.
          </p>
        ) : (
          <>
            <MovieGrid
              movies={movies}
              bookmarkedMovieIds={bookmarkedMovieIds}
              onToggleBookmark={toggleBookmark}
            />
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          </>
        )}
      </section>
    </main>
  );
}
