import { useBookmarkStore } from "../stores/bookmark-store";

interface BookmarkButtonProps {
  movieId: number;
}

export function BookmarkButton({ movieId }: BookmarkButtonProps) {
  const isBookmarked = useBookmarkStore((state) =>
    state.bookmarkedMovieIds.includes(movieId),
  );
  const toggleBookmark = useBookmarkStore(
    (state) => state.toggleBookmark,
  );

  return (
    <button
      className="rounded-md border border-gray-300 bg-white px-[9px] py-1.5 text-xs font-extrabold text-gray-700 aria-pressed:border-blue-600 aria-pressed:bg-blue-50 aria-pressed:text-blue-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
      type="button"
      aria-pressed={isBookmarked}
      onClick={() => toggleBookmark(movieId)}
    >
      {isBookmarked ? "북마크 해제" : "북마크 추가"}
    </button>
  );
}
