import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface MemberStore {
  memberId: number | null;
  setMemberId: (memberId: number) => void;
}

// 로그인 API가 없어서 회원가입 응답의 memberId를 보관해 평점 API에 사용
export const useMemberStore = create<MemberStore>()(
  persist(
    (set) => ({
      memberId: null,
      setMemberId: (memberId) => set({ memberId }),
    }),
    {
      name: "umcine-member-store",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
