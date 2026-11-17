import { useEffect, useRef, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { checkNicknameDuplicate } from "../../api/members/check-nickname-duplicate";
import { getMyInfo } from "../../api/members/my-page";
import { updatePage } from "../../api/members/update-page";
import { useNavigate } from "@tanstack/react-router";
import { HTTPError } from "ky";

type NicknameCheckState = "idle" | "checking" | "confirmed";

export function UpdatePage() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const [isSaving, setIsSaving] = useState(false);
  const [currentNickname, setCurrentNickname] = useState("");
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [nicknameCheck, setNicknameCheck] =
    useState<NicknameCheckState>("idle");

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function loadMember() {
      try {
        const response = await getMyInfo();

        if (cancelled) return;

        setCurrentNickname(response.result.nickname);
        setNickname(response.result.nickname);
        setEmail(response.result.email);
        setNicknameCheck("idle");
        setLoadError(false);
      } catch {
        if (!cancelled) {
          setLoadError(true);
        }
      }
    }

    void loadMember();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!selectedImage) {
      setPreviewUrl(null);
      return;
    }

    const url = URL.createObjectURL(selectedImage);
    setPreviewUrl(url);

    return () => URL.revokeObjectURL(url);
  }, [selectedImage]);

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("이미지 파일만 선택할 수 있습니다.");
      event.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("이미지 크기는 5MB 이하여야 합니다.");
      event.target.value = "";
      return;
    }

    setSelectedImage(file);
  };

  const handleNicknameCheck = async () => {
    const value = nickname.trim();

    if (value.length < 2 || value.length > 12) {
      alert("닉네임은 2자 이상 12자 이하로 입력해 주세요.");
      return;
    }

    if (value === currentNickname) {
      setNicknameCheck("confirmed");
      alert("현재 사용 중인 닉네임입니다.");
      return;
    }

    setNicknameCheck("checking");

    try {
      const response = await checkNicknameDuplicate(value);

      if (response.available) {
        setNicknameCheck("confirmed");
        alert("사용 가능한 닉네임입니다.");
      } else {
        setNicknameCheck("idle");
        alert("이미 사용 중인 닉네임입니다.");
      }
    } catch {
      setNicknameCheck("idle");
      alert("중복 확인에 실패했어요. 다시 시도해 주세요.");
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const value = nickname.trim();

    if (!value && !selectedImage) {
      alert("변경할 닉네임이나 프로필 이미지를 선택해 주세요.");
      return;
    }

    if (value && nicknameCheck !== "confirmed") {
      alert("닉네임 중복 확인을 먼저 해 주세요.");
      return;
    }

    alert("변경사항 저장은 PATCH API 연결 후 동작합니다.");
  };

  const handleSave = async () => {
    const newNickname = nickname.trim();

    if (isSaving) return;

    if (newNickname.length < 2 || newNickname.length > 12) {
      alert("닉네임은 2~12자로 입력해 주세요.");
      return;
    }

    if (newNickname === currentNickname) {
      alert("변경된 닉네임이 없습니다.");
      return;
    }

    if (nicknameCheck !== "confirmed") {
      alert("닉네임 중복 확인을 먼저 해주세요.");
      return;
    }

    setIsSaving(true);

    try {
      await updatePage({
        nickname: newNickname,
      });

      alert("회원 정보가 수정되었습니다.");
      navigate({ to: "/mypage" });
    } catch (error) {
      console.error("회원정보 수정 오류:", error);

      if (error instanceof HTTPError) {
        const status = error.response.status;

        if (status === 401) {
          alert("로그인 인증이 필요합니다. 다시 로그인해 주세요.");
          return;
        }

        alert(`회원정보 수정에 실패했습니다. (${status})`);
        return;
      }

      alert("회원정보 수정 중 오류가 발생했습니다.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <main
      className="min-h-[calc(100vh-148px)] w-full bg-[#F6F7F9] font-['Pretendard'] text-[#17191E]"
      style={{ fontFamily: "'Pretendard', sans-serif" }}
    >
      <div className="mx-auto flex min-h-[calc(100vh-148px)] w-full max-w-[1440px] flex-col px-5 pb-6 pt-6 sm:px-8 lg:px-20">
        <form
          onSubmit={handleSubmit}
          className="flex w-full flex-1 flex-col gap-8"
        >
          <div className="flex w-full items-start justify-between gap-4">
            <div className="flex flex-col gap-[9px]">
              <h1 className="text-[31px] font-bold leading-none tracking-[-1.24px]">
                내 정보 수정
              </h1>

              <p className="text-[14px] font-normal leading-[22.4px] text-[#606774]">
                닉네임과 프로필 이미지만 변경할 수 있어요.
              </p>
            </div>

            <button
              type="button"
              onClick={handleSave}
              disabled={isSaving}
              className="h-[42px] rounded-[8px] bg-[#2563EB] px-[16px] text-[14px] font-extrabold text-white disabled:opacity-50"
            >
              {isSaving ? "저장 중..." : "변경사항 저장"}
            </button>
          </div>

          <section className="grid w-full grid-cols-1 gap-6 border-b border-transparent md:grid-cols-2 md:gap-0">
            <div className="flex min-h-[133px] w-full flex-col items-center justify-start gap-1">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="relative flex h-[82px] w-[82px] items-center justify-center rounded-full bg-[#E3E6EB]"
                aria-label="프로필 이미지 선택"
              >
                {previewUrl ? (
                  <img
                    src={previewUrl}
                    alt="프로필 이미지 미리보기"
                    className="h-full w-full rounded-full object-cover"
                  />
                ) : (
                  <img
                    src="/icons/person.svg"
                    alt=""
                    className="h-12 w-12 object-contain"
                  />
                )}

                <span className="absolute bottom-0 right-0 flex h-[24px] w-[24px] items-center justify-center rounded-full border-2 border-[#17191E] bg-[#F6F7F9]">
                  <img src="/icons/edit.svg" alt="" className="h-4 w-4" />
                </span>
              </button>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />

              <span className="text-[15px] font-bold leading-none">
                프로필 이미지
              </span>

              <span className="text-[11px] font-normal text-[#969DA8]">
                선택 사항 · 최대 5MB
              </span>
            </div>

            <div className="flex w-full min-w-0 flex-col gap-[17px]">
              <div className="flex w-full flex-col gap-2">
                <label
                  htmlFor="profile-nickname"
                  className="text-[13px] font-extrabold leading-4"
                >
                  닉네임
                </label>

                <div className="flex min-h-[48px] w-full items-center gap-2 rounded-[8px] border border-[#E3E6EB] bg-white px-[13px]">
                  <input
                    id="profile-nickname"
                    type="text"
                    value={nickname}
                    onChange={(e) => {
                      setNickname(e.target.value);
                      setNicknameCheck("idle");
                    }}
                    placeholder="닉네임을 입력해 주세요"
                    maxLength={12}
                    className="min-w-0 flex-1 bg-transparent text-[14px] font-normal text-[#17191E] outline-none placeholder:text-[#969DA8]"
                  />

                  <button
                    type="button"
                    onClick={handleNicknameCheck}
                    disabled={nicknameCheck === "checking"}
                    className="shrink-0 text-[12px] font-extrabold text-[#2563EB] disabled:opacity-50"
                  >
                    {nicknameCheck === "confirmed" &&
                    nickname.trim() !== currentNickname
                      ? "확인 완료"
                      : "중복 확인"}
                  </button>
                </div>
              </div>

              <div className="flex w-full flex-col gap-2">
                <label
                  htmlFor="profile-email"
                  className="text-[13px] font-extrabold leading-4"
                >
                  이메일
                </label>

                <div className="flex min-h-[48px] w-full items-center rounded-[8px] border border-[#E3E6EB] bg-white px-[13px]">
                  <input
                    id="profile-email"
                    type="email"
                    value={email}
                    readOnly
                    placeholder="이메일을 불러오는 중..."
                    className="w-full min-w-0 bg-transparent text-[14px] font-normal text-[#17191E] outline-none"
                  />
                </div>

                {loadError && (
                  <p className="text-[12px] text-[#D92D20]">
                    회원정보를 불러오지 못했습니다.
                  </p>
                )}
              </div>
            </div>
          </section>

          <section className="mt-auto flex w-full flex-wrap items-center justify-between gap-4 rounded-[10px] border border-[#D92D20] bg-[#F7E7E8] p-5">
            <div className="flex min-w-0 flex-1 flex-col gap-1">
              <h3 className="text-[14px] font-bold leading-[17px] text-[#D92D20]">
                회원 탈퇴
              </h3>

              <p className="text-[11px] font-normal leading-[16.5px] text-[#D92D20]">
                탈퇴하면 작성한 평점, 후기와 즐겨찾기가 모두 삭제되며 복구할 수
                없습니다.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setDeleteDialogOpen(true)}
              className="h-[42px] shrink-0 rounded-[8px] border border-[#D92D20] bg-white px-4 text-[14px] font-extrabold text-[#D92D20]"
            >
              회원 탈퇴
            </button>
          </section>
        </form>
      </div>

      {deleteDialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-5">
          <div className="w-full max-w-[420px] rounded-xl bg-white p-6 shadow-xl">
            <h2 className="text-[20px] font-bold text-[#17191E]">
              정말 탈퇴하시겠어요?
            </h2>

            <p className="mt-3 text-[14px] leading-6 text-[#606774]">
              탈퇴하면 작성한 평점, 후기와 즐겨찾기가 모두 삭제되며 복구할 수
              없습니다.
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setDeleteDialogOpen(false)}
                className="h-[42px] rounded-lg border border-[#E3E6EB] px-4 text-[14px] font-semibold"
              >
                취소
              </button>

              <button
                type="button"
                disabled
                className="h-[42px] rounded-lg bg-[#D92D20] px-4 text-[14px] font-bold text-white disabled:opacity-50"
              >
                회원 탈퇴
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
