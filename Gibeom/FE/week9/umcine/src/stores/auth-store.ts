import { useSyncExternalStore } from "react";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { getQueryClient } from "../lib/query-client";

interface AuthStore {
  accessToken: string | null;
  setAccessToken: (accessToken: string | null) => void;
}

// 로그인한 사람에 따라 달라지는 캐시
const isMemberQuery = (queryKey: readonly unknown[]) =>
  queryKey[0] === "members" || queryKey[0] === "favorites";

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      accessToken: null,
      setAccessToken: (accessToken) => {
        // 계정이 바뀌거나 로그아웃·401로 토큰이 지워지면 이전 계정의 캐시를 비움
        getQueryClient().removeQueries({ predicate: (query) => isMemberQuery(query.queryKey) });
        set({ accessToken });
      },
    }),
    {
      name: "umcine-auth-store",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ accessToken: state.accessToken }),
    },
  ),
);

// 서버가 토큰 subject에 memberId를 담아 발급함
// 평점 조회 URL에 필요한 값만 읽고, 서명 검증과 인가는 서버가 맡음
export function getMemberIdFromToken(accessToken: string | null): number | null {
  if (!accessToken) return null;

  try {
    const payload = accessToken.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
    const padded = payload.padEnd(Math.ceil(payload.length / 4) * 4, "=");
    const memberId = Number((JSON.parse(atob(padded)) as { sub?: string }).sub);
    return Number.isSafeInteger(memberId) && memberId > 0 ? memberId : null;
  } catch {
    return null;
  }
}

export function useMemberId() {
  return getMemberIdFromToken(useAuthStore((state) => state.accessToken));
}

// 서버에는 localStorage가 없어 토큰을 항상 null로 렌더링함
// 브라우저의 첫 렌더(hydration)도 서버 HTML과 같아야 하므로, 그동안은 false를 돌려주고
// 화면에 붙은 뒤에 localStorage에서 복원한 토큰을 기준으로 다시 렌더링하게 함
export function useAuthHydrated() {
  return useSyncExternalStore(
    (onChange) => useAuthStore.persist.onFinishHydration(onChange),
    () => useAuthStore.persist.hasHydrated(),
    () => false,
  );
}
