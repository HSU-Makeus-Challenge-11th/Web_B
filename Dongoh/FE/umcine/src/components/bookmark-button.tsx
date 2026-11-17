import { useIsMutating } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { getRequestError } from "../api/response";
import { useFavorite, useFavoriteMutation } from "../hooks/use-favorites";
import { useAuthStore } from "../stores/auth-store";
import { cn } from "../utils/cn";

interface BookmarkButtonProps {
  movieId: number;
  movieTitle?: string;
  iconOnly?: boolean;
  className?: string;
}

export function BookmarkButton({
  movieId,
  movieTitle = "영화",
  iconOnly = false,
  className,
}: BookmarkButtonProps) {
  const accessToken = useAuthStore((state) => state.accessToken);
  const favoriteQuery = useFavorite(movieId);
  const favoriteMutation = useFavoriteMutation(movieId);
  const isMutating =
    useIsMutating({ mutationKey: ["favorite-toggle", movieId] }) > 0;
  const navigate = useNavigate();
  const isFavorite = Boolean(accessToken && favoriteQuery.data?.isFavorite);

  return (
    <button
      type="button"
      aria-label={`${movieTitle} 즐겨찾기 ${isFavorite ? "해제" : "추가"}`}
      aria-pressed={isFavorite}
      aria-busy={isMutating}
      disabled={isMutating || Boolean(accessToken && favoriteQuery.isLoading)}
      className={cn(
        "rounded-md border border-gray-300 bg-white px-[9px] py-1.5 text-xs font-extrabold text-gray-700 disabled:opacity-50 aria-pressed:border-blue-600 aria-pressed:bg-blue-50 aria-pressed:text-blue-600",
        iconOnly && "grid size-10 place-items-center p-2",
        className,
      )}
      onClick={() => {
        if (!accessToken) {
          void navigate({ to: "/login" });
          return;
        }
        if (favoriteQuery.isError) {
          void favoriteQuery.refetch();
          return;
        }
        if (!favoriteQuery.data || isMutating) return;

        favoriteMutation.mutate(isFavorite, {
          onError: (error) => alert(getRequestError(error)),
        });
      }}
    >
      {iconOnly ? (
        <img
          src={`/icons/movie-icons/${isFavorite ? "bookmark" : "bookmark-outline"}.svg`}
          alt=""
          aria-hidden="true"
          className="size-5"
        />
      ) : isMutating ? (
        "변경 중"
      ) : favoriteQuery.isError ? (
        "즐겨찾기 조회 재시도"
      ) : isFavorite ? (
        "즐겨찾기 해제"
      ) : (
        "즐겨찾기 추가"
      )}
    </button>
  );
}
