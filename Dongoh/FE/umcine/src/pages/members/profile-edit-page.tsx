import { useState, type SubmitEvent } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { useProfileStore } from "../../stores/profile-store";
import "../auth/signup-page.css";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ProfileEditPage() {
  const profile = useProfileStore((state) => state.profile);
  const updateProfile = useProfileStore((state) => state.updateProfile);
  const [form, setForm] = useState(profile);
  const navigate = useNavigate();
  const isEmailValid = EMAIL_REGEX.test(form.email.trim());
  const isNicknameValid = form.nickname.trim().length >= 2 && form.nickname.trim().length <= 12;
  const canSave = isEmailValid && isNicknameValid && form.bio.length <= 200;

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canSave) return;
    updateProfile({ email: form.email.trim(), nickname: form.nickname.trim(), bio: form.bio.trim() });
    navigate({ to: "/profile" });
  }

  return (
    <main className="signup-page">
      <section className="signup-panel" aria-labelledby="profile-edit-title">
        <h1 id="profile-edit-title">내 정보 수정</h1>
        <form className="signup-form" onSubmit={handleSubmit} noValidate>
          <div className="signup-field">
            <label htmlFor="profile-email">이메일</label>
            <div className={`signup-input-row${!isEmailValid ? " signup-input-row--error" : ""}`}>
              <input id="profile-email" type="email" autoComplete="email" value={form.email} required aria-invalid={!isEmailValid}
                aria-describedby={!isEmailValid ? "profile-email-error" : undefined}
                onChange={(event) => setForm({ ...form, email: event.target.value })} />
            </div>
            {!isEmailValid && <p id="profile-email-error" className="signup-field__error" role="status">올바른 이메일 형식으로 입력해 주세요.</p>}
          </div>
          <div className="signup-field">
            <label htmlFor="profile-nickname">닉네임</label>
            <div className={`signup-input-row${!isNicknameValid ? " signup-input-row--error" : ""}`}>
              <input id="profile-nickname" type="text" autoComplete="nickname" value={form.nickname} required aria-invalid={!isNicknameValid}
                aria-describedby={!isNicknameValid ? "profile-nickname-error" : undefined}
                onChange={(event) => setForm({ ...form, nickname: event.target.value })} />
            </div>
            {!isNicknameValid && <p id="profile-nickname-error" className="signup-field__error" role="status">닉네임은 2~12자로 입력해 주세요.</p>}
          </div>
          <div className="signup-field">
            <label htmlFor="profile-bio">소개 <span className="font-normal text-gray-400">(선택)</span></label>
            <textarea id="profile-bio" maxLength={200} rows={4} value={form.bio}
              onChange={(event) => setForm({ ...form, bio: event.target.value })}
              className="w-full resize-y rounded-md border border-gray-200 bg-white p-4 text-sm outline-indigo-500" />
            <p className="mt-1 text-right text-xs text-gray-400">{form.bio.length}/200</p>
          </div>
          <button className="signup-submit-button" type="submit" disabled={!canSave}>수정 완료</button>
          <Link to="/profile" className="text-center text-sm font-semibold text-gray-500">취소</Link>
        </form>
      </section>
    </main>
  );
}
