import { useState } from "react";

import { MovieGrid } from "../../components/movies/movie-grid";
import { Pagination } from "../../components/movies/pagination";
import { movies as initialMovies } from "../../data/movies";
import { useBookmarkStore } from "../../utils/bookmark-storage";

export function MovieListPage() {
  const bookmarkedMovieIds = useBookmarkStore(
    (state) => state.bookmarkedMovieIds,
  );
  const toggleBookmark = useBookmarkStore((state) => state.toggleBookmark);
  const [currentPage, setCurrentPage] = useState(1);

  const movies = initialMovies.map((movie) => ({
    ...movie,
    isBookmarked: bookmarkedMovieIds.includes(movie.id),
  }));

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
        <MovieGrid
          movies={movies}
          onToggleBookmark={toggleBookmark}
        />
        <Pagination currentPage={currentPage} onPageChange={setCurrentPage} />
      </section>
    </main>
  );
}
