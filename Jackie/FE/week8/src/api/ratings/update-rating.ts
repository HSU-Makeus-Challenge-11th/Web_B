import { apiClient } from "../api-client";
import type { Rating } from "./get-ratings";

export interface UpdateRatingRequest {
  score: number;
  comment: string | null;
}

export interface UpdateRatingResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: Rating;
}

export function updateRating(ratingId: number, body: UpdateRatingRequest) {
  return apiClient
    .patch(`ratings/${ratingId}`, { json: body })
    .json<UpdateRatingResponse>();
}
