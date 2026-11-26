import { Suspense } from "react";
import { SearchPage } from "../../views/movies/search-page";

// useSearchParams를 쓰는 Client Component는 Suspense로 감싸야
// 나머지 부분(헤더·푸터)을 빌드할 때 미리 만들 수 있음
export default function Page() {
  return (
    <Suspense>
      <SearchPage />
    </Suspense>
  );
}
