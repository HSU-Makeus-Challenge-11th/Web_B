import { apiClient } from "../api-client";

export interface Rating {
  ratingId: number;
  movieId: number;
  score: number;
  comment: string | null;
  createdAt: string;
  updatedAt: string;
}

// 명세상 배열을 그대로 응답하지만, ApiResponse로 감싼 서버도 함께 처리
type GetMemberRatingsResponse = Rating[] | { result: Rating[] };

export async function getMemberRatings(memberId: number): Promise<Rating[]> {
  const response = await apiClient
    .get(`members/${memberId}/ratings`)
    .json<GetMemberRatingsResponse>();
  return Array.isArray(response) ? response : response.result;
}
