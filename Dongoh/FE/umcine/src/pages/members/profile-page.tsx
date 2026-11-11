import { Link } from "@tanstack/react-router";
import { useProfileStore } from "../../stores/profile-store";
import { useBookmarkStore } from "../../stores/bookmark-store";

export function ProfilePage() {
  const profile = useProfileStore((state) => state.profile);
  const hasUpdated = useProfileStore((state) => state.hasUpdated);
  const bookmarkCount = useBookmarkStore((state) => state.bookmarkedMovieIds.length);

  return (
    <main className="grid min-h-[calc(100svh_-_88px)] place-items-center bg-[#f6f7f9] px-5 py-16">
      <section className="w-full max-w-[560px]" aria-labelledby="profile-title">
        <div className="mb-7 flex items-center justify-between gap-4">
          <h1 id="profile-title" className="text-[32px] font-extrabold tracking-tight text-gray-900">내 정보</h1>
          <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600">미리보기</span>
        </div>
        {hasUpdated && <p className="mb-5 text-sm text-green-700" role="status">프로필을 수정했어요.</p>}
        <div className="rounded-xl border border-gray-200 bg-white p-6 sm:p-8">
          <div className="mb-7 flex items-center gap-4">
            <div className="grid size-16 shrink-0 place-items-center rounded-full bg-indigo-50 text-2xl font-bold text-indigo-600" aria-hidden="true">{profile.nickname.slice(0, 1)}</div>
            <div className="min-w-0">
              <h2 className="break-words text-xl font-bold text-gray-900">{profile.nickname}</h2>
              <p className="mt-1 text-sm text-gray-500">나의 영화 기록</p>
            </div>
          </div>
          <dl className="space-y-5 text-sm">
            <div><dt className="mb-1.5 font-semibold text-gray-500">이메일</dt><dd className="break-all text-gray-900">{profile.email}</dd></div>
            <div><dt className="mb-1.5 font-semibold text-gray-500">닉네임</dt><dd className="break-words text-gray-900">{profile.nickname}</dd></div>
            <div><dt className="mb-1.5 font-semibold text-gray-500">소개</dt><dd className="whitespace-pre-wrap break-words leading-6 text-gray-900">{profile.bio || "아직 소개가 없어요."}</dd></div>
            <div><dt className="mb-1.5 font-semibold text-gray-500">북마크한 영화</dt><dd className="font-bold text-indigo-600">{bookmarkCount}편</dd></div>
          </dl>
          <Link to="/profile-edit" className="mt-8 block rounded-md bg-[#4b60e8] px-4 py-3 text-center text-sm font-bold text-white hover:bg-[#3d50d4]">내 정보 수정</Link>
        </div>
      </section>
    </main>
  );
}
