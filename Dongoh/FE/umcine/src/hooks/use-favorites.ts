import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addFavorite,
  deleteFavorite,
  getFavorite,
  getFavorites,
} from "../api/favorites";
import { useAuthStore } from "../stores/auth-store";

export function useFavorites() {
  const accessToken = useAuthStore((state) => state.accessToken);

  return useQuery({
    queryKey: ["favorites", "list"],
    queryFn: ({ signal }) => getFavorites(signal),
    enabled: Boolean(accessToken),
    retry: false,
  });
}

export function useFavorite(movieId: number) {
  const accessToken = useAuthStore((state) => state.accessToken);

  return useQuery({
    queryKey: ["favorites", "detail", movieId],
    queryFn: ({ signal }) => getFavorite(movieId, signal),
    enabled: Boolean(accessToken),
    retry: false,
  });
}

export function useFavoriteMutation(movieId: number) {
  const queryClient = useQueryClient();
  const accessToken = useAuthStore((state) => state.accessToken);

  return useMutation({
    mutationKey: ["favorite-toggle", movieId],
    mutationFn: async (isFavorite: boolean) => {
      if (isFavorite) {
        await deleteFavorite(movieId);
      } else {
        await addFavorite(movieId);
      }
      return !isFavorite;
    },
    onSuccess: async (isFavorite) => {
      if (useAuthStore.getState().accessToken !== accessToken) return;

      queryClient.setQueryData(["favorites", "detail", movieId], {
        isFavorite,
      });
      await queryClient.invalidateQueries({ queryKey: ["favorites", "list"] });
    },
  });
}
