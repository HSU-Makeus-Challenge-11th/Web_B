# FE 9주차 — TanStack Router에서 Next.js로 마이그레이션

## 추가·변경한 내용

- 구현한 기능: Vite·TanStack Router 기반 앱을 Next.js App Router 구조로 변경했다.
- 추가·수정한 이유: Next.js의 파일 기반 라우팅과 Server Component를 사용하도록 프로젝트 구조를 맞추기 위해 변경했다.
- 사용자가 확인할 수 있는 동작: 영화 목록, 검색, 상세, 로그인, 회원가입, 내 정보 조회·수정 화면을 기존 URL에서 동일하게 사용할 수 있다.

## 저장 위치와 변경 파일

| 구분 | 실제 저장 경로 | 역할 |
| --- | --- | --- |
| 추가 | `Dongoh/FE/umcine/src/app` | App Router 페이지와 공통 레이아웃 |
| 추가 | `Dongoh/FE/umcine/src/features` | 브라우저 상태와 이벤트를 사용하는 Client Component |
| 수정 | `Dongoh/FE/umcine/src/components` | Next.js Link와 이미지·상태 처리에 맞게 공통 컴포넌트 변경 |
| 수정 | `Dongoh/FE/umcine/package.json` | Vite·TanStack Router를 제거하고 Next.js 실행 명령과 의존성 적용 |
| 추가 | `Dongoh/FE/umcine/next.config.ts` | Next.js 빌드 설정 |
| 삭제 | `Dongoh/FE/umcine/src/routes`, `src/routeTree.gen.ts`, `vite.config.ts` | TanStack Router·Vite 전용 파일 제거 |

## 파일별 구현 내용과 코드

### 1. App Router 페이지 구성

- **저장 경로:** `Dongoh/FE/umcine/src/app`
- **추가·수정한 부분:** `/`, `/search`, `/movies/[movieId]`, `/login`, `/signup`, `/profile`, `/profile-edit`를 App Router의 `page.tsx`로 구성했다.
- **동작 설명:** Next.js가 폴더 경로를 기준으로 페이지를 만들고, 서버에서 처리할 수 있는 페이지는 Server Component로 유지한다.
- **연결 파일:** 각 페이지가 `src/features`의 화면 컴포넌트를 호출한다.

### 2. Server Component와 Client Component 분리

- **저장 경로:** `Dongoh/FE/umcine/src/features`
- **추가·수정한 부분:** 입력, 클릭, Zustand, React Query, 브라우저 저장소를 사용하는 화면에만 `"use client"`를 적용했다.
- **동작 설명:** 서버 렌더링 중에는 `window`, `localStorage` 같은 브라우저 API가 실행되지 않고, 클라이언트가 마운트된 뒤 필요한 상태를 사용한다.
- **연결 파일:** `src/app`의 페이지와 `src/components`의 공통 UI에서 사용한다.

### 3. Next.js 전용 이동 API 적용

- **저장 경로:** `Dongoh/FE/umcine/src/components`, `src/features`
- **추가·수정한 부분:** TanStack Router의 `Link`, `useNavigate`, `useSearch`를 `next/link`, `useRouter`, `useSearchParams`로 교체했다.
- **동작 설명:** 링크 이동과 쿼리 문자열 변경을 Next.js 라우터가 처리한다.

## 검증 기록

- [x] `pnpm build`
- [x] `pnpm lint`
- [x] 영화 목록·검색·상세 및 계정 화면의 라우트 구성 확인
- [x] TanStack Router·Vite 전용 import와 설정 제거 확인
- [x] 환경변수 실제 값과 `.env.local`이 Git에 포함되지 않은 것을 확인

## 제출 기록

- Issue: 제출 후 연결
- PR: 제출 후 연결
- 커밋: `Feat: FE 9주차 Next.js 마이그레이션`
