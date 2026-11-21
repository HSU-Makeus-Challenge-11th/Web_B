import { useState, type SubmitEvent } from "react";
import { Link } from "@tanstack/react-router";
import { useLoginMutation } from "../../hooks/use-login-mutation";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const loginMutation = useLoginMutation();
  const canSubmit = EMAIL_REGEX.test(form.email.trim()) && form.password.length > 0;

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!canSubmit || loginMutation.isPending) return;

    loginMutation.mutate({
      email: form.email.trim(),
      password: form.password,
    });
  };

  return (
    <main className="grid flex-1 place-items-center bg-[#f6f7f9] px-6 py-20">
      <section className="w-full max-w-[400px]" aria-labelledby="login-title">
        <h1 className="mt-0 mb-6 text-[28px] font-bold tracking-tight" id="login-title">로그인</h1>
        <form className="grid gap-4" onSubmit={handleSubmit} noValidate>
          <div>
            <label className="mb-2 block text-sm font-semibold" htmlFor="login-email">이메일</label>
            <div className="flex h-11 items-center gap-2 rounded-md border border-[#e5e7eb] bg-white px-3 focus-within:border-blue-500">
              <img className="size-4 opacity-50" src="/icons/mail.svg" alt="" />
              <input className="min-w-0 flex-1 border-0 bg-transparent text-sm outline-none" id="login-email" type="email" autoComplete="email" placeholder="movie@example.com" value={form.email} onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))} required />
            </div>
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold" htmlFor="login-password">비밀번호</label>
            <div className="flex h-11 items-center gap-2 rounded-md border border-[#e5e7eb] bg-white px-3 focus-within:border-blue-500">
              <img className="size-4 opacity-50" src="/icons/lock.svg" alt="" />
              <input className="min-w-0 flex-1 border-0 bg-transparent text-sm outline-none" id="login-password" type="password" autoComplete="current-password" placeholder="비밀번호" value={form.password} onChange={(event) => setForm((prev) => ({ ...prev, password: event.target.value }))} required />
            </div>
          </div>
          <button className="h-11 cursor-pointer rounded-md border-0 bg-[#2463eb] text-sm font-bold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-40" type="submit" disabled={!canSubmit || loginMutation.isPending}>{loginMutation.isPending ? "로그인 중" : "로그인"}</button>
        </form>
        <p className="mt-5 text-center text-xs text-[#8b95a5]">계정이 없으신가요? <Link className="ml-1 font-semibold text-[#2463eb] no-underline" to="/signup">회원가입</Link></p>
      </section>
    </main>
  );
}
