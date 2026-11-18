import { useState, type SubmitEvent } from "react";
import { Link } from "@tanstack/react-router";
import { checkDuplicate, getApiError } from "../../api/members";
import { useSignupMutation } from "../../hooks/use-personal";
import { FormField } from "../../components/auth/form-field";

const EMPTY_FORM = { email: "", nickname: "", password: "", passwordConfirm: "" };
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
type Check = { pending: boolean; value: string; available: boolean; message: string };
const EMPTY_CHECK: Check = { pending: false, value: "", available: false, message: "" };

export function SignupPage() {
  const [form, setForm] = useState(EMPTY_FORM);
  const [checks, setChecks] = useState({ email: EMPTY_CHECK, nickname: EMPTY_CHECK });
  const signupMutation = useSignupMutation();
  const submitting = signupMutation.isPending;
  const [status, setStatus] = useState("");
  const [success, setSuccess] = useState(false);
  const valid = {
    email: EMAIL_REGEX.test(form.email.trim()),
    nickname: form.nickname.trim().length >= 2 && form.nickname.trim().length <= 12,
    password: PASSWORD_REGEX.test(form.password),
    passwordConfirm: form.passwordConfirm.length > 0 && form.password === form.passwordConfirm,
  };
  const canSubmit = Object.values(valid).every(Boolean) && checks.email.available && checks.nickname.available
    && checks.email.value === form.email.trim() && checks.nickname.value === form.nickname.trim();
  function change(key: keyof typeof form, value: string) {
    setForm(previous => ({ ...previous, [key]: value }));
    if (key === "email" || key === "nickname") setChecks(previous => ({ ...previous, [key]: EMPTY_CHECK }));
    setStatus(""); setSuccess(false);
  }
  async function check(key: "email" | "nickname") {
    if (!valid[key] || checks[key].pending || submitting) return;
    const value = form[key].trim();
    setChecks(previous => ({ ...previous, [key]: { ...EMPTY_CHECK, pending: true, value } }));
    try {
      const available = await checkDuplicate(key, value);
      setChecks(previous => ({ ...previous, [key]: { pending: false, value, available,
        message: available ? "사용할 수 있어요." : "이미 사용 중이에요." } }));
    } catch (error) {
      setChecks(previous => ({ ...previous, [key]: { ...EMPTY_CHECK, message: "중복 확인에 실패했어요. 다시 시도해 주세요." } }));
      setStatus(await getApiError(error));
    }
  }
  async function submit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canSubmit || submitting) return;
    setStatus("");
    try {
      const response = await signupMutation.mutateAsync({ email: form.email.trim(), nickname: form.nickname.trim(), password: form.password });
      setStatus(response.message); setSuccess(true);
      setForm(EMPTY_FORM); setChecks({ email: EMPTY_CHECK, nickname: EMPTY_CHECK });
    } catch (error) { setStatus(await getApiError(error)); setSuccess(false); }

  }
  const duplicateButton = (key: "email" | "nickname") => <button type="button" className="duplicate-button"
    disabled={!valid[key] || checks[key].pending || submitting} onClick={() => void check(key)}>
    {checks[key].pending ? "확인 중" : "중복 확인"}</button>;
  return <main className="auth-page"><form className="auth-form" onSubmit={submit} noValidate aria-busy={submitting}>
    <h1>회원가입</h1>
    <FormField id="signup-email" label="이메일" type="email" autoComplete="email" placeholder="name@example.com"
      value={form.email} disabled={checks.email.pending || submitting} onChange={e => change("email", e.target.value)}
      error={form.email && !valid.email ? "이메일 형식을 확인해 주세요." : undefined} hint={checks.email.message}>
      {duplicateButton("email")}</FormField>
    <FormField id="signup-nickname" label="닉네임" autoComplete="nickname" placeholder="2–12자" value={form.nickname}
      disabled={checks.nickname.pending || submitting} onChange={e => change("nickname", e.target.value)}
      error={form.nickname && !valid.nickname ? "닉네임은 2–12자로 입력해 주세요." : undefined} hint={checks.nickname.message}>
      {duplicateButton("nickname")}</FormField>
    <FormField id="signup-password" label="비밀번호" type="password" autoComplete="new-password" placeholder="8자 이상"
      value={form.password} disabled={submitting} onChange={e => change("password", e.target.value)}
      error={form.password && !valid.password ? "영문 대·소문자, 숫자, 특수문자를 모두 포함해 주세요." : undefined}
      hint="영문 대·소문자, 숫자, 특수문자(!@#$%^&*)를 모두 포함해 8자 이상 입력해 주세요" />
    <FormField id="signup-confirm" label="비밀번호 확인" type="password" autoComplete="new-password" placeholder="다시 입력"
      value={form.passwordConfirm} disabled={submitting} onChange={e => change("passwordConfirm", e.target.value)}
      error={form.passwordConfirm && !valid.passwordConfirm ? "비밀번호가 일치하지 않아요." : undefined} />
    <button className="primary-button auth-submit" disabled={!canSubmit || submitting} type="submit">{submitting ? "가입 중" : "가입하기"}</button>
    {status && <p role="status" className={success ? "form-success" : "field-error"}>{status}</p>}
    <p className="auth-switch">이미 계정이 있나요? <Link to="/login">로그인</Link></p>
  </form></main>;
}
