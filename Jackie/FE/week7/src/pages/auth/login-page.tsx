import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { apiClient } from "../../api/api-client";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [notice, setNotice] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!EMAIL_REGEX.test(email.trim())) {
      setNotice("올바른 이메일을 입력해주세요.");
      return;
    }

    if (!password) {
      setNotice("비밀번호를 입력해주세요.");
      return;
    }

    if (isSubmitting) return;

    setIsSubmitting(true);
    setNotice("");

    try {
      const response = await apiClient
        .post("auth/login", {
          json: {
            email: email.trim(),
            password,
          },
        })
        .json<{
          isSuccess: boolean;
          code: string;
          message: string;
          result: {
            accessToken: string;
          };
        }>();

      sessionStorage.setItem(
        "umcine-access-token",
        response.result.accessToken,
      );

      window.dispatchEvent(new Event("umcine-auth-changed"));

      alert(response.message);

      await navigate({ to: "/" });
    } catch (error) {
      console.error("로그인 오류:", error);
      setNotice("로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="flex min-h-[calc(100vh-91px)] w-full items-center justify-center bg-[#F6F7F9] px-5 py-12 font-['Pretendard']">
      <form
        id="login-form"
        onSubmit={handleSubmit}
        noValidate
        className="flex w-full max-w-[430px] flex-col gap-[16px]"
      >
        <h1 className="m-0 h-[41px] text-[34px] font-[700] leading-[41px] tracking-[-1.53px] text-[#17191E]">
          로그인
        </h1>

        <div className="flex w-full flex-col gap-[4px]">
          <label
            htmlFor="login-email"
            className="h-[16px] text-[13px] font-[800] leading-[16px] text-[#17191E]"
          >
            이메일
          </label>

          <div className="flex h-[49px] w-full items-center gap-[4px] rounded-[8px] border border-[#E3E6EB] bg-[#FFFFFF] px-[13px] focus-within:border-[#2563EB]">
            <img
              className="h-[16px] w-[16px] shrink-0"
              src="/icons/mail.svg"
              alt=""
            />

            <input
              id="login-email"
              type="email"
              autoComplete="off"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setNotice("");
              }}
              className="min-w-0 flex-1 border-0 bg-transparent text-[14px] font-[400] leading-[17px] text-[#17191E] outline-none placeholder:text-[#969DA8]"
            />
          </div>
        </div>

        <div className="flex w-full flex-col gap-[4px]">
          <label
            htmlFor="login-password"
            className="h-[16px] text-[13px] font-[800] leading-[16px] text-[#17191E]"
          >
            비밀번호
          </label>

          <div className="flex h-[49px] w-full items-center gap-[4px] rounded-[8px] border border-[#E3E6EB] bg-[#FFFFFF] px-[13px] focus-within:border-[#2563EB]">
            <img
              className="h-[16px] w-[16px] shrink-0"
              src="/icons/lock.svg"
              alt=""
            />

            <input
              id="login-password"
              name="login-password"
              type="password"
              autoComplete="off"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setNotice("");
              }}
              className="min-w-0 flex-1 border-0 bg-transparent text-[14px] font-[400] leading-[17px] text-[#17191E] outline-none placeholder:text-[#969DA8]"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="flex h-[48px] w-full items-center justify-center rounded-[8px] border border-white bg-[#2563EB] px-[16px] text-[14px] font-[800] leading-[17px] text-white transition-colors hover:bg-[#1D4ED8] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting ? "로그인 중" : "로그인"}
        </button>

        <div className="flex min-h-[21px] w-full items-center justify-center gap-[4px] pt-[5px]">
          <span className="text-[13px] font-[400] leading-[16px] text-[#606774]">
            처음이신가요?
          </span>

          <Link
            to="/signup"
            className="text-[12px] font-[800] leading-[14px] text-[#2563EB] no-underline hover:underline"
          >
            회원가입
          </Link>
        </div>

        {notice && (
          <p role="status" className="m-0 text-center text-[12px] text-red-500">
            {notice}
          </p>
        )}
      </form>
    </main>
  );
}
