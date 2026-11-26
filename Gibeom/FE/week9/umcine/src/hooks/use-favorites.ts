import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { getApiErrorMessage } from "../api/api-error";
import { addFavorite } from "../api/favorites/add-favorite";
import { getFavoriteStatus } from "../api/favorites/get-favorite-status";
import { getFavorites, type Favorite } from "../api/favorites/get-favorites";
import { removeFavorite } from "../api/favorites/remove-favorite";
import { useAuthStore } from "../stores/auth-store";

export const favoriteKeys = {
  all: ["favorites"] as const,
  list: ["favorites", "list"] as const,
  status: (movieId: number) => ["favorites", "status", movieId] as const,
};

// GET /favorites: 마이페이지와 영화 목록에서 즐겨찾기 여부를 표시
export function useFavoritesQuery() {
  const accessToken = useAuthStore((state) => state.accessToken);

  return useQuery({
    queryKey: favoriteKeys.list,
    queryFn: getFavorites,
    enabled: Boolean(accessToken),
  });
}

export function useFavoriteMovieIds() {
  const accessToken = useAuthStore((state) => state.accessToken);
  const favoritesQuery = useFavoritesQuery();

  if (!accessToken) return [];
  return favoritesQuery.data?.map((favorite) => favorite.movieId) ?? [];
}

// GET /favorites/{movieId}: 영화 상세에서 한 편의 즐겨찾기 여부만 조회
export function useFavoriteStatusQuery(movieId: number) {
  const accessToken = useAuthStore((state) => state.accessToken);

  return useQuery({
    queryKey: favoriteKeys.status(movieId),
    queryFn: () => getFavoriteStatus(movieId),
    enabled: Boolean(accessToken) && movieId > 0,
  });
}

interface ToggleFavoriteVariables {
  movieId: number;
  isFavorite: boolean;
}

export function useToggleFavorite() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const accessToken = useAuthStore((state) => state.accessToken);

  const mutation = useMutation({
    mutationFn: async ({ movieId, isFavorite }: ToggleFavoriteVariables) => {
      if (isFavorite) {
        await removeFavorite(movieId);
        return null;
      }
      const response = await addFavorite(movieId);
      return response.result;
    },
    // 응답과 요청 값만으로 변경 결과를 알 수 있어 다시 조회하지 않고 캐시를 직접 갱신
    onSuccess: (favorite, { movieId, isFavorite }) => {
      queryClient.setQueryData<boolean>(favoriteKeys.status(movieId), !isFavorite);
      queryClient.setQueryData<Favorite[]>(favoriteKeys.list, (prev) => {
        if (!prev) return prev;
        if (favorite) return [favorite, ...prev];
        return prev.filter((item) => item.movieId !== movieId);
      });
    },
    onError: (error) => {
      alert(getApiErrorMessage(error, "즐겨찾기를 변경하지 못했어요. 다시 시도해 주세요."));
    },
  });

  const toggleFavorite = (movieId: number, isFavorite: boolean) => {
    if (!accessToken) {
      alert("즐겨찾기는 로그인 후 이용할 수 있어요.");
      router.push("/login");
      return;
    }
    if (mutation.isPending) return;
    mutation.mutate({ movieId, isFavorite });
  };

  return {
    toggleFavorite,
    pendingMovieId: mutation.isPending ? mutation.variables.movieId : null,
  };
}
