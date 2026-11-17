# FE 3주차 — 라우팅과 Tailwind CSS

## 필수 미션 보완 구현 — 최신 상태

공개 영화 목록·검색·상세·카드·페이지네이션·북마크·헤더를 Tailwind로 전환했습니다. index.css에는 Tailwind import와 전역 기본 스타일만 남겼습니다. 상태별 스타일은 cn과 aria variant를 사용합니다. 빌드·린트와 데스크톱·390px 영화 화면을 확인했습니다.

[추가·수정한 파일 경로, 전체 코드와 화면 증빙](./required-missions.md)

## 구현 전 필수 미션 점검 — 2026-11-11

**판정: 부분 완료.** 목록·검색·상세 라우트와 cn 사용은 확인했습니다. 다만 공개 영화 화면 대부분은 index.css의 기존 클래스에 의존하고 있어 필수 항목인 기존 CSS의 Tailwind 전환은 일부 적용 상태입니다.

**주차 구분 정정:** 아래 코드는 통합 전 로컬 week3 사본의 내용이며, 여기에 이미 4주차 북마크 작업이 섞여 있었습니다. GitHub의 실제 3주차·4주차 제출은 별도 PR입니다. 아래 북마크 코드를 3주차 필수 요구사항으로 해석하지 않습니다.

[전체 주차 점검과 GitHub 근거](./mission-audit.md)

> 통합 전 로컬 백업의 해당 주차 코드를 기준으로 작성했습니다. 실제 제출 시점은 Git 커밋·PR 이력을 확인하세요. 코드 블록은 줄바꿈과 후행 공백을 정리했으며, 현재 앱은 후속 주차 변경이 반영되어 있을 수 있습니다.

## 이번 주차에 추가·변경한 부분

- 파일 기반 라우팅으로 목록·상세·검색 화면 분리
- Zustand와 localStorage 기반 북마크 공유·저장

## 저장 위치와 변경 파일

모든 실제 앱 개발은 `Dongoh/FE/umcine`에서 이어갑니다. 이 문서는 당시 코드와 변경 이유를 보관합니다.

| 구분 | 당시 파일 경로 | 현재 위치 또는 보관 방식 |
| --- | --- | --- |
| 수정 | `Dongoh/FE/week3/umcine/package.json` | [`umcine/package.json`](../umcine/package.json) |
| 수정 | `Dongoh/FE/week3/umcine/pnpm-lock.yaml` | [`umcine/pnpm-lock.yaml`](../umcine/pnpm-lock.yaml) |
| 추가 | `Dongoh/FE/week3/umcine/src/components/bookmark-button.tsx` | [`umcine/src/components/bookmark-button.tsx`](../umcine/src/components/bookmark-button.tsx) |
| 추가 | `Dongoh/FE/week3/umcine/src/components/layout/header.tsx` | [`umcine/src/components/layout/header.tsx`](../umcine/src/components/layout/header.tsx) |
| 추가 | `Dongoh/FE/week3/umcine/src/components/movies/movie-card.tsx` | [`umcine/src/components/movies/movie-card.tsx`](../umcine/src/components/movies/movie-card.tsx) |
| 추가 | `Dongoh/FE/week3/umcine/src/components/movies/movie-grid.tsx` | [`umcine/src/components/movies/movie-grid.tsx`](../umcine/src/components/movies/movie-grid.tsx) |
| 추가 | `Dongoh/FE/week3/umcine/src/components/movies/pagination.tsx` | [`umcine/src/components/movies/pagination.tsx`](../umcine/src/components/movies/pagination.tsx) |
| 수정 | `Dongoh/FE/week3/umcine/src/index.css` | [`umcine/src/index.css`](../umcine/src/index.css) |
| 수정 | `Dongoh/FE/week3/umcine/src/main.tsx` | [`umcine/src/main.tsx`](../umcine/src/main.tsx) |
| 추가 | `Dongoh/FE/week3/umcine/src/pages/movies/movie-detail-page.tsx` | [`umcine/src/pages/movies/movie-detail-page.tsx`](../umcine/src/pages/movies/movie-detail-page.tsx) |
| 추가 | `Dongoh/FE/week3/umcine/src/pages/movies/movie-list-page.tsx` | [`umcine/src/pages/movies/movie-list-page.tsx`](../umcine/src/pages/movies/movie-list-page.tsx) |
| 추가 | `Dongoh/FE/week3/umcine/src/pages/movies/search-page.tsx` | [`umcine/src/pages/movies/search-page.tsx`](../umcine/src/pages/movies/search-page.tsx) |
| 추가 | `Dongoh/FE/week3/umcine/src/routeTree.gen.ts` | [`umcine/src/routeTree.gen.ts`](../umcine/src/routeTree.gen.ts) |
| 추가 | `Dongoh/FE/week3/umcine/src/routes/__root.tsx` | [`umcine/src/routes/__root.tsx`](../umcine/src/routes/__root.tsx) |
| 추가 | `Dongoh/FE/week3/umcine/src/routes/index.tsx` | [`umcine/src/routes/index.tsx`](../umcine/src/routes/index.tsx) |
| 추가 | `Dongoh/FE/week3/umcine/src/routes/movies.$movieId.tsx` | [`umcine/src/routes/movies.$movieId.tsx`](../umcine/src/routes/movies.$movieId.tsx) |
| 추가 | `Dongoh/FE/week3/umcine/src/routes/search.tsx` | [`umcine/src/routes/search.tsx`](../umcine/src/routes/search.tsx) |
| 추가 | `Dongoh/FE/week3/umcine/src/stores/bookmark-store.ts` | [`umcine/src/stores/bookmark-store.ts`](../umcine/src/stores/bookmark-store.ts) |
| 추가 | `Dongoh/FE/week3/umcine/src/utils/bookmark-storage.ts` | [`umcine/src/utils/bookmark-storage.ts`](../umcine/src/utils/bookmark-storage.ts) |
| 추가 | `Dongoh/FE/week3/umcine/src/utils/cn.ts` | [`umcine/src/utils/cn.ts`](../umcine/src/utils/cn.ts) |
| 수정 | `Dongoh/FE/week3/umcine/vite.config.ts` | [`umcine/vite.config.ts`](../umcine/vite.config.ts) |
| 제거 | `Dongoh/FE/week2/umcine/src/App.css` | 아래 비교 설명 및 이전 주차 문서 |
| 제거 | `Dongoh/FE/week2/umcine/src/App.tsx` | 아래 비교 설명 및 이전 주차 문서 |
| 제거 | `Dongoh/FE/week2/umcine/src/components/header.tsx` | 아래 비교 설명 및 이전 주차 문서 |
| 제거 | `Dongoh/FE/week2/umcine/src/components/movie-grid.tsx` | 아래 비교 설명 및 이전 주차 문서 |
| 제거 | `Dongoh/FE/week2/umcine/src/components/pagination.tsx` | 아래 비교 설명 및 이전 주차 문서 |

## 파일별 구현 내용과 코드

