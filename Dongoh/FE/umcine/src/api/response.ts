import { HTTPError } from "ky";

export interface ApiResponse<T> {
  isSuccess: boolean;
  code: string;
  message: string;
  result: T;
}

export async function readResult<T>(request: Promise<ApiResponse<T>>): Promise<T> {
  const response = await request;
  if (!response.isSuccess) {
    throw new Error(response.message || "요청에 실패했어요.");
  }
  return response.result;
}

export function getRequestError(error: unknown) {
  if (error instanceof HTTPError) {
    const data = error.data as { message?: string } | undefined;
    return data?.message || "요청에 실패했어요. 다시 시도해 주세요.";
  }
  return error instanceof Error
    ? error.message
    : "요청에 실패했어요. 다시 시도해 주세요.";
}
