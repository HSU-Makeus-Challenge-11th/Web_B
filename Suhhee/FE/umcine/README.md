# 8주차 - TanStack Query로 서버에 데이터 요청하기

7주차 화면을 이어 로그인·회원 정보·즐겨찾기·평점을 실제 API에 연결했습니다.

## 실행

저장소 루트에서 아래 명령을 실행합니다. Node.js 22.12 이상과 pnpm을 사용합니다.

```bash
cd Suhhee/FE/umcine
cp .env.example .env.local
pnpm install --frozen-lockfile
pnpm dev --host 127.0.0.1 --port 5175
```

`.env.local`에 아래 값을 설정합니다. 토큰 값은 별도로 준비합니다.

```env
VITE_API_BASE_URL=http://localhost:8080
VITE_TMDB_ACCESS_TOKEN=your_tmdb_read_access_token
```

백엔드는 `Suhhee/BE/study`의 H2 demo 서버를 함께 실행합니다.

## 구현

- 회원가입·로그인·닉네임 변경: useMutation으로 요청 상태 관리
- 토큰만 Zustand persist에 저장, 서버 정보는 Query cache에서 관리
- `(protected)/_authenticated` Route Group과 pathless Layout 및 Outlet
- `/me`, `/me/edit` URL 유지, 토큰이 없거나 401이면 로그인 화면 이동
- 즐겨찾기 목록·영화별 여부·추가·삭제를 서버와 연결
- 영화 상세의 평점 조회·등록·수정·삭제 및 1~5점·500자 제한
- 즐겨찾기 상태·닉네임은 성공 후 setQueryData, 관련 목록은 invalidateQueries
- 회원 단위 query key와 로그아웃 시 개인 query 취소·제거

프로필 이미지는 기존 화면의 로컬 미리보기이며 서버 저장 기능은 없습니다.

## 검증

`pnpm lint`, `pnpm build` 통과.
실제 브라우저에서 19단계와 API 응답을 확인했고 JavaScript 예외는 0건입니다.
1440px 데스크톱과 375px 화면에서 주요 UI를 확인했습니다.
진행 캡처는 Notion 8주차 프론트 필수 미션 토글에 첨부했습니다.

## 작업 범위

main에 아직 없는 7주차 인증 화면을 포함한 8주차 최종 구현입니다.
팀 폴더 규칙에 따라 주차 폴더를 만들지 않고 이 경로를 사용하며 기존 주차 기록은 보존합니다.
화면 캡처는 `docs/screenshots`와 [노션 워크북](https://app.notion.com/p/49893859461283248acf015229de8580)에 있습니다.