### 1. `package.json`

- **당시 저장 경로:** `Dongoh/FE/week3/umcine/package.json`
- **현재 저장 위치:** [`Dongoh/FE/umcine/package.json`](../umcine/package.json)
- **구현 내용:** 실행·빌드·린트 명령과 프로젝트에서 사용하는 패키지를 선언합니다.

**추가·수정한 부분** (`+` 추가, `-` 제거):

```diff
--- 이전 주차/package.json
+++ 3주차/package.json
@@ -10,11 +10,18 @@
     "preview": "vite preview"
   },
   "dependencies": {
+    "@tailwindcss/vite": "^4.3.3",
+    "@tanstack/react-router": "^1.170.40",
+    "clsx": "^2.1.1",
     "react": "^19.2.8",
-    "react-dom": "^19.2.8"
+    "react-dom": "^19.2.8",
+    "tailwind-merge": "^3.7.0",
+    "tailwindcss": "^4.3.3",
+    "zustand": "^5.0.15"
   },
   "devDependencies": {
     "@eslint/js": "^10.0.1",
+    "@tanstack/router-plugin": "^1.168.41",
     "@types/node": "^24.13.3",
     "@types/react": "^19.2.18",
     "@types/react-dom": "^19.2.7",
```

<details>
<summary>수정 후 전체 코드</summary>

```json
{
  "name": "umcine",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    "@tailwindcss/vite": "^4.3.3",
    "@tanstack/react-router": "^1.170.40",
    "clsx": "^2.1.1",
    "react": "^19.2.8",
    "react-dom": "^19.2.8",
    "tailwind-merge": "^3.7.0",
    "tailwindcss": "^4.3.3",
    "zustand": "^5.0.15"
  },
  "devDependencies": {
    "@eslint/js": "^10.0.1",
    "@tanstack/router-plugin": "^1.168.41",
    "@types/node": "^24.13.3",
    "@types/react": "^19.2.18",
    "@types/react-dom": "^19.2.7",
    "@vitejs/plugin-react": "^6.1.1",
    "eslint": "^10.10.0",
    "eslint-plugin-react-hooks": "^7.1.1",
    "eslint-plugin-react-refresh": "^0.5.6",
    "globals": "^17.12.0",
    "typescript": "~6.0.2",
    "typescript-eslint": "^8.69.0",
    "vite": "^8.3.0"
  }
}
```

</details>

### 2. `src/components/bookmark-button.tsx`

- **당시 저장 경로:** `Dongoh/FE/week3/umcine/src/components/bookmark-button.tsx`
- **현재 저장 위치:** [`Dongoh/FE/umcine/src/components/bookmark-button.tsx`](../umcine/src/components/bookmark-button.tsx)
- **구현 내용:** 영화 ID로 북마크 여부와 토글 함수를 구독하고 aria-pressed와 버튼 문구를 갱신합니다.

<details>
<summary>추가한 전체 코드</summary>

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
      className="bookmark-text-button"
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

### 3. `src/components/layout/header.tsx`

- **당시 저장 경로:** `Dongoh/FE/week3/umcine/src/components/layout/header.tsx`
- **현재 저장 위치:** [`Dongoh/FE/umcine/src/components/layout/header.tsx`](../umcine/src/components/layout/header.tsx)
- **구현 내용:** 공통 헤더에 영화 목록·검색 화면으로 이동하는 라우터 링크를 배치합니다.

<details>
<summary>추가한 전체 코드</summary>

```tsx
import { Link } from "@tanstack/react-router";

export function Header() {
  return (
    <header className="app-header">
      <nav className="app-header__nav" aria-label="주요 메뉴">
        <Link className="app-header__brand" to="/">
          <img src="/icons/movie-icons/movie.svg" alt="" aria-hidden="true" />
          <span>UMC Movie</span>
        </Link>
        <div className="app-header__links">
          <Link to="/">영화</Link>
          <Link to="/search">검색</Link>
        </div>
      </nav>
    </header>
  );
}
```

</details>

### 4. `src/components/movies/movie-card.tsx`

- **당시 저장 경로:** `Dongoh/FE/week3/umcine/src/components/movies/movie-card.tsx`
- **현재 저장 위치:** [`Dongoh/FE/umcine/src/components/movies/movie-card.tsx`](../umcine/src/components/movies/movie-card.tsx)
- **구현 내용:** 카드 컴포넌트를 movies 폴더로 분리하고 영화 상세 경로 링크와 북마크 버튼을 구성합니다.

<details>
<summary>추가한 전체 코드</summary>

```tsx
import { Link } from "@tanstack/react-router";
import type { Movie } from "../../types/movie";
import { cn } from "../../utils/cn";

interface MovieCardProps {
  movie: Movie;
  onToggleBookmark: (movieId: number) => void;
}

export default function MovieCard({ movie, onToggleBookmark }: MovieCardProps) {
  const bookmarkIcon = movie.isBookmarked
    ? "/icons/movie-icons/bookmark.svg"
    : "/icons/movie-icons/bookmark-outline.svg";

  return (
    <li className="movie-card min-w-0">
      <div className="movie-card__poster-wrap relative">
        <Link
          className="block"
          to="/movies/$movieId"
          params={{ movieId: String(movie.id) }}
        >
          <img
            className="movie-card__poster"
            src={movie.posterPath}
            alt={`${movie.title} 포스터`}
          />
        </Link>
        <button
          className={cn(
            "movie-card__bookmark-button absolute right-2 top-2 h-6 w-6 rounded border border-white/80 p-1",
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

      <div className="movie-card__content">
        <Link to="/movies/$movieId" params={{ movieId: String(movie.id) }}>
          <h2>{movie.title}</h2>
        </Link>
        <span>{movie.releaseDate}</span>
      </div>
    </li>
  );
}
```

</details>

### 5. `src/components/movies/movie-grid.tsx`

- **당시 저장 경로:** `Dongoh/FE/week3/umcine/src/components/movies/movie-grid.tsx`
- **현재 저장 위치:** [`Dongoh/FE/umcine/src/components/movies/movie-grid.tsx`](../umcine/src/components/movies/movie-grid.tsx)
- **구현 내용:** Zustand에서 북마크 ID와 토글 함수를 구독하고 정적 영화 데이터에 북마크 상태를 합쳐 카드에 전달합니다.

<details>
<summary>추가한 전체 코드</summary>

