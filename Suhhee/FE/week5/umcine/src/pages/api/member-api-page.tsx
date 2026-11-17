import { useState } from "react";

const apiBaseUrl =
  import.meta.env.VITE_MEMBER_API_BASE_URL ?? "http://127.0.0.1:8080";

interface ApiResult {
  label: string;
  url: string;
  status: number;
  body: unknown;
}

export function MemberApiPage() {
  const [results, setResults] = useState<ApiResult[]>([]);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );

  async function request(label: string, path: string): Promise<ApiResult> {
    const response = await fetch(`${apiBaseUrl}${path}`);
    const body = (await response.json()) as unknown;

    return {
      label,
      url: `${apiBaseUrl}${path}`,
      status: response.status,
      body,
    };
  }

  async function verifyAllApis() {
    setStatus("loading");
    setResults([]);

    try {
      const nextResults = await Promise.all([
        request("닉네임 중복 확인", "/members/nickname/수현"),
        request("이메일 중복 확인", "/members/email/noco@umc.com"),
        request("회원별 평점 조회", "/members/1/ratings"),
      ]);

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
          <p className="m-0 text-sm font-bold text-[#2563eb]">Spring Boot · CORS</p>
          <h1 className="mt-1 mb-0 text-[34px] font-black tracking-[-1.2px] text-[#17191e]">
            회원 API 연결 확인
          </h1>
          <p className="mt-2 mb-0 text-sm text-[#606774]">
            UMCine 화면에서 5주차 필수 API 세 개를 직접 호출해요.
          </p>
        </div>
        <button
          className="h-11 cursor-pointer rounded-lg border-0 bg-[#2563eb] px-5 text-sm font-extrabold text-white hover:bg-[#1d4ed8] disabled:cursor-wait disabled:opacity-60"
          type="button"
          disabled={status === "loading"}
          onClick={verifyAllApis}
        >
          {status === "loading" ? "요청 중..." : "전체 API 확인"}
        </button>
      </div>

      {status === "idle" && (
        <p className="mt-16 text-center text-[#606774]">
          버튼을 누르면 닉네임, 이메일과 평점 API를 한 번에 확인해요.
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
                <span className="rounded-full bg-[#e9f8ef] px-3 py-1 text-xs font-extrabold text-[#067647]">
                  {result.status} OK
                </span>
              </div>
              <p className="mt-2 mb-0 break-all font-mono text-xs text-[#606774]">
                GET {result.url}
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
