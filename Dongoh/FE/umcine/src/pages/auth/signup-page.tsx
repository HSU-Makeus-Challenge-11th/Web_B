import { useState } from "react";
import { checkEmailDuplicate } from "@/api/members/check-email-duplicate";
import { checkNicknameDuplicate } from "@/api/members/check-nickname-duplicate";
import { signup } from "@/api/members/signup";
import { Link, useNavigate } from "@tanstack/react-router";
import "./signup-page.css";

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

const DEFAULT_DUPLICATE_CHECK = {
  isChecking: false,
  isAvailable: false,
};

type DuplicateCheckKey = "email" | "nickname";

export function SignupPage() {
  const [form, setForm] = useState(DEFAULT_FORM);
  const [duplicateCheck, setDuplicateCheck] = useState({
    email: DEFAULT_DUPLICATE_CHECK,
    nickname: DEFAULT_DUPLICATE_CHECK,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  // 모든 입력값이 유효하면 제출 버튼 활성화
  const isFormValid =
    isEmailValid &&
    isNicknameValid &&
    isPasswordValid &&
    isPasswordConfirmValid;

  // 입력 조건과 두 중복 확인을 모두 통과해야 제출 가능
  const canSubmit =
    isFormValid &&
    duplicateCheck.email.isAvailable &&
    duplicateCheck.nickname.isAvailable;

  const handleChangeField = (key: DefaultFormKey, value: DefaultFormValue) => {
    if (key === "email" || key === "nickname") {
      if (duplicateCheck[key].isChecking) return;
      // 확인한 값을 바꾸면 다시 중복 확인해야 함
      setDuplicateCheck((prev) => ({ ...prev, [key]: DEFAULT_DUPLICATE_CHECK }));
    }
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleCheckDuplicate = async (key: DuplicateCheckKey) => {
    const isValid = key === "email" ? isEmailValid : isNicknameValid;
    if (!isValid || duplicateCheck[key].isChecking) return;

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
      alert(response.message);
      navigate({ to: "/login" });
    } catch {
      alert("회원가입에 실패했어요. 다시 시도해 주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // noValidate는 폼 제출 시 브라우저의 기본 유효성 검사를 끔
  return (
    <main className="signup-page">
      <section className="signup-panel" aria-labelledby="signup-title">
        <h1 id="signup-title">회원가입</h1>

        <form className="signup-form" onSubmit={handleSubmit} noValidate>
          <div className="signup-field">
            <label htmlFor="signup-email">이메일</label>
            <div
              className={`signup-input-row${showEmailError ? " signup-input-row--error" : ""}`}
            >
              <input
                id="signup-email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="name@example.com"
                value={form.email}
                disabled={duplicateCheck.email.isChecking}
                onChange={(event) =>
                  handleChangeField("email", event.target.value)
                }
                aria-invalid={showEmailError}
                aria-describedby={showEmailError ? "signup-email-error" : undefined}
                required
              />
              <button
                className="signup-duplicate-button"
                type="button"
                disabled={!isEmailValid || duplicateCheck.email.isChecking}
                onClick={() => handleCheckDuplicate("email")}
              >
                {duplicateCheck.email.isChecking ? "확인 중" : "중복 확인"}
              </button>
            </div>
            {showEmailError && (
              <p className="signup-field__error" id="signup-email-error" role="status">
                올바른 이메일 형식으로 입력해 주세요.
              </p>
            )}
          </div>

          <div className="signup-field">
            <label htmlFor="signup-nickname">닉네임</label>
            <div
              className={`signup-input-row${showNicknameError ? " signup-input-row--error" : ""}`}
            >
              <input
                id="signup-nickname"
                name="nickname"
                type="text"
                autoComplete="nickname"
                placeholder="2–12자"
                value={form.nickname}
                disabled={duplicateCheck.nickname.isChecking}
                onChange={(event) =>
                  handleChangeField("nickname", event.target.value)
                }
                aria-invalid={showNicknameError}
                aria-describedby={showNicknameError ? "signup-nickname-error" : undefined}
                required
              />
              <button
                className="signup-duplicate-button"
                type="button"
                disabled={!isNicknameValid || duplicateCheck.nickname.isChecking}
                onClick={() => handleCheckDuplicate("nickname")}
              >
                {duplicateCheck.nickname.isChecking ? "확인 중" : "중복 확인"}
              </button>
            </div>
            {showNicknameError && (
              <p className="signup-field__error" id="signup-nickname-error" role="status">
                닉네임은 2~12자로 입력해 주세요.
              </p>
            )}
          </div>

          <div className="signup-field">
            <label htmlFor="signup-password">비밀번호</label>
            <div
              className={`signup-input-row${showPasswordError ? " signup-input-row--error" : ""}`}
            >
              <input
                id="signup-password"
                name="password"
                type="password"
                autoComplete="new-password"
                placeholder="8자 이상"
                value={form.password}
                onChange={(event) =>
                  handleChangeField("password", event.target.value)
                }
                aria-invalid={showPasswordError}
                aria-describedby="signup-password-help"
                required
              />
            </div>
            <p
              className={showPasswordError ? "signup-field__error" : "signup-field__hint"}
              id="signup-password-help"
              role={showPasswordError ? "status" : undefined}
            >
              영문 대소문자, 숫자, 특수문자(!@#$%^&amp;*)를 모두 포함해 8자 이상
              입력해 주세요.
            </p>
          </div>

          <div className="signup-field">
            <label htmlFor="signup-password-confirm">비밀번호 확인</label>
            <div
              className={`signup-input-row${showPasswordConfirmError ? " signup-input-row--error" : ""}`}
            >
              <input
                id="signup-password-confirm"
                name="passwordConfirm"
                type="password"
                autoComplete="new-password"
                placeholder="다시 입력"
                value={form.passwordConfirm}
                onChange={(event) =>
                  handleChangeField("passwordConfirm", event.target.value)
                }
                aria-invalid={showPasswordConfirmError}
                aria-describedby={showPasswordConfirmError ? "signup-password-confirm-error" : undefined}
                required
              />
            </div>
            {showPasswordConfirmError && (
              <p className="signup-field__error" id="signup-password-confirm-error" role="status">
                비밀번호가 일치하지 않아요.
              </p>
            )}
          </div>

          <button
            className="signup-submit-button"
            type="submit"
            disabled={!canSubmit || isSubmitting}
          >
            {isSubmitting ? "가입 중" : "가입하기"}
          </button>
        </form>

        <p className="signup-panel__login">
          이미 계정이 있나요?{" "}
          <Link to="/login" className="font-bold text-[#4b60e8]">
            로그인
          </Link>
        </p>
      </section>
    </main>
  );
}
