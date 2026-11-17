import type { Movie } from "../types/movie";

interface MovieCardProps {
  movie: Movie;
  onToggleBookmark: (movieId: number) => void;
}

export default function MovieCard({ movie, onToggleBookmark }: MovieCardProps) {
  const bookmarkIcon = movie.isBookmarked
    ? "/icons/movie-icons/bookmark.svg"
    : "/icons/movie-icons/bookmark-outline.svg";

  return (
    <li className="min-w-0">
      <div className="relative overflow-hidden rounded-lg bg-gray-900">
        <img className="block aspect-[7/8] w-full object-cover" src={movie.posterPath} alt={`${movie.title} 포스터`} />
        <button
          className="absolute top-2 right-2 inline-flex size-9 items-center justify-center rounded-lg border border-white/80 p-[7px] transition-[background,transform] duration-150 hover:-translate-y-px"
          type="button"
          aria-label={`${movie.title} 북마크 ${movie.isBookmarked ? "해제" : "추가"}`}
          aria-pressed={movie.isBookmarked}
          onClick={() => onToggleBookmark(movie.id)}
        >
          <img src={bookmarkIcon} alt="" aria-hidden="true" />
        </button>
      </div>

      <div className="pt-[9px] [&_h2]:m-0 [&_h2]:truncate [&_h2]:text-[13px] [&_h2]:leading-[1.35] [&_h2]:font-extrabold [&_h2]:text-gray-900 [&_span]:mt-1 [&_span]:block [&_span]:text-xs [&_span]:text-gray-400">
        <h2>{movie.title}</h2>
        <p>{movie.originalTitle}</p>
        <span>{movie.releaseDate}</span>
      </div>
    </li>
  );
}
