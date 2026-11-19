import { apiClient } from "../api-client";
import type { Rating } from "./get-ratings";

export interface CreateRatingRequest {
  movieId: number;
  score: number;
  comment: string | null;
}

export interface CreateRatingResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: Rating;
}

export function createRating(body: CreateRatingRequest) {
  return apiClient.post("ratings", { json: body }).json<CreateRatingResponse>();
}
