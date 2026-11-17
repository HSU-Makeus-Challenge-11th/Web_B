# FE 5주차 — 영화 API 연동

## 필수 미션 보완 구현 — 최신 상태

공통 DataCredits에 로컬 TMDB 로고와 공식 출처 문구를 추가했습니다. 실제 목록·검색·상세 및 계정 화면에 출처 영역이 있고 로고가 로딩되며 비율이 유지되는 것을 확인했습니다.

[추가·수정한 파일 경로, 전체 코드와 화면 증빙](./required-missions.md)

## 구현 전 필수 미션 점검 — 2026-11-11

**판정: 부분 완료.** fetch·ky와 목록·검색·상세 API 연결은 구현되어 있습니다. 필수 미션의 **TMDB 출처 표기**는 현재 화면 코드에 없으며 PR #50에도 미완료 항목으로 기록돼 있습니다. PR에는 실제 검색·상세·새로고침 확인 기록이 있으나 이번 점검에서 재실행한 결과는 아닙니다.

[전체 주차 점검과 GitHub 근거](./mission-audit.md)

> 통합 전 로컬 백업의 해당 주차 코드를 기준으로 작성했습니다. 실제 제출 시점은 Git 커밋·PR 이력을 확인하세요. 코드 블록은 줄바꿈과 후행 공백을 정리했으며, 현재 앱은 후속 주차 변경이 반영되어 있을 수 있습니다.

## 이번 주차에 추가·변경한 부분

- TMDB 영화 목록·상세·검색 API 연결
- API 타입·환경변수·클라이언트·상태별 UI 추가
- fetch·Promise 학습 예제 추가

## 저장 위치와 변경 파일

모든 실제 앱 개발은 `Dongoh/FE/umcine`에서 이어갑니다. 이 문서는 당시 코드와 변경 이유를 보관합니다.

| 구분 | 당시 파일 경로 | 현재 위치 또는 보관 방식 |
| --- | --- | --- |
| 수정 | `Dongoh/FE/week5/umcine/package.json` | [`umcine/package.json`](../umcine/package.json) |
| 수정 | `Dongoh/FE/week5/umcine/pnpm-lock.yaml` | [`umcine/pnpm-lock.yaml`](../umcine/pnpm-lock.yaml) |
| 추가 | `Dongoh/FE/week5/umcine/src/api/movies/get-movie-detail.ts` | [`umcine/src/api/movies/get-movie-detail.ts`](../umcine/src/api/movies/get-movie-detail.ts) |
| 추가 | `Dongoh/FE/week5/umcine/src/api/movies/get-movies-with-fetch.ts` | [`umcine/src/api/movies/get-movies-with-fetch.ts`](../umcine/src/api/movies/get-movies-with-fetch.ts) |
| 추가 | `Dongoh/FE/week5/umcine/src/api/movies/get-movies.ts` | [`umcine/src/api/movies/get-movies.ts`](../umcine/src/api/movies/get-movies.ts) |
| 추가 | `Dongoh/FE/week5/umcine/src/api/movies/models.ts` | [`umcine/src/api/movies/models.ts`](../umcine/src/api/movies/models.ts) |
| 추가 | `Dongoh/FE/week5/umcine/src/api/movies/search-movies.ts` | [`umcine/src/api/movies/search-movies.ts`](../umcine/src/api/movies/search-movies.ts) |
| 추가 | `Dongoh/FE/week5/umcine/src/api/tmdb-client.ts` | [`umcine/src/api/tmdb-client.ts`](../umcine/src/api/tmdb-client.ts) |
| 수정 | `Dongoh/FE/week5/umcine/src/components/movies/movie-card.tsx` | [`umcine/src/components/movies/movie-card.tsx`](../umcine/src/components/movies/movie-card.tsx) |
| 수정 | `Dongoh/FE/week5/umcine/src/components/movies/movie-grid.tsx` | [`umcine/src/components/movies/movie-grid.tsx`](../umcine/src/components/movies/movie-grid.tsx) |
| 추가 | `Dongoh/FE/week5/umcine/src/config/env.ts` | [`umcine/src/config/env.ts`](../umcine/src/config/env.ts) |
| 추가 | `Dongoh/FE/week5/umcine/src/examples/fetch-movies.ts` | [`umcine/src/examples/fetch-movies.ts`](../umcine/src/examples/fetch-movies.ts) |
| 추가 | `Dongoh/FE/week5/umcine/src/examples/promise-status.ts` | [`umcine/src/examples/promise-status.ts`](../umcine/src/examples/promise-status.ts) |
| 추가 | `Dongoh/FE/week5/umcine/src/examples/promise-syntax.ts` | [`umcine/src/examples/promise-syntax.ts`](../umcine/src/examples/promise-syntax.ts) |
| 수정 | `Dongoh/FE/week5/umcine/src/index.css` | [`umcine/src/index.css`](../umcine/src/index.css) |
| 서식만 변경 | `Dongoh/FE/week5/umcine/src/main.tsx` | [`umcine/src/main.tsx`](../umcine/src/main.tsx) |
| 추가 | `Dongoh/FE/week5/umcine/src/pages/movies/get-movie-detail-error-message.ts` | [`umcine/src/pages/movies/get-movie-detail-error-message.ts`](../umcine/src/pages/movies/get-movie-detail-error-message.ts) |
| 수정 | `Dongoh/FE/week5/umcine/src/pages/movies/movie-detail-page.tsx` | [`umcine/src/pages/movies/movie-detail-page.tsx`](../umcine/src/pages/movies/movie-detail-page.tsx) |
| 수정 | `Dongoh/FE/week5/umcine/src/pages/movies/movie-list-page.tsx` | [`umcine/src/pages/movies/movie-list-page.tsx`](../umcine/src/pages/movies/movie-list-page.tsx) |
| 수정 | `Dongoh/FE/week5/umcine/src/pages/movies/search-page.tsx` | [`umcine/src/pages/movies/search-page.tsx`](../umcine/src/pages/movies/search-page.tsx) |
| 추가 | `Dongoh/FE/week5/umcine/src/utils/movies/get-movie-detail-error-message.ts` | [`umcine/src/utils/movies/get-movie-detail-error-message.ts`](../umcine/src/utils/movies/get-movie-detail-error-message.ts) |
| 추가 | `Dongoh/FE/week5/umcine/src/utils/movies/tmdb-image.ts` | [`umcine/src/utils/movies/tmdb-image.ts`](../umcine/src/utils/movies/tmdb-image.ts) |

