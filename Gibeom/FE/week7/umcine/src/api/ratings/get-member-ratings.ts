import { apiClient } from "../api-client";

export interface Rating {
  ratingId: number;
  movieId: number;
  score: number;
  comment: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface GetMemberRatingsResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: Rating[];
}

export function getMemberRatings(memberId: number) {
  return apiClient
    .get(`members/${memberId}/ratings`)
    .json<GetMemberRatingsResponse>();
}
