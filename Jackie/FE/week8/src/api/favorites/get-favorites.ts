import { apiClient } from "../api-client";

export interface Favorite {
  favoriteId: number;
  movieId: number;
}

export interface GetFavoritesResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: Favorite[];
}

export function getFavorites() {
  return apiClient.get("favorites").json<GetFavoritesResponse>();
}
