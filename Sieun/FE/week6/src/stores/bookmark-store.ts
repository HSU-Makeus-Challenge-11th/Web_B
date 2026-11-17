import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { toBookmarkIds } from "../utils/bookmark-ids";

interface BookmarkStore {
  bookmarkedMovieIds: number[];
  toggleBookmark: (movieId: number) => void;
}

export const useBookmarkStore = create<BookmarkStore>()(
  persist(
    (set) => ({
      bookmarkedMovieIds: [],
      toggleBookmark: (movieId) =>
        set((state) => ({
          bookmarkedMovieIds: state.bookmarkedMovieIds.includes(movieId)
            ? state.bookmarkedMovieIds.filter((id) => id !== movieId)
            : [...state.bookmarkedMovieIds, movieId],
        })),
    }),
    {
      name: "umcine-bookmark-store",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        bookmarkedMovieIds: state.bookmarkedMovieIds,
      }),
      // 저장값을 직접 고쳤을 때 잘못된 ID가 상태에 들어오지 않게 걸러서 합쳐요
      merge: (persistedState, currentState) => ({
        ...currentState,
        bookmarkedMovieIds: toBookmarkIds(
          (persistedState as Partial<BookmarkStore> | undefined)?.bookmarkedMovieIds,
        ),
      }),
    },
  ),
);
