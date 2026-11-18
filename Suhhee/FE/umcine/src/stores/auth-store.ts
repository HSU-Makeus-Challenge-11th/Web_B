import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { queryClient } from "../lib/query-client";

interface AuthStore {
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
}

export const useAuthStore = create<AuthStore>()(persist((set) => ({
  accessToken: null,
  setAccessToken: (accessToken) => {
    void queryClient.cancelQueries({ predicate: query => ["members", "favorites"].includes(String(query.queryKey[0])) });
    queryClient.removeQueries({ predicate: query => ["members", "favorites"].includes(String(query.queryKey[0])) });
    set({ accessToken });
  },
}), {
  name: "umcine-auth-store",
  storage: createJSONStorage(() => localStorage),
  partialize: state => ({ accessToken: state.accessToken }),
}));

// 조회 URL에 필요한 ID만 읽음. 서명 검증과 인가는 서버가 수행함.
export function memberIdFromToken(token: string | null): number | null {
  try {
    const encoded = token!.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
    const value = Number(JSON.parse(atob(encoded)).sub);
    return Number.isSafeInteger(value) && value > 0 ? value : null;
  } catch { return null; }
}
