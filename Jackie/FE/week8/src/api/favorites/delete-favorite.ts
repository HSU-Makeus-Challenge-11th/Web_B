import { apiClient } from "../api-client";

export interface DeleteFavoriteResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: null;
}

export function deleteFavorite(movieId: number) {
  return apiClient
    .delete(`favorites/${movieId}`)
    .json<DeleteFavoriteResponse>();
}
