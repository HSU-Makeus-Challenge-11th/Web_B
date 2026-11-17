import { useState } from "react";
import { Footer } from "../../components/layout/footer";
import MovieGrid from "../../components/movies/movie-grid";
import Pagination from "../../components/movies/pagination";
import { movies as initialMovies } from "../../data/movies";
import type { Movie } from "../../types/movie";

export function MovieListPage() {
  const [movieList, setMovieList] = useState<Movie[]>(initialMovies);

  function handleToggleBookmark(movieId: number) {
    setMovieList((currentMovies) =>
      currentMovies.map((movie) =>
        movie.id === movieId
          ? { ...movie, isBookmarked: !movie.isBookmarked }
          : movie,
      ),
    );
  }

  return (
    <>
      <main
        className="mx-auto flex w-full max-w-[1440px] flex-col gap-5 px-4 pt-6 pb-[90px] sm:px-8 lg:px-20"
        id="movies"
      >
        <h1 className="m-0 text-[38px] leading-[44px] font-bold tracking-[-1.71px] text-[#17191e]">
          영화 목록
        </h1>
        <MovieGrid
          movies={movieList}
          onToggleBookmark={handleToggleBookmark}
        />
        <Pagination />
      </main>

      <Footer />
    </>
  );
}
