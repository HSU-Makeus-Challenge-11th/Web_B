# FE 6주차 — 서버 상태 관리

## 필수 미션 보완 구현 — 최신 상태

실제 Query Devtools에서 목록 1→2→1 이동 시 fresh 캐시와 변하지 않는 dataUpdateCount=1 및 dataUpdatedAt을 확인했습니다. Network 패널 직접 캡처는 별도이며 Devtools 증빙을 저장했습니다.

[추가·수정한 파일 경로, 전체 코드와 화면 증빙](./required-missions.md)

## 구현 전 필수 미션 점검 — 2026-11-11

**판정: 코드 구현 확인, 최종 브라우저 검증 미완료 기록.** Provider·Devtools·구분된 query key·상태별 UI는 확인했습니다. PR #75의 브라우저 기능과 Network/Query 개발자 도구 캐시 확인은 미체크 상태입니다. 이번 점검에서는 실제 QueryClient 설정으로 동일 키 재요청 생략과 키별 캐시 분리를 모의 query 함수로 검증했습니다. 이것으로 브라우저 패널 확인을 대신 완료 처리하지 않습니다.

[전체 주차 점검과 GitHub 근거](./mission-audit.md)

> 통합 전 로컬 백업의 해당 주차 코드를 기준으로 작성했습니다. 실제 제출 시점은 Git 커밋·PR 이력을 확인하세요. 코드 블록은 줄바꿈과 후행 공백을 정리했으며, 현재 앱은 후속 주차 변경이 반영되어 있을 수 있습니다.

## 이번 주차에 추가·변경한 부분

- 서버 데이터 조회를 TanStack Query로 전환
- 쿼리 키·enabled·1분 staleTime·Devtools 적용
- API 전체 페이지 수를 사용하는 페이지네이션 추가

## 저장 위치와 변경 파일

모든 실제 앱 개발은 `Dongoh/FE/umcine`에서 이어갑니다. 이 문서는 당시 코드와 변경 이유를 보관합니다.

| 구분 | 당시 파일 경로 | 현재 위치 또는 보관 방식 |
| --- | --- | --- |
| 수정 | `Dongoh/FE/week6/umcine/package.json` | [`umcine/package.json`](../umcine/package.json) |
| 수정 | `Dongoh/FE/week6/umcine/pnpm-lock.yaml` | [`umcine/pnpm-lock.yaml`](../umcine/pnpm-lock.yaml) |
| 수정 | `Dongoh/FE/week6/umcine/src/components/movies/pagination.tsx` | [`umcine/src/components/movies/pagination.tsx`](../umcine/src/components/movies/pagination.tsx) |
| 수정 | `Dongoh/FE/week6/umcine/src/index.css` | [`umcine/src/index.css`](../umcine/src/index.css) |
| 수정 | `Dongoh/FE/week6/umcine/src/main.tsx` | [`umcine/src/main.tsx`](../umcine/src/main.tsx) |
| 수정 | `Dongoh/FE/week6/umcine/src/pages/movies/movie-detail-page.tsx` | [`umcine/src/pages/movies/movie-detail-page.tsx`](../umcine/src/pages/movies/movie-detail-page.tsx) |
| 수정 | `Dongoh/FE/week6/umcine/src/pages/movies/movie-list-page.tsx` | [`umcine/src/pages/movies/movie-list-page.tsx`](../umcine/src/pages/movies/movie-list-page.tsx) |
| 수정 | `Dongoh/FE/week6/umcine/src/pages/movies/search-page.tsx` | [`umcine/src/pages/movies/search-page.tsx`](../umcine/src/pages/movies/search-page.tsx) |
| 서식만 변경 | `Dongoh/FE/week6/umcine/src/utils/bookmark-storage.ts` | [`umcine/src/utils/bookmark-storage.ts`](../umcine/src/utils/bookmark-storage.ts) |

## 파일별 구현 내용과 코드

### 1. `package.json`

- **당시 저장 경로:** `Dongoh/FE/week6/umcine/package.json`
- **현재 저장 위치:** [`Dongoh/FE/umcine/package.json`](../umcine/package.json)
- **구현 내용:** 실행·빌드·린트 명령과 프로젝트에서 사용하는 패키지를 선언합니다.

**추가·수정한 부분** (`+` 추가, `-` 제거):

