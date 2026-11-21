import { QueryClient } from "@tanstack/react-query";

const ONE_MINUTE = 60 * 1000;

// 토큰이 바뀔 때 auth store에서도 캐시를 정리할 수 있도록 모듈로 분리
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: ONE_MINUTE,
    },
  },
});
