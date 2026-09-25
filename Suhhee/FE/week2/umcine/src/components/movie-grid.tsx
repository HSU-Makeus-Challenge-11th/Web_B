import type { Movie } from '../types/movie'
import MovieCard from './movie-card'

interface MovieGridProps {
  movies: Movie[]
  onToggleBookmark: (movieId: number) => void
}

function MovieGrid({
  movies,
  onToggleBookmark,
}: MovieGridProps) {
  if (movies.length === 0) {
    return <p className="empty-message">표시할 영화가 없어요.</p>
  }

  return (
    <div className="movie-grid">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onToggleBookmark={onToggleBookmark}
        />
      ))}
    </div>
  )
}

export default MovieGrid