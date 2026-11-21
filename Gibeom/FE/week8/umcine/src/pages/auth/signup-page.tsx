import { useState } from "react";
import { checkEmailDuplicate } from "../../api/members/check-email-duplicate";
import { checkNicknameDuplicate } from "../../api/members/check-nickname-duplicate";
import { signup } from "../../api/members/signup";
import { getApiErrorMessage } from "../../api/api-error";
import { useMemberStore } from "../../stores/member-store";
import { useNavigate } from "@tanstack/react-router";

// 이메일 형식 검사
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// 영문 대소문자, 숫자, 특수문자(!@#$%^&*)를 모두 포함해 8자 이상
const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/;

const DEFAULT_FORM = {
  email: "",
  nickname: "",
  password: "",
  passwordConfirm: "",
};

type DefaultFormKey = keyof typeof DEFAULT_FORM;
type DefaultFormValue = (typeof DEFAULT_FORM)[DefaultFormKey];
type DuplicateCheckKey = "email" | "nickname";

const DEFAULT_DUPLICATE_CHECK = {
  isChecking: false,
  isAvailable: false,
};

export function SignupPage() {
  const [form, setForm] = useState(DEFAULT_FORM);
  const [duplicateCheck, setDuplicateCheck] = useState({
    email: DEFAULT_DUPLICATE_CHECK,
    nickname: DEFAULT_DUPLICATE_CHECK,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const setMemberId = useMemberStore((state) => state.setMemberId);
  const navigate = useNavigate();

  // 입력값의 유효성 검사
  const isEmailValid = EMAIL_REGEX.test(form.email.trim());
  const isNicknameValid =
    form.nickname.trim().length >= 2 && form.nickname.trim().length <= 12;
  const isPasswordValid = PASSWORD_REGEX.test(form.password);
  const isPasswordConfirmValid =
    form.passwordConfirm.length > 0 && form.password === form.passwordConfirm;

  // 입력을 시작한 필드에만 오류 표시
  const showEmailError = form.email.length > 0 && !isEmailValid;
  const showNicknameError = form.nickname.length > 0 && !isNicknameValid;
  const showPasswordError = form.password.length > 0 && !isPasswordValid;
  const showPasswordConfirmError =
    form.passwordConfirm.length > 0 && !isPasswordConfirmValid;

  // 입력 조건과 두 중복 확인을 모두 통과해야 제출 가능
  const isFormValid =
    isEmailValid &&
    isNicknameValid &&
    isPasswordValid &&
    isPasswordConfirmValid;
  const canSubmit =
    isFormValid &&
    duplicateCheck.email.isAvailable &&
    duplicateCheck.nickname.isAvailable;

  const handleChangeField = (key: DefaultFormKey, value: DefaultFormValue) => {
    if (isSubmitting) return;
    if (key === "email" || key === "nickname") {
      if (duplicateCheck[key].isChecking) return;
      setDuplicateCheck((prev) => ({
        ...prev,
        [key]: DEFAULT_DUPLICATE_CHECK,
      }));
    }
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleCheckDuplicate = async (key: DuplicateCheckKey) => {
    const isValid = key === "email" ? isEmailValid : isNicknameValid;
    if (!isValid || duplicateCheck[key].isChecking || isSubmitting) return;

    const label = key === "email" ? "이메일" : "닉네임";
    setDuplicateCheck((prev) => ({
      ...prev,
      [key]: { isChecking: true, isAvailable: false },
    }));

    try {
      const response =
        key === "email"
          ? await checkEmailDuplicate(form.email.trim())
          : await checkNicknameDuplicate(form.nickname.trim());
      const isAvailable = response.available;
      setDuplicateCheck((prev) => ({
        ...prev,
        [key]: { ...prev[key], isAvailable },
      }));
      alert(
        isAvailable
          ? `사용할 수 있는 ${label}이에요.`
          : `이미 사용 중인 ${label}이에요.`,
      );
    } catch {
      setDuplicateCheck((prev) => ({
        ...prev,
        [key]: { ...prev[key], isAvailable: false },
      }));
      alert("중복 확인에 실패했어요. 다시 시도해 주세요.");
    } finally {
      setDuplicateCheck((prev) => ({
        ...prev,
        [key]: { ...prev[key], isChecking: false },
      }));
    }
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!canSubmit || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const response = await signup({
        email: form.email.trim(),
        nickname: form.nickname.trim(),
        password: form.password,
      });
      if (!response.isSuccess) {
        alert(response.message || "회원가입에 실패했어요. 다시 시도해 주세요.");
        return;
      }
      setMemberId(response.result.memberId);
      alert(response.message);
      navigate({ to: "/login" });
    } catch (error) {
      alert(getApiErrorMessage(error, "회원가입에 실패했어요. 다시 시도해 주세요."));
    } finally {
      setIsSubmitting(false);
    }
  };

  // noValidate는 폼 제출 시 브라우저의 기본 유효성 검사를 끔
  return (
    <main className="flex-1 bg-[#f6f7f9] px-4 py-10">
      <form
        className="mx-auto grid w-full max-w-md gap-5 rounded-xl bg-white p-6 shadow-sm"
        onSubmit={handleSubmit}
        noValidate
      >
        <h1 className="m-0 text-2xl font-bold">회원가입</h1>
        <div>
          <label className="mb-2 block text-sm font-bold" htmlFor="signup-email">이메일</label>
          <div className="flex gap-2">
            <input
              className="min-w-0 flex-1 rounded-md border border-gray-300 p-2 disabled:bg-gray-100"
              id="signup-email"
              type="email"
              autoComplete="email"
              value={form.email}
              onChange={(e) => handleChangeField("email", e.target.value)}
              disabled={duplicateCheck.email.isChecking || isSubmitting}
              aria-invalid={showEmailError}
              aria-describedby="signup-email-hint"
            />
            <button className="rounded-md bg-gray-800 px-3 text-sm text-white disabled:opacity-40" type="button" disabled={!isEmailValid || duplicateCheck.email.isChecking || isSubmitting} onClick={() => handleCheckDuplicate("email")}>
              {duplicateCheck.email.isChecking ? "확인 중" : "중복 확인"}
            </button>
          </div>
          <p className={`mt-2 text-xs ${showEmailError ? "text-red-600" : "text-gray-500"}`} id="signup-email-hint">
            {showEmailError ? "올바른 이메일 형식을 입력해 주세요." : duplicateCheck.email.isAvailable ? "사용 가능한 이메일이에요." : "이메일을 입력하고 중복 확인해 주세요."}
          </p>
        </div>
        <div>
          <label className="mb-2 block text-sm font-bold" htmlFor="signup-nickname">닉네임</label>
          <div className="flex gap-2">
            <input
              className="min-w-0 flex-1 rounded-md border border-gray-300 p-2 disabled:bg-gray-100"
              id="signup-nickname"
              autoComplete="nickname"
              value={form.nickname}
              onChange={(e) => handleChangeField("nickname", e.target.value)}
              disabled={duplicateCheck.nickname.isChecking || isSubmitting}
              aria-invalid={showNicknameError}
              aria-describedby="signup-nickname-hint"
            />
            <button className="rounded-md bg-gray-800 px-3 text-sm text-white disabled:opacity-40" type="button" disabled={!isNicknameValid || duplicateCheck.nickname.isChecking || isSubmitting} onClick={() => handleCheckDuplicate("nickname")}>
              {duplicateCheck.nickname.isChecking ? "확인 중" : "중복 확인"}
            </button>
          </div>
          <p className={`mt-2 text-xs ${showNicknameError ? "text-red-600" : "text-gray-500"}`} id="signup-nickname-hint">
            {showNicknameError ? "닉네임은 2~12자로 입력해 주세요." : duplicateCheck.nickname.isAvailable ? "사용 가능한 닉네임이에요." : "닉네임을 입력하고 중복 확인해 주세요."}
          </p>
        </div>
        <div>
          <label className="mb-2 block text-sm font-bold" htmlFor="signup-password">비밀번호</label>
          <input className="w-full rounded-md border border-gray-300 p-2 disabled:bg-gray-100" id="signup-password" type="password" autoComplete="new-password" value={form.password} onChange={(e) => handleChangeField("password", e.target.value)} disabled={isSubmitting} aria-invalid={showPasswordError} aria-describedby="signup-password-hint" />
          <p className={`mt-2 text-xs ${showPasswordError ? "text-red-600" : "text-gray-500"}`} id="signup-password-hint">영문 대소문자, 숫자, 특수문자(!@#$%^&*)를 포함해 8자 이상 입력해 주세요.</p>
        </div>
        <div>
          <label className="mb-2 block text-sm font-bold" htmlFor="signup-password-confirm">비밀번호 확인</label>
          <input className="w-full rounded-md border border-gray-300 p-2 disabled:bg-gray-100" id="signup-password-confirm" type="password" autoComplete="new-password" value={form.passwordConfirm} onChange={(e) => handleChangeField("passwordConfirm", e.target.value)} disabled={isSubmitting} aria-invalid={showPasswordConfirmError} aria-describedby="signup-password-confirm-hint" />
          <p className={`mt-2 text-xs ${showPasswordConfirmError ? "text-red-600" : "text-gray-500"}`} id="signup-password-confirm-hint">{showPasswordConfirmError ? "비밀번호가 일치하지 않아요." : "비밀번호를 다시 입력해 주세요."}</p>
        </div>
        <button className="rounded-md bg-blue-600 p-3 font-bold text-white disabled:cursor-not-allowed disabled:opacity-40" type="submit" disabled={!canSubmit || isSubmitting}>
          {isSubmitting ? "가입 중" : "가입하기"}
        </button>
      </form>
    </main>
  );
}
