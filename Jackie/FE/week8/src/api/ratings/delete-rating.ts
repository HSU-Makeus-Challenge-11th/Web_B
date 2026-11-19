import { apiClient } from "../api-client";

export interface DeleteRatingResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: null;
}

export function deleteRating(ratingId: number) {
  return apiClient.delete(`ratings/${ratingId}`).json<DeleteRatingResponse>();
}
