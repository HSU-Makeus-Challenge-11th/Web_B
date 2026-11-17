# 6주차 - TanStack Query로 서버 데이터 조회하기

5주차 UMCine의 TMDB 요청을 TanStack Query v5로 전환한 프로젝트입니다.

## 구현 내용

- 앱 전체를 `QueryClientProvider`로 감싸고 Query Devtools를 연결했습니다.
- 인기 목록은 `['movies', 'popular']` query key를 사용합니다.
- 검색은 `['movies', 'search', { query }]`로 검색어별 cache를 구분합니다.
- 상세는 `['movies', 'detail', movieId]`로 영화별 cache를 구분합니다.
- 전역 기본값은 `staleTime` 5분, `gcTime` 30분, 실패 시 재시도 1회입니다.
- 목록·검색·상세에서 loading, error, empty, success 상태를 구분합니다.

## 실행과 확인

프로젝트 루트의 `.env.local`에 TMDB Read Access Token을 설정한 뒤 실행합니다.

```bash
pnpm install
pnpm dev --host 127.0.0.1 --port 5174
```

목록 → 상세 → 목록으로 이동한 뒤 Network 패널에서 같은 요청이 다시 발생하지
않는지 확인합니다. 화면 오른쪽 아래 Query Devtools를 열면 `movies` 아래의 인기,
검색, 상세 cache를 확인할 수 있습니다.

```bash
pnpm lint
pnpm build
```
