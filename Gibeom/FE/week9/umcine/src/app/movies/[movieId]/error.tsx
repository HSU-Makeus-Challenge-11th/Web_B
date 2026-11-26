"use client";

// TMDB 장애처럼 404가 아닌 오류가 나면 이 화면을 보여줌 (error.tsx는 Client Component여야 함)
export default function MovieDetailError({ reset }: { error: Error; reset: () => void }) {
  return (
    <main className="grid min-h-[420px] flex-1 place-items-center bg-[#f6f7f9] text-lg font-bold text-[#555d6c]">
      <p className="m-0">
        영화 정보를 불러오지 못했어요.
        <button className="ml-2 cursor-pointer text-base underline" type="button" onClick={reset}>
          다시 시도
        </button>
      </p>
    </main>
  );
}