```diff
--- 이전 주차/package.json
+++ 6주차/package.json
@@ -11,6 +11,7 @@
   },
   "dependencies": {
     "@tailwindcss/vite": "^4.3.3",
+    "@tanstack/react-query": "^5.105.1",
     "@tanstack/react-router": "^1.170.40",
     "clsx": "^2.1.1",
     "ky": "^2.2.0",
@@ -22,6 +23,7 @@
   },
   "devDependencies": {
     "@eslint/js": "^10.0.1",
+    "@tanstack/react-query-devtools": "^5.105.1",
     "@tanstack/router-plugin": "^1.168.41",
     "@types/node": "^24.13.3",
     "@types/react": "^19.2.18",
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
    "@tanstack/react-query": "^5.105.1",
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
    "@tanstack/react-query-devtools": "^5.105.1",
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

### 2. `src/components/movies/pagination.tsx`

- **당시 저장 경로:** `Dongoh/FE/week6/umcine/src/components/movies/pagination.tsx`
- **현재 저장 위치:** [`Dongoh/FE/umcine/src/components/movies/pagination.tsx`](../umcine/src/components/movies/pagination.tsx)
- **구현 내용:** 현재 페이지와 전체 페이지 수를 받아 5개 단위 페이지 번호와 이전·다음 버튼을 만듭니다. 첫·마지막 페이지에서는 이동 버튼을 비활성화합니다.

**추가·수정한 부분** (`+` 추가, `-` 제거):

```diff
--- 이전 주차/src/components/movies/pagination.tsx
+++ 6주차/src/components/movies/pagination.tsx
@@ -1 +1,56 @@
-export {};
+interface PaginationProps {
+  page: number;
+  totalPages: number;
+  onPageChange: (page: number) => void;
+}
+
+export default function Pagination({
+  page,
+  totalPages,
+  onPageChange,
+}: PaginationProps) {
+  if (totalPages <= 0) return null;
+
+  const startPage = Math.floor((page - 1) / 5) * 5 + 1;
+  const pages = Array.from(
+    { length: Math.min(5, totalPages - startPage + 1) },
+    (_, index) => startPage + index,
+  );
+
+  return (
+    <nav className="pagination" aria-label="영화 목록 페이지">
+      <button
+        type="button"
+        className="pagination__button"
+        aria-label="이전 페이지"
+        disabled={page <= 1}
+        onClick={() => onPageChange(page - 1)}
+      >
+        <img src="/icons/movie-icons/chevron-left.svg" alt="" />
+      </button>
+
+      {pages.map((pageNumber) => (
+        <button
+          key={pageNumber}
+          type="button"
+          className="pagination__button"
+          aria-label={`${pageNumber}페이지`}
+          aria-current={page === pageNumber ? "page" : undefined}
+          onClick={() => onPageChange(pageNumber)}
+        >
+          {pageNumber}
+        </button>
+      ))}
+
+      <button
+        type="button"
+        className="pagination__button"
+        aria-label="다음 페이지"
+        disabled={page >= totalPages}
+        onClick={() => onPageChange(page + 1)}
+      >
+        <img src="/icons/movie-icons/chevron-right.svg" alt="" />
+      </button>
+    </nav>
+  );
+}
```

<details>
<summary>수정 후 전체 코드</summary>

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
    <nav className="pagination" aria-label="영화 목록 페이지">
      <button
        type="button"
        className="pagination__button"
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
          className="pagination__button"
          aria-label={`${pageNumber}페이지`}
          aria-current={page === pageNumber ? "page" : undefined}
          onClick={() => onPageChange(pageNumber)}
        >
          {pageNumber}
        </button>
      ))}

      <button
        type="button"
        className="pagination__button"
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

### 3. `src/index.css`

- **당시 저장 경로:** `Dongoh/FE/week6/umcine/src/index.css`
- **현재 저장 위치:** [`Dongoh/FE/umcine/src/index.css`](../umcine/src/index.css)
- **구현 내용:** 페이지네이션 번호 버튼, 현재 페이지 표시 및 버튼 상태 등 새 UI의 스타일을 반영합니다.

**추가·수정한 부분** (`+` 추가, `-` 제거):

```diff
--- 이전 주차/src/index.css
+++ 6주차/src/index.css
@@ -123,6 +123,58 @@
   margin: 0;
   padding: 0;
   list-style: none;
