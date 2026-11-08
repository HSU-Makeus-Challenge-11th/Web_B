import type { AvailabilityResponse, RatingResponse } from "../types/member";

const API_BASE_URL = "http://localhost:8080";

async function request<T>(path: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`);
  if (!response.ok) {
    throw new Error(response.status === 404 ? "존재하지 않는 유저예요." : `요청 실패 (${response.status})`);
  }
  return response.json();
}

export function checkNickname(nickname: string) {
  return request<AvailabilityResponse>(`/members/nickname/${encodeURIComponent(nickname)}`);
}

export function checkEmail(email: string) {
  return request<AvailabilityResponse>(`/members/email/${encodeURIComponent(email)}`);
}

export function getMemberRatings(memberId: number) {
  return request<RatingResponse[]>(`/members/${memberId}/ratings`);
}
