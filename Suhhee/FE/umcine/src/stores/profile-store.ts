import { create } from "zustand";

interface ProfileState {
  nickname: string;
  email: string;
  avatar: string;
  updateProfile: (profile: { nickname: string; avatar: string }) => void;
}

export const useProfileStore = create<ProfileState>(set => ({
  nickname: "솔7주차", email: "sol@example.com", avatar: "",
  updateProfile: profile => set(profile),
}));
