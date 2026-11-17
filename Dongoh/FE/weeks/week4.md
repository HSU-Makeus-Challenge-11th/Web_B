# FE 4주차 — Zustand와 Web Storage 북마크

## 필수 미션 보완 구현 — 최신 상태

기존 Zustand 공유·persist 구현을 유지하고 실제 목록·상세·검색에서 북마크 추가/해제 공유와 새로고침 후 유지를 확인했습니다. 브라우저 프로세스 종료 후 재실행은 별도 검증으로 남깁니다.

[추가·수정한 파일 경로, 전체 코드와 화면 증빙](./required-missions.md)

## 구현 전 필수 미션 점검 — 2026-11-11

**판정: 핵심 구현·검증 기록 확인, 브라우저 재실행 확인은 보완 필요.** Zustand 공유·추가/제거·persist 저장은 구현되어 있고 PR #40에 새로고침·Application 패널·저장값 삭제 확인 기록이 있습니다. 실제 브라우저 종료 후 재실행 결과는 명시되지 않았습니다. 이번 점검에서는 메모리 Storage를 사용한 새 store 복원·초기화 검증을 통과했습니다.

**주차 구분 정정:** 통합 전 로컬 week3와 week4 사본이 같았다는 사실은 4주차 미구현을 뜻하지 않습니다. GitHub PR #40에서 4주차 북마크 구현이 확인되었습니다.

[전체 주차 점검과 GitHub 근거](./mission-audit.md)

> 통합 전 로컬 백업의 해당 주차 코드를 기준으로 작성했습니다. 실제 제출 시점은 Git 커밋·PR 이력을 확인하세요. 코드 블록은 줄바꿈과 후행 공백을 정리했으며, 현재 앱은 후속 주차 변경이 반영되어 있을 수 있습니다.

## 이번 주차에 추가·변경한 부분

- 목록·검색·상세 화면의 북마크 상태를 Zustand로 공유
- persist로 북마크 ID를 localStorage에 저장하고 복원
- 통합 전 로컬 사본의 3·4주차 내용이 같았던 점은 아래 기록에 유지

## 저장 위치와 변경 파일

모든 실제 앱 개발은 `Dongoh/FE/umcine`에서 이어갑니다. 이 문서는 당시 코드와 변경 이유를 보관합니다.

| 구분 | 당시 파일 경로 | 현재 위치 또는 보관 방식 |
| --- | --- | --- |
| 변경 없음 | 3주차와 동일 | 아래 유지 코드 참고 |

## 파일별 구현 내용과 코드

통합 전 로컬 3·4주차 사본의 파일 내용은 동일했습니다. GitHub 주차별 제출을 재확인하여 아래 코드를 4주차 필수 미션인 **북마크 공유·저장 구현**으로 분류합니다. 코드 블록 자체는 통합 당시 사본을 유지합니다.

### 1. `src/routes/__root.tsx`

- **당시 저장 경로:** `Dongoh/FE/week4/umcine/src/routes/__root.tsx`
- **현재 저장 위치:** [`Dongoh/FE/umcine/src/routes/__root.tsx`](../umcine/src/routes/__root.tsx)
- **구현 내용:** Header와 Outlet을 공통 레이아웃에 배치하고 찾을 수 없는 경로의 화면을 정의합니다.

통합 전 로컬 3주차 사본과는 같은 코드입니다. 실제 4주차 작업 범위는 상단 점검 결과와 PR #40을 기준으로 확인합니다.

<details>
<summary>수정 후 전체 코드</summary>

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

### 2. `src/stores/bookmark-store.ts`

- **당시 저장 경로:** `Dongoh/FE/week4/umcine/src/stores/bookmark-store.ts`
- **현재 저장 위치:** [`Dongoh/FE/umcine/src/stores/bookmark-store.ts`](../umcine/src/stores/bookmark-store.ts)
- **구현 내용:** Zustand 전역 상태에 북마크 영화 ID 배열과 토글 함수를 두고 persist로 localStorage에 저장합니다.

통합 전 로컬 3주차 사본과는 같은 코드입니다. 실제 4주차 작업 범위는 상단 점검 결과와 PR #40을 기준으로 확인합니다.

<details>
<summary>수정 후 전체 코드</summary>

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

### 3. `src/components/bookmark-button.tsx`

- **당시 저장 경로:** `Dongoh/FE/week4/umcine/src/components/bookmark-button.tsx`
- **현재 저장 위치:** [`Dongoh/FE/umcine/src/components/bookmark-button.tsx`](../umcine/src/components/bookmark-button.tsx)
- **구현 내용:** 영화 ID로 북마크 여부와 토글 함수를 구독하고 aria-pressed와 버튼 문구를 갱신합니다.

통합 전 로컬 3주차 사본과는 같은 코드입니다. 실제 4주차 작업 범위는 상단 점검 결과와 PR #40을 기준으로 확인합니다.

<details>
<summary>수정 후 전체 코드</summary>

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

## 검증 기록

- 통합 이전 주차별 실행 결과는 별도로 기록되지 않았습니다.
- 통합 후 최신 앱의 빌드·린트는 통과했습니다. [구조 정리 기록](./migration.md)에서 범위를 확인하세요.
- 이 문서의 코드·차이는 통합 전 백업에서 추출했으며 줄바꿈과 후행 공백만 정리했습니다.

## 제출 기록

- Issue: [#39](https://github.com/HSU-Makeus-Challenge-11th/Web_B/issues/39)
- PR: [#40](https://github.com/HSU-Makeus-Challenge-11th/Web_B/pull/40) — main 병합 확인
- 커밋: 병합 커밋 [647a11e](https://github.com/HSU-Makeus-Challenge-11th/Web_B/commit/647a11e3effa4432241768e689463991d736d7de)
