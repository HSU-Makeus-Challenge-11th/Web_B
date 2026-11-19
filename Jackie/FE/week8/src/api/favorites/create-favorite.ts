import { apiClient } from "../api-client";
import type { Favorite } from "./get-favorites";

export interface CreateFavoriteResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: Favorite;
}

export function createFavorite(movieId: number) {
  return apiClient
    .post("favorites", {
      json: { movieId },
    })
    .json<CreateFavoriteResponse>();
}
