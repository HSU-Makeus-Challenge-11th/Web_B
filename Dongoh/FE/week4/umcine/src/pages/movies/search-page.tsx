import { Link, useNavigate, useSearch } from "@tanstack/react-router";
import { useEffect, useState, type SubmitEvent } from "react";
import { BookmarkButton } from "../../components/bookmark-button";
import { movies } from "../../data/movies";

export function SearchPage() {
  const { query } = useSearch({ from: "/search" });
  const navigate = useNavigate({ from: "/search" });
  const [searchText, setSearchText] = useState(query ?? "");

  useEffect(() => {
    setSearchText(query ?? "");
  }, [query]);

  const normalizedQuery = query?.trim().toLowerCase() ?? "";
  const searchResults = normalizedQuery
    ? movies.filter(
        (movie) =>
          movie.title.toLowerCase().includes(normalizedQuery) ||
          movie.originalTitle.toLowerCase().includes(normalizedQuery),
      )
    : [];

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextQuery = searchText.trim();

    navigate({
      search: nextQuery ? { query: nextQuery } : {},
    });
  }

  return (
    <main className="search-page">
      <section className="search-page__hero">
        <h1>어떤 영화를 찾으시나요?</h1>
        <form className="search-form" onSubmit={handleSubmit}>
          <input
            aria-label="검색어"
            placeholder="영화 제목을 입력해주세요"
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
          />
          <button type="submit">검색</button>
        </form>
      </section>

      {!normalizedQuery ? (
        <p className="search-page__empty">검색어를 입력해 주세요.</p>
      ) : (
        <section className="search-results">
          <div className="search-results__heading">
            <h2>'{query}' 검색 결과</h2>
            <p>영화 {searchResults.length}편</p>
          </div>
          {searchResults.length === 0 ? (
            <p className="search-page__empty">검색 결과가 없어요.</p>
          ) : (
            <ul className="search-results__list">
              {searchResults.map((movie) => (
                <li className="search-result-card" key={movie.id}>
                  <img src={movie.posterPath} alt={`${movie.title} 포스터`} />
                  <div className="search-result-card__content">
                    <h3>{movie.title}</h3>
                    <p className="search-result-card__meta">
                      {movie.originalTitle} · {movie.releaseDate}
                    </p>
                    <p>{movie.overview}</p>
                    <div className="search-result-card__actions">
                      <BookmarkButton movieId={movie.id} />
                      <Link
                        to="/movies/$movieId"
                        params={{ movieId: String(movie.id) }}
                      >
                        상세 보기
                      </Link>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      )}
    </main>
  );
}