+}
+
+.pagination {
+  display: flex;
+  align-items: center;
+  justify-content: center;
+  gap: 8px;
+  margin-top: 32px;
+}
+
+.pagination__button {
+  display: inline-flex;
+  align-items: center;
+  justify-content: center;
+  width: 32px;
+  height: 32px;
+  border: 0;
+  border-radius: 6px;
+  padding: 0;
+  background: transparent;
+  color: #6b7280;
+  font-size: 12px;
+  font-weight: 600;
+}
+
+.pagination__button:hover:not(:disabled) {
+  background: #e5e7eb;
+}
+
+.pagination__button[aria-current="page"] {
+  background: #18181b;
+  color: #ffffff;
+}
+
+.pagination__button[aria-current="page"]:hover {
+  background: #27272a;
+}
+
+.pagination__button:focus-visible {
+  outline: 2px solid #2563eb;
+  outline-offset: 2px;
+}
+
+.pagination__button:disabled {
+  cursor: default;
+  opacity: 0.35;
+}
+
+.pagination__button img {
+  width: 16px;
+  height: 16px;
+  opacity: 0.6;
 }

 .movie-card {
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

.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 32px;
}

.pagination__button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: 0;
  border-radius: 6px;
  padding: 0;
  background: transparent;
  color: #6b7280;
  font-size: 12px;
  font-weight: 600;
}

.pagination__button:hover:not(:disabled) {
  background: #e5e7eb;
}

.pagination__button[aria-current="page"] {
  background: #18181b;
  color: #ffffff;
}

.pagination__button[aria-current="page"]:hover {
  background: #27272a;
}

.pagination__button:focus-visible {
  outline: 2px solid #2563eb;
  outline-offset: 2px;
}

.pagination__button:disabled {
  cursor: default;
  opacity: 0.35;
}

