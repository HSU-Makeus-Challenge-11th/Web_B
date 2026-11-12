import { apiClient } from "../api-client";

export interface MyInfo {
  memberId?: number;
  nickname: string;
  email: string;
}

export interface GetMyInfoResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: MyInfo;
}

export function getMyInfo() {
  const token = sessionStorage.getItem("umcine-access-token");

  if (!token) {
    throw new Error("로그인이 필요합니다.");
  }

  return apiClient
    .get("members/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .json<GetMyInfoResponse>();
}
