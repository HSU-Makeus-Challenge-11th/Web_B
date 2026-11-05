import { cn } from "../utils/cn";
import { useBookmarkStore } from "../stores/bookmark-store";

interface BookmarkButtonProps {
  movieId: number;
}

export function BookmarkButton({ movieId }: BookmarkButtonProps) {
  const isBookmarked = useBookmarkStore((state) =>
    state.bookmarkedMovieIds.includes(movieId),
  );
  const toggleBookmark = useBookmarkStore((state) => state.toggleBookmark);

  return (
    <button
      type="button"
      className={cn(
        "absolute right-[10px] top-[10px] flex h-[34px] w-[34px] items-center justify-center rounded-[8px] border p-[7.5px_6px]",
        isBookmarked
          ? "border-[#2563EB] bg-[#2563EB]"
          : "border-white bg-[#17191E]",
      )}
      aria-pressed={isBookmarked}
      onClick={() => toggleBookmark(movieId)}
    >
      {isBookmarked ? (
        <img
          className="h-6 w-6 brightness-0 invert"
          src="/icons/bookmark.svg"
          alt="북마크 해제"
        />
      ) : (
        <img
          className="h-6 w-6 brightness-0 invert"
          src="/icons/bookmark-outline.svg"
          alt="북마크"
        />
      )}
    </button>
  );
}
