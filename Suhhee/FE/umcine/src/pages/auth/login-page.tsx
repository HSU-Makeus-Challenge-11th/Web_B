import { useState, type SubmitEvent } from "react";
import { Link } from "@tanstack/react-router";
import { useLoginMutation } from "../../hooks/use-personal";
import { getApiError } from "../../api/members";
import { FormField } from "../../components/auth/form-field";

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const loginMutation = useLoginMutation();
  async function submit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    if (loginMutation.isPending) return;
    setMessage("");
    try { await loginMutation.mutateAsync({ email: email.trim(), password }); }
    catch (error) { setMessage(getApiError(error)); }
  }
  return <main className="auth-page"><form className="auth-form login-form" onSubmit={submit}>
    <h1>로그인</h1>
    <FormField id="login-email" label="이메일" type="email" autoComplete="email" placeholder="✉  name@example.com" required
      value={email} onChange={event => { setEmail(event.target.value); setMessage(""); }} />
    <FormField id="login-password" label="비밀번호" type="password" autoComplete="current-password" placeholder="♙  비밀번호" required
      value={password} onChange={event => { setPassword(event.target.value); setMessage(""); }} />
    <button className="primary-button auth-submit" type="submit" disabled={!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) || !password || loginMutation.isPending}>{loginMutation.isPending ? "로그인 중" : "로그인"}</button>
    {message && <p role="status" className="field-hint">{message}</p>}
    <p className="auth-switch">처음이신가요? <Link to="/signup">회원가입</Link></p>
  </form></main>;
}
