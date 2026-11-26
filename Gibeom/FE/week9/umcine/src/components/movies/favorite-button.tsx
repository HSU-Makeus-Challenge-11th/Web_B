"use client";

import Image from "next/image";
import { useFavoriteStatusQuery, useToggleFavorite } from "../../hooks/use-favorites";
import { cn } from "../../utils/cn";

interface FavoriteButtonProps {
  movieId: number;
  title: string;
}

// 즐겨찾기 여부는 로그인한 사용자마다 달라 서버에서 미리 그릴 수 없으므로 Client Component로 분리
export function FavoriteButton({ movieId, title }: FavoriteButtonProps) {
  const favoriteStatusQuery = useFavoriteStatusQuery(movieId);
  const isBookmarked = favoriteStatusQuery.data ?? false;
  const { toggleFavorite, pendingMovieId } = useToggleFavorite();
  const isFavoritePending = pendingMovieId === movieId;

  return (
    <button
      className={cn(
        "mt-5 inline-flex h-[38px] cursor-pointer items-center gap-[7px] rounded-md border-0 px-3.5 text-[13px] font-bold text-white hover:brightness-95 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-blue-500/40 disabled:cursor-not-allowed disabled:opacity-60",
        isBookmarked ? "bg-[#174fc6]" : "bg-[#2463eb]",
      )}
      type="button"
      aria-label={`${title} ${isBookmarked ? "북마크 해제" : "북마크 추가"}`}
      aria-pressed={isBookmarked}
      disabled={isFavoritePending || favoriteStatusQuery.isLoading}
      onClick={() => toggleFavorite(movieId, isBookmarked)}
    >
      <Image
        className="size-[18px] invert"
        src={isBookmarked ? "/icons/bookmark.svg" : "/icons/bookmark-outline.svg"}
        alt="" width={18} height={18} />
      {isBookmarked ? "북마크 해제" : "즐겨찾기"}
    </button>
  );
}
