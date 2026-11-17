import type { Movie } from "../../types/movie";
import MovieCard from "./movie-card";

interface MovieGridProps {
  movies: Movie[]
  onToggleBookmark: (movieId: number) => void
}

function MovieGrid({
  movies,
  onToggleBookmark,
}: MovieGridProps) {
  if (movies.length === 0) {
    return (
      <p className="m-0 min-h-[1017px] pt-25 text-center text-[#606774]">
        표시할 영화가 없어요.
      </p>
    );
  }

  return (
    <div className="grid min-h-[1017px] w-full auto-rows-[318px] grid-cols-1 content-start gap-x-[18px] gap-y-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onToggleBookmark={onToggleBookmark}
        />
      ))}
    </div>
  );
}

export default MovieGrid;
