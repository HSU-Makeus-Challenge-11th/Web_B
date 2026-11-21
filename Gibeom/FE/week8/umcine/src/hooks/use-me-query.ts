import { useQuery } from "@tanstack/react-query";
import { getMe } from "../api/members/me";
import { useAuthStore } from "../stores/auth-store";

// 헤더와 내 정보 화면이 같은 ["members", "me"] 캐시를 함께 사용
export function useMeQuery() {
  const accessToken = useAuthStore((state) => state.accessToken);

  return useQuery({
    queryKey: ["members", "me"],
    queryFn: getMe,
    enabled: Boolean(accessToken),
    staleTime: 5 * 60 * 1000,
    // 401로 토큰을 지운 뒤 같은 조회를 다시 보내지 않도록 재시도를 끔
    retry: false,
  });
}
