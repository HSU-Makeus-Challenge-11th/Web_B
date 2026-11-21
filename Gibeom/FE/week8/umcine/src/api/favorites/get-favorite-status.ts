import { authApi } from "../auth-api";

interface GetFavoriteStatusResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: { isFavorite: boolean };
}

export async function getFavoriteStatus(movieId: number): Promise<boolean> {
  const response = await authApi
    .get(`favorites/${movieId}`)
    .json<GetFavoriteStatusResponse>();
  return response.result.isFavorite;
}
