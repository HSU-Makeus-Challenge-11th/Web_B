import ky, { HTTPError } from "ky";

export interface ApiResponse<T> {
  isSuccess: boolean;
  code: string;
  message: string;
  result: T;
}

export const membersClient = ky.create({
  baseUrl: `${(import.meta.env.VITE_API_BASE_URL || "http://localhost:8080").replace(/\/$/, "")}/`,
  retry: 0,
  timeout: 10_000,
});

export async function checkDuplicate(key: "email" | "nickname", value: string) {
  const response = await membersClient.get(`members/${key}/${encodeURIComponent(value)}`)
    .json<ApiResponse<{ available: boolean }>>();
  return response.result.available;
}

export function signup(body: { email: string; nickname: string; password: string }) {
  return membersClient.post("members", { json: body })
    .json<ApiResponse<{ memberId: number; email: string; nickname: string }>>();
}

export function getApiError(error: unknown) {
  if (error instanceof HTTPError) {
    const body = error.data;
    if (body && typeof body === "object" && "message" in body && typeof body.message === "string") {
      return body.message;
    }
    return `요청에 실패했습니다. (${error.response.status})`;
  }
  return "서버에 연결할 수 없어요. 잠시 후 다시 시도해 주세요.";
}