.pagination__button img {
  width: 16px;
  height: 16px;
  opacity: 0.6;
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

### 4. `src/main.tsx`

- **당시 저장 경로:** `Dongoh/FE/week6/umcine/src/main.tsx`
- **현재 저장 위치:** [`Dongoh/FE/umcine/src/main.tsx`](../umcine/src/main.tsx)
- **구현 내용:** QueryClient를 한 번 만들고 staleTime을 1분으로 지정합니다. QueryClientProvider로 라우터를 감싸고 Devtools를 추가합니다.

**추가·수정한 부분** (`+` 추가, `-` 제거):

```diff
--- 이전 주차/src/main.tsx
+++ 6주차/src/main.tsx
@@ -1,10 +1,20 @@
 import { StrictMode } from "react";
 import { createRoot } from "react-dom/client";
 import { createRouter, RouterProvider } from "@tanstack/react-router";
+import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
+import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
 import { routeTree } from "./routeTree.gen";
 import "./index.css";

 const router = createRouter({ routeTree });
+const ONE_MINUTE = 60 * 1000;
+const queryClient = new QueryClient({
+  defaultOptions: {
+    queries: {
+      staleTime: ONE_MINUTE,
+    },
+  },
+});

 declare module "@tanstack/react-router" {
   interface Register {
@@ -14,6 +24,9 @@

 createRoot(document.getElementById("root")!).render(
   <StrictMode>
-    <RouterProvider router={router} />
+    <QueryClientProvider client={queryClient}>
+      <RouterProvider router={router} />
+      <ReactQueryDevtools initialIsOpen={false} />
+    </QueryClientProvider>
   </StrictMode>,
 );
```

<details>
<summary>수정 후 전체 코드</summary>

```tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { routeTree } from "./routeTree.gen";
import "./index.css";

const router = createRouter({ routeTree });
const ONE_MINUTE = 60 * 1000;
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: ONE_MINUTE,
    },
  },
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>,
);
```

</details>

### 5. `src/pages/movies/movie-detail-page.tsx`

- **당시 저장 경로:** `Dongoh/FE/week6/umcine/src/pages/movies/movie-detail-page.tsx`
- **현재 저장 위치:** [`Dongoh/FE/umcine/src/pages/movies/movie-detail-page.tsx`](../umcine/src/pages/movies/movie-detail-page.tsx)
- **구현 내용:** 상세 요청을 영화 ID별 useQuery로 관리하고 enabled로 유효하지 않은 ID의 요청을 막습니다. 대기·실패 상태를 쿼리 결과에서 읽습니다.

**추가·수정한 부분** (`+` 추가, `-` 제거):

```diff
--- 이전 주차/src/pages/movies/movie-detail-page.tsx
+++ 6주차/src/pages/movies/movie-detail-page.tsx
@@ -1,7 +1,6 @@
+import { useQuery } from "@tanstack/react-query";
 import { Link, useParams } from "@tanstack/react-router";
-import { useEffect, useState } from "react";
 import { getMovieDetail } from "../../api/movies/get-movie-detail";
-import type { TmdbMovieDetail } from "../../api/movies/models";
 import { BookmarkButton } from "../../components/bookmark-button";
 import { getMovieDetailErrorMessage } from "../../utils/movies/get-movie-detail-error-message";
 import {
@@ -18,44 +17,30 @@

 function MovieDetailPageContent({ movieId }: { movieId: number }) {
   const isValidMovieId = Number.isInteger(movieId) && movieId > 0;
-  const [movie, setMovie] = useState<TmdbMovieDetail | null>(null);
-  const [isLoading, setIsLoading] = useState(isValidMovieId);
-  const [errorMessage, setErrorMessage] = useState<string | null>(null);
-
-  useEffect(() => {
-    if (!isValidMovieId) return;
-
-    let ignore = false;
-
-    async function loadMovieDetail() {
-      try {
-        const response = await getMovieDetail(movieId);
-        if (!ignore) setMovie(response);
-      } catch (error) {
-        if (!ignore) setErrorMessage(getMovieDetailErrorMessage(error));
-      } finally {
-        if (!ignore) setIsLoading(false);
-      }
-    }
-
-    loadMovieDetail();
-
-    return () => {
-      ignore = true;
-    };
-  }, [movieId, isValidMovieId]);
+  const movieDetailQuery = useQuery({
+    queryKey: ["movies", "detail", movieId],
+    queryFn: () => getMovieDetail(movieId),
+    enabled: isValidMovieId,
+  });

   if (!isValidMovieId) {
     return <MovieDetailStatus message="올바르지 않은 영화 번호예요." isError />;
   }

-  if (isLoading) {
+  if (movieDetailQuery.isPending) {
     return <MovieDetailStatus message="영화 정보를 불러오는 중이에요." />;
   }

-  if (errorMessage) {
-    return <MovieDetailStatus message={errorMessage} isError />;
+  if (movieDetailQuery.isError) {
+    return (
+      <MovieDetailStatus
+        message={getMovieDetailErrorMessage(movieDetailQuery.error)}
+        isError
+      />
+    );
   }
+
+  const movie = movieDetailQuery.data;

   if (!movie) {
     return <MovieDetailStatus message="영화를 찾을 수 없어요." isError />;
```

<details>
<summary>수정 후 전체 코드</summary>

```tsx
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "@tanstack/react-router";
import { getMovieDetail } from "../../api/movies/get-movie-detail";
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

### 6. `src/pages/movies/movie-list-page.tsx`

- **당시 저장 경로:** `Dongoh/FE/week6/umcine/src/pages/movies/movie-list-page.tsx`
- **현재 저장 위치:** [`Dongoh/FE/umcine/src/pages/movies/movie-list-page.tsx`](../umcine/src/pages/movies/movie-list-page.tsx)
- **구현 내용:** useEffect와 요청용 useState를 useQuery로 교체합니다. 페이지를 쿼리 키에 포함해 페이지별 응답을 구분하고 API의 total_pages를 페이지네이션에 전달합니다.

**추가·수정한 부분** (`+` 추가, `-` 제거):

```diff
--- 이전 주차/src/pages/movies/movie-list-page.tsx
+++ 6주차/src/pages/movies/movie-list-page.tsx
@@ -1,33 +1,23 @@
-import { useEffect, useState } from "react";
+import { useState } from "react";
+import { useQuery } from "@tanstack/react-query";
 import { getMovies } from "../../api/movies/get-movies";
-import type { TmdbMovieListItem } from "../../api/movies/models";
 import MovieGrid from "../../components/movies/movie-grid";
+import Pagination from "../../components/movies/pagination";

 export function MovieListPage() {
-  const [movies, setMovies] = useState<TmdbMovieListItem[]>([]);
-  const [isLoading, setIsLoading] = useState(true);
-  const [errorMessage, setErrorMessage] = useState<string | null>(null);
+  const [page, setPage] = useState(1);

-  useEffect(() => {
-    let ignore = false;
+  const moviesQuery = useQuery({
+    queryKey: ["movies", "list", { page }],
+    queryFn: () => getMovies({ page }),
+  });

-    async function loadMovies() {
-      try {
-        const response = await getMovies({ page: 1 });
-        if (!ignore) setMovies(response.results);
-      } catch {
-        if (!ignore) setErrorMessage("영화 목록을 불러오지 못했어요.");
-      } finally {
-        if (!ignore) setIsLoading(false);
-      }
-    }
+  const movies = moviesQuery.data?.results ?? [];
+  const totalPages = moviesQuery.data?.total_pages ?? 0;

-    loadMovies();
-
-    return () => {
-      ignore = true;
-    };
-  }, []);
+  const handlePageChange = (nextPage: number) => {
+    setPage(nextPage);
+  };

   return (
     <main className="movie-list-page">
@@ -35,20 +25,28 @@
         <p>UMC Movie</p>
         <h1>영화 목록</h1>
       </section>
-      {isLoading ? (
+
+      {moviesQuery.isPending ? (
         <p className="movie-list-page__status" role="status">
           영화 목록을 불러오는 중이에요.
         </p>
-      ) : errorMessage ? (
+      ) : moviesQuery.isError ? (
         <p className="movie-list-page__status" role="alert">
-          {errorMessage}
+          {moviesQuery.error.message}
         </p>
       ) : movies.length === 0 ? (
         <p className="movie-list-page__status" role="status">
           조건에 맞는 영화가 없어요.
         </p>
       ) : (
-        <MovieGrid movies={movies} />
+        <>
+          <MovieGrid movies={movies} />
+          <Pagination
+            page={page}
+            totalPages={totalPages}
+            onPageChange={handlePageChange}
+          />
+        </>
       )}
     </main>
   );
```

<details>
<summary>수정 후 전체 코드</summary>

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
    <main className="movie-list-page">
      <section className="movie-list-page__heading">
        <p>UMC Movie</p>
        <h1>영화 목록</h1>
      </section>

      {moviesQuery.isPending ? (
        <p className="movie-list-page__status" role="status">
          영화 목록을 불러오는 중이에요.
        </p>
      ) : moviesQuery.isError ? (
        <p className="movie-list-page__status" role="alert">
          {moviesQuery.error.message}
        </p>
      ) : movies.length === 0 ? (
        <p className="movie-list-page__status" role="status">
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

### 7. `src/pages/movies/search-page.tsx`

- **당시 저장 경로:** `Dongoh/FE/week6/umcine/src/pages/movies/search-page.tsx`
- **현재 저장 위치:** [`Dongoh/FE/umcine/src/pages/movies/search-page.tsx`](../umcine/src/pages/movies/search-page.tsx)
- **구현 내용:** 정리한 검색어를 쿼리 키에 포함하고 빈 검색어에서는 enabled를 끕니다. URL 검색어가 바뀌면 별도 검색 결과를 조회합니다.

**추가·수정한 부분** (`+` 추가, `-` 제거):

```diff
--- 이전 주차/src/pages/movies/search-page.tsx
+++ 6주차/src/pages/movies/search-page.tsx
@@ -1,6 +1,6 @@
+import { useQuery } from "@tanstack/react-query";
 import { Link, useNavigate, useSearch } from "@tanstack/react-router";
-import { useEffect, useState, type SubmitEvent } from "react";
-import type { TmdbMovieListItem } from "../../api/movies/models";
+import { useState, type SubmitEvent } from "react";
 import { searchMovies } from "../../api/movies/search-movies";
 import { BookmarkButton } from "../../components/bookmark-button";
 import { getTmdbPosterUrl } from "../../utils/movies/tmdb-image";
@@ -16,30 +16,13 @@
   const [searchText, setSearchText] = useState(query ?? "");

   const normalizedQuery = (query ?? "").trim();
-  const [movies, setMovies] = useState<TmdbMovieListItem[]>([]);
-  const [isLoading, setIsLoading] = useState(Boolean(normalizedQuery));
-  const [errorMessage, setErrorMessage] = useState<string | null>(null);
+  const searchQuery = useQuery({
+    queryKey: ["movies", "search", { query: normalizedQuery }],
+    queryFn: () => searchMovies({ query: normalizedQuery }),
+    enabled: normalizedQuery.length > 0,
+  });

-  useEffect(() => {
-    if (!normalizedQuery) return;
-
-    let ignore = false;
-
-    searchMovies({ query: normalizedQuery })
-      .then((response) => {
-        if (!ignore) setMovies(response.results);
-      })
-      .catch(() => {
-        if (!ignore) setErrorMessage("검색 결과를 불러오지 못했어요.");
-      })
-      .finally(() => {
-        if (!ignore) setIsLoading(false);
-      });
-
-    return () => {
-      ignore = true;
-    };
-  }, [normalizedQuery]);
+  const movies = searchQuery.data?.results ?? [];

   function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
     event.preventDefault();
@@ -69,13 +52,13 @@
         <p className="search-page__empty" role="status">
           검색어를 입력해 주세요.
         </p>
-      ) : isLoading ? (
+      ) : searchQuery.isLoading ? (
         <p className="search-page__empty" role="status">
           검색 결과를 불러오는 중이에요.
         </p>
-      ) : errorMessage ? (
+      ) : searchQuery.isError ? (
         <p className="search-page__empty" role="alert">
-          {errorMessage}
+          {searchQuery.error.message}
         </p>
       ) : (
         <section className="search-results">
@@ -83,7 +66,7 @@
             <h2>'{query}' 검색 결과</h2>
             <p>영화 {movies.length}편</p>
           </div>
-          {movies.length === 0 ? (
+          {searchQuery.isSuccess && movies.length === 0 ? (
             <p className="search-page__empty" role="status">
               검색 결과가 없어요.
             </p>
```

<details>
<summary>수정 후 전체 코드</summary>

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
      ) : searchQuery.isLoading ? (
        <p className="search-page__empty" role="status">
          검색 결과를 불러오는 중이에요.
        </p>
      ) : searchQuery.isError ? (
        <p className="search-page__empty" role="alert">
          {searchQuery.error.message}
        </p>
      ) : (
        <section className="search-results">
          <div className="search-results__heading">
            <h2>'{query}' 검색 결과</h2>
            <p>영화 {movies.length}편</p>
          </div>
          {searchQuery.isSuccess && movies.length === 0 ? (
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

### 8. `src/utils/bookmark-storage.ts`

- **당시 저장 경로:** `Dongoh/FE/week6/umcine/src/utils/bookmark-storage.ts`
- **현재 저장 위치:** [`Dongoh/FE/umcine/src/utils/bookmark-storage.ts`](../umcine/src/utils/bookmark-storage.ts)
- **구현 내용:** 북마크 저장 기능은 그대로이며 이번 스냅샷에서는 줄바꿈·후행 공백만 변경되었습니다.

줄바꿈·후행 공백을 제외하면 이전 주차와 같은 코드입니다. 기능 추가로 분류하지 않습니다.

<details>
<summary>수정 후 전체 코드</summary>

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

## 자동 생성 파일·리소스·이전 파일

- `pnpm-lock.yaml`: 패키지의 고정 버전·의존성 해시를 기록하는 자동 생성 파일입니다. 의존성 선언은 위 `package.json` 코드에서 확인하고, lock 파일 전체는 현재 앱 또는 통합 전 백업에서 확인합니다.

## 검증 기록

- 통합 이전 주차별 실행 결과는 별도로 기록되지 않았습니다.
- 통합 후 최신 앱의 빌드·린트는 통과했습니다. [구조 정리 기록](./migration.md)에서 범위를 확인하세요.
- 이 문서의 코드·차이는 통합 전 백업에서 추출했으며 줄바꿈과 후행 공백만 정리했습니다.

## 제출 기록

- Issue: [#74](https://github.com/HSU-Makeus-Challenge-11th/Web_B/issues/74)
- PR: [#75](https://github.com/HSU-Makeus-Challenge-11th/Web_B/pull/75) — main 병합 확인
- 커밋: 병합 커밋 [10376f2](https://github.com/HSU-Makeus-Challenge-11th/Web_B/commit/10376f290ddc0adccc1192438a3c0b153cd8c026)
