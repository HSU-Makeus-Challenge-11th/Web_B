import { apiClient } from "../api-client";

export interface CreateRatingRequest {
  movieId: number;
  score: number;
  comment: string;
}

export interface CreateRatingResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: number;
}

export function createRating(memberId: number, body: CreateRatingRequest) {
  return apiClient
    .post(`members/${memberId}/ratings`, { json: body })
    .json<CreateRatingResponse>();
}
