import { useEffect, useState } from "react";
import { getMovies } from "../../api/movies/get-movies";
import type { TmdbMovieListItem } from "../../api/movies/models";
import MovieGrid from "../../components/movies/movie-grid";

export function MovieListPage() {
  const [movies, setMovies] = useState<TmdbMovieListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;

    async function loadMovies() {
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
    <main className="movie-list-page">
      <section className="movie-list-page__heading">
        <p>UMC Movie</p>
        <h1>영화 목록</h1>
      </section>
      {isLoading ? (
        <p className="movie-list-page__status" role="status">
          영화 목록을 불러오는 중이에요.
        </p>
      ) : errorMessage ? (
        <p className="movie-list-page__status" role="alert">
          {errorMessage}
        </p>
      ) : movies.length === 0 ? (
        <p className="movie-list-page__status" role="status">
          조건에 맞는 영화가 없어요.
        </p>
      ) : (
        <MovieGrid movies={movies} />
      )}
    </main>
  );
}
