import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { getMovieDetail } from "../api/movies/get-movie-detail";
import { getRequestError } from "../api/response";
import { useFavorites } from "../hooks/use-favorites";
import { getTmdbPosterUrl } from "../utils/movies/tmdb-image";
import { BookmarkButton } from "./bookmark-button";

export function ProfileFavorites() {
  const favoritesQuery = useFavorites();

  return (
    <section className="mt-8 border-t border-gray-200 pt-6">
      <h2 className="mb-4 text-lg font-bold text-gray-900">즐겨찾기 영화</h2>
      {favoritesQuery.isPending ? (
        <p role="status" className="text-sm text-gray-500">
          즐겨찾기를 불러오는 중이에요.
        </p>
      ) : favoritesQuery.isError ? (
        <div role="alert" className="text-sm text-red-600">
          <p>{getRequestError(favoritesQuery.error)}</p>
          <button
            type="button"
            className="mt-2 underline"
            onClick={() => void favoritesQuery.refetch()}
          >
            다시 시도
          </button>
        </div>
      ) : favoritesQuery.data.length === 0 ? (
        <p className="text-sm text-gray-500">즐겨찾기한 영화가 없어요.</p>
      ) : (
        <ul className="grid gap-4">
          {favoritesQuery.data.map((favorite) => (
            <li key={favorite.favoriteId}>
              <FavoriteMovie movieId={favorite.movieId} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

function FavoriteMovie({ movieId }: { movieId: number }) {
  const movieQuery = useQuery({
    queryKey: ["movies", "detail", movieId],
    queryFn: () => getMovieDetail(movieId),
    staleTime: 30 * 1000,
  });
  const title = movieQuery.data?.title ?? `영화 #${movieId}`;
  const posterUrl = getTmdbPosterUrl(movieQuery.data?.poster_path ?? null);

  return (
    <div className="flex items-center gap-3">
      <Link
        className="flex min-w-0 flex-1 items-center gap-3 font-bold"
        to="/movies/$movieId"
        params={{ movieId: String(movieId) }}
      >
        {posterUrl ? (
          <img src={posterUrl} alt="" className="h-20 w-14 rounded object-cover" />
        ) : (
          <span className="grid h-20 w-14 place-items-center rounded bg-gray-100 text-xs text-gray-400">
            이미지 없음
          </span>
        )}
        <span className="truncate">
          {movieQuery.isLoading ? "영화 정보 조회 중" : title}
        </span>
      </Link>
      <BookmarkButton movieId={movieId} movieTitle={title} iconOnly />
    </div>
  );
}
