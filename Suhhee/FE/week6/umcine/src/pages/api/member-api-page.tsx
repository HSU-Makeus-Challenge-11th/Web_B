import { useState } from "react";

const apiBaseUrl =
  import.meta.env.VITE_MEMBER_API_BASE_URL ?? "http://127.0.0.1:8080";

interface ApiResult {
  label: string;
  method: string;
  url: string;
  status: number;
  body: unknown;
}

interface ApiResponse<T> {
  isSuccess: boolean;
  code: string;
  message: string;
  result: T;
}

export function MemberApiPage() {
  const [results, setResults] = useState<ApiResult[]>([]);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );

  async function request(
    label: string,
    path: string,
    options: RequestInit = {},
  ): Promise<ApiResult> {
    const response = await fetch(`${apiBaseUrl}${path}`, options);
    const responseText = await response.text();
    const body = responseText ? (JSON.parse(responseText) as unknown) : null;

    return {
      label,
      method: options.method ?? "GET",
      url: `${apiBaseUrl}${path}`,
      status: response.status,
      body,
    };
  }

  async function verifyAllApis() {
    setStatus("loading");
    setResults([]);

    try {
      const runId = Date.now();
      const headers = { "Content-Type": "application/json" };
      const signUp = await request("회원가입 성공", "/members", {
        method: "POST",
        headers,
        body: JSON.stringify({
          email: `week6-${runId}@umc.com`,
          password: "Week6!pass",
          nickname: `솔${String(runId).slice(-8)}`,
        }),
      });
      const validation = await request("회원가입 검증 실패", "/members", {
        method: "POST",
        headers,
        body: JSON.stringify({
          email: "not-an-email",
          password: "short",
          nickname: "솔",
        }),
      });
      const createRating = await request("평점 등록", "/members/1/ratings", {
        method: "POST",
        headers,
        body: JSON.stringify({
          movieId: runId,
          score: 5,
          comment: "6주차 API로 등록한 한줄평",
        }),
      });
      const ratingId = (createRating.body as ApiResponse<number>).result;
      const forbidden = await request(
        "다른 회원의 수정 차단",
        `/members/2/ratings/${ratingId}`,
        {
          method: "PATCH",
          headers,
          body: JSON.stringify({ score: 3, comment: "권한 없는 수정" }),
        },
      );
      const updateRating = await request(
        "평점 수정",
        `/members/1/ratings/${ratingId}`,
        {
          method: "PATCH",
          headers,
          body: JSON.stringify({ score: 4, comment: "수정된 한줄평" }),
        },
      );
      const deleteRating = await request(
        "평점 삭제",
        `/members/1/ratings/${ratingId}`,
        { method: "DELETE" },
      );

      const nextResults = [
        signUp,
        validation,
        createRating,
        forbidden,
        updateRating,
        deleteRating,
      ];

      setResults(nextResults);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <main className="mx-auto min-h-[calc(100vh-91px)] w-full max-w-[1100px] px-4 py-10 sm:px-8 lg:px-20">
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-[#d7dbe2] pb-5">
        <div>
          <p className="m-0 text-sm font-bold text-[#2563eb]">
            Spring Boot · Validation · bcrypt
          </p>
          <h1 className="mt-1 mb-0 text-[34px] font-black tracking-[-1.2px] text-[#17191e]">
            6주차 저장 API 확인
          </h1>
          <p className="mt-2 mb-0 text-sm text-[#606774]">
            회원가입과 평점 등록·수정·삭제의 성공 및 실패 응답을 순서대로 확인해요.
          </p>
        </div>
        <button
          className="h-11 cursor-pointer rounded-lg border-0 bg-[#2563eb] px-5 text-sm font-extrabold text-white hover:bg-[#1d4ed8] disabled:cursor-wait disabled:opacity-60"
          type="button"
          disabled={status === "loading"}
          onClick={verifyAllApis}
        >
          {status === "loading" ? "요청 중..." : "필수 API 시나리오 실행"}
        </button>
      </div>

      {status === "idle" && (
        <p className="mt-16 text-center text-[#606774]">
          버튼을 누르면 201, 400, 403, 200과 204 응답을 한 번에 확인해요.
        </p>
      )}
      {status === "error" && (
        <p className="mt-16 text-center font-bold text-[#b42318]">
          API 서버에 연결하지 못했어요. Spring 서버와 CORS 설정을 확인해 주세요.
        </p>
      )}
      {status === "success" && (
        <section className="mt-6 grid gap-4">
          {results.map((result) => (
            <article
              className="rounded-xl border border-[#d7dbe2] bg-white p-5 shadow-[0_8px_24px_rgba(23,25,30,0.06)]"
              key={result.label}
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h2 className="m-0 text-lg font-extrabold text-[#17191e]">
                  {result.label}
                </h2>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-extrabold ${
                    result.status >= 400
                      ? "bg-[#fee4e2] text-[#b42318]"
                      : "bg-[#e9f8ef] text-[#067647]"
                  }`}
                >
                  HTTP {result.status}
                </span>
              </div>
              <p className="mt-2 mb-0 break-all font-mono text-xs text-[#606774]">
                {result.method} {result.url}
              </p>
              <pre className="mt-4 mb-0 overflow-x-auto rounded-lg bg-[#17191e] p-4 text-xs leading-5 text-white">
                {JSON.stringify(result.body, null, 2)}
              </pre>
            </article>
          ))}
        </section>
      )}
    </main>
  );
}
