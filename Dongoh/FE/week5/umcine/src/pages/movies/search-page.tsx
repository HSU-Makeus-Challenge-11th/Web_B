import { Link, useNavigate, useSearch } from "@tanstack/react-router";
import { useEffect, useState, type SubmitEvent } from "react";
import type { TmdbMovieListItem } from "../../api/movies/models";
import { searchMovies } from "../../api/movies/search-movies";
import { BookmarkButton } from "../../components/bookmark-button";
import { getTmdbPosterUrl } from "../../utils/movies/tmdb-image";

export function SearchPage() {
  const { query } = useSearch({ from: "/search" });

  return <SearchPageContent key={query ?? ""} query={query} />;
}

function SearchPageContent({ query }: { query?: string }) {
  const navigate = useNavigate({ from: "/search" });
  const [searchText, setSearchText] = useState(query ?? "");

  const normalizedQuery = (query ?? "").trim();
  const [movies, setMovies] = useState<TmdbMovieListItem[]>([]);
  const [isLoading, setIsLoading] = useState(Boolean(normalizedQuery));
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!normalizedQuery) return;

    let ignore = false;

    searchMovies({ query: normalizedQuery })
      .then((response) => {
        if (!ignore) setMovies(response.results);
      })
      .catch(() => {
        if (!ignore) setErrorMessage("검색 결과를 불러오지 못했어요.");
      })
      .finally(() => {
        if (!ignore) setIsLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, [normalizedQuery]);

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
        <p className="search-page__empty" role="status">
          검색어를 입력해 주세요.
        </p>
      ) : isLoading ? (
        <p className="search-page__empty" role="status">
          검색 결과를 불러오는 중이에요.
        </p>
      ) : errorMessage ? (
        <p className="search-page__empty" role="alert">
          {errorMessage}
        </p>
      ) : (
        <section className="search-results">
          <div className="search-results__heading">
            <h2>'{query}' 검색 결과</h2>
            <p>영화 {movies.length}편</p>
          </div>
          {movies.length === 0 ? (
            <p className="search-page__empty" role="status">
              검색 결과가 없어요.
            </p>
          ) : (
            <ul className="search-results__list">
              {movies.map((movie) => {
                const posterUrl = getTmdbPosterUrl(movie.poster_path);

                return (
                  <li className="search-result-card" key={movie.id}>
                    {posterUrl ? (
                      <img
                        className="search-result-card__poster"
                        src={posterUrl}
                        alt={`${movie.title} 포스터`}
                      />
                    ) : (
                      <div className="search-result-card__poster tmdb-image-placeholder">
                        이미지 없음
                      </div>
                    )}
                    <div className="search-result-card__content">
                      <h3>{movie.title}</h3>
                      <p className="search-result-card__meta">
                        {movie.original_title} · {movie.release_date}
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
                );
              })}
            </ul>
          )}
        </section>
      )}
    </main>
  );
}
