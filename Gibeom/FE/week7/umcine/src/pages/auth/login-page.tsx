import { useState, type SubmitEvent } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { useProfileStore } from "../../stores/profile-store";

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const startPreview = useProfileStore((state) => state.startPreview);
  const navigate = useNavigate();

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) || !password) {
      setError("올바른 이메일과 비밀번호를 입력해 주세요.");
      return;
    }
    startPreview(email.trim());
    setPassword("");
    navigate({ to: "/mypage" });
  }

  return (
    <main className="grid flex-1 place-items-center bg-[#f6f7f9] px-6 py-20">
      <section className="w-full max-w-[400px]" aria-labelledby="login-title">
        <h1 className="mt-0 mb-6 text-[28px] font-bold tracking-tight" id="login-title">로그인</h1>
        <form className="grid gap-4" onSubmit={handleSubmit} noValidate>
          <div>
            <label className="mb-2 block text-sm font-semibold" htmlFor="login-email">이메일</label>
            <div className="flex h-11 items-center gap-2 rounded-md border border-[#e5e7eb] bg-white px-3 focus-within:border-blue-500">
              <img className="size-4 opacity-50" src="/icons/mail.svg" alt="" />
              <input className="min-w-0 flex-1 border-0 bg-transparent text-sm outline-none" id="login-email" type="email" autoComplete="email" placeholder="movie@example.com" value={email} onChange={(event) => { setEmail(event.target.value); setError(""); }} required />
            </div>
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold" htmlFor="login-password">비밀번호</label>
            <div className="flex h-11 items-center gap-2 rounded-md border border-[#e5e7eb] bg-white px-3 focus-within:border-blue-500">
              <img className="size-4 opacity-50" src="/icons/lock.svg" alt="" />
              <input className="min-w-0 flex-1 border-0 bg-transparent text-sm outline-none" id="login-password" type="password" autoComplete="current-password" placeholder="비밀번호" value={password} onChange={(event) => { setPassword(event.target.value); setError(""); }} required />
            </div>
          </div>
          {error && <p className="m-0 text-xs text-red-600" role="alert">{error}</p>}
          <button className="h-11 cursor-pointer rounded-md border-0 bg-[#2463eb] text-sm font-bold text-white hover:bg-blue-700" type="submit">로그인</button>
        </form>
        <p className="mt-5 text-center text-xs text-[#8b95a5]">계정이 없으신가요? <Link className="ml-1 font-semibold text-[#2463eb] no-underline" to="/signup">회원가입</Link></p>
        <p className="mt-6 text-center text-[11px] text-[#8b95a5]">화면 실습용입니다. 실제 계정 인증은 진행하지 않습니다.</p>
      </section>
    </main>
  );
}
