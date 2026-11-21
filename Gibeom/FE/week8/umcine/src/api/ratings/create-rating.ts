import { authApi } from "../auth-api";
import type { Rating } from "./get-member-ratings";

export interface CreateRatingRequest {
  movieId: number;
  score: number;
  comment: string;
}

interface CreateRatingResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: Rating;
}

export function createRating(body: CreateRatingRequest) {
  return authApi.post("ratings", { json: body }).json<CreateRatingResponse>();
}
