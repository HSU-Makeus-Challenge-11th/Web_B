import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import type { MemberInfo } from "../../api/members/me";
import { getRequestError } from "../../api/response";
import { useMeQuery } from "../../hooks/use-me-query";
import { useUpdateMeMutation } from "../../hooks/use-update-me-mutation";
import "../auth/signup-page.css";

export function ProfileEditPage() {
  const { data } = useMeQuery();
  return data ? <ProfileEditForm key={data.email} member={data} /> : null;
}

function ProfileEditForm({ member }: { member: MemberInfo }) {
  const [nickname, setNickname] = useState(member.nickname);
  const updateMeMutation = useUpdateMeMutation();
  const navigate = useNavigate();
  const trimmedNickname = nickname.trim();
  const canSubmit =
    trimmedNickname.length >= 2 &&
    trimmedNickname.length <= 12 &&
    trimmedNickname !== member.nickname;

  return (
    <main className="signup-page">
      <section className="signup-panel" aria-labelledby="profile-edit-title">
        <h1 id="profile-edit-title">내 정보 수정</h1>
        <form
          className="signup-form"
          noValidate
          onSubmit={(event) => {
            event.preventDefault();
            if (!canSubmit || updateMeMutation.isPending) return;
            updateMeMutation.mutate(
              { nickname: trimmedNickname },
              { onSuccess: () => void navigate({ to: "/profile" }) },
            );
          }}
        >
          <fieldset disabled={updateMeMutation.isPending} className="contents">
            <div className="signup-field">
              <label htmlFor="profile-email">이메일</label>
              <div className="signup-input-row">
                <input id="profile-email" type="email" value={member.email} readOnly />
              </div>
            </div>
            <div className="signup-field">
              <label htmlFor="profile-nickname">닉네임</label>
              <div className={`signup-input-row${nickname.length > 0 && !canSubmit && trimmedNickname !== member.nickname ? " signup-input-row--error" : ""}`}>
                <input
                  id="profile-nickname"
                  type="text"
                  autoComplete="nickname"
                  value={nickname}
                  required
                  onChange={(event) => {
                    setNickname(event.target.value);
                    updateMeMutation.reset();
                  }}
                />
              </div>
              {(trimmedNickname.length < 2 || trimmedNickname.length > 12) && (
                <p className="signup-field__error" role="status">닉네임은 2~12자로 입력해 주세요.</p>
              )}
            </div>
            <button className="signup-submit-button" type="submit" disabled={!canSubmit}>
              {updateMeMutation.isPending ? "저장 중" : "저장"}
            </button>
            {updateMeMutation.isError && (
              <p className="text-sm text-red-600" role="alert">{getRequestError(updateMeMutation.error)}</p>
            )}
            <Link to="/profile" className="text-center text-sm font-semibold text-gray-500">취소</Link>
          </fieldset>
        </form>
      </section>
    </main>
  );
}
