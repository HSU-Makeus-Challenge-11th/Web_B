"use client";

import Link from "next/link";
import { useQueries } from "@tanstack/react-query";
import { getMovieDetail } from "../../api/movies/get-movie-detail";
import { MovieGrid } from "../../components/movies/movie-grid";
import { useFavoritesQuery, useToggleFavorite } from "../../hooks/use-favorites";
import { useMeQuery } from "../../hooks/use-me-query";
import { useProfileStore } from "../../stores/profile-store";

export function ProfilePage() {
  const meQuery = useMeQuery();
  // 프로필 사진은 API가 없어 브라우저에만 저장
  const avatar = useProfileStore((state) => state.profile.avatar);
  // GET /favorites는 movieId만 주므로 화면에 필요한 영화 정보는 TMDB 상세 캐시로 채움
  const favoritesQuery = useFavoritesQuery();
  const ids = favoritesQuery.data?.map((favorite) => favorite.movieId) ?? [];
  const { toggleFavorite } = useToggleFavorite();
  const queries = useQueries({ queries: ids.map((id) => ({
    queryKey: ["movies", "detail", id],
    queryFn: () => getMovieDetail(id),
    staleTime: 30 * 1000,
  })) });
  const movies = queries.flatMap((query) => query.data ? [{ ...query.data, genre_ids: query.data.genres.map((genre) => genre.id) }] : []);

  return (
    <main className="flex-1 bg-[#f6f7f9]">
      <section className="mx-auto w-[min(1170px,calc(100%-32px))] pt-7 pb-20 min-[721px]:w-[min(1170px,calc(100%-48px))]" aria-labelledby="profile-title">
        <div className="mb-7 flex items-center justify-between gap-4">
          <h1 className="m-0 text-[28px] font-bold tracking-tight" id="profile-title">내 정보</h1>
          <Link className="rounded-md bg-[#2463eb] px-4 py-2.5 text-xs font-bold text-white no-underline" href="/mypage/edit">정보 수정</Link>
        </div>
        <h2 className="mb-4 text-base font-bold">기본 정보</h2>
        <div className="flex flex-wrap items-center gap-6 border-b border-[#e5e7eb] pb-6">
          <div className="grid size-[72px] shrink-0 place-items-center overflow-hidden rounded-full bg-[#e4e7eb]">
            <img className={avatar ? "size-full object-cover" : "size-8"} src={avatar || "/icons/person.svg"} alt="프로필 사진" />
          </div>
          {meQuery.isPending ? (
            <p className="m-0 text-sm text-[#8b95a5]">내 정보를 불러오는 중이에요.</p>
          ) : meQuery.isError ? (
            <p className="m-0 text-sm text-red-600" role="alert">내 정보를 불러오지 못했어요.</p>
          ) : (
            <dl className="m-0 flex flex-1 flex-wrap gap-x-24 gap-y-4 text-sm">
              <div><dt className="mb-1 text-xs text-[#8b95a5]">닉네임</dt><dd className="m-0 font-semibold">{meQuery.data.nickname}</dd></div>
              <div><dt className="mb-1 text-xs text-[#8b95a5]">이메일</dt><dd className="m-0 break-all font-semibold">{meQuery.data.email}</dd></div>
            </dl>
          )}
        </div>
        <h2 className="mt-6 mb-4 text-base font-bold">내 즐겨찾기</h2>
        {favoritesQuery.isPending ? <p className="py-14 text-center text-sm text-[#8b95a5]">즐겨찾기를 불러오는 중이에요.</p> : favoritesQuery.isError ? <p className="py-14 text-center text-sm text-red-600" role="alert">즐겨찾기를 불러오지 못했어요. <button className="cursor-pointer underline" type="button" onClick={() => void favoritesQuery.refetch()}>다시 시도</button></p> : ids.length === 0 ? <p className="py-14 text-center text-sm text-[#8b95a5]">아직 즐겨찾기한 영화가 없어요. 영화 목록에서 북마크를 추가해 보세요.</p> : queries.some((query) => query.isPending) ? <p className="py-14 text-center text-sm text-[#8b95a5]">즐겨찾기를 불러오는 중이에요.</p> : <>
          {queries.some((query) => query.isError) && <p className="text-sm text-red-600" role="alert">일부 영화를 불러오지 못했어요. <button className="cursor-pointer underline" type="button" onClick={() => queries.filter((query) => query.isError).forEach((query) => { void query.refetch(); })}>다시 시도</button></p>}
          <MovieGrid movies={movies} bookmarkedMovieIds={ids} onToggleBookmark={(movieId) => toggleFavorite(movieId, true)} />
        </>}
      </section>
    </main>
  );
}
