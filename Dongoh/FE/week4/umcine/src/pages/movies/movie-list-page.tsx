import MovieGrid from "../../components/movies/movie-grid";

export function MovieListPage() {
  return (
    <main className="movie-list-page">
      <section className="movie-list-page__heading">
        <p>UMC Movie</p>
        <h1>영화 목록</h1>
      </section>
      <MovieGrid />
    </main>
  );
}
