import MovieCard from "./movie-card";
import type { Movie } from "../../types/movie";

interface MovieGridProps {
  movies: Movie[];
}

export default function MovieGrid({ movies }: MovieGridProps) {
  return (
    <ul className="grid grid-cols-[repeat(5,1fr)] grid-rows-[repeat(3,318px)] w-[1280px] h-[1017px] gap-x-[18px] gap-y-[20px] m-0 p-0 list-none">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </ul>
  );
}
