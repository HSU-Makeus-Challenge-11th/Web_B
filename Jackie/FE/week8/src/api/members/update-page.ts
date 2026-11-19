import { apiClient } from "../api-client";

export interface UpdatePageRequest {
  nickname: string;
}

export async function updatePage(request: UpdatePageRequest): Promise<void> {
  await apiClient.patch("members/me", {
    json: request,
  });
}
