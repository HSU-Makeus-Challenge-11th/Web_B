import { useState, type FormEvent } from "react";
import { checkEmailDuplicate } from "../../api/members/check-email-duplicate";
import { checkNicknameDuplicate } from "../../api/members/check-nickname-duplicate";
import { signup } from "../../api/members/signup";
// import { useNavigate } from "@tanstack/react-router";

const DEFAULT_DUPLICATE_CHECK = {
  isChecking: false,
  isAvailable: false,
};

type DuplicateCheckKey = "email" | "nickname";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

export function SignupPage() {
  const [form, setForm] = useState(DEFAULT_FORM);
  const [notice, setNotice] = useState("");

  const [duplicateCheck, setDuplicateCheck] = useState({
    email: { ...DEFAULT_DUPLICATE_CHECK },
    nickname: { ...DEFAULT_DUPLICATE_CHECK },
  });

  const isEmailValid = EMAIL_REGEX.test(form.email.trim());

  const isNicknameValid =
    form.nickname.trim().length >= 2 && form.nickname.trim().length <= 12;

  const isPasswordValid = PASSWORD_REGEX.test(form.password);

  const isPasswordConfirmValid =
    form.passwordConfirm.length > 0 && form.password === form.passwordConfirm;

  const showEmailError = form.email.length > 0 && !isEmailValid;

  const showNicknameError = form.nickname.length > 0 && !isNicknameValid;

  const showPasswordError = form.password.length > 0 && !isPasswordValid;

  const showPasswordConfirmError =
    form.passwordConfirm.length > 0 && !isPasswordConfirmValid;

  const isFormValid =
    isEmailValid &&
    isNicknameValid &&
    isPasswordValid &&
    isPasswordConfirmValid;

  const canSubmit =
    isFormValid &&
    duplicateCheck.email.isAvailable &&
    duplicateCheck.nickname.isAvailable &&
    !duplicateCheck.email.isChecking &&
    !duplicateCheck.nickname.isChecking;

  const handleChangeField = (key: DefaultFormKey, value: DefaultFormValue) => {
    if (key === "email" || key === "nickname") {
      if (duplicateCheck[key].isChecking) return;

      setDuplicateCheck((prev) => ({
        ...prev,
        [key]: { ...DEFAULT_DUPLICATE_CHECK },
      }));
    }

    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));

    setNotice("");
  };

  const handleCheckDuplicate = async (key: DuplicateCheckKey) => {
    const isValid = key === "email" ? isEmailValid : isNicknameValid;

    if (!isValid || duplicateCheck[key].isChecking) return;

    const label = key === "email" ? "이메일" : "닉네임";

    setDuplicateCheck((prev) => ({
      ...prev,
      [key]: {
        isChecking: true,
        isAvailable: false,
      },
    }));

    try {
      const response =
        key === "email"
          ? await checkEmailDuplicate(form.email.trim())
          : await checkNicknameDuplicate(form.nickname.trim());

      const isAvailable = response.available;

      setDuplicateCheck((prev) => ({
        ...prev,
        [key]: {
          isChecking: false,
          isAvailable,
        },
      }));

      alert(
        isAvailable
          ? `사용할 수 있는 ${label}이에요.`
          : `이미 사용 중인 ${label}이에요.`,
      );
    } catch (error) {
      console.error("중복 확인 오류:", error);
      setDuplicateCheck((prev) => ({
        ...prev,
        [key]: {
          isChecking: false,
          isAvailable: false,
        },
      }));

      alert("중복 확인에 실패했어요. 다시 시도해 주세요.");
    }
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  // const navigate = useNavigate();

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
      alert(response.message);
      // 로그인 페이지 연결 후 주석 해제
      // navigate({ to: "/login" });
    } catch {
      alert("회원가입에 실패했어요. 다시 시도해 주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="flex min-h-[calc(100vh-91px)] w-full items-center justify-center bg-[#F5F6F9] px-5 py-20 font-[Pretendard,sans-serif]">
      <form
        id="signup-form"
        onSubmit={handleSubmit}
        noValidate
        className="flex w-full max-w-[430px] flex-col"
      >
        <h1 className="mb-4 text-[34px] leading-[41px] font-bold tracking-[-1.53px] text-[#17191E]">
          회원가입
        </h1>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="signup-email"
              className="text-[13px] leading-4 font-extrabold text-[#17191E]"
            >
              이메일
            </label>

            <div className="flex h-12 w-full items-center rounded-lg border border-[#E3E6EB] bg-white px-[13px] focus-within:border-[#2563EB]">
              <input
                id="signup-email"
                type="email"
                autoComplete="email"
                placeholder="name@example.com"
                value={form.email}
                disabled={duplicateCheck.email.isChecking}
                onChange={(e) => handleChangeField("email", e.target.value)}
                aria-invalid={showEmailError}
                className="min-w-0 flex-1 bg-transparent text-sm text-[#17191E] outline-none placeholder:text-[#969DA8]"
              />

              <button
                type="button"
                disabled={!isEmailValid || duplicateCheck.email.isChecking}
                onClick={() => handleCheckDuplicate("email")}
                className="ml-2 shrink-0 text-xs font-extrabold text-[#2563EB] hover:underline disabled:cursor-not-allowed disabled:opacity-40"
              >
                {duplicateCheck.email.isChecking
                  ? "확인 중"
                  : duplicateCheck.email.isAvailable
                    ? "확인 완료"
                    : "중복 확인"}
              </button>
            </div>

            {showEmailError && (
              <p className="text-xs text-red-500">
                올바른 이메일 형식으로 입력해주세요.
              </p>
            )}

            {duplicateCheck.email.isAvailable && (
              <p className="text-xs text-green-600">
                사용할 수 있는 이메일이에요.
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="signup-nickname"
              className="text-[13px] leading-4 font-extrabold text-[#17191E]"
            >
              닉네임
            </label>

            <div className="flex h-12 w-full items-center rounded-lg border border-[#E3E6EB] bg-white px-[13px] focus-within:border-[#2563EB]">
              <input
                id="signup-nickname"
                type="text"
                autoComplete="nickname"
                maxLength={12}
                placeholder="2~12자"
                value={form.nickname}
                disabled={duplicateCheck.nickname.isChecking}
                onChange={(e) => handleChangeField("nickname", e.target.value)}
                aria-invalid={showNicknameError}
                className="min-w-0 flex-1 bg-transparent text-sm text-[#17191E] outline-none placeholder:text-[#969DA8]"
              />

              <button
                type="button"
                disabled={
                  !isNicknameValid || duplicateCheck.nickname.isChecking
                }
                onClick={() => handleCheckDuplicate("nickname")}
                className="ml-2 shrink-0 text-xs font-extrabold text-[#2563EB] hover:underline disabled:cursor-not-allowed disabled:opacity-40"
              >
                {duplicateCheck.nickname.isChecking
                  ? "확인 중"
                  : duplicateCheck.nickname.isAvailable
                    ? "확인 완료"
                    : "중복 확인"}
              </button>
            </div>

            {showNicknameError && (
              <p className="text-xs text-red-500">
                닉네임은 2자 이상 12자 이하로 입력해주세요.
              </p>
            )}

            {duplicateCheck.nickname.isAvailable && (
              <p className="text-xs text-green-600">
                사용할 수 있는 닉네임이에요.
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="signup-password"
              className="text-[13px] leading-4 font-extrabold text-[#17191E]"
            >
              비밀번호
            </label>

            <input
              id="signup-password"
              type="password"
              autoComplete="new-password"
              placeholder="8자 이상"
              value={form.password}
              onChange={(e) => handleChangeField("password", e.target.value)}
              aria-invalid={showPasswordError}
              className="h-12 w-full rounded-lg border border-[#E3E6EB] bg-white px-[13px] text-sm text-[#17191E] outline-none placeholder:text-[#969DA8] focus:border-[#2563EB]"
            />

            <p className="text-[11px] leading-[15px] text-[#969DA8]">
              영문 대·소문자, 숫자, 특수문자를 모두 포함해 8자 이상
              입력해주세요.
            </p>

            {showPasswordError && (
              <p className="text-xs text-red-500">
                비밀번호 조건을 만족하지 않습니다.
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="signup-password-confirm"
              className="text-[13px] leading-4 font-extrabold text-[#17191E]"
            >
              비밀번호 확인
            </label>

            <input
              id="signup-password-confirm"
              type="password"
              autoComplete="new-password"
              placeholder="다시 입력"
              value={form.passwordConfirm}
              onChange={(e) =>
                handleChangeField("passwordConfirm", e.target.value)
              }
              aria-invalid={showPasswordConfirmError}
              className="h-12 w-full rounded-lg border border-[#E3E6EB] bg-white px-[13px] text-sm text-[#17191E] outline-none placeholder:text-[#969DA8] focus:border-[#2563EB]"
            />

            {showPasswordConfirmError && (
              <p className="text-xs text-red-500">
                비밀번호가 일치하지 않습니다.
              </p>
            )}
          </div>
        </div>

        <button
          type="submit"
          disabled={!canSubmit || isSubmitting}
          className="mt-4 flex h-12 w-full items-center justify-center rounded-lg bg-[#2563EB] px-4 text-sm font-extrabold text-white transition-colors hover:bg-[#1D4ED8] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting ? "가입 중" : "가입하기"}
        </button>

        <div className="mt-4 flex items-center justify-center gap-1 text-[13px]">
          <span className="text-[#606774]">이미 계정이 있나요?</span>

          <a
            href="/login"
            className="text-xs font-extrabold text-[#2563EB] hover:underline"
          >
            로그인
          </a>
        </div>

        {notice && (
          <p role="status" className="mt-4 text-center text-xs text-[#606774]">
            {notice}
          </p>
        )}
      </form>
    </main>
  );
}
