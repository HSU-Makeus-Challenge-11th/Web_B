import MovieGrid from "../../components/movies/movie-grid";

export function MovieListPage() {
  return (
    <main className="px-10 pb-10">
      <h1 className="mb-3 text-xl font-bold">영화 목록</h1>
      <MovieGrid />
    </main>
  );
}
