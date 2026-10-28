import { Footer } from "../../components/layout/footer";
import MovieGrid from "../../components/movies/movie-grid";
import Pagination from "../../components/movies/pagination";
import { movies } from "../../data/movies";
import { useBookmarkStore } from "../../stores/bookmark-store";

export function MovieListPage() {
  const bookmarkCount = useBookmarkStore(
    (state) => state.bookmarkedMovieIds.length,
  );

  return (
    <>
      <main
        className="mx-auto flex w-full max-w-[1440px] flex-col gap-5 px-4 pt-6 pb-[90px] sm:px-8 lg:px-20"
        id="movies"
      >
        <div className="flex flex-wrap items-end justify-between gap-2">
          <h1 className="m-0 text-[38px] leading-[44px] font-bold tracking-[-1.71px] text-[#17191e]">
            영화 목록
          </h1>
          <p className="m-0 text-sm font-bold text-[#2563eb]">
            북마크 {bookmarkCount}편
          </p>
        </div>
        <MovieGrid movies={movies} />
        <Pagination />
      </main>

      <Footer />
    </>
  );
}
