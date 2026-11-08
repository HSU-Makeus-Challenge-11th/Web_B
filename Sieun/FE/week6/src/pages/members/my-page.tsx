import { useState, type SubmitEvent } from "react";
import { checkEmail, checkNickname, getMemberRatings } from "../../api/members";
import { Icon } from "../../components/common/icon";
import type { RatingResponse } from "../../types/member";
import { cn } from "../../utils/cn";

type CheckResult = { available: boolean } | { error: string } | null;

const inputClassName =
  "h-12 min-w-0 flex-1 rounded-lg border border-line bg-surface px-4 text-[15px] outline-none placeholder:text-fg-tertiary focus:border-fg";
const buttonClassName =
  "h-12 shrink-0 rounded-lg bg-fg px-5 text-sm font-semibold text-white hover:bg-fg/85 disabled:bg-fg-tertiary";

function toErrorMessage(error: unknown) {
  // 서버가 꺼져 있거나 CORS로 막히면 fetch 자체가 TypeError로 실패해요
  if (error instanceof TypeError) return "서버에 연결할 수 없어요. (F12 → Console 확인)";
  return error instanceof Error ? error.message : "알 수 없는 오류가 발생했어요.";
}

function formatDateTime(value: string) {
  return value.replace("T", " ").slice(0, 16);
}

interface AvailabilityCheckProps {
  label: string;
  placeholder: string;
  defaultValue: string;
  takenMessage: string;
  check: (value: string) => Promise<{ available: boolean }>;
}

function AvailabilityCheck({ label, placeholder, defaultValue, takenMessage, check }: AvailabilityCheckProps) {
  const [value, setValue] = useState(defaultValue);
  const [result, setResult] = useState<CheckResult>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmedValue = value.trim();
    if (!trimmedValue) return;

    setIsLoading(true);
    try {
      setResult(await check(trimmedValue));
    } catch (error) {
      setResult({ error: toErrorMessage(error) });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-xl border border-line bg-surface p-6">
      <label className="text-[15px] font-bold">
        {label}
        <div className="mt-3 flex gap-2">
          <input
            value={value}
            placeholder={placeholder}
            onChange={(event) => {
              setValue(event.target.value);
              setResult(null);
            }}
            className={inputClassName}
          />
          <button type="submit" disabled={isLoading} className={buttonClassName}>
            중복 확인
          </button>
        </div>
      </label>
      <p
        className={cn(
          "mt-2 min-h-5 text-sm",
          result && "error" in result && "text-danger",
          result && "available" in result && (result.available ? "text-action" : "text-danger"),
        )}
      >
        {result && ("error" in result ? result.error : result.available ? "사용할 수 있어요." : takenMessage)}
      </p>
    </form>
  );
}

function MemberRatings() {
  const [memberId, setMemberId] = useState("1");
  const [ratings, setRatings] = useState<RatingResponse[] | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const id = Number(memberId);
    if (!Number.isInteger(id) || id < 1) return;

    setIsLoading(true);
    setErrorMessage("");
    try {
      setRatings(await getMemberRatings(id));
    } catch (error) {
      setRatings(null);
      setErrorMessage(toErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="rounded-xl border border-line bg-surface p-6">
      <form onSubmit={handleSubmit}>
        <label className="text-[15px] font-bold">
          유저별 평점 조회
          <div className="mt-3 flex gap-2">
            <input
              type="number"
              min={1}
              value={memberId}
              placeholder="회원 ID"
              onChange={(event) => setMemberId(event.target.value)}
              className={inputClassName}
            />
            <button type="submit" disabled={isLoading} className={buttonClassName}>
              평점 불러오기
            </button>
          </div>
        </label>
      </form>

      {errorMessage && <p className="mt-2 text-sm text-danger">{errorMessage}</p>}

      {ratings && (
        <>
          <div className="mt-6 flex items-center justify-between border-b border-line pb-3">
            <h2 className="text-[15px] font-bold">{memberId}번 회원의 평점</h2>
            <p className="text-xs text-fg-tertiary">평점 {ratings.length}개</p>
          </div>
          {ratings.length === 0 ? (
            <p className="py-12 text-center text-sm text-fg-secondary">아직 남긴 평점이 없어요.</p>
          ) : (
            <ul>
              {ratings.map((rating) => (
                <li key={rating.ratingId} className="flex items-start gap-4 border-b border-line py-4 last:border-b-0">
                  <span className="flex items-center gap-1 text-[15px] font-bold">
                    <Icon name="star" className="size-4 text-action" />
                    {rating.score}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-[15px]">{rating.comment ?? "코멘트 없음"}</p>
                    <p className="mt-1 text-xs text-fg-tertiary">
                      TMDB 영화 #{rating.movieId} · {formatDateTime(rating.createdAt)}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </section>
  );
}

export function MyPage() {
  return (
    <main className="mx-auto w-[800px] pt-12 pb-20">
      <h1 className="text-[32px] leading-10 font-bold tracking-tight">내 정보</h1>
      <p className="mt-2 text-[15px] text-fg-secondary">회원 정보와 내가 남긴 평점을 확인해요.</p>

      <div className="mt-8 grid grid-cols-2 gap-4">
        <AvailabilityCheck
          label="닉네임 중복 확인"
          placeholder="닉네임"
          defaultValue="수현"
          takenMessage="이미 사용 중인 닉네임이에요."
          check={checkNickname}
        />
        <AvailabilityCheck
          label="이메일 중복 확인"
          placeholder="example@umc.com"
          defaultValue="noco@umc.com"
          takenMessage="이미 사용 중인 이메일이에요."
          check={checkEmail}
        />
      </div>

      <div className="mt-4">
        <MemberRatings />
      </div>
    </main>
  );
}
