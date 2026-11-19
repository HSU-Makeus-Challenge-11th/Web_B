import { apiClient } from "../api-client";

export interface MyInfo {
  memberId: number;
  nickname: string;
  email: string;
  createdAt: string;
}

export interface GetMyInfoResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: MyInfo;
}

export function getMyInfo() {
  return apiClient.get("members/me").json<GetMyInfoResponse>();
}
