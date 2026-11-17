import { useBookmarkStore } from "../../stores/bookmark-store";
import { cn } from "../../utils/cn";
import { Icon } from "../common/icon";

interface BookmarkButtonProps {
  movieId: number;
  movieTitle: string;
  /** overlay: 포스터 위 아이콘 버튼, detail: 상세 화면의 즐겨찾기 버튼 */
  variant: "overlay" | "detail";
  className?: string;
}

export function BookmarkButton({ movieId, movieTitle, variant, className }: BookmarkButtonProps) {
  const isBookmarked = useBookmarkStore((state) => state.bookmarkedMovieIds.includes(movieId));
  const toggleBookmark = useBookmarkStore((state) => state.toggleBookmark);
  const iconName = isBookmarked ? "bookmark" : "bookmark-outline";

  if (variant === "detail") {
    return (
      <button
        type="button"
        aria-pressed={isBookmarked}
        onClick={() => toggleBookmark(movieId)}
        className={cn(
          "flex h-10 items-center gap-1.5 rounded-lg px-4 text-sm font-semibold text-white",
          isBookmarked ? "bg-action-pressed hover:bg-action-hover" : "bg-action hover:bg-action-hover",
          className,
        )}
      >
        <Icon name={iconName} className="size-[18px]" />
        {isBookmarked ? "즐겨찾기 해제" : "즐겨찾기"}
      </button>
    );
  }

  return (
    <button
      type="button"
      aria-label={isBookmarked ? `${movieTitle} 북마크 해제` : `${movieTitle} 북마크`}
      aria-pressed={isBookmarked}
      onClick={() => toggleBookmark(movieId)}
      className={cn(
        "flex size-8 items-center justify-center rounded-lg border-[1.5px] text-white transition-colors",
        isBookmarked
          ? "border-action bg-action hover:border-action-hover hover:bg-action-hover"
          : "border-white/90 bg-fg/60 hover:bg-fg/80",
        className,
      )}
    >
      <Icon name={iconName} />
    </button>
  );
}
