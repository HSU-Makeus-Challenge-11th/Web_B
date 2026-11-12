import { apiClient } from "../api-client";

export interface UpdatePageRequest {
  nickname: string;
}

export async function updatePage(request: UpdatePageRequest): Promise<void> {
  const token = sessionStorage.getItem("umcine-access-token");

  if (!token) {
    throw new Error("로그인이 필요합니다.");
  }

  await apiClient.patch("members/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    json: request,
  });
}