```tsx
import { movies as initialMovies } from "../../data/movies";
import { useBookmarkStore } from "../../stores/bookmark-store";
import MovieCard from "./movie-card";

export default function MovieGrid() {
  const bookmarkedMovieIds = useBookmarkStore(
    (state) => state.bookmarkedMovieIds,
  );
  const toggleBookmark = useBookmarkStore((state) => state.toggleBookmark);

  const movies = initialMovies.map((movie) => ({
    ...movie,
    isBookmarked: bookmarkedMovieIds.includes(movie.id),
  }));

  return (
    <ul
      aria-label="영화 카드 목록"
      className="movie-grid"
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

### 6. `src/components/movies/pagination.tsx`

- **당시 저장 경로:** `Dongoh/FE/week3/umcine/src/components/movies/pagination.tsx`
- **현재 저장 위치:** [`Dongoh/FE/umcine/src/components/movies/pagination.tsx`](../umcine/src/components/movies/pagination.tsx)
- **구현 내용:** 컴포넌트 정리 과정에서 만든 페이지네이션 자리입니다. 이 주차에는 실제 동작 코드가 없습니다.

<details>
<summary>추가한 전체 코드</summary>

```tsx
export {};
```

</details>

### 7. `src/index.css`

- **당시 저장 경로:** `Dongoh/FE/week3/umcine/src/index.css`
- **현재 저장 위치:** [`Dongoh/FE/umcine/src/index.css`](../umcine/src/index.css)
- **구현 내용:** 영화 목록·상세·검색·북마크 UI의 공통 스타일과 상태 표시 스타일을 정의합니다.

**추가·수정한 부분** (`+` 추가, `-` 제거):

```diff
--- 이전 주차/src/index.css
+++ 3주차/src/index.css
@@ -1,111 +1,570 @@
+@import "tailwindcss";
+
 :root {
-  --text: #6b6375;
-  --text-h: #08060d;
-  --bg: #fff;
-  --border: #e5e4e7;
-  --code-bg: #f4f3ec;
-  --accent: #aa3bff;
-  --accent-bg: rgba(170, 59, 255, 0.1);
-  --accent-border: rgba(170, 59, 255, 0.5);
-  --social-bg: rgba(244, 243, 236, 0.5);
-  --shadow:
-    rgba(0, 0, 0, 0.1) 0 10px 15px -3px, rgba(0, 0, 0, 0.05) 0 4px 6px -2px;
-
-  --sans: system-ui, 'Segoe UI', Roboto, sans-serif;
-  --heading: system-ui, 'Segoe UI', Roboto, sans-serif;
-  --mono: ui-monospace, Consolas, monospace;
-
-  font: 18px/145% var(--sans);
-  letter-spacing: 0.18px;
-  color-scheme: light dark;
-  color: var(--text);
-  background: var(--bg);
+  font-family: system-ui, "Segoe UI", Roboto, sans-serif;
+  color: #0f172a;
+  background: #f8fafc;
   font-synthesis: none;
   text-rendering: optimizeLegibility;
   -webkit-font-smoothing: antialiased;
   -moz-osx-font-smoothing: grayscale;
-
-  @media (max-width: 1024px) {
-    font-size: 16px;
-  }
-}
-
-@media (prefers-color-scheme: dark) {
-  :root {
-    --text: #9ca3af;
-    --text-h: #f3f4f6;
-    --bg: #16171d;
-    --border: #2e303a;
-    --code-bg: #1f2028;
-    --accent: #c084fc;
-    --accent-bg: rgba(192, 132, 252, 0.15);
-    --accent-border: rgba(192, 132, 252, 0.5);
-    --social-bg: rgba(47, 48, 58, 0.5);
-    --shadow:
-      rgba(0, 0, 0, 0.4) 0 10px 15px -3px, rgba(0, 0, 0, 0.25) 0 4px 6px -2px;
-  }
-
-  #social .button-icon {
-    filter: invert(1) brightness(2);
-  }
+}
+
+* {
+  box-sizing: border-box;
 }

 #root {
