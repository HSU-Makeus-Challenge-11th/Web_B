import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { cn } from "../utils/cn";
import { useAuthStore } from "../stores/auth-store";
import { getFavorites } from "../api/favorites/get-favorites";
import { createFavorite } from "../api/favorites/create-favorite";
import { deleteFavorite } from "../api/favorites/delete-favorite";

interface BookmarkButtonProps {
  movieId: number;
}

export function BookmarkButton({ movieId }: BookmarkButtonProps) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const accessToken = useAuthStore((state) => state.accessToken);

  const favoritesQuery = useQuery({
    queryKey: ["favorites", "list"],
    queryFn: getFavorites,
    enabled: Boolean(accessToken),
  });

  const isBookmarked =
    Boolean(accessToken) &&
    (favoritesQuery.data?.result.some(
      (favorite) => favorite.movieId === movieId,
    ) ??
      false);

  const toggleMutation = useMutation({
    mutationFn: async (bookmarked: boolean) => {
      if (bookmarked) {
        return deleteFavorite(movieId);
      }

      return createFavorite(movieId);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["favorites"],
      });
    },
    onError: () => {
      alert("즐겨찾기 변경에 실패했어요.");
    },
  });

  const handleToggle = () => {
    if (!accessToken) {
      alert("로그인이 필요해요.");
      navigate({ to: "/login" });
      return;
    }

    if (!favoritesQuery.isSuccess || toggleMutation.isPending) return;

    toggleMutation.mutate(isBookmarked);
  };

  return (
    <button
      type="button"
      className={cn(
        "absolute right-[10px] top-[10px] flex h-[34px] w-[34px] items-center justify-center rounded-[8px] border p-[7.5px_6px]",
        isBookmarked
          ? "border-[#2563EB] bg-[#2563EB]"
          : "border-white bg-[#17191E]",
      )}
      aria-pressed={isBookmarked}
      disabled={
        toggleMutation.isPending ||
        (Boolean(accessToken) && !favoritesQuery.isSuccess)
      }
      onClick={handleToggle}
    >
      {isBookmarked ? (
        <img
          className="h-6 w-6 brightness-0 invert"
          src="/icons/bookmark.svg"
          alt="북마크 해제"
        />
      ) : (
        <img
          className="h-6 w-6 brightness-0 invert"
          src="/icons/bookmark-outline.svg"
          alt="북마크"
        />
      )}
    </button>
  );
}
