# 필수 미션 보완 구현 — 2026-11-11

## 구현한 내용

| 주차 | 보완 | 현재 상태 |
| --- | --- | --- |
| 3 | 공개 영화 화면의 CSS를 Tailwind로 전환, 상태별 cn·variant 사용 | 코드·빌드·브라우저 화면 확인 |
| 4 | 기존 북마크 공유·persist 동작 유지 | 실제 목록→상세→검색 공유 및 새로고침 유지 확인 |
| 5 | TMDB 로고·출처 문구를 공통 데이터 출처 영역에 배치 | 실제 DOM·이미지 로딩·크기·종횡비 확인 |
| 6 | 기존 Query 설정 유지, 캐시 재사용 검증 보완 | Query Devtools에서 1→2→1 뒤 동일 갱신 횟수·시각 확인 |
| 7 | 로그인·내 정보 조회·수정 퍼블리싱, 입력 상태·이동 연결 | 실제 브라우저에서 입력·저장·취소·조회 반영 확인 |

기능 범위는 사용자가 붙여넣은 노션 워크북의 필수 미션입니다. 로그인·내 정보 서버 API 연결은 워크북에서 8주차로 안내하므로 이번에는 구현하지 않습니다. 가짜 로그인 토큰을 발급하거나 인증 성공으로 이동시키지 않습니다.
7주차 내 정보 화면은 미리보기 데이터를 사용하고 수정값은 앱의 메모리에 유지합니다. 페이지 간 이동에는 반영되지만 새로고침하면 초기 데이터로 돌아갑니다. 실제 사용자 정보 조회·영구 저장은 다음 API 연동 범위입니다.

## 접속 경로

- `/`: 영화 목록
- `/search?query=프로젝트 헤일메리`: 검색 결과
- `/movies/687163`: 점검 당시 실제 영화 상세
- `/signup`: 기존 회원가입
- `/login`: 로그인 화면
- `/profile`: 내 정보 조회
- `/profile-edit`: 내 정보 수정

로컬 기본 실행은 `Dongoh/FE/umcine`에서 `pnpm dev`입니다. 이번 화면 검증은 별도 Vite 서버 `http://127.0.0.1:5177`에서 진행했습니다. 이 검증 서버의 포트는 회원 서버 CORS에 지정된 기본 5173과 다르므로, 실제 회원가입 서버 연동 검증을 완료했다고 기록하지 않습니다.

## 검증한 결과

- `pnpm build`: TypeScript 검사·Vite 빌드 통과.
- `pnpm lint`: 통과.
- 로그인 입력값을 바꾸면 화면 상태가 바뀌고, 유효한 입력 제출 후 확인 안내가 표시되며 수정하면 안내가 사라졌습니다.
- 내 정보 수정에서 이메일·닉네임·소개를 바꾸고 저장했을 때 `/profile`에서 같은 값을 확인했습니다.
- 수정 중 잘못된 닉네임은 저장을 막고, 취소 시 이전 저장값이 유지됐습니다.
- 각 화면의 직접 URL에 HTTP 200과 앱 진입점을 확인했습니다. 실제 브라우저에서도 `/login`, `/profile`, `/profile-edit`, 잘못된 영화 번호 `/movies/0`의 안내를 확인했습니다.
- 실제 TMDB 데이터의 영화 목록·검색·상세 화면과 영화 이미지를 확인했습니다.
- 목록에서 북마크 추가 → 상세의 해제 상태 → 새로고침 후 유지 → 검색에서 같은 해제 상태 → 검색에서 해제 후 목록의 추가 상태를 확인했습니다.
- 390px 화면에서 로그인·프로필·영화 목록을 확인했고 가로 넘침이 없었습니다. 모바일에서는 영화 카드가 2열로 배치됩니다.
- Query Devtools에서 목록 1페이지와 2페이지의 키가 분리되고 1페이지가 fresh·success·idle 상태임을 확인했습니다. 재방문 전후 `dataUpdateCount`는 1, `dataUpdatedAt`은 동일해 fresh 캐시가 재사용되었습니다.
- 확인한 브라우저 콘솔의 error·warn 로그는 없었습니다.
- 컴포넌트 핸들러 테스트에서 로그인 입력/검증/제출, 프로필 저장/취소/trim/조회 반영, 메뉴 이동·라우트 등록, 출처 로고·문구를 검증했습니다.
- 기존 회원가입의 15가지 검증 사례와 API 요청·성공/실패 처리, Zustand persist·QueryClient 캐시 테스트도 통과했습니다.

남은 검증 범위: 브라우저 프로세스 자체의 종료·재실행과 별도 Network 패널의 직접 캡처는 수행하지 않았습니다. 탭 새로고침 및 Query Devtools 결과와 혼동하지 않습니다. 실제 회원 서버·DB와 현재 프론트의 가입 연동도 별도 실행 검증이 필요합니다.

## 화면 증빙

- [로그인 데스크톱](evidence/login-desktop.jpg)
- [로그인 모바일](evidence/login-mobile.jpg)
- [수정 후 프로필 데스크톱](evidence/profile-desktop.jpg)
- [수정 후 프로필 모바일](evidence/profile-mobile.jpg)
- [영화 상세·북마크](evidence/movie-detail.jpg)
- [영화 검색·북마크 공유](evidence/movie-search.jpg)
- [Query Devtools 캐시](evidence/query-cache.jpg), [읽은 Devtools 상태](evidence/query-cache.txt)

## TMDB 출처 기준

