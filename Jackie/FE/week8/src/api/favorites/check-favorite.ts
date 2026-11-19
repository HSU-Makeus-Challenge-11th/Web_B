import { apiClient } from "../api-client";

export interface CheckFavoriteResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    isFavorite: boolean;
  };
}

export function checkFavorite(movieId: number) {
  return apiClient.get(`favorites/${movieId}`).json<CheckFavoriteResponse>();
}
