import { isServer, QueryClient } from "@tanstack/react-query";

const ONE_MINUTE = 60 * 1000;

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: ONE_MINUTE,
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined;

// 서버는 여러 사용자의 요청을 같은 프로세스에서 처리하므로 요청마다 새로 만들고,
// 브라우저에서는 페이지를 이동해도 캐시가 유지되도록 하나만 만들어 재사용함
export function getQueryClient() {
  if (isServer) return makeQueryClient();
  browserQueryClient ??= makeQueryClient();
  return browserQueryClient;
}
