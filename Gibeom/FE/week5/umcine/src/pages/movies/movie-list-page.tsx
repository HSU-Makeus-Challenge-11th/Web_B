import { useEffect, useState } from "react";

import { getMovies } from "../../api/movies/get-movies";
import type { TmdbMovieListItem } from "../../api/movies/models";
import { MovieGrid } from "../../components/movies/movie-grid";
import { Pagination } from "../../components/movies/pagination";
import { useBookmarkStore } from "../../utils/bookmark-storage";

export function MovieListPage() {
  const bookmarkedMovieIds = useBookmarkStore(
    (state) => state.bookmarkedMovieIds,
  );
  const toggleBookmark = useBookmarkStore((state) => state.toggleBookmark);
  const [movies, setMovies] = useState<TmdbMovieListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    let ignore = false;
    async function loadMovies() {
      setIsLoading(true);
      setErrorMessage(null);

      try {
        const response = await getMovies({ page: 1 });
        if (!ignore) setMovies(response.results);
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
        {isLoading ? (
          <p className="grid min-h-[280px] place-items-center text-center text-[#727b8b]">
            영화 목록을 불러오는 중이에요.
          </p>
        ) : errorMessage ? (
          <p className="grid min-h-[280px] place-items-center text-center text-[#727b8b]">
            {errorMessage}
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
              currentPage={currentPage}
              onPageChange={setCurrentPage}
            />
          </>
        )}
      </section>
    </main>
  );
}
