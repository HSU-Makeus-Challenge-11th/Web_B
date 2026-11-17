import { authApi } from "../auth-api";

export interface MemberInfo {
  email: string;
  nickname: string;
  createdAt: string;
}

interface MeResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: MemberInfo;
}

export async function getMe(signal?: AbortSignal): Promise<MemberInfo> {
  const response = await authApi
    .get("members/me", { signal })
    .json<MeResponse>();
  return response.result;
}
