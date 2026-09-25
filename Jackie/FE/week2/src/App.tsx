import { useState } from "react";
import "./App.css";

import { movies as initialMovies } from "./data/movies";
import Header from "./components/header";
import Footer from "./components/footer";
import MovieGrid from "./components/movie-grid";
import Pagination from "./components/pagination";

export default function App() {
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
    <div className="movie-page">
      <Header />

      <main className="page-content">
        <h1 className="page-title">영화 목록</h1>

        {movies.length === 0 ? (
          <p>표시할 영화가 없어요.</p>
        ) : (
          <MovieGrid movies={movies} onToggleBookmark={handleToggleBookmark} />
        )}

        <Pagination />
      </main>

      <Footer />
    </div>
  );
}
