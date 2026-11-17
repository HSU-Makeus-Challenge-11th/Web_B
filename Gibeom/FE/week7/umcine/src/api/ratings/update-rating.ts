import { apiClient } from "../api-client";

export interface UpdateRatingRequest {
  score: number;
  comment: string;
}

export interface UpdateRatingResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: null;
}

export function updateRating(memberId: number, ratingId: number, body: UpdateRatingRequest) {
  return apiClient
    .patch(`members/${memberId}/ratings/${ratingId}`, { json: body })
    .json<UpdateRatingResponse>();
}
