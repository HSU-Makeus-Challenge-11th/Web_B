import { useQuery } from "@tanstack/react-query";
import { getMe } from "../api/members/me";
import { useAuthStore } from "../stores/auth-store";

export function useMeQuery() {
  const accessToken = useAuthStore((state) => state.accessToken);

  return useQuery({
    queryKey: ["members", "me"],
    queryFn: ({ signal }) => getMe(signal),
    enabled: Boolean(accessToken),
    staleTime: 5 * 60 * 1000,
    retry: false,
  });
}
