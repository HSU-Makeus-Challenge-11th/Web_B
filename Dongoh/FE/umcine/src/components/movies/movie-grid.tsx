import type { TmdbMovieListItem } from "../../api/movies/models";
import { useBookmarkStore } from "../../stores/bookmark-store";
import MovieCard from "./movie-card";

interface MovieGridProps {
  movies: TmdbMovieListItem[];
}

export default function MovieGrid({ movies: apiMovies }: MovieGridProps) {
  const bookmarkedMovieIds = useBookmarkStore(
    (state) => state.bookmarkedMovieIds,
  );
  const toggleBookmark = useBookmarkStore((state) => state.toggleBookmark);

  const movies = apiMovies.map((movie) => ({
    ...movie,
    isBookmarked: bookmarkedMovieIds.includes(movie.id),
  }));

  return (
    <ul
      aria-label="영화 카드 목록"
      className="m-0 grid list-none grid-cols-2 gap-x-5 gap-y-7 p-0 md:grid-cols-3 lg:grid-cols-5 max-[720px]:gap-3.5"
    >
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onToggleBookmark={toggleBookmark}
        />
      ))}
    </ul>
  );
}
