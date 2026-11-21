import { useState, type ChangeEvent, type SubmitEvent } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { useProfileStore } from "../../stores/profile-store";

export function ProfileEditPage() {
  const profile = useProfileStore((state) => state.profile);
  const updateProfile = useProfileStore((state) => state.updateProfile);
  const [draft, setDraft] = useState(() => ({ ...profile }));
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleSave(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    if (draft.nickname.trim().length < 2 || draft.nickname.trim().length > 12 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(draft.email.trim())) {
      setError("닉네임은 2~12자, 이메일은 올바른 형식으로 입력해 주세요.");
      return;
    }
    updateProfile({ ...draft, nickname: draft.nickname.trim(), email: draft.email.trim() });
    navigate({ to: "/mypage" });
  }

  function handlePhoto(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/") || file.size > 5 * 1024 * 1024) {
      setError("5MB 이하의 이미지 파일을 선택해 주세요.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        const avatar = reader.result;
        setDraft((current) => ({ ...current, avatar }));
        setError("");
      }
    };
    reader.onerror = () => setError("사진을 읽지 못했어요. 다시 선택해 주세요.");
    reader.readAsDataURL(file);
  }

  return (
    <main className="flex-1 bg-[#f6f7f9]">
      <form className="mx-auto flex min-h-[calc(100vh-133px)] w-[min(1170px,calc(100%-32px))] flex-col pt-7 pb-6 min-[721px]:w-[min(1170px,calc(100%-48px))]" onSubmit={handleSave} noValidate>
        <div className="flex items-start justify-between gap-4">
          <div><h1 className="m-0 text-[28px] font-bold tracking-tight">내 정보 수정</h1><p className="mt-2 text-xs text-[#8b95a5]">닉네임과 이메일, 프로필 사진을 변경할 수 있어요.</p></div>
          <button className="shrink-0 cursor-pointer rounded-md border-0 bg-[#2463eb] px-4 py-2.5 text-xs font-bold text-white" type="submit">변경사항 저장</button>
        </div>
        <div className="mt-10 grid gap-10 min-[721px]:grid-cols-[1fr_2fr] min-[721px]:gap-20">
          <div className="flex flex-col items-center">
            <label className="relative cursor-pointer" htmlFor="profile-photo">
              <span className="grid size-[88px] place-items-center overflow-hidden rounded-full bg-[#e4e7eb]"><img className={draft.avatar ? "size-full object-cover" : "size-10"} src={draft.avatar || "/icons/person.svg"} alt="프로필 사진 미리보기" /></span>
              <span className="absolute right-0 bottom-0 grid size-6 place-items-center rounded-full border border-[#555d6c] bg-white"><img className="size-3" src="/icons/edit.svg" alt="사진 변경" /></span>
            </label>
            <input className="mt-3 w-full max-w-[230px] text-xs text-[#727b8b] file:mr-2 file:rounded file:border file:border-[#d9dee7] file:bg-white file:px-2 file:py-1" id="profile-photo" type="file" accept="image/*" onChange={handlePhoto} />
            <p className="mt-2 text-[11px] text-[#8b95a5]">프로필 이미지 · 최대 5MB</p>
          </div>
          <div className="grid content-start gap-5">
            <div><label className="mb-2 block text-sm font-semibold" htmlFor="profile-nickname">닉네임</label><input className="h-11 w-full rounded-md border border-[#e5e7eb] bg-white px-3 text-sm outline-blue-500" id="profile-nickname" autoComplete="nickname" value={draft.nickname} onChange={(event) => setDraft((current) => ({ ...current, nickname: event.target.value }))} /></div>
            <div><label className="mb-2 block text-sm font-semibold" htmlFor="profile-email">이메일</label><input className="h-11 w-full rounded-md border border-[#e5e7eb] bg-white px-3 text-sm outline-blue-500" id="profile-email" type="email" autoComplete="email" value={draft.email} onChange={(event) => setDraft((current) => ({ ...current, email: event.target.value }))} /></div>
            {error && <p className="m-0 text-xs text-red-600" role="alert">{error}</p>}
            <Link className="w-fit text-xs text-[#727b8b] underline" to="/mypage">취소하고 돌아가기</Link>
          </div>
        </div>
        <div className="mt-auto pt-20">
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-lg border border-red-300 bg-red-50 p-4 text-red-600"><div><h2 className="m-0 text-sm font-semibold">회원 탈퇴</h2><p className="mt-1 mb-0 text-xs">회원 탈퇴는 계정 API 연결 후 이용할 수 있어요.</p></div><button className="rounded-md border border-red-200 bg-white px-3 py-2 text-xs opacity-60" type="button" disabled>회원 탈퇴</button></div>
        </div>
      </form>
    </main>
  );
}
