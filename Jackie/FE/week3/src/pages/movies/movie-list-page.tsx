import { useState } from "react";

import { movies as initialMovies } from "../../data/movies";
import MovieGrid from "../../components/movies/movie-grid";
import Pagination from "../../components/movies/pagination";

export function MovieListPage() {
  const [movies, setMovies] = useState(initialMovies);

  function handleToggleBookmark(movieId: number) {
    setMovies((currentMovies) =>
      currentMovies.map((movie) =>
        movie.id === movieId
          ? { ...movie, isBookmarked: !movie.isBookmarked }
          : movie,
      ),
    );
  }

  return (
    <div className="flex min-h-[1024px] w-[1440px] flex-col bg-[#f6f7f9]">
      <main className="flex h-[1185px] w-full flex-col gap-[20px] box-border px-[80px] py-[24px]">
        <h1 className="m-0 h-[44px] w-[134px] font-['Pretendard'] text-[38px] font-[700] leading-[44px] tracking-[-1.71px] text-[#17191E]">
          영화 목록
        </h1>

        {movies.length === 0 ? (
          <p>표시할 영화가 없어요.</p>
        ) : (
          <MovieGrid movies={movies} onToggleBookmark={handleToggleBookmark} />
        )}

        <Pagination />
      </main>
    </div>
  );
}
