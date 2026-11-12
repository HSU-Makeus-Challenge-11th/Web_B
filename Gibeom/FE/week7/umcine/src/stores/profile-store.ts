import { create } from "zustand";

interface Profile {
  email: string;
  nickname: string;
  avatar: string;
}

interface ProfileStore {
  profile: Profile;
  isPreviewing: boolean;
  startPreview: (email: string) => void;
  updateProfile: (profile: Profile) => void;
  endPreview: () => void;
}

export const useProfileStore = create<ProfileStore>((set) => ({
  profile: { email: "god420@example.com", nickname: "god420", avatar: "" },
  isPreviewing: false,
  startPreview: (email) => set((state) => ({
    isPreviewing: true,
    profile: { ...state.profile, email },
  })),
  updateProfile: (profile) => set({ profile }),
  endPreview: () => set({
    isPreviewing: false,
    profile: { email: "god420@example.com", nickname: "god420", avatar: "" },
  }),
}));
