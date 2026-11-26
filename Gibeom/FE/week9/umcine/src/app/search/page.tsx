import type { Metadata } from "next";
import { Suspense } from "react";
import { SearchPage } from "../../views/movies/search-page";

export const metadata: Metadata = {
  title: "영화 검색",
  description: "제목으로 영화를 찾아봐요.",
};

// useSearchParams를 쓰는 Client Component는 Suspense로 감싸야
// 나머지 부분(헤더·푸터)을 빌드할 때 미리 만들 수 있음
export default function Page() {
  return (
    <Suspense>
      <SearchPage />
    </Suspense>
  );
}