## 파일별 구현 내용과 코드

### 1. `package.json`

- **당시 저장 경로:** `Dongoh/FE/week5/umcine/package.json`
- **현재 저장 위치:** [`Dongoh/FE/umcine/package.json`](../umcine/package.json)
- **구현 내용:** 실행·빌드·린트 명령과 프로젝트에서 사용하는 패키지를 선언합니다.

**추가·수정한 부분** (`+` 추가, `-` 제거):

```diff
--- 이전 주차/package.json
+++ 5주차/package.json
@@ -13,6 +13,7 @@
     "@tailwindcss/vite": "^4.3.3",
     "@tanstack/react-router": "^1.170.40",
     "clsx": "^2.1.1",
+    "ky": "^2.2.0",
     "react": "^19.2.8",
     "react-dom": "^19.2.8",
     "tailwind-merge": "^3.7.0",
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
    "ky": "^2.2.0",
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

### 2. `src/api/movies/get-movie-detail.ts`

- **당시 저장 경로:** `Dongoh/FE/week5/umcine/src/api/movies/get-movie-detail.ts`
- **현재 저장 위치:** [`Dongoh/FE/umcine/src/api/movies/get-movie-detail.ts`](../umcine/src/api/movies/get-movie-detail.ts)
- **구현 내용:** 영화 ID로 상세 API를 호출하고 제목·장르·러닝타임 등의 상세 응답을 반환합니다.

<details>
<summary>추가한 전체 코드</summary>

```typescript
import { tmdbClient } from "../tmdb-client";
import type { TmdbMovieDetail } from "./models";

type GetMovieDetailResponse = TmdbMovieDetail;

function getMovieDetail(movieId: number) {
  return tmdbClient
    .get(`movie/${movieId}`, {
      searchParams: { language: "ko-KR" },
    })
    .json<GetMovieDetailResponse>();
}

export { getMovieDetail, type GetMovieDetailResponse };
```

</details>

### 3. `src/api/movies/get-movies-with-fetch.ts`

- **당시 저장 경로:** `Dongoh/FE/week5/umcine/src/api/movies/get-movies-with-fetch.ts`
- **현재 저장 위치:** [`Dongoh/FE/umcine/src/api/movies/get-movies-with-fetch.ts`](../umcine/src/api/movies/get-movies-with-fetch.ts)
- **구현 내용:** fetch로 인기 영화를 요청하고 response.ok를 확인하는 async/await 학습용 구현입니다.

<details>
<summary>추가한 전체 코드</summary>

```typescript
import { env } from "../../config/env";
import type { TmdbMovieListResponse } from "./models";

type GetMoviesWithFetchResponse = TmdbMovieListResponse;

async function getMoviesWithFetch(
  page = 1,
): Promise<GetMoviesWithFetchResponse> {
  const searchParams = new URLSearchParams({
    language: "ko-KR",
    page: String(page),
  });

  const response = await fetch(
    `${env.tmdbApiBaseUrl}/movie/popular?${searchParams}`,
    {
      headers: {
        Authorization: `Bearer ${env.tmdbAccessToken}`,
      },
    },
  );

  if (!response.ok) {
    throw new Error(`영화 목록 요청에 실패했어요: ${response.status}`);
  }

  return response.json();
}

export { getMoviesWithFetch, type GetMoviesWithFetchResponse };
```

</details>

### 4. `src/api/movies/get-movies.ts`

- **당시 저장 경로:** `Dongoh/FE/week5/umcine/src/api/movies/get-movies.ts`
- **현재 저장 위치:** [`Dongoh/FE/umcine/src/api/movies/get-movies.ts`](../umcine/src/api/movies/get-movies.ts)
- **구현 내용:** 인기 영화 API에 한국어와 페이지 번호를 전달하고 타입이 지정된 JSON 응답을 반환합니다.

<details>
<summary>추가한 전체 코드</summary>

```typescript
import { tmdbClient } from "../tmdb-client";
import type { TmdbMovieListResponse } from "./models";

interface GetMoviesRequest {
  page?: number;
}

type GetMoviesResponse = TmdbMovieListResponse;

function getMovies({ page = 1 }: GetMoviesRequest = {}) {
  return tmdbClient
    .get("movie/popular", {
      searchParams: { language: "ko-KR", page },
    })
    .json<GetMoviesResponse>();
}

export { getMovies, type GetMoviesRequest, type GetMoviesResponse };
```

</details>

### 5. `src/api/movies/models.ts`

- **당시 저장 경로:** `Dongoh/FE/week5/umcine/src/api/movies/models.ts`
- **현재 저장 위치:** [`Dongoh/FE/umcine/src/api/movies/models.ts`](../umcine/src/api/movies/models.ts)
- **구현 내용:** 목록·검색·상세 API 응답에 사용할 영화, 장르, 페이지네이션 타입을 정의합니다.

<details>
<summary>추가한 전체 코드</summary>

```typescript
interface TmdbMovie {
  id: number;
  title: string;
  original_title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
}

interface TmdbMovieListItem extends TmdbMovie {
  genre_ids: number[];
}

interface TmdbMovieListResponse {
  page: number;
  results: TmdbMovieListItem[];
  total_pages: number;
  total_results: number;
}

interface TmdbGenre {
  id: number;
  name: string;
}

interface TmdbMovieDetail extends TmdbMovie {
  genres: TmdbGenre[];
  runtime: number | null;
  tagline: string;
}

export type {
  TmdbGenre,
  TmdbMovie,
  TmdbMovieDetail,
  TmdbMovieListItem,
  TmdbMovieListResponse,
};
```

</details>

### 6. `src/api/movies/search-movies.ts`

- **당시 저장 경로:** `Dongoh/FE/week5/umcine/src/api/movies/search-movies.ts`
- **현재 저장 위치:** [`Dongoh/FE/umcine/src/api/movies/search-movies.ts`](../umcine/src/api/movies/search-movies.ts)
- **구현 내용:** 검색어·페이지·언어·성인 콘텐츠 제외 옵션을 API 검색 매개변수로 전달합니다.

<details>
<summary>추가한 전체 코드</summary>

```typescript
import { tmdbClient } from "../tmdb-client";
import type { TmdbMovieListResponse } from "./models";