-  width: 1126px;
-  max-width: 100%;
+  min-height: 100svh;
+}
+
+body {
+  margin: 0;
+  min-width: 320px;
+  background: #f4f6fb;
+}
+
+a {
+  color: inherit;
+  text-decoration: none;
+}
+
+button,
+input {
+  font: inherit;
+}
+
+button {
+  cursor: pointer;
+}
+
+.app-header {
+  position: sticky;
+  top: 0;
+  z-index: 20;
+  border-bottom: 1px solid #e5e7eb;
+  background: rgba(255, 255, 255, 0.92);
+  backdrop-filter: blur(16px);
+}
+
+.app-header__nav {
+  display: flex;
+  align-items: center;
+  justify-content: space-between;
+  width: min(1120px, calc(100% - 32px));
+  min-height: 64px;
   margin: 0 auto;
+}
+
+.app-header__brand {
+  display: inline-flex;
+  align-items: center;
+  gap: 8px;
+  font-size: 15px;
+  font-weight: 800;
+  color: #111827;
+}
+
+.app-header__brand img {
+  width: 22px;
+  height: 22px;
+}
+
+.app-header__links {
+  display: inline-flex;
+  align-items: center;
+  gap: 6px;
+}
+
+.app-header__links a {
+  border-radius: 6px;
+  padding: 8px 12px;
+  font-size: 14px;
+  font-weight: 700;
+  color: #4b5563;
+}
+
+.app-header__links a:hover {
+  background: #eef2ff;
+  color: #2563eb;
+}
+
+.movie-list-page,
+.search-page {
+  width: min(1120px, calc(100% - 32px));
+  margin: 0 auto;
+  padding: 40px 0 56px;
+}
+
+.movie-list-page__heading {
+  margin-bottom: 24px;
+}
+
+.movie-list-page__heading p {
+  margin: 0 0 6px;
+  font-size: 13px;
+  font-weight: 800;
+  color: #2563eb;
+}
+
+.movie-list-page__heading h1,
+.search-page__hero h1 {
+  margin: 0;
+  font-size: 28px;
+  line-height: 1.25;
+  font-weight: 800;
+  color: #111827;
+}
+
+.movie-grid {
+  display: grid;
+  grid-template-columns: repeat(5, minmax(0, 1fr));
+  gap: 28px 20px;
+  margin: 0;
+  padding: 0;
+  list-style: none;
+}
+
+.movie-card {
+  min-width: 0;
+}
+
+.movie-card__poster-wrap {
+  overflow: hidden;
+  border-radius: 8px;
+  background: #111827;
+}
+
+.movie-card__poster {
+  display: block;
+  width: 100%;
+  aspect-ratio: 7 / 8;
+  object-fit: cover;
+}
+
+.movie-card__bookmark-button {
+  display: inline-flex;
+  align-items: center;
+  justify-content: center;
+  width: 36px;
+  height: 36px;
+  border-radius: 8px;
+  padding: 7px;
+  transition:
+    background 160ms ease,
+    transform 160ms ease;
+}
+
+.movie-card__bookmark-button:hover {
+  transform: translateY(-1px);
+}
+
+.movie-card__content {
+  padding-top: 9px;
+}
+
+.movie-card__content h2 {
+  margin: 0;
+  overflow: hidden;
+  font-size: 13px;
+  line-height: 1.35;
+  font-weight: 800;
+  color: #111827;
+  text-overflow: ellipsis;
+  white-space: nowrap;
+}
+
+.movie-card__content span {
+  display: block;
+  margin-top: 4px;
+  font-size: 12px;
+  color: #9ca3af;
+}
+
+.search-page__hero {
+  display: grid;
+  place-items: center;
+  min-height: 240px;
+  border-bottom: 1px solid #e5e7eb;
   text-align: center;
-  border-inline: 1px solid var(--border);
-  min-height: 100svh;
+}
+
+.search-form {
+  display: flex;
+  width: min(520px, 100%);
+  margin-top: 24px;
+  border: 1px solid #d1d5db;
+  border-radius: 6px;
+  background: #ffffff;
+  box-shadow: 0 10px 26px rgba(15, 23, 42, 0.08);
+}
+
+.search-form input {
+  min-width: 0;
+  flex: 1;
+  border: 0;
+  padding: 13px 14px;
+  color: #111827;
+  outline: none;
+}
+
+.search-form input::placeholder {
+  color: #9ca3af;
+}
+
+.search-form button {
+  border: 0;
+  border-left: 1px solid #d1d5db;
+  padding: 0 18px;
+  background: #2563eb;
+  color: #ffffff;
+  font-size: 14px;
+  font-weight: 800;
+}
+
+.search-page__empty {
+  margin: 28px 0 0;
+  text-align: center;
+  color: #6b7280;
+}
+
+.search-results {
+  padding-top: 32px;
+}
+
+.search-results__heading {
+  display: flex;
+  align-items: end;
+  justify-content: space-between;
+  gap: 16px;
+  margin-bottom: 18px;
+}
+
+.search-results__heading h2 {
+  margin: 0;
+  font-size: 22px;
+  font-weight: 800;
+  color: #111827;
+}
+
+.search-results__heading p {
+  margin: 0;
+  font-size: 13px;
+  font-weight: 700;
+  color: #6b7280;
+}
+
+.search-results__list {
+  display: grid;
+  grid-template-columns: repeat(2, minmax(0, 1fr));
+  gap: 14px;
+  margin: 0;
+  padding: 0;
+  list-style: none;
+}
+
+.search-result-card {
+  display: grid;
+  grid-template-columns: 92px minmax(0, 1fr);
+  gap: 14px;
+  min-height: 138px;
+  border: 1px solid #e5e7eb;
+  border-radius: 8px;
+  padding: 10px;
+  background: #ffffff;
+}
+
+.search-result-card > img {
+  width: 92px;
+  height: 118px;
+  border-radius: 6px;
+  object-fit: cover;
+}
+
+.search-result-card__content {
+  min-width: 0;
+}
+
+.search-result-card h3 {
+  margin: 2px 0 4px;
+  overflow: hidden;
+  font-size: 15px;
+  line-height: 1.35;
+  font-weight: 800;
+  color: #111827;
+  text-overflow: ellipsis;
+  white-space: nowrap;
+}
+
+.search-result-card p {
+  display: -webkit-box;
+  margin: 0;
+  overflow: hidden;
+  color: #4b5563;
+  font-size: 12px;
+  line-height: 1.5;
+  -webkit-box-orient: vertical;
+  -webkit-line-clamp: 2;
+}
+
+.search-result-card__meta {
+  margin-bottom: 6px;
+  color: #9ca3af;
+  -webkit-line-clamp: 1;
+}
+
+.search-result-card__actions {
+  display: flex;
+  align-items: center;
+  gap: 8px;
+  margin-top: 10px;
+}
+
+.search-result-card__actions a,
+.bookmark-text-button {
+  border: 1px solid #d1d5db;
+  border-radius: 6px;
+  padding: 6px 9px;
+  background: #ffffff;
+  color: #374151;
+  font-size: 12px;
+  font-weight: 800;
+}
+
+.bookmark-text-button[aria-pressed="true"] {
+  border-color: #2563eb;
+  background: #eff6ff;
+  color: #2563eb;
+}
+
+.search-result-card__actions a {
+  color: #2563eb;
+}
+
+.movie-detail-page {
+  min-height: calc(100svh - 64px);
+  background: #f4f6fb;
+}
+
+.movie-detail-hero {
+  min-height: 300px;
+  background-position: center;
+  background-size: cover;
+  color: #ffffff;
+}
+
+.movie-detail-hero__inner {
   display: flex;
   flex-direction: column;
-  box-sizing: border-box;
-}
-
-body {
-  margin: 0;
-}
-
-h1,
-h2 {
-  font-family: var(--heading);
-  font-weight: 500;
-  color: var(--text-h);
-}
-
-h1 {
-  font-size: 56px;
-  letter-spacing: -1.68px;
-  margin: 32px 0;
-  @media (max-width: 1024px) {
-    font-size: 36px;
-    margin: 20px 0;
-  }
-}
-h2 {
-  font-size: 24px;
-  line-height: 118%;
-  letter-spacing: -0.24px;
+  justify-content: space-between;
+  width: min(1120px, calc(100% - 32px));
+  min-height: 300px;
+  margin: 0 auto;
+  padding: 22px 0 34px;
+}
+
+.movie-detail-hero__back {
+  width: fit-content;
+  border-radius: 6px;
+  padding: 7px 9px;
+  background: rgba(17, 24, 39, 0.34);
+  color: #ffffff;
+  font-size: 13px;
+  font-weight: 800;
+}
+
+.movie-detail-hero__content {
+  max-width: 640px;
+}
+
+.movie-detail-hero__content h1 {
   margin: 0 0 8px;
-  @media (max-width: 1024px) {
-    font-size: 20px;
-  }
-}
-p {
-  margin: 0;
-}
-
-code,
-.counter {
-  font-family: var(--mono);
+  font-size: 34px;
+  line-height: 1.2;
+  font-weight: 900;
+  color: #ffffff;
+}
+
+.movie-detail-hero__content p {
+  margin: 0 0 6px;
+  color: rgba(255, 255, 255, 0.86);
+  font-size: 14px;
+  font-weight: 700;
+}
+
+.movie-detail-hero__content span {
+  display: block;
+  color: rgba(255, 255, 255, 0.9);
+  font-size: 13px;
+  font-weight: 700;
+}
+
+.movie-detail-content {
+  display: grid;
+  grid-template-columns: 170px minmax(0, 1fr) 280px;
+  gap: 28px;
+  width: min(1120px, calc(100% - 32px));
+  margin: 0 auto;
+  padding: 28px 0 96px;
+}
+
+.movie-detail-content__poster {
+  width: 170px;
+  border-radius: 8px;
+  box-shadow: 0 18px 36px rgba(15, 23, 42, 0.22);
+}
+
+.movie-detail-info {
+  padding-right: 12px;
+}
+
+.movie-detail-info h2 {
+  margin: 0 0 14px;
+  font-size: 18px;
+  line-height: 1.35;
+  font-weight: 900;
+  color: #111827;
+}
+
+.movie-detail-info p {
+  margin: 0 0 12px;
+  color: #4b5563;
+  font-size: 14px;
+  line-height: 1.75;
+}
+
+.movie-detail-info .bookmark-text-button {
+  margin-top: 4px;
+  border-color: #2563eb;
+  background: #2563eb;
+  color: #ffffff;
+}
+
+.movie-detail-info .bookmark-text-button[aria-pressed="true"] {
+  border-color: #1d4ed8;
+  background: #1d4ed8;
+  color: #ffffff;
+}
+
+.movie-rating-panel {
+  border-left: 1px solid #e5e7eb;
+  padding-left: 28px;
+}
+
+.movie-rating-panel h2 {
+  margin: 0 0 4px;
+  font-size: 18px;
+  font-weight: 900;
+  color: #111827;
+}
+
+.movie-rating-panel p {
+  margin: 0 0 14px;
+  color: #9ca3af;
+  font-size: 13px;
+}
+
+.movie-rating-panel__stars {
+  display: flex;
+  gap: 7px;
+  margin-bottom: 14px;
+}
+
+.movie-rating-panel__stars button {
   display: inline-flex;
-  border-radius: 4px;
-  color: var(--text-h);
-}
-
-code {
-  font-size: 15px;
-  line-height: 135%;
-  padding: 4px 8px;
-  background: var(--code-bg);
-}
+  align-items: center;
+  justify-content: center;
+  width: 28px;
+  height: 28px;
+  border: 1px solid #e5e7eb;
+  border-radius: 6px;
+  background: #ffffff;
+}
+
+.movie-rating-panel__stars img {
+  width: 15px;
+  height: 15px;
+}
+
+.movie-rating-panel textarea {
+  display: block;
+  width: 100%;
+  min-height: 116px;
+  resize: vertical;
+  border: 1px solid #e5e7eb;
+  border-radius: 6px;
+  padding: 12px;
+  background: #ffffff;
+  color: #111827;
+  font-size: 13px;
+  line-height: 1.5;
+  outline: none;
+}
+
+.movie-rating-panel textarea::placeholder {
+  color: #c0c4cc;
+}
+
+.movie-rating-panel__save {
+  width: 100%;
+  margin-top: 14px;
+  border: 0;
+  border-radius: 6px;
+  padding: 12px;
+  background: #111827;
+  color: #ffffff;
+  font-size: 13px;
+  font-weight: 900;
+}
+
+@media (max-width: 720px) {
+  .app-header__nav,
+  .movie-list-page,
+  .search-page,
+  .movie-detail-hero__inner,
+  .movie-detail-content {
+    width: min(100% - 24px, 1120px);
+  }
+
+  .movie-grid {
+    grid-template-columns: repeat(2, minmax(0, 1fr));
+    gap: 14px;
+  }
+
+  .search-results__heading {
+    align-items: start;
+    flex-direction: column;
+    gap: 4px;
+  }
+
+  .search-results__list {
+    grid-template-columns: 1fr;
+  }
+
+  .movie-detail-hero,
+  .movie-detail-hero__inner {
+    min-height: 260px;
+  }
+
+  .movie-detail-hero__content h1 {
+    font-size: 27px;
+  }
+
+  .movie-detail-content {
+    grid-template-columns: 110px minmax(0, 1fr);
+    gap: 18px;
+    padding-bottom: 56px;
+  }
+
+  .movie-detail-content__poster {
+    width: 110px;
+  }
+
+  .movie-rating-panel {
+    grid-column: 1 / -1;
+    border-left: 0;
+    border-top: 1px solid #e5e7eb;
+    padding-top: 22px;
+    padding-left: 0;
+  }
+}
```

<details>
<summary>수정 후 전체 코드</summary>

```css
@import "tailwindcss";

