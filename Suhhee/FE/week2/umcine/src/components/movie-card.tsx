import type { Movie } from '../types/movie'

interface MovieCardProps {
  movie: Movie
  onToggleBookmark: (movieId: number) => void
}

function MovieCard({
  movie,
  onToggleBookmark,
}: MovieCardProps) {
  const bookmarkIcon = movie.isBookmarked
    ? '/icons/bookmark.svg'
    : '/icons/bookmark-outline.svg'

  const bookmarkLabel = movie.isBookmarked
    ? `${movie.title} 북마크 해제`
    : `${movie.title} 북마크 추가`

  return (
    <article className="movie-card">
      <div className="poster-wrapper">
        <img
          className="movie-poster"
          src={movie.posterPath}
          alt={`${movie.title} 포스터`}
        />

        <button
          className={`bookmark-button ${
            movie.isBookmarked ? 'active' : ''
          }`}
          type="button"
          aria-label={bookmarkLabel}
          aria-pressed={movie.isBookmarked}
          onClick={() => onToggleBookmark(movie.id)}
        >
          <img src={bookmarkIcon} alt="" />
        </button>
      </div>

      <h2 className="movie-title">{movie.title}</h2>
      <p className="movie-release-date">{movie.releaseDate}</p>
    </article>
  )
}

export default MovieCard