interface SearchMoviesRequest {
  query: string;
  page?: number;
}

type SearchMoviesResponse = TmdbMovieListResponse;

function searchMovies({ query, page = 1 }: SearchMoviesRequest) {
  return tmdbClient
    .get("search/movie", {
      searchParams: {
        query,
        language: "ko-KR",
        include_adult: false,
        page,
      },
    })
    .json<SearchMoviesResponse>();
}

export {
  searchMovies,
  type SearchMoviesRequest,
  type SearchMoviesResponse,
};
```

</details>

### 7. `src/api/tmdb-client.ts`

- **당시 저장 경로:** `Dongoh/FE/week5/umcine/src/api/tmdb-client.ts`
- **현재 저장 위치:** [`Dongoh/FE/umcine/src/api/tmdb-client.ts`](../umcine/src/api/tmdb-client.ts)
- **구현 내용:** ky.create로 API 기본 주소와 Bearer 인증 헤더를 공유하는 TMDB 클라이언트를 만듭니다.

<details>
<summary>추가한 전체 코드</summary>

```typescript
import ky from "ky";
import { env } from "../config/env";

export const tmdbClient = ky.create({
  baseUrl: `${env.tmdbApiBaseUrl}/`,
  headers: {
    Authorization: `Bearer ${env.tmdbAccessToken}`,
  },
});
```

</details>

### 8. `src/components/movies/movie-card.tsx`

- **당시 저장 경로:** `Dongoh/FE/week5/umcine/src/components/movies/movie-card.tsx`
- **현재 저장 위치:** [`Dongoh/FE/umcine/src/components/movies/movie-card.tsx`](../umcine/src/components/movies/movie-card.tsx)
- **구현 내용:** 정적 Movie 타입 대신 TMDB 목록 항목을 표시하고 이미지 URL 변환과 포스터 대체 표시를 적용합니다.

**추가·수정한 부분** (`+` 추가, `-` 제거):

```diff
--- 이전 주차/src/components/movies/movie-card.tsx
+++ 5주차/src/components/movies/movie-card.tsx
@@ -1,13 +1,16 @@
 import { Link } from "@tanstack/react-router";