:root {
  font-family: system-ui, "Segoe UI", Roboto, sans-serif;
  color: #0f172a;
  background: #f8fafc;
  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

* {
  box-sizing: border-box;
}

#root {
  min-height: 100svh;
}

body {
  margin: 0;
  min-width: 320px;
  background: #f4f6fb;
}

a {
  color: inherit;
  text-decoration: none;
}

button,
input {
  font: inherit;
}

button {
  cursor: pointer;
}

.app-header {
  position: sticky;
  top: 0;
  z-index: 20;
  border-bottom: 1px solid #e5e7eb;
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(16px);
}

.app-header__nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: min(1120px, calc(100% - 32px));
  min-height: 64px;
  margin: 0 auto;
}

.app-header__brand {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 15px;
  font-weight: 800;
  color: #111827;
}

.app-header__brand img {
  width: 22px;
  height: 22px;
}

.app-header__links {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.app-header__links a {
  border-radius: 6px;
  padding: 8px 12px;
  font-size: 14px;
  font-weight: 700;
  color: #4b5563;
}

.app-header__links a:hover {
  background: #eef2ff;
  color: #2563eb;
}

.movie-list-page,
.search-page {
  width: min(1120px, calc(100% - 32px));
  margin: 0 auto;
  padding: 40px 0 56px;
}

.movie-list-page__heading {
  margin-bottom: 24px;
}

.movie-list-page__heading p {
  margin: 0 0 6px;
  font-size: 13px;
  font-weight: 800;
  color: #2563eb;
}

.movie-list-page__heading h1,
.search-page__hero h1 {
  margin: 0;
  font-size: 28px;
  line-height: 1.25;
  font-weight: 800;
  color: #111827;
}

.movie-grid {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 28px 20px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.movie-card {
  min-width: 0;
}

.movie-card__poster-wrap {
  overflow: hidden;
  border-radius: 8px;
  background: #111827;
}

.movie-card__poster {
  display: block;
  width: 100%;
  aspect-ratio: 7 / 8;
  object-fit: cover;
}

.movie-card__bookmark-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 8px;
  padding: 7px;
  transition:
    background 160ms ease,
    transform 160ms ease;
}

.movie-card__bookmark-button:hover {
  transform: translateY(-1px);
}

.movie-card__content {
  padding-top: 9px;
}

.movie-card__content h2 {
  margin: 0;
  overflow: hidden;
  font-size: 13px;
  line-height: 1.35;
  font-weight: 800;
  color: #111827;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.movie-card__content span {
  display: block;
  margin-top: 4px;
  font-size: 12px;
  color: #9ca3af;
}

.search-page__hero {
  display: grid;
  place-items: center;
  min-height: 240px;
  border-bottom: 1px solid #e5e7eb;
  text-align: center;
}

.search-form {
  display: flex;
  width: min(520px, 100%);
  margin-top: 24px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  background: #ffffff;
  box-shadow: 0 10px 26px rgba(15, 23, 42, 0.08);
}

.search-form input {
  min-width: 0;
  flex: 1;
  border: 0;
  padding: 13px 14px;
  color: #111827;
  outline: none;
}

.search-form input::placeholder {
  color: #9ca3af;
}

.search-form button {
  border: 0;
  border-left: 1px solid #d1d5db;
  padding: 0 18px;
  background: #2563eb;
  color: #ffffff;
  font-size: 14px;
  font-weight: 800;
}

.search-page__empty {
  margin: 28px 0 0;
  text-align: center;
  color: #6b7280;
}

.search-results {
  padding-top: 32px;
}

.search-results__heading {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 18px;
}

.search-results__heading h2 {
  margin: 0;
  font-size: 22px;
  font-weight: 800;
  color: #111827;
}

.search-results__heading p {
  margin: 0;
  font-size: 13px;
  font-weight: 700;
  color: #6b7280;
}

.search-results__list {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.search-result-card {
  display: grid;
  grid-template-columns: 92px minmax(0, 1fr);
  gap: 14px;
  min-height: 138px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 10px;
  background: #ffffff;
}

.search-result-card > img {
  width: 92px;
  height: 118px;
  border-radius: 6px;
  object-fit: cover;
}

.search-result-card__content {
  min-width: 0;
}

.search-result-card h3 {
  margin: 2px 0 4px;
  overflow: hidden;
  font-size: 15px;
  line-height: 1.35;
  font-weight: 800;
  color: #111827;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.search-result-card p {
  display: -webkit-box;
  margin: 0;
  overflow: hidden;
  color: #4b5563;
  font-size: 12px;
  line-height: 1.5;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.search-result-card__meta {
  margin-bottom: 6px;
  color: #9ca3af;
  -webkit-line-clamp: 1;
}

.search-result-card__actions {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 10px;
}

.search-result-card__actions a,
.bookmark-text-button {
  border: 1px solid #d1d5db;
  border-radius: 6px;
  padding: 6px 9px;
  background: #ffffff;
  color: #374151;
  font-size: 12px;
  font-weight: 800;
}

.bookmark-text-button[aria-pressed="true"] {
  border-color: #2563eb;
  background: #eff6ff;
  color: #2563eb;
}

.search-result-card__actions a {
  color: #2563eb;
}

.movie-detail-page {
  min-height: calc(100svh - 64px);
  background: #f4f6fb;
}

.movie-detail-hero {
  min-height: 300px;
  background-position: center;
  background-size: cover;
  color: #ffffff;
}

.movie-detail-hero__inner {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: min(1120px, calc(100% - 32px));
  min-height: 300px;
  margin: 0 auto;
  padding: 22px 0 34px;
}

.movie-detail-hero__back {
  width: fit-content;
  border-radius: 6px;
  padding: 7px 9px;
  background: rgba(17, 24, 39, 0.34);
  color: #ffffff;
  font-size: 13px;
  font-weight: 800;
}

.movie-detail-hero__content {
  max-width: 640px;
}

.movie-detail-hero__content h1 {
  margin: 0 0 8px;
  font-size: 34px;
  line-height: 1.2;
  font-weight: 900;
  color: #ffffff;
}

.movie-detail-hero__content p {
  margin: 0 0 6px;
  color: rgba(255, 255, 255, 0.86);
  font-size: 14px;
  font-weight: 700;
}

.movie-detail-hero__content span {
  display: block;
  color: rgba(255, 255, 255, 0.9);
  font-size: 13px;
  font-weight: 700;
}

.movie-detail-content {
  display: grid;
  grid-template-columns: 170px minmax(0, 1fr) 280px;
  gap: 28px;
  width: min(1120px, calc(100% - 32px));
  margin: 0 auto;
  padding: 28px 0 96px;
}

.movie-detail-content__poster {
  width: 170px;
  border-radius: 8px;
  box-shadow: 0 18px 36px rgba(15, 23, 42, 0.22);
}

.movie-detail-info {
  padding-right: 12px;
}

.movie-detail-info h2 {
  margin: 0 0 14px;
  font-size: 18px;
  line-height: 1.35;
  font-weight: 900;
  color: #111827;
}

.movie-detail-info p {
  margin: 0 0 12px;
  color: #4b5563;
  font-size: 14px;
  line-height: 1.75;
}

.movie-detail-info .bookmark-text-button {
  margin-top: 4px;
  border-color: #2563eb;
  background: #2563eb;
  color: #ffffff;
}

.movie-detail-info .bookmark-text-button[aria-pressed="true"] {
  border-color: #1d4ed8;
  background: #1d4ed8;
  color: #ffffff;
}

.movie-rating-panel {
  border-left: 1px solid #e5e7eb;
  padding-left: 28px;
}

.movie-rating-panel h2 {
  margin: 0 0 4px;
  font-size: 18px;
  font-weight: 900;
  color: #111827;
}

.movie-rating-panel p {
  margin: 0 0 14px;
  color: #9ca3af;
  font-size: 13px;
}

.movie-rating-panel__stars {
  display: flex;
  gap: 7px;
  margin-bottom: 14px;
}

.movie-rating-panel__stars button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  background: #ffffff;
}

.movie-rating-panel__stars img {
  width: 15px;
  height: 15px;
}

.movie-rating-panel textarea {
  display: block;
  width: 100%;
  min-height: 116px;
  resize: vertical;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  padding: 12px;
  background: #ffffff;
  color: #111827;
  font-size: 13px;
  line-height: 1.5;
  outline: none;
}

.movie-rating-panel textarea::placeholder {
  color: #c0c4cc;
}

.movie-rating-panel__save {
  width: 100%;
  margin-top: 14px;
  border: 0;
  border-radius: 6px;
  padding: 12px;
  background: #111827;
  color: #ffffff;
  font-size: 13px;
  font-weight: 900;
}

@media (max-width: 720px) {
  .app-header__nav,
  .movie-list-page,
  .search-page,
  .movie-detail-hero__inner,
  .movie-detail-content {
    width: min(100% - 24px, 1120px);
  }

  .movie-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 14px;
  }

  .search-results__heading {
    align-items: start;
    flex-direction: column;
    gap: 4px;
  }

  .search-results__list {
    grid-template-columns: 1fr;
  }

  .movie-detail-hero,
  .movie-detail-hero__inner {
    min-height: 260px;
  }

  .movie-detail-hero__content h1 {
    font-size: 27px;
  }

  .movie-detail-content {
    grid-template-columns: 110px minmax(0, 1fr);
    gap: 18px;
    padding-bottom: 56px;
  }

  .movie-detail-content__poster {
    width: 110px;
  }

  .movie-rating-panel {
    grid-column: 1 / -1;
    border-left: 0;
    border-top: 1px solid #e5e7eb;
    padding-top: 22px;
    padding-left: 0;
  }
}
```

</details>

### 8. `src/main.tsx`

- **당시 저장 경로:** `Dongoh/FE/week3/umcine/src/main.tsx`
- **현재 저장 위치:** [`Dongoh/FE/umcine/src/main.tsx`](../umcine/src/main.tsx)
- **구현 내용:** 생성된 routeTree로 라우터를 만들고 RouterProvider를 앱의 진입점에 배치합니다.

**추가·수정한 부분** (`+` 추가, `-` 제거):

```diff
--- 이전 주차/src/main.tsx
+++ 3주차/src/main.tsx
@@ -1,10 +1,19 @@
-import { StrictMode } from 'react'
-import { createRoot } from 'react-dom/client'
-import './index.css'
-import App from './App.tsx'
+import { StrictMode } from "react";
+import { createRoot } from "react-dom/client";
+import { createRouter, RouterProvider } from "@tanstack/react-router";
+import { routeTree } from "./routeTree.gen";
+import "./index.css";

-createRoot(document.getElementById('root')!).render(
+const router = createRouter({ routeTree });
+
+declare module "@tanstack/react-router" {
+  interface Register {
+    router: typeof router;
+  }
+}
+
+createRoot(document.getElementById("root")!).render(
   <StrictMode>
-    <App />
+    <RouterProvider router={router} />
   </StrictMode>,
-)
+);
```

<details>
<summary>수정 후 전체 코드</summary>

```tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import "./index.css";

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
```

</details>

### 9. `src/pages/movies/movie-detail-page.tsx`

- **당시 저장 경로:** `Dongoh/FE/week3/umcine/src/pages/movies/movie-detail-page.tsx`
- **현재 저장 위치:** [`Dongoh/FE/umcine/src/pages/movies/movie-detail-page.tsx`](../umcine/src/pages/movies/movie-detail-page.tsx)
- **구현 내용:** 경로의 영화 ID와 정적 영화 데이터를 이용해 포스터·줄거리·북마크 등 상세 화면을 구성합니다.

<details>
<summary>추가한 전체 코드</summary>

```tsx
import { Link, useParams } from "@tanstack/react-router";
import { BookmarkButton } from "../../components/bookmark-button";
import { movies } from "../../data/movies";

export function MovieDetailPage() {
  const { movieId } = useParams({ from: "/movies/$movieId" });
  const movie = movies.find((item) => item.id === Number(movieId));

  if (!movie) {
    return <main>영화를 찾을 수 없어요.</main>;
  }

  return (
    <main className="movie-detail-page">
      <section
        className="movie-detail-hero"
        style={{
          backgroundImage: `linear-gradient(90deg, rgba(17, 24, 39, 0.9), rgba(17, 24, 39, 0.44), rgba(17, 24, 39, 0.1)), url(${movie.backdropPath})`,
        }}
      >
        <div className="movie-detail-hero__inner">
          <Link className="movie-detail-hero__back" to="/">
            &lt; 영화 목록
          </Link>
          <div className="movie-detail-hero__content">
            <h1>{movie.title}</h1>
            <p>{movie.originalTitle}</p>
            <span>
              {movie.releaseDate} · {movie.genres.join(" · ")} · {movie.runtime}
            </span>
          </div>
        </div>
      </section>

      <section className="movie-detail-content">
        <img
          className="movie-detail-content__poster"
          src={movie.posterPath}
          alt={`${movie.title} 포스터`}
        />

        <article className="movie-detail-info">
          <h2>{movie.tagline}</h2>
          <p>{movie.overview}</p>
          <p>
            이 영화는 {movie.genres.join(", ")} 장르의 작품이며, 러닝타임은{" "}
            {movie.runtime}입니다.
          </p>
          <BookmarkButton movieId={movie.id} />
        </article>

        <aside className="movie-rating-panel" aria-labelledby="rating-title">
          <h2 id="rating-title">내 평점</h2>
          <p>별점을 주고 한줄평을 남겨보세요.</p>
          <div className="movie-rating-panel__stars" aria-label="별점 선택">
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
          <button className="movie-rating-panel__save" type="button">
            평점 저장
          </button>
        </aside>
      </section>
    </main>
  );
}
```

</details>

### 10. `src/pages/movies/movie-list-page.tsx`

- **당시 저장 경로:** `Dongoh/FE/week3/umcine/src/pages/movies/movie-list-page.tsx`
- **현재 저장 위치:** [`Dongoh/FE/umcine/src/pages/movies/movie-list-page.tsx`](../umcine/src/pages/movies/movie-list-page.tsx)
- **구현 내용:** 목록 페이지 제목과 MovieGrid를 독립된 페이지 컴포넌트로 구성합니다.

<details>
<summary>추가한 전체 코드</summary>

```tsx
import MovieGrid from "../../components/movies/movie-grid";

export function MovieListPage() {
  return (
    <main className="movie-list-page">
      <section className="movie-list-page__heading">
        <p>UMC Movie</p>
        <h1>영화 목록</h1>
      </section>
      <MovieGrid />
    </main>
  );
}
```

</details>

### 11. `src/pages/movies/search-page.tsx`

- **당시 저장 경로:** `Dongoh/FE/week3/umcine/src/pages/movies/search-page.tsx`
- **현재 저장 위치:** [`Dongoh/FE/umcine/src/pages/movies/search-page.tsx`](../umcine/src/pages/movies/search-page.tsx)
- **구현 내용:** URL 검색어와 입력값을 연결하고 정적 영화 데이터에서 조건에 맞는 결과를 보여줍니다.

<details>
<summary>추가한 전체 코드</summary>

```tsx
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
```

</details>

### 12. `src/routes/__root.tsx`

- **당시 저장 경로:** `Dongoh/FE/week3/umcine/src/routes/__root.tsx`
- **현재 저장 위치:** [`Dongoh/FE/umcine/src/routes/__root.tsx`](../umcine/src/routes/__root.tsx)
- **구현 내용:** Header와 Outlet을 공통 레이아웃에 배치하고 찾을 수 없는 경로의 화면을 정의합니다.

<details>
<summary>추가한 전체 코드</summary>

```tsx
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { Header } from "../components/layout/header";

export const Route = createRootRoute({
  component: () => (
    <>
      <Header />
      <Outlet />
    </>
  ),
  notFoundComponent: () => <main>페이지를 찾을 수 없어요.</main>,
});
```

</details>

### 13. `src/routes/index.tsx`

- **당시 저장 경로:** `Dongoh/FE/week3/umcine/src/routes/index.tsx`
- **현재 저장 위치:** [`Dongoh/FE/umcine/src/routes/index.tsx`](../umcine/src/routes/index.tsx)
- **구현 내용:** 루트 경로 /에 MovieListPage를 연결합니다.

<details>
<summary>추가한 전체 코드</summary>

```tsx
import { createFileRoute } from "@tanstack/react-router";
import { MovieListPage } from "../pages/movies/movie-list-page";

export const Route = createFileRoute("/")({
  component: MovieListPage,
});
```

</details>

### 14. `src/routes/movies.$movieId.tsx`

- **당시 저장 경로:** `Dongoh/FE/week3/umcine/src/routes/movies.$movieId.tsx`
- **현재 저장 위치:** [`Dongoh/FE/umcine/src/routes/movies.$movieId.tsx`](../umcine/src/routes/movies.$movieId.tsx)
- **구현 내용:** /movies/$movieId 동적 경로에 MovieDetailPage를 연결합니다.

<details>
<summary>추가한 전체 코드</summary>

```tsx
import { createFileRoute } from "@tanstack/react-router";
import { MovieDetailPage } from "../pages/movies/movie-detail-page";

export const Route = createFileRoute("/movies/$movieId")({
  component: MovieDetailPage,
});
```

</details>

### 15. `src/routes/search.tsx`

- **당시 저장 경로:** `Dongoh/FE/week3/umcine/src/routes/search.tsx`
- **현재 저장 위치:** [`Dongoh/FE/umcine/src/routes/search.tsx`](../umcine/src/routes/search.tsx)
- **구현 내용:** /search 경로에 SearchPage를 연결하고 query 검색 매개변수를 문자열로 검증합니다.

<details>
<summary>추가한 전체 코드</summary>

```tsx
import { createFileRoute } from "@tanstack/react-router";
import { SearchPage } from "../pages/movies/search-page";

export const Route = createFileRoute("/search")({
  validateSearch: (search): { query?: string } => ({
    query: typeof search.query === "string" ? search.query : undefined,
  }),
  component: SearchPage,
});
```

</details>

### 16. `src/stores/bookmark-store.ts`

- **당시 저장 경로:** `Dongoh/FE/week3/umcine/src/stores/bookmark-store.ts`
- **현재 저장 위치:** [`Dongoh/FE/umcine/src/stores/bookmark-store.ts`](../umcine/src/stores/bookmark-store.ts)
- **구현 내용:** Zustand 전역 상태에 북마크 영화 ID 배열과 토글 함수를 두고 persist로 localStorage에 저장합니다.

<details>
<summary>추가한 전체 코드</summary>

```typescript
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface BookmarkStore {
  bookmarkedMovieIds: number[];
  toggleBookmark: (movieId: number) => void;
}

export const useBookmarkStore = create<BookmarkStore>()(
  persist(
    (set) => ({
      bookmarkedMovieIds: [],
      toggleBookmark: (movieId) =>
        set((state) => ({
          bookmarkedMovieIds: state.bookmarkedMovieIds.includes(movieId)
            ? state.bookmarkedMovieIds.filter((id) => id !== movieId)
            : [...state.bookmarkedMovieIds, movieId],
        })),
    }),
    {
      name: "umcine-bookmark-store",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        bookmarkedMovieIds: state.bookmarkedMovieIds,
      }),
    },
  ),
);
```

</details>

### 17. `src/utils/bookmark-storage.ts`

- **당시 저장 경로:** `Dongoh/FE/week3/umcine/src/utils/bookmark-storage.ts`
- **현재 저장 위치:** [`Dongoh/FE/umcine/src/utils/bookmark-storage.ts`](../umcine/src/utils/bookmark-storage.ts)
- **구현 내용:** localStorage에 저장한 북마크 ID 배열을 읽고 양의 정수만 남기며 JSON 저장을 지원합니다.

<details>
<summary>추가한 전체 코드</summary>

```typescript
const BOOKMARK_STORAGE_KEY = "umcine-bookmarks";

