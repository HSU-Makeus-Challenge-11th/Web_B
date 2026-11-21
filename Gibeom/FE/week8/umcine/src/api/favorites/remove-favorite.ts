import { authApi } from "../auth-api";

interface RemoveFavoriteResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: null;
}

export function removeFavorite(movieId: number) {
  return authApi.delete(`favorites/${movieId}`).json<RemoveFavoriteResponse>();
}
