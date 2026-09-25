import { useState } from 'react'
import './App.css'
import Header from './components/header'
import MovieGrid from './components/movie-grid'
import Pagination from './components/pagination'
import { movies as initialMovies } from './data/movies'
import type { Movie } from './types/movie'

function App() {
  const [movieList, setMovieList] = useState<Movie[]>(initialMovies)

  function handleToggleBookmark(movieId: number) {
    setMovieList((currentMovies) =>
      currentMovies.map((movie) =>
        movie.id === movieId
          ? {
              ...movie,
              isBookmarked: !movie.isBookmarked,
            }
          : movie,
      ),
    )
  }

  return (
    <div className="app">
      <Header />

      <main className="main-content" id="movies">
        <h1 className="page-title">영화 목록</h1>

        <MovieGrid
          movies={movieList}
          onToggleBookmark={handleToggleBookmark}
        />

        <Pagination />
      </main>

      <footer className="site-footer">
        <div className="footer-inner">
          <img
            className="tmdb-logo"
            src="/images/logos/tmdb-logo.svg"
            alt="TMDB"
          />

          <p>
            This product uses the TMDB API but is not endorsed or
            certified by{' '}
            <a
              href="https://www.themoviedb.org/?language=ko"
              target="_blank"
              rel="noreferrer"
            >
              TMDB
            </a>
            .
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App