-import type { Movie } from "../../types/movie";
+import type { TmdbMovieListItem } from "../../api/movies/models";
 import { cn } from "../../utils/cn";

 interface MovieCardProps {
-  movie: Movie;
+  movie: TmdbMovieListItem & { isBookmarked: boolean };
   onToggleBookmark: (movieId: number) => void;
 }

 export default function MovieCard({ movie, onToggleBookmark }: MovieCardProps) {
+  const posterUrl = movie.poster_path
+    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
+    : null;
   const bookmarkIcon = movie.isBookmarked
     ? "/icons/movie-icons/bookmark.svg"
     : "/icons/movie-icons/bookmark-outline.svg";
@@ -20,11 +23,17 @@
           to="/movies/$movieId"
           params={{ movieId: String(movie.id) }}
         >
-          <img
-            className="movie-card__poster"
-            src={movie.posterPath}
-            alt={`${movie.title} 포스터`}
-          />
+          {posterUrl ? (
+            <img
+              className="movie-card__poster"
+              src={posterUrl}
+              alt={`${movie.title} 포스터`}
+            />
+          ) : (
+            <div className="movie-card__poster movie-card__poster--empty">
+              이미지 없음
+            </div>
+          )}
         </Link>
         <button
           className={cn(
@@ -49,7 +58,7 @@
         <Link to="/movies/$movieId" params={{ movieId: String(movie.id) }}>
           <h2>{movie.title}</h2>
         </Link>
-        <span>{movie.releaseDate}</span>
+        <span>{movie.release_date}</span>
       </div>
     </li>
   );
```

<details>
<summary>수정 후 전체 코드</summary>

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
    <li className="movie-card min-w-0">
      <div className="movie-card__poster-wrap relative">
        <Link
          className="block"
          to="/movies/$movieId"
          params={{ movieId: String(movie.id) }}
        >
          {posterUrl ? (
            <img
              className="movie-card__poster"
              src={posterUrl}
              alt={`${movie.title} 포스터`}
            />
          ) : (
            <div className="movie-card__poster movie-card__poster--empty">
              이미지 없음
            </div>
          )}
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
        <span>{movie.release_date}</span>
      </div>
    </li>
  );
}
```

</details>

### 9. `src/components/movies/movie-grid.tsx`

- **당시 저장 경로:** `Dongoh/FE/week5/umcine/src/components/movies/movie-grid.tsx`
- **현재 저장 위치:** [`Dongoh/FE/umcine/src/components/movies/movie-grid.tsx`](../umcine/src/components/movies/movie-grid.tsx)
- **구현 내용:** 내부 정적 데이터 대신 부모가 전달한 API 영화 목록을 카드로 렌더링하고 북마크 상태를 연결합니다.

**추가·수정한 부분** (`+` 추가, `-` 제거):

```diff
--- 이전 주차/src/components/movies/movie-grid.tsx
+++ 5주차/src/components/movies/movie-grid.tsx
@@ -1,14 +1,18 @@
-import { movies as initialMovies } from "../../data/movies";
+import type { TmdbMovieListItem } from "../../api/movies/models";
 import { useBookmarkStore } from "../../stores/bookmark-store";
 import MovieCard from "./movie-card";

-export default function MovieGrid() {
+interface MovieGridProps {
+  movies: TmdbMovieListItem[];
+}
+
+export default function MovieGrid({ movies: apiMovies }: MovieGridProps) {
   const bookmarkedMovieIds = useBookmarkStore(
     (state) => state.bookmarkedMovieIds,
   );
   const toggleBookmark = useBookmarkStore((state) => state.toggleBookmark);

-  const movies = initialMovies.map((movie) => ({
+  const movies = apiMovies.map((movie) => ({
     ...movie,
     isBookmarked: bookmarkedMovieIds.includes(movie.id),
   }));
```

<details>
<summary>수정 후 전체 코드</summary>

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

### 10. `src/config/env.ts`

- **당시 저장 경로:** `Dongoh/FE/week5/umcine/src/config/env.ts`
- **현재 저장 위치:** [`Dongoh/FE/umcine/src/config/env.ts`](../umcine/src/config/env.ts)
- **구현 내용:** Vite 환경변수에서 API 주소와 액세스 토큰을 읽고 누락된 경우 오류를 발생시킵니다. 실제 토큰 값은 문서에 포함하지 않습니다.

<details>
<summary>추가한 전체 코드</summary>

```typescript
const tmdbApiBaseUrl = import.meta.env.VITE_TMDB_API_BASE_URL;
const tmdbAccessToken = import.meta.env.VITE_TMDB_ACCESS_TOKEN;

if (!tmdbApiBaseUrl || !tmdbAccessToken) {
  throw new Error("TMDB 환경 변수가 필요해요.");
}

export const env = {
  tmdbApiBaseUrl,
  tmdbAccessToken,
};
```

</details>

### 11. `src/examples/fetch-movies.ts`

- **당시 저장 경로:** `Dongoh/FE/week5/umcine/src/examples/fetch-movies.ts`
- **현재 저장 위치:** [`Dongoh/FE/umcine/src/examples/fetch-movies.ts`](../umcine/src/examples/fetch-movies.ts)
- **구현 내용:** fetch 기반 영화 요청 함수를 호출하고 결과·오류를 출력하는 학습 예제입니다.

<details>
<summary>추가한 전체 코드</summary>

```typescript
import { getMoviesWithFetch } from "../api/movies/get-movies-with-fetch";

getMoviesWithFetch(1)
  .then((response) => console.log(response.results))
  .catch((error) => console.error(error));
```

</details>

### 12. `src/examples/promise-status.ts`

- **당시 저장 경로:** `Dongoh/FE/week5/umcine/src/examples/promise-status.ts`
- **현재 저장 위치:** [`Dongoh/FE/umcine/src/examples/promise-status.ts`](../umcine/src/examples/promise-status.ts)
- **구현 내용:** 지연된 Promise의 then·catch·finally를 이용해 요청 완료 흐름을 확인합니다.

<details>
<summary>추가한 전체 코드</summary>

```typescript
const movieRequest = new Promise<string>((resolve) => {
  setTimeout(() => resolve("영화 요청이 끝났어요."), 300);
});

console.log("1. 요청을 시작했어요.");

movieRequest
  .then((message) => console.log(`2. ${message}`))
  .catch((error) => console.error(error))
  .finally(() => console.log("3. 요청 처리를 마쳤어요."));
```

</details>

### 13. `src/examples/promise-syntax.ts`

- **당시 저장 경로:** `Dongoh/FE/week5/umcine/src/examples/promise-syntax.ts`
- **현재 저장 위치:** [`Dongoh/FE/umcine/src/examples/promise-syntax.ts`](../umcine/src/examples/promise-syntax.ts)
- **구현 내용:** Promise 처리 구문을 비교하는 학습 예제입니다. 아래 코드에서 실제 처리 흐름을 확인할 수 있습니다.

<details>
<summary>추가한 전체 코드</summary>

```typescript
function getMovieTitle(): Promise<string> {
  return Promise.resolve("인셉션");
}

function loadWithThen() {
  return getMovieTitle()
    .then((title) => console.log(`.then(): ${title}`))
    .catch((error) => console.error(error));
}

async function loadWithAsyncAwait() {
  try {
    const title = await getMovieTitle();
    console.log(`async/await: ${title}`);
  } catch (error) {
    console.error(error);
  }
}

loadWithThen();
loadWithAsyncAwait();
```

</details>

### 14. `src/index.css`

- **당시 저장 경로:** `Dongoh/FE/week5/umcine/src/index.css`
- **현재 저장 위치:** [`Dongoh/FE/umcine/src/index.css`](../umcine/src/index.css)
- **구현 내용:** 영화 목록·상세·검색·북마크 UI의 공통 스타일과 상태 표시 스타일을 정의합니다.

**추가·수정한 부분** (`+` 추가, `-` 제거):

```diff
--- 이전 주차/src/index.css
+++ 5주차/src/index.css
@@ -140,6 +140,13 @@
   width: 100%;
   aspect-ratio: 7 / 8;
   object-fit: cover;
+}
+
+.movie-card__poster--empty {
+  display: grid;
+  place-items: center;
+  background: #e5e7eb;
+  color: #6b7280;
 }

 .movie-card__bookmark-button {
@@ -222,6 +229,7 @@
   font-weight: 800;
 }

+.movie-list-page__status,
 .search-page__empty {
   margin: 28px 0 0;
   text-align: center;
@@ -274,11 +282,19 @@
   background: #ffffff;
 }

-.search-result-card > img {
+.search-result-card__poster {
   width: 92px;
   height: 118px;
   border-radius: 6px;
   object-fit: cover;
+}
+
+.tmdb-image-placeholder {
+  display: grid;
+  place-items: center;
+  background: #e5e7eb;
+  color: #6b7280;
+  font-size: 13px;
 }

 .search-result-card__content {
@@ -346,11 +362,31 @@
   background: #f4f6fb;
 }

+.movie-detail-page__status {
+  width: min(1120px, calc(100% - 32px));
+  margin: 0 auto;
+  padding: 40px 0;
+  color: #6b7280;
+}
+
+.movie-detail-page__status a {
+  color: #2563eb;
+}
+
 .movie-detail-hero {
   min-height: 300px;
   background-position: center;
   background-size: cover;
   color: #ffffff;
+}
+
+.movie-detail-hero--empty {
+  background-color: #4b5563;
+}
+
+.movie-detail-hero__image-empty {
+  align-self: center;
+  margin: 0;
 }

 .movie-detail-hero__inner {
@@ -410,7 +446,10 @@

 .movie-detail-content__poster {
   width: 170px;
+  aspect-ratio: 2 / 3;
+  align-self: start;
   border-radius: 8px;
+  object-fit: cover;
   box-shadow: 0 18px 36px rgba(15, 23, 42, 0.22);
 }
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

.movie-card__poster--empty {
  display: grid;
  place-items: center;
  background: #e5e7eb;
  color: #6b7280;
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

.movie-list-page__status,
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

.search-result-card__poster {
  width: 92px;
  height: 118px;
  border-radius: 6px;
  object-fit: cover;
}

.tmdb-image-placeholder {
  display: grid;
  place-items: center;
  background: #e5e7eb;
  color: #6b7280;
  font-size: 13px;
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

.movie-detail-page__status {
  width: min(1120px, calc(100% - 32px));
  margin: 0 auto;
  padding: 40px 0;
  color: #6b7280;
}

.movie-detail-page__status a {
  color: #2563eb;
}

.movie-detail-hero {
  min-height: 300px;
  background-position: center;
  background-size: cover;
  color: #ffffff;
}

.movie-detail-hero--empty {
  background-color: #4b5563;
}

.movie-detail-hero__image-empty {
  align-self: center;
  margin: 0;
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
  aspect-ratio: 2 / 3;
  align-self: start;
  border-radius: 8px;
  object-fit: cover;
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

### 15. `src/main.tsx`

- **당시 저장 경로:** `Dongoh/FE/week5/umcine/src/main.tsx`
- **현재 저장 위치:** [`Dongoh/FE/umcine/src/main.tsx`](../umcine/src/main.tsx)
- **구현 내용:** 라우터 기반 진입점은 유지합니다. 원본 바이트의 차이가 있더라도 아래 비교에서 줄바꿈·후행 공백만 다른 경우 별도로 표시합니다.

줄바꿈·후행 공백을 제외하면 이전 주차와 같은 코드입니다. 기능 추가로 분류하지 않습니다.

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

### 16. `src/pages/movies/get-movie-detail-error-message.ts`

- **당시 저장 경로:** `Dongoh/FE/week5/umcine/src/pages/movies/get-movie-detail-error-message.ts`
- **현재 저장 위치:** [`Dongoh/FE/umcine/src/pages/movies/get-movie-detail-error-message.ts`](../umcine/src/pages/movies/get-movie-detail-error-message.ts)
- **구현 내용:** 404 오류와 일반 요청 오류를 구분하는 메시지 함수를 정의합니다. 같은 함수가 utils/movies 경로에도 존재하며 정리 당시 원본을 유지했습니다.

<details>
<summary>추가한 전체 코드</summary>

```typescript
import { isHTTPError } from "ky";

export function getMovieDetailErrorMessage(error: unknown) {
  if (isHTTPError(error) && error.response.status === 404) {
    return "영화를 찾을 수 없어요.";
  }

  return "영화 정보를 불러오지 못했어요.";
}
```

</details>

### 17. `src/pages/movies/movie-detail-page.tsx`

- **당시 저장 경로:** `Dongoh/FE/week5/umcine/src/pages/movies/movie-detail-page.tsx`
- **현재 저장 위치:** [`Dongoh/FE/umcine/src/pages/movies/movie-detail-page.tsx`](../umcine/src/pages/movies/movie-detail-page.tsx)
- **구현 내용:** 경로 ID를 검증하고 상세 API를 호출해 로딩·404·일반 오류와 포스터·배경 이미지 없는 경우를 처리합니다.

**추가·수정한 부분** (`+` 추가, `-` 제거):

```diff
--- 이전 주차/src/pages/movies/movie-detail-page.tsx
+++ 5주차/src/pages/movies/movie-detail-page.tsx
@@ -1,50 +1,123 @@
 import { Link, useParams } from "@tanstack/react-router";
+import { useEffect, useState } from "react";
+import { getMovieDetail } from "../../api/movies/get-movie-detail";
+import type { TmdbMovieDetail } from "../../api/movies/models";
 import { BookmarkButton } from "../../components/bookmark-button";
-import { movies } from "../../data/movies";
+import { getMovieDetailErrorMessage } from "../../utils/movies/get-movie-detail-error-message";
+import {
+  getTmdbBackdropUrl,
+  getTmdbPosterUrl,
+} from "../../utils/movies/tmdb-image";

 export function MovieDetailPage() {
   const { movieId } = useParams({ from: "/movies/$movieId" });
-  const movie = movies.find((item) => item.id === Number(movieId));
+  const parsedMovieId = Number(movieId);
+
+  return <MovieDetailPageContent key={movieId} movieId={parsedMovieId} />;
+}
+
+function MovieDetailPageContent({ movieId }: { movieId: number }) {
+  const isValidMovieId = Number.isInteger(movieId) && movieId > 0;
+  const [movie, setMovie] = useState<TmdbMovieDetail | null>(null);
+  const [isLoading, setIsLoading] = useState(isValidMovieId);
+  const [errorMessage, setErrorMessage] = useState<string | null>(null);
+
+  useEffect(() => {
+    if (!isValidMovieId) return;
+
+    let ignore = false;
+
+    async function loadMovieDetail() {
+      try {
+        const response = await getMovieDetail(movieId);
+        if (!ignore) setMovie(response);
+      } catch (error) {
+        if (!ignore) setErrorMessage(getMovieDetailErrorMessage(error));
+      } finally {
+        if (!ignore) setIsLoading(false);
+      }
+    }
+
+    loadMovieDetail();
+
+    return () => {
+      ignore = true;
+    };
+  }, [movieId, isValidMovieId]);
+
+  if (!isValidMovieId) {
+    return <MovieDetailStatus message="올바르지 않은 영화 번호예요." isError />;
+  }
+
+  if (isLoading) {
+    return <MovieDetailStatus message="영화 정보를 불러오는 중이에요." />;
+  }
+
+  if (errorMessage) {
+    return <MovieDetailStatus message={errorMessage} isError />;
+  }

   if (!movie) {
-    return <main>영화를 찾을 수 없어요.</main>;
+    return <MovieDetailStatus message="영화를 찾을 수 없어요." isError />;
   }
+
+  const posterUrl = getTmdbPosterUrl(movie.poster_path);
+  const backdropUrl = getTmdbBackdropUrl(movie.backdrop_path);
+  const genreNames = movie.genres.map((genre) => genre.name).join(", ");
+  const runtimeText = formatRuntime(movie.runtime);

   return (
     <main className="movie-detail-page">
       <section
-        className="movie-detail-hero"
+        className={
+          backdropUrl
+            ? "movie-detail-hero"
+            : "movie-detail-hero movie-detail-hero--empty"
+        }
         style={{
-          backgroundImage: `linear-gradient(90deg, rgba(17, 24, 39, 0.9), rgba(17, 24, 39, 0.44), rgba(17, 24, 39, 0.1)), url(${movie.backdropPath})`,
+          backgroundImage: backdropUrl
+            ? `linear-gradient(90deg, rgba(17, 24, 39, 0.9), rgba(17, 24, 39, 0.44), rgba(17, 24, 39, 0.1)), url(${backdropUrl})`
+            : undefined,
         }}
       >
         <div className="movie-detail-hero__inner">
           <Link className="movie-detail-hero__back" to="/">
             &lt; 영화 목록
           </Link>
+          {!backdropUrl && (
+            <p className="movie-detail-hero__image-empty">이미지 없음</p>
+          )}
           <div className="movie-detail-hero__content">
             <h1>{movie.title}</h1>
-            <p>{movie.originalTitle}</p>
+            <p>{movie.original_title}</p>
             <span>
-              {movie.releaseDate} · {movie.genres.join(" · ")} · {movie.runtime}
+              {movie.release_date} · {genreNames} · {runtimeText}
             </span>
           </div>
         </div>
       </section>

       <section className="movie-detail-content">
-        <img
-          className="movie-detail-content__poster"
-          src={movie.posterPath}
-          alt={`${movie.title} 포스터`}
-        />
+        {posterUrl ? (
+          <img
+            className="movie-detail-content__poster"
+            src={posterUrl}
+            alt={`${movie.title} 포스터`}
+          />
+        ) : (
+          <div className="movie-detail-content__poster tmdb-image-placeholder">
+            이미지 없음
+          </div>
+        )}

         <article className="movie-detail-info">
-          <h2>{movie.tagline}</h2>
+          {movie.tagline && <h2>{movie.tagline}</h2>}
           <p>{movie.overview}</p>
           <p>
-            이 영화는 {movie.genres.join(", ")} 장르의 작품이며, 러닝타임은{" "}
-            {movie.runtime}입니다.
+            {genreNames && `이 영화는 ${genreNames} 장르의 작품입니다. `}
+            {typeof movie.runtime === "number"
+              ? `러닝타임은 ${runtimeText}입니다.`
+              : runtimeText}
           </p>
           <BookmarkButton movieId={movie.id} />
         </article>
@@ -71,3 +144,29 @@
     </main>
   );
 }
+
+function MovieDetailStatus({
+  message,
+  isError = false,
+}: {
+  message: string;
+  isError?: boolean;
+}) {
+  return (
+    <main className="movie-detail-page">
+      <div className="movie-detail-page__status">
+        <Link to="/">&lt; 영화 목록</Link>
+        <p role={isError ? "alert" : "status"}>{message}</p>
+      </div>
+    </main>
+  );
+}
+
+function formatRuntime(runtime: number | null) {
+  if (typeof runtime !== "number") return "상영 시간 정보가 없어요.";
+
+  const hours = Math.floor(runtime / 60);
+  const minutes = runtime % 60;
+
+  return hours > 0 ? `${hours}시간 ${minutes}분` : `${minutes}분`;
+}
```

<details>
<summary>수정 후 전체 코드</summary>

```tsx
import { Link, useParams } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { getMovieDetail } from "../../api/movies/get-movie-detail";
import type { TmdbMovieDetail } from "../../api/movies/models";
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
  const [movie, setMovie] = useState<TmdbMovieDetail | null>(null);
  const [isLoading, setIsLoading] = useState(isValidMovieId);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!isValidMovieId) return;

    let ignore = false;

    async function loadMovieDetail() {
      try {
        const response = await getMovieDetail(movieId);
        if (!ignore) setMovie(response);
      } catch (error) {
        if (!ignore) setErrorMessage(getMovieDetailErrorMessage(error));
      } finally {
        if (!ignore) setIsLoading(false);
      }
    }

    loadMovieDetail();

    return () => {
      ignore = true;
    };
  }, [movieId, isValidMovieId]);

  if (!isValidMovieId) {
    return <MovieDetailStatus message="올바르지 않은 영화 번호예요." isError />;
  }

  if (isLoading) {
    return <MovieDetailStatus message="영화 정보를 불러오는 중이에요." />;
  }

  if (errorMessage) {
    return <MovieDetailStatus message={errorMessage} isError />;
  }

  if (!movie) {
    return <MovieDetailStatus message="영화를 찾을 수 없어요." isError />;
  }

  const posterUrl = getTmdbPosterUrl(movie.poster_path);
  const backdropUrl = getTmdbBackdropUrl(movie.backdrop_path);
  const genreNames = movie.genres.map((genre) => genre.name).join(", ");
  const runtimeText = formatRuntime(movie.runtime);

  return (
    <main className="movie-detail-page">
      <section
        className={
          backdropUrl
            ? "movie-detail-hero"
            : "movie-detail-hero movie-detail-hero--empty"
        }
        style={{
          backgroundImage: backdropUrl
            ? `linear-gradient(90deg, rgba(17, 24, 39, 0.9), rgba(17, 24, 39, 0.44), rgba(17, 24, 39, 0.1)), url(${backdropUrl})`
            : undefined,
        }}
      >
        <div className="movie-detail-hero__inner">
          <Link className="movie-detail-hero__back" to="/">
            &lt; 영화 목록
          </Link>
          {!backdropUrl && (
            <p className="movie-detail-hero__image-empty">이미지 없음</p>
          )}
          <div className="movie-detail-hero__content">
            <h1>{movie.title}</h1>
            <p>{movie.original_title}</p>
            <span>
              {movie.release_date} · {genreNames} · {runtimeText}
            </span>
          </div>
        </div>
      </section>

      <section className="movie-detail-content">
        {posterUrl ? (
          <img
            className="movie-detail-content__poster"
            src={posterUrl}
            alt={`${movie.title} 포스터`}
          />
        ) : (
          <div className="movie-detail-content__poster tmdb-image-placeholder">
            이미지 없음
          </div>
        )}

        <article className="movie-detail-info">
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

function MovieDetailStatus({
  message,
  isError = false,
}: {
  message: string;
  isError?: boolean;
}) {
  return (
    <main className="movie-detail-page">
      <div className="movie-detail-page__status">
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

### 18. `src/pages/movies/movie-list-page.tsx`

- **당시 저장 경로:** `Dongoh/FE/week5/umcine/src/pages/movies/movie-list-page.tsx`
- **현재 저장 위치:** [`Dongoh/FE/umcine/src/pages/movies/movie-list-page.tsx`](../umcine/src/pages/movies/movie-list-page.tsx)
- **구현 내용:** useEffect에서 목록 API를 호출하고 영화 데이터·로딩·오류를 useState로 직접 관리합니다.

**추가·수정한 부분** (`+` 추가, `-` 제거):

```diff
--- 이전 주차/src/pages/movies/movie-list-page.tsx
+++ 5주차/src/pages/movies/movie-list-page.tsx
@@ -1,13 +1,55 @@
+import { useEffect, useState } from "react";
+import { getMovies } from "../../api/movies/get-movies";
+import type { TmdbMovieListItem } from "../../api/movies/models";
 import MovieGrid from "../../components/movies/movie-grid";

 export function MovieListPage() {
+  const [movies, setMovies] = useState<TmdbMovieListItem[]>([]);
+  const [isLoading, setIsLoading] = useState(true);
+  const [errorMessage, setErrorMessage] = useState<string | null>(null);
+
+  useEffect(() => {
+    let ignore = false;
+
+    async function loadMovies() {
+      try {
+        const response = await getMovies({ page: 1 });
+        if (!ignore) setMovies(response.results);
+      } catch {
+        if (!ignore) setErrorMessage("영화 목록을 불러오지 못했어요.");
+      } finally {
+        if (!ignore) setIsLoading(false);
+      }
+    }
+
+    loadMovies();
+
+    return () => {
+      ignore = true;
+    };
+  }, []);
+
   return (
     <main className="movie-list-page">
       <section className="movie-list-page__heading">
         <p>UMC Movie</p>
         <h1>영화 목록</h1>
       </section>
-      <MovieGrid />
+      {isLoading ? (
+        <p className="movie-list-page__status" role="status">
+          영화 목록을 불러오는 중이에요.
+        </p>
+      ) : errorMessage ? (
+        <p className="movie-list-page__status" role="alert">
+          {errorMessage}
+        </p>
+      ) : movies.length === 0 ? (
+        <p className="movie-list-page__status" role="status">
+          조건에 맞는 영화가 없어요.
+        </p>
+      ) : (
+        <MovieGrid movies={movies} />
+      )}
     </main>
   );
 }
```

<details>
<summary>수정 후 전체 코드</summary>

```tsx
import { useEffect, useState } from "react";
import { getMovies } from "../../api/movies/get-movies";
import type { TmdbMovieListItem } from "../../api/movies/models";
import MovieGrid from "../../components/movies/movie-grid";

export function MovieListPage() {
  const [movies, setMovies] = useState<TmdbMovieListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;

    async function loadMovies() {
      try {
        const response = await getMovies({ page: 1 });
        if (!ignore) setMovies(response.results);
      } catch {
        if (!ignore) setErrorMessage("영화 목록을 불러오지 못했어요.");
      } finally {
        if (!ignore) setIsLoading(false);
      }
    }

    loadMovies();

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <main className="movie-list-page">
      <section className="movie-list-page__heading">
        <p>UMC Movie</p>
        <h1>영화 목록</h1>
      </section>
      {isLoading ? (
        <p className="movie-list-page__status" role="status">
          영화 목록을 불러오는 중이에요.
        </p>
      ) : errorMessage ? (
        <p className="movie-list-page__status" role="alert">
          {errorMessage}
        </p>
      ) : movies.length === 0 ? (
        <p className="movie-list-page__status" role="status">
          조건에 맞는 영화가 없어요.
        </p>
      ) : (
        <MovieGrid movies={movies} />
      )}
    </main>
  );
}
```

</details>

### 19. `src/pages/movies/search-page.tsx`

- **당시 저장 경로:** `Dongoh/FE/week5/umcine/src/pages/movies/search-page.tsx`
- **현재 저장 위치:** [`Dongoh/FE/umcine/src/pages/movies/search-page.tsx`](../umcine/src/pages/movies/search-page.tsx)
- **구현 내용:** URL의 검색어를 기준으로 검색 API를 호출하고 빈 검색어·로딩·실패·결과 없음 상태를 구분합니다.

**추가·수정한 부분** (`+` 추가, `-` 제거):

```diff
--- 이전 주차/src/pages/movies/search-page.tsx
+++ 5주차/src/pages/movies/search-page.tsx
@@ -1,25 +1,45 @@
 import { Link, useNavigate, useSearch } from "@tanstack/react-router";
 import { useEffect, useState, type SubmitEvent } from "react";
+import type { TmdbMovieListItem } from "../../api/movies/models";
+import { searchMovies } from "../../api/movies/search-movies";
 import { BookmarkButton } from "../../components/bookmark-button";
-import { movies } from "../../data/movies";
+import { getTmdbPosterUrl } from "../../utils/movies/tmdb-image";

 export function SearchPage() {
   const { query } = useSearch({ from: "/search" });
+
+  return <SearchPageContent key={query ?? ""} query={query} />;
+}
+
+function SearchPageContent({ query }: { query?: string }) {
   const navigate = useNavigate({ from: "/search" });
   const [searchText, setSearchText] = useState(query ?? "");

+  const normalizedQuery = (query ?? "").trim();
+  const [movies, setMovies] = useState<TmdbMovieListItem[]>([]);
+  const [isLoading, setIsLoading] = useState(Boolean(normalizedQuery));
+  const [errorMessage, setErrorMessage] = useState<string | null>(null);
+
   useEffect(() => {
-    setSearchText(query ?? "");
-  }, [query]);
+    if (!normalizedQuery) return;

-  const normalizedQuery = query?.trim().toLowerCase() ?? "";
-  const searchResults = normalizedQuery
-    ? movies.filter(
-        (movie) =>
-          movie.title.toLowerCase().includes(normalizedQuery) ||
-          movie.originalTitle.toLowerCase().includes(normalizedQuery),
-      )
-    : [];
+    let ignore = false;
+
+    searchMovies({ query: normalizedQuery })
+      .then((response) => {
+        if (!ignore) setMovies(response.results);
+      })
+      .catch(() => {
+        if (!ignore) setErrorMessage("검색 결과를 불러오지 못했어요.");
+      })
+      .finally(() => {
+        if (!ignore) setIsLoading(false);
+      });
+
+    return () => {
+      ignore = true;
+    };
+  }, [normalizedQuery]);

   function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
     event.preventDefault();
@@ -46,38 +66,64 @@
       </section>

       {!normalizedQuery ? (
-        <p className="search-page__empty">검색어를 입력해 주세요.</p>
+        <p className="search-page__empty" role="status">
+          검색어를 입력해 주세요.
+        </p>
+      ) : isLoading ? (
+        <p className="search-page__empty" role="status">
+          검색 결과를 불러오는 중이에요.
+        </p>
+      ) : errorMessage ? (
+        <p className="search-page__empty" role="alert">
+          {errorMessage}
+        </p>
       ) : (
         <section className="search-results">
           <div className="search-results__heading">
             <h2>'{query}' 검색 결과</h2>
-            <p>영화 {searchResults.length}편</p>
+            <p>영화 {movies.length}편</p>
           </div>
-          {searchResults.length === 0 ? (
-            <p className="search-page__empty">검색 결과가 없어요.</p>
+          {movies.length === 0 ? (
+            <p className="search-page__empty" role="status">
+              검색 결과가 없어요.
+            </p>
           ) : (
             <ul className="search-results__list">
-              {searchResults.map((movie) => (
-                <li className="search-result-card" key={movie.id}>
-                  <img src={movie.posterPath} alt={`${movie.title} 포스터`} />
-                  <div className="search-result-card__content">
-                    <h3>{movie.title}</h3>
-                    <p className="search-result-card__meta">
-                      {movie.originalTitle} · {movie.releaseDate}
-                    </p>
-                    <p>{movie.overview}</p>
-                    <div className="search-result-card__actions">
-                      <BookmarkButton movieId={movie.id} />
-                      <Link
-                        to="/movies/$movieId"
-                        params={{ movieId: String(movie.id) }}
-                      >
-                        상세 보기
-                      </Link>
+              {movies.map((movie) => {
+                const posterUrl = getTmdbPosterUrl(movie.poster_path);
+
+                return (
+                  <li className="search-result-card" key={movie.id}>
+                    {posterUrl ? (
+                      <img
+                        className="search-result-card__poster"
+                        src={posterUrl}
+                        alt={`${movie.title} 포스터`}
+                      />
+                    ) : (
+                      <div className="search-result-card__poster tmdb-image-placeholder">
+                        이미지 없음
+                      </div>
+                    )}
+                    <div className="search-result-card__content">
+                      <h3>{movie.title}</h3>
+                      <p className="search-result-card__meta">
+                        {movie.original_title} · {movie.release_date}
+                      </p>
+                      <p>{movie.overview}</p>
+                      <div className="search-result-card__actions">
+                        <BookmarkButton movieId={movie.id} />
+                        <Link
+                          to="/movies/$movieId"
+                          params={{ movieId: String(movie.id) }}
+                        >
+                          상세 보기
+                        </Link>
+                      </div>
                     </div>
-                  </div>
-                </li>
-              ))}
+                  </li>
+                );
+              })}
             </ul>
           )}
         </section>
```

<details>
<summary>수정 후 전체 코드</summary>

```tsx
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
```

</details>

### 20. `src/utils/movies/get-movie-detail-error-message.ts`

- **당시 저장 경로:** `Dongoh/FE/week5/umcine/src/utils/movies/get-movie-detail-error-message.ts`
- **현재 저장 위치:** [`Dongoh/FE/umcine/src/utils/movies/get-movie-detail-error-message.ts`](../umcine/src/utils/movies/get-movie-detail-error-message.ts)
- **구현 내용:** ky HTTP 오류에서 404를 구분해 영화 미발견 메시지와 일반 오류 메시지를 반환합니다.

<details>
<summary>추가한 전체 코드</summary>

```typescript
import { isHTTPError } from "ky";

export function getMovieDetailErrorMessage(error: unknown) {
  if (isHTTPError(error) && error.response.status === 404) {
    return "영화를 찾을 수 없어요.";
  }

  return "영화 정보를 불러오지 못했어요.";
}
```

</details>

### 21. `src/utils/movies/tmdb-image.ts`

- **당시 저장 경로:** `Dongoh/FE/week5/umcine/src/utils/movies/tmdb-image.ts`
- **현재 저장 위치:** [`Dongoh/FE/umcine/src/utils/movies/tmdb-image.ts`](../umcine/src/utils/movies/tmdb-image.ts)
- **구현 내용:** TMDB 이미지 경로를 포스터·배경 URL로 변환하고 이미지가 없을 때 null을 반환합니다.

<details>
<summary>추가한 전체 코드</summary>

```typescript
const TMDB_POSTER_BASE_URL = "https://image.tmdb.org/t/p/w500";
const TMDB_BACKDROP_BASE_URL = "https://image.tmdb.org/t/p/w1280";

export function getTmdbPosterUrl(posterPath: string | null) {
  return posterPath
    ? `${TMDB_POSTER_BASE_URL}${posterPath}`
    : null;
}

export function getTmdbBackdropUrl(backdropPath: string | null) {
  return backdropPath
    ? `${TMDB_BACKDROP_BASE_URL}${backdropPath}`
    : null;
}
```

</details>

## 자동 생성 파일·리소스·이전 파일

- `.env.local`: API 주소와 개인 액세스 토큰을 보관하는 로컬 파일입니다. 실제 값은 코드 블록에 복사하지 않습니다. 현재 앱의 `.env.example`에서 필요한 변수 이름을 확인할 수 있습니다.
- `pnpm-lock.yaml`: 패키지의 고정 버전·의존성 해시를 기록하는 자동 생성 파일입니다. 의존성 선언은 위 `package.json` 코드에서 확인하고, lock 파일 전체는 현재 앱 또는 통합 전 백업에서 확인합니다.

## 검증 기록

- 통합 이전 주차별 실행 결과는 별도로 기록되지 않았습니다.
- 통합 후 최신 앱의 빌드·린트는 통과했습니다. [구조 정리 기록](./migration.md)에서 범위를 확인하세요.
- 이 문서의 코드·차이는 통합 전 백업에서 추출했으며 줄바꿈과 후행 공백만 정리했습니다.

## 제출 기록

- Issue: [#49](https://github.com/HSU-Makeus-Challenge-11th/Web_B/issues/49)
- PR: [#50](https://github.com/HSU-Makeus-Challenge-11th/Web_B/pull/50) — main 병합 확인
- 커밋: 병합 커밋 [8fabe0a](https://github.com/HSU-Makeus-Challenge-11th/Web_B/commit/8fabe0a9c8b5043225761134fe93c4cf422ab0c9)
