import { Suspense } from "react";
import { SearchPage } from "@/features/movies/search-page";

export default function Page() {
  return (
    <Suspense fallback={<main className="p-10 text-center">검색 화면을 불러오는 중이에요.</main>}>
      <SearchPage />
    </Suspense>
  );
}
