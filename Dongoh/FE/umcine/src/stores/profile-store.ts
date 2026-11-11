import { create } from "zustand";

export interface Profile {
  email: string;
  nickname: string;
  bio: string;
}

interface ProfileStore {
  profile: Profile;
  hasUpdated: boolean;
  updateProfile: (profile: Profile) => void;
}

// 7주차 화면 퍼블리싱용 데이터입니다. 서버의 내 정보 연동은 8주차 범위입니다.
export const useProfileStore = create<ProfileStore>((set) => ({
  profile: {
    email: "movie@example.com",
    nickname: "영화팬",
    bio: "좋아하는 영화를 기록하고 있어요.",
  },
  hasUpdated: false,
  updateProfile: (profile) => set({ profile, hasUpdated: true }),
}));