export function readBookmarkIds(): number[] {
  const storedValue = localStorage.getItem(BOOKMARK_STORAGE_KEY);
  if (!storedValue) return [];

  try {
    const parsedValue: unknown = JSON.parse(storedValue);
    if (!Array.isArray(parsedValue)) return [];

    return parsedValue.filter(
      (movieId): movieId is number =>
        typeof movieId === "number" &&
        Number.isInteger(movieId) &&
        movieId > 0,
    );
  } catch {
    return [];
  }
}

export function saveBookmarkIds(movieIds: number[]) {
  localStorage.setItem(BOOKMARK_STORAGE_KEY, JSON.stringify(movieIds));
}
```

</details>

### 18. `src/utils/cn.ts`

- **당시 저장 경로:** `Dongoh/FE/week3/umcine/src/utils/cn.ts`
- **현재 저장 위치:** [`Dongoh/FE/umcine/src/utils/cn.ts`](../umcine/src/utils/cn.ts)
- **구현 내용:** clsx로 조건부 클래스명을 합치고 tailwind-merge로 충돌하는 Tailwind 클래스를 정리합니다.

<details>
<summary>추가한 전체 코드</summary>

```typescript
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

</details>

### 19. `vite.config.ts`

- **당시 저장 경로:** `Dongoh/FE/week3/umcine/vite.config.ts`
- **현재 저장 위치:** [`Dongoh/FE/umcine/vite.config.ts`](../umcine/vite.config.ts)
- **구현 내용:** Vite에서 사용할 React·라우팅·스타일 플러그인을 설정합니다.

