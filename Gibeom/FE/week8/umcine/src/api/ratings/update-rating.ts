import { authApi } from "../auth-api";
import type { Rating } from "./get-member-ratings";

export interface UpdateRatingRequest {
  score: number;
  comment: string;
}

interface UpdateRatingResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: Rating;
}

export function updateRating(ratingId: number, body: UpdateRatingRequest) {
  return authApi
    .patch(`ratings/${ratingId}`, { json: body })
    .json<UpdateRatingResponse>();
}
