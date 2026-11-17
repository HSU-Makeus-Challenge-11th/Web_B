import { useQuery } from "@tanstack/react-query";
import { getPopularMovies } from "../../api/tmdb";
import { Footer } from "../../components/layout/footer";
import MovieGrid from "../../components/movies/movie-grid";
import Pagination from "../../components/movies/pagination";
import { useBookmarkStore } from "../../stores/bookmark-store";

export function MovieListPage() {
  const {
    data: movies = [],
    error,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["movies", "popular"],
    queryFn: getPopularMovies,
  });
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
        {isLoading && (
          <p className="min-h-[520px] pt-24 text-center text-[#606774]">
            인기 영화를 불러오고 있어요.
          </p>
        )}
        {isError && (
          <p className="min-h-[520px] pt-24 text-center font-bold text-[#b42318]">
            {error instanceof Error
              ? error.message
              : "영화 목록을 불러오지 못했어요."}
          </p>
        )}
        {!isLoading && !isError && movies.length === 0 && (
          <p className="min-h-[520px] pt-24 text-center text-[#606774]">
            표시할 영화가 없어요.
          </p>
        )}
        {!isLoading && !isError && movies.length > 0 && (
          <>
            <MovieGrid movies={movies} />
            <Pagination />
          </>
        )}
      </main>

      <Footer />
    </>
  );
}