**추가·수정한 부분** (`+` 추가, `-` 제거):

```diff
--- 이전 주차/vite.config.ts
+++ 3주차/vite.config.ts
@@ -1,7 +1,12 @@
-import react from '@vitejs/plugin-react'
-import { defineConfig } from 'vite'
+import { defineConfig } from "vite";
+import react from "@vitejs/plugin-react";
+import { tanstackRouter } from "@tanstack/router-plugin/vite";
+import tailwindcss from "@tailwindcss/vite";

-// https://vite.dev/config/
 export default defineConfig({
-  plugins: [react()],
-})
+  plugins: [
+    tanstackRouter({ autoCodeSplitting: true }),
+    react(),
+    tailwindcss(),
+  ],
+});
```

<details>
<summary>수정 후 전체 코드</summary>

```typescript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    tanstackRouter({ autoCodeSplitting: true }),
    react(),
    tailwindcss(),
  ],
});
```

</details>

## 자동 생성 파일·리소스·이전 파일

- `pnpm-lock.yaml`: 패키지의 고정 버전·의존성 해시를 기록하는 자동 생성 파일입니다. 의존성 선언은 위 `package.json` 코드에서 확인하고, lock 파일 전체는 현재 앱 또는 통합 전 백업에서 확인합니다.
- `src/routeTree.gen.ts`: TanStack Router 플러그인이 `src/routes`에서 생성하는 라우트 트리입니다. 직접 추가한 경로와 코드 전체는 위 `src/routes/*.tsx` 항목에 기록했습니다.
- 제거된 파일: `src/App.css`, `src/App.tsx`, `src/components/header.tsx`, `src/components/movie-grid.tsx`, `src/components/pagination.tsx`. 라우팅과 컴포넌트 분리 이후의 구현은 위 새 경로에서 확인합니다. 원본은 이전 주차 문서 및 백업에 남아 있습니다.

## 검증 기록

- 통합 이전 주차별 실행 결과는 별도로 기록되지 않았습니다.
- 통합 후 최신 앱의 빌드·린트는 통과했습니다. [구조 정리 기록](./migration.md)에서 범위를 확인하세요.
- 이 문서의 코드·차이는 통합 전 백업에서 추출했으며 줄바꿈과 후행 공백만 정리했습니다.

## 제출 기록

- Issue: [#37](https://github.com/HSU-Makeus-Challenge-11th/Web_B/issues/37)
- PR: [#38](https://github.com/HSU-Makeus-Challenge-11th/Web_B/pull/38) — main 병합 확인
- 커밋: 병합 커밋 [38768cc](https://github.com/HSU-Makeus-Challenge-11th/Web_B/commit/38768cc26ed07feb59026d24ee75767526a8e83d)
