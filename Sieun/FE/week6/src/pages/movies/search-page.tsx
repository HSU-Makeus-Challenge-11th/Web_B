import { useQuery } from "@tanstack/react-query";
import { useSearch } from "@tanstack/react-router";
import { searchMovies } from "../../api/movies/search-movies";
import { SearchForm } from "../../components/movies/search-form";
import { SearchResultItem } from "../../components/movies/search-result-item";

export function SearchPage() {
  const { query } = useSearch({ from: "/search" });
  const normalizedQuery = query?.trim() ?? "";

  const searchQuery = useQuery({
    queryKey: ["movies", "search", { query: normalizedQuery }],
    queryFn: () => searchMovies({ query: normalizedQuery }),
    enabled: normalizedQuery.length > 0,
  });

  const searchResults = searchQuery.data?.results ?? [];

  // 빈 검색어라면 요청하지 않고 검색 안내를 보여 줘요
  if (!normalizedQuery) {
    return (
      <main className="mx-auto flex w-[800px] flex-col items-center pt-[200px] pb-20">
        <h1 className="text-[32px] leading-10 font-bold tracking-tight">
          어떤 영화를 찾고 있나요?
        </h1>
        <p className="mt-2 text-[15px] text-fg-secondary">
          검색어를 입력하면 제목이나 원제로 영화를 찾아드려요.
        </p>
        <div className="mt-8 w-full">
          <SearchForm variant="hero" />
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto w-[1280px] pt-8 pb-12">
      <h1 className="mb-4 text-[32px] leading-10 font-bold tracking-tight">영화 검색</h1>
      {/* query가 바뀌면 key로 폼을 새로 만들어 입력값을 URL과 맞춰요 */}
      <SearchForm key={normalizedQuery} variant="bar" defaultQuery={normalizedQuery} />

      <div className="mt-6 flex items-center justify-between border-b border-line pb-3">
        <h2 className="text-[15px] font-bold">‘{normalizedQuery}’ 검색 결과</h2>
        {searchQuery.isSuccess && (
          <p className="text-xs text-fg-tertiary">
            영화 {searchQuery.data.total_results}편 · 1페이지
          </p>
        )}
      </div>

      {searchQuery.isLoading ? (
        <p className="py-24 text-center text-fg-secondary">검색 결과를 불러오는 중이에요.</p>
      ) : searchQuery.isError ? (
        <p className="py-24 text-center text-danger">검색 결과를 불러오지 못했어요.</p>
      ) : searchQuery.isSuccess && searchResults.length === 0 ? (
        <div className="py-24 text-center">
          <p className="text-lg font-semibold">조건에 맞는 영화가 없어요.</p>
          <p className="mt-2 text-sm text-fg-secondary">다른 검색어로 다시 찾아보세요.</p>
        </div>
      ) : (
        <ul className="grid grid-cols-2 gap-x-10">
          {searchResults.map((movie) => (
            <li key={movie.id}>
              <SearchResultItem movie={movie} />
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
