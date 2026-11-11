import { useState, type SubmitEvent } from "react";
import { Link } from "@tanstack/react-router";
import "./signup-page.css";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [hasCheckedForm, setHasCheckedForm] = useState(false);
  const isEmailValid = EMAIL_REGEX.test(form.email.trim());
  const showEmailError = form.email.length > 0 && !isEmailValid;
  const canSubmit = isEmailValid && form.password.length > 0;

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canSubmit) return;
    setHasCheckedForm(true);
    // 워크북에 따라 실제 로그인 API와 토큰 처리는 8주차에서 연결합니다.
  }

  return (
    <main className="signup-page">
      <section className="signup-panel" aria-labelledby="login-title">
        <h1 id="login-title">로그인</h1>
        <p className="mb-6 text-sm leading-6 text-gray-500">UMCine에서 나만의 영화 취향을 기록해 보세요.</p>
        <form className="signup-form" onSubmit={handleSubmit} noValidate>
          <div className="signup-field">
            <label htmlFor="login-email">이메일</label>
            <div className={`signup-input-row${showEmailError ? " signup-input-row--error" : ""}`}>
              <input id="login-email" name="email" type="email" autoComplete="email" placeholder="name@example.com"
                value={form.email} required aria-invalid={showEmailError}
                aria-describedby={showEmailError ? "login-email-error" : undefined}
                onChange={(event) => { setForm({ ...form, email: event.target.value }); setHasCheckedForm(false); }} />
            </div>
            {showEmailError && <p id="login-email-error" className="signup-field__error" role="status">올바른 이메일 형식으로 입력해 주세요.</p>}
          </div>
          <div className="signup-field">
            <label htmlFor="login-password">비밀번호</label>
            <div className="signup-input-row">
              <input id="login-password" name="password" type="password" autoComplete="current-password" placeholder="비밀번호 입력"
                value={form.password} required
                onChange={(event) => { setForm({ ...form, password: event.target.value }); setHasCheckedForm(false); }} />
            </div>
          </div>
          <button className="signup-submit-button" type="submit" disabled={!canSubmit}>로그인</button>
          {hasCheckedForm && <p className="text-sm text-green-700" role="status">입력한 정보를 확인했어요.</p>}
        </form>
        <p className="signup-panel__login">아직 계정이 없나요? <Link to="/signup" className="font-bold text-[#4b60e8]">회원가입</Link></p>
      </section>
    </main>
  );
}
