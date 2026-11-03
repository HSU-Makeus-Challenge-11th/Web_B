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
      className="bookmark-text-button"
      type="button"
      aria-pressed={isBookmarked}
      onClick={() => toggleBookmark(movieId)}
    >
      {isBookmarked ? "북마크 해제" : "북마크 추가"}
    </button>
  );
}
