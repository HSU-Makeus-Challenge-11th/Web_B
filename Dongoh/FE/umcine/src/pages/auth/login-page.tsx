import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { useLoginMutation } from "@/hooks/use-login-mutation";
import "./signup-page.css";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const loginMutation = useLoginMutation();
  const isEmailValid = EMAIL_REGEX.test(form.email.trim());
  const showEmailError = form.email.length > 0 && !isEmailValid;
  const canSubmit = EMAIL_REGEX.test(form.email.trim()) && form.password.length > 0;

  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!canSubmit || loginMutation.isPending) return;

    loginMutation.mutate({
      email: form.email.trim(),
      password: form.password,
    });
  };

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
                onChange={(event) => { setForm({ ...form, email: event.target.value }); }} />
            </div>
            {showEmailError && <p id="login-email-error" className="signup-field__error" role="status">올바른 이메일 형식으로 입력해 주세요.</p>}
          </div>
          <div className="signup-field">
            <label htmlFor="login-password">비밀번호</label>
            <div className="signup-input-row">
              <input id="login-password" name="password" type="password" autoComplete="current-password" placeholder="비밀번호 입력"
                value={form.password} required
                onChange={(event) => { setForm({ ...form, password: event.target.value }); }} />
            </div>
          </div>
          <button className="signup-submit-button" type="submit" disabled={!canSubmit || loginMutation.isPending}>
            {loginMutation.isPending ? "로그인 중" : "로그인"}
          </button>
        </form>
        <p className="signup-panel__login">아직 계정이 없나요? <Link to="/signup" className="font-bold text-[#4b60e8]">회원가입</Link></p>
      </section>
    </main>
  );
}
