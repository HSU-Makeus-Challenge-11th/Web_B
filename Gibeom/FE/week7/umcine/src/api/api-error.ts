import { HTTPError } from "ky";

// 서버가 내려준 ApiResponse.message를 꺼내고, 없으면 fallback 사용
export function getApiErrorMessage(error: unknown, fallback: string) {
  if (error instanceof HTTPError) {
    const data = error.data;
    if (data && typeof data === "object" && "message" in data && typeof data.message === "string") {
      return data.message;
    }
  }
  return fallback;
}