[TMDB 공식 FAQ](https://developer.themoviedb.org/docs/faq)의 로고 및 출처 안내를 참고했습니다. 기존 로컬 로고를 사용하고 종횡비를 유지하며 앱 브랜드보다 작게 배치했습니다. 공통 footer에 데이터 출처 영역과 공식 안내 문구가 있습니다.

## 저장 파일과 실제 코드

### 1. `src/components/bookmark-button.tsx`

- **저장 경로:** [`Dongoh/FE/umcine/src/components/bookmark-button.tsx`](../umcine/src/components/bookmark-button.tsx)
- **구분:** 수정
- **추가·수정한 내용:** 북마크 텍스트 버튼의 기본·선택 상태를 Tailwind의 aria-pressed variant로 표현합니다.

<details>
<summary>현재 전체 코드</summary>

```tsx
import { useBookmarkStore } from "../stores/bookmark-store";

interface BookmarkButtonProps {
  movieId: number;
}

export function BookmarkButton({ movieId }: BookmarkButtonProps) {
  const isBookmarked = useBookmarkStore((state) =>
    state.bookmarkedMovieIds.includes(movieId),
  );
  const toggleBookmark = useBookmarkStore(
    (state) => state.toggleBookmark,
  );

  return (
    <button
      className="rounded-md border border-gray-300 bg-white px-[9px] py-1.5 text-xs font-extrabold text-gray-700 aria-pressed:border-blue-600 aria-pressed:bg-blue-50 aria-pressed:text-blue-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
      type="button"
      aria-pressed={isBookmarked}
      onClick={() => toggleBookmark(movieId)}
    >
      {isBookmarked ? "북마크 해제" : "북마크 추가"}
    </button>
  );
}
```

</details>

### 2. `src/components/layout/data-credits.tsx`

- **저장 경로:** [`Dongoh/FE/umcine/src/components/layout/data-credits.tsx`](../umcine/src/components/layout/data-credits.tsx)
- **구분:** 추가
- **추가·수정한 내용:** 기존 로컬 TMDB 로고와 공식 출처 문구를 데이터 출처 영역에 표시합니다. 모든 페이지에 공통으로 노출됩니다.

<details>
<summary>현재 전체 코드</summary>

```tsx
export function DataCredits() {
  return (
    <footer className="border-t border-gray-200 bg-white px-5 py-7">
      <section className="mx-auto max-w-[1120px] text-xs leading-5 text-gray-500" aria-labelledby="data-credits-title">
        <h2 id="data-credits-title" className="mb-3 font-bold text-gray-700">데이터 출처</h2>
        <a href="https://www.themoviedb.org" target="_blank" rel="noreferrer" aria-label="TMDB 홈페이지 (새 창)">
          <img src="/images/logos/tmdb-logo.svg" alt="TMDB" className="mb-3 h-auto w-24" />
        </a>
        <p>영화 정보와 이미지는 TMDB에서 제공합니다.</p>
        <p>This product uses the TMDB API but is not endorsed or certified by TMDB.</p>
      </section>
    </footer>
  );
}
```

</details>

### 3. `src/components/layout/header.tsx`

- **저장 경로:** [`Dongoh/FE/umcine/src/components/layout/header.tsx`](../umcine/src/components/layout/header.tsx)
- **구분:** 수정
- **추가·수정한 내용:** 영화·검색·내 정보·로그인 메뉴를 라우터 Link로 연결합니다. 계정 화면의 헤더 크기와 모바일 메뉴를 Tailwind 및 cn으로 처리합니다.

<details>
<summary>현재 전체 코드</summary>

```tsx
import { Link, useRouterState } from "@tanstack/react-router";
import { cn } from "../../utils/cn";

export function Header() {
  const isAccountPage = useRouterState({
    select: (state) => ["/signup", "/login", "/profile", "/profile-edit"].includes(state.location.pathname.replace(/\/$/, "")),
  });

  return (
    <header className="sticky top-0 z-20 border-b border-gray-200 bg-white/95 backdrop-blur-md">
      <nav className={cn("mx-auto flex w-[calc(100%_-_32px)] items-center justify-between gap-4", isAccountPage ? "min-h-[88px] max-w-[1280px] max-[600px]:min-h-[72px]" : "min-h-16 max-w-[1120px]")} aria-label="주요 메뉴">
        <div className="flex min-w-0 items-center gap-6 sm:gap-10">
          <Link className="inline-flex shrink-0 items-center gap-2.5 text-xl font-extrabold tracking-tight text-gray-900" to="/" aria-label="UMCine 홈">
            <span className="grid size-8 place-items-center rounded-lg border-2 border-gray-900"><img src="/icons/movie-icons/movie.svg" alt="" aria-hidden="true" className="size-6" /></span>
            <span>UMCine</span>
          </Link>
          <div className="hidden items-center gap-6 text-[13px] font-semibold text-gray-600 sm:flex">
            <Link to="/" activeOptions={{ exact: true }} activeProps={{ className: "text-indigo-600" }}>영화</Link>
            <Link to="/search" activeProps={{ className: "text-indigo-600" }}>검색</Link>
            <Link to="/profile" activeProps={{ className: "text-indigo-600" }}>내 정보</Link>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <Link to="/profile" className="text-xs font-semibold text-gray-600 sm:hidden">내 정보</Link>
          <Link to="/search" className="grid size-10 place-items-center rounded-lg border border-gray-200 max-[380px]:hidden" aria-label="영화 검색">
            <img src="/icons/movie-icons/search.svg" alt="" aria-hidden="true" className="size-5 opacity-65" />
          </Link>
          <Link to="/login" className="rounded-md bg-[#4b60e8] px-4 py-2.5 text-[13px] font-bold text-white hover:bg-[#3d50d4]">로그인</Link>
        </div>
      </nav>
    </header>
  );
}
```

</details>

### 4. `src/components/movie-card.tsx`

- **저장 경로:** [`Dongoh/FE/umcine/src/components/movie-card.tsx`](../umcine/src/components/movie-card.tsx)
- **구분:** 수정
- **추가·수정한 내용:** 초기 보관용 카드에 남아 있던 기존 CSS 클래스도 정리했습니다. 현재 화면에서 사용하는 카드는 components/movies/movie-card.tsx입니다.

<details>
<summary>현재 전체 코드</summary>

```tsx
﻿import type { Movie } from "../types/movie";

interface MovieCardProps {
  movie: Movie;
  onToggleBookmark: (movieId: number) => void;
}

export default function MovieCard({ movie, onToggleBookmark }: MovieCardProps) {
  const bookmarkIcon = movie.isBookmarked
    ? "/icons/movie-icons/bookmark.svg"
    : "/icons/movie-icons/bookmark-outline.svg";

  return (
    <li className="min-w-0">
      <div className="relative overflow-hidden rounded-lg bg-gray-900">
        <img className="block aspect-[7/8] w-full object-cover" src={movie.posterPath} alt={`${movie.title} 포스터`} />
        <button
          className="absolute top-2 right-2 inline-flex size-9 items-center justify-center rounded-lg border border-white/80 p-[7px] transition-[background,transform] duration-150 hover:-translate-y-px"
          type="button"
          aria-label={`${movie.title} 북마크 ${movie.isBookmarked ? "해제" : "추가"}`}
          aria-pressed={movie.isBookmarked}
          onClick={() => onToggleBookmark(movie.id)}
        >
          <img src={bookmarkIcon} alt="" aria-hidden="true" />
        </button>
      </div>

      <div className="pt-[9px] [&_h2]:m-0 [&_h2]:truncate [&_h2]:text-[13px] [&_h2]:leading-[1.35] [&_h2]:font-extrabold [&_h2]:text-gray-900 [&_span]:mt-1 [&_span]:block [&_span]:text-xs [&_span]:text-gray-400">
        <h2>{movie.title}</h2>
        <p>{movie.originalTitle}</p>
        <span>{movie.releaseDate}</span>
      </div>
    </li>
  );
}
```

</details>

### 5. `src/components/movies/movie-card.tsx`

- **저장 경로:** [`Dongoh/FE/umcine/src/components/movies/movie-card.tsx`](../umcine/src/components/movies/movie-card.tsx)
- **구분:** 수정
- **추가·수정한 내용:** 포스터·제목·날짜·북마크 스타일을 Tailwind로 옮기고 북마크 상태별 색상은 cn으로 조합합니다.

<details>
<summary>현재 전체 코드</summary>

```tsx
import { Link } from "@tanstack/react-router";
import type { TmdbMovieListItem } from "../../api/movies/models";
import { cn } from "../../utils/cn";

interface MovieCardProps {
  movie: TmdbMovieListItem & { isBookmarked: boolean };
  onToggleBookmark: (movieId: number) => void;
}

export default function MovieCard({ movie, onToggleBookmark }: MovieCardProps) {
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : null;
  const bookmarkIcon = movie.isBookmarked
    ? "/icons/movie-icons/bookmark.svg"
    : "/icons/movie-icons/bookmark-outline.svg";

  return (
    <li className="min-w-0">
      <div className="relative overflow-hidden rounded-lg bg-gray-900">
        <Link
          className="block"
          to="/movies/$movieId"
          params={{ movieId: String(movie.id) }}
        >
          {posterUrl ? (
            <img
              className="block aspect-[7/8] w-full object-cover"
              src={posterUrl}
              alt={`${movie.title} 포스터`}
            />
          ) : (
            <div className="block aspect-[7/8] w-full object-cover grid place-items-center bg-gray-200 text-gray-500">
              이미지 없음
            </div>
          )}
        </Link>
        <button
          className={cn(
            "absolute top-2 right-2 inline-flex size-9 items-center justify-center rounded-lg border border-white/80 p-[7px] transition-[background,transform] duration-150 hover:-translate-y-px",
            movie.isBookmarked ? "bg-blue-600" : "bg-black/60",
          )}
          type="button"
          aria-label={`${movie.title} 북마크 ${movie.isBookmarked ? "해제" : "추가"}`}
          aria-pressed={movie.isBookmarked}
          onClick={() => onToggleBookmark(movie.id)}
        >
          <img
            className="h-full w-full"
            src={bookmarkIcon}
            alt=""
            aria-hidden="true"
          />
        </button>
      </div>

      <div className="pt-[9px] [&_h2]:m-0 [&_h2]:truncate [&_h2]:text-[13px] [&_h2]:leading-[1.35] [&_h2]:font-extrabold [&_h2]:text-gray-900 [&_span]:mt-1 [&_span]:block [&_span]:text-xs [&_span]:text-gray-400">
        <Link to="/movies/$movieId" params={{ movieId: String(movie.id) }}>
          <h2>{movie.title}</h2>
        </Link>
        <span>{movie.release_date}</span>
      </div>
    </li>
  );
}
```

</details>

### 6. `src/components/movies/movie-grid.tsx`

- **저장 경로:** [`Dongoh/FE/umcine/src/components/movies/movie-grid.tsx`](../umcine/src/components/movies/movie-grid.tsx)
- **구분:** 수정
- **추가·수정한 내용:** 기존 store 연결을 유지하면서 2열·3열·5열 반응형 그리드를 Tailwind로 표현합니다.

<details>
<summary>현재 전체 코드</summary>

```tsx
import type { TmdbMovieListItem } from "../../api/movies/models";
import { useBookmarkStore } from "../../stores/bookmark-store";
import MovieCard from "./movie-card";

interface MovieGridProps {
  movies: TmdbMovieListItem[];
}

export default function MovieGrid({ movies: apiMovies }: MovieGridProps) {
  const bookmarkedMovieIds = useBookmarkStore(
    (state) => state.bookmarkedMovieIds,
  );
  const toggleBookmark = useBookmarkStore((state) => state.toggleBookmark);

  const movies = apiMovies.map((movie) => ({
    ...movie,
    isBookmarked: bookmarkedMovieIds.includes(movie.id),
  }));

  return (
    <ul
      aria-label="영화 카드 목록"
      className="m-0 grid list-none grid-cols-2 gap-x-5 gap-y-7 p-0 md:grid-cols-3 lg:grid-cols-5 max-[720px]:gap-3.5"
    >
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onToggleBookmark={toggleBookmark}
        />
      ))}
    </ul>
  );
}
```

</details>

### 7. `src/components/movies/pagination.tsx`

- **저장 경로:** [`Dongoh/FE/umcine/src/components/movies/pagination.tsx`](../umcine/src/components/movies/pagination.tsx)
- **구분:** 수정
- **추가·수정한 내용:** 현재 페이지·hover·disabled·focus 상태와 아이콘 크기를 Tailwind variant로 처리합니다.

<details>
<summary>현재 전체 코드</summary>

```tsx
interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  page,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 0) return null;

  const startPage = Math.floor((page - 1) / 5) * 5 + 1;
  const pages = Array.from(
    { length: Math.min(5, totalPages - startPage + 1) },
    (_, index) => startPage + index,
  );

  return (
    <nav className="mt-8 flex items-center justify-center gap-2" aria-label="영화 목록 페이지">
      <button
        type="button"
        className="inline-flex size-8 items-center justify-center rounded-md border-0 bg-transparent p-0 text-xs font-semibold text-gray-500 enabled:hover:bg-gray-200 aria-[current=page]:bg-zinc-900 aria-[current=page]:text-white aria-[current=page]:hover:bg-zinc-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:cursor-default disabled:opacity-35 [&_img]:size-4 [&_img]:opacity-60"
        aria-label="이전 페이지"
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
      >
        <img src="/icons/movie-icons/chevron-left.svg" alt="" />
      </button>

      {pages.map((pageNumber) => (
        <button
          key={pageNumber}
          type="button"
          className="inline-flex size-8 items-center justify-center rounded-md border-0 bg-transparent p-0 text-xs font-semibold text-gray-500 enabled:hover:bg-gray-200 aria-[current=page]:bg-zinc-900 aria-[current=page]:text-white aria-[current=page]:hover:bg-zinc-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:cursor-default disabled:opacity-35 [&_img]:size-4 [&_img]:opacity-60"
          aria-label={`${pageNumber}페이지`}
          aria-current={page === pageNumber ? "page" : undefined}
          onClick={() => onPageChange(pageNumber)}
        >
          {pageNumber}
        </button>
      ))}

      <button
        type="button"
        className="inline-flex size-8 items-center justify-center rounded-md border-0 bg-transparent p-0 text-xs font-semibold text-gray-500 enabled:hover:bg-gray-200 aria-[current=page]:bg-zinc-900 aria-[current=page]:text-white aria-[current=page]:hover:bg-zinc-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:cursor-default disabled:opacity-35 [&_img]:size-4 [&_img]:opacity-60"
        aria-label="다음 페이지"
        disabled={page >= totalPages}
        onClick={() => onPageChange(page + 1)}
      >
        <img src="/icons/movie-icons/chevron-right.svg" alt="" />
      </button>
    </nav>
  );
}
```

</details>

### 8. `src/index.css`

- **저장 경로:** [`Dongoh/FE/umcine/src/index.css`](../umcine/src/index.css)
- **구분:** 수정
- **추가·수정한 내용:** 공개 영화 화면의 기존 사용자 정의 CSS를 제거하고 Tailwind import와 전역 기본 설정만 유지합니다.

<details>
<summary>현재 전체 코드</summary>

```css
@import "tailwindcss";

@layer base {
  :root {
    font-family: system-ui, "Segoe UI", Roboto, sans-serif;
    color: #0f172a;
    background: #f4f6fb;
    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body { margin: 0; min-width: 320px; }
  #root { min-height: 100svh; }
  button, input, textarea { font: inherit; }
  button:not(:disabled), a { cursor: pointer; }
  button:disabled { cursor: not-allowed; }
}
```

</details>

### 9. `src/pages/auth/login-page.tsx`

- **저장 경로:** [`Dongoh/FE/umcine/src/pages/auth/login-page.tsx`](../umcine/src/pages/auth/login-page.tsx)
- **구분:** 추가
- **추가·수정한 내용:** 이메일·비밀번호를 useState로 관리합니다. 입력값 검사·새로고침 방지·화면 확인 안내와 회원가입 링크를 구현합니다. 실제 인증 요청이나 토큰 저장은 하지 않습니다.

<details>
<summary>현재 전체 코드</summary>

```tsx
import { useState, type SubmitEvent } from "react";
import { Link } from "@tanstack/react-router";
import "./signup-page.css";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [hasCheckedForm, setHasCheckedForm] = useState(false);
  const isEmailValid = EMAIL_REGEX.test(form.email.trim());
  const showEmailError = form.email.length > 0 && !isEmailValid;
  const canSubmit = isEmailValid && form.password.length > 0;

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canSubmit) return;
    setHasCheckedForm(true);
    // 워크북에 따라 실제 로그인 API와 토큰 처리는 8주차에서 연결합니다.
  }

  return (
    <main className="signup-page">
      <section className="signup-panel" aria-labelledby="login-title">
        <h1 id="login-title">로그인</h1>
        <p className="mb-6 text-sm leading-6 text-gray-500">UMCine에서 나만의 영화 취향을 기록해 보세요.</p>
        <form className="signup-form" onSubmit={handleSubmit} noValidate>
          <div className="signup-field">
            <label htmlFor="login-email">이메일</label>
            <div className={`signup-input-row${showEmailError ? " signup-input-row--error" : ""}`}>
              <input id="login-email" name="email" type="email" autoComplete="email" placeholder="name@example.com"
                value={form.email} required aria-invalid={showEmailError}
                aria-describedby={showEmailError ? "login-email-error" : undefined}
                onChange={(event) => { setForm({ ...form, email: event.target.value }); setHasCheckedForm(false); }} />
            </div>
            {showEmailError && <p id="login-email-error" className="signup-field__error" role="status">올바른 이메일 형식으로 입력해 주세요.</p>}
          </div>
          <div className="signup-field">
            <label htmlFor="login-password">비밀번호</label>
            <div className="signup-input-row">
              <input id="login-password" name="password" type="password" autoComplete="current-password" placeholder="비밀번호 입력"
                value={form.password} required
                onChange={(event) => { setForm({ ...form, password: event.target.value }); setHasCheckedForm(false); }} />
            </div>
          </div>
          <button className="signup-submit-button" type="submit" disabled={!canSubmit}>로그인</button>
          {hasCheckedForm && <p className="text-sm text-green-700" role="status">입력한 정보를 확인했어요.</p>}
        </form>
        <p className="signup-panel__login">아직 계정이 없나요? <Link to="/signup" className="font-bold text-[#4b60e8]">회원가입</Link></p>
      </section>
    </main>
  );
}
```

</details>

### 10. `src/pages/auth/signup-page.css`

- **저장 경로:** [`Dongoh/FE/umcine/src/pages/auth/signup-page.css`](../umcine/src/pages/auth/signup-page.css)
- **구분:** 수정
- **추가·수정한 내용:** 계정 폼에서 재사용할 스타일은 유지하고 Tailwind로 교체한 헤더 CSS만 제거합니다. 3주차 공개 영화 화면은 이 CSS에 의존하지 않습니다.

<details>
<summary>현재 전체 코드</summary>

```css
.signup-page {
  --signup-primary: #4b60e8;
  display: grid;
  min-height: calc(100svh - 88px);
  padding: 64px 24px;
  place-items: center;
  background: #f6f7f9;
  color: #17191e;
}

.signup-panel {
  width: min(100%, 430px);
}

.signup-panel h1 {
  margin: 0 0 20px;
  font-size: 32px;
  font-weight: 800;
  letter-spacing: -1.2px;
  line-height: 1.25;
}

.signup-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.signup-field label {
  display: block;
  margin-bottom: 6px;
  font-size: 12px;
  font-weight: 700;
  line-height: 18px;
}

.signup-input-row {
  display: flex;
  align-items: center;
  min-height: 48px;
  overflow: hidden;
  border: 1px solid #e1e5ec;
  border-radius: 6px;
  background: #fff;
  transition: border-color 150ms;
}

.signup-input-row:focus-within {
  outline: 2px solid #4b60e830;
  outline-offset: 1px;
  border-color: var(--signup-primary);
}

.signup-input-row--error {
  border-color: #dc2626;
}

.signup-input-row input {
  width: 100%;
  min-width: 0;
  min-height: 46px;
  flex: 1;
  border: 0;
  outline: 0;
  padding: 0 16px;
  background: transparent;
  color: #17191e;
  font-size: 14px;
}

.signup-input-row input::placeholder {
  color: #929bad;
  opacity: 1;
}

.signup-duplicate-button {
  min-height: 44px;
  flex-shrink: 0;
  border: 0;
  padding: 0 14px;
  background: transparent;
  color: var(--signup-primary);
  font-size: 12px;
  font-weight: 700;
}

.signup-duplicate-button:disabled,
.signup-panel__login button:disabled,
.signup-header button:disabled {
  cursor: not-allowed;
}

.signup-field__hint,
.signup-field__error {
  margin: 5px 0 0;
  font-size: 11px;
  line-height: 1.5;
}

.signup-field__hint {
  color: #8e96a5;
}

.signup-field__error {
  color: #c52222;
}

.signup-submit-button {
  width: 100%;
  min-height: 48px;
  border: 0;
  border-radius: 7px;
  background: var(--signup-primary);
  color: #fff;
  font-size: 14px;
  font-weight: 700;
}

.signup-submit-button:hover:not(:disabled) {
  background: #3d50d4;
}

.signup-submit-button:disabled {
  cursor: not-allowed;
  opacity: 0.55;
}

.signup-submit-button:focus-visible,
.signup-header a:focus-visible {
  outline: 3px solid #8494ff;
  outline-offset: 3px;
}

.signup-panel__login {
  margin: 16px 0 0;
  text-align: center;
  color: #7b8494;
  font-size: 12px;
}

.signup-panel__login button {
  border: 0;
  padding: 0;
  background: transparent;
  color: var(--signup-primary);
  font: inherit;
  font-weight: 700;
}

@media (max-width: 600px) {
  .signup-page { min-height: calc(100svh - 72px); padding: 48px 20px; }
  .signup-panel h1 { font-size: 28px; }
}
```

</details>

### 11. `src/pages/auth/signup-page.tsx`

- **저장 경로:** [`Dongoh/FE/umcine/src/pages/auth/signup-page.tsx`](../umcine/src/pages/auth/signup-page.tsx)
- **구분:** 수정
- **추가·수정한 내용:** 기존 노션 3.3·3.4의 API와 상태 로직을 유지하고 하단 로그인 링크를 연결했습니다. 문서의 안내대로 로그인 페이지가 생긴 뒤 useNavigate 주석을 해제해 가입 성공 시 /login으로 이동합니다.

<details>
<summary>현재 전체 코드</summary>

```tsx
import { useState } from "react";
import { checkEmailDuplicate } from "@/api/members/check-email-duplicate";
import { checkNicknameDuplicate } from "@/api/members/check-nickname-duplicate";
import { signup } from "@/api/members/signup";
import { Link, useNavigate } from "@tanstack/react-router";
import "./signup-page.css";

// 이메일 형식 검사
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// 영문 대소문자, 숫자, 특수문자(!@#$%^&*)를 모두 포함해 8자 이상
const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/;

const DEFAULT_FORM = {
  email: "",
  nickname: "",
  password: "",
  passwordConfirm: "",
};

type DefaultFormKey = keyof typeof DEFAULT_FORM;
type DefaultFormValue = (typeof DEFAULT_FORM)[DefaultFormKey];

const DEFAULT_DUPLICATE_CHECK = {
  isChecking: false,
  isAvailable: false,
};

type DuplicateCheckKey = "email" | "nickname";

export function SignupPage() {
  const [form, setForm] = useState(DEFAULT_FORM);
  const [duplicateCheck, setDuplicateCheck] = useState({
    email: DEFAULT_DUPLICATE_CHECK,
    nickname: DEFAULT_DUPLICATE_CHECK,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  // 입력값의 유효성 검사
  const isEmailValid = EMAIL_REGEX.test(form.email.trim());
  const isNicknameValid =
    form.nickname.trim().length >= 2 && form.nickname.trim().length <= 12;
  const isPasswordValid = PASSWORD_REGEX.test(form.password);
  const isPasswordConfirmValid =
    form.passwordConfirm.length > 0 && form.password === form.passwordConfirm;

  // 입력을 시작한 필드에만 오류 표시
  const showEmailError = form.email.length > 0 && !isEmailValid;
  const showNicknameError = form.nickname.length > 0 && !isNicknameValid;
  const showPasswordError = form.password.length > 0 && !isPasswordValid;
  const showPasswordConfirmError =
    form.passwordConfirm.length > 0 && !isPasswordConfirmValid;

  // 모든 입력값이 유효하면 제출 버튼 활성화
  const isFormValid =
    isEmailValid &&
    isNicknameValid &&
    isPasswordValid &&
    isPasswordConfirmValid;

  // 입력 조건과 두 중복 확인을 모두 통과해야 제출 가능
  const canSubmit =
    isFormValid &&
    duplicateCheck.email.isAvailable &&
    duplicateCheck.nickname.isAvailable;

  const handleChangeField = (key: DefaultFormKey, value: DefaultFormValue) => {
    if (key === "email" || key === "nickname") {
      if (duplicateCheck[key].isChecking) return;
      // 확인한 값을 바꾸면 다시 중복 확인해야 함
      setDuplicateCheck((prev) => ({ ...prev, [key]: DEFAULT_DUPLICATE_CHECK }));
    }
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleCheckDuplicate = async (key: DuplicateCheckKey) => {
    const isValid = key === "email" ? isEmailValid : isNicknameValid;
    if (!isValid || duplicateCheck[key].isChecking) return;

    const label = key === "email" ? "이메일" : "닉네임";
    setDuplicateCheck((prev) => ({
      ...prev,
      [key]: { isChecking: true, isAvailable: false },
    }));

    try {
      const response =
        key === "email"
          ? await checkEmailDuplicate(form.email.trim())
          : await checkNicknameDuplicate(form.nickname.trim());
      const isAvailable = response.available;
      setDuplicateCheck((prev) => ({
        ...prev,
        [key]: { ...prev[key], isAvailable },
      }));
      alert(
        isAvailable
          ? `사용할 수 있는 ${label}이에요.`
          : `이미 사용 중인 ${label}이에요.`,
      );
    } catch {
      setDuplicateCheck((prev) => ({
        ...prev,
        [key]: { ...prev[key], isAvailable: false },
      }));
      alert("중복 확인에 실패했어요. 다시 시도해 주세요.");
    } finally {
      setDuplicateCheck((prev) => ({
        ...prev,
        [key]: { ...prev[key], isChecking: false },
      }));
    }
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!canSubmit || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const response = await signup({
        email: form.email.trim(),
        nickname: form.nickname.trim(),
        password: form.password,
      });
      alert(response.message);
      navigate({ to: "/login" });
    } catch {
      alert("회원가입에 실패했어요. 다시 시도해 주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // noValidate는 폼 제출 시 브라우저의 기본 유효성 검사를 끔
  return (
    <main className="signup-page">
      <section className="signup-panel" aria-labelledby="signup-title">
        <h1 id="signup-title">회원가입</h1>

        <form className="signup-form" onSubmit={handleSubmit} noValidate>
          <div className="signup-field">
            <label htmlFor="signup-email">이메일</label>
            <div
              className={`signup-input-row${showEmailError ? " signup-input-row--error" : ""}`}
            >
              <input
                id="signup-email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="name@example.com"
                value={form.email}
                disabled={duplicateCheck.email.isChecking}
                onChange={(event) =>
                  handleChangeField("email", event.target.value)
                }
                aria-invalid={showEmailError}
                aria-describedby={showEmailError ? "signup-email-error" : undefined}
                required
              />
              <button
                className="signup-duplicate-button"
                type="button"
                disabled={!isEmailValid || duplicateCheck.email.isChecking}
                onClick={() => handleCheckDuplicate("email")}
              >
                {duplicateCheck.email.isChecking ? "확인 중" : "중복 확인"}
              </button>
            </div>
            {showEmailError && (
              <p className="signup-field__error" id="signup-email-error" role="status">
                올바른 이메일 형식으로 입력해 주세요.
              </p>
            )}
          </div>

          <div className="signup-field">
            <label htmlFor="signup-nickname">닉네임</label>
            <div
              className={`signup-input-row${showNicknameError ? " signup-input-row--error" : ""}`}
            >
              <input
                id="signup-nickname"
                name="nickname"
                type="text"
                autoComplete="nickname"
                placeholder="2–12자"
                value={form.nickname}
                disabled={duplicateCheck.nickname.isChecking}
                onChange={(event) =>
                  handleChangeField("nickname", event.target.value)
                }
                aria-invalid={showNicknameError}
                aria-describedby={showNicknameError ? "signup-nickname-error" : undefined}
                required
              />
              <button
                className="signup-duplicate-button"
                type="button"
                disabled={!isNicknameValid || duplicateCheck.nickname.isChecking}
                onClick={() => handleCheckDuplicate("nickname")}
              >
                {duplicateCheck.nickname.isChecking ? "확인 중" : "중복 확인"}
              </button>
            </div>
            {showNicknameError && (
              <p className="signup-field__error" id="signup-nickname-error" role="status">
                닉네임은 2~12자로 입력해 주세요.
              </p>
            )}
          </div>

          <div className="signup-field">
            <label htmlFor="signup-password">비밀번호</label>
            <div
              className={`signup-input-row${showPasswordError ? " signup-input-row--error" : ""}`}
            >
              <input
                id="signup-password"
                name="password"
                type="password"
                autoComplete="new-password"
                placeholder="8자 이상"
                value={form.password}
                onChange={(event) =>
                  handleChangeField("password", event.target.value)
                }
                aria-invalid={showPasswordError}
                aria-describedby="signup-password-help"
                required
              />
            </div>
            <p
              className={showPasswordError ? "signup-field__error" : "signup-field__hint"}
              id="signup-password-help"
              role={showPasswordError ? "status" : undefined}
            >
              영문 대소문자, 숫자, 특수문자(!@#$%^&amp;*)를 모두 포함해 8자 이상
              입력해 주세요.
            </p>
          </div>

          <div className="signup-field">
            <label htmlFor="signup-password-confirm">비밀번호 확인</label>
            <div
              className={`signup-input-row${showPasswordConfirmError ? " signup-input-row--error" : ""}`}
            >
              <input
                id="signup-password-confirm"
                name="passwordConfirm"
                type="password"
                autoComplete="new-password"
                placeholder="다시 입력"
                value={form.passwordConfirm}
                onChange={(event) =>
                  handleChangeField("passwordConfirm", event.target.value)
                }
                aria-invalid={showPasswordConfirmError}
                aria-describedby={showPasswordConfirmError ? "signup-password-confirm-error" : undefined}
                required
              />
            </div>
            {showPasswordConfirmError && (
              <p className="signup-field__error" id="signup-password-confirm-error" role="status">
                비밀번호가 일치하지 않아요.
              </p>
            )}
          </div>

          <button
            className="signup-submit-button"
            type="submit"
            disabled={!canSubmit || isSubmitting}
          >
            {isSubmitting ? "가입 중" : "가입하기"}
          </button>
        </form>

        <p className="signup-panel__login">
          이미 계정이 있나요?{" "}
          <Link to="/login" className="font-bold text-[#4b60e8]">
            로그인
          </Link>
        </p>
      </section>
    </main>
  );
}
```

</details>

### 12. `src/pages/members/profile-edit-page.tsx`

- **저장 경로:** [`Dongoh/FE/umcine/src/pages/members/profile-edit-page.tsx`](../umcine/src/pages/members/profile-edit-page.tsx)
- **구분:** 추가
- **추가·수정한 내용:** 프로필을 입력 상태로 복사하고 이메일·닉네임 길이와 소개 길이를 검사합니다. 저장하면 store를 갱신하고 조회 화면으로 이동하며 취소하면 저장하지 않습니다.

<details>
<summary>현재 전체 코드</summary>

```tsx
import { useState, type SubmitEvent } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { useProfileStore } from "../../stores/profile-store";
import "../auth/signup-page.css";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ProfileEditPage() {
  const profile = useProfileStore((state) => state.profile);
  const updateProfile = useProfileStore((state) => state.updateProfile);
  const [form, setForm] = useState(profile);
  const navigate = useNavigate();
  const isEmailValid = EMAIL_REGEX.test(form.email.trim());
  const isNicknameValid = form.nickname.trim().length >= 2 && form.nickname.trim().length <= 12;
  const canSave = isEmailValid && isNicknameValid && form.bio.length <= 200;

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canSave) return;
    updateProfile({ email: form.email.trim(), nickname: form.nickname.trim(), bio: form.bio.trim() });
    navigate({ to: "/profile" });
  }

  return (
    <main className="signup-page">
      <section className="signup-panel" aria-labelledby="profile-edit-title">
        <h1 id="profile-edit-title">내 정보 수정</h1>
        <form className="signup-form" onSubmit={handleSubmit} noValidate>
          <div className="signup-field">
            <label htmlFor="profile-email">이메일</label>
            <div className={`signup-input-row${!isEmailValid ? " signup-input-row--error" : ""}`}>
              <input id="profile-email" type="email" autoComplete="email" value={form.email} required aria-invalid={!isEmailValid}
                aria-describedby={!isEmailValid ? "profile-email-error" : undefined}
                onChange={(event) => setForm({ ...form, email: event.target.value })} />
            </div>
            {!isEmailValid && <p id="profile-email-error" className="signup-field__error" role="status">올바른 이메일 형식으로 입력해 주세요.</p>}
          </div>
          <div className="signup-field">
            <label htmlFor="profile-nickname">닉네임</label>
            <div className={`signup-input-row${!isNicknameValid ? " signup-input-row--error" : ""}`}>
              <input id="profile-nickname" type="text" autoComplete="nickname" value={form.nickname} required aria-invalid={!isNicknameValid}
                aria-describedby={!isNicknameValid ? "profile-nickname-error" : undefined}
                onChange={(event) => setForm({ ...form, nickname: event.target.value })} />
            </div>
            {!isNicknameValid && <p id="profile-nickname-error" className="signup-field__error" role="status">닉네임은 2~12자로 입력해 주세요.</p>}
          </div>
          <div className="signup-field">
            <label htmlFor="profile-bio">소개 <span className="font-normal text-gray-400">(선택)</span></label>
            <textarea id="profile-bio" maxLength={200} rows={4} value={form.bio}
              onChange={(event) => setForm({ ...form, bio: event.target.value })}
              className="w-full resize-y rounded-md border border-gray-200 bg-white p-4 text-sm outline-indigo-500" />
            <p className="mt-1 text-right text-xs text-gray-400">{form.bio.length}/200</p>
          </div>
          <button className="signup-submit-button" type="submit" disabled={!canSave}>수정 완료</button>
          <Link to="/profile" className="text-center text-sm font-semibold text-gray-500">취소</Link>
        </form>
      </section>
    </main>
  );
}
```

</details>

### 13. `src/pages/members/profile-page.tsx`

- **저장 경로:** [`Dongoh/FE/umcine/src/pages/members/profile-page.tsx`](../umcine/src/pages/members/profile-page.tsx)
- **구분:** 추가
- **추가·수정한 내용:** 미리보기 프로필의 이메일·닉네임·소개·북마크 수를 표시하고 수정 화면으로 이동합니다. 수정 완료 메시지를 읽어 표시합니다.

<details>
<summary>현재 전체 코드</summary>

```tsx
import { Link } from "@tanstack/react-router";
import { useProfileStore } from "../../stores/profile-store";
import { useBookmarkStore } from "../../stores/bookmark-store";

export function ProfilePage() {
  const profile = useProfileStore((state) => state.profile);
  const hasUpdated = useProfileStore((state) => state.hasUpdated);
  const bookmarkCount = useBookmarkStore((state) => state.bookmarkedMovieIds.length);

  return (
    <main className="grid min-h-[calc(100svh_-_88px)] place-items-center bg-[#f6f7f9] px-5 py-16">
      <section className="w-full max-w-[560px]" aria-labelledby="profile-title">
        <div className="mb-7 flex items-center justify-between gap-4">
          <h1 id="profile-title" className="text-[32px] font-extrabold tracking-tight text-gray-900">내 정보</h1>
          <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600">미리보기</span>
        </div>
        {hasUpdated && <p className="mb-5 text-sm text-green-700" role="status">프로필을 수정했어요.</p>}
        <div className="rounded-xl border border-gray-200 bg-white p-6 sm:p-8">
          <div className="mb-7 flex items-center gap-4">
            <div className="grid size-16 shrink-0 place-items-center rounded-full bg-indigo-50 text-2xl font-bold text-indigo-600" aria-hidden="true">{profile.nickname.slice(0, 1)}</div>
            <div className="min-w-0">
              <h2 className="break-words text-xl font-bold text-gray-900">{profile.nickname}</h2>
              <p className="mt-1 text-sm text-gray-500">나의 영화 기록</p>
            </div>
          </div>
          <dl className="space-y-5 text-sm">
            <div><dt className="mb-1.5 font-semibold text-gray-500">이메일</dt><dd className="break-all text-gray-900">{profile.email}</dd></div>
            <div><dt className="mb-1.5 font-semibold text-gray-500">닉네임</dt><dd className="break-words text-gray-900">{profile.nickname}</dd></div>
            <div><dt className="mb-1.5 font-semibold text-gray-500">소개</dt><dd className="whitespace-pre-wrap break-words leading-6 text-gray-900">{profile.bio || "아직 소개가 없어요."}</dd></div>
            <div><dt className="mb-1.5 font-semibold text-gray-500">북마크한 영화</dt><dd className="font-bold text-indigo-600">{bookmarkCount}편</dd></div>
          </dl>
          <Link to="/profile-edit" className="mt-8 block rounded-md bg-[#4b60e8] px-4 py-3 text-center text-sm font-bold text-white hover:bg-[#3d50d4]">내 정보 수정</Link>
        </div>
      </section>
    </main>
  );
}
```

</details>

### 14. `src/pages/movies/movie-detail-page.tsx`

- **저장 경로:** [`Dongoh/FE/umcine/src/pages/movies/movie-detail-page.tsx`](../umcine/src/pages/movies/movie-detail-page.tsx)
- **구분:** 수정
- **추가·수정한 내용:** 배경·영화 정보·포스터·평점 영역 UI와 반응형 배치를 Tailwind로 옮기고 배경 유무는 cn으로 조합합니다. 동적인 배경 이미지 URL만 inline style로 유지합니다.

<details>
<summary>현재 전체 코드</summary>

```tsx
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "@tanstack/react-router";
import { getMovieDetail } from "../../api/movies/get-movie-detail";
import { cn } from "../../utils/cn";
import { BookmarkButton } from "../../components/bookmark-button";
import { getMovieDetailErrorMessage } from "../../utils/movies/get-movie-detail-error-message";
import {
  getTmdbBackdropUrl,
  getTmdbPosterUrl,
} from "../../utils/movies/tmdb-image";

export function MovieDetailPage() {
  const { movieId } = useParams({ from: "/movies/$movieId" });
  const parsedMovieId = Number(movieId);

  return <MovieDetailPageContent key={movieId} movieId={parsedMovieId} />;
}

function MovieDetailPageContent({ movieId }: { movieId: number }) {
  const isValidMovieId = Number.isInteger(movieId) && movieId > 0;
  const movieDetailQuery = useQuery({
    queryKey: ["movies", "detail", movieId],
    queryFn: () => getMovieDetail(movieId),
    enabled: isValidMovieId,
  });

  if (!isValidMovieId) {
    return <MovieDetailStatus message="올바르지 않은 영화 번호예요." isError />;
  }

  if (movieDetailQuery.isPending) {
    return <MovieDetailStatus message="영화 정보를 불러오는 중이에요." />;
  }

  if (movieDetailQuery.isError) {
    return (
      <MovieDetailStatus
        message={getMovieDetailErrorMessage(movieDetailQuery.error)}
        isError
      />
    );
  }

  const movie = movieDetailQuery.data;

  if (!movie) {
    return <MovieDetailStatus message="영화를 찾을 수 없어요." isError />;
  }

  const posterUrl = getTmdbPosterUrl(movie.poster_path);
  const backdropUrl = getTmdbBackdropUrl(movie.backdrop_path);
  const genreNames = movie.genres.map((genre) => genre.name).join(", ");
  const runtimeText = formatRuntime(movie.runtime);

  return (
    <main className="min-h-[calc(100svh_-_64px)] bg-[#f4f6fb]">
      <section
        className={cn(
          "min-h-[300px] bg-cover bg-center text-white max-[720px]:min-h-[260px]",
          !backdropUrl && "bg-gray-600",
        )}
        style={{
          backgroundImage: backdropUrl
            ? `linear-gradient(90deg, rgba(17, 24, 39, 0.9), rgba(17, 24, 39, 0.44), rgba(17, 24, 39, 0.1)), url(${backdropUrl})`
            : undefined,
        }}
      >
        <div className="mx-auto w-[calc(100%_-_32px)] max-w-[1120px] max-[720px]:w-[calc(100%_-_24px)] flex min-h-[300px] flex-col justify-between pt-[22px] pb-[34px] max-[720px]:min-h-[260px]">
          <Link className="w-fit rounded-md bg-gray-900/35 px-[9px] py-[7px] text-[13px] font-extrabold text-white" to="/">
            &lt; 영화 목록
          </Link>
          {!backdropUrl && (
            <p className="m-0 self-center">이미지 없음</p>
          )}
          <div className="max-w-[640px] [&_h1]:mb-2 [&_h1]:text-[34px] [&_h1]:leading-[1.2] [&_h1]:font-black [&_h1]:text-white max-[720px]:[&_h1]:text-[27px] [&_p]:mb-1.5 [&_p]:text-sm [&_p]:font-bold [&_p]:text-white/85 [&_span]:block [&_span]:text-[13px] [&_span]:font-bold [&_span]:text-white/90">
            <h1>{movie.title}</h1>
            <p>{movie.original_title}</p>
            <span>
              {movie.release_date} · {genreNames} · {runtimeText}
            </span>
          </div>
        </div>
      </section>

      <section className="mx-auto w-[calc(100%_-_32px)] max-w-[1120px] max-[720px]:w-[calc(100%_-_24px)] grid grid-cols-[170px_minmax(0,1fr)_280px] gap-7 pt-7 pb-24 max-[1000px]:grid-cols-[140px_minmax(0,1fr)] max-[720px]:grid-cols-[110px_minmax(0,1fr)] max-[720px]:gap-[18px] max-[720px]:pb-14">
        {posterUrl ? (
          <img
            className="aspect-[2/3] w-[170px] self-start rounded-lg object-cover shadow-[0_18px_36px_rgba(15,23,42,0.22)] max-[1000px]:w-[140px] max-[720px]:w-[110px]"
            src={posterUrl}
            alt={`${movie.title} 포스터`}
          />
        ) : (
          <div className="aspect-[2/3] w-[170px] self-start rounded-lg object-cover shadow-[0_18px_36px_rgba(15,23,42,0.22)] max-[1000px]:w-[140px] max-[720px]:w-[110px] grid place-items-center bg-gray-200 text-[13px] text-gray-500">
            이미지 없음
          </div>
        )}

        <article className="pr-3 [&_h2]:mb-3.5 [&_h2]:text-lg [&_h2]:leading-[1.35] [&_h2]:font-black [&_h2]:text-gray-900 [&_p]:mb-3 [&_p]:text-sm [&_p]:leading-7 [&_p]:text-gray-600 [&_button]:mt-1">
          {movie.tagline && <h2>{movie.tagline}</h2>}
          <p>{movie.overview}</p>
          <p>
            {genreNames && `이 영화는 ${genreNames} 장르의 작품입니다. `}
            {typeof movie.runtime === "number"
              ? `러닝타임은 ${runtimeText}입니다.`
              : runtimeText}
          </p>
          <BookmarkButton movieId={movie.id} />
        </article>

        <aside className="border-l border-gray-200 pl-7 max-[1000px]:col-span-full max-[1000px]:border-t max-[1000px]:border-l-0 max-[1000px]:pt-[22px] max-[1000px]:pl-0 [&_h2]:mb-1 [&_h2]:text-lg [&_h2]:font-black [&_h2]:text-gray-900 [&_p]:mb-3.5 [&_p]:text-[13px] [&_p]:text-gray-400 [&_textarea]:block [&_textarea]:min-h-[116px] [&_textarea]:w-full [&_textarea]:resize-y [&_textarea]:rounded-md [&_textarea]:border [&_textarea]:border-gray-200 [&_textarea]:bg-white [&_textarea]:p-3 [&_textarea]:text-[13px] [&_textarea]:leading-normal [&_textarea]:text-gray-900 [&_textarea]:outline-blue-600 [&_textarea]:placeholder:text-gray-400" aria-labelledby="rating-title">
          <h2 id="rating-title">내 평점</h2>
          <p>별점을 주고 한줄평을 남겨보세요.</p>
          <div className="mb-3.5 flex gap-[7px] [&_button]:inline-flex [&_button]:size-7 [&_button]:items-center [&_button]:justify-center [&_button]:rounded-md [&_button]:border [&_button]:border-gray-200 [&_button]:bg-white [&_img]:size-[15px]" aria-label="별점 선택">
            {[1, 2, 3, 4, 5].map((star) => (
              <button key={star} type="button" aria-label={`${star}점`}>
                <img src="/icons/movie-icons/star.svg" alt="" aria-hidden="true" />
              </button>
            ))}
          </div>
          <textarea
            aria-label="한줄평"
            placeholder="한줄평 또는 느낀 점을 남겨보세요."
          />
          <button className="mt-3.5 w-full rounded-md border-0 bg-gray-900 p-3 text-[13px] font-black text-white" type="button">
            평점 저장
          </button>
        </aside>
      </section>
    </main>
  );
}

function MovieDetailStatus({
  message,
  isError = false,
}: {
  message: string;
  isError?: boolean;
}) {
  return (
    <main className="min-h-[calc(100svh_-_64px)] bg-[#f4f6fb]">
      <div className="mx-auto w-[calc(100%_-_32px)] max-w-[1120px] max-[720px]:w-[calc(100%_-_24px)] py-10 text-gray-500 [&_a]:text-blue-600">
        <Link to="/">&lt; 영화 목록</Link>
        <p role={isError ? "alert" : "status"}>{message}</p>
      </div>
    </main>
  );
}

function formatRuntime(runtime: number | null) {
  if (typeof runtime !== "number") return "상영 시간 정보가 없어요.";

  const hours = Math.floor(runtime / 60);
  const minutes = runtime % 60;

  return hours > 0 ? `${hours}시간 ${minutes}분` : `${minutes}분`;
}
```

</details>

### 15. `src/pages/movies/movie-list-page.tsx`

- **저장 경로:** [`Dongoh/FE/umcine/src/pages/movies/movie-list-page.tsx`](../umcine/src/pages/movies/movie-list-page.tsx)
- **구분:** 수정
- **추가·수정한 내용:** 조회 로직은 유지하고 목록 제목·여백·상태 메시지에 Tailwind를 적용합니다.

<details>
<summary>현재 전체 코드</summary>

```tsx
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getMovies } from "../../api/movies/get-movies";
import MovieGrid from "../../components/movies/movie-grid";
import Pagination from "../../components/movies/pagination";

export function MovieListPage() {
  const [page, setPage] = useState(1);

  const moviesQuery = useQuery({
    queryKey: ["movies", "list", { page }],
    queryFn: () => getMovies({ page }),
  });

  const movies = moviesQuery.data?.results ?? [];
  const totalPages = moviesQuery.data?.total_pages ?? 0;

  const handlePageChange = (nextPage: number) => {
    setPage(nextPage);
  };

  return (
    <main className="mx-auto w-[calc(100%_-_32px)] max-w-[1120px] max-[720px]:w-[calc(100%_-_24px)] pt-10 pb-14">
      <section className="mb-6 [&_p]:mb-1.5 [&_p]:text-[13px] [&_p]:font-extrabold [&_p]:text-blue-600 [&_h1]:text-[28px] [&_h1]:leading-tight [&_h1]:font-extrabold [&_h1]:text-gray-900">
        <p>UMC Movie</p>
        <h1>영화 목록</h1>
      </section>

      {moviesQuery.isPending ? (
        <p className="mt-7 text-center text-gray-500" role="status">
          영화 목록을 불러오는 중이에요.
        </p>
      ) : moviesQuery.isError ? (
        <p className="mt-7 text-center text-gray-500" role="alert">
          {moviesQuery.error.message}
        </p>
      ) : movies.length === 0 ? (
        <p className="mt-7 text-center text-gray-500" role="status">
          조건에 맞는 영화가 없어요.
        </p>
      ) : (
        <>
          <MovieGrid movies={movies} />
          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </main>
  );
}
```

</details>

### 16. `src/pages/movies/search-page.tsx`

- **저장 경로:** [`Dongoh/FE/umcine/src/pages/movies/search-page.tsx`](../umcine/src/pages/movies/search-page.tsx)
- **구분:** 수정
- **추가·수정한 내용:** 검색 폼·결과 카드·포스터·상태 문구·모바일 레이아웃을 Tailwind로 표현합니다.

<details>
<summary>현재 전체 코드</summary>

```tsx
import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate, useSearch } from "@tanstack/react-router";
import { useState, type SubmitEvent } from "react";
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
  const searchQuery = useQuery({
    queryKey: ["movies", "search", { query: normalizedQuery }],
    queryFn: () => searchMovies({ query: normalizedQuery }),
    enabled: normalizedQuery.length > 0,
  });

  const movies = searchQuery.data?.results ?? [];

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextQuery = searchText.trim();

    navigate({
      search: nextQuery ? { query: nextQuery } : {},
    });
  }

  return (
    <main className="mx-auto w-[calc(100%_-_32px)] max-w-[1120px] max-[720px]:w-[calc(100%_-_24px)] pt-10 pb-14">
      <section className="grid min-h-60 place-items-center border-b border-gray-200 text-center [&_h1]:text-[28px] [&_h1]:leading-tight [&_h1]:font-extrabold [&_h1]:text-gray-900">
        <h1>어떤 영화를 찾으시나요?</h1>
        <form className="mt-6 flex w-full max-w-[520px] overflow-hidden rounded-md border border-gray-300 bg-white shadow-[0_10px_26px_rgba(15,23,42,0.08)] focus-within:ring-2 focus-within:ring-blue-500 [&_input]:min-w-0 [&_input]:flex-1 [&_input]:border-0 [&_input]:px-3.5 [&_input]:py-[13px] [&_input]:text-gray-900 [&_input]:outline-none [&_input]:placeholder:text-gray-400 [&_button]:border-l [&_button]:border-gray-300 [&_button]:bg-blue-600 [&_button]:px-[18px] [&_button]:text-sm [&_button]:font-extrabold [&_button]:text-white" onSubmit={handleSubmit}>
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
        <p className="mt-7 text-center text-gray-500" role="status">
          검색어를 입력해 주세요.
        </p>
      ) : searchQuery.isLoading ? (
        <p className="mt-7 text-center text-gray-500" role="status">
          검색 결과를 불러오는 중이에요.
        </p>
      ) : searchQuery.isError ? (
        <p className="mt-7 text-center text-gray-500" role="alert">
          {searchQuery.error.message}
        </p>
      ) : (
        <section className="pt-8">
          <div className="mb-[18px] flex items-end justify-between gap-4 max-[720px]:flex-col max-[720px]:items-start max-[720px]:gap-1 [&_h2]:text-[22px] [&_h2]:font-extrabold [&_h2]:text-gray-900 [&_p]:text-[13px] [&_p]:font-bold [&_p]:text-gray-500">
            <h2>'{query}' 검색 결과</h2>
            <p>영화 {movies.length}편</p>
          </div>
          {searchQuery.isSuccess && movies.length === 0 ? (
            <p className="mt-7 text-center text-gray-500" role="status">
              검색 결과가 없어요.
            </p>
          ) : (
            <ul className="m-0 grid list-none grid-cols-1 gap-3.5 p-0 md:grid-cols-2">
              {movies.map((movie) => {
                const posterUrl = getTmdbPosterUrl(movie.poster_path);

                return (
                  <li className="grid min-h-[138px] grid-cols-[92px_minmax(0,1fr)] gap-3.5 rounded-lg border border-gray-200 bg-white p-2.5" key={movie.id}>
                    {posterUrl ? (
                      <img
                        className="h-[118px] w-[92px] rounded-md object-cover"
                        src={posterUrl}
                        alt={`${movie.title} 포스터`}
                      />
                    ) : (
                      <div className="h-[118px] w-[92px] rounded-md object-cover grid place-items-center bg-gray-200 text-[13px] text-gray-500">
                        이미지 없음
                      </div>
                    )}
                    <div className="min-w-0 [&_h3]:mt-0.5 [&_h3]:mb-1 [&_h3]:truncate [&_h3]:text-[15px] [&_h3]:leading-[1.35] [&_h3]:font-extrabold [&_h3]:text-gray-900 [&_p]:line-clamp-2 [&_p]:text-xs [&_p]:leading-normal [&_p]:text-gray-600">
                      <h3>{movie.title}</h3>
                      <p className="mb-1.5 truncate text-gray-400!">
                        {movie.original_title} · {movie.release_date}
                      </p>
                      <p>{movie.overview}</p>
                      <div className="mt-2.5 flex items-center gap-2 [&_a]:rounded-md [&_a]:border [&_a]:border-gray-300 [&_a]:bg-white [&_a]:px-[9px] [&_a]:py-1.5 [&_a]:text-xs [&_a]:font-extrabold [&_a]:text-blue-600">
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
```

</details>

### 17. `src/routes/__root.tsx`

- **저장 경로:** [`Dongoh/FE/umcine/src/routes/__root.tsx`](../umcine/src/routes/__root.tsx)
- **구분:** 수정
- **추가·수정한 내용:** 공통 Header·Outlet 뒤에 DataCredits를 배치합니다.

<details>
<summary>현재 전체 코드</summary>

```tsx
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { Header } from "../components/layout/header";
import { DataCredits } from "../components/layout/data-credits";

export const Route = createRootRoute({
  component: () => (
    <>
      <Header />
      <Outlet />
      <DataCredits />
    </>
  ),
  notFoundComponent: () => <main>페이지를 찾을 수 없어요.</main>,
});
```

</details>

### 18. `src/routes/login.tsx`

- **저장 경로:** [`Dongoh/FE/umcine/src/routes/login.tsx`](../umcine/src/routes/login.tsx)
- **구분:** 추가
- **추가·수정한 내용:** /login 경로에 LoginPage를 연결합니다.

<details>
<summary>현재 전체 코드</summary>

```tsx
import { createFileRoute } from "@tanstack/react-router";
import { LoginPage } from "@/pages/auth/login-page";

export const Route = createFileRoute("/login")({ component: LoginPage });
```

</details>

### 19. `src/routes/profile-edit.tsx`

- **저장 경로:** [`Dongoh/FE/umcine/src/routes/profile-edit.tsx`](../umcine/src/routes/profile-edit.tsx)
- **구분:** 추가
- **추가·수정한 내용:** /profile-edit 경로에 ProfileEditPage를 연결합니다. 별도 중첩 레이아웃이나 접근 제한을 만들지 않았습니다.

<details>
<summary>현재 전체 코드</summary>

```tsx
import { createFileRoute } from "@tanstack/react-router";
import { ProfileEditPage } from "@/pages/members/profile-edit-page";

export const Route = createFileRoute("/profile-edit")({ component: ProfileEditPage });
```

</details>

### 20. `src/routes/profile.tsx`

- **저장 경로:** [`Dongoh/FE/umcine/src/routes/profile.tsx`](../umcine/src/routes/profile.tsx)
- **구분:** 추가
- **추가·수정한 내용:** /profile 경로에 ProfilePage를 연결합니다.

<details>
<summary>현재 전체 코드</summary>

```tsx
import { createFileRoute } from "@tanstack/react-router";
import { ProfilePage } from "@/pages/members/profile-page";

export const Route = createFileRoute("/profile")({ component: ProfilePage });
```

</details>

### 21. `src/stores/profile-store.ts`

- **저장 경로:** [`Dongoh/FE/umcine/src/stores/profile-store.ts`](../umcine/src/stores/profile-store.ts)
- **구분:** 추가
- **추가·수정한 내용:** 서버 미연동 화면 퍼블리싱을 위한 메모리 상태입니다. 조회·수정 화면이 같은 데이터를 사용합니다. 새로고침하면 초기 미리보기 데이터로 돌아갑니다.

<details>
<summary>현재 전체 코드</summary>

```typescript
import { create } from "zustand";

export interface Profile {
  email: string;
  nickname: string;
  bio: string;
}

interface ProfileStore {
  profile: Profile;
  hasUpdated: boolean;
  updateProfile: (profile: Profile) => void;
}

// 7주차 화면 퍼블리싱용 데이터입니다. 서버의 내 정보 연동은 8주차 범위입니다.
export const useProfileStore = create<ProfileStore>((set) => ({
  profile: {
    email: "movie@example.com",
    nickname: "영화팬",
    bio: "좋아하는 영화를 기록하고 있어요.",
  },
  hasUpdated: false,
  updateProfile: (profile) => set({ profile, hasUpdated: true }),
}));
```

</details>

`src/routeTree.gen.ts`는 라우터 플러그인이 새 세 경로를 반영해 생성했습니다. 직접 편집하지 않았습니다.
