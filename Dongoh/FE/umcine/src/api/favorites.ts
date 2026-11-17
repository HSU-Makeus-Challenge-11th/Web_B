import { authApi } from "./auth-api";
import { readResult, type ApiResponse } from "./response";

export interface Favorite {
  favoriteId: number;
  movieId: number;
  createdAt: string;
}

export interface FavoriteStatus {
  isFavorite: boolean;
}

export function getFavorites(signal?: AbortSignal) {
  return readResult(
    authApi.get("favorites", { signal }).json<ApiResponse<Favorite[]>>(),
  );
}

export function getFavorite(movieId: number, signal?: AbortSignal) {
  return readResult(
    authApi
      .get(`favorites/${movieId}`, { signal })
      .json<ApiResponse<FavoriteStatus>>(),
  );
}

export function addFavorite(movieId: number) {
  return readResult(
    authApi
      .post("favorites", { json: { movieId } })
      .json<ApiResponse<Favorite>>(),
  );
}

export function deleteFavorite(movieId: number) {
  return readResult(
    authApi.delete(`favorites/${movieId}`).json<ApiResponse<null>>(),
  );
}
